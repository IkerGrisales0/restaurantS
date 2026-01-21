-- Migración: Agregar columnas name, phone y address a la tabla users
-- Ejecutar este script en Supabase SQL Editor

-- Agregar columnas a la tabla users si no existen
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS name VARCHAR(255),
ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS address TEXT;

-- Actualizar el timestamp de updated_at
UPDATE public.users SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL;
