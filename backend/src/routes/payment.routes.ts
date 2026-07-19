import { Router } from 'express';
import { getPayments, recordPayment } from '../controllers/payment.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);

router.get('/', getPayments);
router.post('/', recordPayment);

export default router;
