'use client';

import React, { useEffect, useState, useRef } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';
import { Loader2, Download, Printer, Copy, CheckCircle2 } from 'lucide-react';

export default function QRManagementPage() {
  const [loading, setLoading] = useState(true);
  const [gymUniqueCode, setGymUniqueCode] = useState('');
  const [copied, setCopied] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const res = await api.get('/gym/qr');
        if (res.data.success) {
          setGymUniqueCode(res.data.gymUniqueCode);
        }
      } catch (error) {
        console.error('Failed to fetch QR details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQR();
  }, []);

  const qrUrl = `https://member.gymwala.com/checkin/${gymUniqueCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GymWala-QR-${gymUniqueCode}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
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
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">QR Management</h1>
        <p className="text-zinc-500 mt-1">Manage and download your gym's official check-in QR code.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle>Gym Check-in QR</CardTitle>
            <CardDescription>Members scan this to mark attendance.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 mb-6 print:shadow-none print:border-none">
              <QRCodeSVG
                value={qrUrl}
                size={240}
                level="H"
                includeMargin={true}
                ref={svgRef}
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-500 mb-1">Unique Gym Code</p>
              <p className="text-2xl font-bold tracking-widest text-zinc-900 dark:text-white">
                {gymUniqueCode}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle>Actions & Sharing</CardTitle>
            <CardDescription>Export your QR code for printing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Check-in URL</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-zinc-100 dark:bg-zinc-950 rounded text-sm text-zinc-800 dark:text-zinc-300 break-all">
                  {qrUrl}
                </code>
                <Button variant="outline" size="icon" onClick={handleCopy}>
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button onClick={handleDownloadSVG} className="w-full justify-start" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Vector (SVG)
            </Button>

            <Button onClick={handlePrint} className="w-full justify-start" variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print QR Poster
            </Button>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/50">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-400 mb-1">Pro Tip</h4>
              <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                Download the SVG format for the highest quality when printing on large posters or standees.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
