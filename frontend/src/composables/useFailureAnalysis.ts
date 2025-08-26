import { ref, reactive } from 'vue'
import { 
  EXAMPLE_CASE_DESCRIPTION,
  INITIAL_ANALYSIS_FACTORS,
  INITIAL_FOLLOW_UP_ACTIONS,
  INITIAL_OPPORTUNITY_SIGNALS,
  PRESET_IMMEDIATE_ACTIONS,
  PRESET_LONG_TERM_ACTIONS,
  PRESET_OPPORTUNITY_SIGNALS
} from '@/constants/failureAnalysisData'
import { FailureAnalysisService, FailureAnalysisDataService } from '@/services/failureAnalysisService'

export function useFailureAnalysis() {
  // 响应式数据
  const caseDescription = ref('')
  const isPredicting = ref(false)
  const predictingField = ref('')

  // 分析因素数据
  const analysisFactors = reactive([...INITIAL_ANALYSIS_FACTORS])

  // 跟进行动数据
  const followUpActions = reactive({
    immediate: [...INITIAL_FOLLOW_UP_ACTIONS.immediate],
    longTerm: [...INITIAL_FOLLOW_UP_ACTIONS.longTerm]
  })

  // 机会信号数据
  const opportunitySignals = reactive([...INITIAL_OPPORTUNITY_SIGNALS])

  // 更新影响类型
  const updateImpact = (index: number, impact: 'positive' | 'negative') => {
    if (analysisFactors[index].impact === impact) {
      analysisFactors[index].impact = '' // 取消选择
    } else {
      analysisFactors[index].impact = impact
    }
  }

  // 加载示例案例
  const loadExampleCase = () => {
    caseDescription.value = EXAMPLE_CASE_DESCRIPTION
  }

  // AI预测字段内容
  const predictField = async (fieldType: string, fieldName: string, index: number | string, fieldKey: string) => {
    if (isPredicting.value) return
    
    isPredicting.value = true
    predictingField.value = `${index}_${fieldKey}`
    
    try {
      const additionalData = fieldType === 'factor_analysis' 
        ? { factor: analysisFactors.find(f => fieldName.includes(f.name)) }
        : undefined

      const context = FailureAnalysisService.getContextForField(fieldType, fieldName, additionalData)
      const prediction = await FailureAnalysisService.predictField(
        fieldType,
        fieldName,
        context,
        caseDescription.value
      )
      
      // 根据字段类型更新对应的数据
      if (fieldType === 'factor_analysis') {
        const factorIndex = parseInt(index.toString())
        if (fieldKey === 'explanation') {
          analysisFactors[factorIndex].explanation = prediction
        } else if (fieldKey === 'lesson') {
          analysisFactors[factorIndex].lesson = prediction
        }
      } else if (fieldType === 'follow_up_action') {
        updateFollowUpField(index.toString(), fieldKey, prediction)
      } else if (fieldType === 'opportunity_signal') {
        updateOpportunityField(index.toString(), fieldKey, prediction)
      }
    } catch (error: any) {
      console.error('AI预测失败:', error)
      alert(`AI预测失败：${error.message || '请稍后重试'}`)
    } finally {
      isPredicting.value = false
      predictingField.value = ''
    }
  }

  // 预测跟进行动
  const predictFollowUpAction = async (type: 'immediate' | 'longterm', index: number) => {
    if (isPredicting.value) return
    
    isPredicting.value = true
    predictingField.value = `${type}_${index}_action`
    
    try {
      const context = FailureAnalysisService.getContextForField('follow_up_action', `${type}行动`)
      const prediction = await FailureAnalysisService.predictField(
        'follow_up_action',
        `${type}行动`,
        context,
        caseDescription.value
      )
      
      if (type === 'immediate') {
        followUpActions.immediate[index].text = prediction
      } else {
        followUpActions.longTerm[index].text = prediction
      }
    } catch (error: any) {
      console.error('AI预测失败:', error)
      alert(`AI预测失败：${error.message || '请稍后重试'}`)
    } finally {
      isPredicting.value = false
      predictingField.value = ''
    }
  }

  // 预测机会信号
  const predictOpportunitySignal = async (index: number) => {
    if (isPredicting.value) return
    
    isPredicting.value = true
    predictingField.value = `signal_${index}_action`
    
    try {
      const context = FailureAnalysisService.getContextForField('opportunity_signal', '机会信号')
      const prediction = await FailureAnalysisService.predictField(
        'opportunity_signal',
        '机会信号',
        context,
        caseDescription.value
      )
      
      opportunitySignals[index].text = prediction
    } catch (error: any) {
      console.error('AI预测失败:', error)
      alert(`AI预测失败：${error.message || '请稍后重试'}`)
    } finally {
      isPredicting.value = false
      predictingField.value = ''
    }
  }

  // 更新跟进行动字段
  const updateFollowUpField = (index: string, fieldKey: string, value: string) => {
    const [type, idx] = index.split('_')
    const arrayIndex = parseInt(idx)
    
    if (type === 'immediate' && followUpActions.immediate[arrayIndex]) {
      if (fieldKey === 'timing') {
        followUpActions.immediate[arrayIndex].timing = value
      }
    } else if (type === 'longterm' && followUpActions.longTerm[arrayIndex]) {
      if (fieldKey === 'timing') {
        followUpActions.longTerm[arrayIndex].timing = value
      }
    }
  }

  // 更新机会信号字段
  const updateOpportunityField = (index: string, fieldKey: string, value: string) => {
    const [, idx] = index.split('_')
    const arrayIndex = parseInt(idx)
    
    if (opportunitySignals[arrayIndex]) {
      if (fieldKey === 'timing') {
        opportunitySignals[arrayIndex].timing = value
      }
    }
  }

  // 清空所有数据
  const clearAllData = () => {
    if (confirm('确定要清空所有数据吗？此操作不可撤销。')) {
      caseDescription.value = ''
      
      // 重置分析因素
      analysisFactors.forEach(factor => {
        factor.impact = ''
        factor.explanation = ''
        factor.lesson = ''
      })
      
      // 重置跟进行动
      followUpActions.immediate.forEach(action => {
        if (!PRESET_IMMEDIATE_ACTIONS.includes(action.text)) {
          action.text = ''
        }
        action.timing = ''
        action.selected = false
      })
      
      followUpActions.longTerm.forEach(action => {
        if (!PRESET_LONG_TERM_ACTIONS.includes(action.text)) {
          action.text = ''
        }
        action.timing = ''
        action.selected = false
      })
      
      // 重置机会信号
      opportunitySignals.forEach(signal => {
        if (!PRESET_OPPORTUNITY_SIGNALS.includes(signal.text)) {
          signal.text = ''
        }
        signal.timing = ''
        signal.selected = false
      })
    }
  }

  // 保存数据
  const saveData = () => {
    const data = {
      caseDescription: caseDescription.value,
      analysisFactors: analysisFactors,
      followUpActions: followUpActions,
      opportunitySignals: opportunitySignals
    }
    
    FailureAnalysisDataService.saveData(data)
    alert('分析结果已保存到本地存储')
  }

  // 加载保存的数据
  const loadSavedData = () => {
    const data = FailureAnalysisDataService.loadData()
    if (!data) return

    caseDescription.value = data.caseDescription || ''
    
    // 恢复分析因素数据
    if (data.analysisFactors) {
      data.analysisFactors.forEach((factor: any, index: number) => {
        if (analysisFactors[index]) {
          analysisFactors[index].impact = factor.impact || ''
          analysisFactors[index].explanation = factor.explanation || ''
          analysisFactors[index].lesson = factor.lesson || ''
        }
      })
    }
    
    // 恢复跟进行动数据
    if (data.followUpActions) {
      if (data.followUpActions.immediate) {
        data.followUpActions.immediate.forEach((action: any, index: number) => {
          if (followUpActions.immediate[index]) {
            followUpActions.immediate[index].text = action.text || followUpActions.immediate[index].text
            followUpActions.immediate[index].timing = action.timing || ''
            followUpActions.immediate[index].selected = action.selected || false
          }
        })
      }
      
      if (data.followUpActions.longTerm) {
        data.followUpActions.longTerm.forEach((action: any, index: number) => {
          if (followUpActions.longTerm[index]) {
            followUpActions.longTerm[index].text = action.text || followUpActions.longTerm[index].text
            followUpActions.longTerm[index].timing = action.timing || ''
            followUpActions.longTerm[index].selected = action.selected || false
          }
        })
      }
    }
    
    // 恢复机会信号数据
    if (data.opportunitySignals) {
      data.opportunitySignals.forEach((signal: any, index: number) => {
        if (opportunitySignals[index]) {
          opportunitySignals[index].text = signal.text || opportunitySignals[index].text
          opportunitySignals[index].timing = signal.timing || ''
          opportunitySignals[index].selected = signal.selected || false
        }
      })
    }
  }

  return {
    // 响应式数据
    caseDescription,
    isPredicting,
    predictingField,
    analysisFactors,
    followUpActions,
    opportunitySignals,
    
    // 方法
    updateImpact,
    loadExampleCase,
    predictField,
    predictFollowUpAction,
    predictOpportunitySignal,
    clearAllData,
    saveData,
    loadSavedData
  }
}