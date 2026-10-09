"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, CheckCircle2, ShieldCheck, Sparkles, FileCheck, Gem } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function PureZariGuideModal() {
  const { isPureZariGuideOpen, setIsPureZariGuideOpen } = useCart();

  if (!isPureZariGuideOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsPureZariGuideOpen(false)}
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
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFBE70] font-bold block">
                  ATELIER AUTHENTICITY GUIDE
                </span>
                <h3 className="font-display text-2xl text-[#FAF7F2] font-normal">
                  Pure Zari Testing & Hallmark Certificate
                </h3>
              </div>
            </div>

            <button
              onClick={() => setIsPureZariGuideOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="space-y-4 text-xs sm:text-sm text-[#FAF7F2]/85 font-light leading-relaxed">
            <div className="p-4 rounded-2xl bg-[#7A0C1E]/30 border border-[#C9A24B]/30 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-[#F5D061] shrink-0 mt-0.5" />
              <p>
                Every ASK weave carries a hallmarked <strong>Certificate of Authenticity</strong> tested by the Central Silk Board of India. We use 100% electroplated pure silver-gilt thread coated in 24-karat gold zari.
              </p>
            </div>

            <h4 className="font-display text-lg text-[#F5D061] pt-2 font-normal">
              3 Atelier Verification Tests You Can Perform:
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#F5D061] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">1. The Scratch Test (Warp Core Check)</strong>
                  <p className="text-white/70 text-xs mt-0.5">
                    Unravel a single thread from the blouse piece fringe. Scraping the golden coating reveals pure red silk silk warp yarn wrapped in silver metal foil — zero nylon or metallic plastic fillers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#F5D061] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">2. The Burn Test (Pure Mulberry Filament)</strong>
                  <p className="text-white/70 text-xs mt-0.5">
                    Pure silk burns with a smell akin to singed hair and produces a crisp, crushable ash that dissolves into powder.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#F5D061] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">3. Government GI & Silk Mark Tag</strong>
                  <p className="text-white/70 text-xs mt-0.5">
                    Scan the unique QR code on your velvet box hallmark card to verify its Varanasi or Kanchipuram Geographical Indication (GI) weaver registry number.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-[#C9A24B]/20 flex items-center justify-between text-xs text-[#DFBE70]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F5D061]" />
              Lifetime Pure Zari Buyback &amp; Exchange Warranty
            </span>
            <button
              onClick={() => setIsPureZariGuideOpen(false)}
              className="bg-[#7A0C1E] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#991B1B] transition-colors"
            >
              Close Guide
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
