import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_KEY;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Falta configurar VITE_SUPABASE_URL y VITE_SUPABASE_KEY en .env');
}

// Cliente público (con limitaciones RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente admin (bypass RLS - solo para operaciones del lado del servidor)
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey) 
  : supabase;
