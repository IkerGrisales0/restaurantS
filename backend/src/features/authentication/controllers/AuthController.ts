import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import type { ApiResponse } from '../../../common/types/index';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, role, restaurantName, address, phone } = req.body;

      if (!email || !password || !role) {
        res.status(400).json({
          success: false,
          error: 'Email, password y role son requeridos',
        } as ApiResponse<null>);
        return;
      }

      const response = await AuthService.register(email, password, role, {
        name: restaurantName,
        address,
        phone,
        email,
      });

      res.status(201).json({
        success: true,
        data: response,
      } as ApiResponse<typeof response>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error en registro',
      } as ApiResponse<null>);
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          error: 'Email y password son requeridos',
        } as ApiResponse<null>);
        return;
      }

      const response = await AuthService.login(email, password);

      if (response.user.role === 'restaurant') {
        const isSetupComplete = await AuthService.isRestaurantSetupComplete(response.user.id);
        const restaurant = await AuthService.getRestaurantForSetup(response.user.id);
        
        res.status(200).json({
          success: true,
          data: {
            ...response,
            restaurantSetupComplete: isSetupComplete,
            restaurant: restaurant,
          },
        } as ApiResponse<any>);
      } else {
        res.status(200).json({
          success: true,
          data: response,
        } as ApiResponse<typeof response>);
      }
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error en login',
      } as ApiResponse<null>);
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    try {
      await AuthService.logout();

      res.status(200).json({
        success: true,
        message: 'Sesión cerrada correctamente',
      } as ApiResponse<null>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error en logout',
      } as ApiResponse<null>);
    }
  }

  static async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await AuthService.getCurrentUser();

      if (!user) {
        res.status(401).json({
          success: false,
          error: 'No autenticado',
        } as ApiResponse<null>);
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      } as ApiResponse<typeof user>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener usuario',
      } as ApiResponse<null>);
    }
  }
}
