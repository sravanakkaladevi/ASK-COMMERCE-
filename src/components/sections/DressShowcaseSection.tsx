"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShoppingBag,
  Sparkles,
  Ruler,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Layers,
} from "lucide-react";
import { FEATURED_DRESSES } from "@/data/products";
import { useCart } from "@/context/CartContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DressShowcaseSection() {
  const { addToCart, formatPrice, setIsSizeGuideOpen } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const currentDress = FEATURED_DRESSES[activeIndex] || FEATURED_DRESSES[0];

  useEffect(() => {
    setSelectedSize(currentDress.sizes[0] || "M");
    setSelectedColor(currentDress.colors[0]?.name || "Original");
  }, [activeIndex, currentDress]);

  // GSAP ScrollTrigger for pinned multi-step carousel
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !triggerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const step = Math.min(
            FEATURED_DRESSES.length - 1,
            Math.floor(self.progress * FEATURED_DRESSES.length)
          );
          setActiveIndex(step);
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? FEATURED_DRESSES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === FEATURED_DRESSES.length - 1 ? 0 : prev + 1));
  };

  const handleAddToBag = () => {
    addToCart(currentDress, selectedSize, selectedColor);
  };

  return (
    <section
      id="showcase"
      ref={triggerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-700 py-16 lg:py-0"
      style={{
        background: currentDress.bgGradient,
        color: "#FAF7F2",
      }}
    >
      {/* Background ambient lighting glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen bg-grain" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        {/* Top Section Overline */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#DFBE70] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>FEATURED ATELIER SHOWCASE · LOOK {currentDress.displayNumber} OF 04</span>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-[#C9A24B] hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Previous dress"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-[#C9A24B] hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Next dress"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Main Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Cross-Swapping Dress Editorial Display (6 cols) */}
          <div className="lg:col-span-6 relative aspect-[3/4] max-h-[72vh] rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24B]/30 bg-black/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDress.id}
                initial={{
                  opacity: 0,
                  scale: 0.88,
                  rotateY: 6,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scale: 1.05,
                  x: -50,
                  filter: "blur(8px)",
                }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative w-full h-full"
              >
                <img
                  src={currentDress.images[0]}
                  alt={currentDress.name}
                  className="w-full h-full object-cover object-center"
                />

                {/* Silhouette Tag */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C9A24B]/30 text-[10px] uppercase tracking-widest text-[#DFBE70] font-medium flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-[#C9A24B]" />
                  <span>{currentDress.silhouette}</span>
                </div>

                {/* Craft Hours pill */}
                {currentDress.craftHours && (
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[10px] uppercase tracking-widest text-white/90 font-medium flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#C9A24B]" />
                    <span>{currentDress.craftHours} Hours Atelier Work</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Information, Specs, Sizing & Add to Bag (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDress.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Index & Progress */}
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-5xl sm:text-6xl text-[#DFBE70] font-light">
                      {currentDress.displayNumber}
                      <span className="text-xl text-white/40 font-normal"> / 04</span>
                    </span>
                    <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold border border-[#C9A24B]/40 px-3 py-1 rounded-full bg-[#C9A24B]/10">
                      {currentDress.tag}
                    </span>
                  </div>

                  {/* Segmented Progress Bar */}
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {FEATURED_DRESSES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          activeIndex === i
                            ? "bg-[#C9A24B]"
                            : activeIndex > i
                            ? "bg-[#DFBE70]/60"
                            : "bg-white/20"
                        }`}
                        aria-label={`Go to dress ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Dress Title & Subtitle */}
                <div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF7F2] leading-tight">
                    {currentDress.name}
                  </h2>
                  <p className="text-sm text-[#FAF7F2]/70 font-light mt-1 tracking-wide">
                    {currentDress.subtitle}
                  </p>
                </div>

                {/* Price in Gold */}
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-3xl sm:text-4xl font-semibold text-[#DFBE70]">
                    {formatPrice(currentDress.price)}
                  </span>
                  {currentDress.mrp > currentDress.price && (
                    <span className="text-sm text-white/40 line-through">
                      {formatPrice(currentDress.mrp)}
                    </span>
                  )}
                  <span className="text-[11px] uppercase tracking-wider text-white/60 bg-white/10 px-2.5 py-1 rounded-full">
                    Includes Atelier Fitting
                  </span>
                </div>

                {/* Fabric & Embroidery note */}
                <div className="space-y-1.5 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                  <p className="text-[#DFBE70] font-semibold uppercase tracking-wider text-[10px]">
                    Fabric & Heritage Artistry
                  </p>
                  <p className="text-[#FAF7F2]/90 leading-relaxed font-light">
                    {currentDress.fabric}
                  </p>
                  {currentDress.embroidery && (
                    <p className="text-[#FAF7F2]/70 leading-relaxed font-light pt-1 border-t border-white/5">
                      {currentDress.embroidery}
                    </p>
                  )}
                </div>

                {/* Color Swatches */}
                <div>
                  <span className="text-xs uppercase tracking-wider text-white/80 block mb-2 font-medium">
                    Select Colorway: <strong className="text-[#DFBE70]">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-3">
                    {currentDress.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all relative flex items-center justify-center ${
                          selectedColor === color.name
                            ? "border-[#DFBE70] scale-110 shadow-lg"
                            : "border-white/30 hover:border-white/70"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.name && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Pills & Size Guide */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-white/80 font-medium">
                      Select Size: <strong className="text-[#DFBE70]">{selectedSize}</strong>
                    </span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs text-[#DFBE70] hover:text-[#C9A24B] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {currentDress.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                          selectedSize === size
                            ? "border-[#DFBE70] bg-[#DFBE70] text-[#1C1512] shadow-lg scale-105"
                            : "border-white/20 bg-black/30 text-white/80 hover:border-white/60"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Bag Pill Button */}
                <div className="pt-2">
                  <button
                    onClick={handleAddToBag}
                    className="w-full bg-[#1C1512] hover:bg-[#C9A24B] text-[#FAF7F2] hover:text-[#1C1512] border border-[#C9A24B]/50 font-semibold text-xs uppercase tracking-[0.25em] py-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center gap-2.5 group shimmer-gold"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#DFBE70] group-hover:text-[#1C1512] transition-colors" />
                    <span>Add {currentDress.name.split(" ")[1] || "Dress"} to Bag</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
