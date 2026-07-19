import { Router } from 'express';
import { getTickets, getTicketDetails, updateTicketStatus, addTicketMessage } from '../controllers/ticket.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);

router.get('/', getTickets);
router.get('/:id', getTicketDetails);
router.patch('/:id/status', updateTicketStatus);
router.post('/:id/messages', addTicketMessage);

export default router;
