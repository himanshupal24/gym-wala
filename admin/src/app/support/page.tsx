"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ticketService } from "@/services/ticket.service"
import { TicketTable } from "@/components/support/TicketTable"
import { Search, Filter, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Open' | 'InProgress' | 'Resolved'>('All')

  const { data: tickets, isLoading } = useQuery({
    queryKey: ['tickets', activeTab],
    queryFn: () => ticketService.getTickets(activeTab === 'All' ? undefined : activeTab)
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Support Center</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage and resolve tickets submitted by Gym Owners and Members.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      {/* Ticket Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Open Tickets</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">24</h3>
          </div>
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">In Progress</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">12</h3>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
            <Clock className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Resolved Today</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">18</h3>
          </div>
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg Response Time</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">2h 15m</h3>
          </div>
        </div>
      </div>

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
          All Tickets
        </button>
        <button
          onClick={() => setActiveTab('Open')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'Open' 
              ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          Open
        </button>
        <button
          onClick={() => setActiveTab('InProgress')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'InProgress' 
              ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          In Progress
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search tickets by subject, user, or ID..." 
          className="w-full md:max-w-md pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <TicketTable data={tickets || []} isLoading={isLoading} />
    </div>
  )
}
