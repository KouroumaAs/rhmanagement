"use client";

import { useEffect } from "react";

export default function MobileConsole() {
  useEffect(() => {
    // Charger Eruda seulement en développement
    if (process.env.NODE_ENV === 'development') {
      import('eruda').then(eruda => {
        eruda.default.init();
        console.log('📱 Console mobile Eruda chargée !');
      });
    }
  }, []);

  return null;
}
