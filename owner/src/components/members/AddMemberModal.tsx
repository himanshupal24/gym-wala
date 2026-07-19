"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { memberService } from "@/services/member.service"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Loader2 } from "lucide-react"

export function AddMemberModal() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    membershipType: "Standard"
  })

  const mutation = useMutation({
    mutationFn: (data: any) => memberService.createMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
      setOpen(false)
      setFormData({ firstName: "", lastName: "", email: "", phone: "", membershipType: "Standard" })
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
          <Plus className="h-4 w-4 mr-2" /> Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input 
                  id="firstName" 
                  required 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input 
                  id="lastName" 
                  required 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Membership Plan Name</Label>
              <Input 
                id="plan" 
                value={formData.membershipType}
                onChange={(e) => setFormData({...formData, membershipType: e.target.value})}
                placeholder="e.g. Monthly Pro"
                className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending} className="bg-blue-600 hover:bg-blue-700 text-white w-full">
              {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
