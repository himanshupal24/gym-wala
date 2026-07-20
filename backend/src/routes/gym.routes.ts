import { Router } from 'express';
import { getGyms, createGym, updateGymStatus, deleteGym, getGymQR, regenerateGymQR } from '../controllers/gym.controller';
import { protect, authorize } from '../middlewares/auth';

const router = Router();

router.get('/qr', protect, authorize('Owner', 'Super Admin'), getGymQR);
router.post('/qr/regenerate', protect, authorize('Super Admin'), regenerateGymQR);

router.use(protect);

router.get('/', getGyms);
router.post('/', createGym);
router.patch('/:id/status', updateGymStatus);
router.delete('/:id', deleteGym);

export default router;
