'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Calendar, Flame, Droplets, ArrowRight, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { format, differenceInDays } from 'date-fns';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  // Mock data for MVP (would fetch from /api/me/profile & /api/me/workouts)
  const today = new Date();
  const expiryDate = new Date();
  expiryDate.setDate(today.getDate() + 45); // Mock 45 days remaining
  const daysRemaining = differenceInDays(expiryDate, today);
  const totalPlanDays = 90;
  const progressPercent = Math.max(0, 100 - ((daysRemaining / totalPlanDays) * 100));

  const stats = [
    { label: "Current Weight", value: "72.5 kg", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "BMI", value: "22.4", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Water Intake", value: "2.5L", icon: Droplets, color: "text-cyan-400", bg: "bg-cyan-500/10" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="space-y-6 pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
            Hello, {user?.firstName}
          </h1>
          <p className="text-zinc-400">
            {format(today, 'EEEE, MMMM do')} • Ready to crush your goals?
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/qr">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-xl h-11 px-5 shadow-emerald-500/20 shadow-lg transition-all">
              <QrCode className="mr-2 w-5 h-5" />
              Gym Entry QR
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Membership Status Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-zinc-800 bg-zinc-900/50 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Badge variant="outline" className="bg-zinc-950 border-emerald-500/30 text-emerald-400 mb-3 px-3 py-1 text-xs">
                      {user?.status || 'Active'}
                    </Badge>
                    <h2 className="text-2xl font-bold text-white">{user?.membershipType || 'Standard'} Plan</h2>
                    <p className="text-zinc-400 text-sm mt-1">GymWala Premium Access</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">{daysRemaining}</p>
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Days Left</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-zinc-400">
                    <span>Started {format(new Date(user?.createdAt || Date.now()), 'MMM d')}</span>
                    <span>Expires {format(expiryDate, 'MMM d, yyyy')}</span>
                  </div>
                  <Progress value={progressPercent} className="h-2 bg-zinc-800" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Today's Workout */}
          <motion.div variants={itemVariants}>
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-medium text-white flex items-center">
                    <Dumbbell className="w-5 h-5 mr-2 text-emerald-400" />
                    Today's Workout
                  </CardTitle>
                  <CardDescription className="text-zinc-400">Upper Body Power</CardDescription>
                </div>
                <Link href="/dashboard/workout" className="text-zinc-400 hover:text-white text-sm font-medium flex items-center">
                  View All <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-4">
                  {[
                    { name: 'Barbell Bench Press', sets: '4 sets', reps: '8-10 reps' },
                    { name: 'Incline Dumbbell Press', sets: '3 sets', reps: '10-12 reps' },
                    { name: 'Cable Crossovers', sets: '3 sets', reps: '15 reps' }
                  ].map((exercise, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                      <p className="font-medium text-zinc-200 text-sm">{exercise.name}</p>
                      <div className="text-xs text-zinc-500 flex gap-3 font-medium">
                        <span>{exercise.sets}</span>
                        <span className="text-zinc-600">•</span>
                        <span>{exercise.reps}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column (Narrower) */}
        <div className="space-y-6">
          
          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {stats.map((stat, i) => (
              <Card key={i} className="border-zinc-800 bg-zinc-900/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Announcements */}
          <motion.div variants={itemVariants}>
            <Card className="border-zinc-800 bg-zinc-900/50 h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                  Gym Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <h3 className="text-sm font-bold text-blue-400 mb-1">Holiday Hours</h3>
                  <p className="text-xs text-blue-200/70 leading-relaxed">
                    The gym will close at 5:00 PM this Sunday for maintenance. Please plan your workout accordingly!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

// Ensure Activity icon is defined for the stats array above
function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
