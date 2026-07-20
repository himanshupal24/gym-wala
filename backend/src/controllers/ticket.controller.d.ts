import { Request, Response } from 'express';
export declare const getTickets: (req: Request, res: Response) => Promise<void>;
export declare const getTicketDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateTicketStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addTicketMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=ticket.controller.d.ts.map