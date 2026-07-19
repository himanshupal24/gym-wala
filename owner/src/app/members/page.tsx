"use client"

import { MainLayout } from "@/components/layout/MainLayout"
import { useQuery } from "@tanstack/react-query"
import { memberService } from "@/services/member.service"
import { Plus, Search, MoreHorizontal, User, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddMemberModal } from "@/components/members/AddMemberModal"
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

export default function MembersPage() {
  const { data: response, isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: () => memberService.getMembers()
  })

  const members = response?.data || []

  return (
    <MainLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Members</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your gym members and their subscriptions.</p>
          </div>
          <AddMemberModal />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search members..." 
                className="pl-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
                <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Name</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Contact</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Plan</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Status</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-slate-300">Joined</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                      Loading members...
                    </TableCell>
                  </TableRow>
                ) : members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                      No members found. Add your first member to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member: any) => (
                    <TableRow key={member._id} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                            {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">
                              {member.firstName} {member.lastName}
                            </div>
                            <div className="text-xs text-slate-500">
                              ID: {member._id.substring(member._id.length - 6)}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <Mail className="h-3 w-3 mr-2" /> {member.email}
                          </div>
                          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                            <Phone className="h-3 w-3 mr-2" /> {member.phone || 'N/A'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-slate-900 dark:text-white">{member.membershipType}</span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            member.status === 'Active' 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' 
                              : 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20'
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-2" />
                          {new Date(member.joinDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
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
