"use client"

import { MainLayout } from "@/components/layout/MainLayout"
import { Dumbbell } from "lucide-react"

export default function WorkoutsPage() {
  return (
    <MainLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Workout Plans</h1>
          <p className="text-slate-500 dark:text-slate-400">Assign specific workout plans to your members.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-12 flex flex-col items-center justify-center text-center">
          <div className="h-20 w-20 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
            <Dumbbell className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Exercise Library Empty</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
            You haven't assigned any workout plans yet. This feature allows your trainers to build detailed sets and reps for each client.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Assign First Workout
          </button>
        </div>
      </div>
    </MainLayout>
  )
}
