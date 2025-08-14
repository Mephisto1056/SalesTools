@echo off
setlocal enabledelayedexpansion

REM Sales Tools 项目启动脚本 (Windows 版本)
REM 用于同时启动前端和后端服务

title Sales Tools Startup Script

echo 🚀 Sales Tools 项目启动脚本
echo ================================

REM 检查参数
if "%1"=="--help" goto :show_help
if "%1"=="-h" goto :show_help
if "%1"=="--install-only" goto :install_only
if "%1"=="--frontend-only" goto :frontend_only
if "%1"=="--backend-only" goto :backend_only
if "%1"=="--python-only" goto :python_only
if "%1"=="--no-install" goto :no_install

REM 默认流程：安装依赖并启动所有服务
call :check_dependencies
if errorlevel 1 exit /b 1

call :install_all_deps
if errorlevel 1 exit /b 1

call :check_env_files
call :start_services
goto :eof

:check_dependencies
echo [INFO] 检查系统依赖...

REM 检查 Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js 未安装，请先安装 Node.js ^>= 16.0.0
    exit /b 1
)

REM 检查 npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm 未安装，请先安装 npm
    exit /b 1
)

REM 检查 Python
python --version >nul 2>&1
if errorlevel 1 (
    python3 --version >nul 2>&1
    if errorlevel 1 (
        echo [ERROR] Python 未安装，请先安装 Python ^>= 3.8
        exit /b 1
    )
)

REM 检查 pip
pip --version >nul 2>&1
if errorlevel 1 (
    pip3 --version >nul 2>&1
    if errorlevel 1 (
        echo [ERROR] pip 未安装，请先安装 pip
        exit /b 1
    )
)

echo [SUCCESS] 系统依赖检查完成
goto :eof

:install_all_deps
call :install_frontend_deps
if errorlevel 1 exit /b 1

call :install_backend_deps
if errorlevel 1 exit /b 1

call :install_python_deps
if errorlevel 1 exit /b 1

goto :eof

:install_frontend_deps
echo [INFO] 安装前端依赖...
cd frontend

if not exist "node_modules" (
    npm install
    if errorlevel 1 (
        echo [ERROR] 前端依赖安装失败
        cd ..
        exit /b 1
    )
    echo [SUCCESS] 前端依赖安装完成
) else (
    echo [INFO] 前端依赖已存在，跳过安装
)

cd ..
goto :eof

:install_backend_deps
echo [INFO] 安装 Express 后端依赖...
cd backend

if not exist "node_modules" (
    npm install
    if errorlevel 1 (
        echo [ERROR] Express 后端依赖安装失败
        cd ..
        exit /b 1
    )
    echo [SUCCESS] Express 后端依赖安装完成
) else (
    echo [INFO] Express 后端依赖已存在，跳过安装
)

cd ..
goto :eof

:install_python_deps
echo [INFO] 安装 Python 后端依赖...
cd back-python

REM 检查虚拟环境
if not exist "venv" (
    echo [INFO] 创建 Python 虚拟环境...
    python -m venv venv
    if errorlevel 1 (
        python3 -m venv venv
        if errorlevel 1 (
            echo [ERROR] 创建虚拟环境失败
            cd ..
            exit /b 1
        )
    )
)

REM 激活虚拟环境并安装依赖
call venv\Scripts\activate.bat
pip install -r requirements.txt
if errorlevel 1 (
    echo [ERROR] Python 后端依赖安装失败
    cd ..
    exit /b 1
)

echo [SUCCESS] Python 后端依赖安装完成
cd ..
goto :eof

:check_env_files
echo [INFO] 检查环境配置文件...

REM 前端环境文件
if not exist "frontend\.env" (
    if exist "frontend\.env.example" (
        copy "frontend\.env.example" "frontend\.env" >nul
        echo [WARNING] 已创建 frontend\.env，请根据需要修改配置
    )
)

REM Express 后端环境文件
if not exist "backend\.env" (
    if exist "backend\.env.example" (
        copy "backend\.env.example" "backend\.env" >nul
        echo [WARNING] 已创建 backend\.env，请根据需要修改配置
    )
)

REM Python 后端环境文件
if not exist "back-python\.env" (
    if exist "back-python\.env.example" (
        copy "back-python\.env.example" "back-python\.env" >nul
        echo [WARNING] 已创建 back-python\.env，请根据需要修改配置
    )
)

echo [SUCCESS] 环境配置文件检查完成
goto :eof

:start_services
echo [INFO] 启动所有服务...

REM 创建日志目录
if not exist "logs" mkdir logs

REM 启动 Express 后端
echo [INFO] 启动 Express 后端服务 (端口: 3000)...
cd backend
start /b cmd /c "npm run dev > ..\logs\backend.log 2>&1"
cd ..

REM 等待后端启动
timeout /t 3 /nobreak >nul

REM 启动 Python 后端
echo [INFO] 启动 Python 后端服务 (端口: 8000)...
cd back-python
start /b cmd /c "venv\Scripts\activate.bat && python app.py > ..\logs\python-backend.log 2>&1"
cd ..

REM 等待 Python 后端启动
timeout /t 3 /nobreak >nul

REM 启动前端
echo [INFO] 启动前端服务 (端口: 5173)...
cd frontend
start /b cmd /c "npm run dev > ..\logs\frontend.log 2>&1"
cd ..

echo [SUCCESS] 所有服务启动完成！
echo.
echo 服务访问地址：
echo   前端应用: http://localhost:5173
echo   Express API: http://localhost:3000
echo   Python API: http://localhost:8000
echo   Python API 文档: http://localhost:8000/api/v1/docs
echo.
echo 日志文件位置：
echo   前端日志: logs\frontend.log
echo   Express 后端日志: logs\backend.log
echo   Python 后端日志: logs\python-backend.log
echo.
echo 按任意键停止所有服务...
pause >nul

REM 停止所有服务
echo [INFO] 正在停止所有服务...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im python.exe >nul 2>&1
echo [SUCCESS] 所有服务已停止
goto :eof

:install_only
call :check_dependencies
if errorlevel 1 exit /b 1

call :install_all_deps
if errorlevel 1 exit /b 1

call :check_env_files
echo [SUCCESS] 所有依赖安装完成！
goto :eof

:frontend_only
cd frontend
npm run dev
goto :eof

:backend_only
cd backend
npm run dev
goto :eof

:python_only
cd back-python
call venv\Scripts\activate.bat
python app.py
goto :eof

:no_install
call :check_env_files
call :start_services
goto :eof

:show_help
echo Sales Tools 项目启动脚本 (Windows 版本)
echo.
echo 用法: %0 [选项]
echo.
echo 选项:
echo   --help, -h          显示帮助信息
echo   --install-only      仅安装依赖，不启动服务
echo   --frontend-only     仅启动前端服务
echo   --backend-only      仅启动 Express 后端服务
echo   --python-only       仅启动 Python 后端服务
echo   --no-install        跳过依赖安装，直接启动服务
echo.
echo 示例:
echo   %0                  安装依赖并启动所有服务
echo   %0 --install-only   仅安装所有依赖
echo   %0 --frontend-only  仅启动前端服务
echo   %0 --no-install     跳过依赖安装，直接启动服务
goto :eof