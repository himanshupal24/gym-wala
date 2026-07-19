"use client"

import { Search, Bell, Grid } from "lucide-react"
import { ModeToggle } from "../theme/ModeToggle"
import { useAuthStore } from "@/store/useAuthStore"

export function Header() {
  const { user } = useAuthStore()

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center px-8 h-16">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search across all gyms, owners, and transactions..." 
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="h-10 w-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          <Bell className="h-5 w-5" />
        </button>
        <button className="h-10 w-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          <Grid className="h-5 w-5" />
        </button>
        
        <ModeToggle />

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {user ? `${user.firstName} ${user.lastName}` : 'Admin User'}
            </p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-sm border border-blue-200 dark:border-blue-800">
            {user ? user.firstName.charAt(0) : 'A'}
          </div>
        </div>
      </div>
    </header>
  )
}
