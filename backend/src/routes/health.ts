import { Router, Request, Response } from 'express'
import { asyncHandler } from '@/middlewares/errorHandler'

const router = Router()

// 健康检查
router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  }

  res.status(200).json({
    code: 200,
    message: 'Health check successful',
    data: healthCheck
  })
}))

// 详细健康检查
router.get('/detailed', asyncHandler(async (_req: Request, res: Response) => {
  const memoryUsage = process.memoryUsage()
  
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`
    },
    cpu: process.cpuUsage(),
    platform: process.platform,
    nodeVersion: process.version
  }

  res.status(200).json({
    code: 200,
    message: 'Detailed health check successful',
    data: healthCheck
  })
}))

export default router