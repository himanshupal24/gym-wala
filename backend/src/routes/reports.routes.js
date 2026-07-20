"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reports_controller_1 = require("../controllers/reports.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
router.get('/dashboard', reports_controller_1.getOwnerDashboardStats);
router.get('/revenue-chart', reports_controller_1.getOwnerRevenueChart);
exports.default = router;
//# sourceMappingURL=reports.routes.js.map