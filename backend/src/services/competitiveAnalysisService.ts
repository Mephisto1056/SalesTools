import axios from 'axios';
import {
  buildCustomPrompt,
  PromptConfig,
  buildProductInfoPrompt,
  buildUniqueBenefitsPrompt,
  buildProbingQuestionsPrompt,
  buildCommonBenefitsPrompt,
  buildWeaknessStrategiesPrompt,
  buildDimensionSuggestionPrompt,
  buildUniqueBenefitsSuggestionPrompt,
  buildProbingQuestionsSuggestionPrompt,
  buildCommonBenefitsSuggestionPrompt,
  buildWeaknessStrategySuggestionPrompt
} from '../prompts/competitiveAnalysisPrompt';

// 竞争分析请求参数接口
export interface CompetitiveAnalysisParams {
  customer_name: string;
  my_product: string;
  competitor_product: string;
}

// 竞争分析结果接口
export interface CompetitiveAnalysisResult {
  analysis_summary: {
    table1: {
      features: {
        my_product: string;
        competitor_product: string;
      };
      benefits: {
        my_product: string;
        competitor_product: string;
      };
      price: {
        my_product: string;
        competitor_product: string;
      };
      supply_terms: {
        my_product: string;
        competitor_product: string;
      };
      service: {
        my_product: string;
        competitor_product: string;
      };
      consulting: {
        my_product: string;
        competitor_product: string;
      };
    };
    most_important_factors_for_customer: string[];
    table2: Array<{
      my_unique_benefit: string;
      probing_question: string;
    }>;
    strategic_recommendations: Array<{
      my_weakness: string;
      overcoming_strategy: string;
    }>;
  };
}

// 获取大模型API配置（动态获取环境变量）
const getAIAPIConfig = () => ({
  // KIMI API配置
  KIMI_API_URL: process.env.KIMI_API_URL || 'https://api.moonshot.cn/v1/chat/completions',
  KIMI_API_KEY: process.env.KIMI_API_KEY || '',
  
  // 备用API配置 - 可以添加其他大模型
  OPENAI_API_URL: process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  
  // 通义千问API配置
  QWEN_API_URL: process.env.QWEN_API_URL || '',
  QWEN_API_KEY: process.env.QWEN_API_KEY || '',
});

// 提示词配置（可根据需要调整）
const getPromptConfig = (): PromptConfig => ({
  emphasizeWebSearch: true,
  analysisDepth: 'comprehensive',
  customInstructions: '请确保分析结果具有实用性和可操作性，避免过于理论化的建议。'
});

// 调用KIMI API
const callKimiAPI = async (prompt: string): Promise<CompetitiveAnalysisResult> => {
  const config = getAIAPIConfig();
  
  console.log('KIMI API配置检查:');
  console.log('- API URL:', config.KIMI_API_URL);
  console.log('- API Key存在:', !!config.KIMI_API_KEY);
  console.log('- API Key前缀:', config.KIMI_API_KEY?.substring(0, 10) + '...');

  if (!config.KIMI_API_KEY) {
    throw new Error('KIMI API密钥未配置');
  }

  try {
    console.log('开始调用KIMI API...');
    
    // 尝试不同的API调用方式
    let requestBody: any = {
      model: 'kimi-k2-0711-preview',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 8000
    };

    // 尝试添加联网搜索功能（如果支持）
    console.log('尝试启用联网搜索功能...');
    
    const response = await axios.post(
      config.KIMI_API_URL,
      requestBody,
      {
        headers: {
          'Authorization': `Bearer ${config.KIMI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 180000 // 增加到180秒超时，适应k2模型的处理时间
      }
    );

    console.log('KIMI API响应状态:', response.status);
    console.log('KIMI API响应数据结构:', Object.keys(response.data as any));

    const content = (response.data as any).choices[0].message.content;
    
    // 尝试解析JSON响应
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('AI响应中未找到有效的JSON格式');
      }
    } catch (parseError) {
      console.error('JSON解析错误:', parseError);
      throw new Error('AI响应格式错误，无法解析JSON');
    }

  } catch (error: any) {
    console.error('KIMI API调用错误:', error);
    if (error.response) {
      throw new Error(`KIMI API错误: ${error.response.data?.error?.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('网络连接错误，无法访问KIMI API');
    } else {
      throw new Error(`KIMI API调用失败: ${error.message}`);
    }
  }
};

// 调用OpenAI API (备用)
const callOpenAIAPI = async (prompt: string): Promise<CompetitiveAnalysisResult> => {
  const config = getAIAPIConfig();
  
  if (!config.OPENAI_API_KEY) {
    throw new Error('OpenAI API密钥未配置');
  }

  try {
    const response = await axios.post(
      config.OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000
      },
      {
        headers: {
          'Authorization': `Bearer ${config.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000
      }
    );

    const content = (response.data as any).choices[0].message.content;
    
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('AI响应中未找到有效的JSON格式');
      }
    } catch (parseError) {
      console.error('JSON解析错误:', parseError);
      throw new Error('AI响应格式错误，无法解析JSON');
    }

  } catch (error: any) {
    console.error('OpenAI API调用错误:', error);
    if (error.response) {
      throw new Error(`OpenAI API错误: ${error.response.data?.error?.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('网络连接错误，无法访问OpenAI API');
    } else {
      throw new Error(`OpenAI API调用失败: ${error.message}`);
    }
  }
};

// 生成模拟数据 (用于测试或API不可用时)
const generateMockData = (params: CompetitiveAnalysisParams): CompetitiveAnalysisResult => {
  return {
    analysis_summary: {
      table1: {
        features: {
          my_product: `${params.my_product} 采用先进的技术架构，具备高性能处理能力，支持实时数据分析和智能化决策支持。`,
          competitor_product: `${params.competitor_product} 基于成熟的技术平台，提供稳定可靠的解决方案，具备良好的兼容性。`
        },
        benefits: {
          my_product: "提供高效的业务处理能力，提升工作效率30-40%，降低运营成本，增强用户体验。",
          competitor_product: "操作简单易用，部署快速，适用于多种业务场景，学习成本较低。"
        },
        price: {
          my_product: "中高端定位，初期投资合理，长期ROI表现优秀，维护成本可控。",
          competitor_product: "中端定位，价格相对亲民，但后续升级和扩展成本较高。"
        },
        supply_terms: {
          my_product: "标准交付周期2-4周，完善的供应链体系，提供本地化支持服务。",
          competitor_product: "交付周期4-6周，供应链相对传统，主要依赖总部技术支持。"
        },
        service: {
          my_product: "7×24小时技术支持，专业服务团队，提供定期培训和系统升级服务。",
          competitor_product: "工作时间技术支持，区域服务网络，标准化服务包。"
        },
        consulting: {
          my_product: "提供业务流程优化、数字化转型咨询、定制化解决方案等增值服务。",
          competitor_product: "基础实施指导和用户培训，有限的咨询服务支持。"
        }
      },
      most_important_factors_for_customer: [
        "性价比和投资回报",
        "技术先进性和稳定性",
        "服务质量和响应速度"
      ],
      table2: [
        {
          my_unique_benefit: "先进的智能化技术和实时数据分析能力",
          probing_question: "在您的业务运营中，实时数据分析和智能决策支持对提升效率有多重要？"
        },
        {
          my_unique_benefit: "全面的数字化转型咨询和定制化服务",
          probing_question: "您是否希望在使用新系统的同时，获得专业的业务流程优化建议？"
        }
      ],
      strategic_recommendations: [
        {
          my_weakness: "技术复杂度相对较高",
          overcoming_strategy: "提供完善的培训计划和技术支持，安排专业顾问进行现场指导，确保平滑过渡和快速上手。"
        },
        {
          my_weakness: "初期学习成本较高",
          overcoming_strategy: "制定分阶段实施方案，提供详细的操作手册和在线培训资源，建立用户社区进行经验分享。"
        }
      ]
    }
  };
};

// 会话数据接口
interface AnalysisSession {
  id: string;
  customer_name: string;
  my_product: string;
  competitor_product: string;
  created_at: Date;
  steps: {
    [key: number]: any;
  };
}

// 内存存储（生产环境应使用数据库）
const sessions = new Map<string, AnalysisSession>();

// 生成会话ID
const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 竞争分析服务类
class CompetitiveAnalysisService {
  // 初始化分析会话
  async initSession(params: CompetitiveAnalysisParams): Promise<{ session_id: string; basic_info: CompetitiveAnalysisParams }> {
    const sessionId = generateSessionId();
    
    const session: AnalysisSession = {
      id: sessionId,
      customer_name: params.customer_name,
      my_product: params.my_product,
      competitor_product: params.competitor_product,
      created_at: new Date(),
      steps: {}
    };
    
    sessions.set(sessionId, session);
    
    return {
      session_id: sessionId,
      basic_info: params
    };
  }

  // 生成产品信息分析
  async generateProductInfo(sessionId: string): Promise<any> {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }

    const prompt = buildProductInfoPrompt(session.my_product, session.competitor_product, session.customer_name);

    const result = await this.callAI(prompt);
    
    // 保存到会话
    session.steps[2] = result;
    sessions.set(sessionId, session);
    
    return result;
  }

  // 生成独有利益分析
  async generateUniqueBenefits(sessionId: string, importantFactors?: string[]): Promise<any> {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }

    const productInfo = session.steps[2];

    const prompt = buildUniqueBenefitsPrompt(productInfo, importantFactors || [], session.customer_name);

    const result = await this.callAI(prompt);
    
    // 保存到会话
    session.steps[4] = result;
    sessions.set(sessionId, session);
    
    return result;
  }

  // 生成探索性问题
  async generateProbingQuestions(sessionId: string, uniqueBenefits?: any[]): Promise<any> {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }

    const benefits = uniqueBenefits || session.steps[4]?.unique_benefits || [];

    const prompt = buildProbingQuestionsPrompt(benefits, session.customer_name);

    const result = await this.callAI(prompt);
    
    // 保存到会话
    session.steps[5] = result;
    sessions.set(sessionId, session);
    
    return result;
  }

  // 生成共同利益分析
  async generateCommonBenefits(sessionId: string): Promise<any> {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }

    const productInfo = session.steps[2];

    const prompt = buildCommonBenefitsPrompt(productInfo, session.customer_name);

    const result = await this.callAI(prompt);
    
    // 保存到会话
    session.steps[6] = result;
    sessions.set(sessionId, session);
    
    return result;
  }

  // 生成劣势应对策略
  async generateWeaknessStrategies(sessionId: string): Promise<any> {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }

    const productInfo = session.steps[2];

    const prompt = buildWeaknessStrategiesPrompt(productInfo, session.customer_name);

    const result = await this.callAI(prompt);
    
    // 保存到会话
    session.steps[7] = result;
    sessions.set(sessionId, session);
    
    return result;
  }

  // 更新步骤数据
  async updateStepData(sessionId: string, step: number, data: any): Promise<void> {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }

    session.steps[step] = data;
    sessions.set(sessionId, session);
  }

  // 获取会话数据
  async getSessionData(sessionId: string): Promise<AnalysisSession> {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }

    return session;
  }

  // 生成最终报告
  async generateFinalReport(sessionId: string): Promise<any> {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }

    return {
      basic_info: {
        customer_name: session.customer_name,
        my_product: session.my_product,
        competitor_product: session.competitor_product,
        created_at: session.created_at
      },
      analysis_data: session.steps,
      summary: {
        total_steps: Object.keys(session.steps).length,
        completed_at: new Date()
      }
    };
  }

  // AI辅助：单个维度建议
  async getDimensionSuggestion(sessionId: string, dimension: string): Promise<any> {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }

    const prompt = buildDimensionSuggestionPrompt(
      dimension,
      session.my_product,
      session.competitor_product,
      session.customer_name
    );

    const result = await this.callAI(prompt);
    return result;
  }

  // AI辅助：独有利益建议
  async getUniqueBenefitsSuggestion(sessionId: string, comparisonData: any, importantFactors: string[]): Promise<any> {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }

    const prompt = buildUniqueBenefitsSuggestionPrompt(comparisonData, importantFactors, session.customer_name);
    const result = await this.callAI(prompt);
    return result;
  }

  // AI辅助：探索性问题建议
  async getProbingQuestionsSuggestion(sessionId: string, uniqueBenefits: any[]): Promise<any> {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }

    const prompt = buildProbingQuestionsSuggestionPrompt(uniqueBenefits, session.customer_name);
    const result = await this.callAI(prompt);
    return result;
  }

  // AI辅助：共同利益建议
  async getCommonBenefitsSuggestion(sessionId: string, comparisonData: any): Promise<any> {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }

    const prompt = buildCommonBenefitsSuggestionPrompt(comparisonData, session.customer_name);
    const result = await this.callAI(prompt);
    return result;
  }

  // AI辅助：劣势应对建议
  async getWeaknessStrategySuggestion(sessionId: string, comparisonData: any): Promise<any> {
    const session = sessions.get(sessionId);
    if (!session) {
      throw new Error('会话不存在');
    }

    const prompt = buildWeaknessStrategySuggestionPrompt(comparisonData, session.customer_name);
    const result = await this.callAI(prompt);
    return result;
  }

  // 调用AI的通用方法
  private async callAI(prompt: string): Promise<any> {
    const config = getAIAPIConfig();
    
    // 尝试调用不同的AI API，按优先级顺序
    const apiMethods = [
      { name: 'KIMI', method: callKimiAPI, enabled: !!config.KIMI_API_KEY },
      { name: 'OpenAI', method: callOpenAIAPI, enabled: !!config.OPENAI_API_KEY }
    ];

    for (const api of apiMethods) {
      if (api.enabled) {
        try {
          console.log(`尝试使用 ${api.name} API...`);
          const result = await api.method(prompt);
          console.log(`${api.name} API 调用成功`);
          return result;
        } catch (error) {
          console.error(`${api.name} API 调用失败:`, error);
          // 继续尝试下一个API
        }
      }
    }

    // 如果所有API都失败，返回模拟数据
    console.log('所有AI API调用失败，返回模拟数据');
    return { error: 'AI服务暂时不可用，请稍后重试' };
  }

  // 保留原有的一键生成方法（向后兼容）
  async generateAnalysis(params: CompetitiveAnalysisParams): Promise<CompetitiveAnalysisResult> {
    // 使用提取的prompt模板
    const promptConfig = getPromptConfig();
    const prompt = buildCustomPrompt(params, promptConfig);
    const config = getAIAPIConfig();
    
    // 调试环境变量
    console.log('环境变量调试:');
    console.log('- process.env.KIMI_API_KEY:', process.env.KIMI_API_KEY ? 'exists' : 'not found');
    console.log('- config.KIMI_API_KEY:', config.KIMI_API_KEY ? 'exists' : 'not found');
    console.log('- KIMI_API_KEY length:', config.KIMI_API_KEY?.length || 0);
    
    // 尝试调用不同的AI API，按优先级顺序
    const apiMethods = [
      { name: 'KIMI', method: callKimiAPI, enabled: !!config.KIMI_API_KEY },
      { name: 'OpenAI', method: callOpenAIAPI, enabled: !!config.OPENAI_API_KEY }
    ];
    
    console.log('API方法状态:');
    apiMethods.forEach(api => {
      console.log(`- ${api.name}: ${api.enabled ? 'enabled' : 'disabled'}`);
    });

    for (const api of apiMethods) {
      if (api.enabled) {
        try {
          console.log(`尝试使用 ${api.name} API 生成竞争分析...`);
          const result = await api.method(prompt);
          console.log(`${api.name} API 调用成功`);
          return result;
        } catch (error) {
          console.error(`${api.name} API 调用失败:`, error);
          // 继续尝试下一个API
        }
      }
    }

    // 如果所有API都失败，返回模拟数据
    console.log('所有AI API调用失败，返回模拟数据');
    return generateMockData(params);
  }
}

export const competitiveAnalysisService = new CompetitiveAnalysisService();