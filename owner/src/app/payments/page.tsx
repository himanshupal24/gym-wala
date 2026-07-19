"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { paymentService } from "@/services/payment.service"
import { memberService } from "@/services/member.service"
import { planService } from "@/services/plan.service"
import { Plus, Search, DollarSign, Receipt, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function PaymentsPage() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    memberId: "",
    planId: "",
    amount: 0,
    method: "Cash",
    status: "Completed",
    notes: ""
  })

  const { data: paymentsRes, isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: () => paymentService.getPayments()
  })

  const { data: membersRes } = useQuery({
    queryKey: ['members'],
    queryFn: () => memberService.getMembers()
  })
  
  const { data: plansRes } = useQuery({
    queryKey: ['plans'],
    queryFn: () => planService.getPlans()
  })

  const mutation = useMutation({
    mutationFn: (data: any) => paymentService.recordPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
      setIsModalOpen(false)
      setFormData({ memberId: "", planId: "", amount: 0, method: "Cash", status: "Completed", notes: "" })
    }
  })

  const payments = paymentsRes?.data || []
  const members = membersRes?.data || []
  const plans = plansRes?.data || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  // Auto-fill amount when plan is selected
  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const planId = e.target.value
    const selectedPlan = plans.find((p: any) => p._id === planId)
    setFormData({
      ...formData,
      planId,
      amount: selectedPlan ? selectedPlan.price : formData.amount
    })
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Payments</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage transactions, collect fees, and generate receipts.</p>
          </div>
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" /> Record Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Record New Payment</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Select Member</Label>
                    <select 
                      className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm"
                      value={formData.memberId}
                      onChange={(e) => setFormData({...formData, memberId: e.target.value})}
                      required
                    >
                      <option value="" disabled>Select member...</option>
                      {members.map((m: any) => (
                        <option key={m._id} value={m._id}>{m.firstName} {m.lastName}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Membership Plan (Optional)</Label>
                      <select 
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm"
                        value={formData.planId}
                        onChange={handlePlanChange}
                      >
                        <option value="">None / Custom</option>
                        {plans.map((p: any) => (
                          <option key={p._id} value={p._id}>{p.name} (${p.price})</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Amount Paid ($)</Label>
                      <Input 
                        type="number"
                        min="0"
                        required
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <select 
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm"
                        value={formData.method}
                        onChange={(e) => setFormData({...formData, method: e.target.value})}
                        required
                      >
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI / QR</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cheque">Cheque</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <select 
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm"
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        required
                      >
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Input 
                      placeholder="Optional receipt notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={mutation.isPending} className="bg-blue-600 text-white w-full">
                    {mutation.isPending ? 'Processing...' : 'Record Payment'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search transactions..." 
                className="pl-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
                <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Transaction Details</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Amount</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Method</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Date</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Status</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                      Loading payments...
                    </TableCell>
                  </TableRow>
                ) : payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                      No payments recorded yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment: any) => (
                    <TableRow key={payment._id} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <TableCell>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {payment.member.firstName} {payment.member.lastName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {payment.plan ? payment.plan.name : payment.notes || 'Custom Payment'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-slate-900 dark:text-white flex items-center">
                          <DollarSign className="h-3 w-3 mr-0.5 text-slate-400" />
                          {payment.amount.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <CreditCard className="h-3 w-3 mr-2" /> {payment.method}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {payment.status === 'Completed' ? (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                            Completed
                          </Badge>
                        ) : payment.status === 'Pending' ? (
                          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
                            Pending
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20">
                            Failed
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-600">
                          <Receipt className="h-4 w-4 mr-2" /> Receipt
                        </Button>
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
