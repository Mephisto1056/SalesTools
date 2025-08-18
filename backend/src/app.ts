import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import dotenv from 'dotenv'

import { errorHandler } from '@/middlewares/errorHandler'
import { notFoundHandler } from '@/middlewares/notFoundHandler'
import { rateLimiter } from '@/middlewares/rateLimiter'
import authRoutes from '@/routes/auth'
import userRoutes from '@/routes/user'
import healthRoutes from '@/routes/health'
import competitiveAnalysisRoutes from '@/routes/competitiveAnalysis'
import selfTestRoutes from '@/routes/selfTest'
import adminRoutes from '@/routes/admin'

// 加载环境变量
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// 基础中间件
app.use(helmet()) // 安全头
app.use(compression()) // 响应压缩
app.use(morgan('combined')) // 日志记录
app.use(express.json({ limit: '10mb' })) // JSON 解析
app.use(express.urlencoded({ extended: true, limit: '10mb' })) // URL 编码解析

// CORS 配置
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// 速率限制
app.use(rateLimiter)

// 健康检查路由
app.use('/health', healthRoutes)

// API 路由
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/competitive-analysis', competitiveAnalysisRoutes)
app.use('/api/self-test', selfTestRoutes)
app.use('/api/admin', adminRoutes)

// 404 处理
app.use(notFoundHandler)

// 错误处理
app.use(errorHandler)

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`)
})

export default app