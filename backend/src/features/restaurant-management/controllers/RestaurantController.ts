import { Request, Response } from 'express';
import { RestaurantService } from '../services/RestaurantService';
import type { ApiResponse, Restaurant, RestaurantAmenities } from '../../../common/types/index';

export class RestaurantController {
  // Crear restaurante
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const ownerId = (req as any).userId; // Del middleware de autenticación
      const restaurantData = req.body;

      if (!ownerId) {
        res.status(401).json({
          success: false,
          error: 'No autenticado',
        } as ApiResponse<null>);
        return;
      }

      const restaurant = await RestaurantService.createRestaurant(ownerId, restaurantData);

      res.status(201).json({
        success: true,
        data: restaurant,
      } as ApiResponse<Restaurant>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear restaurante',
      } as ApiResponse<null>);
    }
  }

  // Obtener restaurante por ID
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const restaurant = await RestaurantService.getRestaurantById(id);

      res.status(200).json({
        success: true,
        data: restaurant,
      } as ApiResponse<Restaurant>);
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error instanceof Error ? error.message : 'Restaurante no encontrado',
      } as ApiResponse<null>);
    }
  }

  // Obtener restaurantes del propietario
  static async getByOwner(req: Request, res: Response): Promise<void> {
    try {
      const ownerId = (req as any).userId;

      if (!ownerId) {
        res.status(401).json({
          success: false,
          error: 'No autenticado',
        } as ApiResponse<null>);
        return;
      }

      const restaurants = await RestaurantService.getRestaurantsByOwner(ownerId);

      res.status(200).json({
        success: true,
        data: restaurants,
      } as ApiResponse<Restaurant[]>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener restaurantes',
      } as ApiResponse<null>);
    }
  }

  // Actualizar restaurante
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;

      console.log('Actualizando restaurante:', id, updates);

      const restaurant = await RestaurantService.updateRestaurant(id, updates);

      res.status(200).json({
        success: true,
        data: restaurant,
      } as ApiResponse<Restaurant>);
    } catch (error) {
      console.error('Error al actualizar restaurante:', error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar restaurante',
      } as ApiResponse<null>);
    }
  }

  // Eliminar restaurante
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      await RestaurantService.deleteRestaurant(id);

      res.status(200).json({
        success: true,
        message: 'Restaurante eliminado correctamente',
      } as ApiResponse<null>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al eliminar restaurante',
      } as ApiResponse<null>);
    }
  }

  // Agregar amenidades
  static async addAmenities(req: Request, res: Response): Promise<void> {
    try {
      const { restaurantId } = req.params;
      const amenities = req.body;

      const result = await RestaurantService.addAmenities(restaurantId, amenities);

      res.status(201).json({
        success: true,
        data: result,
      } as ApiResponse<RestaurantAmenities>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al agregar amenidades',
      } as ApiResponse<null>);
    }
  }

  // Obtener amenidades
  static async getAmenities(req: Request, res: Response): Promise<void> {
    try {
      const { restaurantId } = req.params;

      const amenities = await RestaurantService.getAmenities(restaurantId);

      res.status(200).json({
        success: true,
        data: amenities,
      } as ApiResponse<RestaurantAmenities>);
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error instanceof Error ? error.message : 'Amenidades no encontradas',
      } as ApiResponse<null>);
    }
  }

  // Actualizar amenidades
  static async updateAmenities(req: Request, res: Response): Promise<void> {
    try {
      const { restaurantId } = req.params;
      const amenities = req.body;

      const result = await RestaurantService.updateAmenities(restaurantId, amenities);

      res.status(200).json({
        success: true,
        data: result,
      } as ApiResponse<RestaurantAmenities>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar amenidades',
      } as ApiResponse<null>);
    }
  }
}
