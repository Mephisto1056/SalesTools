import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { asyncHandler, AppError } from '@/middlewares/errorHandler'
import { authMiddleware } from '@/middlewares/auth'
import fs from 'fs'
import path from 'path'

const router = Router()

// 数据文件路径
const DATA_DIR = path.join(process.cwd(), 'data')
const LINKS_FILE = path.join(DATA_DIR, 'assessment-links.json')
const RESULTS_FILE = path.join(DATA_DIR, 'assessment-results.json')

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// 确保数据文件存在
if (!fs.existsSync(LINKS_FILE)) {
  fs.writeFileSync(LINKS_FILE, '[]', 'utf8')
}

if (!fs.existsSync(RESULTS_FILE)) {
  fs.writeFileSync(RESULTS_FILE, '[]', 'utf8')
}

// 从文件加载数据
const loadData = (filePath: string, defaultValue: any[] = []) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error(`加载数据文件失败: ${filePath}`, error)
  }
  return defaultValue
}

// 保存数据到文件
const saveData = (filePath: string, data: any[]) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
    console.log(`数据已保存到: ${filePath}, 记录数: ${data.length}`)
  } catch (error) {
    console.error(`保存数据文件失败: ${filePath}`, error)
    throw error
  }
}

// 持久化数据存储
let assessmentLinks: any[] = loadData(LINKS_FILE)
let assessmentResults: any[] = loadData(RESULTS_FILE)

console.log(`📊 数据加载完成:`)
console.log(`  - 评估链接: ${assessmentLinks.length} 个`)
console.log(`  - 评估结果: ${assessmentResults.length} 条`)
console.log(`  - 链接文件: ${LINKS_FILE}`)
console.log(`  - 结果文件: ${RESULTS_FILE}`)

// 管理员权限检查中间件
const adminMiddleware = (req: any, _res: Response, next: any) => {
  if (!req.user || req.user.role !== 'admin') {
    throw new AppError('需要管理员权限', 403)
  }
  next()
}

// 生成评估链接
router.post('/assessment-links', authMiddleware, adminMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body

  if (!name) {
    throw new AppError('链接名称不能为空', 400)
  }

  const linkId = uuidv4()
  
  // 处理多个前端URL，优先使用服务器地址
  const frontendUrls = process.env.FRONTEND_URL || 'http://localhost:5173'
  const urlList = frontendUrls.split(',').map(url => url.trim())
  
  // 优先选择服务器地址（包含IP地址的URL）
  const serverUrl = urlList.find(url =>
    url.includes('101.132.237.40') ||
    url.match(/\d+\.\d+\.\d+\.\d+/) // 匹配任何IP地址格式
  )
  
  const baseUrl = serverUrl || urlList[0] // 如果没有找到服务器地址，使用第一个URL
  const assessmentUrl = `${baseUrl}/self-test?linkId=${linkId}`

  const newLink = {
    id: linkId,
    name,
    description: description || '',
    url: assessmentUrl,
    createdAt: new Date().toISOString(),
    visits: 0,
    completions: 0,
    isActive: true
  }

  assessmentLinks.push(newLink)
  saveData(LINKS_FILE, assessmentLinks) // 保存到文件

  res.status(200).json({
    code: 200,
    message: '评估链接生成成功',
    data: newLink
  })
}))

// 获取统计数据
router.get('/stats', authMiddleware, adminMiddleware, asyncHandler(async (_req: Request, res: Response) => {
  // 计算基础统计
  const totalParticipants = assessmentResults.length
  const completedAssessments = assessmentResults.filter(r => r.isCompleted).length
  const activeLinks = assessmentLinks.filter(l => l.isActive).length
  
  // 计算本周新增参与者
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const newParticipants = assessmentResults.filter(r => 
    new Date(r.createdAt) > oneWeekAgo
  ).length

  // 计算平均分
  const completedResults = assessmentResults.filter(r => r.isCompleted)
  const averageScore = completedResults.length > 0 
    ? Math.round(completedResults.reduce((sum, r) => sum + r.totalScore, 0) / completedResults.length)
    : 0

  // 计算各维度平均分
  const dimensionStats = [
    { name: 'Trust（信任建设）', average: 0, class: 'trust' },
    { name: 'Connect（深度连接）', average: 0, class: 'connect' },
    { name: 'Enable（精准赋能）', average: 0, class: 'enable' },
    { name: 'Develop（持续发展）', average: 0, class: 'develop' }
  ]

  if (completedResults.length > 0) {
    dimensionStats[0].average = Math.round(
      completedResults.reduce((sum, r) => sum + r.dimensionScores.trust, 0) / completedResults.length
    )
    dimensionStats[1].average = Math.round(
      completedResults.reduce((sum, r) => sum + r.dimensionScores.connect, 0) / completedResults.length
    )
    dimensionStats[2].average = Math.round(
      completedResults.reduce((sum, r) => sum + r.dimensionScores.enable, 0) / completedResults.length
    )
    dimensionStats[3].average = Math.round(
      completedResults.reduce((sum, r) => sum + r.dimensionScores.develop, 0) / completedResults.length
    )
  }

  // 计算分数分布
  const scoreDistribution = [
    { label: '优秀 (160-200分)', count: 0 },
    { label: '良好 (120-159分)', count: 0 },
    { label: '中等 (80-119分)', count: 0 },
    { label: '待提升 (40-79分)', count: 0 },
    { label: '需改进 (0-39分)', count: 0 }
  ]

  completedResults.forEach(result => {
    const score = result.totalScore
    if (score >= 160) scoreDistribution[0].count++
    else if (score >= 120) scoreDistribution[1].count++
    else if (score >= 80) scoreDistribution[2].count++
    else if (score >= 40) scoreDistribution[3].count++
    else scoreDistribution[4].count++
  })

  // 获取所有评估记录（用于统计和筛选）
  const allAssessments = completedResults
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(result => {
      const link = assessmentLinks.find(l => l.id === result.linkId)
      return {
        id: result.id,
        createdAt: result.createdAt,
        totalScore: result.totalScore,
        dimensionScores: result.dimensionScores,
        linkId: result.linkId,
        linkName: link ? link.name : '直接访问'
      }
    })

  res.status(200).json({
    code: 200,
    message: '获取统计数据成功',
    data: {
      stats: {
        totalParticipants,
        newParticipants,
        completedAssessments,
        averageScore,
        activeLinks,
        totalLinks: assessmentLinks.length
      },
      dimensionStats,
      scoreDistribution,
      recentAssessments: allAssessments
    }
  })
}))

// 获取所有评估链接
router.get('/assessment-links', authMiddleware, adminMiddleware, asyncHandler(async (_req: Request, res: Response) => {
  const links = assessmentLinks.map(link => ({
    ...link,
    completions: assessmentResults.filter(r => r.linkId === link.id && r.isCompleted).length
  }))

  res.status(200).json({
    code: 200,
    message: '获取评估链接成功',
    data: links
  })
}))

// 停用评估链接
router.put('/assessment-links/:id/deactivate', authMiddleware, adminMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const link = assessmentLinks.find(l => l.id === id)

  if (!link) {
    throw new AppError('评估链接不存在', 404)
  }

  link.isActive = false
  saveData(LINKS_FILE, assessmentLinks) // 保存到文件

  res.status(200).json({
    code: 200,
    message: '评估链接已停用',
    data: link
  })
}))

// 记录评估结果 (供前端调用)
router.post('/assessment-results', asyncHandler(async (req: Request, res: Response) => {
  const { linkId, scores, totalScore, dimensionScores, analysis } = req.body

  // 验证数据
  if (!totalScore || !dimensionScores) {
    throw new AppError('评估数据不完整', 400)
  }

  // 记录访问
  if (linkId) {
    const link = assessmentLinks.find(l => l.id === linkId)
    if (link) {
      link.visits = (link.visits || 0) + 1
      saveData(LINKS_FILE, assessmentLinks) // 保存访问统计
    }
  }

  const result = {
    id: uuidv4(),
    linkId: linkId || null,
    scores,
    totalScore,
    dimensionScores,
    analysis,
    isCompleted: true,
    createdAt: new Date().toISOString(),
    // 不存储任何个人信息，保持匿名
  }

  assessmentResults.push(result)
  saveData(RESULTS_FILE, assessmentResults) // 保存到文件

  res.status(200).json({
    code: 200,
    message: '评估结果已记录',
    data: {
      id: result.id,
      timestamp: result.createdAt
    }
  })
}))

// 导出评估数据 (CSV格式)
router.get('/export/assessments', authMiddleware, adminMiddleware, asyncHandler(async (_req: Request, res: Response) => {
  const completedResults = assessmentResults.filter(r => r.isCompleted)
  
  // 生成CSV内容
  const csvHeader = 'ID,评估时间,总分,Trust得分,Connect得分,Enable得分,Develop得分,来源链接\n'
  const csvRows = completedResults.map(result => {
    const link = assessmentLinks.find(l => l.id === result.linkId)
    return [
      result.id,
      result.createdAt,
      result.totalScore,
      result.dimensionScores.trust,
      result.dimensionScores.connect,
      result.dimensionScores.enable,
      result.dimensionScores.develop,
      link ? link.name : '直接访问'
    ].join(',')
  }).join('\n')

  const csvContent = csvHeader + csvRows

  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename=assessment-results.csv')
  res.status(200).send('\uFEFF' + csvContent) // 添加BOM以支持中文
}))

// 记录链接访问 (供前端调用)
router.post('/link-visit', asyncHandler(async (req: Request, res: Response) => {
  const { linkId } = req.body

  if (!linkId) {
    return res.status(200).json({
      code: 200,
      message: '无链接ID，跳过访问记录'
    })
  }

  // 查找并更新链接访问次数
  const link = assessmentLinks.find(l => l.id === linkId)
  if (link) {
    link.visits = (link.visits || 0) + 1
    saveData(LINKS_FILE, assessmentLinks) // 保存访问统计
    
    console.log(`链接 ${link.name} 访问次数更新为: ${link.visits}`)
  }

  return res.status(200).json({
    code: 200,
    message: '访问记录成功',
    data: {
      linkId,
      visits: link ? link.visits : 0
    }
  })
}))

export default router