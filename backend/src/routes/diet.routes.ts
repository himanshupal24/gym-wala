import { Router } from 'express';
import { getDiets, createDiet, deleteDiet } from '../controllers/diet.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);
router.get('/', getDiets);
router.post('/', createDiet);
router.delete('/:id', deleteDiet);

export default router;
