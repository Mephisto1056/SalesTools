# Prompt 管理

这个目录包含了所有AI模型的提示词模板，便于维护和修改。

## 文件结构

- `competitiveAnalysisPrompt.ts` - 竞争分析功能的提示词模板

## 竞争分析提示词

### 基本使用

```typescript
import { buildCompetitiveAnalysisPrompt } from './competitiveAnalysisPrompt';

const params = {
  customer_name: "客户名称",
  my_product: "我方产品",
  competitor_product: "竞争对手产品"
};

const prompt = buildCompetitiveAnalysisPrompt(params);
```

### 高级配置

```typescript
import { buildCustomPrompt, PromptConfig } from './competitiveAnalysisPrompt';

const config: PromptConfig = {
  emphasizeWebSearch: true,
  analysisDepth: 'comprehensive',
  industryKeywords: ['医疗器械', '手术导航'],
  customInstructions: '请特别关注安全性和合规性要求'
};

const prompt = buildCustomPrompt(params, config);
```

## 配置选项

### PromptConfig

- `emphasizeWebSearch`: 是否强调网络搜索（默认：false）
- `analysisDepth`: 分析深度级别
  - `basic`: 基础分析
  - `detailed`: 详细分析  
  - `comprehensive`: 全面分析
- `industryKeywords`: 特定行业关键词数组
- `customInstructions`: 自定义指令

## 修改提示词

1. 直接编辑 `competitiveAnalysisPrompt.ts` 文件
2. 修改 `buildCompetitiveAnalysisPrompt` 函数中的模板内容
3. 或者通过 `PromptConfig` 添加自定义指令

## 最佳实践

1. **保持模块化**: 每个功能的提示词单独一个文件
2. **版本控制**: 重大修改时保留旧版本作为备份
3. **测试验证**: 修改后及时测试AI响应质量
4. **文档更新**: 修改提示词后更新相关文档

## 网络搜索功能

当前提示词已配置为要求AI使用网络搜索功能：

- 明确指示必须使用网络搜索
- 要求基于实时信息进行分析
- 指定搜索的信息类型和来源

## 输出格式

提示词要求AI返回标准化的JSON格式，包含：

- `table1`: 竞争地位分析表
- `most_important_factors_for_customer`: 客户重要因素
- `table2`: 差异化分析表  
- `strategic_recommendations`: 策略建议

这确保了前端能够正确解析和展示分析结果。