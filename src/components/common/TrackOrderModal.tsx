"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, PackageCheck, Truck, CheckCircle2, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function TrackOrderModal() {
  const { isTrackOrderOpen, setIsTrackOrderOpen } = useCart();
  const [orderNumber, setOrderNumber] = useState("");
  const [trackedResult, setTrackedResult] = useState<boolean | null>(null);

  if (!isTrackOrderOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setTrackedResult(true);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsTrackOrderOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#1C1512] text-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24B]/40 z-10 p-6 sm:p-8 space-y-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#C9A24B]/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7A0C1E] border border-[#F5D061]/50 flex items-center justify-center text-[#F5D061]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFBE70] font-bold block">
                  ATELIER LOGISTICS
                </span>
                <h3 className="font-display text-2xl text-[#FAF7F2] font-normal">
                  Track Your Silk Order
                </h3>
              </div>
            </div>

            <button
              onClick={() => setIsTrackOrderOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#DFBE70] font-medium block mb-1.5">
                Order Reference / AWB Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. ASK-2026-8849"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#F5D061]"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#7A0C1E] hover:bg-[#991B1B] text-[#FAF7F2] font-semibold text-xs uppercase px-5 py-3 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4 text-[#F5D061]" />
                  <span>Track</span>
                </button>
              </div>
            </div>
          </form>

          {/* Demo Tracking Result */}
          {trackedResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-4 rounded-2xl bg-white/5 border border-[#C9A24B]/30 space-y-3 text-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[#F5D061]">
                <span className="font-mono font-semibold">Order #{orderNumber.toUpperCase()}</span>
                <span className="bg-[#7A0C1E] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                  In Transit
                </span>
              </div>

              <div className="space-y-2 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Quality Inspected &amp; Hand-Finished — Varanasi Guild</span>
                </div>
                <div className="flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-emerald-400" />
                  <span>Handloom GI Hallmark Certificate Enclosed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#F5D061]" />
                  <span>Dispatched via DHL Express — Est. Delivery in 2 Business Days</span>
                </div>
              </div>
            </motion.div>
          )}

          {!trackedResult && (
            <p className="text-xs text-white/50 text-center italic">
              Enter your order confirmation number sent to your email or WhatsApp.
            </p>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
