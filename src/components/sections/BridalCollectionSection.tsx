"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Eye, ShoppingBag } from "lucide-react";
import { ALL_PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function BridalCollectionSection() {
  const { addToCart, openQuickView, formatPrice } = useCart();

  const bridalProducts = [
    ALL_PRODUCTS[2], // Kanchipuram Swarna Mayilkan (38,500)
    ALL_PRODUCTS[5], // Varanasi Raktambari Zardozi (65,000)
    ALL_PRODUCTS[0], // Sanjh Maroon Banarasi (24,600)
    ALL_PRODUCTS[6], // Kashi Rangkat Jaal (31,500)
  ].filter(Boolean);

  return (
    <section
      id="bridal"
      className="py-20 sm:py-28 bg-[#120E0E] text-[#FAF7F2] relative overflow-hidden"
      aria-label="The Bridal Collection"
    >
      {/* Subtle gold ambient glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#7A0C1E]/30 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#C9A24B]/20 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Overline */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#DFBE70] font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#F5D061]" />
          <span>IMPERIAL TROUSSEAU ATELIER</span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-normal text-[#FAF7F2] tracking-tight mb-12 sm:mb-16">
          The Bridal Collection<span className="text-[#C9A24B]">.</span>
        </h2>

        {/* 2-Column Main Section: Left Spotlight Card, Right 4 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Spotlight Red Card (5 cols) */}
          <div className="lg:col-span-4 rounded-3xl overflow-hidden relative shadow-2xl border border-[#C9A24B]/40 bg-[#7A0C1E] min-h-[420px] flex flex-col justify-between p-6 sm:p-8">
            {/* Background Saree Model with overlay */}
            <div className="absolute inset-0 z-0 opacity-45">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85"
                alt="Bridal Silk Masterpiece"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7A0C1E] via-[#7A0C1E]/60 to-transparent" />
            </div>

            {/* Top Badge */}
            <div className="relative z-10">
              <span className="bg-[#F5D061] text-[#7A0C1E] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md inline-block">
                HANDCRAFTED HEIRLOOM
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 mt-auto">
              <span className="text-xs uppercase tracking-[0.25em] text-[#DFBE70] font-semibold block mb-2">
                OVER 300+ HOURS OF ARTISAN WEAVING
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-normal text-white leading-tight mb-3">
                Woven for the Queen of the Day
              </h3>
              <p className="text-xs text-white/80 font-light leading-relaxed mb-6">
                Pure silver and electroplated gold zari hand-interlocked into pure 3-ply mulberry silk, certified by BIS hallmarks.
              </p>

              <a
                href="#new-arrivals"
                className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-[#F5D061] text-[#7A0C1E] text-xs uppercase tracking-[0.22em] font-bold px-6 py-3.5 rounded-full shadow-xl transition-all duration-300 shimmer-gold"
              >
                <span>View the collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: 4 Bridal Masterweaves Grid (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {bridalProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl overflow-hidden bg-[#1C1512] border border-[#C9A24B]/30 p-3 flex flex-col justify-between shadow-lg hover:border-[#DFBE70] transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[3/4.2] w-full rounded-xl overflow-hidden bg-black">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Hover Buttons */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => openQuickView(product)}
                      className="p-2 bg-white/90 text-[#1C1512] rounded-full hover:scale-110 transition-transform"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-[#7A0C1E] text-white rounded-full hover:scale-110 transition-transform"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#F5D061]" />
                    </button>
                  </div>
                </div>

                {/* Saree Meta */}
                <div className="pt-2.5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#DFBE70] block font-semibold">
                      {(product.weaveOrigin || "Varanasi Heritage").split(",")[0]}
                    </span>
                    <h4 className="font-display text-xs sm:text-sm font-medium text-white group-hover:text-[#DFBE70] transition-colors line-clamp-1 mt-0.5">
                      {product.name}
                    </h4>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-[#F5D061]">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="text-[10px] uppercase tracking-wider text-white/80 hover:text-white font-semibold"
                    >
                      + Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
