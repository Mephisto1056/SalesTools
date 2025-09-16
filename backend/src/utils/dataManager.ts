import fs from 'fs'
import path from 'path'

// 数据管理器，确保文件和内存数据的同步
class DataManager {
  private static instance: DataManager
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
    if (!fs.existsSync(this.linksFile)) {
      fs.writeFileSync(this.linksFile, '[]', 'utf8')
    }
    if (!fs.existsSync(this.resultsFile)) {
      fs.writeFileSync(this.resultsFile, '[]', 'utf8')
    }
  }

  public static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager()
    }
    return DataManager.instance
  }

  // 从文件加载数据
  private loadFromFile(filePath: string, defaultValue: any[] = []): any[] {
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8')
        const parsed = JSON.parse(data)
        console.log(`从文件加载数据: ${filePath}, 记录数: ${parsed.length}`)
        return parsed
      }
    } catch (error) {
      console.error(`加载数据文件失败: ${filePath}`, error)
    }
    return defaultValue
  }

  // 保存数据到文件
  private saveToFile(filePath: string, data: any[]): void {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
      console.log(`数据已保存到: ${filePath}, 记录数: ${data.length}`)
    } catch (error) {
      console.error(`保存数据文件失败: ${filePath}`, error)
      throw error
    }
  }

  // 获取最新的评估链接数据
  public getAssessmentLinks(): any[] {
    return this.loadFromFile(this.linksFile)
  }

  // 获取最新的评估结果数据
  public getAssessmentResults(): any[] {
    return this.loadFromFile(this.resultsFile)
  }

  // 保存评估链接数据
  public saveAssessmentLinks(links: any[]): void {
    this.saveToFile(this.linksFile, links)
  }

  // 保存评估结果数据
  public saveAssessmentResults(results: any[]): void {
    this.saveToFile(this.resultsFile, results)
  }

  // 添加新的评估链接
  public addAssessmentLink(link: any): void {
    const links = this.getAssessmentLinks()
    links.push(link)
    this.saveAssessmentLinks(links)
  }

  // 添加新的评估结果
  public addAssessmentResult(result: any): void {
    const results = this.getAssessmentResults()
    results.push(result)
    this.saveAssessmentResults(results)
  }

  // 更新评估链接
  public updateAssessmentLink(linkId: string, updates: any): boolean {
    const links = this.getAssessmentLinks()
    const linkIndex = links.findIndex(l => l.id === linkId)
    if (linkIndex !== -1) {
      links[linkIndex] = { ...links[linkIndex], ...updates }
      this.saveAssessmentLinks(links)
      console.log(`链接已更新: ${linkId}`, updates)
      return true
    }
    console.warn(`未找到要更新的链接: ${linkId}`)
    return false
  }

  // 删除评估链接
  public deleteAssessmentLink(linkId: string): { deletedLink: any, deletedResultsCount: number } {
    const links = this.getAssessmentLinks()
    const results = this.getAssessmentResults()
    
    const linkIndex = links.findIndex(l => l.id === linkId)
    if (linkIndex === -1) {
      throw new Error('评估链接不存在')
    }

    const deletedLink = links[linkIndex]
    
    // 从链接数组中移除
    links.splice(linkIndex, 1)
    this.saveAssessmentLinks(links)
    
    // 删除相关的评估结果
    const relatedResults = results.filter(r => r.linkId === linkId)
    const filteredResults = results.filter(r => r.linkId !== linkId)
    this.saveAssessmentResults(filteredResults)
    
    console.log(`已删除链接 ${deletedLink.name} 和 ${relatedResults.length} 条相关评估结果`)
    
    return {
      deletedLink,
      deletedResultsCount: relatedResults.length
    }
  }

  // 记录链接访问
  public recordLinkVisit(linkId: string): boolean {
    const links = this.getAssessmentLinks()
    const link = links.find(l => l.id === linkId)
    if (link) {
      link.visits = (link.visits || 0) + 1
      this.saveAssessmentLinks(links)
      console.log(`链接 ${link.name} 访问次数更新为: ${link.visits}`)
      return true
    }
    console.warn(`未找到要记录访问的链接: ${linkId}`)
    return false
  }

  // 记录评估完成
  public recordAssessmentCompletion(linkId: string): boolean {
    const links = this.getAssessmentLinks()
    const link = links.find(l => l.id === linkId)
    if (link) {
      link.completions = (link.completions || 0) + 1
      this.saveAssessmentLinks(links)
      console.log(`链接 ${link.name} 完成次数更新为: ${link.completions}`)
      return true
    }
    console.warn(`未找到要记录完成的链接: ${linkId}`)
    return false
  }
}

export const dataManager = DataManager.getInstance()