import { Router } from 'express';
import { getGyms, createGym, updateGymStatus, deleteGym } from '../controllers/gym.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);

router.get('/', getGyms);
router.post('/', createGym);
router.patch('/:id/status', updateGymStatus);
router.delete('/:id', deleteGym);

export default router;
