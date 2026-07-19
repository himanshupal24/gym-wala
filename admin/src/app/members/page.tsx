"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { memberService } from "@/services/member.service"
import { MembersTable } from "@/components/members/MembersTable"
import { Search, Filter, Download, Activity, Users } from "lucide-react"
import { AreaChart, Area, ResponsiveContainer } from "recharts"

export default function MembersPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Inactive'>('All')

  const { data: members, isLoading } = useQuery({
    queryKey: ['members', activeTab],
    queryFn: () => memberService.getMembers(activeTab)
  })

  const { data: analytics } = useQuery({
    queryKey: ['memberAnalytics'],
    queryFn: memberService.getAnalytics
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Member Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400">Track membership growth and engagement across the network.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Analytics Summary */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Members</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{analytics.totalMembers.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Retention Rate</p>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{analytics.retentionRate}%</h3>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
              <Activity className="h-6 w-6" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Activity (Last 7 Days)</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {analytics.activityTrend.reduce((acc: number, curr: any) => acc + curr.active, 0).toLocaleString()}
              </h3>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 opacity-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.activityTrend}>
                  <Area type="monotone" dataKey="active" stroke="#8b5cf6" fill="#8b5cf6" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('All')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'All' 
              ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          All Members
        </button>
        <button
          onClick={() => setActiveTab('Active')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'Active' 
              ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab('Inactive')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'Inactive' 
              ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          Inactive / Suspended
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search members by name, email, or gym..." 
          className="w-full md:max-w-md pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <MembersTable data={members || []} isLoading={isLoading} />
    </div>
  )
}
