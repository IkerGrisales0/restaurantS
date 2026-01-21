
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('restaurant', 'customer')),
  name VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de restaurantes
CREATE TABLE public.restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  image_url TEXT,
  opening_time VARCHAR(5),  -- Formato HH:MM
  closing_time VARCHAR(5),  -- Formato HH:MM
  cuisine_type VARCHAR(100),
  average_price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de amenidades de restaurantes
CREATE TABLE public.restaurant_amenities (
  restaurant_id UUID PRIMARY KEY REFERENCES public.restaurants(id) ON DELETE CASCADE,
  wifi BOOLEAN DEFAULT FALSE,
  parking BOOLEAN DEFAULT FALSE,
  outdoor_seating BOOLEAN DEFAULT FALSE,
  pet_friendly BOOLEAN DEFAULT FALSE,
  wheelchair_accessible BOOLEAN DEFAULT FALSE,
  reservation_required BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de reservas
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time VARCHAR(5) NOT NULL,  -- Formato HH:MM
  guests INTEGER NOT NULL CHECK (guests > 0),
  special_requests TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar performance
CREATE INDEX idx_restaurants_owner_id ON public.restaurants(owner_id);
CREATE INDEX idx_restaurants_cuisine_type ON public.restaurants(cuisine_type);
CREATE INDEX idx_bookings_restaurant_id ON public.bookings(restaurant_id);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_date ON public.bookings(date);

-- Row Level Security (RLS) - Seguridad
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para usuarios
CREATE POLICY "Users can view their own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own data"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can delete their own data"
  ON public.users
  FOR DELETE
  USING (auth.uid() = id);

-- Políticas de seguridad para restaurantes
CREATE POLICY "Anyone can view restaurants"
  ON public.restaurants
  FOR SELECT
  USING (true);

CREATE POLICY "Owners can create restaurants"
  ON public.restaurants
  FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their restaurants"
  ON public.restaurants
  FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their restaurants"
  ON public.restaurants
  FOR DELETE
  USING (auth.uid() = owner_id);

-- Políticas de seguridad para amenidades
CREATE POLICY "Anyone can view amenities"
  ON public.restaurant_amenities
  FOR SELECT
  USING (true);

-- Políticas de seguridad para reservas
CREATE POLICY "Users can view their own bookings"
  ON public.bookings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Restaurants can view their bookings"
  ON public.bookings
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.restaurants
    WHERE restaurants.id = bookings.restaurant_id
    AND restaurants.owner_id = auth.uid()
  ));

CREATE POLICY "Users can create bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
