"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_controller_1 = require("../controllers/workout.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use(auth_1.protect);
router.get('/', workout_controller_1.getWorkouts);
router.post('/', workout_controller_1.createWorkout);
router.delete('/:id', workout_controller_1.deleteWorkout);
exports.default = router;
//# sourceMappingURL=workout.routes.js.map