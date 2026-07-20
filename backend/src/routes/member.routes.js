"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_controller_1 = require("../controllers/member.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
router.get('/', member_controller_1.getMembers);
router.post('/', member_controller_1.createMember);
router.put('/:id', member_controller_1.updateMember);
router.delete('/:id', member_controller_1.deleteMember);
router.get('/analytics', member_controller_1.getMemberAnalytics);
router.patch('/:id/status', member_controller_1.updateMemberStatus);
exports.default = router;
//# sourceMappingURL=member.routes.js.map