import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// 创建 axios 实例
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 200000, // 增加到200秒，适应KIMI k2模型的处理时间
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 未授权，清除 token 并跳转到登录页
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// API 响应类型定义
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// 用户相关接口
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    createdAt: string;
  };
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

// 用户 API
export const userApi = {
  // 登录
  login: (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return api.post("/auth/login", data);
  },

  // 注册
  register: (data: {
    username: string;
    password: string;
    email: string;
  }): Promise<ApiResponse> => {
    return api.post("/auth/register", data);
  },

  // 获取用户信息
  getProfile: (): Promise<ApiResponse<UserProfile>> => {
    return api.get("/user/profile");
  },

  // 更新用户信息
  updateProfile: (data: Partial<UserProfile>): Promise<ApiResponse> => {
    return api.put("/user/profile", data);
  },
};

// 通用 API 方法
export const request = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return api.get(url, config);
  },

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return api.post(url, data, config);
  },

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return api.put(url, data, config);
  },

  delete: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return api.delete(url, config);
  },
};

export default api;
