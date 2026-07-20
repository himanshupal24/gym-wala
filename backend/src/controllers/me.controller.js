"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyPayments = exports.getMyAttendance = exports.getMyProfile = void 0;
const Member_1 = require("../models/Member");
const Attendance_1 = require("../models/Attendance");
const Payment_1 = require("../models/Payment");
const getMyProfile = async (req, res) => {
    try {
        const member = await Member_1.Member.findById(req.user?.id).populate('gym', 'name location');
        if (!member)
            return res.status(404).json({ success: false, message: 'Profile not found' });
        res.status(200).json({ success: true, data: member });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMyProfile = getMyProfile;
const getMyAttendance = async (req, res) => {
    try {
        const attendance = await Attendance_1.Attendance.find({ member: req.user?.id }).sort({ date: -1 });
        res.status(200).json({ success: true, data: attendance });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMyAttendance = getMyAttendance;
const getMyPayments = async (req, res) => {
    try {
        const payments = await Payment_1.Payment.find({ member: req.user?.id }).populate('plan', 'name').sort({ paymentDate: -1 });
        res.status(200).json({ success: true, data: payments });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMyPayments = getMyPayments;
//# sourceMappingURL=me.controller.js.map