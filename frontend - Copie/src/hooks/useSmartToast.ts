/**
 * Hook intelligent pour éviter le spam de toasts
 * Résout le problème #35 de l'audit
 */

import { useToast as useOriginalToast } from "@/src/hooks/use-toast";
import { useRef } from "react";

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

const TOAST_COOLDOWN = 1000; // 1 seconde entre deux toasts identiques

export function useSmartToast() {
  const { toast: originalToast } = useOriginalToast();
  const lastToastsRef = useRef<Map<string, number>>(new Map());

  const toast = (options: ToastOptions) => {
    // Créer une clé unique basée sur le contenu du toast
    const key = `${options.variant || 'default'}-${options.title || ''}-${options.description || ''}`;
    const now = Date.now();
    const lastTime = lastToastsRef.current.get(key);

    // Vérifier si un toast identique a été affiché récemment
    if (lastTime && now - lastTime < TOAST_COOLDOWN) {
      // Ignorer ce toast (trop récent)
      return;
    }

    // Enregistrer le temps d'affichage
    lastToastsRef.current.set(key, now);

    // Nettoyer les entrées anciennes (> 5 secondes)
    const keysToDelete: string[] = [];
    lastToastsRef.current.forEach((time, k) => {
      if (now - time > 5000) {
        keysToDelete.push(k);
      }
    });
    keysToDelete.forEach((k) => lastToastsRef.current.delete(k));

    // Afficher le toast
    originalToast(options);
  };

  return { toast };
}
