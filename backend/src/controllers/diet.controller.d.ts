import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare const getDiets: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createDiet: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteDiet: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=diet.controller.d.ts.map