# Python Backend - Sales Tools API

基于 FastAPI 的现代化 Python 后端服务，专注于数据分析和处理功能。

## 技术栈

- **FastAPI** - 现代化的 Python Web 框架
- **Uvicorn** - ASGI 服务器
- **Pydantic** - 数据验证和设置管理
- **SQLAlchemy** - ORM 数据库工具
- **Alembic** - 数据库迁移工具
- **Loguru** - 现代化日志库
- **python-jose** - JWT 处理
- **Passlib** - 密码哈希

## 项目结构

```
back-python/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── api.py          # API 路由汇总
│   │       └── endpoints/      # API 端点
│   │           ├── health.py   # 健康检查
│   │           ├── analytics.py # 数据分析
│   │           └── data.py     # 数据处理
│   ├── core/
│   │   ├── config.py          # 配置管理
│   │   ├── logging.py         # 日志配置
│   │   └── exceptions.py      # 异常处理
│   ├── models/                # 数据模型 (待实现)
│   ├── schemas/               # Pydantic 模式 (待实现)
│   ├── services/              # 业务逻辑层 (待实现)
│   └── utils/                 # 工具函数 (待实现)
├── logs/                      # 日志文件目录
├── uploads/                   # 文件上传目录
├── tests/                     # 测试文件 (待实现)
├── app.py                     # 应用入口文件
├── requirements.txt           # 依赖配置
├── .env.example              # 环境变量示例
└── README.md                 # 项目文档
```

## 开发指南

### 环境要求

- Python >= 3.8
- pip >= 21.0

### 安装依赖

建议使用虚拟环境：

```bash
# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

### 环境配置

复制 `.env.example` 为 `.env` 并根据需要修改配置：

```bash
cp .env.example .env
```

主要配置项：

- `ENVIRONMENT` - 运行环境 (development/production)
- `HOST` - 服务器主机
- `PORT` - 服务器端口
- `SECRET_KEY` - 安全密钥
- `LOG_LEVEL` - 日志级别

### 开发模式

```bash
# 方式1: 直接运行
python app.py

# 方式2: 使用 uvicorn
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

服务器将在 http://localhost:8000 启动

### API 文档

开发环境下可以访问自动生成的 API 文档：

- **Swagger UI**: http://localhost:8000/api/v1/docs
- **ReDoc**: http://localhost:8000/api/v1/redoc
- **OpenAPI JSON**: http://localhost:8000/api/v1/openapi.json

### 代码检查和格式化

```bash
# 代码格式化
black .

# 导入排序
isort .

# 代码检查
flake8 .

# 类型检查
mypy .
```

### 运行测试

```bash
# 运行所有测试
pytest

# 运行测试并显示覆盖率
pytest --cov=app

# 运行特定测试文件
pytest tests/test_analytics.py
```

## API 接口

### 基础信息

- **基础URL**: `http://localhost:8000`
- **API版本**: `v1`
- **数据格式**: JSON

### 健康检查

#### GET /api/v1/health/
基础健康检查

**响应示例**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "environment": "development",
  "uptime": 123456.789,
  "system_info": {
    "platform": "Darwin",
    "python_version": "3.9.0"
  }
}
```

#### GET /api/v1/health/detailed
详细健康检查，包含系统资源使用情况

#### GET /api/v1/health/ping
简单的 ping 检查

#### GET /api/v1/health/ready
就绪检查，检查依赖服务状态

#### GET /api/v1/health/live
存活检查，确认服务正在运行

### 数据分析

#### GET /api/v1/analytics/sales-summary
获取销售数据汇总分析

**查询参数**:
- `days` (int): 分析天数，默认30天
- `region` (str, 可选): 地区筛选

**响应示例**:
```json
{
  "period": {
    "start_date": "2024-01-01T00:00:00.000Z",
    "end_date": "2024-01-30T23:59:59.000Z"
  },
  "total_sales": 150000.00,
  "total_orders": 500,
  "average_order_value": 300.00,
  "growth_rate": 15.5,
  "top_products": [
    {
      "product": "产品A",
      "sales": 50000.00,
      "percentage": 33.33
    }
  ],
  "regional_breakdown": {
    "华北": 60000.00,
    "华东": 45000.00,
    "华南": 45000.00
  }
}
```

#### POST /api/v1/analytics/custom-analysis
自定义数据分析

**请求体**:
```json
{
  "start_date": "2024-01-01T00:00:00.000Z",
  "end_date": "2024-01-31T23:59:59.000Z",
  "metrics": ["total_revenue", "order_count", "average_order_value"],
  "filters": {
    "region": "华北",
    "min_amount": 100
  }
}
```

#### GET /api/v1/analytics/trends/{metric}
获取指定指标的趋势数据

**路径参数**:
- `metric` (str): 指标名称

**查询参数**:
- `days` (int): 天数，默认30天
- `granularity` (str): 粒度 (hourly/daily/weekly/monthly)

#### GET /api/v1/analytics/forecast/{metric}
获取指标预测数据

### 数据处理

#### POST /api/v1/data/process
处理数据

**请求体**:
```json
{
  "data": [
    {"name": "张三", "age": 25, "city": "北京"},
    {"name": "李四", "age": 30, "city": "上海"}
  ],
  "operations": [
    "remove_duplicates",
    "remove_nulls",
    "normalize_text"
  ],
  "options": {}
}
```

支持的操作：
- `remove_duplicates` - 去除重复记录
- `remove_nulls` - 移除空值记录
- `normalize_text` - 文本标准化
- `convert_numbers` - 数字类型转换
- `add_timestamp` - 添加时间戳
- `sort_by_date` - 按日期排序

#### POST /api/v1/data/validate
验证数据格式

**请求体**:
```json
{
  "data": [
    {"name": "张三", "age": 25, "email": "zhangsan@example.com"}
  ],
  "schema": {
    "required": ["name", "email"],
    "types": {
      "name": "string",
      "age": "number",
      "email": "string"
    },
    "ranges": {
      "age": {"min": 0, "max": 120}
    }
  }
}
```

#### POST /api/v1/data/upload-csv
上传并解析 CSV 文件

**请求参数**:
- `file` (file): CSV 文件
- `delimiter` (str): 分隔符，默认逗号
- `encoding` (str): 文件编码，默认 utf-8

#### GET /api/v1/data/export-csv
导出数据为 CSV 格式

#### GET /api/v1/data/statistics
获取数据统计信息

## 功能特性

### 已实现功能

- ✅ 基础项目结构
- ✅ FastAPI 应用配置
- ✅ 健康检查端点
- ✅ 数据分析功能
- ✅ 数据处理功能
- ✅ CSV 文件处理
- ✅ 异常处理机制
- ✅ 日志系统
- ✅ 配置管理

### 待实现功能

- ⏳ 数据库集成
- ⏳ 用户认证系统
- ⏳ 缓存机制
- ⏳ 任务队列
- ⏳ 机器学习模型集成
- ⏳ 单元测试
- ⏳ API 限流
- ⏳ 监控和指标

## 开发规范

### 代码风格

- 使用 Black 进行代码格式化
- 使用 isort 进行导入排序
- 遵循 PEP 8 编码规范
- 使用类型注解
- 编写文档字符串

### 项目结构规范

- `api/` - API 路由和端点
- `core/` - 核心配置和工具
- `models/` - 数据库模型
- `schemas/` - Pydantic 数据模式
- `services/` - 业务逻辑层
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
python app.py
```

### 生产环境部署

1. 安装依赖
```bash
pip install -r requirements.txt
```

2. 设置环境变量
```bash
export ENVIRONMENT=production
export SECRET_KEY=your-production-secret-key
```

3. 启动服务
```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --workers 4
```

### Docker 部署

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 使用 Gunicorn + Uvicorn

```bash
pip install gunicorn
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 监控和日志

- 使用 Loguru 进行结构化日志记录
- 日志文件自动轮转和压缩
- 支持多种日志级别和格式
- 可集成 Sentry 进行错误追踪

## 性能优化

- 异步处理支持
- 数据库连接池
- Redis 缓存
- 响应压缩
- 静态文件缓存

## 安全特性

- CORS 配置
- 可信主机验证
- 输入数据验证
- 文件上传安全检查
- 速率限制

## 故障排除

### 常见问题

1. **端口被占用**
   - 修改 `.env` 文件中的 `PORT` 配置
   - 或使用 `PORT=8001 python app.py`

2. **依赖安装失败**
   - 确保 Python 版本 >= 3.8
   - 使用虚拟环境
   - 升级 pip: `pip install --upgrade pip`

3. **日志文件权限问题**
   - 确保 `logs/` 目录存在且可写
   - 检查文件权限设置

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。