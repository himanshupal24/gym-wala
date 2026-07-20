import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare const getGyms: (req: Request, res: Response) => Promise<void>;
export declare const createGym: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateGymStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteGym: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getGymQR: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const regenerateGymQR: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=gym.controller.d.ts.map