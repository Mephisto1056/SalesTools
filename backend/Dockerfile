# Express 后端 Dockerfile
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装 dumb-init (用于正确处理信号)
RUN apk add --no-cache dumb-init curl

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci && npm cache clean --force

# 复制源代码
COPY . .

# 构建 TypeScript
RUN npm run build

# 创建日志目录
RUN mkdir -p logs && chown -R nodejs:nodejs logs

# 切换到非 root 用户
USER nodejs

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# 启动应用
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]