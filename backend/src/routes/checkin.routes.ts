import { Router } from 'express';
import { getGymForCheckin, processQRCheckin } from '../controllers/checkin.controller';
import { protect } from '../middlewares/auth';

const router = Router();

// Public route to fetch gym info for the checkin screen
router.get('/:gymUniqueCode', getGymForCheckin);

// Protected route to process the check-in (requires Member JWT)
router.post('/', protect, processQRCheckin);

export default router;
