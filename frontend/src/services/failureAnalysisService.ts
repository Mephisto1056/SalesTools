import api from '@/api'

// AI预测服务类
export class FailureAnalysisService {
  // 预测字段内容
  static async predictField(
    fieldType: string, 
    fieldName: string, 
    context: string, 
    caseDescription: string
  ): Promise<string> {
    const response: any = await api.post('/failure-analysis/predict-field', {
      field_type: fieldType,
      field_name: fieldName,
      context,
      case_description: caseDescription
    })
    
    if (response.code === 200) {
      return response.data.prediction
    } else {
      throw new Error(response.message || '预测失败')
    }
  }

  // 获取字段上下文信息
  static getContextForField(fieldType: string, fieldName: string, additionalData?: any): string {
    let context = ''
    
    // 添加已填写的相关信息作为上下文
    if (fieldType === 'factor_analysis') {
      if (additionalData?.factor) {
        const factor = additionalData.factor
        context = `因素：${factor.name}，影响类型：${factor.impact || '未选择'}`
        if (factor.explanation) context += `，已有说明：${factor.explanation}`
        if (factor.lesson) context += `，已有教训：${factor.lesson}`
      }
    } else if (fieldType === 'follow_up_action') {
      context = '这是业务拓展失败后的跟进行动'
    } else if (fieldType === 'opportunity_signal') {
      context = '这是识别新合作机会的信号'
    }
    
    return context
  }
}

// 数据持久化服务
export class FailureAnalysisDataService {
  private static readonly STORAGE_KEY = 'failureAnalysisData'

  // 保存数据到本地存储
  static saveData(data: any): void {
    const saveData = {
      ...data,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(saveData))
  }

  // 从本地存储加载数据
  static loadData(): any | null {
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY)
      return savedData ? JSON.parse(savedData) : null
    } catch (error) {
      console.error('加载保存的数据失败:', error)
      return null
    }
  }

  // 清除本地存储数据
  static clearData(): void {
    localStorage.removeItem(this.STORAGE_KEY)
  }
}