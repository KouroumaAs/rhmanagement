"use client";

import { useEffect } from 'react';

export default function MobileDebugger() {
  useEffect(() => {
    // Charger Eruda uniquement côté client et en développement
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      import('eruda').then((eruda) => {
        eruda.default.init();
      });
    }
  }, []);

  return null;
}
