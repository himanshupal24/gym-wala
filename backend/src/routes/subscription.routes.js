"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscription_controller_1 = require("../controllers/subscription.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
// Plans
router.get('/plans', subscription_controller_1.getPlans);
router.post('/plans', subscription_controller_1.createPlan);
// Subscriptions
router.get('/', subscription_controller_1.getSubscriptions);
exports.default = router;
//# sourceMappingURL=subscription.routes.js.map