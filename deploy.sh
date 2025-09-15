#!/bin/bash

# SalesTools PM2 集群部署脚本
# 使用方法: ./deploy.sh [production|staging|development]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 环境参数
ENVIRONMENT=${1:-production}

echo -e "${BLUE}🚀 开始部署 SalesTools 到 ${ENVIRONMENT} 环境${NC}"

# 检查 PM2 是否安装
if ! command -v pm2 &> /dev/null; then
    echo -e "${RED}❌ PM2 未安装，正在安装...${NC}"
    npm install -g pm2
fi

# 创建日志目录
echo -e "${YELLOW}📁 创建日志目录...${NC}"
mkdir -p logs

# 构建后端项目
echo -e "${YELLOW}🔨 构建后端项目...${NC}"
cd backend
npm install --production
npm run build
cd ..

# 停止现有的 PM2 进程
echo -e "${YELLOW}⏹️  停止现有进程...${NC}"
pm2 stop ecosystem.config.js || true

# 启动 PM2 集群
echo -e "${YELLOW}🚀 启动 PM2 集群...${NC}"
pm2 start ecosystem.config.js --env ${ENVIRONMENT}

# 保存 PM2 配置
echo -e "${YELLOW}💾 保存 PM2 配置...${NC}"
pm2 save

# 设置 PM2 开机自启
echo -e "${YELLOW}🔄 设置开机自启...${NC}"
pm2 startup

# 显示状态
echo -e "${GREEN}✅ 部署完成！${NC}"
echo -e "${BLUE}📊 当前状态:${NC}"
pm2 status

echo -e "${BLUE}📝 查看日志命令:${NC}"
echo -e "  实时日志: ${YELLOW}pm2 logs${NC}"
echo -e "  错误日志: ${YELLOW}pm2 logs --err${NC}"
echo -e "  特定应用: ${YELLOW}pm2 logs sales-backend${NC}"

echo -e "${BLUE}🔧 管理命令:${NC}"
echo -e "  重启应用: ${YELLOW}pm2 restart sales-backend${NC}"
echo -e "  重载应用: ${YELLOW}pm2 reload sales-backend${NC}"
echo -e "  停止应用: ${YELLOW}pm2 stop sales-backend${NC}"
echo -e "  删除应用: ${YELLOW}pm2 delete sales-backend${NC}"
echo -e "  监控面板: ${YELLOW}pm2 monit${NC}"