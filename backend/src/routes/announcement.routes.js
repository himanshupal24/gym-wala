"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const announcement_controller_1 = require("../controllers/announcement.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
router.get('/', announcement_controller_1.getAnnouncements);
router.post('/', announcement_controller_1.createAnnouncement);
router.delete('/:id', announcement_controller_1.deleteAnnouncement);
exports.default = router;
//# sourceMappingURL=announcement.routes.js.map