import axios from 'axios';
import {
  buildFailureAnalysisPrompt,
  generateMockFailureAnalysis
} from '../prompts/failureAnalysisPrompt';

// 失败分析请求接口
export interface FailureAnalysisRequest {
  case_description: string;
}

// 字段预测请求接口
export interface FieldPredictionRequest {
  field_type: 'factor_analysis' | 'follow_up_action' | 'opportunity_signal';
  field_name: string;
  context?: string;
  case_description?: string;
}

// 失败分析结果接口
export interface FailureAnalysisResult {
  failure_analysis: Array<{
    factor: string;
    impact: 'positive' | 'negative';
    explanation: string;
    lesson: string;
  }>;
  follow_up_plan: {
    immediate_actions: Array<{
      action: string;
      is_selected: boolean;
      timing_suggestion: string;
    }>;
    long_term_relations: Array<{
      action: string;
      is_selected: boolean;
      details_suggestion: string;
    }>;
  };
  opportunity_signals: Array<{
    signal: string;
    is_relevant: boolean;
    timing_suggestion: string;
  }>;
}

// 获取AI API配置
const getAIAPIConfig = () => ({
  KIMI_API_URL: process.env.KIMI_API_URL || 'https://api.moonshot.cn/v1/chat/completions',
  KIMI_API_KEY: process.env.KIMI_API_KEY || '',
});

// 调用KIMI API进行分析
const callKimiAPI = async (prompt: string): Promise<string> => {
  const config = getAIAPIConfig();
  
  console.log('失败分析 - KIMI API配置检查:');
  console.log('- API URL:', config.KIMI_API_URL);
  console.log('- API Key存在:', !!config.KIMI_API_KEY);

  if (!config.KIMI_API_KEY) {
    throw new Error('KIMI API密钥未配置');
  }

  try {
    console.log('开始调用KIMI API进行失败分析...');
    
    const requestBody = {
      model: 'kimi-k2-0711-preview',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 8000
    };

    const response = await axios.post(
      config.KIMI_API_URL,
      requestBody,
      {
        headers: {
          'Authorization': `Bearer ${config.KIMI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 180000 // 180秒超时
      }
    );

    console.log('KIMI API响应状态:', response.status);
    
    const content = (response.data as any).choices[0].message.content;
    return content;

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

// 解析AI返回的JSON结果
const parseAIResponse = (response: string): FailureAnalysisResult => {
  try {
    // 尝试提取JSON部分
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI响应中未找到有效的JSON格式');
    }
    
    const jsonStr = jsonMatch[0];
    const parsed = JSON.parse(jsonStr);
    
    // 验证必需的字段
    if (!parsed.failure_analysis || !parsed.follow_up_plan || !parsed.opportunity_signals) {
      throw new Error('AI响应格式不完整');
    }
    
    return parsed as FailureAnalysisResult;
  } catch (error) {
    console.error('解析AI响应失败:', error);
    throw new Error('AI响应格式错误，无法解析');
  }
};

// 失败分析服务类
class FailureAnalysisService {
  async analyzeFailure(request: FailureAnalysisRequest): Promise<FailureAnalysisResult> {
    const { case_description } = request;
    
    if (!case_description || case_description.trim().length < 50) {
      throw new Error('案例描述过于简短，请提供更详细的信息');
    }
    
    console.log('开始失败分析...');
    console.log('案例描述长度:', case_description.length);
    
    const prompt = buildFailureAnalysisPrompt(case_description);
    const config = getAIAPIConfig();
    
    let analysisResult: FailureAnalysisResult;
    
    // 尝试调用KIMI API
    if (config.KIMI_API_KEY) {
      try {
        console.log('使用KIMI API进行失败分析...');
        const aiResponse = await callKimiAPI(prompt);
        console.log('KIMI API分析完成，开始解析结果...');
        
        analysisResult = parseAIResponse(aiResponse);
        console.log('AI分析结果解析成功');
      } catch (error) {
        console.error('KIMI API调用失败，使用模拟数据:', error);
        analysisResult = generateMockFailureAnalysis(case_description);
      }
    } else {
      console.log('KIMI API未配置，使用模拟数据');
      analysisResult = generateMockFailureAnalysis(case_description);
    }
    
    // 数据后处理和验证
    this.validateAndEnhanceResult(analysisResult);
    
    return analysisResult;
  }

  // AI预测单个字段内容
  async predictField(request: FieldPredictionRequest): Promise<string> {
    const { field_type, field_name, context, case_description } = request;
    
    console.log('开始字段预测...');
    console.log('字段类型:', field_type, '字段名称:', field_name);
    
    const prompt = this.buildFieldPredictionPrompt(field_type, field_name, context, case_description);
    const config = getAIAPIConfig();
    
    let prediction: string;
    
    // 尝试调用KIMI API
    if (config.KIMI_API_KEY) {
      try {
        console.log('使用KIMI API进行字段预测...');
        const aiResponse = await callKimiAPI(prompt);
        console.log('KIMI API字段预测完成');
        
        // 提取预测内容（去除多余的格式）
        prediction = this.extractPredictionFromResponse(aiResponse);
      } catch (error) {
        console.error('KIMI API调用失败，使用默认预测:', error);
        prediction = this.generateDefaultPrediction(field_type, field_name);
      }
    } else {
      console.log('KIMI API未配置，使用默认预测');
      prediction = this.generateDefaultPrediction(field_type, field_name);
    }
    
    return prediction;
  }

  // 构建字段预测提示词
  private buildFieldPredictionPrompt(field_type: string, field_name: string, context?: string, case_description?: string): string {
    let prompt = '';
    
    switch (field_type) {
      case 'factor_analysis':
        prompt = `# 任务：预测失败分析因素的具体内容

你是一位专业的销售分析师。请根据以下信息，为"${field_name}"这个因素预测具体的内容。

${case_description ? `案例背景：${case_description}` : ''}
${context ? `当前上下文：${context}` : ''}

请针对"${field_name}"这个因素，预测以下内容之一：
- 如果是"正面或负面影响的具体说明"：请用一句话简洁地说明这个因素在此案例中的具体影响
- 如果是"所吸取的教训"：请提供一条具体可操作的经验教训

要求：
1. 回答要简洁明了，不超过50字
2. 内容要具体实用，避免空泛的表述
3. 直接给出预测内容，不要额外的解释

预测内容：`;
        break;
        
      case 'follow_up_action':
        prompt = `# 任务：预测跟进行动的时机建议

你是一位专业的客户关系管理专家。请为以下跟进行动预测合适的执行时机。

行动内容：${field_name}
${case_description ? `案例背景：${case_description}` : ''}
${context ? `当前上下文：${context}` : ''}

请预测这个行动的最佳执行时机，要求：
1. 时机建议要具体明确
2. 考虑客户心理和商业礼仪
3. 不超过30字
4. 直接给出时机建议，不要额外解释

时机建议：`;
        break;
        
      case 'opportunity_signal':
        prompt = `# 任务：预测机会信号的跟进建议

你是一位专业的销售机会管理专家。请为以下机会信号预测合适的跟进方式。

机会信号：${field_name}
${case_description ? `案例背景：${case_description}` : ''}
${context ? `当前上下文：${context}` : ''}

请预测针对这个信号的最佳跟进建议，要求：
1. 跟进建议要具体可操作
2. 考虑信号的特点和时效性
3. 不超过40字
4. 直接给出跟进建议，不要额外解释

跟进建议：`;
        break;
        
      default:
        prompt = `请为"${field_name}"提供相关的专业建议。${context ? `上下文：${context}` : ''}`;
    }
    
    return prompt;
  }

  // 从AI响应中提取预测内容
  private extractPredictionFromResponse(response: string): string {
    // 去除多余的格式和标记
    let prediction = response.trim();
    
    // 移除常见的前缀
    const prefixes = ['预测内容：', '时机建议：', '跟进建议：', '建议：', '答案：'];
    for (const prefix of prefixes) {
      if (prediction.startsWith(prefix)) {
        prediction = prediction.substring(prefix.length).trim();
        break;
      }
    }
    
    // 移除引号
    prediction = prediction.replace(/^["']|["']$/g, '');
    
    // 限制长度
    if (prediction.length > 100) {
      prediction = prediction.substring(0, 100) + '...';
    }
    
    return prediction;
  }

  // 生成默认预测内容
  private generateDefaultPrediction(field_type: string, field_name: string): string {
    switch (field_type) {
      case 'factor_analysis':
        if (field_name.includes('教训')) {
          return '需要深入分析此因素的影响，制定针对性的改进策略';
        } else {
          return '此因素对业务结果产生了重要影响，需要重点关注';
        }
        
      case 'follow_up_action':
        return '建议在适当时机执行，保持专业和耐心';
        
      case 'opportunity_signal':
        return '持续关注相关动态，及时把握机会';
        
      default:
        return '请根据具体情况进行分析和判断';
    }
  }
  
  // 验证和增强分析结果
  private validateAndEnhanceResult(result: FailureAnalysisResult): void {
    // 确保失败分析至少有4个因素
    if (result.failure_analysis.length < 4) {
      const additionalFactors = [
        {
          factor: "沟通策略",
          impact: "negative" as const,
          explanation: "沟通方式或频率未能有效建立客户信任",
          lesson: "需要改进沟通策略，建立更有效的客户关系"
        },
        {
          factor: "需求匹配度",
          impact: "negative" as const,
          explanation: "产品或服务与客户实际需求存在偏差",
          lesson: "深入了解客户真实需求，提供更精准的解决方案"
        }
      ];
      
      while (result.failure_analysis.length < 4 && additionalFactors.length > 0) {
        result.failure_analysis.push(additionalFactors.shift()!);
      }
    }
    
    // 确保短期行动至少有3个
    if (result.follow_up_plan.immediate_actions.length < 3) {
      const additionalActions = [
        {
          action: "向客户表达感谢并保持专业关系",
          is_selected: false,
          timing_suggestion: "失败通知后一周内"
        },
        {
          action: "请求客户提供改进建议和反馈",
          is_selected: false,
          timing_suggestion: "在适当的时机，以学习的心态询问"
        }
      ];
      
      while (result.follow_up_plan.immediate_actions.length < 3 && additionalActions.length > 0) {
        result.follow_up_plan.immediate_actions.push(additionalActions.shift()!);
      }
    }
    
    // 确保长期关系维护至少有2个
    if (result.follow_up_plan.long_term_relations.length < 2) {
      const additionalRelations = [
        {
          action: "建立定期的价值分享机制",
          is_selected: false,
          details_suggestion: "定期分享行业洞察、市场趋势或相关成功案例"
        }
      ];
      
      while (result.follow_up_plan.long_term_relations.length < 2 && additionalRelations.length > 0) {
        result.follow_up_plan.long_term_relations.push(additionalRelations.shift()!);
      }
    }
    
    // 确保机会信号至少有4个
    if (result.opportunity_signals.length < 4) {
      const additionalSignals = [
        {
          signal: "行业政策或法规发生变化",
          is_relevant: false,
          timing_suggestion: "关注行业新闻和政策动态"
        },
        {
          signal: "客户公司获得新的投资或融资",
          is_relevant: false,
          timing_suggestion: "通过财经新闻和公司公告了解"
        }
      ];
      
      while (result.opportunity_signals.length < 4 && additionalSignals.length > 0) {
        result.opportunity_signals.push(additionalSignals.shift()!);
      }
    }
  }
}

export const failureAnalysisService = new FailureAnalysisService();