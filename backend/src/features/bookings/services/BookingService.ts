import { supabase } from '../../../config/supabase';
import type { Booking } from '../../../common/types/index';

export class BookingService {
  static async createBooking(
    restaurantId: string,
    userId: string,
    bookingData: Omit<Booking, 'id' | 'restaurant_id' | 'user_id' | 'created_at' | 'updated_at' | 'status'>
  ): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          restaurant_id: restaurantId,
          user_id: userId,
          ...bookingData,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async getBookingById(id: string): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async getUserBookings(userId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }

  static async getRestaurantBookings(restaurantId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('date', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }

  static async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async cancelBooking(id: string): Promise<Booking> {
    return this.updateBooking(id, { status: 'cancelled' });
  }

  static async confirmBooking(id: string): Promise<Booking> {
    return this.updateBooking(id, { status: 'confirmed' });
  }

  static async getAvailability(restaurantId: string, date: string): Promise<string[]> {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('time')
      .eq('restaurant_id', restaurantId)
      .eq('date', date)
      .eq('status', 'confirmed');

    if (error) throw new Error(error.message);

    const allSlots = this.generateTimeSlots();
    const bookedSlots = new Set(bookings?.map((b) => b.time) || []);

    return allSlots.filter((slot) => !bookedSlots.has(slot));
  }

  private static generateTimeSlots(): string[] {
    const slots = [];
    for (let hour = 12; hour <= 23; hour++) {
      for (let minute of [0, 30]) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  }
}
