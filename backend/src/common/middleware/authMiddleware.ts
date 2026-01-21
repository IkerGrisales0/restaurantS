import { Request, Response, NextFunction } from 'express';
import { supabase } from '../../config/supabase';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userEmail?: string;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'Token no proporcionado',
      });
      return;
    }

    const token = authHeader.substring(7); 

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({
        success: false,
        error: 'Token inválido o expirado',
      });
      return;
    }

    (req as any).userId = data.user.id;
    (req as any).userEmail = data.user.email;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error de autenticación',
    });
  }
};
