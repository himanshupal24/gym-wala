"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlan = exports.updatePlan = exports.createPlan = exports.getPlans = void 0;
const MembershipPlan_1 = require("../models/MembershipPlan");
const Gym_1 = require("../models/Gym");
const getGymIdForRequest = async (req) => {
    if (req.user?.type === 'Owner') {
        const gym = await Gym_1.Gym.findOne({ owner: req.user.id });
        return gym ? gym._id.toString() : null;
    }
    return req.query.gymId || null;
};
const getPlans = async (req, res) => {
    try {
        const filter = {};
        const gymId = await getGymIdForRequest(req);
        if (gymId) {
            filter.gym = gymId;
        }
        else if (req.user?.type === 'Owner') {
            return res.status(404).json({ success: false, message: 'Gym not found' });
        }
        const plans = await MembershipPlan_1.MembershipPlan.find(filter).sort({ price: 1 });
        res.status(200).json({ success: true, data: plans });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getPlans = getPlans;
const createPlan = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        if (!gymId) {
            return res.status(404).json({ success: false, message: 'Gym not found' });
        }
        const { name, description, price, durationInMonths, isActive } = req.body;
        const newPlan = new MembershipPlan_1.MembershipPlan({
            name,
            description,
            price,
            durationInMonths,
            isActive,
            gym: gymId
        });
        await newPlan.save();
        res.status(201).json({ success: true, data: newPlan });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'A plan with this name already exists for your gym' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createPlan = createPlan;
const updatePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const gymId = await getGymIdForRequest(req);
        const plan = await MembershipPlan_1.MembershipPlan.findById(id);
        if (!plan)
            return res.status(404).json({ success: false, message: 'Plan not found' });
        if (req.user?.type === 'Owner' && plan.gym.toString() !== gymId) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        const updatedPlan = await MembershipPlan_1.MembershipPlan.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, data: updatedPlan });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'A plan with this name already exists' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updatePlan = updatePlan;
const deletePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const gymId = await getGymIdForRequest(req);
        const plan = await MembershipPlan_1.MembershipPlan.findById(id);
        if (!plan)
            return res.status(404).json({ success: false, message: 'Plan not found' });
        if (req.user?.type === 'Owner' && plan.gym.toString() !== gymId) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        await plan.deleteOne();
        res.status(200).json({ success: true, message: 'Plan deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deletePlan = deletePlan;
//# sourceMappingURL=membership-plan.controller.js.map