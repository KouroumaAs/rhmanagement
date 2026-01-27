module.exports = {
  apps: [
    {
      name: "rh-backend",
      script: "npx ts-node src/server.ts",
      exec_mode: "fork",
      cwd: "/var/www/rhmanagement/backend",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 4000
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 4000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 4000
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      merge_logs: true,
      max_restarts: 10,
      min_uptime: "10s",
      restart_delay: 4000
    }
  ]
};