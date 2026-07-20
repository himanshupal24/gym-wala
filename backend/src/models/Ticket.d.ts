import mongoose, { Document } from 'mongoose';
export interface ITicket extends Document {
    subject: string;
    description: string;
    status: 'Open' | 'InProgress' | 'Resolved' | 'Closed';
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    submittedBy: mongoose.Types.ObjectId;
    userModel: 'Owner' | 'Member';
    assignedTo?: mongoose.Types.ObjectId;
    category: 'Billing' | 'Technical' | 'Account' | 'Other';
    messages: {
        sender: mongoose.Types.ObjectId;
        senderModel: 'Admin' | 'Owner' | 'Member';
        message: string;
        createdAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Ticket: mongoose.Model<ITicket, {}, {}, {}, mongoose.Document<unknown, {}, ITicket, {}, {}> & ITicket & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Ticket.d.ts.map