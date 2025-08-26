// 失败分析提示词模板

export const buildFailureAnalysisPrompt = (caseDescription: string): string => {
  return `
# ROLE:
你是一位顶级的销售策略复盘专家和商业分析师。你擅长从复杂的失败案例描述中，精准地识别出关键影响因素，提炼出深刻的教训，并制定出面向未来的、可执行的行动计划。

# CONTEXT:
我将为你提供一段关于我最近一次业务拓展失败的详细描述。我需要你帮助我，以一个"聪明的失败者"的视角，对这次经历进行一次彻底的、结构化的复盘。

# TASK:
请严格按照以下三个步骤，对用户提供的案例描述进行分析，并利用你的专业知识进行补充和判断。

1. **根本原因分析 (Root Cause Analysis)**:
   * 仔细阅读案例，识别出影响本次业务拓展成败的所有关键因素（至少包括：产品特征、价格、条件和条款、竞争对手、时间框架、决策者变化等）。
   * 为每个因素判断其在此次案例中是正面影响(+)还是负面影响(-)。
   * 用一句话精炼地解释该因素为什么会产生这种影响。
   * 基于以上分析，为每个因素总结出一条最具操作性的教训。

2. **跟进行动计划 (Follow-up Action Plan)**:
   * 基于案例的背景，智能判断在业务失败后，最应该立即执行的短期行动是什么，并给出建议的执行时机。
   * 为了与客户建立长期关系，从更长远的角度，建议应采取哪些维系关系的行动，并给出具体的操作建议（例如：寄送什么主题的材料）。

3. **未来机会识别 (Opportunity Signal Identification)**:
   * 根据案例信息，预测哪些信号或迹象的出现，可能意味着新的合作机会再次到来。并建议一个合适的跟进或观察频率。

# 案例描述:
${caseDescription}

# OUTPUT FORMAT:
请务必、严格地以一个完整的JSON对象格式返回你的所有分析结果，不要包含任何JSON格式之外的解释性文字。JSON结构如下：

{
  "failure_analysis": [
    {
      "factor": "产品特征",
      "impact": "positive" | "negative",
      "explanation": "...",
      "lesson": "..."
    },
    {
      "factor": "价格",
      "impact": "positive" | "negative",
      "explanation": "...",
      "lesson": "..."
    },
    {
      "factor": "条件和条款",
      "impact": "positive" | "negative",
      "explanation": "...",
      "lesson": "..."
    },
    {
      "factor": "竞争对手",
      "impact": "positive" | "negative",
      "explanation": "...",
      "lesson": "..."
    },
    {
      "factor": "时间框架",
      "impact": "positive" | "negative",
      "explanation": "...",
      "lesson": "..."
    },
    {
      "factor": "决策者变化",
      "impact": "positive" | "negative",
      "explanation": "...",
      "lesson": "..."
    }
  ],
  "follow_up_plan": {
    "immediate_actions": [
      {
        "action": "打电话以了解这个决定的原委，并让机会大门继续打开。",
        "is_selected": true | false,
        "timing_suggestion": "建议的执行时机..."
      },
      {
        "action": "问一下客户是如何评价竞争对手的产品的。",
        "is_selected": true | false,
        "timing_suggestion": "..."
      },
      {
        "action": "了解客户的决策流程和关键决策者。",
        "is_selected": true | false,
        "timing_suggestion": "..."
      }
    ],
    "long_term_relations": [
      {
        "action": "向客户寄送以下主题的材料(...)",
        "is_selected": true | false,
        "details_suggestion": "关于...的行业白皮书或成功案例。"
      },
      {
        "action": "定期分享行业洞察和趋势分析",
        "is_selected": true | false,
        "details_suggestion": "每季度发送行业报告和市场分析"
      }
    ]
  },
  "opportunity_signals": [
    {
      "signal": "客户中新的购买者",
      "is_relevant": true | false,
      "timing_suggestion": "持续关注其领英动态"
    },
    {
      "signal": "客户对竞争对手的产品不满意",
      "is_relevant": true | false,
      "timing_suggestion": "重点在6个月后的跟进中了解"
    },
    {
      "signal": "客户业务发生重大变化",
      "is_relevant": true | false,
      "timing_suggestion": "通过行业新闻和社交媒体监控"
    },
    {
      "signal": "竞争对手服务质量下降",
      "is_relevant": true | false,
      "timing_suggestion": "通过客户反馈和市场调研了解"
    }
  ]
}

请确保返回的JSON格式完全正确，可以被程序直接解析。每个字段都要填写完整，不要遗漏任何必需的属性。
`;
};

// 生成模拟分析结果（用于API不可用时的降级处理）
export const generateMockFailureAnalysis = (_caseDescription: string) => {
  return {
    failure_analysis: [
      {
        factor: "产品特征",
        impact: "negative" as const,
        explanation: "产品功能与客户实际需求存在差距，未能充分满足客户的核心业务场景",
        lesson: "在产品演示前，需要更深入地了解客户的具体业务流程和痛点"
      },
      {
        factor: "价格",
        impact: "negative" as const,
        explanation: "价格超出客户预算范围，且未能有效传达产品价值与价格的匹配性",
        lesson: "需要建立更灵活的定价策略，并提升价值传达能力"
      },
      {
        factor: "竞争对手",
        impact: "negative" as const,
        explanation: "竞争对手在关键决策节点提供了更有吸引力的方案或更好的客户关系",
        lesson: "需要建立竞争情报收集机制，及时了解竞争对手动态"
      },
      {
        factor: "时间框架",
        impact: "negative" as const,
        explanation: "销售周期过长，错过了客户的最佳决策窗口期",
        lesson: "需要更好地把握客户决策时机，加快销售流程推进"
      }
    ],
    follow_up_plan: {
      immediate_actions: [
        {
          action: "打电话以了解这个决定的原委，并让机会大门继续打开",
          is_selected: true,
          timing_suggestion: "失败通知后1-2周内，情绪冷却后进行"
        },
        {
          action: "问一下客户是如何评价竞争对手的产品的",
          is_selected: true,
          timing_suggestion: "在了解失败原因的同一通电话中询问"
        },
        {
          action: "了解客户未来的相关需求和计划",
          is_selected: false,
          timing_suggestion: "在维持关系的基础上，适时了解"
        }
      ],
      long_term_relations: [
        {
          action: "向客户寄送行业趋势和最佳实践材料",
          is_selected: true,
          details_suggestion: "每季度发送相关行业的发展趋势报告和成功案例分析"
        },
        {
          action: "邀请客户参加行业活动或产品发布会",
          is_selected: false,
          details_suggestion: "在有重要产品更新或行业活动时发出邀请"
        }
      ]
    },
    opportunity_signals: [
      {
        signal: "客户中新的购买者或决策者",
        is_relevant: true,
        timing_suggestion: "持续关注客户组织架构变化，通过LinkedIn等渠道监控"
      },
      {
        signal: "客户对当前解决方案不满意",
        is_relevant: true,
        timing_suggestion: "通过定期沟通和行业网络了解客户使用情况"
      },
      {
        signal: "客户业务发生重大变化或扩张",
        is_relevant: true,
        timing_suggestion: "关注客户公司新闻、财报和业务公告"
      },
      {
        signal: "竞争对手服务质量下降或产品问题",
        is_relevant: false,
        timing_suggestion: "通过市场反馈和客户网络了解竞争对手表现"
      }
    ]
  };
};