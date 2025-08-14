"""
日志配置管理
"""

import sys
from pathlib import Path
from loguru import logger
from app.core.config import settings, LOG_DIR


def setup_logging():
    """设置日志配置"""
    
    # 移除默认的日志处理器
    logger.remove()
    
    # 控制台日志格式
    console_format = (
        "<green>{time:YYYY-MM-DD HH:mm:ss}</green> | "
        "<level>{level: <8}</level> | "
        "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> | "
        "<level>{message}</level>"
    )
    
    # 文件日志格式
    file_format = (
        "{time:YYYY-MM-DD HH:mm:ss} | "
        "{level: <8} | "
        "{name}:{function}:{line} | "
        "{message}"
    )
    
    # 添加控制台日志处理器
    logger.add(
        sys.stdout,
        format=console_format,
        level=settings.LOG_LEVEL,
        colorize=True,
        backtrace=True,
        diagnose=True
    )
    
    # 添加文件日志处理器 (所有级别)
    logger.add(
        LOG_DIR / "app.log",
        format=file_format,
        level="DEBUG",
        rotation="10 MB",
        retention="30 days",
        compression="zip",
        backtrace=True,
        diagnose=True
    )
    
    # 添加错误日志处理器
    logger.add(
        LOG_DIR / "error.log",
        format=file_format,
        level="ERROR",
        rotation="10 MB",
        retention="30 days",
        compression="zip",
        backtrace=True,
        diagnose=True
    )
    
    # 在生产环境中，可以添加更多的日志处理器
    if settings.ENVIRONMENT == "production":
        # 添加 JSON 格式的日志文件
        logger.add(
            LOG_DIR / "app.json",
            format="{time} | {level} | {name}:{function}:{line} | {message}",
            level="INFO",
            rotation="50 MB",
            retention="60 days",
            compression="zip",
            serialize=True  # JSON 格式
        )
    
    # 设置第三方库的日志级别
    import logging
    
    # 设置 uvicorn 日志级别
    logging.getLogger("uvicorn").setLevel(logging.WARNING)
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    
    # 设置 SQLAlchemy 日志级别
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
    
    logger.info("📝 Logging system initialized")


def get_logger(name: str = None):
    """获取日志记录器"""
    if name:
        return logger.bind(name=name)
    return logger


# 创建不同用途的日志记录器
api_logger = get_logger("api")
db_logger = get_logger("database")
auth_logger = get_logger("auth")
task_logger = get_logger("task")