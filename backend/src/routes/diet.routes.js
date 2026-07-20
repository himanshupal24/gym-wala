"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diet_controller_1 = require("../controllers/diet.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
router.get('/', diet_controller_1.getDiets);
router.post('/', diet_controller_1.createDiet);
router.delete('/:id', diet_controller_1.deleteDiet);
exports.default = router;
//# sourceMappingURL=diet.routes.js.map