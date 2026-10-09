"use client";

import React from "react";
import { Star, Sparkles, CheckCircle2, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/products";
import { useSilkReveal } from "@/hooks/useSilkReveal";

export default function TestimonialsSection() {
  const containerRef = useSilkReveal<HTMLDivElement>({
    stagger: 0.1,
    y: 50,
  });

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-24 sm:py-32 bg-[#FAF7F2] text-[#1C1512] relative overflow-hidden"
      aria-label="Client Testimonials and Reviews"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Rating Badge */}
        <div className="silk-item text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-[#9F7B28] font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>PATRON PRAISE</span>
          </div>

          <div className="silk-line-container">
            <h2 className="silk-masked-text font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1512] leading-tight">
              Loved by Every <br />
              <span className="italic text-[#9F7B28]">Silhouette</span>
            </h2>
          </div>

          {/* Stacked Customer Avatars + Rating */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="flex -space-x-2.5 overflow-hidden">
              {TESTIMONIALS.map((t) => (
                <img
                  key={t.id}
                  src={t.avatar}
                  alt={t.author}
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#FAF7F2] object-cover"
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <div className="flex text-[#C9A24B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[#1C1512]">4.98 / 5.0</span>
              <span className="text-[#1C1512]/40">·</span>
              <span className="text-[#1C1512]/70 font-normal">
                1,200+ Discerning Patrons Worldwide
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column Reviews with Middle Card Offset */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {TESTIMONIALS.map((t, idx) => {
            const isMiddle = idx === 1;

            return (
              <div
                key={t.id}
                className={`silk-item relative p-8 sm:p-10 rounded-3xl bg-white border border-[#C9A24B]/25 shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between min-h-[340px] ${
                  isMiddle ? "md:translate-y-8 border-[#C9A24B]/60 shadow-2xl bg-[#FDFBF7]" : ""
                }`}
              >
                {/* Large decorative serif quotation mark */}
                <div className="font-display text-6xl text-[#C9A24B]/20 leading-none absolute top-6 right-6 select-none">
                  “
                </div>

                <div>
                  {/* Stars */}
                  <div className="flex text-[#C9A24B] gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-serif text-base sm:text-lg text-[#1C1512] font-normal leading-relaxed italic relative z-10">
                    &quot;{t.quote}&quot;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 mt-6 border-t border-[#1C1512]/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-11 h-11 rounded-full object-cover border border-[#C9A24B]/40"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#1C1512] flex items-center gap-1.5">
                        <span>{t.author}</span>
                        {t.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B]" />
                        )}
                      </h4>
                      <p className="text-[11px] text-[#1C1512]/60">
                        {t.location}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9F7B28] bg-[#C9A24B]/10 px-2.5 py-1 rounded-full border border-[#C9A24B]/20 hidden sm:inline-block">
                    Verified Fit
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
