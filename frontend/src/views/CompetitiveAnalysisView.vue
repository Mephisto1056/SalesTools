<template>
  <div class="competitive-analysis">
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
            <span>销售备课助手</span>
          </div>
          
          <h1 class="page-title animate-fade-in-up">竞争分析备课表</h1>
          <p class="page-description animate-fade-in-up">
            填写表单完成竞争分析，AI将为您提供建议和补充
          </p>
        </div>
      </div>
    </section>

    <!-- 步骤进度条 -->
    <section class="progress-section">
      <div class="section-container">
        <div class="progress-wrapper">
          <div class="progress-steps">
            <div 
              v-for="(step, index) in steps" 
              :key="index"
              class="progress-step"
              :class="{
                'active': currentStep === index + 1,
                'completed': currentStep > index + 1,
                'disabled': currentStep < index + 1
              }"
              @click="goToStep(index + 1)"
            >
              <div class="step-circle">
                <svg v-if="currentStep > index + 1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div class="step-label">{{ step.title }}</div>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <section class="main-content">
      <div class="section-container">
        
        <!-- 步骤1: 基础信息 -->
        <div v-if="currentStep === 1" class="step-content">
          <div class="step-card">
            <div class="step-header">
              <h2>步骤1: 基础信息</h2>
              <p>请填写分析所需的基本信息</p>
            </div>
            
            <div class="form-content">
              <div class="form-group">
                <label class="form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  客户名称
                </label>
                <input
                  v-model="formData.customerName"
                  type="text"
                  class="input"
                  placeholder="例如：上海市第六人民医院骨科"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect width="7" height="7" x="3" y="3" rx="1"/>
                    <rect width="7" height="7" x="14" y="3" rx="1"/>
                    <rect width="7" height="7" x="14" y="14" rx="1"/>
                    <rect width="7" height="7" x="3" y="14" rx="1"/>
                  </svg>
                  我的产品
                </label>
                <input
                  v-model="formData.myProduct"
                  type="text"
                  class="input"
                  placeholder="例如：Stryker NAV3i 导航平台"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                  </svg>
                  竞争对手产品
                </label>
                <input
                  v-model="formData.competitorProduct"
                  type="text"
                  class="input"
                  placeholder="例如：Medtronic AxiEM 电磁导航系统"
                />
              </div>
            </div>
            
            <div class="step-actions">
              <button 
                class="btn btn-primary"
                @click="goToStep(2)"
                :disabled="!isStep1Valid"
              >
                下一步
              </button>
            </div>
          </div>
        </div>

        <!-- 步骤2: 产品对比表 -->
        <div v-if="currentStep === 2" class="step-content">
          <div class="step-card">
            <div class="step-header">
              <h2>步骤2: 产品对比分析</h2>
              <p>请填写双方产品的详细信息对比</p>
              <div class="ai-assist-hint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <path d="M12 17h.01"/>
                </svg>
                <span>填写完成后可点击"AI建议"获取补充信息</span>
              </div>
            </div>
            
            <div class="comparison-form">
              <div class="comparison-table-wrapper">
                <table class="comparison-table">
                  <thead>
                    <tr>
                      <th>比较维度</th>
                      <th>我的产品</th>
                      <th>竞争对手产品</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(dimension, index) in comparisonDimensions" :key="index">
                      <td class="dimension-cell">
                        <span class="dimension-label">{{ dimension.label }}</span>
                        <div class="dimension-desc">{{ dimension.description }}</div>
                      </td>
                      <td>
                        <textarea 
                          v-model="formData.comparison[dimension.key].myProduct"
                          class="input textarea-input"
                          :placeholder="dimension.placeholder.my"
                          rows="3"
                        ></textarea>
                      </td>
                      <td>
                        <textarea 
                          v-model="formData.comparison[dimension.key].competitor"
                          class="input textarea-input"
                          :placeholder="dimension.placeholder.competitor"
                          rows="3"
                        ></textarea>
                      </td>
                      <td class="action-cell">
                        <button 
                          class="btn btn-sm btn-secondary"
                          @click="getAISuggestion(dimension.key)"
                          :disabled="aiLoading[dimension.key]"
                        >
                          <svg v-if="aiLoading[dimension.key]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                            <path d="M21 12a9 9 0 11-6.219-8.56"/>
                          </svg>
                          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 12l2 2 4-4"/>
                            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                            <path d="M3 12h6m6 0h6"/>
                          </svg>
                          {{ aiLoading[dimension.key] ? '分析中' : 'AI建议' }}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div class="step-actions">
              <button class="btn btn-secondary" @click="goToStep(1)">上一步</button>
              <button class="btn btn-primary" @click="goToStep(3)">下一步</button>
            </div>
          </div>
        </div>

        <!-- 步骤3: 客户重要要素 -->
        <div v-if="currentStep === 3" class="step-content">
          <div class="step-card">
            <div class="step-header">
              <h2>步骤3: 客户重要要素</h2>
              <p>基于您对客户的了解，选择和排序最重要的要素</p>
            </div>
            
            <div class="factors-section">
              <div class="factors-grid">
                <div 
                  v-for="factor in availableFactors" 
                  :key="factor"
                  class="factor-item"
                  :class="{ 'selected': selectedFactors.includes(factor) }"
                  @click="toggleFactor(factor)"
                >
                  <div class="factor-checkbox">
                    <svg v-if="selectedFactors.includes(factor)" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <span class="factor-label">{{ factor }}</span>
                </div>
              </div>
              
              <div class="custom-factor">
                <label class="form-label">自定义要素</label>
                <div class="custom-factor-input">
                  <input
                    v-model="customFactor"
                    type="text"
                    class="input"
                    placeholder="输入其他重要要素"
                    @keyup.enter="addCustomFactor"
                  />
                  <button 
                    class="btn btn-secondary"
                    @click="addCustomFactor"
                    :disabled="!customFactor.trim()"
                  >
                    添加
                  </button>
                </div>
              </div>

              <div v-if="selectedFactors.length > 0" class="selected-factors">
                <h4>已选择的要素（按重要性排序）</h4>
                <div class="sortable-factors">
                  <div 
                    v-for="(factor, index) in selectedFactors" 
                    :key="factor"
                    class="sortable-factor"
                  >
                    <span class="factor-rank">{{ index + 1 }}</span>
                    <span class="factor-name">{{ factor }}</span>
                    <div class="factor-controls">
                      <button 
                        v-if="index > 0"
                        class="btn btn-xs btn-secondary"
                        @click="moveFactor(index, -1)"
                      >
                        ↑
                      </button>
                      <button 
                        v-if="index < selectedFactors.length - 1"
                        class="btn btn-xs btn-secondary"
                        @click="moveFactor(index, 1)"
                      >
                        ↓
                      </button>
                      <button 
                        class="btn btn-xs btn-danger"
                        @click="removeFactor(factor)"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="step-actions">
              <button class="btn btn-secondary" @click="goToStep(2)">上一步</button>
              <button 
                class="btn btn-primary" 
                @click="goToStep(4)"
                :disabled="selectedFactors.length === 0"
              >
                下一步
              </button>
            </div>
          </div>
        </div>

        <!-- 步骤4: 独有利益识别 -->
        <div v-if="currentStep === 4" class="step-content">
          <div class="step-card">
            <div class="step-header">
              <h2>步骤4: 我方独有利益</h2>
              <p>列出我方产品相对于竞争对手的独有利益</p>
              <div class="ai-assist-hint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <path d="M12 17h.01"/>
                </svg>
                <span>可点击"AI分析"获取建议，然后手动编辑完善</span>
              </div>
            </div>
            
            <div class="benefits-section">
              <div class="section-actions">
                <button 
                  class="btn btn-secondary"
                  @click="getUniqueBenefitsSuggestion"
                  :disabled="loading"
                >
                  <svg v-if="loading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                    <path d="M3 12h6m6 0h6"/>
                  </svg>
                  {{ loading ? 'AI分析中...' : 'AI分析独有利益' }}
                </button>
                
                <button 
                  class="btn btn-primary"
                  @click="addUniqueBenefit"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  添加独有利益
                </button>
              </div>

              <div class="benefits-list">
                <div 
                  v-for="(benefit, index) in formData.uniqueBenefits" 
                  :key="index"
                  class="benefit-item"
                >
                  <div class="benefit-header">
                    <h4>独有利益 {{ index + 1 }}</h4>
                    <button 
                      class="btn btn-xs btn-danger"
                      @click="removeUniqueBenefit(index)"
                    >
                      删除
                    </button>
                  </div>
                  <div class="benefit-content">
                    <div class="form-group">
                      <label class="form-label">利益描述</label>
                      <textarea 
                        v-model="benefit.description"
                        class="input"
                        placeholder="描述这个独有利益..."
                        rows="2"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label class="form-label">对客户的价值</label>
                      <textarea 
                        v-model="benefit.value"
                        class="input"
                        placeholder="这个利益为客户带来什么价值..."
                        rows="2"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label class="form-label">支撑证据</label>
                      <textarea 
                        v-model="benefit.evidence"
                        class="input"
                        placeholder="支撑这个利益的具体证据或数据..."
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="step-actions">
              <button class="btn btn-secondary" @click="goToStep(3)">上一步</button>
              <button class="btn btn-primary" @click="goToStep(5)">下一步</button>
            </div>
          </div>
        </div>

        <!-- 步骤5: 探索性问题 -->
        <div v-if="currentStep === 5" class="step-content">
          <div class="step-card">
            <div class="step-header">
              <h2>步骤5: 探索性问题设计</h2>
              <p>为每个独有利益设计探索性问题，引导客户认识需求</p>
              <div class="ai-assist-hint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <path d="M12 17h.01"/>
                </svg>
                <span>可点击"AI生成"获取问题建议，然后手动编辑完善</span>
              </div>
            </div>
            
            <div class="questions-section">
              <div class="section-actions">
                <button
                  class="btn btn-secondary"
                  @click="generateProbingQuestions"
                  :disabled="loading || formData.uniqueBenefits.length === 0"
                >
                  <svg v-if="loading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                    <path d="M3 12h6m6 0h6"/>
                  </svg>
                  {{ loading ? 'AI生成中...' : 'AI生成问题' }}
                </button>
              </div>

              <div class="questions-list">
                <div
                  v-for="(benefit, index) in formData.uniqueBenefits"
                  :key="index"
                  class="question-group"
                >
                  <div class="question-header">
                    <h4>{{ benefit.description }}</h4>
                  </div>
                  <div class="question-content">
                    <div class="form-group">
                      <label class="form-label">探索性问题1</label>
                      <textarea
                        v-model="formData.probingQuestions[index].question1"
                        class="input"
                        placeholder="设计一个引导客户思考痛点的问题..."
                        rows="2"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label class="form-label">探索性问题2</label>
                      <textarea
                        v-model="formData.probingQuestions[index].question2"
                        class="input"
                        placeholder="设计一个引导客户表达需求的问题..."
                        rows="2"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label class="form-label">问题目的</label>
                      <textarea
                        v-model="formData.probingQuestions[index].purpose"
                        class="input"
                        placeholder="这些问题的设计目的和预期效果..."
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="step-actions">
              <button class="btn btn-secondary" @click="goToStep(4)">上一步</button>
              <button class="btn btn-primary" @click="goToStep(6)">下一步</button>
            </div>
          </div>
        </div>

        <!-- 步骤6: 共同利益分析 -->
        <div v-if="currentStep === 6" class="step-content">
          <div class="step-card">
            <div class="step-header">
              <h2>步骤6: 共同利益差异化</h2>
              <p>分析双方都具备的利益，制定差异化说服策略</p>
              <div class="ai-assist-hint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <path d="M12 17h.01"/>
                </svg>
                <span>可点击"AI分析"获取建议，然后手动编辑完善</span>
              </div>
            </div>
            
            <div class="common-benefits-section">
              <div class="section-actions">
                <button
                  class="btn btn-secondary"
                  @click="analyzeCommonBenefits"
                  :disabled="loading"
                >
                  <svg v-if="loading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                    <path d="M3 12h6m6 0h6"/>
                  </svg>
                  {{ loading ? 'AI分析中...' : 'AI分析共同利益' }}
                </button>
                
                <button
                  class="btn btn-primary"
                  @click="addCommonBenefit"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  添加共同利益
                </button>
              </div>

              <div class="common-benefits-list">
                <div
                  v-for="(benefit, index) in formData.commonBenefits"
                  :key="index"
                  class="common-benefit-item"
                >
                  <div class="benefit-header">
                    <h4>共同利益 {{ index + 1 }}</h4>
                    <button
                      class="btn btn-xs btn-danger"
                      @click="removeCommonBenefit(index)"
                    >
                      删除
                    </button>
                  </div>
                  <div class="benefit-content">
                    <div class="form-group">
                      <label class="form-label">共同利益描述</label>
                      <textarea
                        v-model="benefit.description"
                        class="input"
                        placeholder="双方都能提供的利益..."
                        rows="2"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label class="form-label">我方优势</label>
                      <textarea
                        v-model="benefit.myAdvantage"
                        class="input"
                        placeholder="我方在此利益上的具体优势..."
                        rows="2"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label class="form-label">说服要点</label>
                      <textarea
                        v-model="benefit.persuasionPoints"
                        class="input"
                        placeholder="如何说服客户选择我方..."
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="step-actions">
              <button class="btn btn-secondary" @click="goToStep(5)">上一步</button>
              <button class="btn btn-primary" @click="goToStep(7)">下一步</button>
            </div>
          </div>
        </div>

        <!-- 步骤7: 劣势应对策略 -->
        <div v-if="currentStep === 7" class="step-content">
          <div class="step-card">
            <div class="step-header">
              <h2>步骤7: 劣势应对策略</h2>
              <p>识别我方劣势并制定应对策略</p>
              <div class="ai-assist-hint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <path d="M12 17h.01"/>
                </svg>
                <span>可点击"AI分析"获取建议，然后手动编辑完善</span>
              </div>
            </div>
            
            <div class="weaknesses-section">
              <div class="section-actions">
                <button
                  class="btn btn-secondary"
                  @click="analyzeWeaknesses"
                  :disabled="loading"
                >
                  <svg v-if="loading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                    <path d="M3 12h6m6 0h6"/>
                  </svg>
                  {{ loading ? 'AI分析中...' : 'AI分析劣势' }}
                </button>
                
                <button
                  class="btn btn-primary"
                  @click="addWeakness"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  添加劣势
                </button>
              </div>

              <div class="weaknesses-list">
                <div
                  v-for="(weakness, index) in formData.weaknesses"
                  :key="index"
                  class="weakness-item"
                >
                  <div class="weakness-header">
                    <h4>劣势 {{ index + 1 }}</h4>
                    <button
                      class="btn btn-xs btn-danger"
                      @click="removeWeakness(index)"
                    >
                      删除
                    </button>
                  </div>
                  <div class="weakness-content">
                    <div class="form-group">
                      <label class="form-label">我方劣势</label>
                      <textarea
                        v-model="weakness.description"
                        class="input"
                        placeholder="描述我方的具体劣势..."
                        rows="2"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label class="form-label">竞争对手优势</label>
                      <textarea
                        v-model="weakness.competitorAdvantage"
                        class="input"
                        placeholder="竞争对手在此方面的优势..."
                        rows="2"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label class="form-label">应对策略</label>
                      <textarea
                        v-model="weakness.strategy"
                        class="input"
                        placeholder="如何应对这个劣势..."
                        rows="3"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label class="form-label">转移焦点</label>
                      <textarea
                        v-model="weakness.alternativeFocus"
                        class="input"
                        placeholder="可以转移到我方哪个优势..."
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="step-actions">
              <button class="btn btn-secondary" @click="goToStep(6)">上一步</button>
              <button class="btn btn-primary" @click="goToStep(8)">下一步</button>
            </div>
          </div>
        </div>

        <!-- 步骤8: 总结与导出 -->
        <div v-if="currentStep === 8" class="step-content">
          <div class="step-card">
            <div class="step-header">
              <h2>步骤5: 总结与导出</h2>
              <p>查看完整的竞争分析备课材料</p>
            </div>
            
            <div class="summary-content">
              <div class="summary-overview">
                <h3>分析概览</h3>
                <div class="overview-grid">
                  <div class="overview-item">
                    <span class="overview-label">客户</span>
                    <span class="overview-value">{{ formData.customerName }}</span>
                  </div>
                  <div class="overview-item">
                    <span class="overview-label">我的产品</span>
                    <span class="overview-value">{{ formData.myProduct }}</span>
                  </div>
                  <div class="overview-item">
                    <span class="overview-label">竞争对手</span>
                    <span class="overview-value">{{ formData.competitorProduct }}</span>
                  </div>
                  <div class="overview-item">
                    <span class="overview-label">重要要素</span>
                    <span class="overview-value">{{ selectedFactors.join(', ') }}</span>
                  </div>
                </div>
              </div>
              
              <div class="action-buttons">
                <button 
                  class="btn btn-primary"
                  @click="exportReport"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                  导出报告
                </button>
                
                <button class="btn btn-secondary" @click="startNewAnalysis">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M3 21v-5h5"/>
                  </svg>
                  重新开始
                </button>
              </div>
            </div>
            
            <div class="step-actions">
              <button class="btn btn-secondary" @click="goToStep(7)">上一步</button>
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
import { ref, computed, reactive } from 'vue'
import { request, type ApiResponse } from '@/api'

// API响应类型定义
interface SessionResponse {
  session_id: string;
  basic_info: {
    customer_name: string;
    my_product: string;
    competitor_product: string;
  };
}

interface DimensionSuggestion {
  my_product: string;
  competitor_product: string;
}

// 步骤定义
const steps = [
  { title: '基础信息', description: '填写客户和产品信息' },
  { title: '产品分析', description: '分析产品特征和利益' },
  { title: '要素识别', description: '确定客户重要要素' },
  { title: '独有利益', description: '识别我方独有利益' },
  { title: '探索问题', description: '设计探索性问题' },
  { title: '共同利益', description: '分析共同利益点' },
  { title: '劣势应对', description: '制定劣势应对策略' },
  { title: '总结导出', description: '生成完整报告' }
]

// 当前步骤
const currentStep = ref(1)

// 表单数据
const formData = reactive({
  customerName: '',
  myProduct: '',
  competitorProduct: '',
  sessionId: '', // 添加会话ID
  comparison: {
    features: { myProduct: '', competitor: '' },
    benefits: { myProduct: '', competitor: '' },
    price: { myProduct: '', competitor: '' },
    supply_terms: { myProduct: '', competitor: '' },
    service: { myProduct: '', competitor: '' },
    consulting: { myProduct: '', competitor: '' }
  },
  uniqueBenefits: [] as Array<{
    description: string;
    value: string;
    evidence: string;
  }>,
  probingQuestions: [] as Array<{
    question1: string;
    question2: string;
    purpose: string;
  }>,
  commonBenefits: [] as Array<{
    description: string;
    myAdvantage: string;
    persuasionPoints: string;
  }>,
  weaknesses: [] as Array<{
    description: string;
    competitorAdvantage: string;
    strategy: string;
    alternativeFocus: string;
  }>
})

// 对比维度定义
const comparisonDimensions = [
  {
    key: 'features',
    label: '特征',
    description: '核心功能、技术特点、规格参数',
    placeholder: {
      my: '描述我方产品的核心特征...',
      competitor: '描述竞争对手产品的核心特征...'
    }
  },
  {
    key: 'benefits',
    label: '利益',
    description: '为客户带来的实际价值',
    placeholder: {
      my: '我方产品为客户带来的利益...',
      competitor: '竞争对手产品为客户带来的利益...'
    }
  },
  {
    key: 'price',
    label: '价格',
    description: '价格定位、商业模式、成本效益',
    placeholder: {
      my: '我方产品的价格策略...',
      competitor: '竞争对手的价格策略...'
    }
  },
  {
    key: 'supply_terms',
    label: '供货条件',
    description: '交付周期、供货能力、地域覆盖',
    placeholder: {
      my: '我方的供货条件...',
      competitor: '竞争对手的供货条件...'
    }
  },
  {
    key: 'service',
    label: '服务',
    description: '售后服务、技术支持、培训',
    placeholder: {
      my: '我方提供的服务...',
      competitor: '竞争对手提供的服务...'
    }
  },
  {
    key: 'consulting',
    label: '咨询',
    description: '实施咨询、流程优化、增值服务',
    placeholder: {
      my: '我方的咨询服务...',
      competitor: '竞争对手的咨询服务...'
    }
  }
]

// 状态管理
const loading = ref(false)
const error = ref('')
const aiLoading = reactive<{ [key: string]: boolean }>({})

// 可选要素
const availableFactors = [
  '性价比',
  '技术先进性',
  '服务质量',
  '供货稳定性',
  '品牌知名度',
  '易用性',
  '安全性',
  '可扩展性',
  '培训支持',
  '本地化服务'
]

const selectedFactors = ref<string[]>([])
const customFactor = ref('')

// 计算属性
const progressPercentage = computed(() => {
  return ((currentStep.value - 1) / (steps.length - 1)) * 100
})

const isStep1Valid = computed(() => {
  return formData.customerName.trim() && 
         formData.myProduct.trim() && 
         formData.competitorProduct.trim()
})

// 方法
const goToStep = async (step: number) => {
  if (step >= 1 && step <= steps.length) {
    // 如果是从步骤1到步骤2，需要初始化会话
    if (currentStep.value === 1 && step === 2 && !formData.sessionId) {
      await initSession()
    }
    currentStep.value = step
  }
}

// 初始化分析会话
const initSession = async () => {
  if (!isStep1Valid.value) {
    error.value = '请先完成基础信息填写'
    return
  }

  try {
    loading.value = true
    const response = await request.post<ApiResponse<SessionResponse>>('/competitive-analysis/init', {
      customer_name: formData.customerName,
      my_product: formData.myProduct,
      competitor_product: formData.competitorProduct
    })
    
    if (response.code === 200) {
      formData.sessionId = response.data.session_id
      console.log('会话初始化成功:', formData.sessionId)
    } else {
      throw new Error(response.message || '会话初始化失败')
    }
  } catch (err: any) {
    console.error('会话初始化错误:', err)
    error.value = err.message || '会话初始化失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const getAISuggestion = async (dimension: string) => {
  aiLoading[dimension] = true
  error.value = ''
  
  try {
    // 确保有会话ID
    if (!formData.sessionId) {
      await initSession()
      if (!formData.sessionId) {
        throw new Error('会话初始化失败')
      }
    }

    console.log('调用AI建议API:', dimension, formData.sessionId)
    
    // 调用后端AI建议API
    const response = await request.post<ApiResponse<DimensionSuggestion>>('/competitive-analysis/ai-assist/dimension', {
      session_id: formData.sessionId,
      dimension: dimension
    })
    
    if (response.code === 200 && response.data) {
      const suggestion = response.data
      console.log('AI建议响应:', suggestion)
      
      // 更新对应维度的数据
      if (suggestion.my_product && !formData.comparison[dimension as keyof typeof formData.comparison].myProduct) {
        formData.comparison[dimension as keyof typeof formData.comparison].myProduct = suggestion.my_product
      }
      if (suggestion.competitor_product && !formData.comparison[dimension as keyof typeof formData.comparison].competitor) {
        formData.comparison[dimension as keyof typeof formData.comparison].competitor = suggestion.competitor_product
      }
    } else {
      throw new Error(response.message || 'AI建议获取失败')
    }
  } catch (err: any) {
    console.error('AI建议获取错误:', err)
    error.value = err.message || 'AI建议获取失败，请稍后重试'
  } finally {
    aiLoading[dimension] = false
  }
}

const toggleFactor = (factor: string) => {
  const index = selectedFactors.value.indexOf(factor)
  if (index > -1) {
    selectedFactors.value.splice(index, 1)
  } else {
    selectedFactors.value.push(factor)
  }
}

const addCustomFactor = () => {
  if (customFactor.value.trim() && !selectedFactors.value.includes(customFactor.value.trim())) {
    selectedFactors.value.push(customFactor.value.trim())
    customFactor.value = ''
  }
}

const moveFactor = (index: number, direction: number) => {
  const newIndex = index + direction
  if (newIndex >= 0 && newIndex < selectedFactors.value.length) {
    const factor = selectedFactors.value.splice(index, 1)[0]
    selectedFactors.value.splice(newIndex, 0, factor)
  }
}

const removeFactor = (factor: string) => {
  const index = selectedFactors.value.indexOf(factor)
  if (index > -1) {
    selectedFactors.value.splice(index, 1)
  }
}

const addUniqueBenefit = () => {
  formData.uniqueBenefits.push({
    description: '',
    value: '',
    evidence: ''
  })
  
  // 同时添加对应的探索性问题
  formData.probingQuestions.push({
    question1: '',
    question2: '',
    purpose: ''
  })
}

const removeUniqueBenefit = (index: number) => {
  formData.uniqueBenefits.splice(index, 1)
  // 同时删除对应的探索性问题
  if (formData.probingQuestions[index]) {
    formData.probingQuestions.splice(index, 1)
  }
}

const getUniqueBenefitsSuggestion = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // 确保有会话ID
    if (!formData.sessionId) {
      await initSession()
      if (!formData.sessionId) {
        throw new Error('会话初始化失败')
      }
    }

    console.log('调用独有利益AI建议API:', formData.sessionId)
    
    // 调用后端AI建议API
    const response = await request.post<ApiResponse<{ suggested_benefits: Array<{
      description: string;
      value: string;
      evidence: string;
      sales_angle: string;
    }> }>>('/competitive-analysis/ai-assist/unique-benefits', {
      session_id: formData.sessionId,
      comparison_data: formData.comparison,
      important_factors: selectedFactors.value
    })
    
    if (response.code === 200 && response.data?.suggested_benefits) {
      const suggestions = response.data.suggested_benefits
      console.log('独有利益AI建议响应:', suggestions)
      
      // 添加AI建议的独有利益
      suggestions.forEach(suggestion => {
        if (formData.uniqueBenefits.length < 5) {
          formData.uniqueBenefits.push({
            description: suggestion.description,
            value: suggestion.value,
            evidence: suggestion.evidence
          })
          
          // 同时添加对应的探索性问题占位
          formData.probingQuestions.push({
            question1: '',
            question2: '',
            purpose: ''
          })
        }
      })
    } else {
      throw new Error(response.message || '独有利益AI建议获取失败')
    }
  } catch (err: any) {
    console.error('独有利益AI建议获取错误:', err)
    error.value = err.message || 'AI分析失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const generateProbingQuestions = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // 确保有会话ID
    if (!formData.sessionId) {
      await initSession()
      if (!formData.sessionId) {
        throw new Error('会话初始化失败')
      }
    }

    console.log('调用探索性问题AI生成API:', formData.sessionId)
    
    // 调用后端AI建议API
    const response = await request.post<ApiResponse<{ question_suggestions: Array<{
      benefit: string;
      question1: string;
      question2: string;
      purpose: string;
      usage_tips: string;
    }> }>>('/competitive-analysis/ai-assist/probing-questions', {
      session_id: formData.sessionId,
      unique_benefits: formData.uniqueBenefits
    })
    
    if (response.code === 200 && response.data?.question_suggestions) {
      const suggestions = response.data.question_suggestions
      console.log('探索性问题AI建议响应:', suggestions)
      
      // 更新探索性问题
      suggestions.forEach((suggestion, index) => {
        if (formData.probingQuestions[index]) {
          formData.probingQuestions[index].question1 = suggestion.question1
          formData.probingQuestions[index].question2 = suggestion.question2
          formData.probingQuestions[index].purpose = suggestion.purpose
        }
      })
    } else {
      throw new Error(response.message || '探索性问题AI生成失败')
    }
  } catch (err: any) {
    console.error('探索性问题AI生成错误:', err)
    error.value = err.message || 'AI生成失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const addCommonBenefit = () => {
  formData.commonBenefits.push({
    description: '',
    myAdvantage: '',
    persuasionPoints: ''
  })
}

const removeCommonBenefit = (index: number) => {
  formData.commonBenefits.splice(index, 1)
}

const analyzeCommonBenefits = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // 确保有会话ID
    if (!formData.sessionId) {
      await initSession()
      if (!formData.sessionId) {
        throw new Error('会话初始化失败')
      }
    }

    console.log('调用共同利益AI分析API:', formData.sessionId)
    
    // 调用后端AI建议API
    const response = await request.post<ApiResponse<{ common_benefit_suggestions: Array<{
      description: string;
      my_advantage: string;
      persuasion_points: string;
      talking_points: string;
    }> }>>('/competitive-analysis/ai-assist/common-benefits', {
      session_id: formData.sessionId,
      comparison_data: formData.comparison
    })
    
    if (response.code === 200 && response.data?.common_benefit_suggestions) {
      const suggestions = response.data.common_benefit_suggestions
      console.log('共同利益AI建议响应:', suggestions)
      
      // 添加AI建议的共同利益
      suggestions.forEach(suggestion => {
        if (formData.commonBenefits.length < 5) {
          formData.commonBenefits.push({
            description: suggestion.description,
            myAdvantage: suggestion.my_advantage,
            persuasionPoints: suggestion.persuasion_points
          })
        }
      })
    } else {
      throw new Error(response.message || '共同利益AI分析失败')
    }
  } catch (err: any) {
    console.error('共同利益AI分析错误:', err)
    error.value = err.message || 'AI分析失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const addWeakness = () => {
  formData.weaknesses.push({
    description: '',
    competitorAdvantage: '',
    strategy: '',
    alternativeFocus: ''
  })
}

const removeWeakness = (index: number) => {
  formData.weaknesses.splice(index, 1)
}

const analyzeWeaknesses = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // 确保有会话ID
    if (!formData.sessionId) {
      await initSession()
      if (!formData.sessionId) {
        throw new Error('会话初始化失败')
      }
    }

    console.log('调用劣势应对AI分析API:', formData.sessionId)
    
    // 调用后端AI建议API
    const response = await request.post<ApiResponse<{ weakness_suggestions: Array<{
      description: string;
      competitor_advantage: string;
      strategy: string;
      alternative_focus: string;
      response_framework: string;
    }> }>>('/competitive-analysis/ai-assist/weakness-strategy', {
      session_id: formData.sessionId,
      comparison_data: formData.comparison
    })
    
    if (response.code === 200 && response.data?.weakness_suggestions) {
      const suggestions = response.data.weakness_suggestions
      console.log('劣势应对AI建议响应:', suggestions)
      
      // 添加AI建议的劣势分析
      suggestions.forEach(suggestion => {
        if (formData.weaknesses.length < 5) {
          formData.weaknesses.push({
            description: suggestion.description,
            competitorAdvantage: suggestion.competitor_advantage,
            strategy: suggestion.strategy,
            alternativeFocus: suggestion.alternative_focus
          })
        }
      })
    } else {
      throw new Error(response.message || '劣势应对AI分析失败')
    }
  } catch (err: any) {
    console.error('劣势应对AI分析错误:', err)
    error.value = err.message || 'AI分析失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const exportReport = () => {
  // TODO: 实现报告导出功能
  alert('报告导出功能开发中...')
}

const startNewAnalysis = () => {
  // 重置所有数据
  currentStep.value = 1
  formData.customerName = ''
  formData.myProduct = ''
  formData.competitorProduct = ''
  
  // 重置对比数据
  Object.keys(formData.comparison).forEach(key => {
    formData.comparison[key as keyof typeof formData.comparison] = { myProduct: '', competitor: '' }
  })
  
  formData.uniqueBenefits = []
  formData.probingQuestions = []
  formData.commonBenefits = []
  formData.weaknesses = []
  selectedFactors.value = []
  error.value = ''
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

/* ===== 进度条区域 ===== */
.progress-section {
  padding: var(--space-8) 0;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
}

.progress-wrapper {
  position: relative;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.progress-step.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: var(--space-2);
  transition: all 0.3s ease;
  border: 2px solid var(--border-light);
  background: var(--bg-primary);
  color: var(--text-secondary);
  position: relative;
  z-index: 3;
}

.progress-step.active .step-circle {
  background: var(--primary-500);
  border-color: var(--primary-500);
  color: white;
}

.progress-step.completed .step-circle {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-color: #f97316;
  color: white;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
}

.step-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-align: center;
}

.progress-step.active .step-label {
  color: var(--primary-500);
}

.progress-step.completed .step-label {
  color: var(--success-500);
}

.progress-bar {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  height: 2px;
  background: var(--border-light);
  z-index: 1;
}

.progress-fill {
  height: 100%;
  background: var(--primary-500);
  transition: width 0.5s ease;
}

/* ===== 主要内容区域 ===== */
.main-content {
  padding: var(--space-16) 0 var(--space-24);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.step-content {
  max-width: 1000px;
  margin: 0 auto;
}

.step-card {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  overflow: hidden;
}

.step-header {
  padding: var(--space-8) var(--space-8) var(--space-4);
  text-align: center;
  border-bottom: 1px solid var(--border-light);
}

.step-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.step-header p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.ai-assist-hint {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--primary-50);
  border-radius: var(--radius-lg);
  color: var(--primary-700);
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

.input {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-100);
}

.textarea-input {
  resize: vertical;
  min-height: 60px;
}

.step-actions {
  padding: var(--space-6) var(--space-8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border-light);
  background: var(--bg-secondary);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--primary-500);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-600);
}

.btn-secondary {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--bg-secondary);
}

.btn-danger {
  background: var(--error-500);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: var(--error-600);
}

.btn-sm {
  padding: var(--space-2) var(--space-3);
  font-size: 0.75rem;
}

.btn-xs {
  padding: var(--space-1) var(--space-2);
  font-size: 0.75rem;
}

/* ===== 对比表格 ===== */
.comparison-table-wrapper {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--space-4) 0;
}

.comparison-table th,
.comparison-table td {
  padding: var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--border-light);
  vertical-align: top;
}

.comparison-table th {
  background: var(--bg-secondary);
  font-weight: 600;
  color: var(--text-primary);
}

.dimension-cell {
  font-weight: 500;
  color: var(--text-primary);
  background: var(--bg-secondary);
  min-width: 120px;
}

.dimension-label {
  display: block;
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.dimension-desc {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: normal;
}

.action-cell {
  width: 100px;
  text-align: center;
}

/* ===== 要素选择 ===== */
.factors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.factor-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.factor-item:hover {
  border-color: var(--primary-300);
  background: var(--primary-50);
}

.factor-item.selected {
  border-color: var(--primary-500);
  background: var(--primary-100);
}

.factor-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-light);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.factor-item.selected .factor-checkbox {
  border-color: var(--primary-500);
  background: var(--primary-500);
  color: white;
}

.custom-factor-input {
  display: flex;
  gap: var(--space-3);
}

.custom-factor-input .input {
  flex: 1;
}

.selected-factors {
  margin-top: var(--space-6);
  padding: var(--space-4);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.selected-factors h4 {
  margin-bottom: var(--space-4);
  color: var(--text-primary);
}

.sortable-factors {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sortable-factor {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.factor-rank {
  width: 24px;
  height: 24px;
  background: var(--primary-500);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.factor-name {
  flex: 1;
  font-weight: 500;
}

.factor-controls {
  display: flex;
  gap: var(--space-1);
}

/* ===== 利益列表 ===== */
.section-actions {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  padding: 0 var(--space-8);
}

.benefits-list {
  padding: 0 var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.benefit-item {
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.benefit-header {
  padding: var(--space-4) var(--space-6);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.benefit-header h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.benefit-content {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* ===== 总结区域 ===== */
.summary-content {
  padding: var(--space-8);
}

.summary-overview {
  margin-bottom: var(--space-8);
}

.summary-overview h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-4);
}

.overview-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-4);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.overview-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.overview-value {
  font-size: 0.875rem;
  color: var(--text-primary);
}

.action-buttons {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

/* ===== 错误提示 ===== */
.error-toast {
  position: fixed;
  top: var(--space-6);
  right: var(--space-6);
  background: var(--error-500);
  color: white;
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  z-index: 1000;
  max-width: 400px;
}

.error-content {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex: 1;
}

.error-close {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: var(--space-1);
  border-radius: var(--radius-sm);
  transition: background 0.2s ease;
}

.error-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* ===== 动画 ===== */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
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
  
  .progress-steps {
    flex-wrap: wrap;
    gap: var(--space-4);
  }
  
  .step-circle {
    width: 32px;
    height: 32px;
    font-size: 0.75rem;
  }
  
  .step-label {
    font-size: 0.625rem;
  }
  
  .factors-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .step-actions {
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .comparison-table {
    font-size: 0.75rem;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: var(--space-2);
  }
  
  .section-actions {
    flex-direction: column;
  }
}
</style>