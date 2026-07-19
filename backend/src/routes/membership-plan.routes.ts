import { Router } from 'express';
import { getPlans, createPlan, updatePlan, deletePlan } from '../controllers/membership-plan.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);

router.get('/', getPlans);
router.post('/', createPlan);
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);

export default router;
