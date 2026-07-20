import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare const getAttendance: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const markAttendance: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=attendance.controller.d.ts.map