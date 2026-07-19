import { Router } from 'express';
import { getAnnouncements, createAnnouncement, deleteAnnouncement } from '../controllers/announcement.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);
router.get('/', getAnnouncements);
router.post('/', createAnnouncement);
router.delete('/:id', deleteAnnouncement);

export default router;
