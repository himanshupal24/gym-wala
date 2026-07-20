'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, XCircle, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type CheckinState = 'INITIALIZING' | 'FETCHING_GYM' | 'PROCESSING' | 'SUCCESS' | 'ALREADY_CHECKED_IN' | 'ERROR';

export default function CheckinPage() {
  const router = useRouter();
  const params = useParams();
  const gymUniqueCode = params.gymUniqueCode as string;
  
  const [status, setStatus] = useState<CheckinState>('INITIALIZING');
  const [gymName, setGymName] = useState('GymWala');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const initializeCheckin = async () => {
      try {
        setStatus('FETCHING_GYM');
        // Fetch public gym details for branding
        const gymRes = await api.get(`/checkin/${gymUniqueCode}`);
        setGymName(gymRes.data.gym.name);

        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (!token || !userStr) {
          // Send to login, then redirect back here
          router.replace(`/login?redirect=/checkin/${gymUniqueCode}`);
          return;
        }

        // We have a token, process the checkin!
        setStatus('PROCESSING');
        const checkinRes = await api.post('/checkin', { gymUniqueCode });

        if (checkinRes.data.alreadyCheckedIn) {
          setStatus('ALREADY_CHECKED_IN');
        } else {
          setStatus('SUCCESS');
        }

        // Route to dashboard after seeing success
        setTimeout(() => {
          router.replace('/dashboard');
        }, 2500);

      } catch (error: any) {
        setStatus('ERROR');
        setErrorMessage(error.response?.data?.message || 'Failed to process check-in');
      }
    };

    initializeCheckin();
  }, [gymUniqueCode, router]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-emerald-500/20 blur-[120px] rounded-full z-0 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm z-10"
      >
        <Card className="bg-zinc-950/80 border-zinc-800 backdrop-blur-xl shadow-2xl overflow-hidden">
          
          <div className="bg-zinc-900 border-b border-zinc-800 p-6 text-center">
            <h2 className="text-xl font-bold text-white tracking-tight">{gymName}</h2>
            <p className="text-emerald-400 text-xs uppercase tracking-widest font-semibold mt-1">Smart Entry</p>
          </div>

          <CardContent className="p-8 flex flex-col items-center justify-center min-h-[240px] text-center">
            
            {(status === 'INITIALIZING' || status === 'FETCHING_GYM' || status === 'PROCESSING') && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center space-y-4"
              >
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                <p className="text-zinc-400 font-medium">
                  {status === 'PROCESSING' ? 'Recording attendance...' : 'Verifying Gym...'}
                </p>
              </motion.div>
            )}

            {status === 'SUCCESS' && (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center space-y-4"
              >
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Checked In!</h3>
                  <p className="text-zinc-400 text-sm">Have a great workout.</p>
                </div>
              </motion.div>
            )}

            {status === 'ALREADY_CHECKED_IN' && (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center space-y-4"
              >
                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Info className="w-10 h-10 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Already Recorded</h3>
                  <p className="text-zinc-400 text-sm">You are already checked in for today.</p>
                </div>
              </motion.div>
            )}

            {status === 'ERROR' && (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center space-y-4"
              >
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Check-in Failed</h3>
                  <p className="text-zinc-400 text-sm max-w-[250px]">{errorMessage}</p>
                </div>
                <Button 
                  onClick={() => router.push('/dashboard')}
                  variant="outline"
                  className="mt-4 border-zinc-700 text-zinc-300 hover:text-white"
                >
                  Go to Dashboard
                </Button>
              </motion.div>
            )}

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
