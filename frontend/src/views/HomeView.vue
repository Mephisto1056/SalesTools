<template>
  <div class="home">
    <div class="hero-section">
      <h1>欢迎使用 Sales Tools</h1>
      <p>一个现代化的销售管理工具</p>
      <div class="hero-actions">
        <button class="btn btn-primary" @click="handleGetStarted">
          开始使用
        </button>
        <button class="btn btn-secondary" @click="handleLearnMore">
          了解更多
        </button>
      </div>
    </div>

    <div class="features-section">
      <h2>主要功能</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>数据分析</h3>
          <p>强大的数据分析和可视化功能</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">👥</div>
          <h3>客户管理</h3>
          <p>完整的客户关系管理系统</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📈</div>
          <h3>销售跟踪</h3>
          <p>实时销售进度跟踪和报告</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚙️</div>
          <h3>自动化</h3>
          <p>智能化的销售流程自动化</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const handleGetStarted = () => {
  router.push("/login");
};

const handleLearnMore = () => {
  router.push("/about");
};
</script>

<style scoped>
.home {
  padding: 2rem 0;
}

.hero-section {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 4rem;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: #fff;
  color: #667eea;
}

.btn-primary:hover {
  background-color: #f8f9fa;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: white;
  color: #667eea;
}

.features-section {
  text-align: center;
}

.features-section h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.feature-card p {
  color: #7f8c8d;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 200px;
  }
}
</style>
