<template>
  <div class="about">
    <div class="about-header">
      <h1>关于 Sales Tools</h1>
      <p>了解我们的产品和团队</p>
    </div>

    <div class="about-content">
      <section class="about-section">
        <h2>产品介绍</h2>
        <p>
          Sales Tools 是一个现代化的销售管理平台，采用前后端分离的架构设计，
          为销售团队提供全面的客户关系管理、销售跟踪和数据分析功能。
        </p>
        <p>
          我们致力于通过技术创新，帮助销售团队提高工作效率，
          实现销售目标，推动业务增长。
        </p>
      </section>

      <section class="about-section">
        <h2>技术架构</h2>
        <div class="tech-stack">
          <div class="tech-category">
            <h3>前端技术</h3>
            <ul>
              <li>Vue 3 - 渐进式 JavaScript 框架</li>
              <li>TypeScript - 类型安全的 JavaScript</li>
              <li>Vite - 快速的构建工具</li>
              <li>Pinia - 状态管理</li>
            </ul>
          </div>
          <div class="tech-category">
            <h3>后端技术</h3>
            <ul>
              <li>Node.js + Express - 高性能 Web 服务</li>
              <li>Python - 数据处理和分析</li>
              <li>TypeScript - 类型安全的后端开发</li>
              <li>RESTful API - 标准化接口设计</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="about-section">
        <h2>核心特性</h2>
        <div class="features-list">
          <div class="feature-item">
            <h4>微服务架构</h4>
            <p>支持多种后端技术栈，各服务独立部署和扩展</p>
          </div>
          <div class="feature-item">
            <h4>响应式设计</h4>
            <p>适配各种设备，提供一致的用户体验</p>
          </div>
          <div class="feature-item">
            <h4>实时数据</h4>
            <p>实时更新销售数据，支持多用户协作</p>
          </div>
          <div class="feature-item">
            <h4>安全可靠</h4>
            <p>完善的权限控制和数据安全保护</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// 关于页面逻辑
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.about-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.about-header p {
  font-size: 1.2rem;
  color: #7f8c8d;
}

.about-content {
  line-height: 1.8;
}

.about-section {
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.about-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.about-section p {
  color: #555;
  margin-bottom: 1rem;
}

.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.tech-category h3 {
  color: #3498db;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.tech-category ul {
  list-style: none;
  padding: 0;
}

.tech-category li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ecf0f1;
  color: #555;
}

.tech-category li:last-child {
  border-bottom: none;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.feature-item {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.feature-item h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.feature-item p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .about {
    padding: 1rem;
  }

  .about-header h1 {
    font-size: 2rem;
  }

  .about-section {
    padding: 1.5rem;
  }

  .tech-stack {
    grid-template-columns: 1fr;
  }
}
</style>
