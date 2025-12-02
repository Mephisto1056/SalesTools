# 端口修改指南

## 如何避免端口冲突

### 1. 检查端口占用

```bash
# 检查端口是否被占用
netstat -tulpn | grep :3000
netstat -tulpn | grep :5173

# 或使用 lsof
lsof -i :3000
lsof -i :5173
```

### 2. 修改后端端口（例如改为 3001）

#### 步骤 1: 修改 backend/.env
```bash
# 将 PORT=3000 改为
PORT=3001
```

#### 步骤 2: 修改 ecosystem.full.config.js
找到以下位置并修改：
```javascript
// 第13行（开发环境）
env: {
  PORT: 3001,  // 改为新端口
  ...
}

// 第21行（生产环境）
env_production: {
  PORT: 3001,  // 改为新端口
  ...
}
```

#### 步骤 3: 修改前端代理配置
修改 `frontend/.env.example` 和 `frontend/.env`:
```bash
# 将后端URL改为新端口
VITE_BACKEND_URL=http://localhost:3001
```

### 3. 修改前端端口（例如改为 5174）

#### 步骤 1: 修改 frontend/vite.config.ts
```typescript
// 第14行
server: {
  port: 5174,  // 改为新端口
  ...
}
```

#### 步骤 2: 修改 ecosystem.full.config.js
找到前端生产服务配置：
```javascript
// 第71行
args: 'serve -s dist -l 5174',  // 改为新端口
```

#### 步骤 3: 修改后端CORS配置
修改 `backend/.env`:
```bash
# 更新前端URL
FRONTEND_URL=http://47.116.200.141:5174,http://localhost:5174,http://127.0.0.1:5174
```

### 4. 推荐端口组合

根据服务器现有项目，选择未使用的端口组合：

**组合 1（轻微调整）**:
- 后端: 3001
- 前端: 5174

**组合 2（避开常用端口）**:
- 后端: 8080
- 前端: 8081

**组合 3（高端口号）**:
- 后端: 9000
- 前端: 9001

### 5. 快速修改脚本

创建一个快速修改端口的脚本：

```bash
#!/bin/bash
# change-ports.sh

BACKEND_PORT=$1
FRONTEND_PORT=$2

if [ -z "$BACKEND_PORT" ] || [ -z "$FRONTEND_PORT" ]; then
    echo "用法: ./change-ports.sh <后端端口> <前端端口>"
    echo "示例: ./change-ports.sh 3001 5174"
    exit 1
fi

echo "修改后端端口为: $BACKEND_PORT"
echo "修改前端端口为: $FRONTEND_PORT"

# 修改 backend/.env
sed -i "s/PORT=.*/PORT=$BACKEND_PORT/" backend/.env

# 修改 frontend/vite.config.ts
sed -i "s/port: [0-9]*/port: $FRONTEND_PORT/" frontend/vite.config.ts

# 修改 ecosystem.full.config.js (需要手动确认)
echo ""
echo "请手动修改以下文件中的端口配置："
echo "1. ecosystem.full.config.js - 后端PORT和前端serve端口"
echo "2. backend/.env - FRONTEND_URL"
echo ""
echo "修改完成后，重新部署："
echo "./fullstack-deploy.sh production prod"
```

### 6. 修改后的部署步骤

```bash
# 1. 修改端口配置（按上述步骤）

# 2. 停止现有服务
pm2 stop all

# 3. 清理PM2缓存
pm2 delete all
pm2 save --force

# 4. 重新部署
./fullstack-deploy.sh production prod

# 5. 验证新端口
curl http://localhost:新后端端口/health
curl -I http://localhost:新前端端口
```

### 7. 防火墙配置

如果服务器启用了防火墙，需要开放新端口：

```bash
# Ubuntu/Debian (ufw)
sudo ufw allow 新后端端口/tcp
sudo ufw allow 新前端端口/tcp
sudo ufw reload

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-port=新后端端口/tcp
sudo firewall-cmd --permanent --add-port=新前端端口/tcp
sudo firewall-cmd --reload
```

## 最佳实践建议

1. **生产环境使用 Nginx 反向代理**，内部端口可以任意，对外统一使用 80/443
2. **使用环境变量**管理端口，便于不同环境切换
3. **文档记录**当前使用的端口避免冲突
4. **端口范围建议**: 使用 3000-9999 范围内的端口

## 示例：使用 Nginx 反向代理（推荐）

```nginx
# /etc/nginx/sites-available/salestools
server {
    listen 80;
    server_name your-domain.com;

    # 前端
    location / {
        proxy_pass http://localhost:5174;  # 内部端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 后端API
    location /api {
        proxy_pass http://localhost:3001;  # 内部端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

这样外部只需访问 80 端口，内部端口可以任意配置，避免冲突。