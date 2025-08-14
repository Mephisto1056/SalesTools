import { Request, Response, NextFunction } from 'express'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

// 清理过期记录
const cleanupExpiredRecords = () => {
  const now = Date.now()
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  })
}

// 每分钟清理一次过期记录
setInterval(cleanupExpiredRecords, 60000)

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const windowMs = 15 * 60 * 1000 // 15分钟
  const maxRequests = 100 // 最大请求数
  
  // 获取客户端IP
  const clientIP = req.ip || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress || 
    'unknown'
  
  const now = Date.now()
  const key = `${clientIP}`
  
  // 初始化或重置计数器
  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs
    }
  } else {
    store[key].count++
  }
  
  // 设置响应头
  res.set({
    'X-RateLimit-Limit': maxRequests.toString(),
    'X-RateLimit-Remaining': Math.max(0, maxRequests - store[key].count).toString(),
    'X-RateLimit-Reset': new Date(store[key].resetTime).toISOString()
  })
  
  // 检查是否超过限制
  if (store[key].count > maxRequests) {
    res.status(429).json({
      code: 429,
      message: 'Too many requests, please try again later.',
      retryAfter: Math.ceil((store[key].resetTime - now) / 1000)
    })
    return
  }
  
  next()
}

// 创建自定义速率限制器
export const createRateLimiter = (windowMs: number, maxRequests: number) => {
  const customStore: RateLimitStore = {}
  
  return (req: Request, res: Response, next: NextFunction): void => {
    const clientIP = req.ip || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress || 
      'unknown'
    
    const now = Date.now()
    const key = `${clientIP}`
    
    if (!customStore[key] || customStore[key].resetTime < now) {
      customStore[key] = {
        count: 1,
        resetTime: now + windowMs
      }
    } else {
      customStore[key].count++
    }
    
    res.set({
      'X-RateLimit-Limit': maxRequests.toString(),
      'X-RateLimit-Remaining': Math.max(0, maxRequests - customStore[key].count).toString(),
      'X-RateLimit-Reset': new Date(customStore[key].resetTime).toISOString()
    })
    
    if (customStore[key].count > maxRequests) {
      res.status(429).json({
        code: 429,
        message: 'Too many requests, please try again later.',
        retryAfter: Math.ceil((customStore[key].resetTime - now) / 1000)
      })
      return
    }
    
    next()
  }
}

// 登录专用速率限制器 (更严格)
export const loginRateLimiter = createRateLimiter(15 * 60 * 1000, 5) // 15分钟内最多5次登录尝试