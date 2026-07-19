"use client"

import { useAuthStore } from "@/store/useAuthStore"
import { Bell, Search, UserCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const { user, logout } = useAuthStore()

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search members, plans..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs text-slate-500">{user?.role?.name || 'Gym Owner'}</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <UserCircle className="h-5 w-5" />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={logout}
            title="Log out"
            className="text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
