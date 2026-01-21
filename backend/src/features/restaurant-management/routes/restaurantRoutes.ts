import { Router } from 'express';
import { RestaurantController } from '../controllers/RestaurantController';
import { authMiddleware } from '../../../common/middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, RestaurantController.create);
router.get('/owner', authMiddleware, RestaurantController.getByOwner);
router.get('/:id', RestaurantController.getById);
router.patch('/:id', authMiddleware, RestaurantController.update);
router.delete('/:id', authMiddleware, RestaurantController.delete);

router.post('/:restaurantId/amenities', authMiddleware, RestaurantController.addAmenities);
router.get('/:restaurantId/amenities', RestaurantController.getAmenities);
router.put('/:restaurantId/amenities', authMiddleware, RestaurantController.updateAmenities);

export default router;
