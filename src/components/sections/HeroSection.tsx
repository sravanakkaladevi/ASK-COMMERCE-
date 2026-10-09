"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, ShoppingBag, Sparkles, Award } from "lucide-react";
import { useCart } from "@/context/CartContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const { setIsFilmOpen } = useCart();
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const heroImageContainerRef = useRef<HTMLDivElement>(null);
  const heroTextContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !heroWrapperRef.current || !heroImageContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(heroImageContainerRef.current, {
        scale: 1.08,
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: heroWrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, heroWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroWrapperRef}
      className="relative min-h-[85vh] lg:min-h-[92vh] w-full overflow-hidden bg-[#140E0E] flex items-center"
      aria-label="ASK Handcrafted Silks Hero"
    >
      {/* High-Visibility Silk Showroom Video & Transparent Vignettes */}
      <div
        ref={heroImageContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden origin-center will-change-transform"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2200&q=90"
          className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05] scale-100"
        >
          <source src="/videos/intro-video.mp4" type="video/mp4" />
        </video>

        {/* Lightweight transparent gradient vignettes so video asset shines bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140E0E]/90 via-transparent to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Floating Top Right Quote */}
      <div className="absolute top-24 right-6 sm:top-28 sm:right-12 z-20 hidden lg:block max-w-xs text-right">
        <div className="backdrop-blur-xl bg-black/60 border border-[#C9A24B]/40 rounded-2xl p-4 shadow-2xl">
          <p className="font-serif italic text-xs lg:text-sm text-[#FAF7F2] leading-relaxed drop-shadow">
            &ldquo;Loom-spun from the very mulberry strands in pure golden zari&rdquo;
          </p>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#F5D061] font-bold block mt-1.5">
            — Varanasi Heritage Guild
          </span>
        </div>
      </div>

      {/* Floating Bottom Right Quote */}
      <div className="absolute bottom-12 right-6 sm:bottom-16 sm:right-12 z-20 hidden lg:block max-w-xs text-right">
        <div className="backdrop-blur-xl bg-black/60 border border-[#C9A24B]/40 rounded-2xl p-4 shadow-2xl">
          <p className="font-serif italic text-xs lg:text-sm text-[#FAF7F2] leading-relaxed drop-shadow">
            &ldquo;Six weavers, one thread — months of patient hands&rdquo;
          </p>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#F5D061] font-bold block mt-1.5">
            — Master Karigar Ramdas, Kanchipuram
          </span>
        </div>
      </div>

      {/* Hero Content Container */}
      <div
        ref={heroTextContainerRef}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 sm:py-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-2xl sm:max-w-3xl"
        >
          {/* Overline Badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#7A0C1E] backdrop-blur-md border border-[#F5D061]/50 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase text-[#F5D061] mb-6 shadow-2xl">
            <Sparkles className="w-3.5 h-3.5 text-[#F5D061]" />
            <span>THE ROYAL HEIRLOOM COLLECTION · FESTIVE &apos;26</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.08] mb-6 drop-shadow-[0_6px_20px_rgba(0,0,0,0.95)]">
            Woven in Heritage, <br />
            <span className="italic font-serif text-[#F5D061] drop-shadow-[0_4px_16px_rgba(245,208,97,0.35)]">
              Draped in Splendour.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg text-[#FAF7F2]/90 font-light max-w-xl leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Authentic Kanjeevarams, Varanasi Kadwa, and Molten Organza silks hand-spun on traditional pit looms by generational master artisans.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <a
              href="#new-arrivals"
              className="bg-[#7A0C1E] hover:bg-[#991B1B] text-[#FAF7F2] border border-[#C9A24B]/50 font-semibold text-xs uppercase tracking-[0.22em] px-8 py-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2.5 group shimmer-gold active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-[#F5D061]" />
              <span>Explore Collection</span>
            </a>

            <button
              onClick={() => setIsFilmOpen(true)}
              className="group border border-white/40 hover:border-[#DFBE70] text-[#FAF7F2] hover:text-[#DFBE70] text-xs uppercase tracking-[0.22em] font-semibold px-7 py-4 rounded-full backdrop-blur-md bg-black/30 hover:bg-black/50 transition-all duration-300 flex items-center gap-2.5"
            >
              <div className="w-6 h-6 rounded-full bg-[#7A0C1E] group-hover:bg-[#F5D061] text-white group-hover:text-[#7A0C1E] flex items-center justify-center transition-colors">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>Watch Loom Film</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none text-[#FAF7F2]/60">
        <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-[#DFBE70]">
          Scroll to Explore
        </span>
        <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-[#F5D061]"
          />
        </div>
      </div>
    </section>
  );
}
