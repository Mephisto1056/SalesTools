<template>
  <div class="competitive-analysis">
    <!-- 页面头部 -->
    <section class="page-header">
      <div class="header-container">
        <div class="header-content">
          <div class="header-badge animate-fade-in-up">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 3v18h18"/>
              <path d="m19 9-5 5-4-4-3 3"/>
            </svg>
            <span>AI 智能分析</span>
          </div>
          
          <h1 class="page-title animate-fade-in-up">竞争分析工具</h1>
          <p class="page-description animate-fade-in-up">
            利用AI大模型自动分析竞争对手，为您的销售策略提供智能支持，
            帮助您在竞争中占据优势地位。
          </p>
        </div>
      </div>
    </section>

    <!-- 输入表单区域 -->
    <section class="input-section">
      <div class="section-container">
        <div class="form-card">
          <div class="form-header">
            <h2>分析参数设置</h2>
            <p>请填写以下信息，我们将为您生成详细的竞争分析报告</p>
          </div>
          
          <div class="form-content">
            <div class="form-group">
              <label for="customer" class="form-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                客户名称
              </label>
              <input
                id="customer"
                v-model="formData.customerName"
                type="text"
                class="input"
                placeholder="例如：上海市第六人民医院骨科"
                :disabled="loading"
              />
            </div>
            
            <div class="form-group">
              <label for="myProduct" class="form-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect width="7" height="7" x="3" y="3" rx="1"/>
                  <rect width="7" height="7" x="14" y="3" rx="1"/>
                  <rect width="7" height="7" x="14" y="14" rx="1"/>
                  <rect width="7" height="7" x="3" y="14" rx="1"/>
                </svg>
                我的产品
              </label>
              <input
                id="myProduct"
                v-model="formData.myProduct"
                type="text"
                class="input"
                placeholder="例如：Stryker NAV3i 导航平台"
                :disabled="loading"
              />
            </div>
            
            <div class="form-group">
              <label for="competitorProduct" class="form-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
                竞争对手产品
              </label>
              <input
                id="competitorProduct"
                v-model="formData.competitorProduct"
                type="text"
                class="input"
                placeholder="例如：Medtronic AxiEM 电磁导航系统"
                :disabled="loading"
              />
            </div>
            
            <button 
              class="btn btn-primary btn-lg w-full"
              @click="generateAnalysis"
              :disabled="loading || !isFormValid"
            >
              <svg v-if="loading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M3 12h6m6 0h6"/>
              </svg>
              {{ loading ? '正在分析中...' : '开始智能分析' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 分析结果区域 -->
    <section v-if="analysisResult" class="results-section">
      <div class="section-container">
        <!-- 竞争地位分析 -->
        <div class="result-card animate-fade-in-up">
          <div class="card-header">
            <div class="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3v18h18"/>
                <path d="m19 9-5 5-4-4-3 3"/>
              </svg>
            </div>
            <div class="card-title">
              <h3>竞争地位分析</h3>
              <p>全面对比您的产品与竞争对手的优劣势</p>
            </div>
          </div>
          
          <div class="table-wrapper">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>比较维度</th>
                  <th>我的产品</th>
                  <th>竞争对手产品</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="dimension-cell">
                    <span class="dimension-label">特征</span>
                  </td>
                  <td>{{ analysisResult.table1.features.my_product }}</td>
                  <td>{{ analysisResult.table1.features.competitor_product }}</td>
                </tr>
                <tr>
                  <td class="dimension-cell">
                    <span class="dimension-label">利益</span>
                  </td>
                  <td>{{ analysisResult.table1.benefits.my_product }}</td>
                  <td>{{ analysisResult.table1.benefits.competitor_product }}</td>
                </tr>
                <tr>
                  <td class="dimension-cell">
                    <span class="dimension-label">价格</span>
                  </td>
                  <td>{{ analysisResult.table1.price.my_product }}</td>
                  <td>{{ analysisResult.table1.price.competitor_product }}</td>
                </tr>
                <tr>
                  <td class="dimension-cell">
                    <span class="dimension-label">供货条件</span>
                  </td>
                  <td>{{ analysisResult.table1.supply_terms.my_product }}</td>
                  <td>{{ analysisResult.table1.supply_terms.competitor_product }}</td>
                </tr>
                <tr>
                  <td class="dimension-cell">
                    <span class="dimension-label">服务</span>
                  </td>
                  <td>{{ analysisResult.table1.service.my_product }}</td>
                  <td>{{ analysisResult.table1.service.competitor_product }}</td>
                </tr>
                <tr>
                  <td class="dimension-cell">
                    <span class="dimension-label">咨询</span>
                  </td>
                  <td>{{ analysisResult.table1.consulting.my_product }}</td>
                  <td>{{ analysisResult.table1.consulting.competitor_product }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="important-factors">
            <h4>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M3 12h6m6 0h6"/>
              </svg>
              对客户最重要的要素
            </h4>
            <ul class="factors-list">
              <li v-for="factor in analysisResult.most_important_factors_for_customer" :key="factor">
                {{ factor }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 差异化分析 -->
        <div class="result-card animate-fade-in-up">
          <div class="card-header">
            <div class="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M3 12h6m6 0h6"/>
              </svg>
            </div>
            <div class="card-title">
              <h3>差异化分析</h3>
              <p>识别独特优势并制定针对性策略</p>
            </div>
          </div>
          
          <div class="table-wrapper">
            <table class="differentiation-table">
              <thead>
                <tr>
                  <th>您的独有利益</th>
                  <th>用于挖掘这个需求的问题</th>
                  <th>竞争对手的独有利益</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in analysisResult.table2" :key="index">
                  <td class="benefit-cell">{{ item.my_unique_benefit }}</td>
                  <td class="question-cell">{{ item.probing_question }}</td>
                  <td class="competitor-benefit-cell">{{ analysisResult.strategic_recommendations[index]?.my_weakness || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 策略建议 -->
        <div class="result-card animate-fade-in-up">
          <div class="card-header">
            <div class="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M3 12h6m6 0h6"/>
              </svg>
            </div>
            <div class="card-title">
              <h3>策略建议</h3>
              <p>基于分析结果的具体行动建议</p>
            </div>
          </div>
          
          <div class="strategy-grid">
            <div 
              v-for="(recommendation, index) in analysisResult.strategic_recommendations" 
              :key="index"
              class="strategy-item"
            >
              <div class="strategy-header">
                <span class="strategy-number">{{ index + 1 }}</span>
                <h4>应对策略 {{ index + 1 }}</h4>
              </div>
              <div class="strategy-content">
                <div class="challenge">
                  <span class="label">挑战：</span>
                  <span class="value">{{ recommendation.my_weakness }}</span>
                </div>
                <div class="solution">
                  <span class="label">建议：</span>
                  <span class="value">{{ recommendation.overcoming_strategy }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 错误提示 -->
    <div v-if="error" class="error-toast">
      <div class="error-content">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <span>{{ error }}</span>
      </div>
      <button @click="error = ''" class="error-close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { request } from '@/api'

// 表单数据
const formData = ref({
  customerName: '',
  myProduct: '',
  competitorProduct: ''
})

// 状态管理
const loading = ref(false)
const error = ref('')
const analysisResult = ref<any>(null)

// 表单验证
const isFormValid = computed(() => {
  return formData.value.customerName.trim() && 
         formData.value.myProduct.trim() && 
         formData.value.competitorProduct.trim()
})

// 生成分析
const generateAnalysis = async () => {
  if (!isFormValid.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    const response = await request.post<{
      code: number;
      message: string;
      data: {
        analysis_summary: any;
      };
    }>('/competitive-analysis', {
      customer_name: formData.value.customerName,
      my_product: formData.value.myProduct,
      competitor_product: formData.value.competitorProduct
    })
    
    analysisResult.value = (response as any).data.analysis_summary
  } catch (err: any) {
    error.value = err.response?.data?.message || '分析失败，请稍后重试'
    console.error('Analysis error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* ===== 页面整体布局 ===== */
.competitive-analysis {
  min-height: 100vh;
  background: var(--bg-secondary);
}

/* ===== 页面头部 ===== */
.page-header {
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
  padding: var(--space-16) 0 var(--space-20);
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
}

.header-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--primary-500);
  color: white;
  border-radius: var(--radius-2xl);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: var(--space-6);
  animation-delay: 0.1s;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
  animation-delay: 0.2s;
}

.page-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  animation-delay: 0.3s;
}

/* ===== 区域容器 ===== */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* ===== 输入表单区域 ===== */
.input-section {
  padding: var(--space-16) 0;
  margin-top: -var(--space-12);
  position: relative;
  z-index: 2;
}

.form-card {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-light);
  overflow: hidden;
}

.form-header {
  padding: var(--space-8) var(--space-8) 0;
  text-align: center;
}

.form-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.form-header p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.form-content {
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.w-full {
  width: 100%;
}

/* ===== 结果区域 ===== */
.results-section {
  padding: var(--space-16) 0 var(--space-24);
}

.result-card {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  margin-bottom: var(--space-8);
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-8) var(--space-8) 0;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  border-radius: var(--radius-xl);
  color: white;
  flex-shrink: 0;
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

/* ===== 表格样式 ===== */
.table-wrapper {
  padding: var(--space-6) var(--space-8);
  overflow-x: auto;
}

.comparison-table,
.differentiation-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.comparison-table th,
.comparison-table td,
.differentiation-table th,
.differentiation-table td {
  padding: var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--border-light);
}

.comparison-table th,
.differentiation-table th {
  background: var(--bg-tertiary);
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.comparison-table tbody tr:hover,
.differentiation-table tbody tr:hover {
  background: var(--primary-50);
}

.dimension-cell {
  font-weight: 500;
  background: var(--primary-50);
}

.dimension-label {
  color: var(--primary-700);
}

.benefit-cell,
.question-cell,
.competitor-benefit-cell {
  font-size: 0.875rem;
  line-height: 1.5;
}

/* ===== 重要因素 ===== */
.important-factors {
  padding: var(--space-6) var(--space-8) var(--space-8);
}

.important-factors h4 {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.factors-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.factors-list li {
  padding: var(--space-3) var(--space-4);
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  color: var(--text-secondary);
  border-left: 3px solid var(--primary-500);
}

/* ===== 策略网格 ===== */
.strategy-grid {
  padding: var(--space-6) var(--space-8) var(--space-8);
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}

.strategy-item {
  background: var(--bg-tertiary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  border: 1px solid var(--border-light);
  transition: all var(--duration-normal) var(--ease-out);
}

.strategy-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-200);
}

.strategy-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.strategy-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: white;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 0.875rem;
}

.strategy-header h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.strategy-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.challenge,
.solution {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.value {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* ===== 错误提示 ===== */
.error-toast {
  position: fixed;
  top: var(--space-6);
  right: var(--space-6);
  background: var(--bg-primary);
  border: 1px solid #fecaca;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  padding: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  max-width: 400px;
  z-index: 50;
  animation: slideInRight var(--duration-normal) var(--ease-out);
}

.error-content {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: #dc2626;
  font-size: 0.875rem;
}

.error-close {
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  padding: var(--space-1);
  border-radius: var(--radius-md);
  transition: background var(--duration-fast) var(--ease-out);
}

.error-close:hover {
  background: #fecaca;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* ===== 响应式设计 ===== */
@media (max-width: 768px) {
  .page-header {
    padding: var(--space-12) 0 var(--space-16);
  }

  .page-title {
    font-size: 2rem;
  }

  .page-description {
    font-size: 1rem;
  }

  .section-container {
    padding: 0 var(--space-4);
  }

  .input-section {
    margin-top: -var(--space-8);
  }

  .form-content {
    padding: var(--space-6);
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .table-wrapper {
    padding: var(--space-4);
  }

  .comparison-table th,
  .comparison-table td,
  .differentiation-table th,
  .differentiation-table td {
    padding: var(--space-2);
    font-size: 0.75rem;
  }

  .strategy-grid {
    grid-template-columns: 1fr;
    padding: var(--space-4);
  }

  .error-toast {
    top: var(--space-4);
    right: var(--space-4);
    left: var(--space-4);
    max-width: none;
  }
}

@media (max-width: 640px) {
  .page-title {
    font-size: 1.75rem;
  }

  .form-header,
  .form-content {
    padding: var(--space-4);
  }

  .important-factors,
  .strategy-grid {
    padding: var(--space-4);
  }
}

/* ===== 动画延迟 ===== */
.animate-fade-in-up {
  animation-fill-mode: both;
}

.result-card:nth-child(1) { animation-delay: 0.1s; }
.result-card:nth-child(2) { animation-delay: 0.2s; }
.result-card:nth-child(3) { animation-delay: 0.3s; }
</style>