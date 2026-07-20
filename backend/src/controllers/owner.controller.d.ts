import { Request, Response } from 'express';
export declare const getOwners: (req: Request, res: Response) => Promise<void>;
export declare const updateOwnerStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteOwner: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=owner.controller.d.ts.map