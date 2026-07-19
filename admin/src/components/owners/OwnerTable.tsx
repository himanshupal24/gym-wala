"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { MoreVertical, CheckCircle2, XCircle, AlertCircle, Phone, Mail } from "lucide-react"
import { ownerService } from "@/services/owner.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface Owner {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  status: 'Active' | 'Pending' | 'Suspended'
  createdAt: string
}

interface OwnerTableProps {
  data: Owner[]
  isLoading: boolean
}

export function OwnerTable({ data, isLoading }: OwnerTableProps) {
  const queryClient = useQueryClient()

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => ownerService.updateOwnerStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owners'] })
    }
  })

  const columns: ColumnDef<Owner>[] = [
    {
      accessorKey: "name",
      header: "Owner Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            {row.original.firstName.charAt(0)}{row.original.lastName.charAt(0)}
          </div>
          <div className="font-semibold text-slate-900 dark:text-white">
            {row.original.firstName} {row.original.lastName}
          </div>
        </div>
      )
    },
    {
      accessorKey: "contact",
      header: "Contact Details",
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
            <Mail className="h-3 w-3" /> {row.original.email}
          </div>
          {row.original.phone && (
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <Phone className="h-3 w-3" /> {row.original.phone}
            </div>
          )}
        </div>
      )
    },
    {
      accessorKey: "createdAt",
      header: "Joined Date",
      cell: ({ row }) => (
        <span className="text-slate-600 dark:text-slate-400 text-sm">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
      )
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
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
        const owner = row.original
        return (
          <div className="flex justify-end gap-2">
            {owner.status === 'Pending' && (
              <button 
                onClick={() => statusMutation.mutate({ id: owner._id, status: 'Active' })}
                className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-lg hover:bg-emerald-700"
              >
                Approve
              </button>
            )}
            {owner.status === 'Active' && (
              <button 
                onClick={() => statusMutation.mutate({ id: owner._id, status: 'Suspended' })}
                className="text-xs border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Suspend
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
    return <div className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl w-full mt-6"></div>
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm mt-6">
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
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-500">
                  No owners found.
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
