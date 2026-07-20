"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMemberStatus = exports.getMemberAnalytics = exports.deleteMember = exports.updateMember = exports.createMember = exports.getMembers = void 0;
const Member_1 = require("../models/Member");
const Gym_1 = require("../models/Gym");
// Helper to get Gym ID based on who is requesting
const getGymIdForRequest = async (req) => {
    if (req.user?.type === 'Owner') {
        const gym = await Gym_1.Gym.findOne({ owner: req.user.id });
        return gym ? gym._id.toString() : null;
    }
    // If it's an Admin, they could pass gymId in query or params.
    // For now, if Admin requests, we might return null to signify "no gym restriction" 
    // or they must provide it. We'll handle this in the controller.
    return req.query.gymId || null;
};
const getMembers = async (req, res) => {
    try {
        const status = req.query.status;
        const filter = status && status !== 'All' ? { status } : {};
        if (req.user?.type === 'Owner') {
            const gymId = await getGymIdForRequest(req);
            if (!gymId)
                return res.status(404).json({ success: false, message: 'Gym not found for this owner' });
            filter.gym = gymId;
        }
        else if (req.query.gymId) {
            filter.gym = req.query.gymId;
        }
        const members = await Member_1.Member.find(filter)
            .populate('gym', 'name location')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: members });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMembers = getMembers;
const createMember = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        if (!gymId && req.user?.type === 'Owner') {
            return res.status(404).json({ success: false, message: 'Gym not found for this owner' });
        }
        const { firstName, lastName, email, phone, status, membershipType } = req.body;
        const newMember = new Member_1.Member({
            firstName,
            lastName,
            email,
            phone,
            status,
            membershipType,
            gym: req.user?.type === 'Owner' ? gymId : req.body.gym
        });
        await newMember.save();
        res.status(201).json({ success: true, data: newMember });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createMember = createMember;
const updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const gymId = await getGymIdForRequest(req);
        const member = await Member_1.Member.findById(id);
        if (!member)
            return res.status(404).json({ success: false, message: 'Member not found' });
        if (req.user?.type === 'Owner' && member.gym.toString() !== gymId) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this member' });
        }
        const updatedMember = await Member_1.Member.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, data: updatedMember });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateMember = updateMember;
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const gymId = await getGymIdForRequest(req);
        const member = await Member_1.Member.findById(id);
        if (!member)
            return res.status(404).json({ success: false, message: 'Member not found' });
        if (req.user?.type === 'Owner' && member.gym.toString() !== gymId) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this member' });
        }
        await member.deleteOne();
        res.status(200).json({ success: true, message: 'Member deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteMember = deleteMember;
const getMemberAnalytics = async (req, res) => {
    try {
        const filter = {};
        if (req.user?.type === 'Owner') {
            const gymId = await getGymIdForRequest(req);
            if (gymId)
                filter.gym = gymId;
        }
        const totalMembers = await Member_1.Member.countDocuments(filter);
        const activeMembers = await Member_1.Member.countDocuments({ ...filter, status: 'Active' });
        const analytics = {
            totalMembers,
            activeMembers,
            retentionRate: 92.4, // mock percentage
            newMembersThisMonth: 12, // mock
            activityTrend: [
                { day: 'Mon', active: Math.floor(activeMembers * 0.8) },
                { day: 'Tue', active: Math.floor(activeMembers * 0.9) },
                { day: 'Wed', active: Math.floor(activeMembers * 0.85) },
                { day: 'Thu', active: Math.floor(activeMembers * 0.95) },
                { day: 'Fri', active: activeMembers },
                { day: 'Sat', active: Math.floor(activeMembers * 0.4) },
                { day: 'Sun', active: Math.floor(activeMembers * 0.3) },
            ]
        };
        res.status(200).json({ success: true, data: analytics });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMemberAnalytics = getMemberAnalytics;
const updateMemberStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const gymId = await getGymIdForRequest(req);
        if (!['Active', 'Inactive', 'Suspended'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }
        const member = await Member_1.Member.findById(id);
        if (!member)
            return res.status(404).json({ success: false, message: 'Member not found' });
        if (req.user?.type === 'Owner' && member.gym.toString() !== gymId) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        member.status = status;
        await member.save();
        res.status(200).json({ success: true, data: member });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateMemberStatus = updateMemberStatus;
//# sourceMappingURL=member.controller.js.map