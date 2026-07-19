"use client"

import { Store, Users, Clock, DollarSign, Activity } from "lucide-react"

interface StatCardsProps {
  stats: {
    totalGyms: number;
    activeMembers: number;
    pendingApprovals: number;
    monthlyRevenue: number;
    platformHealth: number;
  }
}

export function StatCards({ stats }: StatCardsProps) {
  const cards = [
    {
      title: "Total Gyms",
      value: stats.totalGyms.toLocaleString(),
      icon: Store,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Active Members",
      value: stats.activeMembers.toLocaleString(),
      icon: Users,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      title: "Pending Approvals",
      value: stats.pendingApprovals,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      title: "Monthly Revenue",
      value: `$${(stats.monthlyRevenue / 1000).toFixed(1)}k`,
      icon: DollarSign,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Platform Health",
      value: `${stats.platformHealth}%`,
      icon: Activity,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-100 dark:bg-rose-900/30",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg ${card.bg}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.title}</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}
