"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordPayment = exports.getPayments = void 0;
const Payment_1 = require("../models/Payment");
const Member_1 = require("../models/Member");
const Gym_1 = require("../models/Gym");
const getGymIdForRequest = async (req) => {
    if (req.user?.type === 'Owner') {
        const gym = await Gym_1.Gym.findOne({ owner: req.user.id });
        return gym ? gym._id.toString() : null;
    }
    return req.query.gymId || null;
};
const getPayments = async (req, res) => {
    try {
        const filter = {};
        const gymId = await getGymIdForRequest(req);
        if (gymId) {
            filter.gym = gymId;
        }
        else if (req.user?.type === 'Owner') {
            return res.status(404).json({ success: false, message: 'Gym not found' });
        }
        const payments = await Payment_1.Payment.find(filter)
            .populate('member', 'firstName lastName email')
            .populate('plan', 'name')
            .sort({ paymentDate: -1 });
        res.status(200).json({ success: true, data: payments });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getPayments = getPayments;
const recordPayment = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        if (!gymId)
            return res.status(404).json({ success: false, message: 'Gym not found' });
        const { memberId, planId, amount, method, status, transactionId, notes } = req.body;
        const member = await Member_1.Member.findById(memberId);
        if (!member || member.gym.toString() !== gymId) {
            return res.status(404).json({ success: false, message: 'Member not found in your gym' });
        }
        const newPayment = new Payment_1.Payment({
            member: memberId,
            gym: gymId,
            plan: planId,
            amount,
            method,
            status: status || 'Completed',
            transactionId,
            notes
        });
        await newPayment.save();
        const populatedPayment = await Payment_1.Payment.findById(newPayment._id)
            .populate('member', 'firstName lastName email')
            .populate('plan', 'name');
        res.status(201).json({ success: true, data: populatedPayment });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.recordPayment = recordPayment;
//# sourceMappingURL=payment.controller.js.map