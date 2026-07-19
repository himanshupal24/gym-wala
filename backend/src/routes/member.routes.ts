import { Router } from 'express';
import { getMembers, getMemberAnalytics, updateMemberStatus, createMember, updateMember, deleteMember } from '../controllers/member.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);

router.get('/', getMembers);
router.post('/', createMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);
router.get('/analytics', getMemberAnalytics);
router.patch('/:id/status', updateMemberStatus);

export default router;
