"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOwner = exports.updateOwnerStatus = exports.getOwners = void 0;
const Owner_1 = require("../models/Owner");
const getOwners = async (req, res) => {
    try {
        const status = req.query.status;
        const filter = status ? { status } : {};
        // Select excludes passwordHash
        const owners = await Owner_1.Owner.find(filter).select('-passwordHash').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: owners });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getOwners = getOwners;
const updateOwnerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['Active', 'Suspended', 'Pending'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }
        const owner = await Owner_1.Owner.findByIdAndUpdate(id, { status }, { new: true }).select('-passwordHash');
        if (!owner) {
            return res.status(404).json({ success: false, message: 'Owner not found' });
        }
        res.status(200).json({ success: true, data: owner });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateOwnerStatus = updateOwnerStatus;
const deleteOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const owner = await Owner_1.Owner.findByIdAndDelete(id);
        if (!owner) {
            return res.status(404).json({ success: false, message: 'Owner not found' });
        }
        // Optionally delete associated gyms here, or set them to Suspended. 
        // In production, we usually implement soft-deletes or archive records instead.
        res.status(200).json({ success: true, message: 'Owner deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteOwner = deleteOwner;
//# sourceMappingURL=owner.controller.js.map