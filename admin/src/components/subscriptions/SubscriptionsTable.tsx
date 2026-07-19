"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { MoreVertical } from "lucide-react"

interface Subscription {
  _id: string
  gym: { name: string; location?: { city: string } }
  plan: { name: string; price: number }
  status: 'Active' | 'Expired' | 'Cancelled' | 'PendingPayment'
  startDate: string
  endDate: string
  amountPaid: number
}

interface SubscriptionsTableProps {
  data: Subscription[]
  isLoading: boolean
}

export function SubscriptionsTable({ data, isLoading }: SubscriptionsTableProps) {
  const columns: ColumnDef<Subscription>[] = [
    {
      accessorKey: "gym",
      header: "Gym",
      cell: ({ row }) => (
        <div className="font-semibold text-slate-900 dark:text-white">
          {row.original.gym?.name || 'Unknown Gym'}
        </div>
      )
    },
    {
      accessorKey: "plan",
      header: "Plan",
      cell: ({ row }) => (
        <span className="text-slate-600 dark:text-slate-400 font-medium">
          {row.original.plan?.name || 'Unknown'}
        </span>
      )
    },
    {
      accessorKey: "amountPaid",
      header: "Amount",
      cell: ({ row }) => (
        <span className="text-slate-600 dark:text-slate-400">
          ${row.getValue("amountPaid")}
        </span>
      )
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        if (status === 'Active') {
          return <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Active</span>
        }
        if (status === 'PendingPayment') {
          return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">Pending Payment</span>
        }
        return <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">{status}</span>
      }
    },
    {
      accessorKey: "endDate",
      header: "Renewal Date",
      cell: ({ row }) => (
        <span className="text-slate-500">
          {new Date(row.getValue("endDate")).toLocaleDateString()}
        </span>
      )
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex justify-end">
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      )
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
                    <td key={cell.id} className="px-6 py-4 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-500">
                  No subscriptions found.
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
