import { Router } from 'express';
import { getOwners, updateOwnerStatus, deleteOwner } from '../controllers/owner.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);

router.get('/', getOwners);
router.patch('/:id/status', updateOwnerStatus);
router.delete('/:id', deleteOwner);

export default router;
