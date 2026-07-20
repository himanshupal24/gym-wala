import { Router } from 'express';
import { getMyProfile, getMyAttendance, getMyPayments } from '../controllers/me.controller';
import { protect } from '../middlewares/auth';

const router = Router();

// Protect all /me routes
router.use(protect);

router.get('/profile', getMyProfile);
router.get('/attendance', getMyAttendance);
router.get('/payments', getMyPayments);

export default router;
