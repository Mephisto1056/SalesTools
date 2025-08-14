import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from './errorHandler'

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number
    username: string
    email: string
  }
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    throw new AppError('Access token is required', 401)
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'
    const decoded = jwt.verify(token, jwtSecret) as any
    
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email
    }
    
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Token expired', 401)
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Invalid token', 401)
    } else {
      throw new AppError('Token verification failed', 401)
    }
  }
}

// 可选的认证中间件 (不强制要求token)
export const optionalAuth = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return next()
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'
    const decoded = jwt.verify(token, jwtSecret) as any
    
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email
    }
  } catch (error) {
    // 可选认证失败时不抛出错误，继续执行
    console.warn('Optional auth failed:', error)
  }

  next()
}

// 角色权限检查中间件
export const requireRole = (_roles: string[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('Authentication required', 401)
    }

    // 这里需要从数据库获取用户角色信息
    // 暂时跳过角色检查
    next()
  }
}

// 管理员权限检查
export const requireAdmin = requireRole(['admin'])

// 用户权限检查 (用户只能访问自己的资源)
export const requireOwnership = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    throw new AppError('Authentication required', 401)
  }

  const resourceUserId = req.params.userId || req.body.userId
  
  if (resourceUserId && parseInt(resourceUserId) !== req.user.id) {
    throw new AppError('Access denied: insufficient permissions', 403)
  }

  next()
}