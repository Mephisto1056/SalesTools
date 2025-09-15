# SalesTools PM2 集群部署总结

## 📁 部署文件结构

```
SalesTools/
├── ecosystem.full.config.js    # PM2全栈配置文件
├── fullstack-deploy.sh         # 全栈一键部署脚本
├── pm2-manager.sh              # PM2管理工具脚本
├── PM2-QUICKSTART.md           # 快速开始指南
└── DEPLOYMENT-SUMMARY.md       # 本文档
```

## 🚀 部署命令

### 开发环境
```bash
./fullstack-deploy.sh development dev
```
- 启动后端集群 (10个实例)
- 启动前端开发服务器 (热重载)
- 访问: http://localhost:5173

### 生产环境
```bash
./fullstack-deploy.sh production prod
```
- 启动后端集群 (max实例)
- 构建并启动前端静态服务 (2个实例)
- 访问: http://localhost:5173

## 🔧 管理命令

```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs

# 重启服务
pm2 restart sales-backend         # 重启后端
pm2 restart sales-frontend-dev    # 重启前端(开发)
pm2 restart sales-frontend-prod   # 重启前端(生产)

# 零停机重载
pm2 reload sales-backend

# 停止所有
pm2 stop all

# 监控面板
pm2 monit

# 管理脚本
./pm2-manager.sh status           # 查看状态
./pm2-manager.sh health           # 健康检查
./pm2-manager.sh cleanup          # 清理日志
```

## 📊 服务配置

### 后端服务 (sales-backend)
- **端口**: 3000
- **模式**: cluster
- **实例数**: max (使用所有CPU核心)
- **内存限制**: 1GB
- **自动重启**: 是
- **日志**: ./logs/backend-*.log

### 前端服务
#### 开发模式 (sales-frontend-dev)
- **端口**: 5173
- **模式**: fork
- **实例数**: 1
- **命令**: npm run dev
- **热重载**: 是

#### 生产模式 (sales-frontend-prod)
- **端口**: 5173
- **模式**: cluster
- **实例数**: 2
- **命令**: serve -s dist
- **静态文件**: 是

## 🏥 健康检查

```bash
# 后端API健康检查
curl http://localhost:3000/health

# 前端页面检查
curl -I http://localhost:5173

# PM2状态检查
pm2 status
```

## 🔄 更新部署

```bash
# 停止现有服务
pm2 stop all

# 拉取最新代码
git pull origin main

# 重新部署
./fullstack-deploy.sh production prod
```

## 📝 注意事项

1. **依赖要求**:
   - Node.js >= 16.0.0
   - PM2 已全局安装
   - 前端已添加 terser 和 serve 依赖
   - 后端已添加 tsc-alias 依赖

2. **端口占用**:
   - 确保 3000 和 5173 端口未被占用
   - 生产环境建议使用 Nginx 反向代理

3. **权限问题**:
   - 避免使用 sudo 运行 PM2
   - 使用专用用户部署应用

4. **日志管理**:
   - 定期清理日志文件
   - 配置日志轮转

## 🛡️ 生产环境建议

1. **Nginx 配置**:
```nginx
upstream sales_backend {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://127.0.0.1:5173;
    }
    
    location /api/ {
        proxy_pass http://sales_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

2. **开机自启**:
```bash
pm2 save
pm2 startup
```

3. **监控告警**:
```bash
# 安装监控模块
pm2 install pm2-server-monit

# 配置日志轮转
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

## 📞 故障排除

### 常见问题

1. **端口冲突**:
```bash
netstat -tulpn | grep :3000
sudo kill -9 $(sudo lsof -t -i:3000)
```

2. **内存不足**:
```bash
pm2 restart sales-backend --max-memory-restart 500M
```

3. **构建失败**:
```bash
# 检查依赖
cd frontend && npm install
cd backend && npm install

# 手动构建测试
cd frontend && npm run build
cd backend && npm run build
```

4. **PM2 进程异常**:
```bash
pm2 kill
pm2 start ecosystem.full.config.js --env production
```

---

**部署完成后，您的 SalesTools 应用将具备企业级的高可用性、负载均衡和自动故障恢复能力。**