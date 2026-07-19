"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, Users, CreditCard, CalendarCheck, 
  Settings, MessageSquare, Dumbbell, Activity, ShieldCheck
} from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Members", href: "/members", icon: Users },
  { name: "Membership Plans", href: "/plans", icon: CreditCard },
  { name: "Attendance", href: "/attendance", icon: CalendarCheck },
  { name: "Payments", href: "/payments", icon: Activity },
  { name: "Staff", href: "/staff", icon: ShieldCheck },
  { name: "Workout Plans", href: "/workouts", icon: Dumbbell },
  { name: "Communication", href: "/communication", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden md:flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <Dumbbell className="h-6 w-6 text-blue-600 mr-2" />
        <span className="text-xl font-bold text-slate-900 dark:text-white">GymWala</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">
          Manage Gym
        </div>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
