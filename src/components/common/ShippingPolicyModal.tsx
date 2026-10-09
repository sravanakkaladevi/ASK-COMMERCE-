"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe2, ShieldCheck, RefreshCw, Plane } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ShippingPolicyModal() {
  const { isShippingPolicyOpen, setIsShippingPolicyOpen } = useCart();

  if (!isShippingPolicyOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsShippingPolicyOpen(false)}
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
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFBE70] font-bold block">
                  GLOBAL DISPATCH POLICY
                </span>
                <h3 className="font-display text-2xl text-[#FAF7F2] font-normal">
                  Worldwide Shipping &amp; 7-Day Easy Returns
                </h3>
              </div>
            </div>

            <button
              onClick={() => setIsShippingPolicyOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Policy Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#F5D061] font-semibold">
                <Plane className="w-4 h-4" />
                <span>Complimentary Express Air Cargo</span>
              </div>
              <p className="text-white/75 leading-relaxed">
                Free shipping across India on all orders. Free express worldwide air shipping via DHL/FedEx on orders over ₹5,000 ($60 USD).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#F5D061] font-semibold">
                <RefreshCw className="w-4 h-4" />
                <span>7-Day No-Questions Return Policy</span>
              </div>
              <p className="text-white/75 leading-relaxed">
                If your weave does not match your expectations, initiate a return within 7 days of delivery for a 100% refund or store exchange.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#F5D061] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Custom Transit Insurance</span>
              </div>
              <p className="text-white/75 leading-relaxed">
                All shipments are fully insured against transit damage or loss, packaged in velvet heirloom boxes with moisture-lock sealing.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#F5D061] font-semibold">
                <Globe2 className="w-4 h-4" />
                <span>Duties &amp; Customs Transparent Prepaid</span>
              </div>
              <p className="text-white/75 leading-relaxed">
                Custom duties for USA, UK, UAE, EU, Australia, and Canada are calculated directly at checkout with zero hidden arrival charges.
              </p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-[#C9A24B]/20 flex items-center justify-between text-xs text-[#DFBE70]">
            <span>Need assistance? Contact WhatsApp Atelier Concierge</span>
            <button
              onClick={() => setIsShippingPolicyOpen(false)}
              className="bg-[#7A0C1E] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#991B1B] transition-colors"
            >
              Close Policy
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
