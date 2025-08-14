"""
健康检查端点
"""

from datetime import datetime
from fastapi import APIRouter, Depends
from pydantic import BaseModel
import psutil
import platform
from app.core.config import get_settings, Settings

router = APIRouter()


class HealthResponse(BaseModel):
    """健康检查响应模型"""
    status: str
    timestamp: datetime
    version: str
    environment: str
    uptime: float
    system_info: dict


class DetailedHealthResponse(BaseModel):
    """详细健康检查响应模型"""
    status: str
    timestamp: datetime
    version: str
    environment: str
    uptime: float
    system_info: dict
    memory_usage: dict
    cpu_usage: dict
    disk_usage: dict


@router.get("/", response_model=HealthResponse)
async def health_check(settings: Settings = Depends(get_settings)):
    """基础健康检查"""
    
    # 获取系统信息
    system_info = {
        "platform": platform.system(),
        "platform_release": platform.release(),
        "platform_version": platform.version(),
        "architecture": platform.machine(),
        "hostname": platform.node(),
        "processor": platform.processor(),
        "python_version": platform.python_version()
    }
    
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow(),
        version=settings.VERSION,
        environment=settings.ENVIRONMENT,
        uptime=psutil.boot_time(),
        system_info=system_info
    )


@router.get("/detailed", response_model=DetailedHealthResponse)
async def detailed_health_check(settings: Settings = Depends(get_settings)):
    """详细健康检查"""
    
    # 获取系统信息
    system_info = {
        "platform": platform.system(),
        "platform_release": platform.release(),
        "platform_version": platform.version(),
        "architecture": platform.machine(),
        "hostname": platform.node(),
        "processor": platform.processor(),
        "python_version": platform.python_version()
    }
    
    # 获取内存使用情况
    memory = psutil.virtual_memory()
    memory_usage = {
        "total": f"{memory.total / (1024**3):.2f} GB",
        "available": f"{memory.available / (1024**3):.2f} GB",
        "used": f"{memory.used / (1024**3):.2f} GB",
        "percentage": f"{memory.percent}%"
    }
    
    # 获取CPU使用情况
    cpu_usage = {
        "percentage": f"{psutil.cpu_percent(interval=1)}%",
        "count": psutil.cpu_count(),
        "count_logical": psutil.cpu_count(logical=True)
    }
    
    # 获取磁盘使用情况
    disk = psutil.disk_usage('/')
    disk_usage = {
        "total": f"{disk.total / (1024**3):.2f} GB",
        "used": f"{disk.used / (1024**3):.2f} GB",
        "free": f"{disk.free / (1024**3):.2f} GB",
        "percentage": f"{(disk.used / disk.total) * 100:.1f}%"
    }
    
    return DetailedHealthResponse(
        status="healthy",
        timestamp=datetime.utcnow(),
        version=settings.VERSION,
        environment=settings.ENVIRONMENT,
        uptime=psutil.boot_time(),
        system_info=system_info,
        memory_usage=memory_usage,
        cpu_usage=cpu_usage,
        disk_usage=disk_usage
    )


@router.get("/ping")
async def ping():
    """简单的ping检查"""
    return {"message": "pong", "timestamp": datetime.utcnow()}


@router.get("/ready")
async def readiness_check():
    """就绪检查 - 检查应用是否准备好接收请求"""
    
    # 这里可以添加更多的检查，比如数据库连接、外部服务等
    checks = {
        "database": "ok",  # 实际项目中应该检查数据库连接
        "cache": "ok",     # 实际项目中应该检查缓存连接
        "external_api": "ok"  # 实际项目中应该检查外部API
    }
    
    # 检查是否所有服务都正常
    all_healthy = all(status == "ok" for status in checks.values())
    
    return {
        "status": "ready" if all_healthy else "not_ready",
        "checks": checks,
        "timestamp": datetime.utcnow()
    }


@router.get("/live")
async def liveness_check():
    """存活检查 - 检查应用是否还在运行"""
    return {
        "status": "alive",
        "timestamp": datetime.utcnow()
    }