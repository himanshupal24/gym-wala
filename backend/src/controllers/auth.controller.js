"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = void 0;
const Admin_1 = require("../models/Admin");
const Owner_1 = require("../models/Owner");
const Member_1 = require("../models/Member");
require("../models/Role");
const auth_1 = require("../utils/auth");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }
        let user = await Admin_1.Admin.findOne({ email }).select('+passwordHash').populate('role');
        let userType = 'Admin';
        if (!user) {
            user = await Owner_1.Owner.findOne({ email }).select('+passwordHash');
            userType = 'Owner';
        }
        if (!user) {
            user = await Member_1.Member.findOne({ email }).select('+passwordHash');
            userType = 'Member';
        }
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        if (userType === 'Admin' && !user.isActive) {
            return res.status(401).json({ success: false, message: 'Account is suspended' });
        }
        else if (userType === 'Owner' && user.status !== 'Active') {
            return res.status(401).json({ success: false, message: 'Account is not active' });
        }
        else if (userType === 'Member' && user.status !== 'Active') {
            return res.status(401).json({ success: false, message: 'Member account is not active' });
        }
        const isMatch = await (0, auth_1.verifyPassword)(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        user.lastLogin = new Date();
        await user.save();
        const token = (0, auth_1.generateToken)(user, userType);
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: userType === 'Admin' ? user.role : { name: userType },
                type: userType,
                gymId: user.gym ? user.gym : undefined
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMe = getMe;
//# sourceMappingURL=auth.controller.js.map