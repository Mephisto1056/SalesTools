# PM2 集群部署指南

## 概述

本文档详细介绍如何使用 PM2 对 SalesTools 项目进行集群部署，实现高可用性和负载均衡。

## 项目架构

```
SalesTools/
├── frontend/          # Vue.js 前端 (端口: 5173)
├── backend/           # Express.js 后端 (端口: 3000)
├── back-python/       # Python 后端 (端口: 8000)
├── ecosystem.config.js # PM2 配置文件
└── deploy.sh          # 自动部署脚本
```

## 前置要求

### 系统要求
- Node.js >= 16.0.0
- npm >= 8.0.0
- PM2 (全局安装)

### 安装 PM2
```bash
npm install -g pm2
```

## 部署步骤

### 1. 服务器准备

```bash
# 克隆项目
git clone <your-repo-url> /var/www/sales-tools
cd /var/www/sales-tools

# 设置执行权限
chmod +x deploy.sh
```

### 2. 环境配置

创建生产环境配置文件：

```bash
# 后端环境配置
cp backend/.env.example backend/.env
```

编辑 `backend/.env` 文件：
```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-domain.com
JWT_SECRET=your-super-secure-jwt-secret
```

### 3. 执行部署

```bash
# 生产环境部署
./deploy.sh production

# 开发环境部署
./deploy.sh development

# 测试环境部署
./deploy.sh staging
```

## PM2 配置详解

### 集群模式配置

```javascript
{
  name: 'sales-backend',
  script: './backend/dist/app.js',
  instances: 'max',        // 使用所有CPU核心
  exec_mode: 'cluster',    // 集群模式
  max_memory_restart: '1G', // 内存超过1G自动重启
  max_restarts: 10,        // 最大重启次数
  min_uptime: '10s'        // 最小运行时间
}
```

### 关键参数说明

- **instances**: 
  - `'max'`: 使用所有CPU核心
  - `4`: 固定4个实例
  - `0`: 等同于 'max'

- **exec_mode**: 
  - `'cluster'`: 集群模式，支持负载均衡
  - `'fork'`: 单进程模式

- **max_memory_restart**: 内存限制，超过后自动重启
- **max_restarts**: 防止无限重启的保护机制
- **min_uptime**: 防止频繁重启

## 常用管理命令

### 基础操作
```bash
# 启动应用
pm2 start ecosystem.config.js --env production

# 重启应用
pm2 restart sales-backend

# 重载应用 (零停机重启)
pm2 reload sales-backend

# 停止应用
pm2 stop sales-backend

# 删除应用
pm2 delete sales-backend

# 查看状态
pm2 status
pm2 list
```

### 日志管理
```bash
# 查看所有日志
pm2 logs

# 查看特定应用日志
pm2 logs sales-backend

# 查看错误日志
pm2 logs sales-backend --err

# 清空日志
pm2 flush

# 实时监控
pm2 monit
```

### 进程管理
```bash
# 查看详细信息
pm2 show sales-backend

# 重置重启计数
pm2 reset sales-backend

# 扩展实例数量
pm2 scale sales-backend 8

# 减少实例数量
pm2 scale sales-backend 2
```

## 监控和维护

### 1. 性能监控

```bash
# 实时监控面板
pm2 monit

# 查看资源使用情况
pm2 status
```

### 2. 日志轮转

创建日志轮转配置：
```bash
# 安装 pm2-logrotate
pm2 install pm2-logrotate

# 配置日志轮转
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress true
```

### 3. 开机自启

```bash
# 保存当前进程列表
pm2 save

# 生成启动脚本
pm2 startup

# 按照提示执行生成的命令 (通常需要 sudo)
```

## 负载均衡配置

### Nginx 反向代理

创建 `/etc/nginx/sites-available/sales-tools`：

```nginx
upstream sales_backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    # 可以添加更多后端实例
}

server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        root /var/www/sales-tools/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # API 代理
    location /api/ {
        proxy_pass http://sales_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 故障排除

### 常见问题

1. **应用无法启动**
   ```bash
   # 检查日志
   pm2 logs sales-backend --err
   
   # 检查配置文件
   pm2 prettylist
   ```

2. **内存泄漏**
   ```bash
   # 监控内存使用
   pm2 monit
   
   # 设置内存限制
   pm2 restart sales-backend --max-memory-restart 500M
   ```

3. **端口冲突**
   ```bash
   # 检查端口占用
   netstat -tulpn | grep :3000
   
   # 修改配置文件中的端口
   ```

### 调试模式

```bash
# 以调试模式启动
pm2 start ecosystem.config.js --env development

# 查看详细错误信息
pm2 logs sales-backend --lines 100
```

## 最佳实践

### 1. 资源配置
- 根据服务器配置合理设置实例数量
- 设置合适的内存限制
- 配置日志轮转避免磁盘空间不足

### 2. 安全考虑
- 使用非 root 用户运行应用
- 配置防火墙规则
- 定期更新依赖包

### 3. 监控告警
- 设置资源使用告警
- 配置应用健康检查
- 建立日志分析系统

### 4. 备份策略
- 定期备份配置文件
- 保存 PM2 进程列表
- 建立代码版本管理

## 部署检查清单

- [ ] 服务器环境准备完成
- [ ] PM2 已全局安装
- [ ] 环境变量配置正确
- [ ] 代码构建成功
- [ ] PM2 配置文件正确
- [ ] 应用启动成功
- [ ] 负载均衡配置完成
- [ ] 日志轮转设置
- [ ] 开机自启配置
- [ ] 监控告警设置
- [ ] 备份策略实施

## 联系支持

如遇到部署问题，请提供以下信息：
- 服务器环境信息
- PM2 版本和配置
- 错误日志内容
- 应用状态截图