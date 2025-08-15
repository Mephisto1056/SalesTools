import axios from 'axios';

// 自我测试评估数据接口
export interface SelfTestAssessment {
  scores: {
    trust: {
      environment: number[];
      communication: number[];
    };
    connect: {
      insight: number[];
      dialogue: number[];
    };
    enable: {
      support: number[];
      effectiveness: number[];
    };
    develop: {
      growth: number[];
      inheritance: number[];
    };
  };
  totalScore: number;
  dimensionScores: {
    trust: number;
    connect: number;
    enable: number;
    develop: number;
  };
}

// AI分析结果接口
export interface SelfTestAnalysisResult {
  analysis: string;
  recommendations: string[];
  strengths: string[];
  improvements: string[];
}

// 获取AI API配置
const getAIAPIConfig = () => ({
  KIMI_API_URL: process.env.KIMI_API_URL || 'https://api.moonshot.cn/v1/chat/completions',
  KIMI_API_KEY: process.env.KIMI_API_KEY || '',
});

// 构建自我测试分析提示词
const buildSelfTestPrompt = (assessment: SelfTestAssessment): string => {
  const { totalScore, dimensionScores } = assessment;
  
  // 计算最低分和次低分维度
  const dimensions = [
    { name: 'Trust（信任建设）', score: dimensionScores.trust },
    { name: 'Connect（深度连接）', score: dimensionScores.connect },
    { name: 'Enable（精准赋能）', score: dimensionScores.enable },
    { name: 'Develop（持续发展）', score: dimensionScores.develop }
  ];
  dimensions.sort((a, b) => a.score - b.score);
  const lowestDimension = dimensions[0];
  const secondLowestDimension = dimensions[1];
  
  return `
作为一名专业的销售管理顾问，请基于以下销售辅导能力评估结果，提供个人行动计划。

## 评估数据
总分：${totalScore} / 200 分

各维度得分：
- Trust（信任建设）：${dimensionScores.trust} / 50 分
- Connect（深度连接）：${dimensionScores.connect} / 50 分
- Enable（精准赋能）：${dimensionScores.enable} / 50 分
- Develop（持续发展）：${dimensionScores.develop} / 50 分

## 重点改进维度识别
最低分维度：${lowestDimension.name}（${lowestDimension.score}分）- 重点改进方向
次低分维度：${secondLowestDimension.name}（${secondLowestDimension.score}分）- 次要改进方向

## 要求
请只提供个人行动计划的三条具体建议，格式如下：

基于评估结果，我计划重点提升：
1. [针对${lowestDimension.name}的具体、可操作的改进建议]
2. [针对${secondLowestDimension.name}的具体、可操作的改进建议]
3. [整体能力提升的具体、可操作的综合建议]

要求：
- 每条建议要具体、可操作
- 语言简洁明了
- 体现教练型销售管理的理念
- 只返回这三条建议，不要其他内容
`;
};

// 调用KIMI API进行分析
const callKimiAPI = async (prompt: string): Promise<string> => {
  const config = getAIAPIConfig();
  
  console.log('自我测试 - KIMI API配置检查:');
  console.log('- API URL:', config.KIMI_API_URL);
  console.log('- API Key存在:', !!config.KIMI_API_KEY);

  if (!config.KIMI_API_KEY) {
    throw new Error('KIMI API密钥未配置');
  }

  try {
    console.log('开始调用KIMI API进行自我测试分析...');
    
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

// 生成模拟分析结果
const generateMockAnalysis = (assessment: SelfTestAssessment): string => {
  const { dimensionScores } = assessment;
  
  // 找出最低分和次低分维度
  const dimensions = [
    { name: 'Trust（信任建设）', score: dimensionScores.trust },
    { name: 'Connect（深度连接）', score: dimensionScores.connect },
    { name: 'Enable（精准赋能）', score: dimensionScores.enable },
    { name: 'Develop（持续发展）', score: dimensionScores.develop }
  ];
  
  dimensions.sort((a, b) => a.score - b.score);
  const lowestDimension = dimensions[0];
  const secondLowestDimension = dimensions[1];

  return `基于评估结果，我计划重点提升：
1. 针对${lowestDimension.name}：每周安排2次团队一对一沟通，建立开放透明的反馈机制，主动承认错误并鼓励团队分享困难
2. 针对${secondLowestDimension.name}：深入了解每个团队成员的职业目标和个人挑战，制定个性化的发展计划和指导方式
3. 整体能力提升：参加教练型领导力培训课程，建立定期的自我反思机制，持续学习和实践销售管理最佳实践`;
};

// 自我测试服务类
class SelfTestService {
  async analyzeAssessment(assessment: SelfTestAssessment): Promise<SelfTestAnalysisResult> {
    const prompt = buildSelfTestPrompt(assessment);
    const config = getAIAPIConfig();
    
    console.log('开始自我测试分析...');
    console.log('评估数据:', {
      totalScore: assessment.totalScore,
      dimensionScores: assessment.dimensionScores
    });

    let analysis: string;

    // 尝试调用KIMI API
    if (config.KIMI_API_KEY) {
      try {
        console.log('使用KIMI API进行分析...');
        analysis = await callKimiAPI(prompt);
        console.log('KIMI API分析完成');
      } catch (error) {
        console.error('KIMI API调用失败，使用模拟数据:', error);
        analysis = generateMockAnalysis(assessment);
      }
    } else {
      console.log('KIMI API未配置，使用模拟数据');
      analysis = generateMockAnalysis(assessment);
    }

    // 从分析结果中提取建议和优势（简化版本）
    const recommendations = [
      '定期进行一对一深度交流',
      '建立团队反馈机制',
      '参加教练型领导力培训',
      '制定个人发展计划'
    ];

    const strengths = [
      '具备基础的管理理念',
      '关注团队成员发展',
      '愿意自我反思和改进'
    ];

    const improvements = [
      '加强深度沟通技巧',
      '提升个性化指导能力',
      '建立系统化的培养机制'
    ];

    return {
      analysis,
      recommendations,
      strengths,
      improvements
    };
  }
}

export const selfTestService = new SelfTestService();