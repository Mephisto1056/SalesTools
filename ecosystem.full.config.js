module.exports = {
  apps: [
    // Express 后端服务
    {
      name: 'sales-backend',
      script: './dist/app.js',
      cwd: './backend',
      instances: 'max',
      exec_mode: 'cluster',
      env_file: './backend/.env',
      env: {
        NODE_ENV: 'development',
        PORT: 9000,
        FRONTEND_URL: 'http://localhost:9001',
        JWT_SECRET: 'your-dev-jwt-secret',
        // 双KIMI API Key配置
        KIMI_API_URL: 'https://api.moonshot.cn/v1/chat/completions'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 9000,
        FRONTEND_URL: 'http://47.116.200.141:9001,http://localhost:9001,http://127.0.0.1:9001',
        JWT_SECRET: 'your-super-secret-jwt-key-change-this-in-production',
        // 双KIMI API Key配置 - 从环境变量或.env文件读取
        KIMI_API_URL: 'https://api.moonshot.cn/v1/chat/completions'
        // KIMI_API_KEY_1 和 KIMI_API_KEY_2 应该在服务器的 .env 文件中配置
        // 或者通过系统环境变量设置，不应该在此配置文件中明文存储
      },
      log_file: './logs/backend-combined.log',
      out_file: './logs/backend-out.log',
      error_file: './logs/backend-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      max_memory_restart: '1G',
      max_restarts: 10,
      min_uptime: '10s',
      autorestart: true,
      merge_logs: true,
      time: true
    },

    // Vue 前端开发服务器 (仅开发环境)
    {
      name: 'sales-frontend-dev',
      script: 'npm',
      args: 'run dev',
      cwd: './frontend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        VITE_API_BASE_URL: 'http://localhost:9000/api'
      },
      log_file: './logs/frontend-dev-combined.log',
      out_file: './logs/frontend-dev-out.log',
      error_file: './logs/frontend-dev-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      max_memory_restart: '500M',
      max_restarts: 5,
      min_uptime: '10s',
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'dist'],
      merge_logs: true,
      time: true
    },

    // 前端构建服务器 (生产环境用serve)
    {
      name: 'sales-frontend-prod',
      script: 'npx',
      args: 'serve -s dist -l 9001',
      cwd: './frontend',
      instances: 2,
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production'
      },
      log_file: './logs/frontend-prod-combined.log',
      out_file: './logs/frontend-prod-out.log',
      error_file: './logs/frontend-prod-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      max_memory_restart: '200M',
      max_restarts: 5,
      min_uptime: '10s',
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
      'post-deploy': `
        cd backend && npm ci --only=production && npm run build &&
        cd ../frontend && npm ci --only=production && npm run build &&
        pm2 reload ecosystem.full.config.js --env production
      `,
      'pre-setup': ''
    }
  }
};