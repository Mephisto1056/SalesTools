module.exports = {
  apps: [
    {
      // 主要的Express后端服务
      name: 'sales-backend-main',
      script: './dist/app.js',
      cwd: './backend',
      instances: 4, // 生产环境建议固定实例数
      exec_mode: 'cluster',
      
      // 环境变量
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        FRONTEND_URL: 'https://your-domain.com',
        JWT_SECRET: process.env.JWT_SECRET || 'your-production-jwt-secret',
        LOG_LEVEL: 'info'
      },
      
      // 日志配置
      log_file: '/var/log/sales-tools/backend-combined.log',
      out_file: '/var/log/sales-tools/backend-out.log',
      error_file: '/var/log/sales-tools/backend-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true,
      
      // 性能和稳定性配置
      max_memory_restart: '800M',
      max_restarts: 5,
      min_uptime: '30s',
      restart_delay: 4000,
      
      // 健康检查
      health_check_grace_period: 5000,
      health_check_fatal_exceptions: true,
      
      // 监控配置
      watch: false,
      ignore_watch: ['node_modules', 'logs', '*.log'],
      
      // 其他配置
      autorestart: true,
      kill_timeout: 5000,
      listen_timeout: 8000,
      
      // 进程间通信
      node_args: '--max-old-space-size=1024'
    },
    
    // 备用后端服务 (不同端口)
    {
      name: 'sales-backend-backup',
      script: './dist/app.js',
      cwd: './backend',
      instances: 2,
      exec_mode: 'cluster',
      
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        FRONTEND_URL: 'https://your-domain.com',
        JWT_SECRET: process.env.JWT_SECRET || 'your-production-jwt-secret',
        LOG_LEVEL: 'info'
      },
      
      log_file: '/var/log/sales-tools/backend-backup-combined.log',
      out_file: '/var/log/sales-tools/backend-backup-out.log',
      error_file: '/var/log/sales-tools/backend-backup-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true,
      
      max_memory_restart: '800M',
      max_restarts: 5,
      min_uptime: '30s',
      restart_delay: 4000,
      
      autorestart: true,
      watch: false,
      kill_timeout: 5000,
      listen_timeout: 8000,
      
      node_args: '--max-old-space-size=1024'
    }
  ],

  // 部署配置
  deploy: {
    production: {
      user: 'deploy',
      host: ['your-production-server'],
      ref: 'origin/main',
      repo: 'git@github.com:your-username/SalesTools.git',
      path: '/var/www/sales-tools',
      
      // 部署前钩子
      'pre-deploy-local': 'echo "开始部署到生产环境"',
      
      // 部署后钩子
      'post-deploy': `
        cd backend && 
        npm ci --only=production && 
        npm run build && 
        pm2 reload ecosystem.production.config.js --env production &&
        echo "生产环境部署完成"
      `,
      
      // 设置前钩子
      'pre-setup': 'apt-get update && apt-get install -y git nodejs npm'
    }
  }
};