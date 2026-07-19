import { Router } from 'express';
import { getMembers, getMemberAnalytics, updateMemberStatus } from '../controllers/member.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);

router.get('/', getMembers);
router.get('/analytics', getMemberAnalytics);
router.patch('/:id/status', updateMemberStatus);

export default router;
