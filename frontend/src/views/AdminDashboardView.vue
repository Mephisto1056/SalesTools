<template>
  <div class="admin-dashboard">
    <!-- 页面头部 -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge animate-fade-in-up">
            <span class="badge-text">管理员控制台</span>
          </div>
          
          <h1 class="hero-title animate-fade-in-up">
            销售辅导能力评估<br>
            <span class="hero-title-highlight">管理中心</span>
          </h1>
          
          <p class="hero-description animate-fade-in-up">
            管理评估链接分发，查看匿名测试结果统计和数据分析，助力团队能力提升决策。
          </p>
        </div>
        
        <div class="hero-visual animate-fade-in-up">
          <div class="hero-card">
            <div class="hero-card-header">
              <div class="hero-card-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="hero-card-title">管理控制台</span>
            </div>
            <div class="hero-card-content">
              <div class="stats-preview">
                <div class="stat-item">
                  <span class="stat-number">{{ stats.totalParticipants }}</span>
                  <span class="stat-label">总参与人数</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ stats.completedAssessments }}</span>
                  <span class="stat-label">完成评估</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ stats.averageScore }}</span>
                  <span class="stat-label">平均得分</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 统计卡片区域 -->
    <section class="features-section">
      <div class="features-container">
        <div class="section-header">
          <h2 class="section-title">实时数据概览</h2>
          <p class="section-description">
            全面掌握评估活动的参与情况和结果分析
          </p>
        </div>

        <div class="features-grid stats-grid">
          <div class="feature-card active animate-fade-in-up">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 class="feature-title">总参与人数</h3>
            <div class="stat-display">
              <span class="stat-number">{{ stats.totalParticipants }}</span>
              <span class="stat-change positive">+{{ stats.newParticipants }} 本周新增</span>
            </div>
          </div>

          <div class="feature-card active animate-fade-in-up">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1-3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M3 12h6m6 0h6"/>
              </svg>
            </div>
            <h3 class="feature-title">完成评估数</h3>
            <div class="stat-display">
              <span class="stat-number">{{ stats.completedAssessments }}</span>
              <span class="stat-change">完成率 {{ completionRate }}%</span>
            </div>
          </div>

          <div class="feature-card active animate-fade-in-up">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3 class="feature-title">平均总分</h3>
            <div class="stat-display">
              <span class="stat-number">{{ stats.averageScore }}</span>
              <span class="stat-change">满分 200 分</span>
            </div>
          </div>

          <div class="feature-card active animate-fade-in-up">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/>
              </svg>
            </div>
            <h3 class="feature-title">活跃评估链接</h3>
            <div class="stat-display">
              <span class="stat-number">{{ stats.activeLinks }}</span>
              <span class="stat-change">{{ stats.totalLinks }} 个总链接</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能操作区域 -->
    <section class="management-section">
      <div class="features-container">
        <div class="section-header">
          <h2 class="section-title">管理功能</h2>
          <p class="section-description">
            创建评估链接，生成二维码，管理评估活动
          </p>
        </div>

        <div class="management-grid">
          <!-- 生成评估链接 -->
          <div class="management-card animate-fade-in-up">
            <div class="card-header">
              <div class="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/>
                </svg>
              </div>
              <div class="card-title">
                <h3>生成评估链接</h3>
                <p>创建新的评估链接供用户访问</p>
              </div>
            </div>
            
            <div class="card-content">
              <div class="form-group">
                <label for="linkName">链接名称</label>
                <input
                  id="linkName"
                  v-model="newLink.name"
                  type="text"
                  placeholder="例如：2024年Q1销售团队评估"
                  class="form-input"
                />
              </div>
              
              <div class="form-group">
                <label for="linkDescription">描述（可选）</label>
                <textarea
                  id="linkDescription"
                  v-model="newLink.description"
                  placeholder="评估的目的和说明"
                  class="form-textarea"
                  rows="3"
                ></textarea>
              </div>
              
              <button 
                class="btn btn-primary btn-lg"
                @click="generateAssessmentLink"
                :disabled="!newLink.name || isGenerating"
              >
                <svg v-if="isGenerating" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                  <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                {{ isGenerating ? '生成中...' : '生成链接' }}
              </button>
            </div>
          </div>

          <!-- 二维码展示 -->
          <div v-if="currentQRCode" class="management-card animate-fade-in-up">
            <div class="card-header">
              <div class="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect width="5" height="5" x="3" y="3" rx="1"/>
                  <rect width="5" height="5" x="16" y="3" rx="1"/>
                  <rect width="5" height="5" x="3" y="16" rx="1"/>
                  <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
                  <path d="M21 21v.01"/>
                  <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
                  <path d="M3 12h.01"/>
                  <path d="M12 3h.01"/>
                  <path d="M12 16v.01"/>
                  <path d="M16 12h1"/>
                  <path d="M21 12v.01"/>
                  <path d="M12 21v-1"/>
                </svg>
              </div>
              <div class="card-title">
                <h3>评估二维码</h3>
                <p>扫码即可开始评估</p>
              </div>
            </div>
            
            <div class="card-content qr-content">
              <div class="qr-code-container">
                <div ref="qrCodeElement" class="qr-code"></div>
              </div>
              
              <div class="link-info">
                <div class="link-url">
                  <label>评估链接：</label>
                  <div class="url-container">
                    <input 
                      :value="currentQRCode.url" 
                      readonly 
                      class="form-input url-input"
                    />
                    <button 
                      class="btn btn-secondary btn-sm"
                      @click="copyToClipboard(currentQRCode.url)"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                      </svg>
                      复制
                    </button>
                  </div>
                </div>
                
                <div class="link-stats">
                  <span>创建时间：{{ formatDate(currentQRCode.createdAt) }}</span>
                  <span>访问次数：{{ currentQRCode.visits || 0 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 评估结果统计 -->
    <section class="results-section">
      <div class="features-container">
        <div class="section-header">
          <h2 class="section-title">评估结果分析</h2>
          <div class="section-actions">
            <button class="btn btn-secondary" @click="refreshStats">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
              刷新数据
            </button>
          </div>
        </div>

        <!-- 维度分析图表 -->
        <div class="charts-grid">
          <div class="chart-card animate-fade-in-up">
            <div class="chart-header">
              <h3>各维度平均得分</h3>
              <p>显示所有参与者在四个维度的平均表现</p>
            </div>
            <div class="chart-content">
              <div class="dimension-chart">
                <div v-for="dimension in dimensionStats" :key="dimension.name" class="dimension-bar">
                  <div class="dimension-info">
                    <span class="dimension-name">{{ dimension.name }}</span>
                    <span class="dimension-score">{{ dimension.average }}/50</span>
                  </div>
                  <div class="progress-bar">
                    <div 
                      class="progress-fill"
                      :class="dimension.class"
                      :style="{ width: (dimension.average / 50 * 100) + '%' }"
                    ></div>
                  </div>
                  <div class="dimension-percentage">{{ Math.round(dimension.average / 50 * 100) }}%</div>
                </div>
              </div>
            </div>
          </div>

          <div class="chart-card animate-fade-in-up">
            <div class="chart-header">
              <h3>分数分布</h3>
              <p>参与者总分的分布情况</p>
            </div>
            <div class="chart-content">
              <div class="score-distribution">
                <div v-for="range in scoreDistribution" :key="range.label" class="score-range">
                  <div class="range-info">
                    <span class="range-label">{{ range.label }}</span>
                    <span class="range-count">{{ range.count }}人</span>
                  </div>
                  <div class="range-bar">
                    <div 
                      class="range-fill"
                      :style="{ width: (range.count / Math.max(stats.completedAssessments, 1) * 100) + '%' }"
                    ></div>
                  </div>
                  <div class="range-percentage">{{ Math.round(range.count / Math.max(stats.completedAssessments, 1) * 100) }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 按链接分组统计 -->
        <div class="chart-card animate-fade-in-up">
          <div class="chart-header">
            <h3>各链接评估统计</h3>
            <p>不同评估链接的参与情况和平均得分</p>
          </div>
          <div class="chart-content">
            <div class="link-stats-chart">
              <div v-for="linkStat in linkStats" :key="linkStat.id" class="link-stat-item">
                <div class="link-stat-header">
                  <span class="link-stat-name">{{ linkStat.name }}</span>
                  <span class="link-stat-count">{{ linkStat.completions }}次完成</span>
                </div>
                <div class="link-stat-details">
                  <div class="stat-detail">
                    <span class="detail-label">平均得分</span>
                    <span class="detail-value">{{ linkStat.averageScore }}/200</span>
                  </div>
                  <div class="stat-detail">
                    <span class="detail-label">访问次数</span>
                    <span class="detail-value">{{ linkStat.visits }}</span>
                  </div>
                  <div class="stat-detail">
                    <span class="detail-label">完成率</span>
                    <span class="detail-value">{{ linkStat.completionRate }}%</span>
                  </div>
                </div>
                <div class="link-progress-bar">
                  <div
                    class="link-progress-fill"
                    :style="{ width: (linkStat.averageScore / 200 * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 最近评估记录 -->
        <div class="recent-assessments animate-fade-in-up">
          <div class="card-header">
            <h3>评估记录管理</h3>
            <p>查看和筛选匿名评估结果</p>
          </div>
          
          <!-- 筛选控件 -->
          <div class="filter-controls">
            <div class="filter-group">
              <label for="linkFilter">按来源筛选：</label>
              <select id="linkFilter" v-model="selectedLinkFilter" class="form-select">
                <option value="">显示全部评估记录</option>
                <option value="direct">仅显示直接访问</option>
                <option v-for="link in assessmentLinks" :key="link.id" :value="link.id">
                  {{ link.name }}
                </option>
              </select>
            </div>
            <div class="filter-stats">
              <span>显示 {{ filteredAssessments.length }} 条记录</span>
            </div>
          </div>
          
          <div class="assessments-table">
            <div class="table-header">
              <div class="table-cell">评估时间</div>
              <div class="table-cell">来源链接</div>
              <div class="table-cell">总分</div>
              <div class="table-cell">Trust</div>
              <div class="table-cell">Connect</div>
              <div class="table-cell">Enable</div>
              <div class="table-cell">Develop</div>
              <div class="table-cell">等级</div>
            </div>
            
            <div v-for="assessment in filteredAssessments" :key="assessment.id" class="table-row">
              <div class="table-cell">{{ formatDate(assessment.createdAt) }}</div>
              <div class="table-cell">
                <span class="link-badge" :class="getLinkBadgeClass(assessment.linkName)">
                  {{ assessment.linkName }}
                </span>
              </div>
              <div class="table-cell">
                <span class="score-badge">{{ assessment.totalScore }}/200</span>
              </div>
              <div class="table-cell">{{ assessment.dimensionScores.trust }}/50</div>
              <div class="table-cell">{{ assessment.dimensionScores.connect }}/50</div>
              <div class="table-cell">{{ assessment.dimensionScores.enable }}/50</div>
              <div class="table-cell">{{ assessment.dimensionScores.develop }}/50</div>
              <div class="table-cell">
                <span class="status-badge" :class="getLevelClass(assessment.totalScore)">
                  {{ getScoreLevel(assessment.totalScore) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { request } from '../api'
import QRCode from 'qrcode'

// 响应式数据
const stats = ref({
  totalParticipants: 0,
  newParticipants: 0,
  completedAssessments: 0,
  averageScore: 0,
  activeLinks: 0,
  totalLinks: 0
})

const newLink = ref({
  name: '',
  description: ''
})

// 计算属性 - 筛选后的评估记录
const filteredAssessments = computed(() => {
  let filtered = recentAssessments.value
  
  if (selectedLinkFilter.value) {
    if (selectedLinkFilter.value === 'direct') {
      filtered = recentAssessments.value.filter(assessment =>
        assessment.linkName === '直接访问'
      )
    } else {
      filtered = recentAssessments.value.filter(assessment =>
        assessment.linkId === selectedLinkFilter.value
      )
    }
  }
  
  // 限制显示最近50条记录
  return filtered.slice(0, 50)
})

// 计算属性 - 链接统计数据
const calculateLinkStats = () => {
  const stats: any[] = []
  
  // 添加直接访问统计
  const directAssessments = recentAssessments.value.filter(a => a.linkName === '直接访问')
  if (directAssessments.length > 0) {
    const avgScore = Math.round(
      directAssessments.reduce((sum, a) => sum + a.totalScore, 0) / directAssessments.length
    )
    stats.push({
      id: 'direct',
      name: '直接访问',
      completions: directAssessments.length,
      visits: directAssessments.length, // 直接访问时访问数等于完成数
      averageScore: avgScore,
      completionRate: 100 // 直接访问的完成率是100%
    })
  }
  
  // 添加各个链接的统计
  assessmentLinks.value.forEach(link => {
    const linkAssessments = recentAssessments.value.filter(a => a.linkId === link.id)
    if (linkAssessments.length > 0 || link.visits > 0) {
      const avgScore = linkAssessments.length > 0
        ? Math.round(linkAssessments.reduce((sum, a) => sum + a.totalScore, 0) / linkAssessments.length)
        : 0
      const completionRate = link.visits > 0
        ? Math.round((linkAssessments.length / link.visits) * 100)
        : 0
      
      stats.push({
        id: link.id,
        name: link.name,
        completions: linkAssessments.length,
        visits: link.visits || 0,
        averageScore: avgScore,
        completionRate: completionRate
      })
    }
  })
  
  linkStats.value = stats.sort((a, b) => b.completions - a.completions)
}

const currentQRCode = ref<{
  id: string
  name: string
  url: string
  createdAt: string
  visits: number
} | null>(null)

const isGenerating = ref(false)
const qrCodeElement = ref<HTMLElement>()

const dimensionStats = ref([
  { name: 'Trust（信任建设）', average: 0, class: 'trust' },
  { name: 'Connect（深度连接）', average: 0, class: 'connect' },
  { name: 'Enable（精准赋能）', average: 0, class: 'enable' },
  { name: 'Develop（持续发展）', average: 0, class: 'develop' }
])

const scoreDistribution = ref([
  { label: '优秀 (160-200分)', count: 0 },
  { label: '良好 (120-159分)', count: 0 },
  { label: '中等 (80-119分)', count: 0 },
  { label: '待提升 (40-79分)', count: 0 },
  { label: '需改进 (0-39分)', count: 0 }
])

const recentAssessments = ref<any[]>([])
const assessmentLinks = ref<any[]>([])
const selectedLinkFilter = ref('')
const linkStats = ref<any[]>([])

// 计算属性
const completionRate = computed(() => {
  if (stats.value.totalParticipants === 0) return 0
  return Math.round((stats.value.completedAssessments / stats.value.totalParticipants) * 100)
})

// 方法
const generateAssessmentLink = async () => {
  if (!newLink.value.name) return
  
  isGenerating.value = true
  try {
    const response = await request.post('/admin/assessment-links', {
      name: newLink.value.name,
      description: newLink.value.description
    }) as any
    
    if (response.code === 200) {
      currentQRCode.value = response.data
      await generateQRCode(response.data.url)
      
      // 重置表单
      newLink.value.name = ''
      newLink.value.description = ''
      
      // 刷新统计数据
      await loadStats()
    }
  } catch (error) {
    console.error('生成链接失败:', error)
    alert('生成链接失败，请重试')
  } finally {
    isGenerating.value = false
  }
}

const generateQRCode = async (url: string) => {
  await nextTick()
  if (qrCodeElement.value) {
    try {
      qrCodeElement.value.innerHTML = ''
      
      // 创建canvas元素
      const canvas = document.createElement('canvas')
      await QRCode.toCanvas(canvas, url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      // 将canvas添加到容器中
      qrCodeElement.value.appendChild(canvas)
    } catch (error) {
      console.error('生成二维码失败:', error)
      // 如果二维码生成失败，显示文本链接作为备选
      qrCodeElement.value.innerHTML = `<div style="padding: 20px; text-align: center; border: 1px dashed #ccc;">
        <p>二维码生成失败</p>
        <p style="font-size: 12px; word-break: break-all;">${url}</p>
      </div>`
    }
  }
}

const copyToClipboard = async (text: string) => {
  try {
    // 检查是否支持现代剪贴板API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      alert('链接已复制到剪贴板')
    } else {
      // 使用传统的复制方法作为备选
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        const successful = document.execCommand('copy')
        if (successful) {
          alert('链接已复制到剪贴板')
        } else {
          throw new Error('复制命令执行失败')
        }
      } catch (err) {
        console.error('传统复制方法也失败:', err)
        // 显示文本供用户手动复制
        prompt('复制失败，请手动复制以下链接:', text)
      } finally {
        document.body.removeChild(textArea)
      }
    }
  } catch (error) {
    console.error('复制失败:', error)
    // 最后的备选方案：显示文本供用户手动复制
    prompt('复制失败，请手动复制以下链接:', text)
  }
}

const loadStats = async () => {
  try {
    const response = await request.get('/admin/stats') as any
    if (response.code === 200) {
      stats.value = response.data.stats
      dimensionStats.value = response.data.dimensionStats
      scoreDistribution.value = response.data.scoreDistribution
      recentAssessments.value = response.data.recentAssessments
      calculateLinkStats()
    }
  } catch (error) {
    console.error('加载统计数据失败:', error)
  }
}

const loadAssessmentLinks = async () => {
  try {
    const response = await request.get('/admin/assessment-links') as any
    if (response.code === 200) {
      assessmentLinks.value = response.data
      calculateLinkStats()
    }
  } catch (error) {
    console.error('加载评估链接失败:', error)
  }
}

const refreshStats = async () => {
  await loadStats()
  await loadAssessmentLinks()
}

const getLinkBadgeClass = (linkName: string) => {
  if (linkName === '直接访问') {
    return 'direct'
  }
  return 'linked'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN')
}

const getScoreLevel = (score: number) => {
  if (score >= 160) return '优秀'
  if (score >= 120) return '良好'
  if (score >= 80) return '中等'
  if (score >= 40) return '待提升'
  return '需改进'
}

const getLevelClass = (score: number) => {
  if (score >= 160) return 'active'
  if (score >= 120) return 'good'
  if (score >= 80) return 'average'
  if (score >= 40) return 'below-average'
  return 'poor'
}

// 生命周期
onMounted(() => {
  loadStats()
  loadAssessmentLinks()
})
</script>

<style scoped>
/* 继承主界面的苹果+Claude风格 */
.admin-dashboard {
  min-height: 100vh;
  background: var(--bg-secondary);
}

/* 英雄区域样式 */
.hero-section {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: var(--text-inverse);
  padding: var(--space-20) 0 var(--space-16);
  position: relative;
  overflow: hidden;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-2xl);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: var(--space-6);
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--space-6);
  letter-spacing: -0.02em;
}

.hero-title-highlight {
  background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: var(--space-8);
  max-width: 500px;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 400px;
}

.hero-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-card-dots {
  display: flex;
  gap: var(--space-2);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f57; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #28ca42; }

.hero-card-title {
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.8;
}

.stats-preview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: 0.75rem;
  opacity: 0.7;
}

/* 功能区域样式 */
.features-section {
  padding: var(--space-20) 0;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
}

.section-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.section-actions {
  display: flex;
  gap: var(--space-3);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
}

.feature-card {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  transition: all var(--duration-normal) ease;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.feature-card.active {
  border-color: var(--primary-200);
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--primary-50) 100%);
}

.feature-icon {
  width: 64px;
  height: 64px;
  background: var(--primary-100);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-6);
  color: var(--primary-600);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.stat-display {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-600);
}

.stat-change {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.stat-change.positive {
  color: var(--success);
}

/* 管理功能区域 */
.management-section {
  padding: var(--space-16) 0;
  background: var(--bg-primary);
}

.management-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-6);
}

.management-card {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  transition: all var(--duration-normal) ease;
}

.management-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
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

.card-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* 表单样式 */
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-group label {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.form-input,
.form-textarea {
  padding: var(--space-3);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  transition: border-color var(--duration-fast) ease;
  background: var(--bg-primary);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-500);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

/* 二维码区域 */
.qr-content {
  text-align: center;
}

.qr-code-container {
  margin-bottom: var(--space-6);
}

.qr-code {
  display: inline-block;
  padding: var(--space-4);
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.link-info {
  text-align: left;
}

.link-url {
  margin-bottom: var(--space-4);
}

.link-url label {
  display: block;
  font-weight: 500;
  margin-bottom: var(--space-2);
}

.url-container {
  display: flex;
  gap: var(--space-2);
}

.url-input {
  flex: 1;
  font-family: monospace;
  font-size: 0.875rem;
}

.link-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* 结果统计区域 */
.results-section {
  padding: var(--space-16) 0;
  background: var(--bg-secondary);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.chart-card {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
}

.chart-header {
  margin-bottom: var(--space-6);
}

.chart-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.chart-header p {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* 维度图表 */
.dimension-chart {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.dimension-bar {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: var(--space-3);
}

.dimension-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dimension-name {
  font-weight: 500;
  color: var(--text-primary);
}

.dimension-score {
  font-weight: 600;
  color: var(--text-secondary);
}

.progress-bar {
  height: 8px;
  background: var(--gray-200);
  border-radius: var(--radius-sm);
  overflow: hidden;
  min-width: 100px;
}

.progress-fill {
  height: 100%;
  border-radius: var(--radius-sm);
  transition: width var(--duration-normal) ease;
}

.progress-fill.trust { background: var(--primary-500); }
.progress-fill.connect { background: var(--success); }
.progress-fill.enable { background: var(--warning); }
.progress-fill.develop { background: #8b5cf6; }

.dimension-percentage {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 40px;
  text-align: right;
}

/* 分数分布 */
.score-distribution {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.score-range {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: var(--space-3);
}

.range-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.range-label {
  font-weight: 500;
  color: var(--text-primary);
}

.range-count {
  font-weight: 600;
  color: var(--text-secondary);
}

.range-bar {
  height: 8px;
  background: var(--gray-200);
  border-radius: var(--radius-sm);
  overflow: hidden;
  min-width: 100px;
}

.range-fill {
  height: 100%;
  background: var(--primary-500);
  border-radius: var(--radius-sm);
  transition: width var(--duration-normal) ease;
}

.range-percentage {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 40px;
  text-align: right;
}

/* 链接统计图表 */
.link-stats-chart {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.link-stat-item {
  padding: var(--space-4);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.link-stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
}

.link-stat-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
}

.link-stat-count {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.link-stat-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  margin-bottom: var(--space-3);
}

.stat-detail {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.detail-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.detail-value {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 600;
}

.link-progress-bar {
  height: 6px;
  background: var(--gray-200);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.link-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-500) 0%, var(--primary-600) 100%);
  border-radius: var(--radius-sm);
  transition: width var(--duration-normal) ease;
}

/* 最近评估记录 */
.recent-assessments {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
}

.assessments-table {
  margin-top: var(--space-6);
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: var(--space-4);
  padding: var(--space-3) 0;
  align-items: center;
}

.table-header {
  font-weight: 600;
  color: var(--text-secondary);
  border-bottom: 2px solid var(--border-light);
  font-size: 0.875rem;
}

.table-row {
  border-bottom: 1px solid var(--border-light);
  transition: background-color var(--duration-fast) ease;
}

.table-row:hover {
  background: var(--gray-50);
}

.table-cell {
  font-size: 0.875rem;
  color: var(--text-primary);
}

.score-badge {
  background: var(--primary-50);
  color: var(--primary-700);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.75rem;
}

.link-badge {
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: 0.75rem;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}

.link-badge.direct {
  background: var(--gray-100);
  color: var(--gray-700);
}

.link-badge.linked {
  background: var(--success);
  color: white;
}

.status-badge {
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.75rem;
}

.status-badge.active {
  background: var(--success);
  color: white;
}

.status-badge.good {
  background: var(--primary-500);
  color: white;
}

.status-badge.average {
  background: var(--warning);
  color: white;
}

.status-badge.below-average {
  background: #f97316;
  color: white;
}

.status-badge.poor {
  background: var(--error);
  color: white;
}

/* 动画 */
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

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: var(--space-8);
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .management-grid {
    grid-template-columns: 1fr;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
  
  .table-cell {
    padding: var(--space-2) 0;
  }
  
  .filter-controls {
    flex-direction: column;
    gap: var(--space-3);
    align-items: stretch;
  }
  
  .filter-group {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-2);
  }
  
  .form-select {
    min-width: auto;
  }
}

@media (max-width: 640px) {
  .features-container {
    padding: 0 var(--space-4);
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>