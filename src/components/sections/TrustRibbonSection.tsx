"use client";

import React from "react";
import { TRUST_TICKER_ITEMS } from "@/data/products";

export default function TrustRibbonSection() {
  return (
    <div className="bg-[#7A0C1E] text-[#FAF7F2] py-3.5 border-y border-[#C9A24B]/30 overflow-hidden relative shadow-inner">
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 px-4">
          {TRUST_TICKER_ITEMS.map((item, idx) => (
            <div
              key={`tick-1-${idx}`}
              className="flex items-center gap-3 text-xs sm:text-sm font-sans tracking-[0.18em] uppercase text-white/95"
            >
              <span className="text-[#F5D061] font-semibold">{item}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 px-4" aria-hidden="true">
          {TRUST_TICKER_ITEMS.map((item, idx) => (
            <div
              key={`tick-2-${idx}`}
              className="flex items-center gap-3 text-xs sm:text-sm font-sans tracking-[0.18em] uppercase text-white/95"
            >
              <span className="text-[#F5D061] font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
