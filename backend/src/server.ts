import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Importar rutas
import authRoutes from './features/authentication/routes/authRoutes';
import restaurantRoutes from './features/restaurant-management/routes/restaurantRoutes';
import discoveryRoutes from './features/restaurant-discovery/routes/discoveryRoutes';
import bookingRoutes from './features/bookings/routes/bookingRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/discovery', discoveryRoutes);
app.use('/api/bookings', bookingRoutes);

// Ruta de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutando en puerto ${PORT}`);
});
