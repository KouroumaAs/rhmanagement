import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('🔍 [VALIDATE MIDDLEWARE] Body reçu:', JSON.stringify(req.body, null, 2));

      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      console.log('✅ [VALIDATE MIDDLEWARE] Validation réussie');
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('❌ [VALIDATE MIDDLEWARE] Erreur de validation Zod:', JSON.stringify(error.errors, null, 2));

        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          message: 'Erreur de validation',
          errors,
        });
        return;
      }

      console.log('❌ [VALIDATE MIDDLEWARE] Erreur non-Zod:', error);
      next(error);
    }
  };
};