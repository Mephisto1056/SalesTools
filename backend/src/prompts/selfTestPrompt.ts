import { SelfTestAssessment, StrengthItem, ImprovementItem } from '../services/selfTestService';

// 构建自我测试分析提示词
export const buildSelfTestPrompt = (
  assessment: SelfTestAssessment, 
  strengths: StrengthItem[], 
  improvements: ImprovementItem[]
): string => {
  const { totalScore, dimensionScores, subDimensionScores } = assessment;
  
  // 构建强项描述
  const strengthsText = strengths.length > 0 
    ? strengths.map(s => `${s.displayName}（${s.score}分）`).join('、')
    : '暂无突出强项';
    
  // 构建改进项描述
  const improvementsText = improvements.length > 0
    ? improvements.map(i => `${i.displayName}（${i.score}分）`).join('、')
    : '各项能力均达到基础水平';
  
  return `
作为一名专业的销售管理顾问，请基于以下销售辅导能力评估结果，提供个性化的销售辅导能力建议。

## 评估数据
总分：${totalScore} / 200 分

各维度得分：
- Trust（信任建设）：${dimensionScores.trust} / 50 分
- Connect（深度连接）：${dimensionScores.connect} / 50 分
- Enable（精准赋能）：${dimensionScores.enable} / 50 分
- Develop（持续发展）：${dimensionScores.develop} / 50 分

各子维度得分：
- Trust（信任建设） - 信任环境创建能力：${subDimensionScores.trustEnvironment} / 25 分
- Trust（信任建设） - 安全沟通建立：${subDimensionScores.trustCommunication} / 25 分
- Connect（深度连接） - 需求洞察能力：${subDimensionScores.connectInsight} / 25 分
- Connect（深度连接） - 深度对话技巧：${subDimensionScores.connectDialogue} / 25 分
- Enable（精准赋能） - 个性化支持能力：${subDimensionScores.enableSupport} / 25 分
- Enable（精准赋能） - 能力建设效果：${subDimensionScores.enableEffectiveness} / 25 分
- Develop（持续发展） - 自主成长培养：${subDimensionScores.developGrowth} / 25 分
- Develop（持续发展） - 能力传承建设：${subDimensionScores.developInheritance} / 25 分

## 能力分析
可发挥的强项：${strengthsText}
重点改进方向：${improvementsText}

## 要求
请提供个性化的销售辅导能力建议，格式如下：

**强项发挥建议：**
[针对具体强项子维度的发挥建议和发展方向，不要具体操作步骤]

**改进提升建议：**
[针对具体薄弱子维度的提升建议和发展方向，不要具体操作步骤]

**综合发展建议：**
[整体能力提升的方向性建议]

要求：
- 每条建议要明确指出针对的具体子维度（格式：针对【大项-小项】）
- 提供建议和方向，不要具体的操作步骤
- 语言简洁明了，体现教练型销售管理的理念
- 建立评估结果与发展建议的明确连结
- 重点关注能力发展的方向性指导
`;
};

// 构建个性化自我测试分析提示词（包含用户背景信息）
export const buildPersonalizedSelfTestPrompt = (
  assessment: SelfTestAssessment, 
  strengths: StrengthItem[], 
  improvements: ImprovementItem[],
  personalInfo: {
    experience?: string;
    teamSize?: string;
    challenges?: string[];
    focusArea?: string;
    learningStyle?: string;
  }
): string => {
  const basePrompt = buildSelfTestPrompt(assessment, strengths, improvements);
  
  // 构建个人背景信息
  const personalContext = `
## 个人背景信息
- 管理经验：${personalInfo.experience || '未提供'}
- 团队规模：${personalInfo.teamSize || '未提供'}
- 当前挑战：${personalInfo.challenges?.join('、') || '未提供'}
- 重点关注：${personalInfo.focusArea || '未提供'}
- 学习偏好：${personalInfo.learningStyle || '未提供'}
`;

  return basePrompt.replace(
    '## 要求',
    `${personalContext}

## 要求
请结合以上个人背景信息，提供更加精准和个性化的销售辅导能力建议，格式如下：

**强项发挥建议：**
[结合个人背景，针对具体强项子维度的发挥建议和发展方向]

**改进提升建议：**
[结合个人背景和当前挑战，针对具体薄弱子维度的提升建议和发展方向]

**综合发展建议：**
[基于个人经验水平、团队规模和学习偏好的整体能力提升建议]

要求：
- 每条建议要明确指出针对的具体子维度（格式：针对【大项-小项】）
- 结合个人背景信息，提供更精准的建议和方向
- 考虑管理经验、团队规模等实际情况
- 语言简洁明了，体现教练型销售管理的理念
- 建立评估结果与个人背景的深度连结`
  );
};

// 生成模拟分析结果
export const generateMockAnalysis = (strengths: StrengthItem[], improvements: ImprovementItem[]): string => {
  let strengthAdvice = '';
  let improvementAdvice = '';
  
  if (strengths.length > 0) {
    const topStrength = strengths[0];
    strengthAdvice = `**强项发挥建议：**
针对【${topStrength.displayName}】：您在此领域表现优秀，建议将这一优势作为个人品牌和团队发展的核心驱动力，通过示范引领和经验分享，扩大影响力并带动整体团队能力提升。`;
  } else {
    strengthAdvice = `**强项发挥建议：**
基于您的整体表现，建议继续保持现有的管理理念和方法，在稳定的基础上寻求突破和创新。`;
  }
  
  if (improvements.length > 0) {
    const topImprovement = improvements[0];
    improvementAdvice = `**改进提升建议：**
针对【${topImprovement.displayName}】：这是您当前最需要关注的发展方向，建议将其作为个人能力提升的重点领域，通过系统性学习和持续实践来强化这一核心能力。`;
  } else {
    improvementAdvice = `**改进提升建议：**
您的各项能力均达到良好水平，建议在现有基础上追求精益求精，向更高层次的管理境界迈进。`;
  }

  return `${strengthAdvice}

${improvementAdvice}

**综合发展建议：**
建议建立系统性的能力发展框架，将强项能力与改进方向有机结合，形成个人独特的教练型管理风格，在发挥优势的同时补强短板，实现全面而均衡的能力提升。`;
};

// 生成个性化模拟分析结果
export const generatePersonalizedMockAnalysis = (
  strengths: StrengthItem[], 
  improvements: ImprovementItem[],
  personalInfo: {
    experience?: string;
    teamSize?: string;
    challenges?: string[];
    focusArea?: string;
    learningStyle?: string;
  }
): string => {
  const baseAnalysis = generateMockAnalysis(strengths, improvements);
  
  // 根据个人信息调整建议
  let personalizedAdvice = baseAnalysis;
  
  if (personalInfo.experience === '1年以下') {
    personalizedAdvice = personalizedAdvice.replace(
      '通过示范引领和经验分享',
      '通过学习最佳实践和寻求导师指导'
    );
  }
  
  if (personalInfo.teamSize === '5人以下') {
    personalizedAdvice = personalizedAdvice.replace(
      '带动整体团队能力提升',
      '在小团队中建立紧密的协作关系'
    );
  }
  
  return personalizedAdvice;
};