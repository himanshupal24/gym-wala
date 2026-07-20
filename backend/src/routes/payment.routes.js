"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
router.get('/', payment_controller_1.getPayments);
router.post('/', payment_controller_1.recordPayment);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map