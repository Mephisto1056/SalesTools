import { Router, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { asyncHandler, AppError } from '@/middlewares/errorHandler'
import { authenticateToken, AuthenticatedRequest } from '@/middlewares/auth'

const router = Router()

// 模拟用户数据 (实际项目中应该使用数据库)
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    username: 'user',
    email: 'user@example.com',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  }
]

// 获取当前用户信息
router.get('/profile', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = users.find(u => u.id === req.user?.id)
  
  if (!user) {
    throw new AppError('User not found', 404)
  }

  res.status(200).json({
    code: 200,
    message: 'User profile retrieved successfully',
    data: user
  })
}))

// 更新用户信息验证规则
const updateProfileValidation = [
  body('username')
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail()
]

// 更新用户信息
router.put('/profile', authenticateToken, updateProfileValidation, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // 检查验证错误
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400)
  }

  const userIndex = users.findIndex(u => u.id === req.user?.id)
  
  if (userIndex === -1) {
    throw new AppError('User not found', 404)
  }

  const { username, email } = req.body

  // 检查用户名或邮箱是否已被其他用户使用
  if (username || email) {
    const existingUser = users.find(u => 
      u.id !== req.user?.id && 
      (u.username === username || u.email === email)
    )
    
    if (existingUser) {
      throw new AppError('Username or email already exists', 409)
    }
  }

  // 更新用户信息
  if (username) users[userIndex].username = username
  if (email) users[userIndex].email = email
  users[userIndex].updatedAt = new Date().toISOString()

  res.status(200).json({
    code: 200,
    message: 'User profile updated successfully',
    data: users[userIndex]
  })
}))

// 获取所有用户 (管理员功能)
router.get('/list', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // 这里应该检查管理员权限，暂时跳过
  
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 10
  const search = req.query.search as string || ''

  let filteredUsers = users
  
  // 搜索功能
  if (search) {
    filteredUsers = users.filter(user => 
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    )
  }

  // 分页
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  res.status(200).json({
    code: 200,
    message: 'Users retrieved successfully',
    data: {
      users: paginatedUsers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredUsers.length / limit),
        totalUsers: filteredUsers.length,
        hasNext: endIndex < filteredUsers.length,
        hasPrev: startIndex > 0
      }
    }
  })
}))

// 获取指定用户信息
router.get('/:id', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = parseInt(req.params.id)
  
  if (isNaN(userId)) {
    throw new AppError('Invalid user ID', 400)
  }

  const user = users.find(u => u.id === userId)
  
  if (!user) {
    throw new AppError('User not found', 404)
  }

  res.status(200).json({
    code: 200,
    message: 'User retrieved successfully',
    data: user
  })
}))

// 删除用户 (管理员功能)
router.delete('/:id', authenticateToken, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // 这里应该检查管理员权限，暂时跳过
  
  const userId = parseInt(req.params.id)
  
  if (isNaN(userId)) {
    throw new AppError('Invalid user ID', 400)
  }

  const userIndex = users.findIndex(u => u.id === userId)
  
  if (userIndex === -1) {
    throw new AppError('User not found', 404)
  }

  // 不能删除自己
  if (userId === req.user?.id) {
    throw new AppError('Cannot delete your own account', 400)
  }

  users.splice(userIndex, 1)

  res.status(200).json({
    code: 200,
    message: 'User deleted successfully'
  })
}))

export default router