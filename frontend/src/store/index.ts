import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { userApi, type LoginRequest, type UserProfile } from "@/api";

// 用户状态管理
export const useUserStore = defineStore("user", () => {
  // 状态
  const token = ref<string | null>(localStorage.getItem("token"));
  const userInfo = ref<UserProfile | null>(null);
  const isLoading = ref(false);

  // 计算属性
  const isLoggedIn = computed(() => !!token.value);
  const username = computed(() => userInfo.value?.username || "");

  // 登录
  const login = async (loginData: LoginRequest) => {
    isLoading.value = true;
    try {
      const response = await userApi.login(loginData);
      if (response.code === 200) {
        token.value = response.data.token;
        userInfo.value = response.data.user;
        localStorage.setItem("token", response.data.token);
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("登录失败:", error);
      return { success: false, message: "登录失败，请稍后重试" };
    } finally {
      isLoading.value = false;
    }
  };

  // 登出
  const logout = () => {
    token.value = null;
    userInfo.value = null;
    localStorage.removeItem("token");
  };

  // 获取用户信息
  const fetchUserInfo = async () => {
    if (!token.value) return;

    try {
      const response = await userApi.getProfile();
      if (response.code === 200) {
        userInfo.value = response.data;
      }
    } catch (error) {
      console.error("获取用户信息失败:", error);
      // 如果获取用户信息失败，可能是 token 过期，执行登出
      logout();
    }
  };

  // 初始化时如果有 token 则获取用户信息
  if (token.value) {
    fetchUserInfo();
  }

  return {
    // 状态
    token,
    userInfo,
    isLoading,
    // 计算属性
    isLoggedIn,
    username,
    // 方法
    login,
    logout,
    fetchUserInfo,
  };
});

// 应用状态管理
export const useAppStore = defineStore("app", () => {
  // 状态
  const theme = ref<"light" | "dark">("light");
  const sidebarCollapsed = ref(false);
  const loading = ref(false);

  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    localStorage.setItem("theme", theme.value);
  };

  // 切换侧边栏
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  };

  // 设置加载状态
  const setLoading = (status: boolean) => {
    loading.value = status;
  };

  // 初始化主题
  const savedTheme = localStorage.getItem("theme") as "light" | "dark";
  if (savedTheme) {
    theme.value = savedTheme;
  }

  return {
    // 状态
    theme,
    sidebarCollapsed,
    loading,
    // 方法
    toggleTheme,
    toggleSidebar,
    setLoading,
  };
});
