"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const gym_routes_1 = __importDefault(require("./routes/gym.routes"));
const subscription_routes_1 = __importDefault(require("./routes/subscription.routes"));
const owner_routes_1 = __importDefault(require("./routes/owner.routes"));
const member_routes_1 = __importDefault(require("./routes/member.routes"));
const ticket_routes_1 = __importDefault(require("./routes/ticket.routes"));
const settings_routes_1 = __importDefault(require("./routes/settings.routes"));
const membership_plan_routes_1 = __importDefault(require("./routes/membership-plan.routes"));
const attendance_routes_1 = __importDefault(require("./routes/attendance.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const staff_routes_1 = __importDefault(require("./routes/staff.routes"));
const workout_routes_1 = __importDefault(require("./routes/workout.routes"));
const diet_routes_1 = __importDefault(require("./routes/diet.routes"));
const announcement_routes_1 = __importDefault(require("./routes/announcement.routes"));
const reports_routes_1 = __importDefault(require("./routes/reports.routes"));
const me_routes_1 = __importDefault(require("./routes/me.routes"));
const checkin_routes_1 = __importDefault(require("./routes/checkin.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Security Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true
}));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);
// Built-in Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gymwala';
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
app.use('/api/gyms', gym_routes_1.default);
app.use('/api/subscriptions', subscription_routes_1.default);
app.use('/api/owners', owner_routes_1.default);
app.use('/api/members', member_routes_1.default);
app.use('/api/tickets', ticket_routes_1.default);
app.use('/api/settings', settings_routes_1.default);
app.use('/api/membership-plans', membership_plan_routes_1.default);
app.use('/api/attendance', attendance_routes_1.default);
app.use('/api/payments', payment_routes_1.default);
app.use('/api/staff', staff_routes_1.default);
app.use('/api/workouts', workout_routes_1.default);
app.use('/api/diets', diet_routes_1.default);
app.use('/api/announcements', announcement_routes_1.default);
app.use('/api/reports', reports_routes_1.default);
app.use('/api/me', me_routes_1.default);
app.use('/api/checkin', checkin_routes_1.default);
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to GymWala Shared API' });
});
// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map