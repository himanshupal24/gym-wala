"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gym_controller_1 = require("../controllers/gym.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/qr', auth_1.protect, (0, auth_1.authorize)('Owner', 'Super Admin'), gym_controller_1.getGymQR);
router.post('/qr/regenerate', auth_1.protect, (0, auth_1.authorize)('Super Admin'), gym_controller_1.regenerateGymQR);
router.use(auth_1.protect);
router.get('/', gym_controller_1.getGyms);
router.post('/', gym_controller_1.createGym);
router.patch('/:id/status', gym_controller_1.updateGymStatus);
router.delete('/:id', gym_controller_1.deleteGym);
exports.default = router;
//# sourceMappingURL=gym.routes.js.map