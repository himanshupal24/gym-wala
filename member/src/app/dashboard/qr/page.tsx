'use client';

import React from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function QRCardPage() {
  const { user } = useAuth();
  
  // Combine user details to form a unique secure string for backend verification
  // (In production, this would be a secure token or DB id)
  const qrValue = JSON.stringify({
    memberId: user?.id,
    gymId: user?.gymId,
    timestamp: Date.now()
  });

  const initials = user?.firstName?.[0] + (user?.lastName?.[0] || '');

  return (
    <div className="max-w-md mx-auto py-8">
      
      <div className="mb-6 flex items-center justify-between">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-zinc-400 hover:text-white px-0 hover:bg-transparent">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </Link>
        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
          <Download className="w-4 h-4 mr-2" />
          Save Card
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* The Digital Membership Card */}
        <Card className="border-zinc-800 bg-zinc-950 overflow-hidden shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)] relative">
          
          {/* Top colored strip */}
          <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-500 relative">
            <div className="absolute top-4 left-4">
              <h2 className="text-xl font-bold text-white tracking-tight">GymWala</h2>
              <p className="text-emerald-100 text-xs opacity-80 uppercase tracking-widest font-medium mt-1">Premium Member</p>
            </div>
            
            <div className="absolute -bottom-12 right-6">
              <Avatar className="w-24 h-24 border-4 border-zinc-950 shadow-xl bg-zinc-900">
                <AvatarImage src="" />
                <AvatarFallback className="text-3xl text-emerald-500 font-bold bg-zinc-900">
                  {initials || 'GW'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <CardContent className="pt-16 pb-8 px-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-1">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-zinc-400 text-sm mb-8 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {user?.status === 'Active' ? 'Active Subscription' : 'Inactive'}
            </p>

            <div className="bg-white p-4 rounded-2xl inline-block shadow-lg mx-auto mb-6">
              <QRCodeSVG 
                value={qrValue}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                imageSettings={{
                  src: "/favicon.ico", // Or GymWala logo if available
                  x: undefined,
                  y: undefined,
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
            </div>

            <p className="text-zinc-500 text-xs">
              Scan this QR code at the front desk for gym entry and attendance marking.
            </p>
          </CardContent>

          {/* Bottom styling line */}
          <div className="h-2 w-full bg-zinc-900" />
        </Card>
      </motion.div>
    </div>
  );
}
