"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { staffService } from "@/services/staff.service"
import { Plus, Search, ShieldCheck, Mail, Phone } from "lucide-react"
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

export default function StaffPage() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Trainer",
    status: "Active"
  })

  const { data: staffRes, isLoading } = useQuery({
    queryKey: ['staff'],
    queryFn: () => staffService.getStaff()
  })

  const mutation = useMutation({
    mutationFn: (data: any) => staffService.createStaff(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] })
      setIsModalOpen(false)
      setFormData({ firstName: "", lastName: "", email: "", phone: "", role: "Trainer", status: "Active" })
    }
  })

  const staffList = staffRes?.data || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Staff Management</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your trainers, receptionists, and managers.</p>
          </div>
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" /> Add Staff Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Add New Staff Member</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input 
                        required 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input 
                        required 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <select 
                      className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      required
                    >
                      <option value="Trainer">Trainer</option>
                      <option value="Receptionist">Receptionist</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={mutation.isPending} className="bg-blue-600 text-white w-full">
                    {mutation.isPending ? 'Processing...' : 'Save Staff Member'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search staff..." 
                className="pl-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
                <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Staff Member</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Contact</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Role</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-slate-500">
                      Loading staff...
                    </TableCell>
                  </TableRow>
                ) : staffList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-slate-500">
                      No staff members added yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  staffList.map((staff: any) => (
                    <TableRow key={staff._id} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                            {staff.firstName.charAt(0)}{staff.lastName.charAt(0)}
                          </div>
                          <div className="font-medium text-slate-900 dark:text-white">
                            {staff.firstName} {staff.lastName}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center"><Mail className="h-3 w-3 mr-2" /> {staff.email}</div>
                          <div className="flex items-center"><Phone className="h-3 w-3 mr-2" /> {staff.phone || 'N/A'}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center font-medium text-slate-900 dark:text-white">
                          <ShieldCheck className="h-4 w-4 mr-2 text-slate-400" /> {staff.role}
                        </div>
                      </TableCell>
                      <TableCell>
                        {staff.status === 'Active' ? (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                            Inactive
                          </Badge>
                        )}
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
