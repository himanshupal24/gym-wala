import { Router } from 'express';
import { getPlans, createPlan, getSubscriptions } from '../controllers/subscription.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);

// Plans
router.get('/plans', getPlans);
router.post('/plans', createPlan);

// Subscriptions
router.get('/', getSubscriptions);

export default router;
