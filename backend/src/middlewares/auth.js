"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = require("../models/Admin");
const Owner_1 = require("../models/Owner");
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretgymwala';
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized, no token' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        let user = null;
        let type = decoded.type || 'Admin'; // Default to Admin for older tokens
        if (type === 'Owner') {
            user = await Owner_1.Owner.findById(decoded.id).select('-passwordHash');
        }
        else if (type === 'Member') {
            const { Member } = require('../models/Member');
            user = await Member.findById(decoded.id).select('-passwordHash');
        }
        else {
            user = await Admin_1.Admin.findById(decoded.id).populate('role').select('-passwordHash');
        }
        if (!user) {
            return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
        }
        if (type === 'Admin' && !user.isActive) {
            return res.status(401).json({ success: false, message: 'Account is suspended' });
        }
        // Attach type explicitly since mongoose doc doesn't inherently have it
        const userObj = user.toObject();
        userObj.type = type;
        userObj.id = user._id;
        req.user = userObj;
        next();
    }
    catch (error) {
        console.error('Auth Middleware Error:', error);
        return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};
exports.protect = protect;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.type)) {
            return res.status(403).json({ success: false, message: `User role ${req.user?.type} is not authorized to access this route` });
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map