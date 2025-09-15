module.exports = {
  apps: [
    {
      // Express 后端服务
      name: 'sales-backend',
      script: './dist/app.js',
      cwd: './backend',
      instances: 'max', // 使用所有CPU核心
      exec_mode: 'cluster', // 集群模式
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        FRONTEND_URL: 'http://localhost:5173',
        JWT_SECRET: 'your-production-jwt-secret'
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        FRONTEND_URL: 'http://localhost:5173',
        JWT_SECRET: 'your-dev-jwt-secret'
      },
      // 日志配置
      log_file: './logs/sales-backend.log',
      out_file: './logs/sales-backend-out.log',
      error_file: './logs/sales-backend-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // 监控配置
      watch: false, // 生产环境不建议开启
      ignore_watch: ['node_modules', 'logs'],
      
      // 重启策略
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '1G',
      
      // 健康检查
      health_check_grace_period: 3000,
      health_check_fatal_exceptions: true,
      
      // 其他配置
      autorestart: true,
      merge_logs: true,
      time: true
    },
    
    // 如果需要部署多个端口的后端实例
    {
      name: 'sales-backend-3001',
      script: './dist/app.js',
      cwd: './backend',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        FRONTEND_URL: 'http://localhost:5173',
        JWT_SECRET: 'your-production-jwt-secret'
      },
      log_file: './logs/sales-backend-3001.log',
      out_file: './logs/sales-backend-3001-out.log',
      error_file: './logs/sales-backend-3001-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '1G',
      autorestart: true,
      merge_logs: true,
      time: true
    }
  ],

  // 部署配置
  deploy: {
    production: {
      user: 'deploy',
      host: ['your-server-ip'],
      ref: 'origin/main',
      repo: 'git@github.com:your-username/SalesTools.git',
      path: '/var/www/sales-tools',
      'pre-deploy-local': '',
      'post-deploy': 'cd backend && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    },
    
    staging: {
      user: 'deploy',
      host: ['your-staging-server-ip'],
      ref: 'origin/develop',
      repo: 'git@github.com:your-username/SalesTools.git',
      path: '/var/www/sales-tools-staging',
      'post-deploy': 'cd backend && npm install && npm run build && pm2 reload ecosystem.config.js --env development'
    }
  }
};