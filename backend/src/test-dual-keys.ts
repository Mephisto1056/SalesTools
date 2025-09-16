import dotenv from 'dotenv';
import { kimiAPIManager } from './services/kimiAPIManager';

// 加载环境变量
dotenv.config();

interface KeyStatus {
  keyPrefix: string;
  isActive: boolean;
  rpm: number;
  tpm: number;
  errorCount: number;
  lastUsed: number;
}

interface APIStatus {
  totalKeys: number;
  activeKeys: number;
  keyStatus: KeyStatus[];
}

interface TestResult {
  index: number;
  success: boolean;
  length?: number;
  error?: string;
}

// 测试双Key功能
async function testDualKeys(): Promise<void> {
  console.log('🧪 开始测试双KIMI API Key功能...\n');

  // 检查配置
  console.log('📋 配置检查:');
  console.log('- KIMI_API_KEY_1:', process.env.KIMI_API_KEY_1 ? '✅ 已配置' : '❌ 未配置');
  console.log('- KIMI_API_KEY_2:', process.env.KIMI_API_KEY_2 ? '✅ 已配置' : '❌ 未配置');
  console.log('');

  // 获取管理器状态
  const initialStatus = kimiAPIManager.getStatus() as APIStatus;
  console.log('🔑 API Manager初始状态:');
  console.log(`- 总Key数: ${initialStatus.totalKeys}`);
  console.log(`- 活跃Key数: ${initialStatus.activeKeys}`);
  console.log('- Key状态详情:');
  initialStatus.keyStatus.forEach((key: KeyStatus, index: number) => {
    console.log(`  Key ${index + 1}: ${key.keyPrefix} (活跃: ${key.isActive ? '✅' : '❌'})`);
  });
  console.log('');

  // 测试简单的AI调用
  const testPrompts = [
    '请简单介绍一下人工智能。',
    '什么是机器学习？',
    '请解释深度学习的概念。'
  ];

  console.log('🤖 开始测试AI调用...\n');

  for (let i = 0; i < testPrompts.length; i++) {
    const prompt = testPrompts[i];
    console.log(`📝 测试 ${i + 1}: ${prompt}`);
    
    try {
      const startTime = Date.now();
      const response = await kimiAPIManager.callKimiAPI(prompt, {
        model: 'moonshot-v1-128k',
        temperature: 0.3,
        max_tokens: 200,
        timeout: 30000
      });
      const endTime = Date.now();
      
      console.log(`✅ 调用成功 (耗时: ${endTime - startTime}ms)`);
      console.log(`📄 响应长度: ${response.length} 字符`);
      console.log(`👀 响应预览: ${response.substring(0, 100)}...`);
      
      // 显示当前状态
      const currentStatus = kimiAPIManager.getStatus() as APIStatus;
      console.log('📊 当前使用状态:');
      currentStatus.keyStatus.forEach((key: KeyStatus, index: number) => {
        console.log(`  Key ${index + 1}: RPM=${key.rpm}, TPM=${key.tpm}, 错误=${key.errorCount}`);
      });
      
    } catch (error: any) {
      console.error(`❌ 调用失败: ${error.message}`);
    }
    
    console.log('');
    
    // 等待一秒再进行下一个测试
    if (i < testPrompts.length - 1) {
      console.log('⏳ 等待1秒...\n');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // 最终状态
  const finalStatus = kimiAPIManager.getStatus() as APIStatus;
  console.log('🏁 测试完成，最终状态:');
  console.log(`- 总Key数: ${finalStatus.totalKeys}`);
  console.log(`- 活跃Key数: ${finalStatus.activeKeys}`);
  console.log('- 详细使用情况:');
  finalStatus.keyStatus.forEach((key: KeyStatus, index: number) => {
    console.log(`  Key ${index + 1}: ${key.keyPrefix}`);
    console.log(`    - 活跃状态: ${key.isActive ? '✅' : '❌'}`);
    console.log(`    - RPM使用: ${key.rpm}/200`);
    console.log(`    - TPM使用: ${key.tpm}/5000`);
    console.log(`    - 错误次数: ${key.errorCount}`);
    console.log(`    - 最后使用: ${key.lastUsed ? new Date(key.lastUsed).toLocaleTimeString() : '未使用'}`);
  });
}

// 测试负载均衡功能
async function testLoadBalancing(): Promise<void> {
  console.log('\n🔄 测试负载均衡功能...\n');
  
  const promises: Promise<TestResult>[] = [];
  const testPrompt = '请用一句话介绍TypeScript。';
  
  // 同时发起5个请求
  for (let i = 0; i < 5; i++) {
    promises.push(
      kimiAPIManager.callKimiAPI(testPrompt, {
        model: 'moonshot-v1-8k',
        temperature: 0.3,
        max_tokens: 100,
        timeout: 30000
      }).then(response => {
        console.log(`✅ 并发请求 ${i + 1} 完成`);
        return { index: i + 1, success: true, length: response.length };
      }).catch(error => {
        console.error(`❌ 并发请求 ${i + 1} 失败: ${error.message}`);
        return { index: i + 1, success: false, error: error.message };
      })
    );
  }
  
  console.log('🚀 发起5个并发请求...');
  const results = await Promise.all(promises);
  
  console.log('\n📊 并发测试结果:');
  results.forEach((result: TestResult) => {
    if (result.success && result.length !== undefined) {
      console.log(`  请求 ${result.index}: ✅ 成功 (响应长度: ${result.length})`);
    } else if (!result.success && result.error !== undefined) {
      console.log(`  请求 ${result.index}: ❌ 失败 (${result.error})`);
    }
  });
  
  // 显示负载分布
  const balanceStatus = kimiAPIManager.getStatus() as APIStatus;
  console.log('\n⚖️ 负载分布:');
  balanceStatus.keyStatus.forEach((key: KeyStatus, index: number) => {
    console.log(`  Key ${index + 1}: RPM=${key.rpm}, TPM=${key.tpm}`);
  });
}

// 主测试函数
async function main(): Promise<void> {
  try {
    await testDualKeys();
    await testLoadBalancing();
    
    console.log('\n🎉 所有测试完成！');
    
  } catch (error: any) {
    console.error('\n💥 测试过程中发生错误:', error.message);
    process.exit(1);
  }
}

// 运行测试
if (require.main === module) {
  main();
}

export { testDualKeys, testLoadBalancing };