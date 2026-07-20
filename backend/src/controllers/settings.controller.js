"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const Setting_1 = require("../models/Setting");
const AuditLog_1 = require("../models/AuditLog");
const getSettings = async (req, res) => {
    try {
        const settings = await Setting_1.Setting.find();
        // Group settings by their 'group' field for easier frontend consumption
        const groupedSettings = settings.reduce((acc, setting) => {
            if (!acc[setting.group]) {
                acc[setting.group] = {};
            }
            acc[setting.group][setting.key] = setting.value;
            return acc;
        }, {});
        // If no settings exist yet, return a mock default structure
        if (settings.length === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    general: { siteName: 'GymWala', supportEmail: 'support@gymwala.com' },
                    security: { maxLoginAttempts: 5, sessionTimeout: 60 },
                    billing: { currency: 'USD', platformFeePercentage: 2.5 }
                }
            });
        }
        res.status(200).json({ success: true, data: groupedSettings });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getSettings = getSettings;
const updateSettings = async (req, res) => {
    try {
        const { group, updates } = req.body;
        if (!group || !updates) {
            return res.status(400).json({ success: false, message: 'Group and updates are required' });
        }
        // Process each update in the group
        for (const [key, value] of Object.entries(updates)) {
            await Setting_1.Setting.findOneAndUpdate({ key, group }, { value, isPublic: false }, { upsert: true, new: true });
        }
        // Log the action
        if (req.user) {
            await AuditLog_1.AuditLog.create({
                admin: req.user._id,
                action: 'UPDATE_SETTINGS',
                resource: 'Setting',
                details: { group, updatedKeys: Object.keys(updates) },
                ipAddress: req.ip
            });
        }
        res.status(200).json({ success: true, message: 'Settings updated successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateSettings = updateSettings;
//# sourceMappingURL=settings.controller.js.map