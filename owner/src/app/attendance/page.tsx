"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { attendanceService } from "@/services/attendance.service"
import { memberService } from "@/services/member.service"
import { QrCode, Search, CheckCircle, Clock } from "lucide-react"
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

export default function AttendancePage() {
  const queryClient = useQueryClient()
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false)
  const [selectedMemberId, setSelectedMemberId] = useState("")

  const { data: attendanceRes, isLoading } = useQuery({
    queryKey: ['attendance', date],
    queryFn: () => attendanceService.getAttendance(date)
  })

  // Fetch active members to select from in the Check In modal
  const { data: membersRes } = useQuery({
    queryKey: ['members', 'Active'],
    queryFn: () => memberService.getMembers('Active')
  })

  const checkInMutation = useMutation({
    mutationFn: (data: { memberId: string, status: string }) => attendanceService.markAttendance(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] })
      queryClient.invalidateQueries({ queryKey: ['members'] })
      setIsCheckInModalOpen(false)
      setSelectedMemberId("")
    }
  })

  const records = attendanceRes?.data || []
  const activeMembers = membersRes?.data || []

  const handleManualCheckIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMemberId) return
    checkInMutation.mutate({ memberId: selectedMemberId, status: 'Present' })
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Attendance</h1>
            <p className="text-slate-500 dark:text-slate-400">Track member check-ins and gym usage.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <QrCode className="h-4 w-4 mr-2 text-slate-500" /> QR Scanner
            </Button>
            
            <Dialog open={isCheckInModalOpen} onOpenChange={setIsCheckInModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <CheckCircle className="h-4 w-4 mr-2" /> Manual Check-in
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                <form onSubmit={handleManualCheckIn}>
                  <DialogHeader>
                    <DialogTitle>Manual Check-in</DialogTitle>
                  </DialogHeader>
                  <div className="py-6">
                    <label className="text-sm font-medium mb-2 block">Select Member</label>
                    <select 
                      className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md"
                      value={selectedMemberId}
                      onChange={(e) => setSelectedMemberId(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select an active member...</option>
                      {activeMembers.map((m: any) => (
                        <option key={m._id} value={m._id}>
                          {m.firstName} {m.lastName} - {m.email}
                        </option>
                      ))}
                    </select>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={checkInMutation.isPending || !selectedMemberId} className="bg-blue-600 text-white w-full">
                      {checkInMutation.isPending ? 'Processing...' : 'Confirm Check-in'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search history..." 
                className="pl-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
              />
            </div>
            <div>
              <Input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
                <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Member</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Check-in Time</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12 text-slate-500">
                      Loading attendance records...
                    </TableCell>
                  </TableRow>
                ) : records.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12 text-slate-500">
                      No check-ins recorded for this date.
                    </TableCell>
                  </TableRow>
                ) : (
                  records.map((record: any) => (
                    <TableRow key={record._id} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <TableCell>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {record.member.firstName} {record.member.lastName}
                        </div>
                        <div className="text-xs text-slate-500">{record.member.email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <Clock className="h-4 w-4 mr-2" />
                          {new Date(record.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </TableCell>
                      <TableCell>
                        {record.status === 'Present' ? (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                            Present
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
                            Late
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
