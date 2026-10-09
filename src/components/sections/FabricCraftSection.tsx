"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Scissors, Award, Gem, CheckCircle } from "lucide-react";
import { CRAFT_SWATCHES } from "@/data/products";
import { useSilkReveal } from "@/hooks/useSilkReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FabricCraftSection() {
  const [selectedSwatch, setSelectedSwatch] = useState(0);
  const containerRef = useSilkReveal<HTMLDivElement>({
    stagger: 0.08,
    y: 50,
  });

  const activeCraft = CRAFT_SWATCHES[selectedSwatch] || CRAFT_SWATCHES[0];

  const counter1Ref = useRef<HTMLSpanElement>(null);
  const counter2Ref = useRef<HTMLSpanElement>(null);
  const counter3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Counter animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#craft-counters",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      const countObj = { val1: 0, val2: 0 };

      tl.to(countObj, {
        val1: 120,
        val2: 100,
        duration: 2.0,
        ease: "power2.out",
        onUpdate: () => {
          if (counter1Ref.current) {
            counter1Ref.current.innerText = `${Math.floor(countObj.val1)}+`;
          }
          if (counter2Ref.current) {
            counter2Ref.current.innerText = `${Math.floor(countObj.val2)}%`;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);

  return (
    <section
      id="craft"
      ref={containerRef}
      className="py-24 sm:py-32 bg-[#1C1512] text-[#FAF7F2] relative overflow-hidden"
      aria-label="Atelier Fabric & Craftsmanship"
    >
      {/* Background grain */}
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Macro Ken-Burns Visual & Interactive Swatch Switcher (6 cols) */}
          <div className="silk-item lg:col-span-6 flex flex-col gap-6">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24B]/30 bg-black/60 group">
              {/* Media Container: Live Weaver Handloom Video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={activeCraft.image}
                className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.08] transition-all duration-700"
              >
                <source src="/videos/weaver-handloom.mp4" type="video/mp4" />
              </video>

              {/* Live Weaver Badge */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C9A24B]/40 text-[10px] uppercase tracking-widest text-[#DFBE70] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7A0C1E] animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#F5D061] -ml-4" />
                <Gem className="w-3.5 h-3.5 text-[#C9A24B] ml-1" />
                <span>MASTER KARIGAR AT LOOM · VARANASI</span>
              </div>

              {/* Swatch detail card bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/75 to-transparent">
                <h4 className="font-display text-2xl text-[#FAF7F2] font-normal mb-1">
                  {activeCraft.name}
                </h4>
                <p className="text-xs text-[#DFBE70] font-mono tracking-wider mb-2">
                  Origin: {activeCraft.origin} · {activeCraft.density}
                </p>
                <p className="text-xs text-[#FAF7F2]/80 leading-relaxed font-light">
                  {activeCraft.description}
                </p>
              </div>
            </div>

            {/* Swatch Switcher Pills */}
            <div className="grid grid-cols-3 gap-3">
              {CRAFT_SWATCHES.map((swatch, idx) => (
                <button
                  key={swatch.id}
                  onClick={() => setSelectedSwatch(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedSwatch === idx
                      ? "border-[#C9A24B] bg-[#C9A24B]/15 text-[#DFBE70] shadow-md"
                      : "border-white/10 bg-white/5 text-[#FAF7F2]/70 hover:border-white/30"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-wider font-semibold opacity-70">
                    Swatch 0{idx + 1}
                  </p>
                  <p className="font-serif text-xs sm:text-sm font-medium mt-0.5 truncate text-white">
                    {swatch.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Story Copy & Animated Stat Counters (6 cols) */}
          <div className="silk-item lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#DFBE70] font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>THE ATELIER MANIFESTO</span>
              </div>

              <div className="silk-line-container">
                <h2 className="silk-masked-text font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF7F2] leading-tight">
                  Hand-Finished <br />
                  <span className="italic text-[#DFBE70]">Legacy Craft</span>
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#FAF7F2]/80 font-light leading-relaxed">
              <p>
                At Maison Aurelle, dressmaking is not manufacturing — it is an ancient communion of pure filaments, generational embroidery masters, and architectural contouring.
              </p>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/70 leading-relaxed">
                From the legendary pit-looms of Varanasi weaving pure silver-gilt zari to Parisian pattern-makers sculpting concealed silk corsetry, each garment is shaped to endure for generations as a wearable heirloom.
              </p>
            </div>

            {/* Animated Counters Grid */}
            <div
              id="craft-counters"
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10"
            >
              {/* Counter 1 */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span
                    ref={counter1Ref}
                    className="font-display text-4xl sm:text-5xl font-normal text-[#DFBE70]"
                  >
                    120+
                  </span>
                  <span className="text-xs text-[#C9A24B] uppercase font-bold">hrs</span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white">
                  Handwork Time
                </p>
                <p className="text-[11px] text-white/50 leading-tight">
                  Per bespoke bridal and couture gown
                </p>
              </div>

              {/* Counter 2 */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span
                    ref={counter2Ref}
                    className="font-display text-4xl sm:text-5xl font-normal text-[#DFBE70]"
                  >
                    100%
                  </span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white">
                  Pure Mulberry Silk
                </p>
                <p className="text-[11px] text-white/50 leading-tight">
                  Zero synthetic blends or plastic fillers
                </p>
              </div>

              {/* Counter 3 */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-2xl sm:text-3xl font-normal text-[#DFBE70] leading-none">
                    Made to Measure
                  </span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white mt-1">
                  Atelier Fit Guarantee
                </p>
                <p className="text-[11px] text-white/50 leading-tight">
                  Complimentary custom alterations
                </p>
              </div>
            </div>

            {/* Quality Checklist */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <span>Hand-rolled French seams with invisible blind hems</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <span>Internally boned with flexible Parisian spiral stays</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <span>Accompanied by Certificate of Authenticity & Velvet Box</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
