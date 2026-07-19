"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { gymService } from "@/services/gym.service"
import { GymTable } from "@/components/gyms/GymTable"
import { AddGymModal } from "@/components/gyms/AddGymModal"
import { Search, Filter, Plus } from "lucide-react"

export default function GymsPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Pending'>('All')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const { data: gyms, isLoading } = useQuery({
    queryKey: ['gyms', activeTab],
    queryFn: () => gymService.getGyms(activeTab === 'Pending' ? 'Pending' : undefined)
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Gym Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage and monitor all gym locations across the network.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" /> Add Gym
          </button>
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
          All Gyms
        </button>
        <button
          onClick={() => setActiveTab('Pending')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'Pending' 
              ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          Pending Approvals
          {/* Mock notification dot */}
          <span className="flex h-2 w-2 rounded-full bg-rose-500"></span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search gyms by name, location, or owner..." 
          className="w-full md:max-w-md pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <GymTable data={gyms || []} isLoading={isLoading} />
      
      <AddGymModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  )
}
