import { Request, Response } from 'express';
import '../models/Role';
import { AuthRequest } from '../middlewares/auth';
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMe: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map