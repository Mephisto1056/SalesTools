# Frontend - Sales Tools

基于 Vue 3 + TypeScript + Vite 的现代化前端应用。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 快速的构建工具
- **Vue Router** - 官方路由管理器
- **Pinia** - 状态管理
- **Axios** - HTTP 客户端

## 项目结构

```
frontend/
├── public/                 # 静态资源
├── src/
│   ├── api/               # API 接口封装
│   ├── assets/            # 静态资源 (CSS, 图片等)
│   ├── components/        # 公共组件
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理
│   ├── views/             # 页面组件
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── index.html             # HTML 模板
├── package.json           # 依赖配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
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

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:5173 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

### 类型检查

```bash
npm run type-check
```

## 环境配置

复制 `.env.example` 为 `.env` 并根据需要修改配置：

```bash
cp .env.example .env
```

主要配置项：

- `VITE_API_BASE_URL` - API 基础地址
- `VITE_APP_TITLE` - 应用标题
- `VITE_DEBUG` - 是否启用调试模式

## 功能特性

### 已实现功能

- ✅ 基础项目结构
- ✅ 路由配置 (Vue Router)
- ✅ 状态管理 (Pinia)
- ✅ API 接口封装 (Axios)
- ✅ 响应式布局
- ✅ TypeScript 支持
- ✅ 用户认证流程

### 页面结构

- **首页** (`/`) - 产品介绍和功能展示
- **关于** (`/about`) - 产品和技术介绍
- **登录** (`/login`) - 用户登录页面
- **404** - 页面未找到

### 组件规范

#### 组件命名
- 使用 PascalCase 命名组件文件
- 组件名应该具有描述性

#### 组件结构
```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
/* 组件样式 */
</style>
```

### API 接口

所有 API 接口都封装在 `src/api/` 目录下：

```typescript
import { userApi } from '@/api'

// 登录
const result = await userApi.login({ username, password })

// 获取用户信息
const profile = await userApi.getProfile()
```

### 状态管理

使用 Pinia 进行状态管理：

```typescript
import { useUserStore } from '@/store'

const userStore = useUserStore()

// 登录
await userStore.login({ username, password })

// 获取登录状态
const isLoggedIn = userStore.isLoggedIn
```

## 开发规范

### 代码风格

- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 Composition API 规范
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化

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

2. 部署 `dist` 目录到 Web 服务器

### Docker 部署

```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 故障排除

### 常见问题

1. **端口被占用**
   - 修改 `vite.config.ts` 中的端口配置
   - 或使用 `npm run dev -- --port 3001`

2. **API 请求失败**
   - 检查 `.env` 文件中的 API 地址配置
   - 确认后端服务是否正常运行

3. **TypeScript 错误**
   - 运行 `npm run type-check` 检查类型错误
   - 确保所有依赖都已正确安装

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。