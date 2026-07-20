"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStaff = exports.updateStaff = exports.createStaff = exports.getStaff = void 0;
const Staff_1 = require("../models/Staff");
const Gym_1 = require("../models/Gym");
const getGymIdForRequest = async (req) => {
    if (req.user?.type === 'Owner') {
        const gym = await Gym_1.Gym.findOne({ owner: req.user.id });
        return gym ? gym._id.toString() : null;
    }
    return req.query.gymId || null;
};
const getStaff = async (req, res) => {
    try {
        const filter = {};
        const gymId = await getGymIdForRequest(req);
        if (gymId)
            filter.gym = gymId;
        const staff = await Staff_1.Staff.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: staff });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getStaff = getStaff;
const createStaff = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        if (!gymId)
            return res.status(404).json({ success: false, message: 'Gym not found' });
        const newStaff = new Staff_1.Staff({ ...req.body, gym: gymId });
        await newStaff.save();
        res.status(201).json({ success: true, data: newStaff });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createStaff = createStaff;
const updateStaff = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        const staff = await Staff_1.Staff.findById(req.params.id);
        if (!staff || (req.user?.type === 'Owner' && staff.gym.toString() !== gymId)) {
            return res.status(404).json({ success: false, message: 'Staff not found' });
        }
        const updated = await Staff_1.Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateStaff = updateStaff;
const deleteStaff = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        const staff = await Staff_1.Staff.findById(req.params.id);
        if (!staff || (req.user?.type === 'Owner' && staff.gym.toString() !== gymId)) {
            return res.status(404).json({ success: false, message: 'Staff not found' });
        }
        await staff.deleteOne();
        res.status(200).json({ success: true, message: 'Staff deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteStaff = deleteStaff;
//# sourceMappingURL=staff.controller.js.map