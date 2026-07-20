"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// Protect all dashboard routes
router.use(auth_1.protect);
router.get('/stats', dashboard_controller_1.getDashboardStats);
router.get('/revenue', dashboard_controller_1.getRevenueChart);
router.get('/growth', dashboard_controller_1.getGymGrowthChart);
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map