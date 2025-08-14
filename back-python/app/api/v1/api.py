"""
API v1 路由汇总
"""

from fastapi import APIRouter
from app.api.v1.endpoints import health, analytics, data

api_router = APIRouter()

# 健康检查路由
api_router.include_router(health.router, prefix="/health", tags=["health"])

# 数据分析路由
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])

# 数据处理路由
api_router.include_router(data.router, prefix="/data", tags=["data"])