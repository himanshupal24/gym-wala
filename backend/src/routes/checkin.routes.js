"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkin_controller_1 = require("../controllers/checkin.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Public route to fetch gym info for the checkin screen
router.get('/:gymUniqueCode', checkin_controller_1.getGymForCheckin);
// Protected route to process the check-in (requires Member JWT)
router.post('/', auth_1.protect, checkin_controller_1.processQRCheckin);
exports.default = router;
//# sourceMappingURL=checkin.routes.js.map