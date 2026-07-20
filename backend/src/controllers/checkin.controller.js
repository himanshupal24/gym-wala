"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processQRCheckin = exports.getGymForCheckin = void 0;
const Gym_1 = require("../models/Gym");
const Member_1 = require("../models/Member");
const Attendance_1 = require("../models/Attendance");
const getGymForCheckin = async (req, res) => {
    try {
        const { gymUniqueCode } = req.params;
        if (!gymUniqueCode) {
            return res.status(400).json({ success: false, message: 'Gym code is required' });
        }
        const gym = await Gym_1.Gym.findOne({ gymUniqueCode, qrStatus: 'Active', qrEnabled: true });
        if (!gym) {
            return res.status(404).json({ success: false, message: 'Invalid or deactivated Gym QR Code' });
        }
        res.status(200).json({
            success: true,
            gym: {
                id: gym._id,
                name: gym.name,
                location: gym.location
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getGymForCheckin = getGymForCheckin;
const processQRCheckin = async (req, res) => {
    try {
        const { gymUniqueCode } = req.body;
        const user = req.user;
        if (!user || user.type !== 'Member') {
            return res.status(401).json({ success: false, message: 'Only members can check in' });
        }
        const gym = await Gym_1.Gym.findOne({ gymUniqueCode, qrStatus: 'Active', qrEnabled: true });
        if (!gym) {
            return res.status(404).json({ success: false, message: 'Invalid or deactivated Gym QR Code' });
        }
        // Verify member belongs to this gym
        const member = await Member_1.Member.findById(user.id);
        if (!member || member.gym.toString() !== gym._id.toString()) {
            return res.status(403).json({ success: false, message: 'You do not belong to this gym' });
        }
        if (member.status !== 'Active') {
            return res.status(403).json({ success: false, message: 'Your membership is not active' });
        }
        // Check if already checked in today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const existingAttendance = await Attendance_1.Attendance.findOne({
            member: member._id,
            gym: gym._id,
            date: { $gte: startOfDay }
        });
        if (existingAttendance) {
            return res.status(200).json({
                success: true,
                alreadyCheckedIn: true,
                message: 'You have already checked in today',
                attendance: existingAttendance
            });
        }
        // Mark attendance
        const attendance = new Attendance_1.Attendance({
            member: member._id,
            gym: gym._id,
            date: startOfDay,
            status: 'Present',
            checkInTime: new Date(),
            attendanceSource: 'QR',
            device: req.headers['user-agent'],
            ipAddress: req.ip
        });
        await attendance.save();
        member.lastAttendance = new Date();
        member.lastCheckIn = new Date();
        await member.save();
        res.status(200).json({
            success: true,
            alreadyCheckedIn: false,
            message: 'Check-in successful',
            attendance
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.processQRCheckin = processQRCheckin;
//# sourceMappingURL=checkin.controller.js.map