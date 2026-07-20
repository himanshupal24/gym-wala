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
exports.Diet = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const DietSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    member: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Member', required: true },
    trainer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Staff', required: true },
    gym: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Gym', required: true },
    meals: [{
            time: { type: String, required: true }, // e.g. "Breakfast", "08:00 AM"
            description: { type: String, required: true },
            calories: { type: Number }
        }],
    notes: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
DietSchema.index({ gym: 1, member: 1 });
exports.Diet = mongoose_1.default.model('Diet', DietSchema);
//# sourceMappingURL=Diet.js.map