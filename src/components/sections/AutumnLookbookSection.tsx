"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Eye } from "lucide-react";
import { AUTUMN_LOOKBOOK, ALL_PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function AutumnLookbookSection() {
  const { openQuickView, formatPrice } = useCart();

  const handleOpenArch = (idx: number) => {
    const product = ALL_PRODUCTS[idx] || ALL_PRODUCTS[0];
    openQuickView(product);
  };

  return (
    <section
      id="lookbook"
      className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1C1512] relative overflow-hidden"
      aria-label="Autumn Winter Lookbook"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Top Intro */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 pb-6 border-b border-[#1C1512]/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#7A0C1E] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>EDITORIAL LOOKBOOK</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-normal text-[#1C1512] tracking-tight">
              Autumn – Winter 2026<span className="text-[#7A0C1E]">.</span>
            </h2>
          </div>

          <div className="max-w-md flex flex-col items-start lg:items-end">
            <p className="text-xs sm:text-sm text-[#1C1512]/75 font-light leading-relaxed lg:text-right mb-4">
              A curated selection of hand-spun silks honoring centuries of craft tradition across temple towns and heritage looms.
            </p>
            <a
              href="#new-arrivals"
              className="inline-flex items-center gap-2 border border-[#7A0C1E] text-[#7A0C1E] hover:bg-[#7A0C1E] hover:text-white text-xs uppercase tracking-[0.22em] font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-sm"
            >
              <span>EXPLORE LOOKBOOK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3 Arched Frames Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {AUTUMN_LOOKBOOK.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              onClick={() => handleOpenArch(idx)}
              className="group cursor-pointer rounded-t-[140px] rounded-b-3xl overflow-hidden bg-black relative aspect-[3/4.6] shadow-xl border border-[#C9A24B]/40"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#F5D061] font-semibold block mb-1">
                  LOOK 0{idx + 1}
                </span>
                <h3 className="font-display text-2xl text-white font-medium leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-white/80 font-light mt-1">
                  {item.saree}
                </p>

                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#F5D061]">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-white flex items-center gap-1 group-hover:text-[#F5D061] transition-colors">
                    <span>View Look</span>
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
