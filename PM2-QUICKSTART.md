# PM2 集群部署快速开始指南

## 🚀 快速部署

### 1. 清理环境 (如果遇到缓存问题)
```bash
./clean-pm2.sh
```

### 2. 全栈一键部署 (推荐)
```bash
# 开发环境 (前端开发服务器 + 后端集群)
./fullstack-deploy.sh development dev

# 生产环境 (前端静态文件 + 后端集群)
./fullstack-deploy.sh production prod
```

### 3. 查看应用状态
```bash
pm2 status
```

### 4. 查看实时日志
```bash
pm2 logs
```

## 📋 部署后检查清单

上传到服务器后，按以下步骤进行PM2集群部署：

### 步骤 1: 环境准备
```bash
# 安装 Node.js 和 npm (如果未安装)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 全局安装 PM2
sudo npm install -g pm2
```

### 步骤 2: 项目配置
```bash
# 进入项目目录
cd /path/to/SalesTools

# 复制环境配置文件
cp backend/.env.example backend/.env

# 编辑生产环境配置
nano backend/.env
```

### 步骤 3: 清理环境 (如果遇到问题)
```bash
# 清理PM2缓存和进程
./clean-pm2.sh

# 拉取最新代码
git pull
```

### 步骤 4: 执行部署
```bash
# 全栈部署 (推荐)
./fullstack-deploy.sh production prod

# 或手动部署
pm2 start ecosystem.full.config.js --env production
```

### 步骤 4: 验证部署
```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs

# 检查端口监听
netstat -tulpn | grep :3000
netstat -tulpn | grep :5173

# 测试API接口
curl http://localhost:3000/health

# 测试前端页面
curl -I http://localhost:5173
```

## 🔧 常用管理命令

### 全栈管理
```bash
# 全栈部署
./fullstack-deploy.sh development dev  # 开发环境
./fullstack-deploy.sh production prod  # 生产环境

# 重启前端
pm2 restart sales-frontend-dev         # 开发环境
pm2 restart sales-frontend-prod        # 生产环境

# 重启后端
pm2 restart sales-backend

# 停止所有服务
pm2 stop all
```

### 单独后端管理
```bash
# 启动应用
./pm2-manager.sh start production

# 停止应用
./pm2-manager.sh stop production

# 重启应用
./pm2-manager.sh restart production

# 零停机重载
./pm2-manager.sh reload production
```

### 扩缩容
```bash
# 扩展到8个实例
./pm2-manager.sh scale production 8

# 缩减到2个实例
./pm2-manager.sh scale production 2
```

### 监控和日志
```bash
# 实时监控
./pm2-manager.sh monitor

# 查看日志
./pm2-manager.sh logs

# 健康检查
./pm2-manager.sh health

# 清理日志
./pm2-manager.sh cleanup
```

## 📊 性能优化建议

### 实例数量配置
- **2核CPU**: 2-4个实例
- **4核CPU**: 4-6个实例  
- **8核CPU**: 6-8个实例
- **16核CPU**: 8-12个实例

### 内存配置
```javascript
// 根据服务器内存调整
max_memory_restart: '800M'  // 2GB内存服务器
max_memory_restart: '1.5G'  // 4GB内存服务器
max_memory_restart: '2G'    // 8GB内存服务器
```

## 🔍 故障排除

### 应用无法启动
```bash
# 查看错误日志
pm2 logs sales-backend-main --err

# 检查配置文件
pm2 prettylist

# 手动测试启动
cd backend && node dist/app.js
```

### 内存使用过高
```bash
# 监控内存使用
pm2 monit

# 重启高内存进程
pm2 restart sales-backend-main

# 调整内存限制
pm2 restart sales-backend-main --max-memory-restart 500M
```

### 端口冲突
```bash
# 检查端口占用
sudo netstat -tulpn | grep :3000

# 杀死占用进程
sudo kill -9 $(sudo lsof -t -i:3000)
```

## 🛡️ 安全配置

### 1. 创建专用用户
```bash
# 创建部署用户
sudo useradd -m -s /bin/bash deploy
sudo usermod -aG sudo deploy

# 切换到部署用户
su - deploy
```

### 2. 配置防火墙
```bash
# 开放必要端口
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw allow 3000  # API (可选，通过Nginx代理)
sudo ufw enable
```

### 3. 设置环境变量
```bash
# 在 backend/.env 中配置
NODE_ENV=production
JWT_SECRET=your-super-secure-random-string
PORT=3000
```

## 📈 监控和告警

### 1. 设置PM2监控
```bash
# 安装PM2监控模块
pm2 install pm2-server-monit

# 查看监控面板
pm2 monit
```

### 2. 日志轮转
```bash
# 安装日志轮转模块
pm2 install pm2-logrotate

# 配置日志轮转
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress true
```

### 3. 开机自启
```bash
# 保存当前PM2配置
pm2 save

# 生成开机启动脚本
pm2 startup

# 执行生成的命令 (需要sudo权限)
```

## 🔄 负载均衡配置

### Nginx配置示例
```nginx
upstream sales_backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
}

server {
    listen 80;
    server_name your-domain.com;
    
    location /api/ {
        proxy_pass http://sales_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 📞 技术支持

如果遇到问题，请提供以下信息：
- 服务器配置 (`cat /proc/cpuinfo | grep processor | wc -l`)
- 内存信息 (`free -h`)
- PM2状态 (`pm2 status`)
- 错误日志 (`pm2 logs --err`)
- 系统日志 (`journalctl -u pm2-deploy`)

---

**提示**: 建议在生产环境部署前，先在测试环境验证所有配置和脚本的正确性。