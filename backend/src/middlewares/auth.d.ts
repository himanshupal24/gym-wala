import { Request, Response, NextFunction } from 'express';
import { IAdmin } from '../models/Admin';
import { IOwner } from '../models/Owner';
import { IMember } from '../models/Member';
export type UserType = (IAdmin | IOwner | IMember) & {
    type: 'Admin' | 'Owner' | 'Member';
};
export interface AuthRequest extends Request {
    user?: UserType;
}
export declare const protect: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const authorize: (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map