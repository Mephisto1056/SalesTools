"""
数据处理端点
"""

from typing import List, Dict, Any, Optional
from datetime import datetime
from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from pydantic import BaseModel
import json
import csv
import io
from loguru import logger

router = APIRouter()


class DataProcessingRequest(BaseModel):
    """数据处理请求模型"""
    data: List[Dict[str, Any]]
    operations: List[str]
    options: Optional[Dict[str, Any]] = None


class DataProcessingResponse(BaseModel):
    """数据处理响应模型"""
    original_count: int
    processed_count: int
    operations_applied: List[str]
    processing_time: float
    data: List[Dict[str, Any]]
    summary: Dict[str, Any]


class DataValidationRequest(BaseModel):
    """数据验证请求模型"""
    data: List[Dict[str, Any]]
    schema: Dict[str, Any]


class DataValidationResponse(BaseModel):
    """数据验证响应模型"""
    is_valid: bool
    total_records: int
    valid_records: int
    invalid_records: int
    errors: List[Dict[str, Any]]


@router.post("/process", response_model=DataProcessingResponse)
async def process_data(request: DataProcessingRequest):
    """处理数据"""
    
    start_time = datetime.now()
    logger.info(f"Processing {len(request.data)} records with operations: {request.operations}")
    
    processed_data = request.data.copy()
    original_count = len(processed_data)
    
    # 应用数据处理操作
    for operation in request.operations:
        if operation == "remove_duplicates":
            # 去重
            seen = set()
            unique_data = []
            for item in processed_data:
                item_str = json.dumps(item, sort_keys=True)
                if item_str not in seen:
                    seen.add(item_str)
                    unique_data.append(item)
            processed_data = unique_data
            
        elif operation == "remove_nulls":
            # 移除包含空值的记录
            processed_data = [
                item for item in processed_data 
                if not any(v is None or v == "" for v in item.values())
            ]
            
        elif operation == "normalize_text":
            # 文本标准化
            for item in processed_data:
                for key, value in item.items():
                    if isinstance(value, str):
                        item[key] = value.strip().lower()
                        
        elif operation == "convert_numbers":
            # 数字转换
            for item in processed_data:
                for key, value in item.items():
                    if isinstance(value, str) and value.replace('.', '').replace('-', '').isdigit():
                        try:
                            item[key] = float(value) if '.' in value else int(value)
                        except ValueError:
                            pass
                            
        elif operation == "add_timestamp":
            # 添加时间戳
            for item in processed_data:
                item["processed_at"] = datetime.now().isoformat()
                
        elif operation == "sort_by_date":
            # 按日期排序
            date_fields = ["date", "created_at", "updated_at", "timestamp"]
            sort_field = None
            
            for field in date_fields:
                if field in processed_data[0] if processed_data else {}:
                    sort_field = field
                    break
                    
            if sort_field:
                processed_data.sort(key=lambda x: x.get(sort_field, ""))
    
    # 计算处理时间
    processing_time = (datetime.now() - start_time).total_seconds()
    
    # 生成摘要
    summary = {
        "records_removed": original_count - len(processed_data),
        "operations_count": len(request.operations),
        "processing_time_ms": round(processing_time * 1000, 2)
    }
    
    # 如果有数值字段，计算统计信息
    if processed_data:
        numeric_fields = []
        for key, value in processed_data[0].items():
            if isinstance(value, (int, float)):
                numeric_fields.append(key)
        
        for field in numeric_fields:
            values = [item[field] for item in processed_data if field in item]
            if values:
                summary[f"{field}_stats"] = {
                    "min": min(values),
                    "max": max(values),
                    "avg": sum(values) / len(values),
                    "count": len(values)
                }
    
    return DataProcessingResponse(
        original_count=original_count,
        processed_count=len(processed_data),
        operations_applied=request.operations,
        processing_time=processing_time,
        data=processed_data,
        summary=summary
    )


@router.post("/validate", response_model=DataValidationResponse)
async def validate_data(request: DataValidationRequest):
    """验证数据"""
    
    logger.info(f"Validating {len(request.data)} records")
    
    errors = []
    valid_count = 0
    
    for i, record in enumerate(request.data):
        record_errors = []
        
        # 检查必需字段
        required_fields = request.schema.get("required", [])
        for field in required_fields:
            if field not in record or record[field] is None or record[field] == "":
                record_errors.append({
                    "field": field,
                    "error": "Required field is missing or empty",
                    "value": record.get(field)
                })
        
        # 检查字段类型
        field_types = request.schema.get("types", {})
        for field, expected_type in field_types.items():
            if field in record and record[field] is not None:
                value = record[field]
                
                if expected_type == "string" and not isinstance(value, str):
                    record_errors.append({
                        "field": field,
                        "error": f"Expected string, got {type(value).__name__}",
                        "value": value
                    })
                elif expected_type == "number" and not isinstance(value, (int, float)):
                    record_errors.append({
                        "field": field,
                        "error": f"Expected number, got {type(value).__name__}",
                        "value": value
                    })
                elif expected_type == "boolean" and not isinstance(value, bool):
                    record_errors.append({
                        "field": field,
                        "error": f"Expected boolean, got {type(value).__name__}",
                        "value": value
                    })
        
        # 检查值范围
        ranges = request.schema.get("ranges", {})
        for field, range_config in ranges.items():
            if field in record and isinstance(record[field], (int, float)):
                value = record[field]
                min_val = range_config.get("min")
                max_val = range_config.get("max")
                
                if min_val is not None and value < min_val:
                    record_errors.append({
                        "field": field,
                        "error": f"Value {value} is below minimum {min_val}",
                        "value": value
                    })
                
                if max_val is not None and value > max_val:
                    record_errors.append({
                        "field": field,
                        "error": f"Value {value} is above maximum {max_val}",
                        "value": value
                    })
        
        if record_errors:
            errors.append({
                "record_index": i,
                "errors": record_errors
            })
        else:
            valid_count += 1
    
    return DataValidationResponse(
        is_valid=len(errors) == 0,
        total_records=len(request.data),
        valid_records=valid_count,
        invalid_records=len(errors),
        errors=errors
    )


@router.post("/upload-csv")
async def upload_csv_file(
    file: UploadFile = File(...),
    delimiter: str = Query(",", description="CSV分隔符"),
    encoding: str = Query("utf-8", description="文件编码")
):
    """上传并解析CSV文件"""
    
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="File must be a CSV file")
    
    logger.info(f"Processing CSV file: {file.filename}")
    
    try:
        # 读取文件内容
        content = await file.read()
        
        # 解码内容
        try:
            text_content = content.decode(encoding)
        except UnicodeDecodeError:
            # 如果指定编码失败，尝试其他常见编码
            for fallback_encoding in ['gbk', 'gb2312', 'latin1']:
                try:
                    text_content = content.decode(fallback_encoding)
                    encoding = fallback_encoding
                    break
                except UnicodeDecodeError:
                    continue
            else:
                raise HTTPException(status_code=400, detail="Unable to decode file with any common encoding")
        
        # 解析CSV
        csv_reader = csv.DictReader(io.StringIO(text_content), delimiter=delimiter)
        data = []
        
        for row_num, row in enumerate(csv_reader, 1):
            # 清理数据
            cleaned_row = {}
            for key, value in row.items():
                if key:  # 忽略空的列名
                    cleaned_row[key.strip()] = value.strip() if value else None
            
            if cleaned_row:  # 忽略空行
                cleaned_row["_row_number"] = row_num
                data.append(cleaned_row)
        
        # 分析数据结构
        if data:
            columns = list(data[0].keys())
            columns.remove("_row_number")
            
            # 分析每列的数据类型
            column_types = {}
            for col in columns:
                values = [row[col] for row in data if row[col] is not None]
                if values:
                    # 尝试判断数据类型
                    if all(str(v).replace('.', '').replace('-', '').isdigit() for v in values):
                        column_types[col] = "number"
                    elif all(str(v).lower() in ['true', 'false', '1', '0'] for v in values):
                        column_types[col] = "boolean"
                    else:
                        column_types[col] = "string"
        else:
            columns = []
            column_types = {}
        
        return {
            "filename": file.filename,
            "encoding_used": encoding,
            "delimiter_used": delimiter,
            "total_rows": len(data),
            "columns": columns,
            "column_types": column_types,
            "sample_data": data[:5],  # 返回前5行作为样本
            "data": data
        }
        
    except Exception as e:
        logger.error(f"Error processing CSV file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")


@router.get("/export-csv")
async def export_to_csv(
    data: str = Query(..., description="JSON格式的数据"),
    filename: str = Query("export.csv", description="导出文件名")
):
    """导出数据为CSV格式"""
    
    try:
        # 解析JSON数据
        parsed_data = json.loads(data)
        
        if not isinstance(parsed_data, list) or not parsed_data:
            raise HTTPException(status_code=400, detail="Data must be a non-empty list")
        
        # 创建CSV内容
        output = io.StringIO()
        
        # 获取所有字段名
        fieldnames = set()
        for item in parsed_data:
            if isinstance(item, dict):
                fieldnames.update(item.keys())
        
        fieldnames = sorted(list(fieldnames))
        
        # 写入CSV
        writer = csv.DictWriter(output, fieldnames=fieldnames)
        writer.writeheader()
        
        for item in parsed_data:
            if isinstance(item, dict):
                writer.writerow(item)
        
        csv_content = output.getvalue()
        output.close()
        
        return {
            "filename": filename,
            "content": csv_content,
            "size": len(csv_content),
            "rows": len(parsed_data),
            "columns": len(fieldnames)
        }
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON data")
    except Exception as e:
        logger.error(f"Error exporting CSV: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error exporting data: {str(e)}")


@router.get("/statistics")
async def get_data_statistics(
    data: str = Query(..., description="JSON格式的数据")
):
    """获取数据统计信息"""
    
    try:
        parsed_data = json.loads(data)
        
        if not isinstance(parsed_data, list):
            raise HTTPException(status_code=400, detail="Data must be a list")
        
        if not parsed_data:
            return {"message": "No data provided", "statistics": {}}
        
        # 基础统计
        total_records = len(parsed_data)
        
        # 字段分析
        field_stats = {}
        all_fields = set()
        
        for record in parsed_data:
            if isinstance(record, dict):
                all_fields.update(record.keys())
        
        for field in all_fields:
            values = []
            null_count = 0
            
            for record in parsed_data:
                if isinstance(record, dict):
                    value = record.get(field)
                    if value is None or value == "":
                        null_count += 1
                    else:
                        values.append(value)
            
            field_stat = {
                "total_count": total_records,
                "non_null_count": len(values),
                "null_count": null_count,
                "null_percentage": round((null_count / total_records) * 100, 2)
            }
            
            # 数值字段的额外统计
            numeric_values = []
            for v in values:
                try:
                    numeric_values.append(float(v))
                except (ValueError, TypeError):
                    pass
            
            if numeric_values:
                field_stat.update({
                    "data_type": "numeric",
                    "min": min(numeric_values),
                    "max": max(numeric_values),
                    "mean": sum(numeric_values) / len(numeric_values),
                    "sum": sum(numeric_values)
                })
            else:
                # 文本字段统计
                unique_values = set(str(v) for v in values)
                field_stat.update({
                    "data_type": "text",
                    "unique_count": len(unique_values),
                    "most_common": max(values, key=values.count) if values else None
                })
            
            field_stats[field] = field_stat
        
        return {
            "total_records": total_records,
            "total_fields": len(all_fields),
            "field_statistics": field_stats
        }
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON data")
    except Exception as e:
        logger.error(f"Error calculating statistics: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error calculating statistics: {str(e)}")