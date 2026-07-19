import { Router } from 'express';
import { getOwnerDashboardStats, getOwnerRevenueChart } from '../controllers/reports.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);
router.get('/dashboard', getOwnerDashboardStats);
router.get('/revenue-chart', getOwnerRevenueChart);

export default router;
