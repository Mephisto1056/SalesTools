#!/bin/bash

# Sales Tools 项目启动脚本
# 用于同时启动前端和后端服务

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查依赖
check_dependencies() {
    log_info "检查系统依赖..."
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装，请先安装 Node.js >= 16.0.0"
        exit 1
    fi
    
    # 检查 npm
    if ! command -v npm &> /dev/null; then
        log_error "npm 未安装，请先安装 npm"
        exit 1
    fi
    
    # 检查 Python
    if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
        log_error "Python 未安装，请先安装 Python >= 3.8"
        exit 1
    fi
    
    # 检查 pip
    if ! command -v pip3 &> /dev/null && ! command -v pip &> /dev/null; then
        log_error "pip 未安装，请先安装 pip"
        exit 1
    fi
    
    log_success "系统依赖检查完成"
}

# 安装前端依赖
install_frontend_deps() {
    log_info "安装前端依赖..."
    cd frontend
    
    if [ ! -d "node_modules" ]; then
        npm install
        log_success "前端依赖安装完成"
    else
        log_info "前端依赖已存在，跳过安装"
    fi
    
    cd ..
}

# 安装 Express 后端依赖
install_backend_deps() {
    log_info "安装 Express 后端依赖..."
    cd backend
    
    if [ ! -d "node_modules" ]; then
        npm install
        log_success "Express 后端依赖安装完成"
    else
        log_info "Express 后端依赖已存在，跳过安装"
    fi
    
    cd ..
}

# 安装 Python 后端依赖
install_python_deps() {
    log_info "安装 Python 后端依赖..."
    cd back-python
    
    # 检查虚拟环境
    if [ ! -d "venv" ]; then
        log_info "创建 Python 虚拟环境..."
        python3 -m venv venv || python -m venv venv
    fi
    
    # 激活虚拟环境
    source venv/bin/activate || source venv/Scripts/activate
    
    # 安装依赖
    pip install -r requirements.txt
    log_success "Python 后端依赖安装完成"
    
    cd ..
}

# 检查环境配置文件
check_env_files() {
    log_info "检查环境配置文件..."
    
    # 前端环境文件
    if [ ! -f "frontend/.env" ]; then
        if [ -f "frontend/.env.example" ]; then
            cp frontend/.env.example frontend/.env
            log_warning "已创建 frontend/.env，请根据需要修改配置"
        fi
    fi
    
    # Express 后端环境文件
    if [ ! -f "backend/.env" ]; then
        if [ -f "backend/.env.example" ]; then
            cp backend/.env.example backend/.env
            log_warning "已创建 backend/.env，请根据需要修改配置"
        fi
    fi
    
    # Python 后端环境文件
    if [ ! -f "back-python/.env" ]; then
        if [ -f "back-python/.env.example" ]; then
            cp back-python/.env.example back-python/.env
            log_warning "已创建 back-python/.env，请根据需要修改配置"
        fi
    fi
    
    log_success "环境配置文件检查完成"
}

# 启动服务
start_services() {
    log_info "启动所有服务..."
    
    # 创建日志目录
    mkdir -p logs
    
    # 启动 Express 后端
    log_info "启动 Express 后端服务 (端口: 3000)..."
    cd backend
    npm run dev > ../logs/backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    
    # 等待后端启动
    sleep 3
    
    # 启动 Python 后端
    log_info "启动 Python 后端服务 (端口: 8000)..."
    cd back-python
    source venv/bin/activate || source venv/Scripts/activate
    python app.py > ../logs/python-backend.log 2>&1 &
    PYTHON_PID=$!
    cd ..
    
    # 等待 Python 后端启动
    sleep 3
    
    # 启动前端
    log_info "启动前端服务 (端口: 5173)..."
    cd frontend
    npm run dev > ../logs/frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    
    # 保存进程 ID
    echo $BACKEND_PID > logs/backend.pid
    echo $PYTHON_PID > logs/python-backend.pid
    echo $FRONTEND_PID > logs/frontend.pid
    
    log_success "所有服务启动完成！"
    echo ""
    echo "服务访问地址："
    echo "  前端应用: http://localhost:5173"
    echo "  Express API: http://localhost:3000"
    echo "  Python API: http://localhost:8000"
    echo "  Python API 文档: http://localhost:8000/api/v1/docs"
    echo ""
    echo "日志文件位置："
    echo "  前端日志: logs/frontend.log"
    echo "  Express 后端日志: logs/backend.log"
    echo "  Python 后端日志: logs/python-backend.log"
    echo ""
    echo "按 Ctrl+C 停止所有服务"
    
    # 等待用户中断
    trap 'stop_services' INT
    wait
}

# 停止服务
stop_services() {
    log_info "正在停止所有服务..."
    
    if [ -f "logs/frontend.pid" ]; then
        kill $(cat logs/frontend.pid) 2>/dev/null || true
        rm logs/frontend.pid
    fi
    
    if [ -f "logs/backend.pid" ]; then
        kill $(cat logs/backend.pid) 2>/dev/null || true
        rm logs/backend.pid
    fi
    
    if [ -f "logs/python-backend.pid" ]; then
        kill $(cat logs/python-backend.pid) 2>/dev/null || true
        rm logs/python-backend.pid
    fi
    
    log_success "所有服务已停止"
    exit 0
}

# 显示帮助信息
show_help() {
    echo "Sales Tools 项目启动脚本"
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  --help, -h          显示帮助信息"
    echo "  --install-only      仅安装依赖，不启动服务"
    echo "  --frontend-only     仅启动前端服务"
    echo "  --backend-only      仅启动 Express 后端服务"
    echo "  --python-only       仅启动 Python 后端服务"
    echo "  --no-install        跳过依赖安装，直接启动服务"
    echo ""
    echo "示例:"
    echo "  $0                  安装依赖并启动所有服务"
    echo "  $0 --install-only   仅安装所有依赖"
    echo "  $0 --frontend-only  仅启动前端服务"
    echo "  $0 --no-install     跳过依赖安装，直接启动服务"
}

# 主函数
main() {
    echo "🚀 Sales Tools 项目启动脚本"
    echo "================================"
    
    case "${1:-}" in
        --help|-h)
            show_help
            exit 0
            ;;
        --install-only)
            check_dependencies
            install_frontend_deps
            install_backend_deps
            install_python_deps
            check_env_files
            log_success "所有依赖安装完成！"
            exit 0
            ;;
        --frontend-only)
            cd frontend
            npm run dev
            exit 0
            ;;
        --backend-only)
            cd backend
            npm run dev
            exit 0
            ;;
        --python-only)
            cd back-python
            source venv/bin/activate || source venv/Scripts/activate
            python app.py
            exit 0
            ;;
        --no-install)
            check_env_files
            start_services
            ;;
        "")
            check_dependencies
            install_frontend_deps
            install_backend_deps
            install_python_deps
            check_env_files
            start_services
            ;;
        *)
            log_error "未知选项: $1"
            show_help
            exit 1
            ;;
    esac
}

# 运行主函数
main "$@"