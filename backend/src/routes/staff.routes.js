"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staff_controller_1 = require("../controllers/staff.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
router.get('/', staff_controller_1.getStaff);
router.post('/', staff_controller_1.createStaff);
router.put('/:id', staff_controller_1.updateStaff);
router.delete('/:id', staff_controller_1.deleteStaff);
exports.default = router;
//# sourceMappingURL=staff.routes.js.map