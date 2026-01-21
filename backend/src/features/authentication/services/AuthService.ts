import { supabase, supabaseAdmin } from '../../../config/supabase';
import type { User, AuthResponse } from '../../../common/types/index';

export class AuthService {
  // Registrar nuevo usuario
  static async register(
    email: string,
    password: string,
    role: 'restaurant' | 'customer',
    restaurantData?: { name?: string; address?: string; phone?: string; email?: string }
  ): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    if (!data.user) throw new Error('Error al crear usuario');

    // Guardar el usuario con todos sus datos usando supabaseAdmin para bypass RLS
    const { error: insertError } = await supabaseAdmin
      .from('users')
      .insert([{ 
        id: data.user.id, 
        email, 
        role,
        name: restaurantData?.name || '',
        phone: restaurantData?.phone || '',
        address: restaurantData?.address || '',
      }]);

    if (insertError) throw new Error(insertError.message);

    // Si es restaurante y tenemos datos mínimos, crear el restaurante
    if (role === 'restaurant' && restaurantData?.name && restaurantData?.address) {
      const { error: restaurantInsertError } = await supabaseAdmin
        .from('restaurants')
        .insert([{ 
          owner_id: data.user.id,
          name: restaurantData.name,
          address: restaurantData.address,
          phone: restaurantData.phone || null,
          email: restaurantData.email || email,
          image_url: null,
          opening_time: null,
          closing_time: null,
          cuisine_type: null,
          average_price: 0,
        }]);

      if (restaurantInsertError) throw new Error(restaurantInsertError.message);
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email || '',
        role,
        created_at: data.user.created_at || new Date().toISOString(),
      },
      session: {
        access_token: data.session?.access_token || '',
        refresh_token: data.session?.refresh_token || '',
      },
    };
  }

  // Login
  static async login(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    if (!data.user) throw new Error('Error al iniciar sesión');

    // Obtener el rol y datos del usuario
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (fetchError) throw new Error(fetchError.message);

    return {
      user: {
        id: data.user.id,
        email: data.user.email || '',
        role: userData?.role || 'customer',
        name: userData?.name || '',
        phone: userData?.phone || '',
        address: userData?.address || '',
        created_at: data.user.created_at || new Date().toISOString(),
      },
      session: {
        access_token: data.session?.access_token || '',
        refresh_token: data.session?.refresh_token || '',
      },
    };
  }

  // Logout
  static async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  // Obtener usuario actual
  static async getCurrentUser(): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) return null;

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single();

    return {
      id: data.user.id,
      email: data.user.email || '',
      role: userData?.role || 'customer',
      created_at: data.user.created_at || new Date().toISOString(),
    };
  }

  // Verificar si el restaurante tiene setup completo
  static async isRestaurantSetupComplete(userId: string): Promise<boolean> {
    const { data: restaurant, error } = await supabase
      .from('restaurants')
      .select('id, cuisine_type, description, opening_time, closing_time')
      .eq('owner_id', userId)
      .single();

    if (error || !restaurant) return false;

    // Setup completo si tiene: cuisine_type, description, opening_time, closing_time
    return !!(
      restaurant.cuisine_type &&
      restaurant.description &&
      restaurant.opening_time &&
      restaurant.closing_time
    );
  }

  // Obtener datos del restaurante incompleto (para pre-llenar setup)
  static async getRestaurantForSetup(userId: string): Promise<any> {
    const { data: restaurant, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('owner_id', userId)
      .single();

    if (error || !restaurant) return null;

    return restaurant;
  }
}
