# Backend - Sales Tools API

基于 Node.js + Express + TypeScript 的现代化后端 API 服务。

## 技术栈

- **Node.js** - JavaScript 运行时环境
- **Express** - Web 应用框架
- **TypeScript** - 类型安全的 JavaScript
- **JWT** - JSON Web Token 认证
- **bcryptjs** - 密码加密
- **express-validator** - 请求验证
- **helmet** - 安全中间件
- **cors** - 跨域资源共享
- **morgan** - HTTP 请求日志
- **compression** - 响应压缩

## 项目结构

```
backend/
├── src/
│   ├── controllers/       # 控制器层 (待实现)
│   ├── services/          # 业务逻辑层 (待实现)
│   ├── middlewares/       # 中间件
│   │   ├── auth.ts        # 认证中间件
│   │   ├── errorHandler.ts # 错误处理中间件
│   │   ├── notFoundHandler.ts # 404处理中间件
│   │   └── rateLimiter.ts # 速率限制中间件
│   ├── routes/            # 路由配置
│   │   ├── auth.ts        # 认证路由
│   │   ├── user.ts        # 用户路由
│   │   └── health.ts      # 健康检查路由
│   ├── config/            # 配置文件 (待实现)
│   ├── types/             # 类型定义 (待实现)
│   ├── utils/             # 工具函数 (待实现)
│   └── app.ts             # 应用入口文件
├── dist/                  # 编译输出目录
├── package.json           # 依赖配置
├── tsconfig.json          # TypeScript 配置
├── .env.example           # 环境变量示例
└── README.md              # 项目文档
```

## 开发指南

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 环境配置

复制 `.env.example` 为 `.env` 并根据需要修改配置：

```bash
cp .env.example .env
```

主要配置项：

- `NODE_ENV` - 运行环境 (development/production)
- `PORT` - 服务器端口
- `JWT_SECRET` - JWT 密钥
- `FRONTEND_URL` - 前端地址

### 开发模式

```bash
npm run dev
```

服务器将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

### 启动生产版本

```bash
npm start
```

### 代码检查

```bash
npm run lint
```

### 类型检查

```bash
npm run type-check
```

### 运行测试

```bash
npm test
```

## API 接口

### 基础信息

- **基础URL**: `http://localhost:3000`
- **数据格式**: JSON
- **认证方式**: JWT Bearer Token

### 健康检查

#### GET /health
获取服务器健康状态

**响应示例**:
```json
{
  "code": 200,
  "message": "Health check successful",
  "data": {
    "uptime": 123.456,
    "message": "OK",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "environment": "development",
    "version": "1.0.0"
  }
}
```

### 认证接口

#### POST /api/auth/login
用户登录

**请求参数**:
```json
{
  "username": "admin",
  "password": "password"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com"
    }
  }
}
```

#### POST /api/auth/register
用户注册

**请求参数**:
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "Password123"
}
```

### 用户接口

#### GET /api/user/profile
获取当前用户信息 (需要认证)

**请求头**:
```
Authorization: Bearer {token}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "User profile retrieved successfully",
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 中间件

### 认证中间件 (`authenticateToken`)
验证 JWT token 并提取用户信息

### 错误处理中间件 (`errorHandler`)
统一处理应用错误并返回标准化错误响应

### 速率限制中间件 (`rateLimiter`)
限制客户端请求频率，防止滥用

### 404处理中间件 (`notFoundHandler`)
处理未找到的路由

## 安全特性

- **Helmet** - 设置安全相关的 HTTP 头
- **CORS** - 配置跨域资源共享
- **Rate Limiting** - 请求频率限制
- **JWT Authentication** - 基于 Token 的认证
- **Password Hashing** - bcrypt 密码加密
- **Input Validation** - 请求参数验证

## 错误处理

所有错误都会返回统一格式：

```json
{
  "code": 400,
  "message": "Error message"
}
```

常见错误码：
- `400` - 请求参数错误
- `401` - 未授权
- `403` - 禁止访问
- `404` - 资源不存在
- `429` - 请求过于频繁
- `500` - 服务器内部错误

## 开发规范

### 代码风格

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 async/await 处理异步操作
- 统一的错误处理机制

### 目录结构规范

- `controllers/` - 控制器，处理 HTTP 请求
- `services/` - 业务逻辑层
- `middlewares/` - 中间件
- `routes/` - 路由定义
- `config/` - 配置文件
- `types/` - TypeScript 类型定义
- `utils/` - 工具函数

### Git 提交规范

```
feat: 新功能
fix: 修复问题
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

## 部署

### 开发环境部署

```bash
npm run dev
```

### 生产环境部署

1. 构建项目
```bash
npm run build
```

2. 启动服务
```bash
npm start
```

### Docker 部署

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 监控和日志

- 使用 Morgan 记录 HTTP 请求日志
- 错误日志记录到控制台
- 建议在生产环境中使用专业的日志收集系统

## 故障排除

### 常见问题

1. **端口被占用**
   - 修改 `.env` 文件中的 `PORT` 配置
   - 或使用 `PORT=3001 npm run dev`

2. **JWT 验证失败**
   - 检查 `JWT_SECRET` 配置
   - 确认 token 格式正确

3. **CORS 错误**
   - 检查 `FRONTEND_URL` 配置
   - 确认前端地址正确

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。