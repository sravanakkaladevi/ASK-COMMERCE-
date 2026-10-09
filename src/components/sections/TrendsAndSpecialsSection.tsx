"use client";

import React, { useState } from "react";
import { Play, Sparkles, ShoppingBag, Eye, Volume2, VolumeX } from "lucide-react";
import { ALL_PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function TrendsAndSpecialsSection() {
  const { addToCart, openQuickView, formatPrice } = useCart();
  const [isPlayingReel, setIsPlayingReel] = useState<string | null>(null);

  const trendSarees = [
    {
      id: "trend-01",
      sectionTitle: "Trend of the Day",
      product: ALL_PRODUCTS[1], // Ivory Organza Bloom (18,400)
      tagline: "Trending across bridal cocktail evenings in Mumbai & Delhi",
    },
    {
      id: "trend-02",
      sectionTitle: "Seasonal Special",
      product: ALL_PRODUCTS[0], // Sanjh Maroon Banarasi (24,600)
      tagline: "Hand-picked for Diwali pooja & auspicious wedding ceremonies",
    },
  ];

  const handleTogglePlay = (id: string) => {
    setIsPlayingReel((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1C1512] relative overflow-hidden"
      aria-label="Trend of the Day and Seasonal Specials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {trendSarees.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C9A24B]/30 shadow-lg flex flex-col justify-between"
            >
              {/* Top Title */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1C1512]/10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#7A0C1E] rounded-full" />
                  <h3 className="font-display text-2xl sm:text-3xl text-[#1C1512] font-normal">
                    {item.sectionTitle}
                  </h3>
                </div>

                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9F7B28] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#C9A24B]/20">
                  {item.product.tag || "FEATURED"}
                </span>
              </div>

              {/* Media Preview Card with Play Trigger */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                {/* Image/Video Container (5 cols) */}
                <div className="sm:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden bg-black shadow-md group">
                  {isPlayingReel === item.id ? (
                    <video
                      autoPlay
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                      src={item.id === "trend-01" ? "/videos/weaver-handloom.mp4" : "/videos/intro-video.mp4"}
                    />
                  ) : (
                    <>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Play Button Overlay */}
                      <button
                        onClick={() => handleTogglePlay(item.id)}
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/60 hover:bg-[#7A0C1E] backdrop-blur-md text-white flex items-center justify-center shadow-xl transition-all hover:scale-110"
                        aria-label="Play saree reel preview"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                    </>
                  )}

                  {/* Playing Indicator */}
                  {isPlayingReel === item.id && (
                    <div className="absolute top-2 left-2 z-10 bg-[#7A0C1E] text-[#F5D061] text-[9px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse pointer-events-none">
                      <Volume2 className="w-3 h-3" />
                      <span>Reel Playing</span>
                    </div>
                  )}
                </div>

                {/* Saree Details (7 cols) */}
                <div className="sm:col-span-7 flex flex-col justify-between h-full py-1">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#7A0C1E] font-bold block mb-1">
                      {item.product.fabric}
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl font-medium text-[#1C1512] leading-tight">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-[#1C1512]/70 font-light mt-2 leading-relaxed">
                      {item.tagline}
                    </p>

                    <div className="mt-3 text-[11px] text-[#1C1512]/60 space-y-1">
                      <p>✦ {item.product.weaveOrigin}</p>
                      <p>✦ {item.product.zariType}</p>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="mt-5 pt-3 border-t border-[#1C1512]/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#1C1512]/50 block">Offer Price</span>
                      <span className="font-bold text-lg sm:text-xl text-[#7A0C1E]">
                        {formatPrice(item.product.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openQuickView(item.product)}
                        className="p-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#1C1512] hover:text-white text-[#1C1512] border border-[#1C1512]/10 transition-colors"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addToCart(item.product)}
                        className="inline-flex items-center gap-2 bg-[#7A0C1E] hover:bg-[#600917] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full shadow-md transition-all active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#F5D061]" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
