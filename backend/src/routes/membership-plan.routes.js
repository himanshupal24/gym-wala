"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const membership_plan_controller_1 = require("../controllers/membership-plan.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
router.get('/', membership_plan_controller_1.getPlans);
router.post('/', membership_plan_controller_1.createPlan);
router.put('/:id', membership_plan_controller_1.updatePlan);
router.delete('/:id', membership_plan_controller_1.deletePlan);
exports.default = router;
//# sourceMappingURL=membership-plan.routes.js.map