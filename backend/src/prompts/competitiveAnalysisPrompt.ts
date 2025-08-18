import { CompetitiveAnalysisParams } from '../services/competitiveAnalysisService';

/**
 * 竞争分析提示词模板
 * 可以根据需要修改和优化提示词内容
 */
export const buildCompetitiveAnalysisPrompt = (params: CompetitiveAnalysisParams): string => {
  return `# ROLE:
你是一名顶级的市场策略专家和商业分析师，具备跨行业的深度分析能力。你必须使用网络搜索功能来获取最新、最准确的市场信息和产品资料。

# CONTEXT:
我的客户是 ${params.customer_name}。我需要针对我的产品 ${params.my_product} 和竞争对手的产品 ${params.competitor_product} 进行一次深入的竞争分析，以便更好地向客户展示我方产品的价值。

# IMPORTANT INSTRUCTIONS:
请务必使用网络搜索功能来获取关于这两个产品的最新信息，包括官方网站、产品介绍、用户评价、行业报告等。不要仅凭已有知识回答，必须基于搜索到的实时信息进行分析。

# TASK:
请严格按照以下步骤执行，每一步都要先进行网络搜索获取信息：

1. **信息搜集**: 分别搜索并整理关于 ${params.my_product} 和 ${params.competitor_product} 的以下关键信息：
   * **特征**: 核心功能、技术特点、关键组件、规格参数、独特卖点。
   * **利益**: 这些特征为用户/客户带来的实际价值，如提高效率、降低成本、提升体验、增加收益等。
   * **价格**: 市场定位（高、中、低端）、大致价格范围、商业模式（如一次性购买、订阅制、按使用付费等）。如果找不到精确价格，请根据信息进行合理推断。
   * **供货条件**: 标准交付周期、物流政策、库存情况、地域覆盖等。
   * **服务**: 售后服务承诺、技术支持团队、响应速度、培训计划、维护服务等。
   * **咨询**: 是否提供实施咨询、流程优化、定制化服务等增值服务。

2. **客户需求分析**: 基于客户 ${params.customer_name} 的行业特点、规模、业务需求等，分析并判断哪些要素（例如：性价比、技术先进性、服务质量、长期成本效益、易用性等）对他们来说最为重要。

3. **差异化与策略分析**: 基于以上所有信息，进行深度分析：
   * 识别并列出我方产品的【独有利益】和【核心优势】。
   * 识别并列出竞争对手产品的【独有利益】（即我方的相对劣势）。
   * 针对我方的每一个【独有利益】，设计一个巧妙的【用于挖掘这个需求的问题】，这个问题应该能引导客户自己说出他需要这个利益点。
   * 针对我方的每一个【相对劣势】，提供1-2条【如何克服劣势】的策略建议。

# OUTPUT FORMAT:
请务必、严格地以一个完整的JSON对象格式返回你的所有分析结果，不要包含任何JSON格式之外的解释性文字。JSON结构如下：

{
  "analysis_summary": {
    "table1": {
      "features": {
        "my_product": "...",
        "competitor_product": "..."
      },
      "benefits": {
        "my_product": "...",
        "competitor_product": "..."
      },
      "price": {
        "my_product": "...",
        "competitor_product": "..."
      },
      "supply_terms": {
        "my_product": "...",
        "competitor_product": "..."
      },
      "service": {
        "my_product": "...",
        "competitor_product": "..."
      },
      "consulting": {
        "my_product": "...",
        "competitor_product": "..."
      }
    },
    "most_important_factors_for_customer": [
      "要素1",
      "要素2",
      "要素3"
    ],
    "table2": [
      {
        "my_unique_benefit": "我方独有利益1...",
        "probing_question": "用于挖掘需求的引导性问题1..."
      },
      {
        "my_unique_benefit": "我方独有利益2...",
        "probing_question": "用于挖掘需求的引导性问题2..."
      }
    ],
    "strategic_recommendations": [
      {
        "my_weakness": "竞争对手的独有利益1（我方缺陷）...",
        "overcoming_strategy": "克服此缺陷的策略建议..."
      },
      {
        "my_weakness": "竞争对手的独有利益2（我方缺陷）...",
        "overcoming_strategy": "克服此缺陷的策略建议..."
      }
    ]
  }
}`;
};

/**
 * 提示词配置选项
 * 可以根据不同场景调整提示词的行为
 */
export interface PromptConfig {
  // 是否强调网络搜索
  emphasizeWebSearch?: boolean;
  // 分析深度级别 (basic | detailed | comprehensive)
  analysisDepth?: 'basic' | 'detailed' | 'comprehensive';
  // 特定行业关键词
  industryKeywords?: string[];
  // 自定义指令
  customInstructions?: string;
}

/**
 * 根据配置构建定制化的提示词
 */
export const buildCustomPrompt = (
  params: CompetitiveAnalysisParams, 
  config: PromptConfig = {}
): string => {
  let basePrompt = buildCompetitiveAnalysisPrompt(params);
  
  // 根据配置调整提示词
  if (config.emphasizeWebSearch) {
    basePrompt = basePrompt.replace(
      '# IMPORTANT INSTRUCTIONS:',
      '# CRITICAL REQUIREMENT - MUST USE WEB SEARCH:'
    );
  }
  
  if (config.customInstructions) {
    basePrompt += `\n\n# ADDITIONAL INSTRUCTIONS:\n${config.customInstructions}`;
  }
  
  if (config.industryKeywords && config.industryKeywords.length > 0) {
    basePrompt += `\n\n# INDUSTRY CONTEXT:\n请特别关注以下行业关键词：${config.industryKeywords.join(', ')}`;
  }
  
  return basePrompt;
};

/**
 * 分步骤提示词模板 - 人填表单AI辅助模式
 */

// AI辅助：单个维度的产品信息建议
export const buildDimensionSuggestionPrompt = (dimension: string, myProduct: string, competitorProduct: string, customerName: string): string => {
  const dimensionLabels: { [key: string]: string } = {
    features: '产品特征',
    benefits: '客户利益',
    price: '价格策略',
    supply_terms: '供货条件',
    service: '服务支持',
    consulting: '咨询服务'
  };

  return `# ROLE:
你是一名产品分析专家，专门为销售经理提供产品对比建议。

# TASK:
销售经理正在填写竞争分析表格，需要您为"${dimensionLabels[dimension] || dimension}"这个维度提供建议。

**我的产品**: ${myProduct}
**竞争对手产品**: ${competitorProduct}
**目标客户**: ${customerName}

# INSTRUCTIONS:
1. 请使用网络搜索获取最新的产品信息
2. 重点关注${dimensionLabels[dimension] || dimension}方面的对比
3. 提供简洁、准确、有说服力的建议
4. 建议应该是销售经理可以直接使用的内容

# OUTPUT FORMAT:
请返回JSON格式：

{
  "my_product": "关于我方产品在${dimensionLabels[dimension] || dimension}方面的建议内容",
  "competitor_product": "关于竞争对手产品在${dimensionLabels[dimension] || dimension}方面的分析内容",
  "sales_tips": "针对这个维度的销售建议和话术"
}`;
};

// AI辅助：独有利益分析建议
export const buildUniqueBenefitsSuggestionPrompt = (comparisonData: any, importantFactors: string[], customerName: string): string => {
  return `# ROLE:
你是一名销售策略顾问，专门帮助销售经理识别产品的独有利益。

# CONTEXT:
销售经理已经填写了产品对比信息，现在需要您帮助识别我方产品的独有利益。

**目标客户**: ${customerName}
**客户重要要素**: ${importantFactors.join(', ')}

**已填写的产品对比信息**:
${JSON.stringify(comparisonData, null, 2)}

# TASK:
基于销售经理提供的信息，建议2-3个我方产品的独有利益。

# PRINCIPLES:
- 基于已填写的信息进行分析
- 重点关注客户最重要的要素
- 提供具体、可验证的利益点
- 每个利益都要有明确的客户价值

# OUTPUT FORMAT:
{
  "suggested_benefits": [
    {
      "description": "独有利益的简洁描述",
      "value": "这个利益为客户带来的具体价值",
      "evidence": "支撑这个利益的证据或数据",
      "sales_angle": "在销售中如何表达这个利益"
    }
  ]
}`;
};

// AI辅助：探索性问题生成建议
export const buildProbingQuestionsSuggestionPrompt = (uniqueBenefits: any[], customerName: string): string => {
  return `# ROLE:
你是一名销售培训专家，专门设计探索性问题来挖掘客户需求。

# CONTEXT:
销售经理已经识别了我方产品的独有利益，现在需要您帮助设计探索性问题。

**目标客户**: ${customerName}
**已识别的独有利益**:
${JSON.stringify(uniqueBenefits, null, 2)}

# TASK:
为每个独有利益设计2个探索性问题，帮助销售经理在客户沟通中使用。

# QUESTION DESIGN PRINCIPLES:
- 使用开放式问题，避免是/否问题
- 从客户痛点和现状出发
- 引导客户自己说出需求
- 问题要自然、不显突兀
- 适合在销售对话中使用

# OUTPUT FORMAT:
{
  "question_suggestions": [
    {
      "benefit": "对应的独有利益",
      "question1": "探索性问题1 - 挖掘现状和痛点",
      "question2": "探索性问题2 - 引导需求表达",
      "purpose": "这些问题的设计目的",
      "usage_tips": "使用这些问题的技巧和时机"
    }
  ]
}`;
};

// AI辅助：共同利益差异化建议
export const buildCommonBenefitsSuggestionPrompt = (comparisonData: any, customerName: string): string => {
  return `# ROLE:
你是一名竞争策略专家，专门帮助销售团队在共同利益中找到差异化优势。

# CONTEXT:
销售经理需要分析双方都具备的共同利益，并制定差异化说服策略。

**目标客户**: ${customerName}
**产品对比信息**:
${JSON.stringify(comparisonData, null, 2)}

# TASK:
识别2-3个双方都能提供的共同利益，并为每个利益提供我方的差异化优势。

# STRATEGY FOCUS:
- 不否定竞争对手，而是突出我方的更优表现
- 提供具体的差异化要点
- 给出可操作的说服话术
- 重点关注客户能感知到的差异

# OUTPUT FORMAT:
{
  "common_benefit_suggestions": [
    {
      "description": "双方都具备的共同利益",
      "my_advantage": "我方在此利益上的具体优势或更优表现",
      "persuasion_points": "具体的说服要点和差异化优势",
      "talking_points": "推荐的销售话术"
    }
  ]
}`;
};

// AI辅助：劣势应对策略建议
export const buildWeaknessStrategySuggestionPrompt = (comparisonData: any, customerName: string): string => {
  return `# ROLE:
你是一名销售教练，专门帮助销售团队应对竞争劣势。

# CONTEXT:
销售经理需要识别我方相对于竞争对手的劣势，并制定应对策略。

**目标客户**: ${customerName}
**产品对比信息**:
${JSON.stringify(comparisonData, null, 2)}

# TASK:
基于对比信息，识别2-3个我方的相对劣势，并为每个劣势提供应对策略。

# STRATEGY PRINCIPLES:
- 客观识别劣势，不回避问题
- 提供具体的应对方法
- 重新定义评判标准
- 转移到我方优势领域
- 提供实用的话术框架

# OUTPUT FORMAT:
{
  "weakness_suggestions": [
    {
      "description": "我方的具体劣势",
      "competitor_advantage": "竞争对手在此方面的优势",
      "strategy": "应对这个劣势的具体策略",
      "alternative_focus": "可以转移焦点到的我方优势",
      "response_framework": "客户质疑时的回应话术框架"
    }
  ]
}`;
};

// 步骤2: 产品信息分析提示词（保留原有的完整分析功能）
export const buildProductInfoPrompt = (myProduct: string, competitorProduct: string, customerName: string): string => {
  return `# ROLE:
你是一名专业的产品分析师，专门为销售团队提供产品对比分析。

# TASK:
请分析以下两个产品的详细信息，为销售经理准备备课材料：

**我的产品**: ${myProduct}
**竞争对手产品**: ${competitorProduct}
**目标客户**: ${customerName}

# INSTRUCTIONS:
1. 请使用网络搜索获取最新的产品信息
2. 重点关注销售过程中客户关心的要素
3. 信息要准确、具体、有说服力

# OUTPUT FORMAT:
请返回JSON格式，结构如下：

{
  "my_product": {
    "features": "产品核心特征和技术优势的详细描述",
    "benefits": "为客户带来的具体利益和价值",
    "price": "价格定位、商业模式和成本效益分析",
    "supply_terms": "交付周期、供货能力、地域覆盖等",
    "service": "售后服务、技术支持、培训等服务内容",
    "consulting": "实施咨询、流程优化等增值服务"
  },
  "competitor_product": {
    "features": "竞争对手产品的核心特征和技术特点",
    "benefits": "竞争对手为客户提供的利益和价值",
    "price": "竞争对手的价格策略和成本结构",
    "supply_terms": "竞争对手的供货条件和交付能力",
    "service": "竞争对手的服务支持体系",
    "consulting": "竞争对手提供的咨询和增值服务"
  }
}`;
};

// 步骤4: 独有利益识别提示词
export const buildUniqueBenefitsPrompt = (productInfo: any, importantFactors: string[], customerName: string): string => {
  const factorsText = importantFactors.join(', ');
  
  return `# ROLE:
你是一名销售策略专家，专门帮助销售经理识别产品的独有利益。

# CONTEXT:
基于产品对比分析，为销售经理识别我方产品的独有利益，用于销售备课。

**客户**: ${customerName}
**客户最重要的要素**: ${factorsText}

**产品对比信息**:
${JSON.stringify(productInfo, null, 2)}

# TASK:
识别我方产品相对于竞争对手的独有利益，这些利益应该：
1. 是我方独有的，竞争对手无法提供的
2. 对客户有实际价值
3. 可以在销售过程中作为差异化卖点

# OUTPUT FORMAT:
{
  "unique_benefits": [
    {
      "benefit": "独有利益的清晰描述",
      "importance": "这个利益对客户的重要性和价值",
      "evidence": "支撑这个利益的具体证据或数据",
      "sales_angle": "在销售中如何表达这个利益"
    }
  ]
}`;
};

// 步骤5: 探索性问题设计提示词
export const buildProbingQuestionsPrompt = (uniqueBenefits: any[], customerName: string): string => {
  return `# ROLE:
你是一名销售培训专家，专门设计探索性问题来挖掘客户需求。

# CONTEXT:
为销售经理设计探索性问题，用于在销售过程中引导客户认识到我方产品独有利益的价值。

**客户**: ${customerName}
**我方独有利益**:
${JSON.stringify(uniqueBenefits, null, 2)}

# TASK:
为每个独有利益设计1-2个巧妙的探索性问题，这些问题应该：
1. 引导客户自己说出需求，而不是直接推销
2. 让客户意识到这个利益的重要性
3. 自然地过渡到我方产品的优势介绍

# QUESTION DESIGN PRINCIPLES:
- 使用开放式问题
- 从客户痛点出发
- 引导客户思考现状的不足
- 让客户自己得出结论

# OUTPUT FORMAT:
{
  "probing_questions": [
    {
      "benefit": "对应的独有利益",
      "questions": [
        "探索性问题1 - 挖掘痛点",
        "探索性问题2 - 引导需求"
      ],
      "purpose": "这些问题的设计目的和预期效果",
      "follow_up": "客户回答后的跟进策略"
    }
  ]
}`;
};

// 步骤6: 共同利益分析提示词
export const buildCommonBenefitsPrompt = (productInfo: any, customerName: string): string => {
  return `# ROLE:
你是一名销售策略顾问，专门帮助销售团队在竞争中脱颖而出。

# CONTEXT:
分析双方都具备的共同利益，并为销售经理制定差异化说服策略。

**客户**: ${customerName}
**产品对比信息**:
${JSON.stringify(productInfo, null, 2)}

# TASK:
1. 识别双方都能提供的共同利益
2. 分析我方在这些共同利益上的微妙优势
3. 设计说服策略，让客户选择我方而非竞争对手

# STRATEGY FOCUS:
- 不是否定竞争对手，而是突出我方的更优表现
- 提供具体的差异化要点
- 给出可操作的说服话术

# OUTPUT FORMAT:
{
  "common_benefits": [
    {
      "benefit": "双方都具备的共同利益",
      "my_advantage": "我方在此利益上的具体优势或更优表现",
      "persuasion_points": [
        "说服要点1 - 具体的差异化优势",
        "说服要点2 - 客户能感知到的价值差异"
      ],
      "talking_points": "推荐的销售话术或表达方式"
    }
  ]
}`;
};

// 步骤7: 劣势应对策略提示词
export const buildWeaknessStrategiesPrompt = (productInfo: any, customerName: string): string => {
  return `# ROLE:
你是一名销售教练，专门帮助销售团队应对竞争劣势。

# CONTEXT:
识别我方相对于竞争对手的劣势，并制定应对策略。

**客户**: ${customerName}
**产品对比信息**:
${JSON.stringify(productInfo, null, 2)}

# TASK:
1. 客观识别我方的相对劣势
2. 为每个劣势制定应对策略
3. 提供转移焦点的方法

# STRATEGY PRINCIPLES:
- 承认劣势但不放大
- 转移到我方优势
- 重新定义评判标准
- 提供替代解决方案

# OUTPUT FORMAT:
{
  "weaknesses": [
    {
      "weakness": "我方的具体劣势描述",
      "competitor_advantage": "竞争对手在此方面的优势",
      "overcoming_strategies": [
        "应对策略1 - 如何化解或淡化这个劣势",
        "应对策略2 - 如何转移到我方优势"
      ],
      "alternative_focus": "可以转移焦点到的我方优势领域",
      "response_framework": "遇到客户质疑时的回应框架"
    }
  ]
}`;
};