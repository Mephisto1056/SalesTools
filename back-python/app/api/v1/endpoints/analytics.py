"""
数据分析端点
"""

from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from fastapi import APIRouter, Query, HTTPException
from pydantic import BaseModel
import random
from loguru import logger

router = APIRouter()


class SalesData(BaseModel):
    """销售数据模型"""
    date: datetime
    amount: float
    product: str
    region: str
    sales_person: str


class AnalyticsRequest(BaseModel):
    """分析请求模型"""
    start_date: datetime
    end_date: datetime
    metrics: List[str]
    filters: Optional[Dict[str, Any]] = None


class AnalyticsResponse(BaseModel):
    """分析响应模型"""
    period: Dict[str, datetime]
    total_sales: float
    total_orders: int
    average_order_value: float
    growth_rate: float
    top_products: List[Dict[str, Any]]
    regional_breakdown: Dict[str, float]
    trends: List[Dict[str, Any]]


class TrendData(BaseModel):
    """趋势数据模型"""
    date: datetime
    value: float
    metric: str


# 模拟销售数据
def generate_mock_sales_data(days: int = 30) -> List[SalesData]:
    """生成模拟销售数据"""
    products = ["产品A", "产品B", "产品C", "产品D", "产品E"]
    regions = ["华北", "华东", "华南", "华中", "西南", "西北", "东北"]
    sales_people = ["张三", "李四", "王五", "赵六", "钱七", "孙八"]
    
    data = []
    base_date = datetime.now() - timedelta(days=days)
    
    for i in range(days * 10):  # 每天大约10条记录
        date = base_date + timedelta(
            days=random.randint(0, days-1),
            hours=random.randint(8, 18),
            minutes=random.randint(0, 59)
        )
        
        data.append(SalesData(
            date=date,
            amount=round(random.uniform(100, 5000), 2),
            product=random.choice(products),
            region=random.choice(regions),
            sales_person=random.choice(sales_people)
        ))
    
    return sorted(data, key=lambda x: x.date)


@router.get("/sales-summary", response_model=AnalyticsResponse)
async def get_sales_summary(
    days: int = Query(30, ge=1, le=365, description="分析天数"),
    region: Optional[str] = Query(None, description="地区筛选")
):
    """获取销售汇总分析"""
    
    logger.info(f"Getting sales summary for {days} days, region: {region}")
    
    # 生成模拟数据
    sales_data = generate_mock_sales_data(days)
    
    # 应用地区筛选
    if region:
        sales_data = [s for s in sales_data if s.region == region]
    
    if not sales_data:
        raise HTTPException(status_code=404, detail="No sales data found")
    
    # 计算基础指标
    total_sales = sum(s.amount for s in sales_data)
    total_orders = len(sales_data)
    average_order_value = total_sales / total_orders if total_orders > 0 else 0
    
    # 计算增长率 (模拟)
    growth_rate = random.uniform(-10, 25)
    
    # 产品排行
    product_sales = {}
    for s in sales_data:
        product_sales[s.product] = product_sales.get(s.product, 0) + s.amount
    
    top_products = [
        {"product": product, "sales": sales, "percentage": (sales/total_sales)*100}
        for product, sales in sorted(product_sales.items(), key=lambda x: x[1], reverse=True)[:5]
    ]
    
    # 地区分布
    regional_sales = {}
    for s in sales_data:
        regional_sales[s.region] = regional_sales.get(s.region, 0) + s.amount
    
    # 趋势数据 (按天汇总)
    daily_sales = {}
    for s in sales_data:
        date_key = s.date.date()
        daily_sales[date_key] = daily_sales.get(date_key, 0) + s.amount
    
    trends = [
        {"date": datetime.combine(date, datetime.min.time()), "value": amount, "metric": "daily_sales"}
        for date, amount in sorted(daily_sales.items())
    ]
    
    return AnalyticsResponse(
        period={
            "start_date": min(s.date for s in sales_data),
            "end_date": max(s.date for s in sales_data)
        },
        total_sales=total_sales,
        total_orders=total_orders,
        average_order_value=round(average_order_value, 2),
        growth_rate=round(growth_rate, 2),
        top_products=top_products,
        regional_breakdown=regional_sales,
        trends=trends
    )


@router.post("/custom-analysis", response_model=Dict[str, Any])
async def custom_analysis(request: AnalyticsRequest):
    """自定义分析"""
    
    logger.info(f"Custom analysis request: {request.metrics}")
    
    # 生成模拟数据
    days = (request.end_date - request.start_date).days
    sales_data = generate_mock_sales_data(days)
    
    # 应用筛选器
    if request.filters:
        for key, value in request.filters.items():
            if key == "region":
                sales_data = [s for s in sales_data if s.region == value]
            elif key == "product":
                sales_data = [s for s in sales_data if s.product == value]
            elif key == "min_amount":
                sales_data = [s for s in sales_data if s.amount >= value]
    
    results = {}
    
    for metric in request.metrics:
        if metric == "total_revenue":
            results[metric] = sum(s.amount for s in sales_data)
        elif metric == "order_count":
            results[metric] = len(sales_data)
        elif metric == "average_order_value":
            total = sum(s.amount for s in sales_data)
            count = len(sales_data)
            results[metric] = total / count if count > 0 else 0
        elif metric == "top_sales_person":
            person_sales = {}
            for s in sales_data:
                person_sales[s.sales_person] = person_sales.get(s.sales_person, 0) + s.amount
            if person_sales:
                results[metric] = max(person_sales.items(), key=lambda x: x[1])
        elif metric == "conversion_rate":
            # 模拟转化率
            results[metric] = random.uniform(0.1, 0.3)
    
    return {
        "period": {
            "start_date": request.start_date,
            "end_date": request.end_date
        },
        "filters_applied": request.filters or {},
        "results": results,
        "data_points": len(sales_data)
    }


@router.get("/trends/{metric}")
async def get_trend_data(
    metric: str,
    days: int = Query(30, ge=1, le=365),
    granularity: str = Query("daily", regex="^(hourly|daily|weekly|monthly)$")
):
    """获取趋势数据"""
    
    logger.info(f"Getting trend data for metric: {metric}, granularity: {granularity}")
    
    # 生成趋势数据
    trends = []
    base_date = datetime.now() - timedelta(days=days)
    
    if granularity == "daily":
        for i in range(days):
            date = base_date + timedelta(days=i)
            value = random.uniform(1000, 10000) + (i * 50)  # 模拟增长趋势
            trends.append({
                "date": date,
                "value": round(value, 2),
                "metric": metric
            })
    elif granularity == "weekly":
        weeks = days // 7
        for i in range(weeks):
            date = base_date + timedelta(weeks=i)
            value = random.uniform(7000, 70000) + (i * 350)
            trends.append({
                "date": date,
                "value": round(value, 2),
                "metric": metric
            })
    
    return {
        "metric": metric,
        "granularity": granularity,
        "period": f"{days} days",
        "data": trends
    }


@router.get("/forecast/{metric}")
async def get_forecast(
    metric: str,
    forecast_days: int = Query(30, ge=1, le=90, description="预测天数")
):
    """获取预测数据"""
    
    logger.info(f"Generating forecast for metric: {metric}, days: {forecast_days}")
    
    # 生成历史数据
    historical_data = []
    base_date = datetime.now() - timedelta(days=30)
    
    for i in range(30):
        date = base_date + timedelta(days=i)
        value = 5000 + (i * 100) + random.uniform(-500, 500)  # 基础趋势 + 随机波动
        historical_data.append({
            "date": date,
            "value": round(value, 2),
            "type": "historical"
        })
    
    # 生成预测数据
    forecast_data = []
    last_value = historical_data[-1]["value"]
    
    for i in range(forecast_days):
        date = datetime.now() + timedelta(days=i+1)
        # 简单的线性预测 + 随机波动
        trend = 100  # 每天增长100
        noise = random.uniform(-200, 200)
        value = last_value + (i * trend) + noise
        
        forecast_data.append({
            "date": date,
            "value": round(value, 2),
            "type": "forecast",
            "confidence": round(max(0.5, 0.9 - (i * 0.01)), 2)  # 置信度随时间递减
        })
    
    return {
        "metric": metric,
        "forecast_period": f"{forecast_days} days",
        "historical_data": historical_data,
        "forecast_data": forecast_data,
        "model_info": {
            "type": "linear_trend",
            "accuracy": "85%",
            "last_updated": datetime.now()
        }
    }