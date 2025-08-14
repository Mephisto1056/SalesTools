"""
Sales Tools Python Backend API
基于 FastAPI 的现代化 Python 后端服务
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn
from loguru import logger
import sys
from pathlib import Path

# 添加项目根目录到 Python 路径
sys.path.append(str(Path(__file__).parent))

from app.core.config import settings
from app.core.logging import setup_logging
from app.api.v1.api import api_router
from app.core.exceptions import setup_exception_handlers


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理"""
    # 启动时执行
    logger.info("🚀 Starting Sales Tools Python API...")
    logger.info(f"📝 Environment: {settings.ENVIRONMENT}")
    logger.info(f"🌐 API Version: {settings.API_V1_STR}")
    
    yield
    
    # 关闭时执行
    logger.info("👋 Shutting down Sales Tools Python API...")


def create_application() -> FastAPI:
    """创建 FastAPI 应用实例"""
    
    # 设置日志
    setup_logging()
    
    # 创建应用
    app = FastAPI(
        title=settings.PROJECT_NAME,
        description="Sales Tools Python Backend API - 提供数据分析和处理服务",
        version=settings.VERSION,
        openapi_url=f"{settings.API_V1_STR}/openapi.json" if settings.ENVIRONMENT != "production" else None,
        docs_url=f"{settings.API_V1_STR}/docs" if settings.ENVIRONMENT != "production" else None,
        redoc_url=f"{settings.API_V1_STR}/redoc" if settings.ENVIRONMENT != "production" else None,
        lifespan=lifespan
    )
    
    # 设置 CORS
    if settings.BACKEND_CORS_ORIGINS:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    
    # 设置可信主机
    if settings.ALLOWED_HOSTS:
        app.add_middleware(
            TrustedHostMiddleware,
            allowed_hosts=settings.ALLOWED_HOSTS
        )
    
    # 设置异常处理器
    setup_exception_handlers(app)
    
    # 注册路由
    app.include_router(api_router, prefix=settings.API_V1_STR)
    
    # 根路径健康检查
    @app.get("/")
    async def root():
        return {
            "message": "Sales Tools Python API",
            "version": settings.VERSION,
            "environment": settings.ENVIRONMENT,
            "docs_url": f"{settings.API_V1_STR}/docs" if settings.ENVIRONMENT != "production" else None
        }
    
    # 健康检查端点
    @app.get("/health")
    async def health_check():
        return {
            "status": "healthy",
            "service": "sales-tools-python-api",
            "version": settings.VERSION,
            "environment": settings.ENVIRONMENT
        }
    
    return app


# 创建应用实例
app = create_application()


if __name__ == "__main__":
    # 直接运行时的配置
    uvicorn.run(
        "app:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.ENVIRONMENT == "development",
        log_level=settings.LOG_LEVEL.lower(),
        access_log=True
    )