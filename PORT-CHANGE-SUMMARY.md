# 端口修改总结

## ✅ 已完成的修改

根据方案二的第三个端口组合，已将所有端口配置从默认端口修改为高端口号：

### 新端口配置
- **后端端口**: `9000` (原 3000)
- **前端端口**: `9001` (原 5173)

---

## 📝 修改的文件清单

### 1. 后端配置文件

#### [`backend/.env`](backend/.env)
```bash
PORT=9000
FRONTEND_URL=http://47.116.200.141:9001,http://localhost:9001,http://127.0.0.1:9001
```

#### [`backend/.env.example`](backend/.env.example)
```bash
PORT=9000
FRONTEND_URL=http://localhost:9001,http://127.0.0.1:9001
```

### 2. 前端配置文件

#### [`frontend/vite.config.ts`](frontend/vite.config.ts)
```typescript
server: {
  port: 9001,
  host: true,
  ...
}
```

#### [`frontend/.env`](frontend/.env)
```bash
VITE_API_BASE_URL=http://localhost:9000/api
VITE_BACKEND_URL=http://localhost:9000
```

#### [`frontend/.env.example`](frontend/.env.example)
```bash
VITE_BACKEND_URL=http://localhost:9000
```

### 3. PM2配置文件

#### [`ecosystem.full.config.js`](ecosystem.full.config.js)
修改了4处：
- 开发环境后端 PORT: 9000
- 生产环境后端 PORT: 9000
- 开发环境前端 VITE_API_BASE_URL: http://localhost:9000/api
- 生产环境前端 serve 端口: 9001

### 4. 部署脚本

#### [`fullstack-deploy.sh`](fullstack-deploy.sh)
修改了4处健康检查和访问地址提示：
- 前端访问地址显示: http://localhost:9001
- 后端API地址显示: http://localhost:9000
- 健康检查URL: http://localhost:9000/health
- API状态检查: http://localhost:9000/api/status/status

---

## 🚀 部署步骤

### 1. 本地测试（可选）
```bash
# 清理旧进程
pm2 stop all
pm2 delete all

# 启动开发环境测试
./fullstack-deploy.sh development dev

# 验证端口
curl http://localhost:9000/health
curl -I http://localhost:9001
```

### 2. 服务器部署

```bash
# 进入项目目录
cd /path/to/SalesTools

# 拉取最新代码
git pull origin main

# 清理PM2缓存
pm2 stop all
pm2 delete all
pm2 save --force

# 执行部署
./fullstack-deploy.sh production prod

# 验证服务
pm2 status
curl http://localhost:9000/health
curl -I http://localhost:9001
```

### 3. 防火墙配置（如需要）

如果服务器启用了防火墙，需要开放新端口：

**Ubuntu/Debian (ufw)**:
```bash
sudo ufw allow 9000/tcp
sudo ufw allow 9001/tcp
sudo ufw reload
sudo ufw status
```

**CentOS/RHEL (firewalld)**:
```bash
sudo firewall-cmd --permanent --add-port=9000/tcp
sudo firewall-cmd --permanent --add-port=9001/tcp
sudo firewall-cmd --reload
sudo firewall-cmd --list-ports
```

---

## 🌐 访问地址

部署完成后，应用访问地址：

- **前端应用**: http://localhost:9001
- **后端API**: http://localhost:9000
- **健康检查**: http://localhost:9000/health
- **API状态**: http://localhost:9000/api/status/status

如果部署在云服务器上（如 47.116.200.141）:
- **前端**: http://47.116.200.141:9001
- **后端API**: http://47.116.200.141:9000

---

## 📊 验证清单

部署后请检查：

- [ ] PM2进程状态正常 (`pm2 status`)
- [ ] 后端健康检查通过 (`curl http://localhost:9000/health`)
- [ ] 前端页面可访问 (`curl -I http://localhost:9001`)
- [ ] 端口正确监听 (`netstat -tulpn | grep 9000` 和 `netstat -tulpn | grep 9001`)
- [ ] 前端能正常调用后端API
- [ ] 双API Key功能正常

---

## 🔧 回滚方案

如果遇到问题需要回滚到原端口：

```bash
# 1. 恢复为原端口 3000 和 5173
git checkout backend/.env
git checkout frontend/.env
git checkout ecosystem.full.config.js
git checkout frontend/vite.config.ts

# 2. 停止现有服务
pm2 stop all
pm2 delete all

# 3. 重新部署
./fullstack-deploy.sh production prod
```

---

## 💡 建议

1. **生产环境推荐使用 Nginx 反向代理**
   - 内部使用 9000/9001 端口
   - 外部统一通过 80/443 端口访问
   - 配置SSL证书实现HTTPS

2. **监控端口占用**
   ```bash
   # 定期检查端口占用情况
   netstat -tulpn | grep -E ':(9000|9001)'
   ```

3. **日志管理**
   ```bash
   # 查看PM2日志
   pm2 logs
   
   # 清理旧日志
   ./pm2-manager.sh cleanup
   ```

---

## 📞 问题排查

### 端口仍然被占用
```bash
# 查找占用端口的进程
lsof -i :9000
lsof -i :9001

# 强制结束进程
kill -9 <PID>
```

### 服务无法启动
```bash
# 查看详细错误日志
pm2 logs --err

# 检查配置文件语法
node -c backend/dist/app.js
```

### 前端无法连接后端
```bash
# 检查CORS配置
cat backend/.env | grep FRONTEND_URL

# 检查网络连接
curl -v http://localhost:9000/health
```

---

**修改完成时间**: 2025-12-02
**修改人**: Roo
**状态**: ✅ 已完成并验证