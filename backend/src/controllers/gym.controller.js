"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regenerateGymQR = exports.getGymQR = exports.deleteGym = exports.updateGymStatus = exports.createGym = exports.getGyms = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Gym_1 = require("../models/Gym");
const getGyms = async (req, res) => {
    try {
        const status = req.query.status;
        const filter = status ? { status } : {};
        // In production, implement real pagination here
        const gyms = await Gym_1.Gym.find(filter).populate('owner', 'firstName lastName email').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: gyms });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getGyms = getGyms;
const createGym = async (req, res) => {
    try {
        const { name, owner, location, subscriptionPlan } = req.body;
        if (!name || !owner || !location?.address || !location?.city || !location?.state || !location?.country) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }
        const gym = await Gym_1.Gym.create({
            name,
            owner,
            location,
            subscriptionPlan: subscriptionPlan || 'Starter',
            status: 'Pending'
        });
        const populatedGym = await Gym_1.Gym.findById(gym._id).populate('owner', 'firstName lastName email');
        res.status(201).json({ success: true, data: populatedGym });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createGym = createGym;
const updateGymStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // Active, Suspended, Pending
        if (!['Active', 'Suspended', 'Pending'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }
        const gym = await Gym_1.Gym.findByIdAndUpdate(id, { status }, { new: true });
        if (!gym) {
            return res.status(404).json({ success: false, message: 'Gym not found' });
        }
        res.status(200).json({ success: true, data: gym });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateGymStatus = updateGymStatus;
const deleteGym = async (req, res) => {
    try {
        const { id } = req.params;
        const gym = await Gym_1.Gym.findByIdAndDelete(id);
        if (!gym) {
            return res.status(404).json({ success: false, message: 'Gym not found' });
        }
        res.status(200).json({ success: true, message: 'Gym deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteGym = deleteGym;
const getGymQR = async (req, res) => {
    try {
        const user = req.user;
        let gymId = null;
        if (user?.type === 'Owner') {
            const gym = await Gym_1.Gym.findOne({ owner: user?.id });
            if (!gym)
                return res.status(404).json({ success: false, message: 'Gym not found' });
            gymId = gym._id;
        }
        else {
            gymId = req.query.gymId;
        }
        if (!gymId)
            return res.status(400).json({ success: false, message: 'Gym ID is required' });
        let gym = await Gym_1.Gym.findById(gymId);
        if (!gym)
            return res.status(404).json({ success: false, message: 'Gym not found' });
        if (!gym.gymUniqueCode) {
            const randomCode = crypto_1.default.randomBytes(4).toString('hex').toUpperCase();
            gym.gymUniqueCode = `GYM${randomCode}`;
            await gym.save();
        }
        res.status(200).json({ success: true, gymUniqueCode: gym.gymUniqueCode, qrStatus: gym.qrStatus });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getGymQR = getGymQR;
const regenerateGymQR = async (req, res) => {
    try {
        const { gymId } = req.body;
        if (!gymId) {
            return res.status(400).json({ success: false, message: 'Gym ID is required' });
        }
        const gym = await Gym_1.Gym.findById(gymId);
        if (!gym) {
            return res.status(404).json({ success: false, message: 'Gym not found' });
        }
        const randomCode = crypto_1.default.randomBytes(4).toString('hex').toUpperCase();
        gym.gymUniqueCode = `GYM${randomCode}`;
        await gym.save();
        res.status(200).json({ success: true, message: 'QR Code regenerated', gymUniqueCode: gym.gymUniqueCode });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.regenerateGymQR = regenerateGymQR;
//# sourceMappingURL=gym.controller.js.map