import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.APP_URL);
export const config = {
  // Server
  port: parseInt(process.env.PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/rh-management',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpire: process.env.JWT_EXPIRE || '5d',

  // CORS
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://192.168.100.171:3000',
    'http://192.168.100.171:3001',
    'http://192.168.1.1:3000',
    'http://192.168.1.1:3001',
  ],
  
  // File Upload
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB
  uploadPath: process.env.UPLOAD_PATH || './uploads',

  // App
  appName: process.env.APP_NAME || 'RH Management DSD Guinée',
  appUrl: process.env.APP_URL || 'http://localhost:4000',

  // Company Info (for badges)
  companyPhone: process.env.COMPANY_PHONE || '+224669611681',
  companyEmail: process.env.COMPANY_EMAIL || 'contact@dsdguinee.com',
  companyName: process.env.COMPANY_NAME || 'DSD Guinée',
};