"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Don't show layout on public auth pages
  if (pathname === "/login" || pathname === "/forgot-password") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 ml-[280px] flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
