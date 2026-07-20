"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const me_controller_1 = require("../controllers/me.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Protect all /me routes
router.use(auth_1.protect);
router.get('/profile', me_controller_1.getMyProfile);
router.get('/attendance', me_controller_1.getMyAttendance);
router.get('/payments', me_controller_1.getMyPayments);
exports.default = router;
//# sourceMappingURL=me.routes.js.map