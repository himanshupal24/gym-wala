"use client"

import { MainLayout } from "@/components/layout/MainLayout"
import { useQuery } from "@tanstack/react-query"
import { planService } from "@/services/plan.service"
import { Plus, MoreHorizontal, Edit, Trash, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddPlanModal } from "@/components/plans/AddPlanModal"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function PlansPage() {
  const { data: response, isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: () => planService.getPlans()
  })

  const plans = response?.data || []

  return (
    <MainLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Membership Plans</h1>
            <p className="text-slate-500 dark:text-slate-400">Create and manage the pricing plans you offer to your members.</p>
          </div>
          <AddPlanModal />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
                <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Plan Name</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Description</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Price</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Duration</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Status</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                      Loading plans...
                    </TableCell>
                  </TableRow>
                ) : plans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                      You haven't created any membership plans yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  plans.map((plan: any) => (
                    <TableRow key={plan._id} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <TableCell>
                        <span className="font-medium text-slate-900 dark:text-white">{plan.name}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-500 max-w-[200px] truncate block">
                          {plan.description || 'No description provided'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          ${plan.price.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                        {plan.durationInMonths} Month{plan.durationInMonths > 1 ? 's' : ''}
                      </TableCell>
                      <TableCell>
                        {plan.isActive ? (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                            <Check className="h-3 w-3 mr-1" /> Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                            <X className="h-3 w-3 mr-1" /> Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
