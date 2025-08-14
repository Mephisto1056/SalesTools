# 前后端分离项目

这是一个前后端分离的全栈项目，采用微服务架构设计，支持多种后端技术栈。

## 项目结构

```
Sales/
├── doc/                    # 需求文档和设计文档
├── frontend/                    # 前端项目 (Vue 3 + TypeScript)
├── backend/            # Express.js 后端服务
├── back-python/             # Python 后端服务
├── README.md               # 项目文档
└── [其他公共文档和配置文件]
```

## 目录说明

### 前端项目 (`frontend/`)
- **技术栈**: Vue 3 + TypeScript + Vite
- **功能**: 用户界面和交互逻辑
- **主要目录**:
  - `src/views/` - 页面组件
  - `src/components/` - 公共组件
  - `src/api/` - API 接口封装
  - `src/store/` - 状态管理
  - `src/router/` - 路由配置
  - `src/assets/` - 静态资源

### Express 后端 (`backend/`)
- **技术栈**: Node.js + Express + TypeScript
- **功能**: 提供 RESTful API 服务
- **主要目录**:
  - `src/controllers/` - 控制器层
  - `src/services/` - 业务逻辑层
  - `src/routes/` - 路由配置
  - `src/middlewares/` - 中间件
  - `src/config/` - 配置文件
  - `src/app/` - 应用核心模块

### Python 后端 (`back-python/`)
- **技术栈**: Python
- **功能**: 提供额外的后端服务支持
- **状态**: 开发中

## 项目特点

### 1. 微服务架构
- 支持多种后端技术栈 (Node.js/Express, Python)
- 各服务独立部署和扩展
- 便于团队协作和技术选型

### 2. 依赖管理
- **独立依赖**: 每个项目都有独立的 `package.json` 或依赖管理文件
- **避免冲突**: 项目间依赖不混在一起，确保环境隔离
- **版本控制**: 各项目可以独立升级依赖版本

### 3. 文档组织
- **顶层文档**: 项目整体说明、开发规范、部署指南
- **项目内文档**: 具体项目的 README、API 文档等

## 开发规范

### 目录组织原则
1. **公共资源放顶层**: 项目文档、开发规范、部署配置
2. **项目资源放项目内**: 项目特定的文档、配置、依赖
3. **依赖隔离**: 每个项目独立管理自己的依赖

### 命名规范
- 后端项目: `back{技术栈}` (如`back-python`)
- 前端项目: `frontend`
- 使用小写字母和连字符

### 环境要求
- 区分开发模式和生产模式的 env文件ß
  

## 快速开始

### 前端开发
```bash
cd front
npm install
npm run dev
```

### Express 后端开发
```bash
cd back-express
npm install
npm run dev
```

### Python 后端开发
```bash
cd back-python
# 根据具体技术栈配置环境
```

## 部署说明

每个项目都可以独立部署：
- 前端: 静态资源部署到 CDN 或 Web 服务器
- Express 后端: 部署到 Node.js 环境
- Python 后端: 部署到 Python 环境


## 技术栈

- **前端**: Vue 3, TypeScript, Vite, Pinia
- **Express 后端**: Node.js, Express, TypeScript, Jest
- **Python 后端**: Python 


---