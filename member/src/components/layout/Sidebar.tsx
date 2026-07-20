'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CreditCard, 
  CalendarCheck, 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  Receipt, 
  Bell, 
  LifeBuoy, 
  Settings,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Membership', href: '/dashboard/membership', icon: CreditCard },
  { name: 'Attendance', href: '/dashboard/attendance', icon: CalendarCheck },
  { name: 'Workout Plan', href: '/dashboard/workout', icon: Dumbbell },
  { name: 'Diet Plan', href: '/dashboard/diet', icon: Apple },
  { name: 'Progress Tracker', href: '/dashboard/progress', icon: TrendingUp },
  { name: 'Payment History', href: '/dashboard/payments', icon: Receipt },
  { name: 'Announcements', href: '/dashboard/announcements', icon: Bell },
  { name: 'Support', href: '/dashboard/support', icon: LifeBuoy },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-zinc-950 border-r border-zinc-800 text-zinc-300 w-64 pt-6 pb-4">
      <div className="flex items-center px-6 mb-10 gap-3">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg">
          <Activity className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white leading-none">GymWala</h2>
          <span className="text-xs text-zinc-500">Member Portal</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.name} href={item.href}>
              <div className={cn(
                "relative flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all group",
                isActive 
                  ? "text-white" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
              )}>
                {isActive && (
                  <motion.div 
                    layoutId="active-sidebar-pill"
                    className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={cn("w-5 h-5 relative z-10", isActive ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300")} />
                <span className="relative z-10">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      
      <div className="px-6 mt-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <p className="text-xs text-zinc-400 mb-2">Need help?</p>
          <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            Contact Front Desk
          </button>
        </div>
      </div>
    </div>
  );
}
