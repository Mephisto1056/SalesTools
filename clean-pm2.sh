#!/bin/bash

# PM2 清理脚本
# 清理PM2缓存、进程和配置，解决部署问题

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🧹 清理PM2环境${NC}"

# 1. 停止并删除所有PM2进程
echo -e "${YELLOW}⏹️  停止并清理PM2进程...${NC}"
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# 2. 杀死PM2守护进程
echo -e "${YELLOW}💀 杀死PM2守护进程...${NC}"
pm2 kill 2>/dev/null || true

# 3. 清理PM2缓存和数据
echo -e "${YELLOW}🗑️  清理PM2缓存...${NC}"
rm -rf ~/.pm2/logs/* 2>/dev/null || true
rm -rf ~/.pm2/pids/* 2>/dev/null || true
rm -rf ~/.pm2/dump.pm2 2>/dev/null || true
rm -rf ~/.pm2/modules 2>/dev/null || true

# 4. 清理项目构建缓存
echo -e "${YELLOW}🗑️  清理项目构建缓存...${NC}"
rm -rf backend/node_modules/.cache 2>/dev/null || true
rm -rf frontend/node_modules/.cache 2>/dev/null || true
rm -rf backend/dist 2>/dev/null || true
rm -rf frontend/dist 2>/dev/null || true

# 5. 清理npm缓存
echo -e "${YELLOW}🗑️  清理npm缓存...${NC}"
npm cache clean --force 2>/dev/null || true

# 6. 清理日志文件
echo -e "${YELLOW}🗑️  清理日志文件...${NC}"
rm -rf logs/* 2>/dev/null || true
rm -rf backend/logs/* 2>/dev/null || true
rm -rf frontend/logs/* 2>/dev/null || true

# 7. 重新创建必要目录
echo -e "${YELLOW}📁 重新创建目录...${NC}"
mkdir -p logs
mkdir -p backend/logs
mkdir -p frontend/logs

# 8. 重新启动PM2守护进程
echo -e "${YELLOW}🚀 重新启动PM2守护进程...${NC}"
pm2 ping

echo -e "${GREEN}✅ PM2环境清理完成！${NC}"
echo -e "${BLUE}📝 接下来请执行:${NC}"
echo -e "  1. ${YELLOW}git pull${NC} - 拉取最新代码"
echo -e "  2. ${YELLOW}./fullstack-deploy.sh production prod${NC} - 重新部署"

echo -e "${BLUE}💡 如果还有问题，请检查:${NC}"
echo -e "  - 确保代码已同步到最新版本"
echo -e "  - 检查 frontend/package.json 中是否包含 serve 依赖"
echo -e "  - 检查 ecosystem.full.config.js 配置是否正确"