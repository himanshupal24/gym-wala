"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDiet = exports.createDiet = exports.getDiets = void 0;
const Diet_1 = require("../models/Diet");
const Gym_1 = require("../models/Gym");
const getGymIdForRequest = async (req) => {
    if (req.user?.type === 'Owner') {
        const gym = await Gym_1.Gym.findOne({ owner: req.user.id });
        return gym ? gym._id.toString() : null;
    }
    return req.query.gymId || null;
};
const getDiets = async (req, res) => {
    try {
        const filter = {};
        const gymId = await getGymIdForRequest(req);
        if (gymId)
            filter.gym = gymId;
        const diets = await Diet_1.Diet.find(filter)
            .populate('member', 'firstName lastName')
            .populate('trainer', 'firstName lastName')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: diets });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getDiets = getDiets;
const createDiet = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        if (!gymId)
            return res.status(404).json({ success: false, message: 'Gym not found' });
        const newDiet = new Diet_1.Diet({ ...req.body, gym: gymId });
        await newDiet.save();
        res.status(201).json({ success: true, data: newDiet });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createDiet = createDiet;
const deleteDiet = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        const diet = await Diet_1.Diet.findById(req.params.id);
        if (!diet || (req.user?.type === 'Owner' && diet.gym.toString() !== gymId)) {
            return res.status(404).json({ success: false, message: 'Diet plan not found' });
        }
        await diet.deleteOne();
        res.status(200).json({ success: true, message: 'Diet plan deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteDiet = deleteDiet;
//# sourceMappingURL=diet.controller.js.map