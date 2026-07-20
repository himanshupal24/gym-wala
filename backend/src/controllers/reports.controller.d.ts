import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare const getOwnerDashboardStats: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getOwnerRevenueChart: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=reports.controller.d.ts.map