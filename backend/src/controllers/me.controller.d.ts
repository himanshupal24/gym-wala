import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare const getMyProfile: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMyAttendance: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getMyPayments: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=me.controller.d.ts.map