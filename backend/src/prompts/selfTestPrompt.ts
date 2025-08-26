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

Part I - 强项发挥建议：
[针对具体强项子维度的actionable建议，给出可操作的方向和关键行动]

Part II - 改进提升建议：
[针对具体薄弱子维度的actionable提升方案，给出可操作的方向和关键行动]

Part III - 综合发展建议：
[整体能力提升的actionable建议，给出可操作的发展方向]

Part IV - 行动策略建议：
[提供可操作的策略建议，如"每周一次做什么"的具体行动指引]

要求：
- 每条建议要明确指出针对的具体子维度（格式：针对【大项-小项】），但是不要出现具体分数
- 提供actionable的建议，重点是可操作的方向和关键行动，不要过于详细的步骤
- 给出明确但简洁的实践方向和策略建议
- 语言简洁明了，体现教练型销售管理的理念
- 建立评估结果与可操作行动的明确连结
- 重点关注可立即执行的关键措施和策略方向
- 在行动策略中，给出类似"每周一次做什么"的具体但不冗长的行动指引，按周为单位进行即可
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
针对【${topStrength.displayName}】：您在此领域表现优秀，建议将此优势作为团队发展的核心驱动力。通过定期分享最佳实践、建立标准化流程、开展一对一辅导，将个人优势转化为团队能力。`;
  } else {
    strengthAdvice = `**强项发挥建议：**
基于您的整体表现，建议继续保持现有的管理理念和方法，通过定期自我反思和持续学习，在稳定的基础上寻求突破和创新。`;
  }
  
  if (improvements.length > 0) {
    const topImprovement = improvements[0];
    improvementAdvice = `**改进提升建议：**
针对【${topImprovement.displayName}】：这是您当前最需要关注的发展方向。建议通过系统性学习理论知识、在实际工作中刻意练习、寻求导师指导和同行交流，逐步强化这一核心能力。`;
  } else {
    improvementAdvice = `**改进提升建议：**
您的各项能力均达到良好水平，建议在现有基础上追求精益求精，通过挑战新的管理难题、参加高级培训、建立同行交流网络，向更高层次的管理境界迈进。`;
  }

  const actionStrategy = `**行动策略建议：**
• 每周一次：组织团队复盘会议，分享成功经验和改进点
• 每月一次：进行深度的一对一团队成员辅导
• 每季度一次：参加专业培训或同行交流活动
• 持续进行：建立日常反思习惯，记录管理心得和团队反馈`;

  return `${strengthAdvice}

${improvementAdvice}

**综合发展建议：**
建议建立系统性的能力发展框架，将强项能力与改进方向有机结合，形成个人独特的教练型管理风格。重点关注能力的持续迭代和团队的协同成长。

${actionStrategy}`;
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
  let strengthAdvice = '';
  let improvementAdvice = '';
  
  // 根据经验水平调整强项发挥建议
  if (strengths.length > 0) {
    const topStrength = strengths[0];
    if (personalInfo.experience === '1年以下') {
      strengthAdvice = `**强项发挥建议：**
针对【${topStrength.displayName}】：作为新手管理者，您在此领域表现优秀。建议通过学习最佳实践、寻求导师指导、在团队中小范围试验优势方法，将个人优势转化为团队成长的驱动力。`;
    } else if (personalInfo.teamSize === '5人以下') {
      strengthAdvice = `**强项发挥建议：**
针对【${topStrength.displayName}】：在小团队管理中，您的优势更容易发挥。建议通过密切的一对一沟通、建立内部分享机制、利用小团队灵活性快速试验，将优势方法传承给每位成员。`;
    } else {
      strengthAdvice = `**强项发挥建议：**
针对【${topStrength.displayName}】：您在此领域表现优秀。建议通过定期团队分享、建立标准化流程、开展重点辅导、建立成功案例库，将个人优势转化为团队能力。`;
    }
  } else {
    strengthAdvice = `**强项发挥建议：**
基于您的${personalInfo.experience || '当前'}经验水平，建议通过定期自我反思、持续学习适合团队规模的管理方法、建立管理实践记录，在稳定基础上寻求突破。`;
  }
  
  // 根据个人背景调整改进建议
  if (improvements.length > 0) {
    const topImprovement = improvements[0];
    let learningApproach = '';
    
    if (personalInfo.experience === '1年以下') {
      learningApproach = '重点关注基础理论学习和导师指导';
    } else if (personalInfo.teamSize === '5人以下') {
      learningApproach = '利用小团队环境进行快速试验和调整';
    } else {
      learningApproach = '通过系统性培训和标准化实践';
    }
    
    improvementAdvice = `**改进提升建议：**
针对【${topImprovement.displayName}】：结合您的${personalInfo.experience || '当前'}经验和${personalInfo.teamSize || '团队'}规模，建议${learningApproach}，通过刻意练习、同行交流、建立改进记录，逐步强化这一核心能力。`;
  } else {
    improvementAdvice = `**改进提升建议：**
您的各项能力均达到良好水平。建议根据您的背景，通过挑战适合经验水平的管理难题、参加针对性培训、建立同行交流网络，向更高层次迈进。`;
  }

  // 根据个人信息定制行动策略
  let personalizedActionStrategy = '';
  if (personalInfo.experience === '1年以下') {
    personalizedActionStrategy = `**个性化行动策略：**
• 每周一次：与导师或经验丰富的同事进行学习交流
• 每月一次：参加新手管理者培训或学习活动
• 持续进行：观察学习优秀管理者的方法，建立学习笔记
• 定期实践：在安全环境下小步试验新学到的管理技巧`;
  } else if (personalInfo.teamSize === '5人以下') {
    personalizedActionStrategy = `**个性化行动策略：**
• 每周一次：与每位团队成员进行深度一对一沟通
• 每月一次：组织小团队复盘会，分享管理心得和改进点
• 持续进行：利用小团队灵活性，快速试验和优化管理方法
• 定期建设：培养团队成员的自主性和协作能力`;
  } else {
    personalizedActionStrategy = `**个性化行动策略：**
• 每周一次：组织团队分享会，传播最佳实践和成功经验
• 每月一次：进行重点人员的深度辅导和能力发展规划
• 持续进行：建立标准化的管理流程和培训体系
• 定期优化：收集团队反馈，持续改进管理方法和体系`;
  }

  return `${strengthAdvice}

${improvementAdvice}

**综合发展建议：**
基于您的${personalInfo.experience || '当前'}管理经验和${personalInfo.teamSize || '团队'}规模，建议建立适合自身情况的能力发展框架，将强项能力与改进方向有机结合，形成个人独特的教练型管理风格。

${personalizedActionStrategy}`;
};