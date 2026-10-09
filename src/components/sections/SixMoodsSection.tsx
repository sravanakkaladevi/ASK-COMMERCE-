"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { SIX_MOODS_DATA } from "@/data/products";

export default function SixMoodsSection() {
  return (
    <section
      id="six-moods"
      className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1C1512] relative overflow-hidden"
      aria-label="Six Moods Collection"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-6 border-b border-[#1C1512]/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7A0C1E] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>THE CELEBRATION PALETTE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1512] tracking-tight">
              SIX MOODS<span className="text-[#7A0C1E]">.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#1C1512]/70 font-light max-w-sm leading-relaxed">
            Curated weaves tailored for every ritual, dusk soirée, and eternal bridal vows.
          </p>
        </div>

        {/* Continuous Auto-Scrolling Arched Mood Cards Track (Left to Right / Endless Loop) */}
        <div className="relative w-full overflow-hidden py-4 -mx-4 px-4">
          <motion.div
            className="flex gap-4 sm:gap-6 w-max cursor-grab active:cursor-grabbing"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {/* Duplicated items array for seamless 100% infinite marquee loop */}
            {[...SIX_MOODS_DATA, ...SIX_MOODS_DATA].map((mood, idx) => (
              <motion.a
                key={`${mood.id}-${idx}`}
                href="#new-arrivals"
                className="w-[180px] sm:w-[220px] lg:w-[240px] shrink-0 group flex flex-col items-center text-center relative cursor-pointer"
              >
                {/* Arched Image Container */}
                <div className="w-full aspect-[3/4.2] rounded-t-[100px] rounded-b-2xl overflow-hidden relative shadow-md group-hover:shadow-xl transition-all duration-500 border border-[#C9A24B]/30 bg-black">
                  <img
                    src={mood.image}
                    alt={mood.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Subtle colored ambient tint on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ backgroundColor: mood.colorHex }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Bottom Card Title inside overlay */}
                  <div className="absolute bottom-3 left-0 right-0 px-2 text-center z-10">
                    <span className="text-[10px] uppercase tracking-widest text-[#F5D061] font-semibold block mb-0.5">
                      {mood.count}
                    </span>
                    <h3 className="font-display text-sm sm:text-base text-[#FAF7F2] font-medium leading-tight">
                      {mood.title}
                    </h3>
                  </div>

                  {/* Top Corner Icon */}
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#F5D061]" />
                  </div>
                </div>

                {/* Bottom Label below card */}
                <div className="mt-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: mood.colorHex }}
                    />
                    <span className="text-xs font-semibold tracking-wider text-[#1C1512] group-hover:text-[#7A0C1E] transition-colors">
                      {mood.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#1C1512]/60 font-light block mt-0.5 line-clamp-1">
                    {mood.tagline}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
