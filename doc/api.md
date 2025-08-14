# API 接口文档

## 基础信息

- 基础URL: `http://localhost:3000/api`
- 数据格式: JSON
- 字符编码: UTF-8

## 通用响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 接口列表

### 用户相关接口

#### 用户登录
- **URL**: `/auth/login`
- **方法**: POST
- **参数**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **响应**:
  ```json
  {
    "code": 200,
    "message": "登录成功",
    "data": {
      "token": "jwt_token",
      "user": {
        "id": 1,
        "username": "admin"
      }
    }
  }
  ```

#### 用户注册
- **URL**: `/auth/register`
- **方法**: POST
- **参数**:
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```

#### 获取用户信息
- **URL**: `/user/profile`
- **方法**: GET
- **Headers**: `Authorization: Bearer {token}`
- **响应**:
  ```json
  {
    "code": 200,
    "message": "success",
    "data": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com"
    }
  }
  ```

## 认证说明

所有需要认证的接口都需要在请求头中携带 JWT token：

```
Authorization: Bearer {your_jwt_token}