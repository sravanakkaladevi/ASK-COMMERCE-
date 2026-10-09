"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Sparkles, X, Heart } from "lucide-react";

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type?: "cart" | "wishlist" | "success" | "info";
  image?: string;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev.slice(-3), newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full"
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto bg-[#1C1512]/95 backdrop-blur-xl border border-[#C9A24B]/30 text-[#FAF7F2] p-4 rounded-2xl shadow-2xl flex items-center gap-3 relative overflow-hidden group"
            >
              {/* Subtle gold glow hairline */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent opacity-60" />

              {toast.image ? (
                <div className="w-12 h-14 rounded-lg overflow-hidden shrink-0 border border-[#C9A24B]/20">
                  <img
                    src={toast.image}
                    alt={toast.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 flex items-center justify-center shrink-0 text-[#DFBE70]">
                  {toast.type === "wishlist" ? (
                    <Heart className="w-5 h-5 fill-[#C9A24B] text-[#C9A24B]" />
                  ) : toast.type === "cart" ? (
                    <Sparkles className="w-5 h-5 text-[#C9A24B]" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-[#C9A24B]" />
                  )}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-[0.2em] text-[#C9A24B] font-medium mb-0.5">
                  Aurelle Boutique
                </p>
                <h4 className="text-sm font-serif font-medium text-white line-clamp-1">
                  {toast.title}
                </h4>
                {toast.message && (
                  <p className="text-xs text-[#FAF7F2]/70 line-clamp-1 mt-0.5">
                    {toast.message}
                  </p>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-[#FAF7F2]/40 hover:text-white transition-colors p-1 rounded-full shrink-0"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
