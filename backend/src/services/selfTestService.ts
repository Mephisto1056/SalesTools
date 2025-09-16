import { kimiAPIManager } from './kimiAPIManager';
import {
  buildSelfTestPrompt,
  buildPersonalizedSelfTestPrompt,
  generateMockAnalysis,
  generatePersonalizedMockAnalysis
} from '../prompts/selfTestPrompt';

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
  subDimensionScores: {
    trustEnvironment: number;
    trustCommunication: number;
    connectInsight: number;
    connectDialogue: number;
    enableSupport: number;
    enableEffectiveness: number;
    developGrowth: number;
    developInheritance: number;
  };
}

// 强项和改进项接口
export interface StrengthItem {
  dimension: string;
  subDimension: string;
  score: number;
  displayName: string;
}

export interface ImprovementItem {
  dimension: string;
  subDimension: string;
  score: number;
  displayName: string;
}

// 个人信息接口
export interface PersonalInfo {
  experience?: string;
  teamSize?: string;
  challenges?: string[];
  focusArea?: string;
  learningStyle?: string;
}

// AI分析结果接口
export interface SelfTestAnalysisResult {
  analysis: string;
  recommendations: string[];
  strengths: StrengthItem[];
  improvements: ImprovementItem[];
}

// 获取AI API配置
const getAIAPIConfig = () => ({
  KIMI_API_URL: process.env.KIMI_API_URL || 'https://api.moonshot.cn/v1/chat/completions',
  KIMI_API_KEY_1: process.env.KIMI_API_KEY_1 || process.env.KIMI_API_KEY || '',
  KIMI_API_KEY_2: process.env.KIMI_API_KEY_2 || '',
});

// 维度映射
const dimensionMapping = {
  trustEnvironment: { dimension: 'Trust（信任建设）', subDimension: '信任环境创建能力' },
  trustCommunication: { dimension: 'Trust（信任建设）', subDimension: '安全沟通建立' },
  connectInsight: { dimension: 'Connect（深度连接）', subDimension: '需求洞察能力' },
  connectDialogue: { dimension: 'Connect（深度连接）', subDimension: '深度对话技巧' },
  enableSupport: { dimension: 'Enable（精准赋能）', subDimension: '个性化支持能力' },
  enableEffectiveness: { dimension: 'Enable（精准赋能）', subDimension: '能力建设效果' },
  developGrowth: { dimension: 'Develop（持续发展）', subDimension: '自主成长培养' },
  developInheritance: { dimension: 'Develop（持续发展）', subDimension: '能力传承建设' }
};

// 计算子维度得分
const calculateSubDimensionScores = (scores: any) => {
  return {
    trustEnvironment: scores.trust.environment.reduce((sum: number, score: number) => sum + score, 0),
    trustCommunication: scores.trust.communication.reduce((sum: number, score: number) => sum + score, 0),
    connectInsight: scores.connect.insight.reduce((sum: number, score: number) => sum + score, 0),
    connectDialogue: scores.connect.dialogue.reduce((sum: number, score: number) => sum + score, 0),
    enableSupport: scores.enable.support.reduce((sum: number, score: number) => sum + score, 0),
    enableEffectiveness: scores.enable.effectiveness.reduce((sum: number, score: number) => sum + score, 0),
    developGrowth: scores.develop.growth.reduce((sum: number, score: number) => sum + score, 0),
    developInheritance: scores.develop.inheritance.reduce((sum: number, score: number) => sum + score, 0)
  };
};

// 识别强项（得分>=22分的子维度）
const identifyStrengths = (subDimensionScores: Record<string, number>): StrengthItem[] => {
  const strengths: StrengthItem[] = [];
  
  Object.entries(subDimensionScores).forEach(([key, score]) => {
    if (typeof score === 'number' && score >= 22) {
      const mapping = dimensionMapping[key as keyof typeof dimensionMapping];
      strengths.push({
        dimension: mapping.dimension,
        subDimension: mapping.subDimension,
        score: score,
        displayName: `${mapping.dimension} - ${mapping.subDimension}`
      });
    }
  });
  
  // 按得分降序排列
  return strengths.sort((a, b) => b.score - a.score);
};

// 识别改进项（得分<18分的子维度）
const identifyImprovements = (subDimensionScores: Record<string, number>): ImprovementItem[] => {
  const improvements: ImprovementItem[] = [];
  
  Object.entries(subDimensionScores).forEach(([key, score]) => {
    if (typeof score === 'number' && score < 18) {
      const mapping = dimensionMapping[key as keyof typeof dimensionMapping];
      improvements.push({
        dimension: mapping.dimension,
        subDimension: mapping.subDimension,
        score: score,
        displayName: `${mapping.dimension} - ${mapping.subDimension}`
      });
    }
  });
  
  // 按得分升序排列
  return improvements.sort((a, b) => a.score - b.score);
};


// 调用KIMI API进行分析 - 使用双Key管理器
const callKimiAPI = async (prompt: string): Promise<string> => {
  console.log('🤖 自我测试 - 开始调用KIMI API (双Key模式)...');
  
  try {
    // 使用双Key管理器调用API
    const content = await kimiAPIManager.callKimiAPI(prompt, {
      model: 'moonshot-v1-128k',
      temperature: 0.3,
      max_tokens: 8000,
      timeout: 180000
    });

    console.log('✅ 自我测试 - KIMI API调用成功');
    return content;

  } catch (error: any) {
    console.error('❌ 自我测试 - KIMI API调用错误:', error.message);
    throw error;
  }
};


// 自我测试服务类
class SelfTestService {
  async analyzeAssessment(assessment: SelfTestAssessment, personalInfo?: PersonalInfo): Promise<SelfTestAnalysisResult> {
    // 计算子维度得分
    const subDimensionScores = calculateSubDimensionScores(assessment.scores);
    
    // 更新assessment对象
    assessment.subDimensionScores = subDimensionScores;
    
    // 识别强项和改进项
    const strengths = identifyStrengths(subDimensionScores);
    const improvements = identifyImprovements(subDimensionScores);
    
    // 根据是否有个人信息选择不同的prompt
    const prompt = personalInfo
      ? buildPersonalizedSelfTestPrompt(assessment, strengths, improvements, personalInfo)
      : buildSelfTestPrompt(assessment, strengths, improvements);
    
    const config = getAIAPIConfig();
    
    console.log('开始自我测试分析...');
    console.log('评估数据:', {
      totalScore: assessment.totalScore,
      dimensionScores: assessment.dimensionScores,
      subDimensionScores: assessment.subDimensionScores,
      strengths: strengths.length,
      improvements: improvements.length,
      hasPersonalInfo: !!personalInfo
    });

    let analysis: string;

    // 尝试调用KIMI API
    if (config.KIMI_API_KEY_1 || config.KIMI_API_KEY_2) {
      try {
        console.log('使用KIMI API进行分析...');
        analysis = await callKimiAPI(prompt);
        console.log('KIMI API分析完成');
      } catch (error) {
        console.error('KIMI API调用失败，使用模拟数据:', error);
        analysis = personalInfo
          ? generatePersonalizedMockAnalysis(strengths, improvements, personalInfo)
          : generateMockAnalysis(strengths, improvements);
      }
    } else {
      console.log('KIMI API未配置，使用模拟数据');
      analysis = personalInfo
        ? generatePersonalizedMockAnalysis(strengths, improvements, personalInfo)
        : generateMockAnalysis(strengths, improvements);
    }

    // 从分析结果中提取建议（保持兼容性）
    const recommendations = [
      '发挥强项优势，带动团队成长',
      '针对薄弱环节制定专项提升计划',
      '建立教练型管理系统思维',
      '持续学习和实践最佳管理方法'
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