import { Router } from 'express';
import { BookingController } from '../controllers/BookingController';

const router = Router();

router.post('/', BookingController.create);
router.get('/user', BookingController.getUserBookings);
router.get('/:id', BookingController.getById);
router.put('/:id', BookingController.update);
router.delete('/:id/cancel', BookingController.cancel);
router.post('/:id/confirm', BookingController.confirm);

router.get('/:restaurantId/availability', BookingController.getAvailability);
router.get('/:restaurantId', BookingController.getRestaurantBookings);

export default router;
