"use client";

import React from "react";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { EDITORIAL_STORIES } from "@/data/products";

export default function StoriesDrapeSection() {
  return (
    <section
      id="stories"
      className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1C1512] relative overflow-hidden"
      aria-label="Stories Behind The Drape and Latest Trends"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-4 border-b border-[#1C1512]/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7A0C1E] font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>STORIES BEHIND THE DRAPE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1512] tracking-tight">
              LATEST TRENDS<span className="text-[#7A0C1E]">.</span>
            </h2>
          </div>

          <a
            href="#newsletter"
            className="inline-flex items-center gap-2 bg-[#7A0C1E] text-white hover:bg-[#600917] text-xs uppercase tracking-[0.2em] font-semibold px-6 py-3 rounded-full shadow-md transition-all self-start md:self-end"
          >
            <span>Discover More</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F5D061]" />
          </a>
        </div>

        {/* 3 Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {EDITORIAL_STORIES.map((story) => (
            <article
              key={story.id}
              className="group flex flex-col justify-between rounded-3xl overflow-hidden bg-white p-4 border border-[#C9A24B]/20 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black relative mb-4">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#7A0C1E] text-[#F5D061] text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                  {story.category}
                </div>
              </div>

              {/* Story Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#1C1512]/50 font-medium">
                    {story.date} · {story.readTime}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-medium text-[#1C1512] group-hover:text-[#7A0C1E] transition-colors mt-1 leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-xs text-[#1C1512]/70 font-light mt-2 leading-relaxed">
                    {story.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1C1512]/10 flex items-center justify-between">
                  <span className="text-xs text-[#9F7B28] font-medium">
                    By {story.author}
                  </span>
                  <span className="text-xs font-bold text-[#7A0C1E] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Article →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
