好的，没有问题。

为了让您的AI开发过程更加清晰，我将为您设计一份详细的Markdown（.md）技术设计文档。这份文档将作为您和开发团队的蓝图，指导如何通过调用具备URL搜索能力的大语言模型（LLM）API，来实现您在PPT中构想的“竞争分析”AI工具。

---

# AI赋能竞争分析工具 - 技术设计文档

## 1. 项目目标

本项目旨在将现有的静态Stryker“工具14：竞争分析”PPT模板，开发成一个智能化的Web应用或集成工具。该工具的核心是利用具备网络搜索能力的大语言模型（LLM），自动搜集、分析并填充竞争分析表格，为销售团队提供即时、动态且富有洞察力的竞争策略支持。

## 2. 系统架构与流程

系统将遵循一个简单的“输入 -> 处理 -> 输出”流程：

1.  **前端（用户界面）**: 销售人员输入三个基本信息：客户名称、我方产品、竞争对手产品。
2.  **后端（AI核心）**: 后端服务接收到请求后，根据下文定义的**“Mega-Prompt”（超级提示词）**，调用一个具备实时网络搜索功能的KIMI K2的API。
3.  **LLM处理**: 大模型根据提示词指令，执行网络搜索，获取信息，进行分析，并按照预设的JSON格式返回结构化数据。
4.  **前端（结果呈现）**: 前端接收到后端传回的JSON数据，解析并动态渲染到PPT中所示的两个表格里。



## 3. 用户交互界面 (UI)

UI应简洁明了，包含以下元素：

*   **输入区**:
    *   文本框：“你的客户名称是：”
    *   文本框：“我的产品是：” (可设为下拉菜单或默认值)
    *   文本框：“竞争对手的产品是：”
*   **操作区**:
    *   按钮：“一键生成竞争分析”
*   **输出区**:
    *   初始为空白的两个表格，结构与PPT第4、5页完全一致。
    *   一个用于显示AI额外策略建议的文本区域。

## 4. AI核心：API调用与提示词工程 (Prompt Engineering)

这是整个项目的技术核心。我们将设计一个全面的“Mega-Prompt”，一次性发送给LLM，以获取所有需要的信息。

### 4.1 API请求数据结构 (Input JSON)

```json
{
  "customer_name": "上海市第六人民医院骨科",
  "my_product": "Stryker NAV3i 导航平台",
  "competitor_product": "Medtronic AxiEM 电磁导航系统"
}
```

### 4.2 核心提示词 (The Mega-Prompt)

```text
# ROLE:
你是一名顶级的医疗器械市场策略专家，专精于骨科手术导航领域，并且你能够利用网络搜索来获取最新、最准确的信息。

# CONTEXT:
我的公司是Stryker，我的客户是 `{customer_name}`。我正在与主要竞争对手Medtronic进行竞争。我需要针对我的产品 `{my_product}` 和竞争对手的产品 `{competitor_product}` 进行一次深入的竞争分析，以便更好地向客户展示我方产品的价值。

# TASK:
请严格按照以下步骤执行，并使用你的网络搜索能力来确保信息的准确性和深度。

1.  **信息搜集**: 分别搜索并整理关于 `{my_product}` 和 `{competitor_product}` 的以下关键信息：
    *   **特征**: 核心技术原理、关键组件、规格参数。
    *   **利益**: 这些特征为医生和患者带来的临床价值，如提高精度、缩短手术时间、减少辐射等。
    *   **价格**: 市场定位（高、中、低端）、大致价格范围、或商业模式（如设备+耗材）。如果找不到精确价格，请根据信息进行推断。
    *   **供货条件**: 标准交付周期、物流政策等。
    *   **服务**: 售后服务承诺、临床支持团队的覆盖范围和响应速度、培训计划。
    *   **咨询**: 是否提供手术室规划、流程优化等增值咨询服务。

2.  **客户需求分析**: 基于客户 `{customer_name}` 的特点（例如，它是一家顶级的教学医院），分析并判断哪些要素（例如：技术先进性、临床研究支持、长期成本效益）对他们来说最为重要。

3.  **差异化与策略分析**: 基于以上所有信息，进行深度分析：
    *   识别并列出我方产品的【独有利益】。
    *   识别并列出竞争对手产品的【独有利益】（即我方的缺陷）。
    *   针对我方的每一个【独有利益】，设计一个巧妙的【用于挖掘这个需求的问题】，这个问题应该能引导客户自己说出他需要这个利益点。
    *   (额外加分项) 针对我方的每一个【缺陷】，提供1-2条【如何克服缺陷】的策略建议。

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
}

```

### 4.3 API返回数据结构 (Output JSON)

后端将直接把LLM返回的这个JSON透传给前端。前端开发者可以根据这个清晰的结构来解析数据。

## 5. 前端渲染逻辑

1.  接收到API返回的JSON数据后，显示一个加载动画结束的信号。
2.  **渲染表格1 (确定你的竞争地位)**:
    *   遍历 `analysis_summary.table1` 对象，将其中的 `my_product` 和 `competitor_product` 的值分别填入表格的对应单元格。
    *   将 `analysis_summary.most_important_factors_for_customer` 数组的内容显示在“对我的客户最为重要的要素”区域。
3.  **渲染表格2 (差异化分析)**:
    *   遍历 `analysis_summary.table2` 数组。数组中的每个对象代表表格的一行。
    *   将 `my_unique_benefit` 填入“你的独有利益”列。
    *   将 `probing_question` 填入“用于挖掘这个需求的问题”列。
    *   遍历 `analysis_summary.strategic_recommendations` 数组，将每个 `my_weakness` 填入“竞争对手的独有利益”列。
4.  **渲染策略建议**:
    *   将 `analysis_summary.strategic_recommendations` 中的 `overcoming_strategy` 部分，格式化后显示在表格下方的“策略建议”区域，为销售提供额外价值。
