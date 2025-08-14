<template>
  <div class="login">
    <div class="login-container">
      <div class="login-header">
        <h1>登录</h1>
        <p>欢迎回到 Sales Tools</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="loginForm.username"
            type="text"
            placeholder="请输入用户名"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input v-model="loginForm.rememberMe" type="checkbox" />
            记住我
          </label>
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? "登录中..." : "登录" }}
        </button>
      </form>

      <div class="login-footer">
        <p>还没有账户？ <a href="#" @click="handleRegister">立即注册</a></p>
        <p><a href="#" @click="handleForgotPassword">忘记密码？</a></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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
    // 这里应该调用登录 API
    // const response = await loginApi(loginForm)

    // 模拟登录请求
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 登录成功后跳转到首页
    router.push("/");
  } catch (error) {
    console.error("登录失败:", error);
    alert("登录失败，请检查用户名和密码");
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
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.login-container {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.login-header p {
  color: #7f8c8d;
  font-size: 1rem;
}

.login-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ecf0f1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input[type="text"]:focus,
.form-group input[type="password"]:focus {
  outline: none;
  border-color: #3498db;
}

.checkbox-label {
  display: flex !important;
  align-items: center;
  cursor: pointer;
  font-weight: normal !important;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 0.5rem;
  width: auto;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-footer {
  text-align: center;
  color: #7f8c8d;
}

.login-footer p {
  margin-bottom: 0.5rem;
}

.login-footer a {
  color: #3498db;
  text-decoration: none;
  cursor: pointer;
}

.login-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login {
    padding: 1rem;
  }

  .login-container {
    padding: 2rem;
  }
}
</style>
