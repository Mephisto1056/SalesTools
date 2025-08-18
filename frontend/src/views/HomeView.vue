<template>
  <div class="home">
    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge animate-fade-in-up">
            <span class="badge-text">销售经理能力提升平台</span>
          </div>
          
          <h1 class="hero-title animate-fade-in-up">
            欢迎使用<br>
            <span class="hero-title-highlight">销售辅导锦囊</span>
          </h1>
          
          <p class="hero-description animate-fade-in-up">
            专为销售经理打造的辅导能力提升工具，帮助您掌握科学的辅导方法，提升团队管理效能，培养高绩效销售团队。
          </p>
          
          <div class="hero-actions animate-fade-in-up">
            <button class="btn btn-primary btn-lg" @click="handleSelfTest">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M3 12h6m6 0h6"/>
              </svg>
              辅导能力评估
            </button>
            <button class="btn btn-secondary btn-lg" @click="handleGetStarted">
              开始使用
            </button>
            <button class="btn btn-ghost btn-lg" @click="handleLearnMore">
              了解更多
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="hero-visual animate-fade-in-up">
          <div class="hero-card">
            <div class="hero-card-header">
              <div class="hero-card-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="hero-card-title">销售经理工具箱</span>
            </div>
            <div class="hero-card-content">
              <div class="tools-grid">
                <div class="tool-item active">
                  <div class="tool-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                      <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                      <path d="M3 12h6m6 0h6"/>
                    </svg>
                  </div>
                  <span class="tool-name">辅导能力评估</span>
                  <span class="tool-status">已启用</span>
                </div>
                <div class="tool-item active">
                  <div class="tool-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 3v18h18"/>
                      <path d="m19 9-5 5-4-4-3 3"/>
                    </svg>
                  </div>
                  <span class="tool-name">竞争分析</span>
                  <span class="tool-status">已启用</span>
                </div>
                <div class="tool-item coming-soon">
                  <div class="tool-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 2v20"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <span class="tool-name">收入分析</span>
                  <span class="tool-status">即将推出</span>
                </div>
                <div class="tool-item coming-soon">
                  <div class="tool-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                  </div>
                  <span class="tool-name">客户需求</span>
                  <span class="tool-status">即将推出</span>
                </div>
              </div>
              <div class="progress-section">
                <div class="progress-header">
                  <span class="progress-title">工具完成度</span>
                  <span class="progress-value">10%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 10%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能特性区域 -->
    <section class="features-section">
      <div class="features-container">
        <div class="section-header">
          <h2 class="section-title">全方位的辅导能力提升</h2>
          <p class="section-description">
            为销售经理量身定制的辅导能力提升工具集合，20个专业功能模块助您成为优秀的教练型领导者
          </p>
        </div>

        <div class="features-grid">
          <!-- 已启用功能 -->
          <div class="feature-card active" @click="handleSelfTest">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M3 12h6m6 0h6"/>
              </svg>
            </div>
            <h3 class="feature-title">辅导能力评估</h3>
            <p class="feature-description">
              评估您的销售辅导能力水平，识别强项与改进空间，制定个性化提升计划。
            </p>
            <div class="feature-status">
              <span class="status-badge active">已启用</span>
            </div>
          </div>

          <!-- 即将推出功能 -->
          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3v18h18"/>
                <path d="m19 9-5 5-4-4-3 3"/>
              </svg>
            </div>
            <h3 class="feature-title">市场趋势评估</h3>
            <p class="feature-description">
              指导团队分析市场环境变化，帮助销售人员识别区域业务潜力。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3 class="feature-title">客户收入分析</h3>
            <p class="feature-description">
              教导团队将销售目标与客户收入趋势结合，指导聚焦高潜力客户。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h3 class="feature-title">洞察客户需求</h3>
            <p class="feature-description">
              培养团队洞察客户业务计划背后隐藏需求的能力，优化客户沟通技巧。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3 class="feature-title">审视自我需求</h3>
            <p class="feature-description">
              指导销售人员审视个人需求与客户需求的关联，调整销售行为。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 class="feature-title">发展联系网络</h3>
            <p class="feature-description">
              在客户内部拓展新的联系，以实现更深层次业务拓展。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
              </svg>
            </div>
            <h3 class="feature-title">克服客户漠视</h3>
            <p class="feature-description">
              分析客户不关心的原因，并找到推动业务前进的方法。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 2l-5 10-5-5 10-5z"/>
              </svg>
            </div>
            <h3 class="feature-title">获取内部支持</h3>
            <p class="feature-description">
              获得公司内部处理复杂客户时所需的资源和团队协助。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h3 class="feature-title">建立个人信用</h3>
            <p class="feature-description">
              提升在高影响力客户眼中的信任度，以获得合作机会。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <path d="M13 8H7"/>
                <path d="M17 12H7"/>
              </svg>
            </div>
            <h3 class="feature-title">打造信服演讲</h3>
            <p class="feature-description">
              进行能打动人心的演讲，清晰说明方案对客户的价值。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20m8-10H4"/>
              </svg>
            </div>
            <h3 class="feature-title">同步买卖流程</h3>
            <p class="feature-description">
              比较销售流程与客户的购买流程，找出差异并调整。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 9V5a3 3 0 0 0-6 0v4"/>
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <circle cx="12" cy="16" r="1"/>
              </svg>
            </div>
            <h3 class="feature-title">融洽把关关系</h3>
            <p class="feature-description">
              有效处理与关键把关者的关系，以接触核心决策人。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <h3 class="feature-title">聚焦关键影响</h3>
            <p class="feature-description">
              识别客户中真正的经济购买影响者（EBI）及其关注点。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="m2 17 10 5 10-5"/>
                <path d="m2 12 10 5 10-5"/>
              </svg>
            </div>
            <h3 class="feature-title">培养内部教练</h3>
            <p class="feature-description">
              在客户内部寻找并发展"教练"角色，以获取关键信息。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card active" @click="handleCompetitiveAnalysis">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3v18h18"/>
                <path d="m19 9-5 5-4-4-3 3"/>
              </svg>
            </div>
            <h3 class="feature-title">实施竞争分析</h3>
            <p class="feature-description">
              分析自身与竞争对手的优劣势，从而提高产品定位。
            </p>
            <div class="feature-status">
              <span class="status-badge active">已启用</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"/>
                <rect width="6" height="7" x="9" y="9" rx="1"/>
                <path d="M12 1v8"/>
              </svg>
            </div>
            <h3 class="feature-title">善用优劣分析</h3>
            <p class="feature-description">
              分析销售机会中的优势与警示，形成有效推进的策略。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 2v4"/>
                <path d="M16 2v4"/>
                <rect width="18" height="18" x="3" y="4" rx="2"/>
                <path d="M3 10h18"/>
                <path d="M8 14h.01"/>
                <path d="M12 14h.01"/>
                <path d="M16 14h.01"/>
                <path d="M8 18h.01"/>
                <path d="M12 18h.01"/>
                <path d="M16 18h.01"/>
              </svg>
            </div>
            <h3 class="feature-title">规划拜访策略</h3>
            <p class="feature-description">
              为销售拜访做充分准备，分析客户需求并确定主轴。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="m7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3 class="feature-title">构建价值矩阵</h3>
            <p class="feature-description">
              准备销售拜访的提问策略，展示产品服务的核心价值。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <circle cx="12" cy="12" r="4"/>
              </svg>
            </div>
            <h3 class="feature-title">量化产品价值</h3>
            <p class="feature-description">
              以可衡量的方式，说明产品为客户提供的具体价值。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>

          <div class="feature-card coming-soon">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
            <h3 class="feature-title">化解客户顾虑</h3>
            <p class="feature-description">
              有效处理客户提出的各种反对意见，促成合作承诺。
            </p>
            <div class="feature-status">
              <span class="status-badge coming-soon">即将推出</span>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted } from 'vue';

const router = useRouter();

const handleGetStarted = () => {
  router.push("/login");
};

const handleLearnMore = () => {
  router.push("/about");
};

const handleSelfTest = () => {
  router.push("/self-test");
};

const handleCompetitiveAnalysis = () => {
  router.push("/competitive-analysis");
};

// 添加滚动动画
onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
      }
    });
  }, observerOptions);

  // 观察所有需要动画的元素
  const animateElements = document.querySelectorAll('.feature-card, .stat-card');
  animateElements.forEach((el) => observer.observe(el));
});
</script>

<style scoped>
/* ===== 首页整体布局 ===== */
.home {
  width: 100%;
}

/* ===== 英雄区域 ===== */
.hero-section {
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
  padding: var(--space-20) 0;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
  pointer-events: none;
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

.hero-content {
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-2) var(--space-4);
  background: var(--primary-500);
  color: white;
  border-radius: var(--radius-2xl);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: var(--space-6);
  animation-delay: 0.1s;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: var(--space-6);
  animation-delay: 0.2s;
}

.hero-title-highlight {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
  animation-delay: 0.3s;
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  animation-delay: 0.4s;
}

/* ===== 英雄区域视觉元素 ===== */
.hero-visual {
  display: flex;
  justify-content: center;
  animation-delay: 0.5s;
}

.hero-card {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--border-light);
}

.hero-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-light);
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

.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #10b981; }

.hero-card-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.hero-card-content {
  padding: var(--space-6);
}

.tools-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  transition: all var(--duration-fast) var(--ease-out);
  cursor: pointer;
}

.tool-item.active {
  background: var(--primary-50);
  border: 1px solid var(--primary-200);
}

.tool-item.coming-soon {
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  opacity: 0.7;
  cursor: default;
}

.tool-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  color: white;
}

.tool-item.active .tool-icon {
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
}

.tool-item.coming-soon .tool-icon {
  background: var(--gray-400);
}

.tool-name {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-primary);
  text-align: center;
}

.tool-status {
  font-size: 0.625rem;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-2xl);
  font-weight: 500;
}

.tool-item.active .tool-status {
  background: var(--primary-100);
  color: var(--primary-700);
}

.tool-item.coming-soon .tool-status {
  background: var(--gray-100);
  color: var(--gray-600);
}

.progress-section {
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-light);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
}

.progress-title {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.progress-value {
  font-size: 0.75rem;
  color: var(--primary-600);
  font-weight: 600;
}

.progress-bar {
  height: 6px;
  background: var(--gray-200);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-500) 0%, var(--primary-600) 100%);
  border-radius: var(--radius-sm);
  transition: width 1s ease-out;
  animation: progressGrow 1.5s ease-out;
}

@keyframes progressGrow {
  from { width: 0; }
}

/* ===== 功能特性区域 ===== */
.features-section {
  padding: var(--space-24) 0;
  background: var(--bg-primary);
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
}

.section-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-8);
}

.feature-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  transition: all var(--duration-normal) var(--ease-out);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-500) 0%, var(--primary-600) 100%);
  transform: scaleX(0);
  transition: transform var(--duration-normal) var(--ease-out);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-200);
}

.feature-card.active {
  border-color: var(--primary-300);
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--bg-primary) 100%);
}

.feature-card.coming-soon {
  opacity: 0.7;
  cursor: default;
}

.feature-card.coming-soon:hover {
  transform: none;
  box-shadow: var(--shadow-md);
  border-color: var(--border-light);
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  border-radius: var(--radius-xl);
  color: white;
  margin-bottom: var(--space-6);
}

.feature-card.coming-soon .feature-icon {
  background: var(--gray-400);
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.feature-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.feature-status {
  display: flex;
  justify-content: flex-end;
}

.status-badge {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-2xl);
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.active {
  background: var(--primary-100);
  color: var(--primary-700);
}

.status-badge.coming-soon {
  background: var(--gray-100);
  color: var(--gray-600);
}

/* ===== 响应式设计 ===== */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: var(--space-12);
    text-align: center;
  }

  .hero-title {
    font-size: 3rem;
  }

  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: var(--space-16) 0;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.125rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .hero-actions .btn {
    width: 100%;
    max-width: 300px;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}

@media (max-width: 640px) {
  .hero-section {
    padding: var(--space-12) 0;
  }

  .hero-container {
    padding: 0 var(--space-4);
  }

  .hero-title {
    font-size: 2rem;
  }

  .features-container {
    padding: 0 var(--space-4);
  }

  .feature-card {
    padding: var(--space-6);
  }
}

/* ===== 动画延迟 ===== */
.animate-fade-in-up {
  animation-fill-mode: both;
}

.feature-card:nth-child(1) { animation-delay: 0.1s; }
.feature-card:nth-child(2) { animation-delay: 0.2s; }
.feature-card:nth-child(3) { animation-delay: 0.3s; }
.feature-card:nth-child(4) { animation-delay: 0.4s; }
.feature-card:nth-child(5) { animation-delay: 0.5s; }
.feature-card:nth-child(6) { animation-delay: 0.6s; }
.feature-card:nth-child(7) { animation-delay: 0.7s; }
.feature-card:nth-child(8) { animation-delay: 0.8s; }
.feature-card:nth-child(9) { animation-delay: 0.9s; }
.feature-card:nth-child(10) { animation-delay: 1.0s; }
.feature-card:nth-child(11) { animation-delay: 1.1s; }
.feature-card:nth-child(12) { animation-delay: 1.2s; }
.feature-card:nth-child(13) { animation-delay: 1.3s; }
.feature-card:nth-child(14) { animation-delay: 1.4s; }
.feature-card:nth-child(15) { animation-delay: 1.5s; }
.feature-card:nth-child(16) { animation-delay: 1.6s; }
.feature-card:nth-child(17) { animation-delay: 1.7s; }
.feature-card:nth-child(18) { animation-delay: 1.8s; }
.feature-card:nth-child(19) { animation-delay: 1.9s; }
.feature-card:nth-child(20) { animation-delay: 2.0s; }

</style>
