<template>
  <div class="failure-analysis">
    <!-- 页面头部 -->
    <section class="page-header">
      <div class="header-container">
        <div class="header-content">
          <div class="header-badge animate-fade-in-up">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
              <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
              <path d="M3 12h6m6 0h6"/>
            </svg>
            <span>AI复盘工具</span>
          </div>
          
          <h1 class="page-title animate-fade-in-up">聪明的失败者</h1>
          <p class="page-description animate-fade-in-up">
            通过结构化分析失败的业务拓展经历，制定可执行的跟进计划。
            每个表格单元格都可以手动填写或使用AI智能预测。
          </p>
          
          <div class="analysis-info animate-fade-in-up">
            <div class="info-item">
              <span class="info-label">分析方式</span>
              <span class="info-value">手动填写 + AI预测</span>
            </div>
            <div class="info-item">
              <span class="info-label">表格数量</span>
              <span class="info-value">2个可编辑表格</span>
            </div>
            <div class="info-item">
              <span class="info-label">AI功能</span>
              <span class="info-value">单元格智能预测</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 案例描述输入区域 -->
    <section class="input-section">
      <div class="section-container">
        <div class="input-form">
          <div class="form-card animate-fade-in-up">
            <div class="form-header">
              <div class="form-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div class="form-title">
                <h2>失败案例描述（可选）</h2>
                <p>提供案例背景可以让AI预测更准确</p>
              </div>
            </div>
            
            <div class="form-content">
              <div class="textarea-group">
                <label class="textarea-label">
                  <span class="label-text">失败案例背景</span>
                </label>
                <textarea
                  v-model="caseDescription"
                  class="case-textarea"
                  placeholder="可选：描述失败的业务拓展经历，包括产品特征、客户情况、竞争对手、关键决策者、沟通过程等。这将帮助AI提供更准确的预测..."
                  rows="6"
                ></textarea>
                
                <!-- 示例按钮 -->
                <div class="example-section">
                  <button
                    class="btn btn-ghost btn-sm"
                    @click="loadExampleCase"
                    type="button"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                    加载示例案例
                  </button>
                </div>
                <div class="textarea-hint">
                  <span class="hint-text">
                    {{ caseDescription.length > 0 ? '✅ 已提供背景信息，AI预测将更准确' : '💡 提供背景信息可以提高AI预测准确性' }}
                  </span>
                  <span class="char-count">{{ caseDescription.length }} 字符</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 表格1：分析失败的业务拓展 -->
    <section class="table-section">
      <div class="section-container">
        <div class="table-card animate-fade-in-up">
          <div class="card-header">
            <div class="card-icon analysis-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
              </svg>
            </div>
            <div class="card-title">
              <h3>表格1：工作表：分析失败的业务拓展</h3>
              <p>分析影响成败的关键因素，每个单元格都可以填写或AI预测</p>
            </div>
          </div>
          
          <div class="editable-table">
            <div class="table-header">
              <div class="header-cell factor">因素</div>
              <div class="header-cell impact-positive">+</div>
              <div class="header-cell impact-negative">-</div>
              <div class="header-cell explanation">正面或负面影响的具体说明</div>
              <div class="header-cell lesson">所吸取的教训</div>
            </div>
            
            <div class="table-body">
              <div 
                v-for="(factor, index) in analysisFactors" 
                :key="index"
                class="table-row"
              >
                <!-- 因素名称 -->
                <div class="table-cell factor">
                  <span class="factor-name">{{ factor.name }}</span>
                </div>
                
                <!-- 正面影响 -->
                <div class="table-cell impact-positive">
                  <input 
                    type="checkbox" 
                    :checked="factor.impact === 'positive'"
                    @change="updateImpact(index, 'positive')"
                    class="impact-checkbox"
                  />
                </div>
                
                <!-- 负面影响 -->
                <div class="table-cell impact-negative">
                  <input 
                    type="checkbox" 
                    :checked="factor.impact === 'negative'"
                    @change="updateImpact(index, 'negative')"
                    class="impact-checkbox"
                  />
                </div>
                
                <!-- 影响说明 -->
                <div class="table-cell explanation">
                  <div class="editable-cell">
                    <textarea
                      v-model="factor.explanation"
                      class="cell-input"
                      placeholder="点击填写影响说明..."
                      rows="2"
                    ></textarea>
                    <button
                      class="ai-predict-btn"
                      @click="predictField('factor_analysis', `${factor.name}_explanation`, index, 'explanation')"
                      :disabled="isPredicting"
                      title="AI预测"
                    >
                      <svg v-if="isPredicting && predictingField === `${index}_explanation`" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <!-- 教训 -->
                <div class="table-cell lesson">
                  <div class="editable-cell">
                    <textarea
                      v-model="factor.lesson"
                      class="cell-input"
                      placeholder="点击填写所吸取的教训..."
                      rows="2"
                    ></textarea>
                    <button
                      class="ai-predict-btn"
                      @click="predictField('factor_analysis', `${factor.name}_lesson`, index, 'lesson')"
                      :disabled="isPredicting"
                      title="AI预测"
                    >
                      <svg v-if="isPredicting && predictingField === `${index}_lesson`" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 表格2：业务拓展失败后如何跟进 -->
    <section class="table-section">
      <div class="section-container">
        <div class="table-card animate-fade-in-up">
          <div class="card-header">
            <div class="card-icon followup-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11H1v12h8V11z"/>
                <path d="M23 11h-8v12h8V11z"/>
                <path d="M15 7h-6v4h6V7z"/>
                <path d="M9 7V1h6v6"/>
              </svg>
            </div>
            <div class="card-title">
              <h3>表格2：练习表：业务拓展失败后如何跟进</h3>
              <p>制定短期和长期的跟进行动计划</p>
            </div>
          </div>
          
          <div class="followup-table">
            <div class="table-header">
              <div class="header-cell action">业务拓展失败后，我会：</div>
              <div class="header-cell timing">何时</div>
            </div>
            
            <div class="table-body">
              <!-- 短期行动 -->
              <div class="section-divider">
                <h4>短期行动（立即执行）</h4>
              </div>
              
              <div 
                v-for="(action, index) in followUpActions.immediate" 
                :key="`immediate_${index}`"
                class="table-row"
              >
                <div class="table-cell action">
                  <div class="action-content">
                    <input 
                      type="checkbox" 
                      v-model="action.selected"
                      class="action-checkbox"
                    />
                    <div class="editable-cell">
                      <textarea
                        v-model="action.text"
                        class="cell-input action-input"
                        placeholder="点击填写跟进行动..."
                        rows="2"
                      ></textarea>
                      <button
                        class="ai-predict-btn"
                        @click="predictFollowUpAction('immediate', index)"
                        :disabled="isPredicting"
                        title="AI预测行动"
                      >
                        <svg v-if="isPredicting && predictingField === `immediate_${index}_action`" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                          <path d="M21 12a9 9 0 11-6.219-8.56"/>
                        </svg>
                        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M9 12l2 2 4-4"/>
                          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div class="table-cell timing">
                  <div class="editable-cell">
                    <textarea
                      v-model="action.timing"
                      class="cell-input"
                      placeholder="点击填写执行时机..."
                      rows="2"
                    ></textarea>
                    <button
                      class="ai-predict-btn"
                      @click="predictField('follow_up_action', action.text, `immediate_${index}`, 'timing')"
                      :disabled="isPredicting"
                      title="AI预测时机"
                    >
                      <svg v-if="isPredicting && predictingField === `immediate_${index}_timing`" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 长期关系维护 -->
              <div class="section-divider">
                <h4>为了与客户建立长期的关系，我会：</h4>
              </div>
              
              <div 
                v-for="(action, index) in followUpActions.longTerm" 
                :key="`longterm_${index}`"
                class="table-row"
              >
                <div class="table-cell action">
                  <div class="action-content">
                    <input 
                      type="checkbox" 
                      v-model="action.selected"
                      class="action-checkbox"
                    />
                    <div class="editable-cell">
                      <textarea
                        v-model="action.text"
                        class="cell-input action-input"
                        placeholder="点击填写长期关系维护行动..."
                        rows="2"
                      ></textarea>
                      <button
                        class="ai-predict-btn"
                        @click="predictFollowUpAction('longterm', index)"
                        :disabled="isPredicting"
                        title="AI预测行动"
                      >
                        <svg v-if="isPredicting && predictingField === `longterm_${index}_action`" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                          <path d="M21 12a9 9 0 11-6.219-8.56"/>
                        </svg>
                        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M9 12l2 2 4-4"/>
                          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div class="table-cell timing">
                  <div class="editable-cell">
                    <textarea
                      v-model="action.timing"
                      class="cell-input"
                      placeholder="点击填写执行说明..."
                      rows="2"
                    ></textarea>
                    <button
                      class="ai-predict-btn"
                      @click="predictField('follow_up_action', action.text, `longterm_${index}`, 'timing')"
                      :disabled="isPredicting"
                      title="AI预测说明"
                    >
                      <svg v-if="isPredicting && predictingField === `longterm_${index}_timing`" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 新的合作机会指征/迹象 -->
              <div class="section-divider">
                <h4>新的合作机会指征/迹象：</h4>
              </div>
              
              <div 
                v-for="(signal, index) in opportunitySignals" 
                :key="`signal_${index}`"
                class="table-row"
              >
                <div class="table-cell action">
                  <div class="action-content">
                    <input 
                      type="checkbox" 
                      v-model="signal.selected"
                      class="action-checkbox"
                    />
                    <div class="editable-cell">
                      <textarea
                        v-model="signal.text"
                        class="cell-input action-input"
                        placeholder="点击填写机会信号..."
                        rows="2"
                      ></textarea>
                      <button
                        class="ai-predict-btn"
                        @click="predictOpportunitySignal(index)"
                        :disabled="isPredicting"
                        title="AI预测信号"
                      >
                        <svg v-if="isPredicting && predictingField === `signal_${index}_action`" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                          <path d="M21 12a9 9 0 11-6.219-8.56"/>
                        </svg>
                        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M9 12l2 2 4-4"/>
                          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div class="table-cell timing">
                  <div class="editable-cell">
                    <textarea
                      v-model="signal.timing"
                      class="cell-input"
                      placeholder="点击填写跟进建议..."
                      rows="2"
                    ></textarea>
                    <button
                      class="ai-predict-btn"
                      @click="predictField('opportunity_signal', signal.text, `signal_${index}`, 'timing')"
                      :disabled="isPredicting"
                      title="AI预测跟进建议"
                    >
                      <svg v-if="isPredicting && predictingField === `signal_${index}_timing`" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 12l2 2 4-4"/>
                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 操作按钮区域 -->
    <section class="actions-section">
      <div class="section-container">
        <div class="actions-card">
          <div class="actions-content">
            <button class="btn btn-secondary" @click="clearAllData">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
              清空所有数据
            </button>
            
            <button class="btn btn-primary" @click="saveData">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17,21 17,13 7,13 7,21"/>
                <polyline points="7,3 7,8 15,8"/>
              </svg>
              保存分析结果
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useFailureAnalysis } from '@/composables/useFailureAnalysis'

// 使用组合式函数
const {
  caseDescription,
  isPredicting,
  predictingField,
  analysisFactors,
  followUpActions,
  opportunitySignals,
  updateImpact,
  loadExampleCase,
  predictField,
  predictFollowUpAction,
  predictOpportunitySignal,
  clearAllData,
  saveData,
  loadSavedData
} = useFailureAnalysis()

// 组件挂载时加载保存的数据
onMounted(() => {
  loadSavedData()
})
</script>

<style scoped>
/* ===== 页面头部样式 ===== */
.page-header {
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
  padding: var(--space-16) 0 var(--space-12);
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
  pointer-events: none;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  position: relative;
  z-index: 1;
}

.header-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--primary-500);
  color: white;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-xl);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: var(--space-6);
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
  line-height: 1.2;
}

.page-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
  line-height: 1.6;
}

.analysis-info {
  display: flex;
  justify-content: center;
  gap: var(--space-8);
  flex-wrap: wrap;
}

.info-item {
  text-align: center;
}

.info-label {
  display: block;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-1);
}

.info-value {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* ===== 输入区域样式 ===== */
.input-section {
  padding: var(--space-12) 0;
  background: var(--bg-primary);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.form-card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  overflow: hidden;
}

.form-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-light);
  background: var(--bg-secondary);
}

.form-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--primary-100);
  border-radius: var(--radius-lg);
  color: var(--primary-600);
}

.form-title h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.form-title p {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.form-content {
  padding: var(--space-6);
}

.textarea-group {
  margin-bottom: var(--space-4);
}

.textarea-label {
  display: block;
  margin-bottom: var(--space-2);
}

.label-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.case-textarea {
  width: 100%;
  min-height: 120px;
  padding: var(--space-3);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.case-textarea:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-100);
}

.textarea-hint {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-2);
  font-size: 0.75rem;
}

.hint-text {
  color: var(--text-secondary);
}

.char-count {
  color: var(--text-tertiary);
}

.example-section {
  margin-top: var(--space-3);
  text-align: center;
}

.btn-ghost {
  background: transparent;
  color: var(--primary-600);
  border: 1px solid var(--primary-200);
}

.btn-ghost:hover {
  background: var(--primary-50);
  border-color: var(--primary-300);
}

.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: 0.75rem;
}

/* ===== 表格样式 ===== */
.table-section {
  padding: var(--space-8) 0;
  background: var(--bg-primary);
}

.table-card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  overflow: hidden;
  margin-bottom: var(--space-6);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-light);
  background: var(--bg-secondary);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
}

.analysis-icon {
  background: var(--blue-100);
  color: var(--blue-600);
}

.followup-icon {
  background: var(--green-100);
  color: var(--green-600);
}

.card-title h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.card-title p {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* ===== 可编辑表格样式 ===== */
.editable-table {
  overflow-x: auto;
}

.table-header {
  display: grid;
  grid-template-columns: 120px 60px 60px 1fr 1fr;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
}

.header-cell {
  padding: var(--space-4);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
  border-right: 1px solid var(--border-light);
}

.header-cell:last-child {
  border-right: none;
}

.header-cell.factor {
  text-align: left;
}

.header-cell.explanation,
.header-cell.lesson {
  text-align: left;
}

.table-body {
  background: white;
}

.table-row {
  display: grid;
  grid-template-columns: 120px 60px 60px 1fr 1fr;
  border-bottom: 1px solid var(--border-light);
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: var(--space-3);
  border-right: 1px solid var(--border-light);
  display: flex;
  align-items: center;
}

.table-cell:last-child {
  border-right: none;
}

.table-cell.factor {
  justify-content: flex-start;
}

.table-cell.impact-positive,
.table-cell.impact-negative {
  justify-content: center;
}

.factor-name {
  font-weight: 500;
  color: var(--text-primary);
}

.impact-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.editable-cell {
  position: relative;
  width: 100%;
  display: flex;
  gap: var(--space-2);
}

.cell-input {
  flex: 1;
  min-height: 60px;
  padding: var(--space-2);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  line-height: 1.4;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.cell-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 2px var(--primary-100);
}

.cell-input::placeholder {
  color: var(--text-tertiary);
}

.ai-predict-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--primary-500);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.ai-predict-btn:hover:not(:disabled) {
  background: var(--primary-600);
  transform: translateY(-1px);
}

.ai-predict-btn:disabled {
  background: var(--gray-400);
  cursor: not-allowed;
  transform: none;
}

/* ===== 跟进表格样式 ===== */
.followup-table {
  overflow-x: auto;
}

.followup-table .table-header {
  grid-template-columns: 1fr 300px;
}

.followup-table .table-row {
  grid-template-columns: 1fr 300px;
}

.section-divider {
  padding: var(--space-4) var(--space-6);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
}

.section-divider h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.action-content {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  width: 100%;
}

.action-checkbox {
  width: 18px;
  height: 18px;
  margin-top: var(--space-1);
  cursor: pointer;
  flex-shrink: 0;
}

.action-input {
  min-height: 50px;
}

/* ===== 操作按钮样式 ===== */
.actions-section {
  padding: var(--space-8) 0;
  background: var(--bg-primary);
}

.actions-card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
  padding: var(--space-6);
}

.actions-content {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.btn-primary {
  background: var(--primary-500);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-600);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--gray-100);
  color: var(--gray-700);
  border-color: var(--gray-300);
}

.btn-secondary:hover {
  background: var(--gray-200);
  transform: translateY(-1px);
}

/* ===== 动画 ===== */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ===== 响应式设计 ===== */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .analysis-info {
    gap: var(--space-4);
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
  
  .header-cell,
  .table-cell {
    border-right: none;
    border-bottom: 1px solid var(--border-light);
    text-align: left;
    justify-content: flex-start;
  }
  
  .followup-table .table-header,
  .followup-table .table-row {
    grid-template-columns: 1fr;
  }
  
  .actions-content {
    flex-direction: column;
    align-items: center;
  }
}
</style>