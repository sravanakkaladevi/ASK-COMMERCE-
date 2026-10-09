"use client";

import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { OCCASIONS_DATA } from "@/data/products";

export default function OccasionBentoSection() {
  const [wedding, heritage, newDrape, atelier] = OCCASIONS_DATA;

  return (
    <section
      id="occasions"
      className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1C1512] relative overflow-hidden"
      aria-label="Edits For Every Occasion"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-4 border-b border-[#1C1512]/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7A0C1E] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>CURATED COLLECTIONS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1512] tracking-tight">
              EDITS FOR <span className="italic font-serif text-[#7A0C1E]">every occasion.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#1C1512]/70 font-light max-w-sm">
            Hand-woven ensembles tailored for intimate haldi mornings to grand palace wedding receptions.
          </p>
        </div>

        {/* 4 Bento Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OCCASIONS_DATA.map((item) => (
            <a
              key={item.id}
              href="#new-arrivals"
              className="group relative rounded-3xl overflow-hidden bg-black shadow-lg border border-[#C9A24B]/30 aspect-[3/4.2] flex flex-col justify-end p-6 cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

              {/* Top Count Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5D061] bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  {item.count}
                </span>
              </div>

              {/* Arrow in top right */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#7A0C1E] group-hover:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Content at bottom */}
              <div className="relative z-10">
                <h3 className="font-display text-2xl text-white font-medium leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-white/80 font-light line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
