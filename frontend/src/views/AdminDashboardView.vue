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

          <div class="feature-card active animate-fade-in-up clickable" @click="showActiveLinksModal = true">
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
            <div class="click-hint">点击查看详情</div>
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
                  <span class="real-time-indicator">🔄 实时更新</span>
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
            <div class="analysis-filter">
              <label for="analysisFilter">按链接筛选：</label>
              <select id="analysisFilter" v-model="selectedAnalysisFilter" class="form-select">
                <option value="">显示全部数据</option>
                <option value="direct">仅显示直接访问</option>
                <option v-for="link in assessmentLinks" :key="link.id" :value="link.id">
                  {{ link.name }}
                </option>
              </select>
            </div>
            <button class="btn btn-secondary" @click="refreshStats" :disabled="isRefreshing">
              <svg v-if="isRefreshing" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
              {{ isRefreshing ? '刷新中...' : '刷新数据' }}
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
                <div v-for="dimension in filteredDimensionStats" :key="dimension.name" class="dimension-bar">
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
                <div v-for="range in filteredScoreDistribution" :key="range.label" class="score-range">
                  <div class="range-info">
                    <span class="range-label">{{ range.label }}</span>
                    <span class="range-count">{{ range.count }}人</span>
                  </div>
                  <div class="range-bar">
                    <div
                      class="range-fill"
                      :style="{ width: (range.count / Math.max(filteredAnalysisData.filter(r => r.totalScore > 0).length, 1) * 100) + '%' }"
                    ></div>
                  </div>
                  <div class="range-percentage">{{ Math.round(range.count / Math.max(filteredAnalysisData.filter(r => r.totalScore > 0).length, 1) * 100) }}%</div>
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
          
          <!-- 记录统计 -->
          <div class="filter-stats">
            <span>共 {{ filteredAnalysisData.length }} 条评估记录</span>
            <span v-if="selectedAnalysisFilter" class="filter-indicator">
              （已筛选：{{ selectedAnalysisFilter === 'direct' ? '直接访问' : assessmentLinks.find(l => l.id === selectedAnalysisFilter)?.name || '未知链接' }}）
            </span>
          </div>
          
          <div class="assessments-table">
            <div class="table-header">
              <div class="table-cell">评估时间</div>
              <div class="table-cell">总分</div>
              <div class="table-cell">Trust</div>
              <div class="table-cell">Connect</div>
              <div class="table-cell">Enable</div>
              <div class="table-cell">Develop</div>
              <div class="table-cell">来源链接</div>
            </div>
            
            <!-- 当有评估记录时显示 -->
            <div v-if="filteredAnalysisData.length > 0">
              <div v-for="assessment in filteredAnalysisData.slice(0, 50)" :key="assessment.id" class="table-row">
                <div class="table-cell">{{ formatDate(assessment.createdAt) }}</div>
                <div class="table-cell">
                  <span class="score-badge" :class="getLevelClass(assessment.totalScore)">{{ assessment.totalScore }}/200</span>
                </div>
                <div class="table-cell">{{ assessment.dimensionScores.trust }}/50</div>
                <div class="table-cell">{{ assessment.dimensionScores.connect }}/50</div>
                <div class="table-cell">{{ assessment.dimensionScores.enable }}/50</div>
                <div class="table-cell">{{ assessment.dimensionScores.develop }}/50</div>
                <div class="table-cell">{{ assessment.linkName }}</div>
              </div>
            </div>
            
            <!-- 当没有评估记录时显示 -->
            <div v-else class="table-row empty-state">
              <div class="table-cell" colspan="7">
                <div class="empty-message">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1-3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                    <path d="M3 12h6m6 0h6"/>
                  </svg>
                  <p>暂无评估记录</p>
                  <p class="empty-hint">用户完成评估后，记录将在此处显示</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 活跃链接管理模态框 -->
    <div v-if="showActiveLinksModal" class="modal-overlay" @click="showActiveLinksModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>活跃评估链接管理</h3>
          <button class="modal-close" @click="showActiveLinksModal = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <div v-if="activeLinks.length === 0" class="empty-state">
            <div class="empty-message">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/>
              </svg>
              <p>暂无活跃链接</p>
              <p class="empty-hint">所有评估链接都已停用或删除</p>
            </div>
          </div>
          
          <div v-else class="links-list">
            <div v-for="link in activeLinks" :key="link.id" class="link-item">
              <div class="link-info">
                <div class="link-header">
                  <h4 class="link-name">{{ link.name }}</h4>
                  <span class="link-status active">活跃</span>
                </div>
                <p v-if="link.description" class="link-description">{{ link.description }}</p>
                <div class="link-stats">
                  <span class="stat-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    {{ link.visits || 0 }} 次访问
                  </span>
                  <span class="stat-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    </svg>
                    {{ link.completions || 0 }} 次完成
                  </span>
                  <span class="stat-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    {{ formatDate(link.createdAt) }}
                  </span>
                </div>
                <div class="link-url">
                  <input :value="link.url" readonly class="url-input" />
                  <button class="btn btn-secondary btn-sm" @click="copyToClipboard(link.url)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                    复制
                  </button>
                  <button class="btn btn-secondary btn-sm" @click="showQRCodeModal(link)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                    二维码
                  </button>
                </div>
              </div>
              
              <div class="link-actions">
                <button
                  class="btn btn-danger btn-sm"
                  @click="confirmDeleteLink(link)"
                  :disabled="isDeleting"
                >
                  <svg v-if="isDeleting" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    <line x1="10" x2="10" y1="11" y2="17"/>
                    <line x1="14" x2="14" y1="11" y2="17"/>
                  </svg>
                  {{ isDeleting ? '删除中...' : '删除' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 二维码显示模态框 -->
    <div v-if="showQRModal && selectedLinkForQR" class="modal-overlay" @click="showQRModal = false">
      <div class="modal-content qr-modal" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedLinkForQR.name }} - 二维码</h3>
          <button class="modal-close" @click="showQRModal = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="modal-body qr-modal-body">
          <div class="qr-display-container">
            <div class="qr-code-large">
              <div ref="qrModalElement" class="qr-code-canvas"></div>
            </div>
            
            <div class="qr-info">
              <div class="qr-link-info">
                <label>评估链接：</label>
                <div class="url-container">
                  <input :value="selectedLinkForQR.url" readonly class="form-input url-input" />
                  <button class="btn btn-secondary btn-sm" @click="copyToClipboard(selectedLinkForQR.url)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                    复制链接
                  </button>
                </div>
              </div>
              
              <div class="qr-stats-info">
                <div class="stat-row">
                  <span class="stat-label">创建时间：</span>
                  <span class="stat-value">{{ formatDate(selectedLinkForQR.createdAt) }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">访问次数：</span>
                  <span class="stat-value">{{ selectedLinkForQR.visits || 0 }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">完成次数：</span>
                  <span class="stat-value">{{ selectedLinkForQR.completions || 0 }}</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">状态：</span>
                  <span class="stat-value" :class="{ 'status-active': selectedLinkForQR.isActive, 'status-inactive': !selectedLinkForQR.isActive }">
                    {{ selectedLinkForQR.isActive ? '活跃' : '已停用' }}
                  </span>
                </div>
              </div>
              
              <p v-if="selectedLinkForQR.description" class="qr-description">
                {{ selectedLinkForQR.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { request } from '../api'
import QRCode from 'qrcode'
import { eventBus } from '../utils/eventBus'

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


// 计算属性 - 链接统计数据
const calculateLinkStats = () => {
  console.log('重新计算链接统计数据...')
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
  
  // 添加各个链接的统计 - 即使没有评估结果也要显示链接
  assessmentLinks.value.forEach(link => {
    const linkAssessments = recentAssessments.value.filter(a => a.linkId === link.id)
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
  })
  
  linkStats.value = stats.sort((a, b) => b.completions - a.completions)
  console.log(`链接统计计算完成，共 ${linkStats.value.length} 个统计项`)
}

const currentQRCode = ref<{
  id: string
  name: string
  url: string
  createdAt: string
  visits: number
  completions?: number
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
const linkStats = ref<any[]>([])
const selectedAnalysisFilter = ref('')
const showActiveLinksModal = ref(false)
const showQRModal = ref(false)
const selectedLinkForQR = ref<any>(null)
const isDeleting = ref(false)
const isRefreshing = ref(false)
const qrModalElement = ref<HTMLElement>()

// 计算属性
const completionRate = computed(() => {
  if (stats.value.totalParticipants === 0) return 0
  return Math.round((stats.value.completedAssessments / stats.value.totalParticipants) * 100)
})

// 根据筛选条件过滤的评估数据
const filteredAnalysisData = computed(() => {
  let filtered = recentAssessments.value
  
  if (selectedAnalysisFilter.value) {
    if (selectedAnalysisFilter.value === 'direct') {
      filtered = recentAssessments.value.filter(assessment =>
        assessment.linkName === '直接访问'
      )
    } else {
      filtered = recentAssessments.value.filter(assessment =>
        assessment.linkId === selectedAnalysisFilter.value
      )
    }
  }
  
  return filtered
})

// 基于筛选数据的维度统计
const filteredDimensionStats = computed(() => {
  const completedResults = filteredAnalysisData.value.filter(r => r.totalScore > 0)
  
  const stats = [
    { name: 'Trust（信任建设）', average: 0, class: 'trust' },
    { name: 'Connect（深度连接）', average: 0, class: 'connect' },
    { name: 'Enable（精准赋能）', average: 0, class: 'enable' },
    { name: 'Develop（持续发展）', average: 0, class: 'develop' }
  ]

  if (completedResults.length > 0) {
    stats[0].average = Math.round(
      completedResults.reduce((sum, r) => sum + r.dimensionScores.trust, 0) / completedResults.length
    )
    stats[1].average = Math.round(
      completedResults.reduce((sum, r) => sum + r.dimensionScores.connect, 0) / completedResults.length
    )
    stats[2].average = Math.round(
      completedResults.reduce((sum, r) => sum + r.dimensionScores.enable, 0) / completedResults.length
    )
    stats[3].average = Math.round(
      completedResults.reduce((sum, r) => sum + r.dimensionScores.develop, 0) / completedResults.length
    )
  }

  return stats
})

// 基于筛选数据的分数分布
const filteredScoreDistribution = computed(() => {
  const completedResults = filteredAnalysisData.value.filter(r => r.totalScore > 0)
  
  const distribution = [
    { label: '优秀 (160-200分)', count: 0 },
    { label: '良好 (120-159分)', count: 0 },
    { label: '中等 (80-119分)', count: 0 },
    { label: '待提升 (40-79分)', count: 0 },
    { label: '需改进 (0-39分)', count: 0 }
  ]

  completedResults.forEach(result => {
    const score = result.totalScore
    if (score >= 160) distribution[0].count++
    else if (score >= 120) distribution[1].count++
    else if (score >= 80) distribution[2].count++
    else if (score >= 40) distribution[3].count++
    else distribution[4].count++
  })

  return distribution
})

// 活跃链接计算属性
const activeLinks = computed(() => {
  return assessmentLinks.value.filter(link => link.isActive)
})

// 方法
const showQRCodeModal = async (link: any) => {
  selectedLinkForQR.value = link
  showQRModal.value = true
  
  // 等待DOM更新后生成二维码
  await nextTick()
  if (qrModalElement.value) {
    try {
      qrModalElement.value.innerHTML = ''
      
      // 创建canvas元素
      const canvas = document.createElement('canvas')
      await QRCode.toCanvas(canvas, link.url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      
      // 将canvas添加到容器中
      qrModalElement.value.appendChild(canvas)
    } catch (error) {
      console.error('生成二维码失败:', error)
      // 如果二维码生成失败，显示文本链接作为备选
      qrModalElement.value.innerHTML = `<div style="padding: 20px; text-align: center; border: 1px dashed #ccc;">
        <p>二维码生成失败</p>
        <p style="font-size: 12px; word-break: break-all;">${link.url}</p>
      </div>`
    }
  }
}

const confirmDeleteLink = async (link: any) => {
  if (confirm(`确定要删除评估链接"${link.name}"吗？\n\n此操作将同时删除相关的评估结果，且无法撤销。`)) {
    await deleteAssessmentLink(link.id)
  }
}

const deleteAssessmentLink = async (linkId: string) => {
  isDeleting.value = true
  try {
    const response = await request.delete(`/admin/assessment-links/${linkId}`) as any
    if (response.code === 200) {
      // 立即从本地数据中移除已删除的链接
      const deletedLink = assessmentLinks.value.find(link => link.id === linkId)
      assessmentLinks.value = assessmentLinks.value.filter(link => link.id !== linkId)
      
      // 立即更新统计数据
      stats.value.totalLinks = assessmentLinks.value.length
      stats.value.activeLinks = assessmentLinks.value.filter(l => l.isActive).length
      
      // 重新计算链接统计
      calculateLinkStats()
      
      // 如果删除的是当前显示的二维码链接，清除二维码显示
      if (currentQRCode.value && currentQRCode.value.id === linkId) {
        currentQRCode.value = null
      }
      
      alert(`链接删除成功！${response.data.deletedResultsCount > 0 ? `同时删除了 ${response.data.deletedResultsCount} 条相关评估结果。` : ''}`)
      
      // 如果没有活跃链接了，关闭模态框
      if (activeLinks.value.length === 0) {
        showActiveLinksModal.value = false
      }
      
      // 异步刷新完整统计数据（确保数据一致性）
      setTimeout(() => {
        loadStats()
      }, 100)
      
      console.log('链接已从本地状态删除:', deletedLink?.name)
    }
  } catch (error) {
    console.error('删除链接失败:', error)
    alert('删除链接失败，请重试')
  } finally {
    isDeleting.value = false
  }
}

// 其他方法
const generateAssessmentLink = async () => {
  if (!newLink.value.name) return
  
  isGenerating.value = true
  try {
    const response = await request.post('/admin/assessment-links', {
      name: newLink.value.name,
      description: newLink.value.description
    }) as any
    
    if (response.code === 200) {
      const newLinkData = response.data
      currentQRCode.value = newLinkData
      await generateQRCode(newLinkData.url)
      
      // 立即更新本地链接数组，确保界面同步
      assessmentLinks.value.push(newLinkData)
      
      // 更新统计数据
      stats.value.totalLinks = assessmentLinks.value.length
      stats.value.activeLinks = assessmentLinks.value.filter(l => l.isActive).length
      
      // 重新计算链接统计
      calculateLinkStats()
      
      // 重置表单
      newLink.value.name = ''
      newLink.value.description = ''
      
      // 异步刷新完整统计数据（确保数据一致性）
      setTimeout(() => {
        loadStats()
      }, 100)
      
      console.log('新链接已添加到本地状态:', newLinkData.name)
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
    console.log('开始加载统计数据...')
    const response = await request.get('/admin/stats') as any
    if (response.code === 200) {
      // 更新基础统计数据
      stats.value = response.data.stats
      dimensionStats.value = response.data.dimensionStats
      scoreDistribution.value = response.data.scoreDistribution
      recentAssessments.value = response.data.recentAssessments
      
      // 更新评估链接数据
      if (response.data.assessmentLinks) {
        assessmentLinks.value = response.data.assessmentLinks
        console.log(`加载了 ${assessmentLinks.value.length} 个评估链接`)
      } else {
        // 否则单独加载链接数据
        await loadAssessmentLinks()
      }
      
      // 重新计算链接统计
      calculateLinkStats()
      
      console.log('统计数据加载完成:', {
        totalLinks: stats.value.totalLinks,
        activeLinks: stats.value.activeLinks,
        totalParticipants: stats.value.totalParticipants
      })
    }
  } catch (error) {
    console.error('加载统计数据失败:', error)
  }
}

const loadAssessmentLinks = async () => {
  try {
    console.log('单独加载评估链接数据...')
    const response = await request.get('/admin/assessment-links') as any
    if (response.code === 200) {
      assessmentLinks.value = response.data
      console.log(`单独加载了 ${assessmentLinks.value.length} 个评估链接`)
      
      // 更新统计数据中的链接计数
      stats.value.totalLinks = assessmentLinks.value.length
      stats.value.activeLinks = assessmentLinks.value.filter(l => l.isActive).length
      
      // 重新计算链接统计
      calculateLinkStats()
    }
  } catch (error) {
    console.error('加载评估链接失败:', error)
  }
}

const refreshStats = async () => {
  if (isRefreshing.value) return
  
  isRefreshing.value = true
  try {
    console.log('开始刷新统计数据...')
    
    // 强制重新加载所有数据，不使用缓存
    await loadStats()
    
    // 更新当前二维码的访问次数和完成次数
    if (currentQRCode.value) {
      const updatedLink = assessmentLinks.value.find(link => link.id === currentQRCode.value?.id)
      if (updatedLink) {
        currentQRCode.value.visits = updatedLink.visits
        currentQRCode.value.completions = updatedLink.completions || 0
        console.log(`更新二维码统计: 访问${updatedLink.visits}次, 完成${updatedLink.completions}次`)
      }
    }
    
    console.log('统计数据刷新完成:', {
      totalParticipants: stats.value.totalParticipants,
      completedAssessments: stats.value.completedAssessments,
      activeLinks: stats.value.activeLinks,
      assessmentLinksCount: assessmentLinks.value.length,
      recentAssessmentsCount: recentAssessments.value.length
    })
  } catch (error) {
    console.error('刷新统计数据失败:', error)
  } finally {
    isRefreshing.value = false
  }
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

// 定时刷新间隔
let refreshInterval: NodeJS.Timeout | null = null

// 启动定时刷新
const startAutoRefresh = () => {
  // 每5秒刷新一次数据，确保及时同步
  refreshInterval = setInterval(() => {
    refreshStats()
  }, 5000)
}

// 停止定时刷新
const stopAutoRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
    refreshInterval = null
  }
}

// 生命周期
onMounted(async () => {
  // 确保数据加载顺序
  await loadStats()
  startAutoRefresh()
  
  // 监听评估提交事件
  eventBus.on('assessment-submitted', (data) => {
    console.log('收到评估提交事件，立即刷新数据:', data)
    refreshStats()
  })
  
  // 监听数据刷新需求事件
  eventBus.on('data-refresh-needed', () => {
    console.log('收到数据刷新需求事件')
    refreshStats()
  })
})

onUnmounted(() => {
  stopAutoRefresh()
  // 清理事件监听
  eventBus.clear()
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
/* 实时更新指示器样式 */
.real-time-indicator {
  color: var(--success);
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* 链接统计表格样式优化 */
.link-stats-chart {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.link-stat-item {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  border: 1px solid var(--border-light);
  transition: all var(--duration-normal) ease;
}

.link-stat-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
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
  background: var(--primary-100);
  color: var(--primary-700);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
}

.link-stat-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
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
  width: 100%;
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.link-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-500), var(--primary-400));
  border-radius: var(--radius-sm);
  transition: width var(--duration-normal) ease;
}

/* 筛选指示器样式 */
.filter-indicator {
  color: var(--primary-600);
  font-weight: 500;
  margin-left: var(--space-2);
}

/* 空状态样式 */
.empty-state {
  grid-column: 1 / -1;
  padding: var(--space-12) var(--space-6);
  text-align: center;
}

.empty-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  color: var(--text-secondary);
}

.empty-message svg {
  opacity: 0.5;
}

.empty-message p {
  margin: 0;
}

.empty-message p:first-of-type {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.empty-hint {
  font-size: 0.875rem;
  opacity: 0.8;
}

/* 分数徽章样式增强 */
.score-badge.active {
  background: #dcfce7;
  color: #166534;
}

.score-badge.good {
  background: var(--primary-100);
  color: var(--primary-700);
}

.score-badge.average {
  background: #fef3c7;
  color: #92400e;
}

.score-badge.below-average {
  background: #fed7aa;
  color: #c2410c;
}

.score-badge.poor {
  background: #fecaca;
  color: #991b1b;
}

/* 分析筛选器样式 */
.analysis-filter {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-right: var(--space-4);
}

.analysis-filter label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
  white-space: nowrap;
}

.analysis-filter .form-select {
  min-width: 200px;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all var(--duration-normal) ease;
}

.analysis-filter .form-select:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.section-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* 可点击卡片样式 */
.feature-card.clickable {
  cursor: pointer;
  transition: all var(--duration-normal) ease;
  position: relative;
}

.feature-card.clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.click-hint {
  font-size: 0.75rem;
  color: var(--primary-600);
  margin-top: var(--space-2);
  opacity: 0.8;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 90vw;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-primary);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.modal-close {
  background: none;
  border: none;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--text-secondary);
  transition: all var(--duration-fast) ease;
}

.modal-close:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.modal-body {
  padding: var(--space-6);
  overflow-y: auto;
  flex: 1;
}

/* 链接列表样式 */
.links-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.link-item {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
}

.link-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.link-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.link-name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.link-status {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  font-weight: 500;
}

.link-status.active {
  background: #dcfce7;
  color: #166534;
}

.link-description {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.link-stats {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.stat-item svg {
  opacity: 0.7;
}

.link-url {
  display: flex;
  gap: var(--space-2);
  align-items: center;
}

.url-input {
  flex: 1;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  font-family: monospace;
}

.link-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* 危险按钮样式 */
.btn-danger {
  background: var(--error);
  color: white;
  border: 1px solid var(--error);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration-normal) ease;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}

.btn-danger:hover:not(:disabled) {
  background: #dc2626;
  border-color: #dc2626;
  transform: translateY(-1px);
}

.btn-danger:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* 二维码模态框样式 */
.qr-modal {
  max-width: 800px;
  width: 95vw;
  min-width: 600px;
}

.qr-modal-body {
  padding: var(--space-6);
}

.qr-display-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  align-items: center;
}

.qr-code-large {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-4);
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.qr-code-canvas {
  display: flex;
  justify-content: center;
  align-items: center;
}

.qr-info {
  width: 100%;
  max-width: 500px;
}

.qr-link-info {
  margin-bottom: var(--space-4);
}

.qr-link-info label {
  display: block;
  font-weight: 600;
  margin-bottom: var(--space-2);
  color: var(--text-primary);
}

.qr-stats-info {
  background: var(--bg-secondary);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-4);
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--border-color);
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-label {
  font-weight: 500;
  color: var(--text-secondary);
}

.stat-value {
  font-weight: 600;
  color: var(--text-primary);
}

.status-active {
  color: var(--success-600);
}

.status-inactive {
  color: var(--error-600);
}

.qr-description {
  background: var(--bg-tertiary);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  font-style: italic;
  color: var(--text-secondary);
  margin: 0;
}

/* 响应式设计 */
@media (min-width: 768px) {
  .qr-display-container {
    flex-direction: row;
    align-items: flex-start;
  }
  
  .qr-code-large {
    flex-shrink: 0;
  }
  
  .qr-info {
    flex: 1;
  }
}
</style>