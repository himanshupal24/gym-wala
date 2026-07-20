'use client';

import React from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell, LogOut, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function Header() {
  const { user, logout } = useAuth();
  
  const initials = user?.firstName?.[0] + (user?.lastName?.[0] || '');

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
      
      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="text-zinc-400 hover:text-white inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-zinc-950 border-r-zinc-800 w-72">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Spacer / Title */}
      <div className="hidden md:block text-zinc-400 text-sm font-medium">
        {/* Pathname breadcrumbs could go here */}
      </div>

      <div className="flex items-center gap-4 ml-auto">
        
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-zinc-400 hover:text-white rounded-full">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border border-zinc-950"></span>
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-white">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-zinc-500">{user?.membershipType || 'Standard'} Member</p>
              </div>
              <Avatar className="border border-zinc-800">
                <AvatarImage src="" />
                <AvatarFallback className="bg-emerald-500/10 text-emerald-500 font-medium">
                  {initials || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-zinc-800 text-zinc-300">
            <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="hover:bg-zinc-900 hover:text-white cursor-pointer focus:bg-zinc-900 focus:text-white">
              <User className="w-4 h-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem onClick={logout} className="text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer focus:bg-red-500/10 focus:text-red-300">
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}
