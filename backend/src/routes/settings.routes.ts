import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);

router.get('/', getSettings);
router.put('/', updateSettings);

export default router;
