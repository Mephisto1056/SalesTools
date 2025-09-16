import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

// 文件锁管理器
class FileLockManager {
  private static locks = new Map<string, Promise<void>>()
  
  static async withLock<T>(filePath: string, operation: () => Promise<T>): Promise<T> {
    const normalizedPath = path.resolve(filePath)
    
    // 如果已有锁，等待前一个操作完成
    if (this.locks.has(normalizedPath)) {
      await this.locks.get(normalizedPath)
    }
    
    // 创建新的锁
    const lockPromise = this.executeWithLock(operation)
    this.locks.set(normalizedPath, lockPromise.then(() => {}, () => {})) // 忽略错误，只关心完成状态
    
    try {
      const result = await lockPromise
      return result
    } finally {
      // 操作完成后清理锁
      this.locks.delete(normalizedPath)
    }
  }
  
  private static async executeWithLock<T>(operation: () => Promise<T>): Promise<T> {
    return await operation()
  }
}

// 安全的数据管理器，支持并发控制
class SafeDataManager {
  private static instance: SafeDataManager
  private dataDir: string
  private linksFile: string
  private resultsFile: string

  private constructor() {
    this.dataDir = path.join(__dirname, '../../data')
    this.linksFile = path.join(this.dataDir, 'assessment-links.json')
    this.resultsFile = path.join(this.dataDir, 'assessment-results.json')
    
    // 确保数据目录存在
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true })
    }
    
    // 确保数据文件存在
    this.initializeFiles()
  }

  public static getInstance(): SafeDataManager {
    if (!SafeDataManager.instance) {
      SafeDataManager.instance = new SafeDataManager()
    }
    return SafeDataManager.instance
  }

  private initializeFiles(): void {
    if (!fs.existsSync(this.linksFile)) {
      fs.writeFileSync(this.linksFile, '[]', 'utf8')
    }
    if (!fs.existsSync(this.resultsFile)) {
      fs.writeFileSync(this.resultsFile, '[]', 'utf8')
    }
  }

  // 安全地从文件加载数据
  private async loadFromFile(filePath: string, defaultValue: any[] = []): Promise<any[]> {
    return FileLockManager.withLock(filePath, async () => {
      try {
        if (fs.existsSync(filePath)) {
          const data = await promisify(fs.readFile)(filePath, 'utf8')
          const parsed = JSON.parse(data)
          console.log(`从文件加载数据: ${filePath}, 记录数: ${parsed.length}`)
          return parsed
        }
      } catch (error) {
        console.error(`加载数据文件失败: ${filePath}`, error)
        // 如果文件损坏，尝试备份并重新初始化
        await this.backupCorruptedFile(filePath)
      }
      return defaultValue
    })
  }

  // 安全地保存数据到文件
  private async saveToFile(filePath: string, data: any[]): Promise<void> {
    return FileLockManager.withLock(filePath, async () => {
      try {
        // 确保目录存在
        const dir = path.dirname(filePath)
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }
        
        // 生成唯一的临时文件名
        const tempFile = `${filePath}.tmp.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`
        const jsonData = JSON.stringify(data, null, 2)
        
        // 写入临时文件
        await promisify(fs.writeFile)(tempFile, jsonData, 'utf8')
        
        // 验证临时文件是否写入成功
        if (!fs.existsSync(tempFile)) {
          throw new Error('临时文件写入失败')
        }
        
        // 原子性地替换原文件
        await promisify(fs.rename)(tempFile, filePath)
        
        console.log(`数据已安全保存到: ${filePath}, 记录数: ${data.length}`)
      } catch (error) {
        console.error(`保存数据文件失败: ${filePath}`, error)
        // 清理可能存在的临时文件
        const tempPattern = `${filePath}.tmp.`
        try {
          const dir = path.dirname(filePath)
          const files = fs.readdirSync(dir)
          for (const file of files) {
            if (file.startsWith(path.basename(tempPattern))) {
              const tempFilePath = path.join(dir, file)
              if (fs.existsSync(tempFilePath)) {
                await promisify(fs.unlink)(tempFilePath)
                console.log(`清理临时文件: ${tempFilePath}`)
              }
            }
          }
        } catch (cleanupError) {
          console.error(`清理临时文件失败:`, cleanupError)
        }
        throw error
      }
    })
  }

  // 备份损坏的文件
  private async backupCorruptedFile(filePath: string): Promise<void> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backupPath = `${filePath}.corrupted.${timestamp}`
      
      if (fs.existsSync(filePath)) {
        await promisify(fs.copyFile)(filePath, backupPath)
        console.log(`损坏的文件已备份到: ${backupPath}`)
        
        // 重新初始化文件
        await promisify(fs.writeFile)(filePath, '[]', 'utf8')
      }
    } catch (error) {
      console.error(`备份损坏文件失败: ${filePath}`, error)
    }
  }

  // 获取最新的评估链接数据
  public async getAssessmentLinks(): Promise<any[]> {
    return this.loadFromFile(this.linksFile)
  }

  // 获取最新的评估结果数据
  public async getAssessmentResults(): Promise<any[]> {
    return this.loadFromFile(this.resultsFile)
  }

  // 保存评估链接数据
  public async saveAssessmentLinks(links: any[]): Promise<void> {
    await this.saveToFile(this.linksFile, links)
  }

  // 保存评估结果数据
  public async saveAssessmentResults(results: any[]): Promise<void> {
    await this.saveToFile(this.resultsFile, results)
  }

  // 添加新的评估链接
  public async addAssessmentLink(link: any): Promise<void> {
    return FileLockManager.withLock(this.linksFile, async () => {
      const links = await this.loadFromFile(this.linksFile)
      links.push(link)
      await this.saveToFile(this.linksFile, links)
    })
  }

  // 添加新的评估结果
  public async addAssessmentResult(result: any): Promise<void> {
    return FileLockManager.withLock(this.resultsFile, async () => {
      const results = await this.loadFromFile(this.resultsFile)
      results.push(result)
      await this.saveToFile(this.resultsFile, results)
    })
  }

  // 更新评估链接
  public async updateAssessmentLink(linkId: string, updates: any): Promise<boolean> {
    return FileLockManager.withLock(this.linksFile, async () => {
      const links = await this.loadFromFile(this.linksFile)
      const linkIndex = links.findIndex(l => l.id === linkId)
      if (linkIndex !== -1) {
        links[linkIndex] = { ...links[linkIndex], ...updates }
        await this.saveToFile(this.linksFile, links)
        console.log(`链接已更新: ${linkId}`, updates)
        return true
      }
      console.warn(`未找到要更新的链接: ${linkId}`)
      return false
    })
  }

  // 删除评估链接
  public async deleteAssessmentLink(linkId: string): Promise<{ deletedLink: any, deletedResultsCount: number }> {
    // 需要同时锁定两个文件
    const linksLock = FileLockManager.withLock(this.linksFile, async () => {
      const links = await this.loadFromFile(this.linksFile)
      const linkIndex = links.findIndex(l => l.id === linkId)
      if (linkIndex === -1) {
        throw new Error('评估链接不存在')
      }
      const deletedLink = links[linkIndex]
      links.splice(linkIndex, 1)
      await this.saveToFile(this.linksFile, links)
      return deletedLink
    })

    const resultsLock = FileLockManager.withLock(this.resultsFile, async () => {
      const results = await this.loadFromFile(this.resultsFile)
      const relatedResults = results.filter(r => r.linkId === linkId)
      const filteredResults = results.filter(r => r.linkId !== linkId)
      await this.saveToFile(this.resultsFile, filteredResults)
      return relatedResults.length
    })

    const [deletedLink, deletedResultsCount] = await Promise.all([linksLock, resultsLock])
    
    console.log(`已删除链接和 ${deletedResultsCount} 条相关评估结果`)
    
    return {
      deletedLink,
      deletedResultsCount
    }
  }

  // 记录链接访问
  public async recordLinkVisit(linkId: string): Promise<boolean> {
    return FileLockManager.withLock(this.linksFile, async () => {
      const links = await this.loadFromFile(this.linksFile)
      const link = links.find(l => l.id === linkId)
      if (link) {
        link.visits = (link.visits || 0) + 1
        await this.saveToFile(this.linksFile, links)
        console.log(`链接 ${link.name} 访问次数更新为: ${link.visits}`)
        return true
      }
      console.warn(`未找到要记录访问的链接: ${linkId}`)
      return false
    })
  }

  // 记录评估完成
  public async recordAssessmentCompletion(linkId: string): Promise<boolean> {
    return FileLockManager.withLock(this.linksFile, async () => {
      const links = await this.loadFromFile(this.linksFile)
      const link = links.find(l => l.id === linkId)
      if (link) {
        link.completions = (link.completions || 0) + 1
        await this.saveToFile(this.linksFile, links)
        console.log(`链接 ${link.name} 完成次数更新为: ${link.completions}`)
        return true
      }
      console.warn(`未找到要记录完成的链接: ${linkId}`)
      return false
    })
  }

  // 批量操作：同时添加多个评估结果
  public async addMultipleAssessmentResults(results: any[]): Promise<void> {
    return FileLockManager.withLock(this.resultsFile, async () => {
      const existingResults = await this.loadFromFile(this.resultsFile)
      existingResults.push(...results)
      await this.saveToFile(this.resultsFile, existingResults)
    })
  }

  // 健康检查：验证数据文件完整性
  public async healthCheck(): Promise<{ status: string, issues: string[] }> {
    const issues: string[] = []
    
    try {
      // 检查链接文件
      const links = await this.loadFromFile(this.linksFile)
      if (!Array.isArray(links)) {
        issues.push('链接文件格式错误')
      }
      
      // 检查结果文件
      const results = await this.loadFromFile(this.resultsFile)
      if (!Array.isArray(results)) {
        issues.push('结果文件格式错误')
      }
      
      // 检查文件权限
      try {
        await promisify(fs.access)(this.dataDir, fs.constants.R_OK | fs.constants.W_OK)
      } catch (error) {
        issues.push('数据目录权限不足')
      }
      
    } catch (error) {
      issues.push(`健康检查失败: ${error instanceof Error ? error.message : String(error)}`)
    }
    
    return {
      status: issues.length === 0 ? 'healthy' : 'unhealthy',
      issues
    }
  }
}

export const safeDataManager = SafeDataManager.getInstance()