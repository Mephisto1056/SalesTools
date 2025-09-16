#!/bin/bash

# 清理测试数据脚本
# 用于正式上线前清理所有测试数据

echo "🧹 开始清理测试数据..."

# 检查是否在正确的目录
if [ ! -d "data" ]; then
    echo "❌ 错误: 请在backend目录下运行此脚本"
    exit 1
fi

# 备份现有数据（可选）
BACKUP_DIR="data_backup_$(date +%Y%m%d_%H%M%S)"
echo "📦 创建数据备份到: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
cp -r data/* "$BACKUP_DIR/" 2>/dev/null || echo "⚠️ 没有找到现有数据文件"

# 清理数据文件
echo "🗑️ 清理数据文件..."
rm -f data/assessment-results.json
rm -f data/assessment-links.json

# 重新初始化空的数据文件
echo "📝 重新初始化数据文件..."
echo "[]" > data/assessment-results.json
echo "[]" > data/assessment-links.json

# 清理可能存在的临时文件
echo "🧽 清理临时文件..."
find data/ -name "*.tmp*" -delete 2>/dev/null || true

# 清理测试相关文件
echo "🧪 清理测试文件..."
rm -f test-concurrent-writes.js

echo "✅ 测试数据清理完成!"
echo "📊 数据统计:"
echo "  - 评估结果: $(cat data/assessment-results.json | jq length 2>/dev/null || echo "0") 条"
echo "  - 评估链接: $(cat data/assessment-links.json | jq length 2>/dev/null || echo "0") 条"
echo "  - 备份位置: $BACKUP_DIR"
echo ""
echo "🚀 现在可以安全地部署到生产环境了!"