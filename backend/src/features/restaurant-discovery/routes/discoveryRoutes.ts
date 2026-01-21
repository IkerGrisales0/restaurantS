import { Router } from 'express';
import { DiscoveryController } from '../controllers/DiscoveryController';

const router = Router();

router.get('/', DiscoveryController.getAll);
router.post('/search', DiscoveryController.search);
router.get('/popular', DiscoveryController.getPopular);
router.get('/:id/related', DiscoveryController.getRelated);

export default router;
