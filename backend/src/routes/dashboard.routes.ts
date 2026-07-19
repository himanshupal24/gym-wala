import { Router } from 'express';
import { getDashboardStats, getRevenueChart, getGymGrowthChart } from '../controllers/dashboard.controller';
import { protect } from '../middlewares/auth';

const router = Router();

// Protect all dashboard routes
router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/revenue', getRevenueChart);
router.get('/growth', getGymGrowthChart);

export default router;
