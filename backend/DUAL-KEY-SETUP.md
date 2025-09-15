# 双KIMI API Key配置指南

## 概述

本系统现已支持双KIMI API Key负载均衡，可以显著提升并发处理能力和系统稳定性。

## 配置步骤

### 1. 环境变量配置

在 `.env` 文件中添加以下配置：

```bash
# 双KIMI API Key配置
KIMI_API_KEY_1=sk-your-first-kimi-api-key
KIMI_API_KEY_2=sk-your-second-kimi-api-key

# 兼容性配置（可选，向后兼容）
KIMI_API_KEY=sk-your-fallback-key
```

### 2. 获取API Key

1. 访问 [月之暗面官网](https://platform.moonshot.cn/)
2. 注册/登录账户
3. 在控制台创建两个API Key
4. 确保两个Key都有足够的配额

### 3. 验证配置

启动服务后，可以通过以下方式验证配置：

#### 方法1: API接口验证
```bash
# 检查API状态
curl http://localhost:3000/api/status/status

# 测试API连接
curl -X POST http://localhost:3000/api/status/test \
  -H "Content-Type: application/json" \
  -d '{"prompt": "测试双Key功能"}'
```

#### 方法2: 测试脚本验证
```bash
# 运行测试脚本
cd backend
node test-dual-keys.js
```

## 功能特性

### 🔄 自动负载均衡
- 智能选择负载较低的API Key
- 基于RPM、TPM使用率的动态分配
- 自动错误恢复机制

### 📊 实时监控
- 每个Key的使用统计
- 错误计数和状态监控
- 自动重置机制

### 🛡️ 故障转移
- 单Key故障时自动切换
- 错误累积时临时禁用
- 智能重试机制

### ⚡ 性能提升
- **RPM**: 200 → 400 (翻倍)
- **TPM**: 5000 → 10000 (翻倍)
- **并发能力**: 显著提升

## 系统架构

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   前端请求      │───▶│  KimiAPIManager  │───▶│   KIMI API 1    │
└─────────────────┘    │                  │    └─────────────────┘
                       │  - 负载均衡      │    ┌─────────────────┐
                       │  - 故障转移      │───▶│   KIMI API 2    │
                       │  - 状态监控      │    └─────────────────┘
                       └──────────────────┘
```

## 使用示例

### 基础使用
```typescript
import { kimiAPIManager } from './services/kimiAPIManager';

// 自动选择最优Key进行调用
const response = await kimiAPIManager.callKimiAPI(prompt, {
  model: 'moonshot-v1-8k',
  temperature: 0.3,
  max_tokens: 4000
});
```

### 状态监控
```typescript
// 获取当前状态
const status = kimiAPIManager.getStatus();
console.log('活跃Key数:', status.activeKeys);
console.log('Key详情:', status.keyStatus);
```

## 监控指标

### Key状态指标
- **RPM**: 每分钟请求数 (限制: 200/key)
- **TPM**: 每分钟Token数 (限制: 5000/key)
- **错误计数**: 累积错误次数
- **活跃状态**: Key是否可用

### 系统健康指标
- **总Key数**: 配置的Key总数
- **活跃Key数**: 当前可用的Key数
- **负载分布**: 各Key的使用情况

## 故障排除

### 常见问题

#### 1. Key配置错误
```bash
# 检查环境变量
echo $KIMI_API_KEY_1
echo $KIMI_API_KEY_2

# 验证Key格式
# 正确格式: sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 2. 配额不足
```bash
# 检查API状态
curl http://localhost:3000/api/status/status

# 查看错误信息
tail -f logs/backend-error.log
```

#### 3. 网络连接问题
```bash
# 测试网络连接
curl -I https://api.moonshot.cn/v1/chat/completions

# 检查防火墙设置
```

### 错误代码说明

| 错误代码 | 说明 | 解决方案 |
|---------|------|----------|
| 401 | API Key无效 | 检查Key格式和有效性 |
| 429 | 请求频率超限 | 等待或增加更多Key |
| 500 | 服务器错误 | 检查网络和服务状态 |

## 性能优化建议

### 1. 合理配置超时时间
```typescript
const response = await kimiAPIManager.callKimiAPI(prompt, {
  timeout: 60000  // 根据实际需求调整
});
```

### 2. 监控使用情况
- 定期检查Key使用统计
- 根据负载情况调整并发数
- 及时处理错误和异常

### 3. 配额管理
- 监控每日配额使用
- 设置合理的请求频率
- 准备备用Key以防不时之需

## 升级说明

### 从单Key升级到双Key

1. **无需修改代码**: 现有代码自动兼容
2. **渐进式升级**: 可以先配置一个Key测试
3. **向后兼容**: 保留原有的 `KIMI_API_KEY` 配置

### 配置验证清单

- [ ] 配置了 `KIMI_API_KEY_1`
- [ ] 配置了 `KIMI_API_KEY_2`
- [ ] 两个Key都有效且有配额
- [ ] 服务启动无错误
- [ ] API状态检查通过
- [ ] 测试脚本运行成功

## 技术支持

如遇到问题，请：

1. 检查日志文件: `logs/backend-error.log`
2. 运行测试脚本: `node test-dual-keys.js`
3. 查看API状态: `GET /api/status/status`
4. 联系技术支持并提供详细错误信息

---

**注意**: 请妥善保管API Key，不要在代码中硬编码，确保 `.env` 文件不被提交到版本控制系统。