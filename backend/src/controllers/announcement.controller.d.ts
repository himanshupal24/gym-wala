import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare const getAnnouncements: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createAnnouncement: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteAnnouncement: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=announcement.controller.d.ts.map