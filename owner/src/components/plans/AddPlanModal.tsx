"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { planService } from "@/services/plan.service"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Loader2 } from "lucide-react"

export function AddPlanModal() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    durationInMonths: 1,
    isActive: true
  })

  const mutation = useMutation({
    mutationFn: (data: any) => planService.createPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] })
      setOpen(false)
      setFormData({ name: "", description: "", price: 0, durationInMonths: 1, isActive: true })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" /> Create Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Membership Plan</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input 
                id="name" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. 6-Month Premium"
                className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  type="number"
                  required 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (Months)</Label>
                <Input 
                  id="duration" 
                  type="number" 
                  required 
                  value={formData.durationInMonths}
                  onChange={(e) => setFormData({...formData, durationInMonths: Number(e.target.value)})}
                  className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief details about the plan"
                className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending} className="bg-blue-600 hover:bg-blue-700 text-white w-full">
              {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Plan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
