import { Request, Response } from 'express';
import { DiscoveryService, type DiscoveryFilters } from '../services/DiscoveryService';
import type { ApiResponse, Restaurant } from '../../../common/types/index';

export class DiscoveryController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const filters: DiscoveryFilters = {
        cuisineType: req.query.cuisineType as string,
        search: req.query.search as string,
        priceRange: req.query.minPrice && req.query.maxPrice
          ? [parseFloat(req.query.minPrice as string), parseFloat(req.query.maxPrice as string)]
          : undefined,
        wifi: req.query.wifi === 'true',
        parking: req.query.parking === 'true',
        outdoor_seating: req.query.outdoor_seating === 'true',
        pet_friendly: req.query.pet_friendly === 'true',
        wheelchair_accessible: req.query.wheelchair_accessible === 'true',
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
      };

      const restaurants = await DiscoveryService.getAllRestaurants(filters);

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

  static async search(req: Request, res: Response): Promise<void> {
    try {
      const filters: DiscoveryFilters = {
        cuisineType: req.body.cuisineType,
        search: req.body.search,
        priceRange: req.body.priceRange,
        wifi: req.body.wifi,
        parking: req.body.parking,
        outdoor_seating: req.body.outdoor_seating,
        pet_friendly: req.body.pet_friendly,
        wheelchair_accessible: req.body.wheelchair_accessible,
      };

      const restaurants = await DiscoveryService.searchRestaurants(filters);

      res.status(200).json({
        success: true,
        data: restaurants,
      } as ApiResponse<Restaurant[]>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error en la búsqueda',
      } as ApiResponse<null>);
    }
  }

  static async getRelated(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;

      const restaurants = await DiscoveryService.getRelatedRestaurants(id, limit);

      res.status(200).json({
        success: true,
        data: restaurants,
      } as ApiResponse<Restaurant[]>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener restaurantes relacionados',
      } as ApiResponse<null>);
    }
  }

  static async getPopular(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;

      const restaurants = await DiscoveryService.getPopularRestaurants(limit);

      res.status(200).json({
        success: true,
        data: restaurants,
      } as ApiResponse<Restaurant[]>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener restaurantes populares',
      } as ApiResponse<null>);
    }
  }
}
