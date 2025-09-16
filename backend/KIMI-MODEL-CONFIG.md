# Kimi 模型配置指南

## 当前配置

### 🚀 **已升级到 moonshot-v1-128k**

系统已从 `moonshot-v1-8k` 升级到 `moonshot-v1-128k`，具备以下优势：

- **上下文长度**: 131,072 tokens (比之前的8k增加16倍)
- **联网搜索**: 支持实时网络搜索功能
- **复杂任务**: 可处理更长的prompt和更复杂的分析任务

## 模型特性对比

| 模型 | 上下文长度 | 联网搜索 | 适用场景 |
|------|------------|----------|----------|
| moonshot-v1-8k | 8,192 tokens | ❌ | 简单对话、基础分析 |
| moonshot-v1-32k | 32,768 tokens | ✅ | 中等复杂度任务 |
| **moonshot-v1-128k** | **131,072 tokens** | **✅** | **复杂分析、长文档处理** |

## 联网搜索功能

### 🌐 **启用方法**

在prompt中添加搜索指令，例如：

```javascript
const prompt = `
请搜索最新的CRM市场趋势和竞争对手信息，然后分析以下案例：
${caseDescription}

请确保使用最新的市场数据和行业报告。
`;
```

### 📝 **使用示例**

1. **竞争分析中的实时市场调研**：
```javascript
// 在 competitiveAnalysisPrompt.ts 中
const prompt = `
请先搜索 ${competitorProduct} 的最新产品信息、定价策略和市场表现，
然后与 ${myProduct} 进行详细对比分析...
`;
```

2. **失败分析中的行业趋势**：
```javascript
// 在 failureAnalysisPrompt.ts 中
const prompt = `
请搜索当前CRM行业的最新趋势、客户偏好变化和成功案例，
然后分析以下失败案例：${caseDescription}
`;
```

## 配置文件位置

以下文件已更新为使用 `moonshot-v1-128k`：

- ✅ [`kimiAPIManager.ts`](src/services/kimiAPIManager.ts) - 默认模型配置
- ✅ [`competitiveAnalysisService.ts`](src/services/competitiveAnalysisService.ts) - 竞争分析
- ✅ [`failureAnalysisService.ts`](src/services/failureAnalysisService.ts) - 失败分析
- ✅ [`selfTestService.ts`](src/services/selfTestService.ts) - 自我测试
- ✅ [`apiStatus.ts`](src/routes/apiStatus.ts) - API状态测试
- ✅ [`test-dual-keys.ts`](src/test-dual-keys.ts) - 双Key测试

## 测试结果

### ✅ **问题已解决**

- **之前**: Token限制错误 (8192 tokens exceeded)
- **现在**: 成功处理复杂prompt (131k tokens支持)
- **状态**: API调用成功，返回真实AI分析结果

### 📊 **性能表现**

```
🤖 KIMI API调用 - 预估Token: 1907
🔑 使用API Key: sk-kb3yM6i... (RPM: 0/200, TPM: 0/5000)
✅ KIMI API调用成功 - 状态: 200
✅ 失败分析 - KIMI API调用成功
```

## 最佳实践

### 🎯 **联网搜索优化**

1. **明确搜索意图**：在prompt开头明确说明需要搜索的内容
2. **时效性要求**：强调需要最新信息时使用"最新"、"当前"等关键词
3. **搜索范围**：指定搜索的地域、行业或时间范围

### 💡 **Prompt设计建议**

```javascript
const optimizedPrompt = `
# 任务：竞争分析
# 搜索要求：请先搜索以下信息
1. ${competitorName} 2024年最新产品功能和定价
2. ${industry} 行业最新市场报告和趋势
3. 相关成功案例和客户反馈

# 分析任务：
基于搜索到的最新信息，请分析...
${detailedAnalysisRequest}
`;
```

## 注意事项

1. **成本考虑**: 128k模型成本较高，建议根据任务复杂度选择合适的模型
2. **响应时间**: 联网搜索会增加响应时间，请适当调整timeout设置
3. **搜索质量**: 搜索结果质量取决于prompt的明确性和具体性

## 未来扩展

可以考虑根据不同功能模块的需求，动态选择模型：

- **简单测试**: moonshot-v1-8k
- **中等分析**: moonshot-v1-32k  
- **复杂分析+联网**: moonshot-v1-128k