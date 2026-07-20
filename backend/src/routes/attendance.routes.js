"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = require("../controllers/attendance.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
router.get('/', attendance_controller_1.getAttendance);
router.post('/', attendance_controller_1.markAttendance);
exports.default = router;
//# sourceMappingURL=attendance.routes.js.map