"use client"

import { useQuery } from "@tanstack/react-query"
import { subscriptionService } from "@/services/subscription.service"
import { PlanCards } from "@/components/subscriptions/PlanCards"
import { SubscriptionsTable } from "@/components/subscriptions/SubscriptionsTable"
import { Plus } from "lucide-react"

export default function SubscriptionsPage() {
  const { data: plans, isLoading: plansLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: subscriptionService.getPlans
  })

  const { data: subscriptions, isLoading: subsLoading } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: subscriptionService.getSubscriptions
  })

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Subscriptions & Plans</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage available subscription tiers and monitor active gym billing.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Plus className="h-4 w-4" /> Create Plan
          </button>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Available Plans</h2>
        <PlanCards plans={plans} isLoading={plansLoading} />
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Active Subscriptions</h2>
        <SubscriptionsTable data={subscriptions || []} isLoading={subsLoading} />
      </section>
    </div>
  )
}
