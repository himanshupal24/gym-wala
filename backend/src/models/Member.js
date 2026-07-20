"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const MemberSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    gym: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Gym', required: true },
    status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' },
    passwordHash: { type: String, select: false },
    qrCode: { type: String },
    membershipType: { type: String, default: 'Standard' },
    joinDate: { type: Date, default: Date.now },
    lastCheckIn: { type: Date },
    lastAttendance: { type: Date }
}, { timestamps: true });
// Ensure email is unique per gym
MemberSchema.index({ email: 1, gym: 1 }, { unique: true });
MemberSchema.index({ gym: 1 });
MemberSchema.index({ status: 1 });
exports.Member = mongoose_1.default.model('Member', MemberSchema);
//# sourceMappingURL=Member.js.map