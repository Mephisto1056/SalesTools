<template>
  <div class="self-test">
    <!-- 页面头部 -->
    <section class="page-header">
      <div class="header-container">
        <div class="header-content">
          <div class="header-badge animate-fade-in-up">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
              <path d="M3 12c1 0 3-1-3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
              <path d="M3 12h6m6 0h6"/>
            </svg>
            <span>能力评估工具</span>
          </div>
          
          <h1 class="page-title animate-fade-in-up">销售辅导能力评估</h1>
          <p class="page-description animate-fade-in-up">
            通过科学的评估体系，全面了解您的销售辅导能力水平，
            并获得个性化的改进建议和行动计划。
          </p>
          
          <div class="assessment-info animate-fade-in-up">
            <div class="info-item">
              <span class="info-label">评估维度</span>
              <span class="info-value">4个核心维度</span>
            </div>
            <div class="info-item">
              <span class="info-label">评估题目</span>
              <span class="info-value">40道专业题目</span>
            </div>
            <div class="info-item">
              <span class="info-label">评估时间</span>
              <span class="info-value">约15-20分钟</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 评估表单区域 -->
    <section class="assessment-section">
      <div class="section-container">
        <div class="assessment-form">
          <!-- Trust 维度 -->
          <div class="dimension-card animate-fade-in-up">
            <div class="dimension-header">
              <div class="dimension-icon trust">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div class="dimension-title">
                <h2>Trust（信任建设）</h2>
                <p>评估您建立信任环境和安全沟通的能力</p>
              </div>
            </div>

            <!-- 信任环境创建能力 -->
            <div class="subsection">
              <h3 class="subsection-title">信任环境创建能力</h3>
              <div class="question-group">
                <div v-for="(question, index) in trustQuestions.environment" :key="index" class="question-item">
                  <label class="question-label">{{ question }}</label>
                  <div class="rating-group">
                    <label v-for="score in 5" :key="score" class="rating-option">
                      <input 
                        type="radio" 
                        :name="`trust_env_${index}`" 
                        :value="score"
                        v-model="scores.trust.environment[index]"
                      />
                      <span class="rating-button">{{ score }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 安全沟通建立 -->
            <div class="subsection">
              <h3 class="subsection-title">安全沟通建立</h3>
              <div class="question-group">
                <div v-for="(question, index) in trustQuestions.communication" :key="index" class="question-item">
                  <label class="question-label">{{ question }}</label>
                  <div class="rating-group">
                    <label v-for="score in 5" :key="score" class="rating-option">
                      <input 
                        type="radio" 
                        :name="`trust_comm_${index}`" 
                        :value="score"
                        v-model="scores.trust.communication[index]"
                      />
                      <span class="rating-button">{{ score }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Connect 维度 -->
          <div class="dimension-card animate-fade-in-up">
            <div class="dimension-header">
              <div class="dimension-icon connect">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="m22 2-5 10-5-5 10-5z"/>
                </svg>
              </div>
              <div class="dimension-title">
                <h2>Connect（深度连接）</h2>
                <p>评估您的需求洞察和深度对话技巧</p>
              </div>
            </div>

            <!-- 需求洞察能力 -->
            <div class="subsection">
              <h3 class="subsection-title">需求洞察能力</h3>
              <div class="question-group">
                <div v-for="(question, index) in connectQuestions.insight" :key="index" class="question-item">
                  <label class="question-label">{{ question }}</label>
                  <div class="rating-group">
                    <label v-for="score in 5" :key="score" class="rating-option">
                      <input 
                        type="radio" 
                        :name="`connect_insight_${index}`" 
                        :value="score"
                        v-model="scores.connect.insight[index]"
                      />
                      <span class="rating-button">{{ score }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 深度对话技巧 -->
            <div class="subsection">
              <h3 class="subsection-title">深度对话技巧</h3>
              <div class="question-group">
                <div v-for="(question, index) in connectQuestions.dialogue" :key="index" class="question-item">
                  <label class="question-label">{{ question }}</label>
                  <div class="rating-group">
                    <label v-for="score in 5" :key="score" class="rating-option">
                      <input 
                        type="radio" 
                        :name="`connect_dialogue_${index}`" 
                        :value="score"
                        v-model="scores.connect.dialogue[index]"
                      />
                      <span class="rating-button">{{ score }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Enable 维度 -->
          <div class="dimension-card animate-fade-in-up">
            <div class="dimension-header">
              <div class="dimension-icon enable">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="m7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div class="dimension-title">
                <h2>Enable（精准赋能）</h2>
                <p>评估您的个性化支持和能力建设效果</p>
              </div>
            </div>

            <!-- 个性化支持能力 -->
            <div class="subsection">
              <h3 class="subsection-title">个性化支持能力</h3>
              <div class="question-group">
                <div v-for="(question, index) in enableQuestions.support" :key="index" class="question-item">
                  <label class="question-label">{{ question }}</label>
                  <div class="rating-group">
                    <label v-for="score in 5" :key="score" class="rating-option">
                      <input 
                        type="radio" 
                        :name="`enable_support_${index}`" 
                        :value="score"
                        v-model="scores.enable.support[index]"
                      />
                      <span class="rating-button">{{ score }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 能力建设效果 -->
            <div class="subsection">
              <h3 class="subsection-title">能力建设效果</h3>
              <div class="question-group">
                <div v-for="(question, index) in enableQuestions.effectiveness" :key="index" class="question-item">
                  <label class="question-label">{{ question }}</label>
                  <div class="rating-group">
                    <label v-for="score in 5" :key="score" class="rating-option">
                      <input 
                        type="radio" 
                        :name="`enable_effect_${index}`" 
                        :value="score"
                        v-model="scores.enable.effectiveness[index]"
                      />
                      <span class="rating-button">{{ score }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Develop 维度 -->
          <div class="dimension-card animate-fade-in-up">
            <div class="dimension-header">
              <div class="dimension-icon develop">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="m2 17 10 5 10-5"/>
                  <path d="m2 12 10 5 10-5"/>
                </svg>
              </div>
              <div class="dimension-title">
                <h2>Develop（持续发展）</h2>
                <p>评估您的自主成长培养和能力传承建设</p>
              </div>
            </div>

            <!-- 自主成长培养 -->
            <div class="subsection">
              <h3 class="subsection-title">自主成长培养</h3>
              <div class="question-group">
                <div v-for="(question, index) in developQuestions.growth" :key="index" class="question-item">
                  <label class="question-label">{{ question }}</label>
                  <div class="rating-group">
                    <label v-for="score in 5" :key="score" class="rating-option">
                      <input 
                        type="radio" 
                        :name="`develop_growth_${index}`" 
                        :value="score"
                        v-model="scores.develop.growth[index]"
                      />
                      <span class="rating-button">{{ score }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 能力传承建设 -->
            <div class="subsection">
              <h3 class="subsection-title">能力传承建设</h3>
              <div class="question-group">
                <div v-for="(question, index) in developQuestions.inheritance" :key="index" class="question-item">
                  <label class="question-label">{{ question }}</label>
                  <div class="rating-group">
                    <label v-for="score in 5" :key="score" class="rating-option">
                      <input 
                        type="radio" 
                        :name="`develop_inherit_${index}`" 
                        :value="score"
                        v-model="scores.develop.inheritance[index]"
                      />
                      <span class="rating-button">{{ score }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 提交按钮 -->
          <div class="submit-section">
            <div class="progress-info">
              <span class="progress-text">完成进度：{{ completionPercentage }}%</span>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: completionPercentage + '%' }"></div>
              </div>
            </div>
            
            <button 
              class="btn btn-primary btn-lg"
              @click="submitAssessment"
              :disabled="!isFormComplete || isLoading"
            >
              <svg v-if="isLoading" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1-3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M3 12h6m6 0h6"/>
              </svg>
              {{ isLoading ? '正在分析中...' : '提交评估' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 结果展示区域 -->
    <section v-if="showResult" class="results-section">
      <div class="section-container">
        <!-- 总体评分 -->
        <div class="result-card animate-fade-in-up">
          <div class="card-header">
            <div class="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1-3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M3 12h6m6 0h6"/>
              </svg>
            </div>
            <div class="card-title">
              <h3>评估结果</h3>
              <p>您的销售辅导能力综合评估报告</p>
            </div>
          </div>
          
          <div class="score-summary">
            <div class="total-score">
              <div class="score-circle">
                <span class="score-number">{{ totalScore }}</span>
                <span class="score-total">/ 200</span>
              </div>
              <div class="score-info">
                <h4>总体评分</h4>
                <div class="level-badge" :class="levelClass">{{ levelText }}</div>
              </div>
            </div>
            
            <div class="dimension-scores">
              <div class="dimension-score-item">
                <div class="score-header">
                  <span class="dimension-name">Trust（信任建设）</span>
                  <span class="score-value">{{ trustScore }} / 50</span>
                </div>
                <div class="score-bar">
                  <div class="score-fill trust" :style="{ width: (trustScore / 50 * 100) + '%' }"></div>
                </div>
              </div>
              
              <div class="dimension-score-item">
                <div class="score-header">
                  <span class="dimension-name">Connect（深度连接）</span>
                  <span class="score-value">{{ connectScore }} / 50</span>
                </div>
                <div class="score-bar">
                  <div class="score-fill connect" :style="{ width: (connectScore / 50 * 100) + '%' }"></div>
                </div>
              </div>
              
              <div class="dimension-score-item">
                <div class="score-header">
                  <span class="dimension-name">Enable（精准赋能）</span>
                  <span class="score-value">{{ enableScore }} / 50</span>
                </div>
                <div class="score-bar">
                  <div class="score-fill enable" :style="{ width: (enableScore / 50 * 100) + '%' }"></div>
                </div>
              </div>
              
              <div class="dimension-score-item">
                <div class="score-header">
                  <span class="dimension-name">Develop（持续发展）</span>
                  <span class="score-value">{{ developScore }} / 50</span>
                </div>
                <div class="score-bar">
                  <div class="score-fill develop" :style="{ width: (developScore / 50 * 100) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 改进建议 -->
        <div class="result-card animate-fade-in-up">
          <div class="card-header">
            <div class="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1-3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M3 12h6m6 0h6"/>
              </svg>
            </div>
            <div class="card-title">
              <h3>重点改进方向</h3>
              <p>基于评估结果的个性化改进建议</p>
            </div>
          </div>
          
          <div class="improvement-content">
            <div class="improvement-item priority-high">
              <div class="improvement-header">
                <span class="priority-badge high">重点改进</span>
                <h4>{{ lowestDimension.name }}</h4>
              </div>
              <p class="improvement-description">
                这是您当前得分最低的维度，建议优先关注和改进。
              </p>
            </div>
            
            <div class="improvement-item priority-medium">
              <div class="improvement-header">
                <span class="priority-badge medium">次要改进</span>
                <h4>{{ secondLowestDimension.name }}</h4>
              </div>
              <p class="improvement-description">
                这是您的次要改进方向，可以在主要问题解决后重点关注。
              </p>
            </div>
          </div>
        </div>

        <!-- AI分析报告 -->
        <div v-if="aiAnalysis" class="result-card animate-fade-in-up">
          <div class="card-header">
            <div class="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1-3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M3 12h6m6 0h6"/>
              </svg>
            </div>
            <div class="card-title">
              <h3>个人行动计划</h3>
              <p>AI生成的个性化改进建议和行动方案</p>
            </div>
          </div>
          
          <div class="analysis-content" v-html="formatAnalysis(aiAnalysis)"></div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-section">
          <button class="btn btn-secondary" @click="resetAssessment">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
            重新测试
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { request } from '../api';

// 问题数据
const trustQuestions = {
  environment: [
    '我的团队成员遇到困难时，会主动向我寻求帮助',
    '团队成员在我面前敢于承认错误和失败',
    '我能够控制情绪，不在压力下批评指责团队',
    '我说到做到，团队信任我的承诺',
    '我会在团队面前承认自己的错误和不足'
  ],
  communication: [
    '我能够倾听团队的不同意见，不会立即反驳',
    '我会保护团队成员在客户面前的专业形象',
    '当团队失败时，我关注解决问题而非追究责任',
    '我鼓励团队尝试新方法，即使可能失败',
    '我的办公室对团队成员是开放的'
  ]
};

const connectQuestions = {
  insight: [
    '我了解每个团队成员当前面临的具体销售挑战',
    '我知道每个团队成员的职业发展意愿和目标',
    '我能识别团队成员表面问题背后的深层原因',
    '我了解每个团队成员的能力优势和短板',
    '我知道每个团队成员最担心和顾虑的事情'
  ],
  dialogue: [
    '我会用开放性问题引导团队成员深入思考',
    '我能够耐心倾听，不急于给出建议和指导',
    '我会关注团队成员的情绪和感受变化',
    '我能够通过提问帮助团队成员自己找到答案',
    '我定期与团队成员进行一对一深度交流'
  ]
};

const enableQuestions = {
  support: [
    '我会针对不同团队成员的特点提供不同的指导方式',
    '我有系统的工具和方法来帮助团队提升技能',
    '我能够将复杂的销售技巧分解为可学习的步骤',
    '我会为团队成员提供实战练习和反馈的机会',
    '我能够调动公司资源为团队提供专业支持'
  ],
  effectiveness: [
    '经过我的辅导，团队成员的销售技能有明显提升',
    '我的团队成员能够独立处理复杂的客户问题',
    '我培养出的销售人员在行业内有良好口碑',
    '我的辅导方法被其他销售经理学习和借鉴',
    '我能够快速帮助新人适应销售工作'
  ]
};

const developQuestions = {
  growth: [
    '我的团队成员具备自我反思和总结的习惯',
    '团队成员遇到新挑战时，会主动寻找解决方法',
    '我的团队内部有互相学习和帮助的氛围',
    '团队成员能够将成功经验转化为可复制的方法',
    '我的团队持续产生新的销售创新和突破'
  ],
  inheritance: [
    '我培养的优秀销售能够指导新同事',
    '我建立了团队经验分享和知识传承机制',
    '我的团队成员具备培训和演讲的能力',
    '我重视长期能力建设而非短期业绩压力',
    '我的管理方法培养出了未来的销售领导者'
  ]
};

// 评分数据
const scores = ref({
  trust: {
    environment: Array(5).fill(null),
    communication: Array(5).fill(null)
  },
  connect: {
    insight: Array(5).fill(null),
    dialogue: Array(5).fill(null)
  },
  enable: {
    support: Array(5).fill(null),
    effectiveness: Array(5).fill(null)
  },
  develop: {
    growth: Array(5).fill(null),
    inheritance: Array(5).fill(null)
  }
});

// 状态管理
const isLoading = ref(false);
const showResult = ref(false);
const aiAnalysis = ref('');

// 计算属性
const isFormComplete = computed(() => {
  const allScores = [
    ...scores.value.trust.environment,
    ...scores.value.trust.communication,
    ...scores.value.connect.insight,
    ...scores.value.connect.dialogue,
    ...scores.value.enable.support,
    ...scores.value.enable.effectiveness,
    ...scores.value.develop.growth,
    ...scores.value.develop.inheritance
  ];
  return allScores.every(score => score !== null);
});

const completionPercentage = computed(() => {
  const allScores = [
    ...scores.value.trust.environment,
    ...scores.value.trust.communication,
    ...scores.value.connect.insight,
    ...scores.value.connect.dialogue,
    ...scores.value.enable.support,
    ...scores.value.enable.effectiveness,
    ...scores.value.develop.growth,
    ...scores.value.develop.inheritance
  ];
  const completedCount = allScores.filter(score => score !== null).length;
  return Math.round((completedCount / allScores.length) * 100);
});

const trustScore = computed(() => {
  return [...scores.value.trust.environment, ...scores.value.trust.communication]
    .reduce((sum, score) => sum + (score || 0), 0);
});

const connectScore = computed(() => {
  return [...scores.value.connect.insight, ...scores.value.connect.dialogue]
    .reduce((sum, score) => sum + (score || 0), 0);
});

const enableScore = computed(() => {
  return [...scores.value.enable.support, ...scores.value.enable.effectiveness]
    .reduce((sum, score) => sum + (score || 0), 0);
});

const developScore = computed(() => {
  return [...scores.value.develop.growth, ...scores.value.develop.inheritance]
    .reduce((sum, score) => sum + (score || 0), 0);
});

const totalScore = computed(() => {
  return trustScore.value + connectScore.value + enableScore.value + developScore.value;
});

const levelText = computed(() => {
  const score = totalScore.value;
  if (score >= 160) return '优秀教练型销售经理';
  if (score >= 120) return '良好，有进一步提升空间';
  if (score >= 80) return '基础水平，需要系统性提升';
  return '需要重点关注和改进';
});

const levelClass = computed(() => {
  const score = totalScore.value;
  if (score >= 160) return 'excellent';
  if (score >= 120) return 'good';
  if (score >= 80) return 'basic';
  return 'needs-improvement';
});

const lowestDimension = computed(() => {
  const dimensions = [
    { name: 'Trust（信任建设）', score: trustScore.value },
    { name: 'Connect（深度连接）', score: connectScore.value },
    { name: 'Enable（精准赋能）', score: enableScore.value },
    { name: 'Develop（持续发展）', score: developScore.value }
  ];
  dimensions.sort((a, b) => a.score - b.score);
  return dimensions[0];
});

const secondLowestDimension = computed(() => {
  const dimensions = [
    { name: 'Trust（信任建设）', score: trustScore.value },
    { name: 'Connect（深度连接）', score: connectScore.value },
    { name: 'Enable（精准赋能）', score: enableScore.value },
    { name: 'Develop（持续发展）', score: developScore.value }
  ];
  dimensions.sort((a, b) => a.score - b.score);
  return dimensions[1];
});

// 方法
const submitAssessment = async () => {
  if (!isFormComplete.value) return;
  
  isLoading.value = true;
  
  try {
    const assessmentData = {
      scores: scores.value,
      totalScore: totalScore.value,
      dimensionScores: {
        trust: trustScore.value,
        connect: connectScore.value,
        enable: enableScore.value,
        develop: developScore.value
      }
    };
    
    const response = await request.post<{data: {analysis: string}}>('/self-test/analyze', assessmentData);
    aiAnalysis.value = response.data.analysis;
    showResult.value = true;
  } catch (error) {
    console.error('提交评估失败:', error);
    alert('提交失败，请重试');
  } finally {
    isLoading.value = false;
  }
};

const resetAssessment = () => {
  scores.value = {
    trust: {
      environment: Array(5).fill(null),
      communication: Array(5).fill(null)
    },
    connect: {
      insight: Array(5).fill(null),
      dialogue: Array(5).fill(null)
    },
    enable: {
      support: Array(5).fill(null),
      effectiveness: Array(5).fill(null)
    },
    develop: {
      growth: Array(5).fill(null),
      inheritance: Array(5).fill(null)
    }
  };
  showResult.value = false;
  aiAnalysis.value = '';
};

const formatAnalysis = (analysis: string) => {
  return analysis.replace(/\n/g, '<br>');
};
</script>

<style scoped>
/* ===== 页面整体布局 ===== */
.self-test {
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
  margin: 0 auto var(--space-8);
  line-height: 1.6;
  animation-delay: 0.3s;
}

.assessment-info {
  display: flex;
  justify-content: center;
  gap: var(--space-8);
  flex-wrap: wrap;
  animation-delay: 0.4s;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
}

.info-label {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 600;
}

/* ===== 区域容器 ===== */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* ===== 评估表单区域 ===== */
.assessment-section {
  padding: var(--space-16) 0;
  margin-top: -var(--space-12);
  position: relative;
  z-index: 2;
}

.assessment-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

/* ===== 维度卡片 ===== */
.dimension-card {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  overflow: hidden;
}

.dimension-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-8) var(--space-8) 0;
}

.dimension-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-xl);
  color: white;
  flex-shrink: 0;
}

.dimension-icon.trust {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.dimension-icon.connect {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.dimension-icon.enable {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.dimension-icon.develop {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.dimension-title h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.dimension-title p {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* ===== 子部分 ===== */
.subsection {
  padding: var(--space-6) var(--space-8);
  border-top: 1px solid var(--border-light);
}

.subsection:first-of-type {
  border-top: none;
}

.subsection-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-2);
  border-bottom: 2px solid var(--primary-100);
}

.question-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.question-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.question-label {
  font-size: 0.875rem;
  color: var(--text-primary);
  line-height: 1.5;
  font-weight: 500;
}

.rating-group {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.rating-option {
  cursor: pointer;
}

.rating-option input {
  display: none;
}

.rating-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid var(--border-medium);
  border-radius: var(--radius-lg);
  font-weight: 600;
  color: var(--text-secondary);
  transition: all var(--duration-fast) var(--ease-out);
  background: var(--bg-primary);
}

.rating-option:hover .rating-button {
  border-color: var(--primary-300);
  color: var(--primary-600);
  transform: scale(1.05);
}

.rating-option input:checked + .rating-button {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  border-color: var(--primary-500);
  color: white;
  transform: scale(1.1);
}

/* ===== 提交区域 ===== */
.submit-section {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  align-items: center;
}

.progress-info {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.progress-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: var(--space-2);
  display: block;
}

.progress-bar {
  height: 8px;
  background: var(--gray-200);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-500) 0%, var(--primary-600) 100%);
  border-radius: var(--radius-sm);
  transition: width var(--duration-normal) var(--ease-out);
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

/* ===== 评分总结 ===== */
.score-summary {
  padding: var(--space-8);
}

.total-score {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--border-light);
}

.score-circle {
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
}

.score-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-600);
  line-height: 1;
}

.score-total {
  font-size: 1.25rem;
  color: var(--text-tertiary);
  font-weight: 500;
}

.score-info h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.level-badge {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-2xl);
  font-size: 0.875rem;
  font-weight: 600;
}

.level-badge.excellent {
  background: #dcfce7;
  color: #166534;
}

.level-badge.good {
  background: #dbeafe;
  color: #1e40af;
}

.level-badge.basic {
  background: #fef3c7;
  color: #92400e;
}

.level-badge.needs-improvement {
  background: #fecaca;
  color: #991b1b;
}

.dimension-scores {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.dimension-score-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.score-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dimension-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.score-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.score-bar {
  height: 8px;
  background: var(--gray-200);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.score-fill {
  height: 100%;
  border-radius: var(--radius-sm);
  transition: width 1s ease-out;
}

.score-fill.trust {
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
}

.score-fill.connect {
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
}

.score-fill.enable {
  background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
}

.score-fill.develop {
  background: linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%);
}

/* ===== 改进建议 ===== */
.improvement-content {
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.improvement-item {
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
}

.improvement-item.priority-high {
  background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
  border-color: #fca5a5;
}

.improvement-item.priority-medium {
  background: linear-gradient(135deg, #fefbf2 0%, #fed7aa 100%);
  border-color: #fdba74;
}

.improvement-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.priority-badge {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-2xl);
  font-size: 0.75rem;
  font-weight: 600;
}

.priority-badge.high {
  background: #dc2626;
  color: white;
}

.priority-badge.medium {
  background: #d97706;
  color: white;
}

.improvement-header h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.improvement-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* ===== AI分析内容 ===== */
.analysis-content {
  padding: var(--space-8);
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

/* ===== 操作按钮 ===== */
.action-section {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
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

  .assessment-info {
    gap: var(--space-4);
  }

  .section-container {
    padding: 0 var(--space-4);
  }

  .assessment-section {
    margin-top: -var(--space-8);
  }

  .dimension-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .subsection {
    padding: var(--space-4) var(--space-6);
  }

  .rating-group {
    justify-content: center;
  }

  .total-score {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-4);
  }

  .improvement-content {
    padding: var(--space-6);
  }

  .analysis-content {
    padding: var(--space-6);
  }
}

@media (max-width: 640px) {
  .page-title {
    font-size: 1.75rem;
  }

  .dimension-header {
    padding: var(--space-6) var(--space-4) 0;
  }

  .subsection {
    padding: var(--space-4);
  }

  .submit-section {
    padding: var(--space-6);
  }

  .rating-button {
    width: 36px;
    height: 36px;
    font-size: 0.875rem;
  }
}

/* ===== 动画延迟 ===== */
.animate-fade-in-up {
  animation-fill-mode: both;
}

.dimension-card:nth-child(1) { animation-delay: 0.1s; }
.dimension-card:nth-child(2) { animation-delay: 0.2s; }
.dimension-card:nth-child(3) { animation-delay: 0.3s; }
.dimension-card:nth-child(4) { animation-delay: 0.4s; }

.result-card:nth-child(1) { animation-delay: 0.1s; }
.result-card:nth-child(2) { animation-delay: 0.2s; }
.result-card:nth-child(3) { animation-delay: 0.3s; }
</style>