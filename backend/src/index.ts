import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';
import gymRoutes from './routes/gym.routes';
import subscriptionRoutes from './routes/subscription.routes';
import ownerRoutes from './routes/owner.routes';
import memberRoutes from './routes/member.routes';
import ticketRoutes from './routes/ticket.routes';
import settingsRoutes from './routes/settings.routes';
import membershipPlanRoutes from './routes/membership-plan.routes';
import attendanceRoutes from './routes/attendance.routes';
import paymentRoutes from './routes/payment.routes';
import staffRoutes from './routes/staff.routes';
import workoutRoutes from './routes/workout.routes';
import dietRoutes from './routes/diet.routes';
import announcementRoutes from './routes/announcement.routes';
import reportsRoutes from './routes/reports.routes';
import meRoutes from './routes/me.routes';
import checkinRoutes from './routes/checkin.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Built-in Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gymwala';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/gyms', gymRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/membership-plans', membershipPlanRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/me', meRoutes);
app.use('/api/checkin', checkinRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to GymWala Shared API' });
});

// Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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

export default app;
