import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

const app: Application = express();

/**
 * CORS Configuration - MUST BE BEFORE HELMET
 */
app.use(
  cors({
    origin: function (origin, callback) {
      // Permettre les requêtes sans origine (Postman, curl, mobile apps, etc.)
      if (!origin) {
        console.log('✅ CORS: Requête sans origine (Postman/curl/mobile)');
        return callback(null, true);
      }

      // Vérifier si l'origine est dans la whitelist
      if (config.allowedOrigins.includes(origin)) {
        console.log('✅ CORS: Origine autorisée:', origin);
        callback(null, true);
      } else if (config.nodeEnv === 'development') {
        // En développement, accepter toutes les origines mais logger un warning
        console.warn('⚠️  CORS: Origine non whitelistée (dev mode):', origin);
        callback(null, true);
      } else {
        // En production, rejeter les origines non autorisées
        console.error('❌ CORS: Origine bloquée:', origin);
        callback(new Error('Origine non autorisée par CORS'), false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Length', 'X-Request-Id', 'Content-Disposition'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400, // 24 heures de cache pour les preflight requests
  })
);



/**
 * Security Middleware
 */
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

/**
 * Body Parser Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Logger Middleware
 */
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

/**
 * Static Files - Servir sur /uploads ET /api/uploads pour compatibilité avec nginx
 */
app.use('/uploads', express.static(config.uploadPath));
app.use('/api/uploads', express.static(config.uploadPath));

/**
 * API Routes
 */
app.use('/api', routes);

/**
 * Root Route
 */
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: config.appName,
    version: '1.0.0',
    environment: config.nodeEnv,
  });
});

/**
 * 404 Handler
 */
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
  });
});

/**
 * Error Handler Middleware
 */
app.use(errorHandler);

export default app;