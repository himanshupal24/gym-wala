"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_controller_1 = require("../controllers/ticket.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
router.get('/', ticket_controller_1.getTickets);
router.get('/:id', ticket_controller_1.getTicketDetails);
router.patch('/:id/status', ticket_controller_1.updateTicketStatus);
router.post('/:id/messages', ticket_controller_1.addTicketMessage);
exports.default = router;
//# sourceMappingURL=ticket.routes.js.map