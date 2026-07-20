"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptions = exports.createPlan = exports.getPlans = void 0;
const Plan_1 = require("../models/Plan");
const Subscription_1 = require("../models/Subscription");
// PLan Controllers
const getPlans = async (req, res) => {
    try {
        const plans = await Plan_1.Plan.find().sort({ price: 1 });
        res.status(200).json({ success: true, data: plans });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getPlans = getPlans;
const createPlan = async (req, res) => {
    try {
        const plan = await Plan_1.Plan.create(req.body);
        res.status(201).json({ success: true, data: plan });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createPlan = createPlan;
// Subscription Controllers
const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription_1.Subscription.find()
            .populate('gym', 'name location')
            .populate('plan', 'name price')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: subscriptions });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getSubscriptions = getSubscriptions;
//# sourceMappingURL=subscription.controller.js.map