"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Shield, Sun, Droplets, Box } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function SilkCareModal() {
  const { isSilkCareOpen, setIsSilkCareOpen } = useCart();

  if (!isSilkCareOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSilkCareOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#1C1512] text-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24B]/40 z-10 p-6 sm:p-8 space-y-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#C9A24B]/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7A0C1E] border border-[#F5D061]/50 flex items-center justify-center text-[#F5D061]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFBE70] font-bold block">
                  HEIRLOOM CONSERVATION
                </span>
                <h3 className="font-display text-2xl text-[#FAF7F2] font-normal">
                  Silk Care, Ironing & Storage Protocol
                </h3>
              </div>
            </div>

            <button
              onClick={() => setIsSilkCareOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#F5D061] font-semibold">
                <Box className="w-4 h-4" />
                <span>1. Muslin Storage Wrap</span>
              </div>
              <p className="text-white/75 leading-relaxed">
                Store pure silk in unbleached white cotton or muslin cloth bags. Never store in plastic or polythene, which traps moisture and tarnishes pure gold zari.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#F5D061] font-semibold">
                <Sun className="w-4 h-4" />
                <span>2. Airing & Fold Rotation</span>
              </div>
              <p className="text-white/75 leading-relaxed">
                Unfold and change fold lines every 3 months. Air out your Kanjeevarams and Banarasis in soft indoor shade — avoid direct sunlight exposure.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#F5D061] font-semibold">
                <Droplets className="w-4 h-4" />
                <span>3. Professional Dry Clean Only</span>
              </div>
              <p className="text-white/75 leading-relaxed">
                Do not hand wash in water. Always use specialized petroleum-free dry cleaners experienced in heritage zari brocades.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#F5D061] font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>4. Low Heat Ironing</span>
              </div>
              <p className="text-white/75 leading-relaxed">
                Iron only on low silk setting with a protective cotton cloth presser placed between the iron and the gold zari embroidery.
              </p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-[#C9A24B]/20 flex items-center justify-between text-xs text-[#DFBE70]">
            <span>Includes Complimentary ASK Muslin Garment Cover</span>
            <button
              onClick={() => setIsSilkCareOpen(false)}
              className="bg-[#7A0C1E] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#991B1B] transition-colors"
            >
              Understood
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
