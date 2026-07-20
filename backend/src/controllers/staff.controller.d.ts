import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare const getStaff: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createStaff: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateStaff: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteStaff: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=staff.controller.d.ts.map