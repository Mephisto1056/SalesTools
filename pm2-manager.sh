#!/bin/bash

# 检查bash版本，如果不支持关联数组则使用简单方式
if [[ ${BASH_VERSION%%.*} -lt 4 ]]; then
    echo "警告: 检测到较旧的bash版本，使用兼容模式"
    USE_LEGACY_MODE=true
else
    USE_LEGACY_MODE=false
fi

# PM2 管理脚本
# 使用方法: ./pm2-manager.sh [command] [environment]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# 参数
COMMAND=${1:-help}
ENVIRONMENT=${2:-production}

# 获取配置文件
get_config_file() {
    # 统一使用全栈配置文件
    echo "ecosystem.full.config.js"
}

# 显示帮助信息
show_help() {
    echo -e "${BLUE}SalesTools PM2 管理脚本${NC}"
    echo -e "${YELLOW}使用方法: ./pm2-manager.sh [command] [environment]${NC}"
    echo ""
    echo -e "${GREEN}可用命令:${NC}"
    echo -e "  ${YELLOW}start${NC}     - 启动应用"
    echo -e "  ${YELLOW}stop${NC}      - 停止应用"
    echo -e "  ${YELLOW}restart${NC}   - 重启应用"
    echo -e "  ${YELLOW}reload${NC}    - 零停机重载"
    echo -e "  ${YELLOW}status${NC}    - 查看状态"
    echo -e "  ${YELLOW}logs${NC}      - 查看日志"
    echo -e "  ${YELLOW}monitor${NC}   - 监控面板"
    echo -e "  ${YELLOW}scale${NC}     - 扩缩容 (需要第三个参数: 实例数)"
    echo -e "  ${YELLOW}deploy${NC}    - 完整部署"
    echo -e "  ${YELLOW}backup${NC}    - 备份配置"
    echo -e "  ${YELLOW}restore${NC}   - 恢复配置"
    echo -e "  ${YELLOW}health${NC}    - 健康检查"
    echo -e "  ${YELLOW}cleanup${NC}   - 清理日志"
    echo ""
    echo -e "${GREEN}可用环境:${NC}"
    echo -e "  ${YELLOW}development${NC} - 开发环境"
    echo -e "  ${YELLOW}production${NC}  - 生产环境"
    echo -e "  ${YELLOW}staging${NC}     - 测试环境"
    echo ""
    echo -e "${GREEN}示例:${NC}"
    echo -e "  ./pm2-manager.sh start production"
    echo -e "  ./pm2-manager.sh scale production 6"
    echo -e "  ./pm2-manager.sh logs development"
}

# 检查PM2是否安装
check_pm2() {
    if ! command -v pm2 &> /dev/null; then
        echo -e "${RED}❌ PM2 未安装，正在安装...${NC}"
        npm install -g pm2
    fi
}

# 创建必要目录
create_directories() {
    echo -e "${YELLOW}📁 创建必要目录...${NC}"
    mkdir -p logs
    mkdir -p /var/log/sales-tools 2>/dev/null || mkdir -p logs/sales-tools
}

# 构建项目
build_project() {
    echo -e "${YELLOW}🔨 构建项目...${NC}"
    cd backend
    npm install --production
    npm run build
    cd ..
}

# 启动应用
start_app() {
    local config_file=$(get_config_file)
    echo -e "${GREEN}🚀 启动应用 (${ENVIRONMENT})...${NC}"
    check_pm2
    create_directories
    build_project
    pm2 start $config_file --env $ENVIRONMENT
    pm2 save
    echo -e "${GREEN}✅ 应用启动成功！${NC}"
}

# 停止应用
stop_app() {
    local config_file=$(get_config_file)
    echo -e "${YELLOW}⏹️  停止应用...${NC}"
    pm2 stop $config_file
    echo -e "${GREEN}✅ 应用已停止！${NC}"
}

# 重启应用
restart_app() {
    local config_file=$(get_config_file)
    echo -e "${YELLOW}🔄 重启应用...${NC}"
    pm2 restart $config_file
    echo -e "${GREEN}✅ 应用重启成功！${NC}"
}

# 零停机重载
reload_app() {
    local config_file=$(get_config_file)
    echo -e "${YELLOW}🔄 零停机重载...${NC}"
    pm2 reload $config_file
    echo -e "${GREEN}✅ 应用重载成功！${NC}"
}

# 查看状态
show_status() {
    echo -e "${BLUE}📊 应用状态:${NC}"
    pm2 status
    echo ""
    echo -e "${BLUE}💾 内存使用:${NC}"
    pm2 show sales-backend-main 2>/dev/null | grep -E "(memory|cpu)" || echo "应用未运行"
}

# 查看日志
show_logs() {
    echo -e "${BLUE}📝 应用日志:${NC}"
    pm2 logs --lines 50
}

# 监控面板
show_monitor() {
    echo -e "${BLUE}📊 启动监控面板...${NC}"
    pm2 monit
}

# 扩缩容
scale_app() {
    local instances=${3:-4}
    echo -e "${YELLOW}📈 扩缩容到 ${instances} 个实例...${NC}"
    pm2 scale sales-backend-main $instances
    echo -e "${GREEN}✅ 扩缩容完成！${NC}"
}

# 完整部署
deploy_app() {
    echo -e "${BLUE}🚀 开始完整部署...${NC}"
    
    # 停止现有应用
    pm2 stop all 2>/dev/null || true
    
    # 构建和启动
    start_app
    
    # 设置开机自启
    echo -e "${YELLOW}🔄 设置开机自启...${NC}"
    pm2 startup
    
    echo -e "${GREEN}✅ 完整部署成功！${NC}"
    show_status
}

# 备份配置
backup_config() {
    local backup_dir="backups/$(date +%Y%m%d_%H%M%S)"
    echo -e "${YELLOW}💾 备份配置到 ${backup_dir}...${NC}"
    mkdir -p $backup_dir
    
    # 备份PM2配置
    pm2 save
    cp ~/.pm2/dump.pm2 $backup_dir/
    
    # 备份项目配置
    cp ecosystem*.config.js $backup_dir/ 2>/dev/null || true
    cp backend/.env $backup_dir/backend.env 2>/dev/null || true
    
    echo -e "${GREEN}✅ 配置备份完成！${NC}"
}

# 恢复配置
restore_config() {
    local backup_file=${3:-"latest"}
    echo -e "${YELLOW}🔄 恢复配置...${NC}"
    
    if [ "$backup_file" = "latest" ]; then
        backup_file=$(ls -t backups/ | head -n1)
    fi
    
    if [ -f "backups/$backup_file/dump.pm2" ]; then
        cp "backups/$backup_file/dump.pm2" ~/.pm2/
        pm2 resurrect
        echo -e "${GREEN}✅ 配置恢复完成！${NC}"
    else
        echo -e "${RED}❌ 备份文件不存在！${NC}"
        exit 1
    fi
}

# 健康检查
health_check() {
    echo -e "${BLUE}🏥 执行健康检查...${NC}"
    
    # 检查PM2状态
    if pm2 status | grep -q "online"; then
        echo -e "${GREEN}✅ PM2 进程正常${NC}"
    else
        echo -e "${RED}❌ PM2 进程异常${NC}"
    fi
    
    # 检查端口
    if netstat -tulpn | grep -q ":3000"; then
        echo -e "${GREEN}✅ 端口 3000 正常监听${NC}"
    else
        echo -e "${RED}❌ 端口 3000 未监听${NC}"
    fi
    
    # 检查内存使用
    local memory_usage=$(pm2 show sales-backend-main 2>/dev/null | grep "memory usage" | awk '{print $3}' || echo "0")
    echo -e "${BLUE}💾 内存使用: ${memory_usage}${NC}"
    
    # 检查日志错误
    local error_count=$(pm2 logs sales-backend-main --err --lines 100 2>/dev/null | grep -i error | wc -l || echo "0")
    if [ "$error_count" -gt 0 ]; then
        echo -e "${YELLOW}⚠️  发现 ${error_count} 个错误日志${NC}"
    else
        echo -e "${GREEN}✅ 无错误日志${NC}"
    fi
}

# 清理日志
cleanup_logs() {
    echo -e "${YELLOW}🧹 清理日志文件...${NC}"
    
    # 清理PM2日志
    pm2 flush
    
    # 清理应用日志
    find logs/ -name "*.log" -mtime +7 -delete 2>/dev/null || true
    find /var/log/sales-tools/ -name "*.log" -mtime +7 -delete 2>/dev/null || true
    
    echo -e "${GREEN}✅ 日志清理完成！${NC}"
}

# 主逻辑
case $COMMAND in
    start)
        start_app
        ;;
    stop)
        stop_app
        ;;
    restart)
        restart_app
        ;;
    reload)
        reload_app
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    monitor)
        show_monitor
        ;;
    scale)
        scale_app $@
        ;;
    deploy)
        deploy_app
        ;;
    backup)
        backup_config
        ;;
    restore)
        restore_config $@
        ;;
    health)
        health_check
        ;;
    cleanup)
        cleanup_logs
        ;;
    help|*)
        show_help
        ;;
esac