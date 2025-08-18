import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import { asyncHandler, AppError } from '@/middlewares/errorHandler'
import { loginRateLimiter } from '@/middlewares/rateLimiter'

const router = Router()

// 模拟用户数据 (实际项目中应该使用数据库)
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    email: 'user@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'user'
  }
]

// 生成JWT Token
const generateToken = (user: any): string => {
  const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'
  const jwtExpire = process.env.JWT_EXPIRE || '7d'
  
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    jwtSecret,
    { expiresIn: jwtExpire } as jwt.SignOptions
  )
}

// 登录验证规则
const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
]

// 注册验证规则
const registerValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
]

// 用户登录
router.post('/login', loginRateLimiter, loginValidation, asyncHandler(async (req: Request, res: Response) => {
  // 检查验证错误
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400)
  }

  const { username, password } = req.body

  // 查找用户
  const user = users.find(u => u.username === username || u.email === username)
  if (!user) {
    throw new AppError('Invalid credentials', 401)
  }

  // 验证密码
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401)
  }

  // 生成token
  const token = generateToken(user)

  res.status(200).json({
    code: 200,
    message: 'Login successful',
    data: {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: new Date().toISOString()
      }
    }
  })
}))

// 用户注册
router.post('/register', registerValidation, asyncHandler(async (req: Request, res: Response) => {
  // 检查验证错误
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400)
  }

  const { username, email, password } = req.body

  // 检查用户是否已存在
  const existingUser = users.find(u => u.username === username || u.email === email)
  if (existingUser) {
    throw new AppError('User already exists', 409)
  }

  // 加密密码
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  // 创建新用户
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password: hashedPassword,
    role: 'user' // 默认注册为普通用户
  }

  users.push(newUser)

  // 生成token
  const token = generateToken(newUser)

  res.status(201).json({
    code: 201,
    message: 'Registration successful',
    data: {
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        createdAt: new Date().toISOString()
      }
    }
  })
}))

// 刷新token
router.post('/refresh', asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body

  if (!token) {
    throw new AppError('Refresh token is required', 400)
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'
    const decoded = jwt.verify(token, jwtSecret) as any
    
    // 查找用户
    const user = users.find(u => u.id === decoded.id)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    // 生成新token
    const newToken = generateToken(user)

    res.status(200).json({
      code: 200,
      message: 'Token refreshed successfully',
      data: {
        token: newToken
      }
    })
  } catch (error) {
    throw new AppError('Invalid refresh token', 401)
  }
}))

export default router