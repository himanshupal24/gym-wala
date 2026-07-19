import { Router } from 'express';
import { getAttendance, markAttendance } from '../controllers/attendance.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);

router.get('/', getAttendance);
router.post('/', markAttendance);

export default router;
