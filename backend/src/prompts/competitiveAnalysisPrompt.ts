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