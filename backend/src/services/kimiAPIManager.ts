import axios from 'axios';

// API Key使用统计接口
interface APIKeyUsage {
  rpm: number;           // 当前分钟请求数
  tpm: number;           // 当前分钟Token数
  resetTime: number;     // 重置时间戳
  errorCount: number;    // 错误计数
  lastUsed: number;      // 最后使用时间
}

// API Key配置接口
interface APIKeyConfig {
  key: string;
  usage: APIKeyUsage;
  isActive: boolean;
}

// KIMI双Key管理器
export class KimiAPIManager {
  private apiKeys: APIKeyConfig[];
  private apiUrl: string;
  private maxRPM: number = 200;
  private maxTPM: number = 5000;
  private maxErrors: number = 5;

  constructor() {
    this.apiUrl = process.env.KIMI_API_URL || 'https://api.moonshot.cn/v1/chat/completions';
    
    // 调试环境变量
    console.log('🔍 环境变量调试:');
    console.log('- KIMI_API_KEY_1:', process.env.KIMI_API_KEY_1 ? 'exists' : 'not found');
    console.log('- KIMI_API_KEY_2:', process.env.KIMI_API_KEY_2 ? 'exists' : 'not found');
    console.log('- KIMI_API_KEY:', process.env.KIMI_API_KEY ? 'exists' : 'not found');
    
    // 初始化API Keys
    this.apiKeys = this.initializeAPIKeys();
    
    // 每分钟重置使用统计
    setInterval(() => this.resetUsageStats(), 60000);
    
    console.log(`🔑 KIMI API Manager initialized with ${this.apiKeys.length} keys`);
  }

  private initializeAPIKeys(): APIKeyConfig[] {
    const keys: APIKeyConfig[] = [];
    
    // 主Key
    const primaryKey = process.env.KIMI_API_KEY_1 || process.env.KIMI_API_KEY;
    if (primaryKey && primaryKey.trim()) {
      keys.push({
        key: primaryKey.trim(),
        usage: this.createEmptyUsage(),
        isActive: true
      });
      console.log(`✅ 主Key已配置: ${primaryKey.substring(0, 10)}...`);
    }
    
    // 备用Key
    const secondaryKey = process.env.KIMI_API_KEY_2;
    if (secondaryKey && secondaryKey.trim()) {
      keys.push({
        key: secondaryKey.trim(),
        usage: this.createEmptyUsage(),
        isActive: true
      });
      console.log(`✅ 备用Key已配置: ${secondaryKey.substring(0, 10)}...`);
    }
    
    if (keys.length === 0) {
      console.error('❌ 环境变量检查:');
      console.error('- KIMI_API_KEY_1:', process.env.KIMI_API_KEY_1 || 'undefined');
      console.error('- KIMI_API_KEY_2:', process.env.KIMI_API_KEY_2 || 'undefined');
      console.error('- KIMI_API_KEY:', process.env.KIMI_API_KEY || 'undefined');
      throw new Error('至少需要配置一个KIMI API Key (KIMI_API_KEY_1 或 KIMI_API_KEY)');
    }
    
    console.log(`✅ 已配置 ${keys.length} 个KIMI API Key`);
    return keys;
  }

  private createEmptyUsage(): APIKeyUsage {
    return {
      rpm: 0,
      tpm: 0,
      resetTime: Date.now() + 60000,
      errorCount: 0,
      lastUsed: 0
    };
  }

  private resetUsageStats(): void {
    const now = Date.now();
    this.apiKeys.forEach(keyConfig => {
      if (keyConfig.usage.resetTime <= now) {
        keyConfig.usage.rpm = 0;
        keyConfig.usage.tpm = 0;
        keyConfig.usage.resetTime = now + 60000;
        
        // 如果错误计数过多，重置并重新激活
        if (keyConfig.usage.errorCount >= this.maxErrors) {
          keyConfig.usage.errorCount = 0;
          keyConfig.isActive = true;
          console.log(`🔄 API Key重新激活: ${keyConfig.key.substring(0, 10)}...`);
        }
      }
    });
  }

  private estimateTokens(prompt: string): number {
    // 简单的Token估算：中文字符*1.5 + 英文单词*1.3
    const chineseChars = (prompt.match(/[\u4e00-\u9fa5]/g) || []).length;
    const englishWords = (prompt.match(/[a-zA-Z]+/g) || []).length;
    return Math.ceil(chineseChars * 1.5 + englishWords * 1.3 + 500); // 加500作为响应Token预估
  }

  private selectOptimalKey(estimatedTokens: number): APIKeyConfig | null {
    // 过滤可用的Key
    const availableKeys = this.apiKeys.filter(keyConfig => 
      keyConfig.isActive && 
      keyConfig.usage.errorCount < this.maxErrors
    );

    if (availableKeys.length === 0) {
      console.error('❌ 没有可用的API Key');
      return null;
    }

    // 选择负载最低的Key
    let bestKey = availableKeys[0];
    let bestScore = this.calculateKeyScore(bestKey, estimatedTokens);

    for (let i = 1; i < availableKeys.length; i++) {
      const key = availableKeys[i];
      const score = this.calculateKeyScore(key, estimatedTokens);
      
      if (score > bestScore) {
        bestKey = key;
        bestScore = score;
      }
    }

    // 检查选中的Key是否还有余量
    if (bestKey.usage.rpm >= this.maxRPM || 
        bestKey.usage.tpm + estimatedTokens > this.maxTPM) {
      console.warn(`⚠️ 最佳Key已达限制，尝试其他Key`);
      
      // 寻找还有余量的Key
      for (const key of availableKeys) {
        if (key.usage.rpm < this.maxRPM && 
            key.usage.tpm + estimatedTokens <= this.maxTPM) {
          return key;
        }
      }
      
      console.warn(`⚠️ 所有Key都已达限制，使用负载最低的Key`);
    }

    return bestKey;
  }

  private calculateKeyScore(keyConfig: APIKeyConfig, estimatedTokens: number): number {
    // 计算Key的可用性评分（越高越好）
    const rpmScore = (this.maxRPM - keyConfig.usage.rpm) / this.maxRPM;
    const tpmScore = (this.maxTPM - keyConfig.usage.tpm - estimatedTokens) / this.maxTPM;
    const errorScore = (this.maxErrors - keyConfig.usage.errorCount) / this.maxErrors;
    
    // 综合评分
    return (rpmScore * 0.3 + tpmScore * 0.5 + errorScore * 0.2);
  }

  private updateKeyUsage(keyConfig: APIKeyConfig, estimatedTokens: number, success: boolean): void {
    keyConfig.usage.rpm += 1;
    keyConfig.usage.tpm += estimatedTokens;
    keyConfig.usage.lastUsed = Date.now();

    if (!success) {
      keyConfig.usage.errorCount += 1;
      
      // 如果错误过多，暂时禁用这个Key
      if (keyConfig.usage.errorCount >= this.maxErrors) {
        keyConfig.isActive = false;
        console.error(`🚫 API Key暂时禁用: ${keyConfig.key.substring(0, 10)}... (错误次数: ${keyConfig.usage.errorCount})`);
      }
    } else {
      // 成功调用时，减少错误计数
      keyConfig.usage.errorCount = Math.max(0, keyConfig.usage.errorCount - 1);
    }
  }

  // 主要的API调用方法
  public async callKimiAPI(prompt: string, options: any = {}): Promise<any> {
    const estimatedTokens = this.estimateTokens(prompt);
    
    console.log(`🤖 KIMI API调用 - 预估Token: ${estimatedTokens}`);
    
    // 选择最优Key
    const selectedKey = this.selectOptimalKey(estimatedTokens);
    if (!selectedKey) {
      throw new Error('没有可用的KIMI API Key');
    }

    console.log(`🔑 使用API Key: ${selectedKey.key.substring(0, 10)}... (RPM: ${selectedKey.usage.rpm}/${this.maxRPM}, TPM: ${selectedKey.usage.tpm}/${this.maxTPM})`);

    // 构建请求体
    const requestBody = {
      model: options.model || 'moonshot-v1-128k',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: options.temperature || 0.3,
      max_tokens: options.max_tokens || 4000,
      stream: false,
      ...options
    };

    try {
      const response = await axios.post(
        this.apiUrl,
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${selectedKey.key}`,
            'Content-Type': 'application/json'
          },
          timeout: options.timeout || 120000
        }
      );

      this.updateKeyUsage(selectedKey, estimatedTokens, true);

      console.log(`✅ KIMI API调用成功 - 状态: ${response.status}`);
      
      const responseData = response.data as any;
      if (!responseData || !responseData.choices || !responseData.choices[0]) {
        throw new Error('KIMI API响应格式异常');
      }

      return responseData.choices[0].message.content;

    } catch (error: any) {
      this.updateKeyUsage(selectedKey, estimatedTokens, false);
      
      console.error(`❌ KIMI API调用失败:`, {
        key: selectedKey.key.substring(0, 10) + '...',
        error: error.message,
        status: error.response?.status,
        data: error.response?.data
      });

      // 如果有其他可用Key，尝试重试
      if (this.apiKeys.filter(k => k.isActive && k !== selectedKey).length > 0) {
        console.log(`🔄 尝试使用备用API Key重试...`);
        return await this.callKimiAPIWithRetry(prompt, options, selectedKey);
      }

      // 抛出详细错误信息
      if (error.response) {
        const errorMsg = error.response.data?.error?.message ||
                        error.response.data?.message ||
                        error.response.statusText ||
                        '未知API错误';
        throw new Error(`KIMI API错误 (${error.response.status}): ${errorMsg}`);
      } else if (error.request) {
        throw new Error('网络连接错误，无法访问KIMI API');
      } else {
        throw new Error(`KIMI API调用失败: ${error.message}`);
      }
    }
  }

  private async callKimiAPIWithRetry(prompt: string, options: any, excludeKey: APIKeyConfig): Promise<any> {
    const estimatedTokens = this.estimateTokens(prompt);
    
    // 选择除了失败Key之外的最优Key
    const availableKeys = this.apiKeys.filter(k => 
      k.isActive && 
      k !== excludeKey && 
      k.usage.errorCount < this.maxErrors
    );

    if (availableKeys.length === 0) {
      throw new Error('所有备用API Key都不可用');
    }

    let bestKey = availableKeys[0];
    let bestScore = this.calculateKeyScore(bestKey, estimatedTokens);

    for (let i = 1; i < availableKeys.length; i++) {
      const key = availableKeys[i];
      const score = this.calculateKeyScore(key, estimatedTokens);
      
      if (score > bestScore) {
        bestKey = key;
        bestScore = score;
      }
    }

    console.log(`🔄 重试使用API Key: ${bestKey.key.substring(0, 10)}...`);

    // 构建请求体
    const requestBody = {
      model: options.model || 'moonshot-v1-128k',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: options.temperature || 0.3,
      max_tokens: options.max_tokens || 4000,
      stream: false,
      ...options
    };

    try {
      const response = await axios.post(
        this.apiUrl,
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${bestKey.key}`,
            'Content-Type': 'application/json'
          },
          timeout: options.timeout || 120000
        }
      );

      this.updateKeyUsage(bestKey, estimatedTokens, true);
      console.log(`✅ 重试成功 - 状态: ${response.status}`);
      
      const responseData = response.data as any;
      return responseData.choices[0].message.content;

    } catch (error: any) {
      this.updateKeyUsage(bestKey, estimatedTokens, false);
      console.error(`❌ 重试也失败了:`, error.message);
      throw error;
    }
  }

  // 获取当前状态信息
  public getStatus(): any {
    return {
      totalKeys: this.apiKeys.length,
      activeKeys: this.apiKeys.filter(k => k.isActive).length,
      keyStatus: this.apiKeys.map(keyConfig => ({
        keyPrefix: keyConfig.key.substring(0, 10) + '...',
        isActive: keyConfig.isActive,
        rpm: keyConfig.usage.rpm,
        tpm: keyConfig.usage.tpm,
        errorCount: keyConfig.usage.errorCount,
        lastUsed: keyConfig.usage.lastUsed
      }))
    };
  }
}

// 创建全局单例
export const kimiAPIManager = new KimiAPIManager();