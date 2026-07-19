"use client"

import { MainLayout } from "@/components/layout/MainLayout"
import { useQuery } from "@tanstack/react-query"
import { reportsService } from "@/services/reports.service"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, DollarSign, CalendarCheck } from "lucide-react"

export default function ReportsPage() {
  const { data: statsRes } = useQuery({
    queryKey: ['reports', 'dashboard'],
    queryFn: () => reportsService.getDashboardStats()
  })

  const { data: chartRes } = useQuery({
    queryKey: ['reports', 'revenue'],
    queryFn: () => reportsService.getRevenueChart()
  })

  const stats = statsRes?.data || { totalMembers: 0, activeMembers: 0, monthlyRevenue: 0, todayAttendance: 0 }
  const chartData = chartRes?.data || []

  return (
    <MainLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Analytics & Reports</h1>
          <p className="text-slate-500 dark:text-slate-400">Deep insights into your gym's performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-500 dark:text-slate-400">Total Members</h3>
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {stats.totalMembers}
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-500 dark:text-slate-400">Active Members</h3>
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {stats.activeMembers}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-500 dark:text-slate-400">Monthly Revenue</h3>
              <DollarSign className="h-5 w-5 text-indigo-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              ${stats.monthlyRevenue.toLocaleString()}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-500 dark:text-slate-400">Today's Attendance</h3>
              <CalendarCheck className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {stats.todayAttendance}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Revenue Overview (Last 12 Months)</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
