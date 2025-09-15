#!/bin/bash

# SalesTools 全栈 PM2 部署脚本
# 使用方法: ./fullstack-deploy.sh [development|production] [frontend-mode]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 参数
ENVIRONMENT=${1:-development}
FRONTEND_MODE=${2:-dev}  # dev 或 prod

echo -e "${BLUE}🚀 开始全栈部署 SalesTools${NC}"
echo -e "${YELLOW}环境: ${ENVIRONMENT}${NC}"
echo -e "${YELLOW}前端模式: ${FRONTEND_MODE}${NC}"

# 检查 PM2 是否安装
if ! command -v pm2 &> /dev/null; then
    echo -e "${RED}❌ PM2 未安装，正在安装...${NC}"
    npm install -g pm2
fi

# 创建日志目录
echo -e "${YELLOW}📁 创建日志目录...${NC}"
mkdir -p logs

# 停止现有进程
echo -e "${YELLOW}⏹️  停止现有进程...${NC}"
pm2 stop all 2>/dev/null || true

# 构建后端
echo -e "${YELLOW}🔨 构建后端项目...${NC}"
cd backend
npm install
npm run build
cd ..

# 构建前端 (如果是生产模式)
if [ "$FRONTEND_MODE" = "prod" ] || [ "$ENVIRONMENT" = "production" ]; then
    echo -e "${YELLOW}🔨 构建前端项目...${NC}"
    cd frontend
    npm install
    npm run build
    cd ..
else
    echo -e "${YELLOW}📦 安装前端依赖...${NC}"
    cd frontend
    npm install
    cd ..
fi

# 启动服务
echo -e "${YELLOW}🚀 启动服务...${NC}"

if [ "$ENVIRONMENT" = "production" ]; then
    # 生产环境：启动后端集群 + 前端静态服务
    pm2 start ecosystem.full.config.js --only sales-backend --env production
    pm2 start ecosystem.full.config.js --only sales-frontend-prod --env production
else
    # 开发环境：启动后端集群 + 前端开发服务器
    pm2 start ecosystem.full.config.js --only sales-backend --env development
    
    if [ "$FRONTEND_MODE" = "dev" ]; then
        pm2 start ecosystem.full.config.js --only sales-frontend-dev
    else
        pm2 start ecosystem.full.config.js --only sales-frontend-prod
    fi
fi

# 保存配置
echo -e "${YELLOW}💾 保存 PM2 配置...${NC}"
pm2 save

# 显示状态
echo -e "${GREEN}✅ 全栈部署完成！${NC}"
echo -e "${BLUE}📊 当前状态:${NC}"
pm2 status

echo -e "${BLUE}🌐 访问地址:${NC}"
echo -e "  前端: ${YELLOW}http://localhost:5173${NC}"
echo -e "  后端API: ${YELLOW}http://localhost:3000${NC}"
echo -e "  健康检查: ${YELLOW}http://localhost:3000/health${NC}"

echo -e "${BLUE}📝 管理命令:${NC}"
echo -e "  查看状态: ${YELLOW}pm2 status${NC}"
echo -e "  查看日志: ${YELLOW}pm2 logs${NC}"
echo -e "  重启前端: ${YELLOW}pm2 restart sales-frontend-dev${NC}"
echo -e "  重启后端: ${YELLOW}pm2 restart sales-backend${NC}"
echo -e "  停止所有: ${YELLOW}pm2 stop all${NC}"
echo -e "  监控面板: ${YELLOW}pm2 monit${NC}"

# 健康检查
echo -e "${BLUE}🏥 执行健康检查...${NC}"
echo -e "${YELLOW}等待服务完全启动...${NC}"
sleep 10

# 检查后端
echo -e "${BLUE}检查后端服务...${NC}"
for i in {1..5}; do
    if curl -s http://localhost:3000/health > /dev/null; then
        echo -e "${GREEN}✅ 后端服务正常${NC}"
        break
    else
        if [ $i -eq 5 ]; then
            echo -e "${RED}❌ 后端服务异常${NC}"
        else
            echo -e "${YELLOW}⏳ 等待后端服务启动... (尝试 $i/5)${NC}"
            sleep 2
        fi
    fi
done

# 检查前端
echo -e "${BLUE}检查前端服务...${NC}"
for i in {1..5}; do
    if curl -s -I http://localhost:5173 | grep -q "200 OK"; then
        echo -e "${GREEN}✅ 前端服务正常${NC}"
        break
    else
        if [ $i -eq 5 ]; then
            echo -e "${RED}❌ 前端服务异常${NC}"
            echo -e "${YELLOW}💡 提示: 前端可能需要更长时间启动，请稍后手动检查${NC}"
        else
            echo -e "${YELLOW}⏳ 等待前端服务启动... (尝试 $i/5)${NC}"
            sleep 3
        fi
    fi
done

# 显示双API Key状态
echo -e "${BLUE}🔑 检查双API Key状态...${NC}"
if curl -s http://localhost:3000/api/status/status | grep -q "healthy"; then
    echo -e "${GREEN}✅ 双API Key功能正常${NC}"
else
    echo -e "${YELLOW}⚠️ 双API Key状态检查失败，请手动验证${NC}"
fi

echo -e "${GREEN}🎉 全栈部署完成！${NC}"