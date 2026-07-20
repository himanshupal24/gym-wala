"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const owner_controller_1 = require("../controllers/owner.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
router.get('/', owner_controller_1.getOwners);
router.patch('/:id/status', owner_controller_1.updateOwnerStatus);
router.delete('/:id', owner_controller_1.deleteOwner);
exports.default = router;
//# sourceMappingURL=owner.routes.js.map