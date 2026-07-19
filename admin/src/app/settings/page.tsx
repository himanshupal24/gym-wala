"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { settingsService } from "@/services/settings.service"
import { Save, Settings2, Shield, CreditCard, Mail } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'billing'>('general')
  const queryClient = useQueryClient()

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings
  })

  const updateMutation = useMutation({
    mutationFn: ({ group, updates }: { group: string, updates: any }) => settingsService.updateSettings(group, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      alert('Settings saved successfully')
    }
  })

  if (isLoading) {
    return <div className="p-8 animate-pulse text-slate-500">Loading settings...</div>
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const updates = Object.fromEntries(formData.entries())
    
    updateMutation.mutate({ group: activeTab, updates })
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Platform Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage global configurations, security policies, and billing defaults.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 space-y-1">
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'general' 
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Settings2 className="h-5 w-5" /> General
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'security' 
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Shield className="h-5 w-5" /> Security
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'billing' 
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <CreditCard className="h-5 w-5" /> Billing & Fees
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <form onSubmit={handleSave}>
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">General Settings</h3>
                  <p className="text-sm text-slate-500 mb-6">Basic information about the platform.</p>
                </div>
                
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Platform Name</label>
                    <input 
                      name="siteName"
                      defaultValue={settings?.general?.siteName || ''}
                      type="text" 
                      className="w-full max-w-md px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Support Email</label>
                    <div className="relative max-w-md">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input 
                        name="supportEmail"
                        defaultValue={settings?.general?.supportEmail || ''}
                        type="email" 
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Security Policies</h3>
                  <p className="text-sm text-slate-500 mb-6">Manage login restrictions and timeouts.</p>
                </div>
                
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Max Login Attempts (before lock)</label>
                    <input 
                      name="maxLoginAttempts"
                      defaultValue={settings?.security?.maxLoginAttempts || 5}
                      type="number" 
                      className="w-full max-w-xs px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Session Timeout (minutes)</label>
                    <input 
                      name="sessionTimeout"
                      defaultValue={settings?.security?.sessionTimeout || 60}
                      type="number" 
                      className="w-full max-w-xs px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Billing & Fees</h3>
                  <p className="text-sm text-slate-500 mb-6">Configure the default platform fees and currency.</p>
                </div>
                
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Default Currency</label>
                    <select 
                      name="currency"
                      defaultValue={settings?.billing?.currency || 'USD'}
                      className="w-full max-w-xs px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Platform Transaction Fee (%)</label>
                    <input 
                      name="platformFeePercentage"
                      defaultValue={settings?.billing?.platformFeePercentage || 2.5}
                      type="number" 
                      step="0.1"
                      className="w-full max-w-xs px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button 
                type="submit"
                disabled={updateMutation.isPending}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
              >
                <Save className="h-4 w-4" /> 
                {updateMutation.isPending ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
