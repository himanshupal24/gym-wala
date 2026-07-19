import { Router } from 'express';
import { getWorkouts, createWorkout, deleteWorkout } from '../controllers/workout.controller';
import { protect } from '../middlewares/auth';

const router = Router();

router.use(protect);
router.get('/', getWorkouts);
router.post('/', createWorkout);
router.delete('/:id', deleteWorkout);

export default router;
