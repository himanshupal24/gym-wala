"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncement = exports.createAnnouncement = exports.getAnnouncements = void 0;
const Announcement_1 = require("../models/Announcement");
const Gym_1 = require("../models/Gym");
const getGymIdForRequest = async (req) => {
    if (req.user?.type === 'Owner') {
        const gym = await Gym_1.Gym.findOne({ owner: req.user.id });
        return gym ? gym._id.toString() : null;
    }
    return req.query.gymId || null;
};
const getAnnouncements = async (req, res) => {
    try {
        const filter = {};
        const gymId = await getGymIdForRequest(req);
        if (gymId)
            filter.gym = gymId;
        const announcements = await Announcement_1.Announcement.find(filter)
            .populate('author', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: announcements });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getAnnouncements = getAnnouncements;
const createAnnouncement = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        if (!gymId)
            return res.status(404).json({ success: false, message: 'Gym not found' });
        const newAnnouncement = new Announcement_1.Announcement({
            ...req.body,
            gym: gymId,
            author: req.user?.id
        });
        await newAnnouncement.save();
        res.status(201).json({ success: true, data: newAnnouncement });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createAnnouncement = createAnnouncement;
const deleteAnnouncement = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        const announcement = await Announcement_1.Announcement.findById(req.params.id);
        if (!announcement || (req.user?.type === 'Owner' && announcement.gym.toString() !== gymId)) {
            return res.status(404).json({ success: false, message: 'Announcement not found' });
        }
        await announcement.deleteOne();
        res.status(200).json({ success: true, message: 'Announcement deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteAnnouncement = deleteAnnouncement;
//# sourceMappingURL=announcement.controller.js.map