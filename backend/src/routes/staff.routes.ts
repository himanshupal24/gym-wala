import { Router } from 'express';
import { getStaff, createStaff, updateStaff, deleteStaff } from '../controllers/staff.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);
router.get('/', getStaff);
router.post('/', createStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

export default router;
