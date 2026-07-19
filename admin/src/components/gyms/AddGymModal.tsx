import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { X } from "lucide-react"
import { gymService } from "@/services/gym.service"
import { ownerService } from "@/services/owner.service"

interface AddGymModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddGymModal({ isOpen, onClose }: AddGymModalProps) {
  const queryClient = useQueryClient()
  
  const { data: owners } = useQuery({
    queryKey: ['owners'],
    queryFn: () => ownerService.getOwners()
  })

  const mutation = useMutation({
    mutationFn: gymService.createGym,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gyms'] })
      onClose()
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    
    const payload = {
      name: formData.get('name'),
      owner: formData.get('owner'),
      subscriptionPlan: formData.get('subscriptionPlan'),
      location: {
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode'),
        country: formData.get('country')
      }
    }

    mutation.mutate(payload)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Gym</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Gym Name *</label>
              <input 
                name="name"
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Iron Paradise Gym"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Assign Owner *</label>
              <select 
                name="owner"
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select an owner...</option>
                {owners?.map((owner: any) => (
                  <option key={owner._id} value={owner._id}>
                    {owner.firstName} {owner.lastName} ({owner.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subscription Plan *</label>
              <select 
                name="subscriptionPlan"
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Starter">Starter</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Address *</label>
              <input 
                name="address"
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="123 Fitness Blvd"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">City *</label>
              <input 
                name="city"
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">State / Province *</label>
              <input 
                name="state"
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Country *</label>
              <input 
                name="country"
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Zip Code</label>
              <input 
                name="zipCode"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {mutation.isPending ? 'Saving...' : 'Create Gym'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
