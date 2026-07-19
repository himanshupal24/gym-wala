"use client"

import { Check, Edit2 } from "lucide-react"

interface Plan {
  _id: string
  name: string
  description: string
  price: number
  durationInMonths: number
  memberLimit: number
  branchLimit: number
  features: string[]
  isActive: boolean
}

interface PlanCardsProps {
  plans: Plan[]
  isLoading: boolean
}

export function PlanCards({ plans, isLoading }: PlanCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl w-full"></div>
        ))}
      </div>
    )
  }

  if (!plans?.length) {
    return <div className="p-8 text-center text-slate-500">No plans found. Please create one.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div key={plan._id} className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col hover:border-blue-500/50 transition-colors group">
          {!plan.isActive && (
            <div className="absolute top-4 right-4 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs px-2 py-1 rounded-full font-medium">
              Inactive
            </div>
          )}
          <button className="absolute top-4 right-4 text-slate-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <Edit2 className="h-4 w-4" />
          </button>
          
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{plan.description}</p>
          
          <div className="mb-6 flex items-baseline">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">${plan.price}</span>
            <span className="text-slate-500 ml-2">/ {plan.durationInMonths === 1 ? 'mo' : `${plan.durationInMonths} mos`}</span>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <Check className="h-4 w-4 text-blue-500" />
              <span>Up to <strong>{plan.memberLimit}</strong> members</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <Check className="h-4 w-4 text-blue-500" />
              <span>Up to <strong>{plan.branchLimit}</strong> branches</span>
            </div>
            {plan.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <Check className="h-4 w-4 text-blue-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
