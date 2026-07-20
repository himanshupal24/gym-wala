import mongoose, { Document } from 'mongoose';
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
export declare const Gym: mongoose.Model<IGym, {}, {}, {}, mongoose.Document<unknown, {}, IGym, {}, {}> & IGym & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Gym.d.ts.map