'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, AlertTriangle } from 'lucide-react';

interface GymQR {
  _id: string;
  name: string;
  gymUniqueCode: string;
  qrStatus: string;
}

export default function AdminQRManagementPage() {
  const [gyms, setGyms] = useState<GymQR[]>([]);
  const [loading, setLoading] = useState(true);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);

  const fetchGyms = async () => {
    try {
      const res = await api.get('/gyms');
      if (res.data.success) {
        setGyms(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch gyms', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGyms();
  }, []);

  const handleRegenerate = async (gymId: string, gymName: string) => {
    if (!confirm(`WARNING: This will instantly invalidate the current QR code for ${gymName}. Members will not be able to check in until the owner prints the new one. Are you absolutely sure?`)) return;
    
    setRegeneratingId(gymId);
    try {
      const res = await api.post('/gym/qr/regenerate', { gymId });
      if (res.data.success) {
        alert(`Success! New code: ${res.data.gymUniqueCode}`);
        fetchGyms();
      }
    } catch (error) {
      console.error('Failed to regenerate', error);
      alert('Failed to regenerate QR code');
    } finally {
      setRegeneratingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">QR Audit & Management</h1>
        <p className="text-zinc-500 mt-1">Super Admin control over permanent physical Gym QRs.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gym QR Directory</CardTitle>
          <CardDescription>Monitor and regenerate compromised QR codes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-900 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium">Gym Name</th>
                  <th className="px-4 py-3 font-medium">Unique Code</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {gyms.map((gym) => (
                  <tr key={gym._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="px-4 py-3 font-medium">{gym.name}</td>
                    <td className="px-4 py-3">
                      <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">
                        {gym.gymUniqueCode || 'N/A'}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${gym.qrStatus === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {gym.qrStatus || 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        disabled={regeneratingId === gym._id}
                        onClick={() => handleRegenerate(gym._id, gym.name)}
                      >
                        {regeneratingId === gym._id ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 mr-2" />
                        )}
                        Regenerate
                      </Button>
                    </td>
                  </tr>
                ))}
                {gyms.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                      No gyms found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
