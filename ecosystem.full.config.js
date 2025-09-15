module.exports = {
  apps: [
    // Express 后端服务
    {
      name: 'sales-backend',
      script: './dist/app.js',
      cwd: './backend',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        FRONTEND_URL: 'http://localhost:5173',
        JWT_SECRET: 'your-dev-jwt-secret'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        FRONTEND_URL: 'https://your-domain.com',
        JWT_SECRET: 'your-production-jwt-secret'
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
        VITE_API_BASE_URL: 'http://localhost:3000/api'
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
      args: 'serve -s dist -l 5173',
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