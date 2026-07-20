"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAttendance = exports.getAttendance = void 0;
const Attendance_1 = require("../models/Attendance");
const Member_1 = require("../models/Member");
const Gym_1 = require("../models/Gym");
const getGymIdForRequest = async (req) => {
    if (req.user?.type === 'Owner') {
        const gym = await Gym_1.Gym.findOne({ owner: req.user.id });
        return gym ? gym._id.toString() : null;
    }
    return req.query.gymId || null;
};
const getAttendance = async (req, res) => {
    try {
        const filter = {};
        const gymId = await getGymIdForRequest(req);
        if (gymId) {
            filter.gym = gymId;
        }
        else if (req.user?.type === 'Owner') {
            return res.status(404).json({ success: false, message: 'Gym not found' });
        }
        if (req.query.date) {
            const queryDate = new Date(req.query.date);
            const nextDay = new Date(queryDate);
            nextDay.setDate(nextDay.getDate() + 1);
            filter.date = { $gte: queryDate, $lt: nextDay };
        }
        const attendanceRecords = await Attendance_1.Attendance.find(filter)
            .populate('member', 'firstName lastName email')
            .sort({ checkInTime: -1 });
        res.status(200).json({ success: true, data: attendanceRecords });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getAttendance = getAttendance;
const markAttendance = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        if (!gymId)
            return res.status(404).json({ success: false, message: 'Gym not found' });
        const { memberId, status } = req.body;
        const member = await Member_1.Member.findById(memberId);
        if (!member || member.gym.toString() !== gymId) {
            return res.status(404).json({ success: false, message: 'Member not found in your gym' });
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const newAttendance = new Attendance_1.Attendance({
            member: memberId,
            gym: gymId,
            date: today,
            status: status || 'Present'
        });
        await newAttendance.save();
        // Update last check-in on member
        member.lastCheckIn = new Date();
        await member.save();
        const populatedRecord = await Attendance_1.Attendance.findById(newAttendance._id).populate('member', 'firstName lastName email');
        res.status(201).json({ success: true, data: populatedRecord });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.markAttendance = markAttendance;
//# sourceMappingURL=attendance.controller.js.map