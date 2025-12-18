"use client";

import dynamic from 'next/dynamic';

// Charger le composant uniquement côté client pour éviter les erreurs d'hydratation
const QRScannerComponent = dynamic(() => import('./QRScannerComponent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement du scanner...</p>
      </div>
    </div>
  ),
});

export default function QRScanPage() {
  return <QRScannerComponent />;
}
