import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare const getWorkouts: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createWorkout: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteWorkout: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=workout.controller.d.ts.map