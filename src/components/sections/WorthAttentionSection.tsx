"use client";

import React from "react";
import { Play, Sparkles, Eye, ShoppingBag } from "lucide-react";
import { SILK_REELS, ALL_PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function WorthAttentionSection() {
  const { addToCart, openQuickView, formatPrice } = useCart();

  const handleOpenReel = (sareeName: string) => {
    const product = ALL_PRODUCTS.find((p) => p.name.includes(sareeName.split(" ")[0])) || ALL_PRODUCTS[0];
    openQuickView(product);
  };

  return (
    <section
      className="py-16 sm:py-24 bg-[#140E0E] text-[#FAF7F2] relative overflow-hidden"
      aria-label="Worth Your Attention Video Reels"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-4 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#DFBE70] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F5D061]" />
              <span>WOVEN SILKS, IN MOTION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF7F2] tracking-tight">
              Worth your attention<span className="text-[#C9A24B]">.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-white/70 font-light max-w-sm">
            Experience the liquid drape, zari shine, and pleat movement captured on real looms.
          </p>
        </div>

        {/* Vertical Reels Grid (4 cols) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {SILK_REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => handleOpenReel(reel.sareeName)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#1C1512] border border-[#C9A24B]/30 relative aspect-[9/16] shadow-xl hover:border-[#DFBE70] transition-all duration-300 flex flex-col justify-between p-4 sm:p-5"
            >
              {/* Reel Image */}
              <img
                src={reel.image}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />

              {/* Top View Count & Duration Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-black/60 backdrop-blur-md text-[#F5D061] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-white/10">
                  {reel.views}
                </span>
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {reel.videoBadge}
                </span>
              </div>

              {/* Center Play Icon on Hover */}
              <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#7A0C1E]/80 backdrop-blur-md border border-[#F5D061]/50 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                <Play className="w-5 h-5 fill-current ml-0.5 text-[#F5D061]" />
              </div>

              {/* Bottom Tagged Saree Info */}
              <div className="relative z-10 mt-auto">
                <h4 className="font-display text-sm sm:text-base font-medium text-white leading-snug line-clamp-2">
                  {reel.title}
                </h4>
                <div className="mt-2 pt-2 border-t border-white/15 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F5D061]">
                    {formatPrice(reel.price)}
                  </span>
                  <span className="text-[10px] text-white/80 font-medium underline">
                    Shop Saree →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
