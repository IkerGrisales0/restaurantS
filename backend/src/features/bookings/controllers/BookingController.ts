import { Request, Response } from 'express';
import { BookingService } from '../services/BookingService';
import type { ApiResponse, Booking } from '../../../common/types/index';

export class BookingController {
  // Crear reserva
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const { restaurantId, ...bookingData } = req.body;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'No autenticado',
        } as ApiResponse<null>);
        return;
      }

      const booking = await BookingService.createBooking(restaurantId, userId, bookingData);

      res.status(201).json({
        success: true,
        data: booking,
      } as ApiResponse<Booking>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al crear reserva',
      } as ApiResponse<null>);
    }
  }

  // Obtener reserva por ID
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const booking = await BookingService.getBookingById(id);

      res.status(200).json({
        success: true,
        data: booking,
      } as ApiResponse<Booking>);
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error instanceof Error ? error.message : 'Reserva no encontrada',
      } as ApiResponse<null>);
    }
  }

  // Obtener reservas del usuario
  static async getUserBookings(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'No autenticado',
        } as ApiResponse<null>);
        return;
      }

      const bookings = await BookingService.getUserBookings(userId);

      res.status(200).json({
        success: true,
        data: bookings,
      } as ApiResponse<Booking[]>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener reservas',
      } as ApiResponse<null>);
    }
  }

  // Obtener reservas del restaurante
  static async getRestaurantBookings(req: Request, res: Response): Promise<void> {
    try {
      const { restaurantId } = req.params;

      const bookings = await BookingService.getRestaurantBookings(restaurantId);

      res.status(200).json({
        success: true,
        data: bookings,
      } as ApiResponse<Booking[]>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener reservas',
      } as ApiResponse<null>);
    }
  }

  // Actualizar reserva
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;

      const booking = await BookingService.updateBooking(id, updates);

      res.status(200).json({
        success: true,
        data: booking,
      } as ApiResponse<Booking>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al actualizar reserva',
      } as ApiResponse<null>);
    }
  }

  // Cancelar reserva
  static async cancel(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const booking = await BookingService.cancelBooking(id);

      res.status(200).json({
        success: true,
        data: booking,
      } as ApiResponse<Booking>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al cancelar reserva',
      } as ApiResponse<null>);
    }
  }

  // Confirmar reserva
  static async confirm(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const booking = await BookingService.confirmBooking(id);

      res.status(200).json({
        success: true,
        data: booking,
      } as ApiResponse<Booking>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al confirmar reserva',
      } as ApiResponse<null>);
    }
  }

  // Obtener disponibilidad
  static async getAvailability(req: Request, res: Response): Promise<void> {
    try {
      const { restaurantId } = req.params;
      const { date } = req.query;

      if (!date || typeof date !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Fecha requerida',
        } as ApiResponse<null>);
        return;
      }

      const availability = await BookingService.getAvailability(restaurantId, date);

      res.status(200).json({
        success: true,
        data: availability,
      } as ApiResponse<string[]>);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error al obtener disponibilidad',
      } as ApiResponse<null>);
    }
  }
}
