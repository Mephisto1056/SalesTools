# 部署文档

## 部署架构

本项目采用微服务架构，各服务可以独立部署。

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Express API    │    │  Python API     │
│   (Vue 3)       │    │  (Node.js)      │    │  (Python)       │
│   Port: 5173    │    │  Port: 3000     │    │  Port: 8000     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 环境要求

### 开发环境
- Node.js >= 16.0.0
- Python >= 3.8
- npm >= 8.0.0

### 生产环境
- Docker >= 20.0.0
- Docker Compose >= 2.0.0

## 本地开发部署

### 前端部署
```bash
cd frontend
npm install
npm run dev
```
访问地址: http://localhost:5173

### Express 后端部署
```bash
cd backend
npm install
npm run dev
```
API 地址: http://localhost:3000

### Python 后端部署
```bash
cd back-python
pip install -r requirements.txt
python app.py
```
API 地址: http://localhost:8000

## 生产环境部署

### Docker 部署

1. 构建镜像
```bash
# 前端
cd frontend
docker build -t sales-frontend .

# Express 后端
cd backend
docker build -t sales-backend .

# Python 后端
cd back-python
docker build -t sales-python .
```

2. 运行容器
```bash
docker-compose up -d
```

### 环境变量配置

各项目需要配置相应的环境变量，详见各项目目录下的 `.env.example` 文件。

## 监控和日志

- 应用日志存储在各项目的 `logs/` 目录
- 建议使用 ELK 或类似的日志收集系统
- 监控指标包括：响应时间、错误率、资源使用率

## 备份策略

- 数据库定期备份
- 代码版本控制
- 配置文件备份