import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare const getGymForCheckin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const processQRCheckin: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=checkin.controller.d.ts.map