import mongoose, { Schema, Document } from 'mongoose';

export interface IGym extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: 'Active' | 'Pending' | 'Suspended';
  kycDocuments: {
    documentType: string;
    fileUrl: string;
    verified: boolean;
  }[];
  memberCount: number;
  subscriptionPlan: string;
  gymUniqueCode?: string;
  qrEnabled?: boolean;
  qrCreatedAt?: Date;
  qrStatus?: 'Active' | 'Deactivated';
  createdAt: Date;
  updatedAt: Date;
}

const GymSchema: Schema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'Owner', required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String },
    country: { type: String, required: true }
  },
  status: { type: String, enum: ['Active', 'Pending', 'Suspended'], default: 'Pending' },
  kycDocuments: [{
    documentType: String,
    fileUrl: String,
    verified: { type: Boolean, default: false }
  }],
  memberCount: { type: Number, default: 0 },
  subscriptionPlan: { type: String, default: 'Starter' },
  gymUniqueCode: { type: String, unique: true, sparse: true },
  qrEnabled: { type: Boolean, default: true },
  qrCreatedAt: { type: Date, default: Date.now },
  qrStatus: { type: String, enum: ['Active', 'Deactivated'], default: 'Active' }
}, { timestamps: true });

GymSchema.index({ owner: 1 });
GymSchema.index({ status: 1 });

export const Gym = mongoose.model<IGym>('Gym', GymSchema);
