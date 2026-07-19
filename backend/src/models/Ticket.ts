import mongoose, { Schema, Document } from 'mongoose';

export interface ITicket extends Document {
  subject: string;
  description: string;
  status: 'Open' | 'InProgress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  submittedBy: mongoose.Types.ObjectId; // Reference to Owner or Member
  userModel: 'Owner' | 'Member'; // Polylmorphic reference type
  assignedTo?: mongoose.Types.ObjectId; // Reference to Admin
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

const TicketSchema: Schema = new Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'InProgress', 'Resolved', 'Closed'], default: 'Open' },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  submittedBy: { type: Schema.Types.ObjectId, required: true, refPath: 'userModel' },
  userModel: { type: String, required: true, enum: ['Owner', 'Member'] },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'Admin' },
  category: { type: String, enum: ['Billing', 'Technical', 'Account', 'Other'], default: 'Other' },
  messages: [{
    sender: { type: Schema.Types.ObjectId, required: true, refPath: 'messages.senderModel' },
    senderModel: { type: String, required: true, enum: ['Admin', 'Owner', 'Member'] },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);
