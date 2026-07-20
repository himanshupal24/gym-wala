"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwnerRevenueChart = exports.getOwnerDashboardStats = void 0;
const Member_1 = require("../models/Member");
const Payment_1 = require("../models/Payment");
const Attendance_1 = require("../models/Attendance");
const Gym_1 = require("../models/Gym");
const getGymIdForRequest = async (req) => {
    if (req.user?.type === 'Owner') {
        const gym = await Gym_1.Gym.findOne({ owner: req.user.id });
        return gym ? gym._id.toString() : null;
    }
    return req.query.gymId || null;
};
const getOwnerDashboardStats = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        if (!gymId)
            return res.status(404).json({ success: false, message: 'Gym not found' });
        const totalMembers = await Member_1.Member.countDocuments({ gym: gymId });
        const activeMembers = await Member_1.Member.countDocuments({ gym: gymId, status: 'Active' });
        // Current month revenue
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const payments = await Payment_1.Payment.find({
            gym: gymId,
            paymentDate: { $gte: startOfMonth },
            status: 'Completed'
        });
        const monthlyRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
        // Today's attendance
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayAttendance = await Attendance_1.Attendance.countDocuments({ gym: gymId, date: today });
        res.status(200).json({
            success: true,
            data: {
                totalMembers,
                activeMembers,
                monthlyRevenue,
                todayAttendance
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getOwnerDashboardStats = getOwnerDashboardStats;
// Returns a simple 12-month revenue trend for the owner's gym
const getOwnerRevenueChart = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        if (!gymId)
            return res.status(404).json({ success: false, message: 'Gym not found' });
        // To keep it simple, we generate mock data based on the real active members
        // In a real app, this would aggregate actual `Payment` records per month using MongoDB Aggregation Pipeline
        const activeMembers = await Member_1.Member.countDocuments({ gym: gymId, status: 'Active' });
        const baseRevenue = activeMembers * 50; // Mock average plan price
        const data = [
            { name: 'Jan', revenue: baseRevenue * 0.8 },
            { name: 'Feb', revenue: baseRevenue * 0.85 },
            { name: 'Mar', revenue: baseRevenue * 0.9 },
            { name: 'Apr', revenue: baseRevenue * 0.95 },
            { name: 'May', revenue: baseRevenue * 0.98 },
            { name: 'Jun', revenue: baseRevenue },
            { name: 'Jul', revenue: baseRevenue * 1.05 },
            { name: 'Aug', revenue: baseRevenue * 1.08 },
            { name: 'Sep', revenue: baseRevenue * 1.1 },
            { name: 'Oct', revenue: baseRevenue * 1.15 },
            { name: 'Nov', revenue: baseRevenue * 1.2 },
            { name: 'Dec', revenue: baseRevenue * 1.25 },
        ];
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getOwnerRevenueChart = getOwnerRevenueChart;
//# sourceMappingURL=reports.controller.js.map