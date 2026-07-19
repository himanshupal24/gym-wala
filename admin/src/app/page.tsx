"use client"

import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboard.service'
import { StatCards } from '@/components/dashboard/StatCards'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { GymGrowthChart } from '@/components/dashboard/GymGrowthChart'

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: dashboardService.getStats
  })

  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ['dashboardRevenue'],
    queryFn: dashboardService.getRevenue
  })

  const { data: growthData, isLoading: growthLoading } = useQuery({
    queryKey: ['dashboardGrowth'],
    queryFn: dashboardService.getGrowth
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome to your super admin portal. Here's what's happening today.</p>
        </div>
      </div>
      
      {statsLoading ? (
        <div className="h-32 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl w-full"></div>
      ) : (
        stats && <StatCards stats={stats} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Overview</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Monthly platform revenue growth</p>
          </div>
          {revenueLoading ? (
            <div className="flex-1 min-h-[300px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl"></div>
          ) : (
            revenueData && <RevenueChart data={revenueData} />
          )}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gym Onboarding</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">New gyms added per month</p>
          </div>
          {growthLoading ? (
            <div className="flex-1 min-h-[300px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl"></div>
          ) : (
            growthData && <GymGrowthChart data={growthData} />
          )}
        </div>
      </div>
    </div>
  )
}
