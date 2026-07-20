"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkout = exports.createWorkout = exports.getWorkouts = void 0;
const Workout_1 = require("../models/Workout");
const Gym_1 = require("../models/Gym");
const getGymIdForRequest = async (req) => {
    if (req.user?.type === 'Owner') {
        const gym = await Gym_1.Gym.findOne({ owner: req.user.id });
        return gym ? gym._id.toString() : null;
    }
    return req.query.gymId || null;
};
const getWorkouts = async (req, res) => {
    try {
        const filter = {};
        const gymId = await getGymIdForRequest(req);
        if (gymId)
            filter.gym = gymId;
        const workouts = await Workout_1.Workout.find(filter)
            .populate('member', 'firstName lastName')
            .populate('trainer', 'firstName lastName')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: workouts });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getWorkouts = getWorkouts;
const createWorkout = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        if (!gymId)
            return res.status(404).json({ success: false, message: 'Gym not found' });
        const newWorkout = new Workout_1.Workout({ ...req.body, gym: gymId });
        await newWorkout.save();
        res.status(201).json({ success: true, data: newWorkout });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createWorkout = createWorkout;
const deleteWorkout = async (req, res) => {
    try {
        const gymId = await getGymIdForRequest(req);
        const workout = await Workout_1.Workout.findById(req.params.id);
        if (!workout || (req.user?.type === 'Owner' && workout.gym.toString() !== gymId)) {
            return res.status(404).json({ success: false, message: 'Workout not found' });
        }
        await workout.deleteOne();
        res.status(200).json({ success: true, message: 'Workout deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteWorkout = deleteWorkout;
//# sourceMappingURL=workout.controller.js.map