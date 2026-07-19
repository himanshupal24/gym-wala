"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { MoreVertical, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { gymService } from "@/services/gym.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface Gym {
  _id: string
  name: string
  location: { city: string; state: string }
  owner?: { firstName: string; lastName: string }
  memberCount: number
  status: 'Active' | 'Pending' | 'Suspended'
  subscriptionPlan: string
}

interface GymTableProps {
  data: Gym[]
  isLoading: boolean
}

export function GymTable({ data, isLoading }: GymTableProps) {
  const queryClient = useQueryClient()

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => gymService.updateGymStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gyms'] })
    }
  })

  const columns: ColumnDef<Gym>[] = [
    {
      accessorKey: "name",
      header: "Gym Name",
      cell: ({ row }) => (
        <div className="font-semibold text-slate-900 dark:text-white">
          {row.getValue("name")}
        </div>
      )
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        const loc = row.original.location
        return <span className="text-slate-600 dark:text-slate-400">{loc?.city}, {loc?.state}</span>
      }
    },
    {
      accessorKey: "owner",
      header: "Owner",
      cell: ({ row }) => {
        const owner = row.original.owner
        return <span className="text-slate-600 dark:text-slate-400">{owner ? `${owner.firstName} ${owner.lastName}` : 'N/A'}</span>
      }
    },
    {
      accessorKey: "subscriptionPlan",
      header: "Plan",
      cell: ({ row }) => (
        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-bold">
          {row.getValue("subscriptionPlan")}
        </span>
      )
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        if (status === 'Active') {
          return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold"><CheckCircle2 className="h-3 w-3" /> Active</span>
        }
        if (status === 'Pending') {
          return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold"><AlertCircle className="h-3 w-3" /> Pending</span>
        }
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold"><XCircle className="h-3 w-3" /> Suspended</span>
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const gym = row.original
        return (
          <div className="flex gap-2 justify-end">
            {gym.status === 'Pending' && (
              <button 
                onClick={() => statusMutation.mutate({ id: gym._id, status: 'Active' })}
                className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-lg hover:bg-emerald-700"
              >
                Approve
              </button>
            )}
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        )
      }
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (isLoading) {
    return <div className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl w-full"></div>
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-500">
                  No gyms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="text-sm text-slate-500">
          Showing page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={() => table.previousPage()} 
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 disabled:opacity-50"
          >
            Prev
          </button>
          <button 
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
