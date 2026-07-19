import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  admin: mongoose.Types.ObjectId;
  action: string; // e.g. "UPDATED_GYM_STATUS", "CREATED_PLAN"
  resource: string; // e.g. "Gym", "Plan"
  resourceId?: string;
  details: any;
  ipAddress?: string;
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema({
  admin: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  resourceId: { type: String },
  details: { type: Schema.Types.Mixed },
  ipAddress: { type: String }
}, { timestamps: { createdAt: true, updatedAt: false } });

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
