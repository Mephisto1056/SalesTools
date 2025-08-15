<template>
  <div id="app" class="min-h-screen bg-secondary">
    <!-- 导航栏 -->
    <header class="navbar-header">
      <nav class="navbar">
        <div class="navbar-container">
          <!-- Logo 和品牌 -->
          <div class="navbar-brand">
            <router-link to="/" class="brand-link">
              <div class="brand-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
                  <path d="M8 12h16M8 16h16M8 20h12" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:var(--primary-500)"/>
                      <stop offset="100%" style="stop-color:var(--primary-600)"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span class="brand-text">Sales Tools</span>
            </router-link>
          </div>

          <!-- 桌面端导航链接 -->
          <div class="navbar-nav desktop-nav">
            <router-link to="/" class="nav-link">
              <span>首页</span>
            </router-link>
            <router-link to="/self-test" class="nav-link">
              <span>自我测试</span>
            </router-link>
            <router-link to="/competitive-analysis" class="nav-link">
              <span>竞争分析</span>
            </router-link>
            <router-link to="/about" class="nav-link">
              <span>关于</span>
            </router-link>
          </div>

          <!-- 右侧操作区 -->
          <div class="navbar-actions">
            <button class="btn btn-ghost btn-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button class="btn btn-primary btn-sm">开始使用</button>
            
            <!-- 移动端菜单按钮 -->
            <button 
              class="mobile-menu-btn"
              @click="toggleMobileMenu"
              :class="{ 'active': isMobileMenuOpen }"
            >
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
          </div>
        </div>

        <!-- 移动端导航菜单 -->
        <div 
          class="mobile-nav"
          :class="{ 'active': isMobileMenuOpen }"
        >
          <div class="mobile-nav-content">
            <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">
              <span>首页</span>
            </router-link>
            <router-link to="/self-test" class="mobile-nav-link" @click="closeMobileMenu">
              <span>自我测试</span>
            </router-link>
            <router-link to="/competitive-analysis" class="mobile-nav-link" @click="closeMobileMenu">
              <span>竞争分析</span>
            </router-link>
            <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu">
              <span>关于</span>
            </router-link>
            <div class="mobile-nav-divider"></div>
            <button class="btn btn-primary w-full">开始使用</button>
          </div>
        </div>
      </nav>
    </header>

    <!-- 主内容区 -->
    <main class="app-main">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="app-footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="brand-icon">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="url(#footerGradient)"/>
                <path d="M8 12h16M8 16h16M8 20h12" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:var(--primary-500)"/>
                    <stop offset="100%" style="stop-color:var(--primary-600)"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span class="footer-brand-text">Sales Tools</span>
          </div>
          <p class="footer-copyright">
            &copy; 2024 Sales Tools. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>

    <!-- 移动端菜单遮罩 -->
    <div 
      class="mobile-menu-overlay"
      :class="{ 'active': isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 监听 ESC 键关闭移动端菜单
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* ===== 导航栏样式 ===== */
.navbar-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-light);
  transition: all var(--duration-fast) var(--ease-out);
}

.navbar {
  width: 100%;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  height: 72px;
}

/* 品牌区域 */
.navbar-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  color: var(--text-primary);
  transition: all var(--duration-fast) var(--ease-out);
}

.brand-link:hover {
  transform: translateY(-1px);
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* 桌面端导航 */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--space-2) var(--space-4);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-radius: var(--radius-lg);
  transition: all var(--duration-fast) var(--ease-out);
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}

.nav-link.router-link-active {
  color: var(--primary-600);
  background: var(--primary-50);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--primary-500);
  border-radius: 1px;
}

/* 导航栏操作区 */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  gap: 4px;
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 1px;
  transition: all var(--duration-normal) var(--ease-out);
  transform-origin: center;
}

.mobile-menu-btn.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* 移动端导航菜单 */
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
  box-shadow: var(--shadow-lg);
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all var(--duration-normal) var(--ease-out);
}

.mobile-nav.active {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-nav-content {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: var(--space-4);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-radius: var(--radius-lg);
  transition: all var(--duration-fast) var(--ease-out);
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  color: var(--primary-600);
  background: var(--primary-50);
}

.mobile-nav-divider {
  height: 1px;
  background: var(--border-light);
  margin: var(--space-4) 0;
}

/* 移动端菜单遮罩 */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all var(--duration-normal) var(--ease-out);
  z-index: 40;
}

.mobile-menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* ===== 主内容区 ===== */
.app-main {
  flex: 1;
  min-height: calc(100vh - 144px); /* 72px navbar + 72px footer */
}

/* ===== 页脚样式 ===== */
.app-footer {
  background: var(--bg-primary);
  border-top: 1px solid var(--border-light);
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6);
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.footer-brand-text {
  font-weight: 600;
  color: var(--text-primary);
}

.footer-copyright {
  color: var(--text-tertiary);
  font-size: 0.875rem;
}

/* ===== 响应式设计 ===== */
@media (max-width: 768px) {
  .navbar-container {
    padding: var(--space-3) var(--space-4);
    height: 64px;
  }

  .desktop-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .navbar-actions .btn:not(.mobile-menu-btn) {
    display: none;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: var(--space-2);
  }

  .app-main {
    min-height: calc(100vh - 128px); /* 64px navbar + 64px footer */
  }
}

@media (max-width: 640px) {
  .navbar-container {
    padding: var(--space-3);
  }

  .brand-text {
    font-size: 1.125rem;
  }

  .mobile-nav-content {
    padding: var(--space-4);
  }
}

/* ===== 深色模式适配 ===== */
@media (prefers-color-scheme: dark) {
  .navbar-header {
    background: rgba(26, 26, 26, 0.8);
    border-bottom-color: var(--border-light);
  }

  .mobile-nav {
    background: var(--bg-primary);
    border-bottom-color: var(--border-light);
  }

  .app-footer {
    background: var(--bg-primary);
    border-top-color: var(--border-light);
  }
}

/* ===== 滚动时导航栏效果 ===== */
.navbar-header.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-sm);
}

@media (prefers-color-scheme: dark) {
  .navbar-header.scrolled {
    background: rgba(26, 26, 26, 0.95);
  }
}
</style>
