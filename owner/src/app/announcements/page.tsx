"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { announcementService } from "@/services/announcement.service"
import { Megaphone, Plus, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function AnnouncementsPage() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    priority: "Medium",
    targetAudience: "All"
  })

  const { data: res, isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: () => announcementService.getAnnouncements()
  })

  const mutation = useMutation({
    mutationFn: (data: any) => announcementService.createAnnouncement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] })
      setIsModalOpen(false)
      setFormData({ title: "", message: "", priority: "Medium", targetAudience: "All" })
    }
  })

  const announcements = res?.data || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Announcements</h1>
            <p className="text-slate-500 dark:text-slate-400">Broadcast messages to your members and staff.</p>
          </div>
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" /> New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Broadcast Announcement</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input 
                      required 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g. Holiday Closure Notice"
                      className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <textarea 
                      required 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Enter the announcement details..."
                      className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <select 
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm"
                        value={formData.priority}
                        onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High (Urgent)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Target Audience</Label>
                      <select 
                        className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-sm"
                        value={formData.targetAudience}
                        onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                      >
                        <option value="All">Everyone</option>
                        <option value="Active Members">Active Members Only</option>
                        <option value="Staff">Staff Only</option>
                      </select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={mutation.isPending} className="bg-blue-600 text-white w-full">
                    {mutation.isPending ? 'Sending...' : 'Publish Announcement'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {isLoading ? (
            <div className="p-8 text-center text-slate-500">Loading announcements...</div>
          ) : announcements.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <Megaphone className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">No Announcements Yet</h3>
              <p className="text-slate-500">Publish your first broadcast to keep everyone in the loop.</p>
            </div>
          ) : (
            announcements.map((item: any) => (
              <div key={item._id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${
                  item.priority === 'High' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400' :
                  item.priority === 'Medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400' :
                  'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                }`}>
                  <Bell className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>To: {item.targetAudience}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{item.priority}</Badge>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm whitespace-pre-wrap">{item.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  )
}
