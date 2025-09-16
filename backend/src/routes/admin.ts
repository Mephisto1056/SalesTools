import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { asyncHandler, AppError } from '@/middlewares/errorHandler'
import { authMiddleware } from '@/middlewares/auth'
import { dataManager } from '../utils/dataManager'

const router = Router()

console.log('📊 使用数据管理器进行数据操作')

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

  // 使用数据管理器添加新链接
  dataManager.addAssessmentLink(newLink)

  res.status(200).json({
    code: 200,
    message: '评估链接生成成功',
    data: newLink
  })
}))

// 获取统计数据
router.get('/stats', authMiddleware, adminMiddleware, asyncHandler(async (_req: Request, res: Response) => {
  // 使用数据管理器获取最新数据
  const latestAssessmentLinks = dataManager.getAssessmentLinks()
  const latestAssessmentResults = dataManager.getAssessmentResults()
  
  console.log('获取最新数据用于统计:', {
    linksCount: latestAssessmentLinks.length,
    resultsCount: latestAssessmentResults.length
  })
  
  // 计算基础统计
  const totalParticipants = latestAssessmentResults.length
  const completedAssessments = latestAssessmentResults.filter((r: any) => r.isCompleted).length
  const activeLinks = latestAssessmentLinks.filter((l: any) => l.isActive).length
  
  // 计算本周新增参与者
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const newParticipants = latestAssessmentResults.filter((r: any) =>
    new Date(r.createdAt) > oneWeekAgo
  ).length

  // 计算平均分
  const completedResults = latestAssessmentResults.filter((r: any) => r.isCompleted)
  const averageScore = completedResults.length > 0
    ? Math.round(completedResults.reduce((sum: number, r: any) => sum + r.totalScore, 0) / completedResults.length)
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
      completedResults.reduce((sum: number, r: any) => sum + r.dimensionScores.trust, 0) / completedResults.length
    )
    dimensionStats[1].average = Math.round(
      completedResults.reduce((sum: number, r: any) => sum + r.dimensionScores.connect, 0) / completedResults.length
    )
    dimensionStats[2].average = Math.round(
      completedResults.reduce((sum: number, r: any) => sum + r.dimensionScores.enable, 0) / completedResults.length
    )
    dimensionStats[3].average = Math.round(
      completedResults.reduce((sum: number, r: any) => sum + r.dimensionScores.develop, 0) / completedResults.length
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

  completedResults.forEach((result: any) => {
    const score = result.totalScore
    if (score >= 160) scoreDistribution[0].count++
    else if (score >= 120) scoreDistribution[1].count++
    else if (score >= 80) scoreDistribution[2].count++
    else if (score >= 40) scoreDistribution[3].count++
    else scoreDistribution[4].count++
  })

  // 获取所有评估记录（用于统计和筛选）
  const allAssessments = completedResults
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((result: any) => {
      const link = latestAssessmentLinks.find((l: any) => l.id === result.linkId)
      return {
        id: result.id,
        createdAt: result.createdAt,
        totalScore: result.totalScore,
        dimensionScores: result.dimensionScores,
        linkId: result.linkId,
        linkName: link ? link.name : '直接访问'
      }
    })

  // 获取所有评估链接信息（包括没有评估结果的链接）
  const allLinks = latestAssessmentLinks.map((link: any) => ({
    id: link.id,
    name: link.name,
    description: link.description,
    url: link.url,
    createdAt: link.createdAt,
    visits: link.visits || 0,
    completions: latestAssessmentResults.filter((r: any) => r.linkId === link.id && r.isCompleted).length,
    isActive: link.isActive
  }))

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
        totalLinks: latestAssessmentLinks.length
      },
      dimensionStats,
      scoreDistribution,
      recentAssessments: allAssessments,
      assessmentLinks: allLinks
    }
  })
}))

// 获取所有评估链接
router.get('/assessment-links', authMiddleware, adminMiddleware, asyncHandler(async (_req: Request, res: Response) => {
  // 使用数据管理器获取最新数据
  const latestAssessmentLinks = dataManager.getAssessmentLinks()
  const latestAssessmentResults = dataManager.getAssessmentResults()
  
  console.log('获取最新链接数据:', {
    linksCount: latestAssessmentLinks.length,
    resultsCount: latestAssessmentResults.length
  })
  
  const links = latestAssessmentLinks.map((link: any) => ({
    ...link,
    completions: latestAssessmentResults.filter((r: any) => r.linkId === link.id && r.isCompleted).length
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
  
  // 使用数据管理器更新链接状态
  const success = dataManager.updateAssessmentLink(id, { isActive: false })
  
  if (!success) {
    throw new AppError('评估链接不存在', 404)
  }
  
  // 获取更新后的链接数据
  const links = dataManager.getAssessmentLinks()
  const updatedLink = links.find((l: any) => l.id === id)

  res.status(200).json({
    code: 200,
    message: '评估链接已停用',
    data: updatedLink
  })
}))

// 删除评估链接
router.delete('/assessment-links/:id', authMiddleware, adminMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  
  try {
    // 使用数据管理器删除链接
    const result = dataManager.deleteAssessmentLink(id)
    
    console.log(`删除链接成功: ${result.deletedLink.name}, 删除了 ${result.deletedResultsCount} 条相关评估结果`)
    
    res.status(200).json({
      code: 200,
      message: '评估链接已删除',
      data: {
        deletedLink: result.deletedLink,
        deletedResultsCount: result.deletedResultsCount
      }
    })
  } catch (error: any) {
    if (error.message === '评估链接不存在') {
      throw new AppError('评估链接不存在', 404)
    }
    throw error
  }
}))

// 记录评估结果 (供前端调用)
router.post('/assessment-results', asyncHandler(async (req: Request, res: Response) => {
  const { linkId, scores, totalScore, dimensionScores, analysis } = req.body

  console.log('=== 管理员API接收评估结果 ===')
  console.log('接收到的linkId:', linkId)
  console.log('linkId类型:', typeof linkId)
  console.log('接收到的数据:', {
    linkId,
    totalScore,
    hasScores: !!scores,
    hasDimensionScores: !!dimensionScores,
    hasAnalysis: !!analysis
  })

  // 验证数据
  if (!totalScore || !dimensionScores) {
    console.error('评估数据不完整:', { totalScore, dimensionScores })
    throw new AppError('评估数据不完整', 400)
  }

  // 记录完成统计（访问统计在link-visit接口中处理）
  if (linkId) {
    dataManager.recordAssessmentCompletion(linkId)
  } else {
    console.log('无linkId，记录为直接访问')
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

  // 使用数据管理器添加评估结果
  dataManager.addAssessmentResult(result)
  
  console.log('评估结果已保存:', {
    id: result.id,
    linkId: result.linkId,
    totalScore: result.totalScore,
    timestamp: result.createdAt
  })

  res.status(200).json({
    code: 200,
    message: '评估结果已记录',
    data: {
      id: result.id,
      timestamp: result.createdAt,
      linkId: result.linkId
    }
  })
}))

// 导出评估数据 (CSV格式)
router.get('/export/assessments', authMiddleware, adminMiddleware, asyncHandler(async (_req: Request, res: Response) => {
  // 使用数据管理器获取最新数据
  const latestAssessmentResults = dataManager.getAssessmentResults()
  const latestAssessmentLinks = dataManager.getAssessmentLinks()
  
  const completedResults = latestAssessmentResults.filter((r: any) => r.isCompleted)
  
  // 生成CSV内容
  const csvHeader = 'ID,评估时间,总分,Trust得分,Connect得分,Enable得分,Develop得分,来源链接\n'
  const csvRows = completedResults.map((result: any) => {
    const link = latestAssessmentLinks.find((l: any) => l.id === result.linkId)
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

  console.log('=== 记录链接访问 ===')
  console.log('接收到的linkId:', linkId)
  console.log('linkId类型:', typeof linkId)

  if (!linkId) {
    console.log('无linkId，跳过访问记录')
    return res.status(200).json({
      code: 200,
      message: '无链接ID，跳过访问记录'
    })
  }

  // 使用数据管理器记录访问
  const success = dataManager.recordLinkVisit(linkId)
  const links = dataManager.getAssessmentLinks()
  const link = links.find((l: any) => l.id === linkId)

  return res.status(200).json({
    code: 200,
    message: success ? '访问记录成功' : '访问记录失败',
    data: {
      linkId,
      visits: link ? link.visits : 0,
      linkName: link ? link.name : '未知链接'
    }
  })
}))

export default router