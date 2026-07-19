"use client"

import { MainLayout } from "@/components/layout/MainLayout"
import { Settings, Save, Shield, Store } from "lucide-react"

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Configure your gym preferences and operations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-2">
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg flex items-center font-medium cursor-pointer">
              <Store className="h-5 w-5 mr-3" /> Gym Profile
            </div>
            <div className="p-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg flex items-center font-medium cursor-pointer transition-colors">
              <Shield className="h-5 w-5 mr-3" /> Security
            </div>
            <div className="p-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg flex items-center font-medium cursor-pointer transition-colors">
              <Settings className="h-5 w-5 mr-3" /> Preferences
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Gym Profile</h2>
                <p className="text-sm text-slate-500">Update your facility's public information.</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Gym Name</label>
                    <input type="text" className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md" defaultValue="Iron Will Fitness" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Contact Number</label>
                    <input type="text" className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Address</label>
                  <input type="text" className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md" defaultValue="123 Muscle Ave, Fitness City" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tax ID / Business Registration</label>
                  <input type="text" className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md" defaultValue="TX-99882233" />
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center">
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
