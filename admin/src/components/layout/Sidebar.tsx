"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Store, 
  CreditCard, 
  Users, 
  UserCircle, 
  LineChart, 
  Settings, 
  LifeBuoy,
  LogOut
} from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Gym Management", href: "/gyms", icon: Store },
  { name: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { name: "Gym Owners", href: "/owners", icon: UserCircle },
  { name: "Members", href: "/members", icon: Users },
  { name: "Revenue", href: "/revenue", icon: LineChart },
]

const utilityNav = [
  { name: "Support", href: "/support", icon: LifeBuoy },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuthStore()

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col py-6 z-50">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Store className="text-white h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">GymWala</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Super Admin</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-600 dark:border-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`} />
              <span>{item.name}</span>
            </Link>
          )
        })}

        <div className="pt-8 pb-2 px-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Utility</p>
        </div>

        {utilityNav.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <item.icon className="h-5 w-5 text-slate-400" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-4 mt-auto border-t border-slate-200 dark:border-slate-800 pt-6">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
