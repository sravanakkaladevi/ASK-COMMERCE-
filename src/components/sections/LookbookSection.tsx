"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Eye, ShoppingBag, ArrowRight } from "lucide-react";
import { LOOKBOOK_ITEMS, ALL_PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LookbookSection() {
  const { openQuickView, addToCart } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 300}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInspectLook = (taggedProductId?: string) => {
    if (!taggedProductId) return;
    const prod = ALL_PRODUCTS.find((p) => p.id === taggedProductId);
    if (prod) openQuickView(prod);
  };

  return (
    <section
      id="lookbook"
      ref={sectionRef}
      className="relative min-h-screen bg-[#FAF7F2] text-[#1C1512] overflow-hidden py-16 flex flex-col justify-between"
      aria-label="Aurelle Editorial Lookbook"
    >
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#9F7B28] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>EDITORIAL CAMPAIGN</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-normal text-[#1C1512] leading-tight">
              The Lookbook
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#1C1512]/60 max-w-xs font-light">
            Scroll horizontally to navigate through our Spring / Summer &apos;26 Parisian and Lake Como editorial captures.
          </p>
        </div>
      </div>

      {/* Horizontal Translating Track */}
      <div className="w-full overflow-x-auto sm:overflow-visible no-scrollbar py-4">
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 px-4 sm:px-12 w-max items-center"
        >
          {LOOKBOOK_ITEMS.map((item, index) => {
            const taggedProduct = ALL_PRODUCTS.find(
              (p) => p.id === item.taggedProductId
            );

            return (
              <div
                key={item.id}
                className="group relative w-[280px] sm:w-[380px] lg:w-[440px] aspect-[3/4.5] rounded-3xl overflow-hidden shadow-xl border border-[#C9A24B]/30 bg-black shrink-0 transition-transform duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/20" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
                  <span className="bg-[#1C1512]/90 backdrop-blur-md text-[#DFBE70] text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-[#C9A24B]/40">
                    {item.lookNumber}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#FAF7F2]/80 font-medium">
                    {item.season}
                  </span>
                </div>

                {/* Interactive Tag Dot */}
                {taggedProduct && (
                  <button
                    onClick={() => openQuickView(taggedProduct)}
                    className="absolute z-20 w-8 h-8 rounded-full bg-[#C9A24B] text-[#1C1512] flex items-center justify-center shadow-2xl transition-transform hover:scale-125 animate-pulse"
                    style={{
                      left: `${item.tagPosition?.x || 50}%`,
                      top: `${item.tagPosition?.y || 50}%`,
                    }}
                    title={`Inspect ${taggedProduct.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}

                {/* Bottom Look Details & Quick Buy */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
                  <h3 className="font-display text-2xl text-[#FAF7F2] font-normal leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/75 font-light mt-1 line-clamp-2">
                    {item.subtitle}
                  </p>

                  {taggedProduct && (
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#DFBE70] block">
                          Featured Piece
                        </span>
                        <span className="text-xs font-medium text-white truncate max-w-[180px] block">
                          {taggedProduct.name}
                        </span>
                      </div>

                      <button
                        onClick={() => openQuickView(taggedProduct)}
                        className="bg-[#C9A24B] hover:bg-[#B38C3B] text-[#1C1512] text-[11px] font-semibold uppercase tracking-wider px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Look</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gold Progress Line Beneath */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <div className="w-full h-[2px] bg-[#1C1512]/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#C9A24B] to-[#DFBE70] transition-all duration-150 rounded-full"
            style={{ width: "20%" }}
          />
        </div>
      </div>
    </section>
  );
}
