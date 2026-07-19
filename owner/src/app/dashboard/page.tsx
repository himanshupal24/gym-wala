import { MainLayout } from "@/components/layout/MainLayout"
import { Users, TrendingUp, CreditCard, Activity } from "lucide-react"

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Owner Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome back. Here is what's happening at your gym today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Today's Attendance */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Today's Attendance</h3>
              <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">124</span>
              <span className="text-sm font-medium text-emerald-600">+12%</span>
            </div>
          </div>

          {/* Active Members */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Active Members</h3>
              <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
                <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">842</span>
              <span className="text-sm font-medium text-emerald-600">+4 new</span>
            </div>
          </div>

          {/* Revenue Today */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Revenue Today</h3>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">$4,200</span>
              <span className="text-sm font-medium text-emerald-600">+15%</span>
            </div>
          </div>

          {/* Outstanding */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-500 dark:text-slate-400 text-sm">Outstanding Dues</h3>
              <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-lg">
                <CreditCard className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">$1,850</span>
              <span className="text-sm font-medium text-slate-400">12 members</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm min-h-[400px] flex items-center justify-center">
            <p className="text-slate-400">Revenue Chart Placeholder</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm min-h-[400px] flex items-center justify-center">
            <p className="text-slate-400">Recent Activity Placeholder</p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
