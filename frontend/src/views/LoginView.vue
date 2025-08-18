<template>
  <div class="login">
    <!-- 背景装饰 -->
    <div class="login-background">
      <div class="bg-gradient"></div>
      <div class="bg-pattern"></div>
    </div>

    <!-- 登录容器 -->
    <div class="login-container">
      <div class="login-card animate-fade-in-up">
        <!-- 头部 -->
        <div class="login-header">
          <div class="brand-section">
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
            <h1 class="brand-title">Sales Tools</h1>
          </div>
          
          <div class="login-title-section">
            <h2 class="login-title">欢迎回来</h2>
            <p class="login-subtitle">登录您的管理账户，开始管理销售辅导评估</p>
          </div>
        </div>

        <!-- 登录表单 -->
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username" class="form-label">用户名</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <input
                id="username"
                v-model="loginForm.username"
                type="text"
                placeholder="请输入用户名"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">密码</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="m7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                id="password"
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-wrapper">
              <input v-model="loginForm.rememberMe" type="checkbox" class="checkbox-input" />
              <span class="checkbox-custom"></span>
              <span class="checkbox-label">记住我</span>
            </label>
            <a href="#" @click.prevent="handleForgotPassword" class="forgot-link">忘记密码？</a>
          </div>

          <button type="submit" class="login-btn" :disabled="isLoading">
            <svg v-if="isLoading" class="btn-icon animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            <svg v-else class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <path d="M10 17l5-5-5-5"/>
              <path d="M15 12H3"/>
            </svg>
            {{ isLoading ? "登录中..." : "登录" }}
          </button>
        </form>

        <!-- 底部链接 -->
        <div class="login-footer">
          <p class="footer-text">
            还没有账户？ 
            <a href="#" @click.prevent="handleRegister" class="register-link">立即注册</a>
          </p>
          
          <div class="demo-accounts">
            <p class="demo-title">演示账户：</p>
            <div class="demo-buttons">
              <button @click="fillDemoAdmin" class="demo-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                管理员
              </button>
              <button @click="fillDemoUser" class="demo-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                普通用户
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";

const router = useRouter();
const userStore = useUserStore();

const isLoading = ref(false);

const loginForm = reactive({
  username: "",
  password: "",
  rememberMe: false,
});

const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    alert("请填写用户名和密码");
    return;
  }

  isLoading.value = true;

  try {
    const result = await userStore.login({
      username: loginForm.username,
      password: loginForm.password
    });

    if (result.success) {
      // 登录成功后根据角色跳转
      if (userStore.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else {
      alert(result.message || "登录失败，请检查用户名和密码");
    }
  } catch (error) {
    console.error("登录失败:", error);
    alert("登录失败，请稍后重试");
  } finally {
    isLoading.value = false;
  }
};

const handleRegister = () => {
  alert("注册功能开发中...");
};

const handleForgotPassword = () => {
  alert("忘记密码功能开发中...");
};

const fillDemoAdmin = () => {
  loginForm.username = "admin";
  loginForm.password = "password";
};

const fillDemoUser = () => {
  loginForm.username = "user";
  loginForm.password = "password";
};
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--bg-secondary);
  padding: var(--space-6);
}

/* 背景装饰 */
.login-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 50%, var(--primary-700) 100%);
  opacity: 0.1;
}

.bg-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 25% 25%, var(--primary-200) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, var(--primary-300) 0%, transparent 50%);
  opacity: 0.3;
}

/* 登录容器 */
.login-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
}

.login-card {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-10);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-light);
  backdrop-filter: blur(20px);
}

/* 头部区域 */
.login-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.brand-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.login-title-section {
  margin-bottom: var(--space-2);
}

.login-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  letter-spacing: -0.02em;
}

.login-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 表单样式 */
.login-form {
  margin-bottom: var(--space-8);
}

.form-group {
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  font-size: 0.875rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  z-index: 1;
}

.form-input {
  width: 100%;
  padding: var(--space-4) var(--space-4) var(--space-4) var(--space-12);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  transition: all var(--duration-fast) ease;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

.form-input::placeholder {
  color: var(--text-tertiary);
}

/* 表单选项 */
.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-medium);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-fast) ease;
  background: var(--bg-primary);
}

.checkbox-input:checked + .checkbox-custom {
  background: var(--primary-500);
  border-color: var(--primary-500);
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '';
  width: 10px;
  height: 10px;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.checkbox-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  user-select: none;
}

.forgot-link {
  font-size: 0.875rem;
  color: var(--primary-600);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--duration-fast) ease;
}

.forgot-link:hover {
  color: var(--primary-700);
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  padding: var(--space-4);
  background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--duration-fast) ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  box-shadow: var(--shadow-md);
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  flex-shrink: 0;
}

/* 底部区域 */
.login-footer {
  text-align: center;
  border-top: 1px solid var(--border-light);
  padding-top: var(--space-6);
}

.footer-text {
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  font-size: 0.875rem;
}

.register-link {
  color: var(--primary-600);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--duration-fast) ease;
}

.register-link:hover {
  color: var(--primary-700);
}

/* 演示账户 */
.demo-accounts {
  margin-top: var(--space-4);
}

.demo-title {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.demo-buttons {
  display: flex;
  gap: var(--space-2);
  justify-content: center;
}

.demo-btn {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  background: var(--gray-100);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  font-size: 0.75rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--duration-fast) ease;
}

.demo-btn:hover {
  background: var(--gray-200);
  color: var(--text-primary);
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
@media (max-width: 640px) {
  .login {
    padding: var(--space-4);
  }

  .login-card {
    padding: var(--space-8);
  }

  .login-title {
    font-size: 1.75rem;
  }

  .demo-buttons {
    flex-direction: column;
  }

  .demo-btn {
    justify-content: center;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .bg-gradient {
    opacity: 0.05;
  }
  
  .bg-pattern {
    opacity: 0.1;
  }
}
</style>
