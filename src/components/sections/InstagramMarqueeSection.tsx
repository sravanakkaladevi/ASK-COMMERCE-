"use client";

import React, { useState } from "react";
import { Heart, Sparkles, ExternalLink, Camera } from "lucide-react";
import { INSTAGRAM_POSTS } from "@/data/products";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function InstagramMarqueeSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Double array for seamless infinite marquee loop
  const marqueeItems = [...INSTAGRAM_POSTS, ...INSTAGRAM_POSTS, ...INSTAGRAM_POSTS];

  return (
    <section
      className="py-16 sm:py-24 bg-[#FAF7F2] text-[#1C1512] relative overflow-hidden border-y border-[#C9A24B]/20"
      aria-label="Instagram Community Feed"
    >
      {/* Center Floating Pill Badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="bg-[#1C1512]/95 hover:bg-[#C9A24B] hover:text-[#1C1512] text-[#FAF7F2] text-xs uppercase tracking-[0.25em] font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-2xl backdrop-blur-xl border border-[#C9A24B]/40 transition-all duration-300 flex items-center gap-2.5 group transform hover:scale-105"
        >
          <InstagramIcon className="w-4 h-4 text-[#DFBE70] group-hover:text-[#1C1512] transition-colors" />
          <span>@aurelle.official — Follow Us</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>
      </div>

      {/* Marquee Track Container */}
      <div
        className="w-full overflow-hidden flex"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-4 sm:gap-6 w-max animate-marquee"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
            animationDuration: "35s",
          }}
        >
          {marqueeItems.map((post, idx) => (
            <div
              key={`${post.id}-${idx}`}
              className="group relative w-48 sm:w-64 aspect-square rounded-2xl overflow-hidden bg-black shrink-0 border border-[#C9A24B]/20 shadow-md"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[10px] text-[#DFBE70] tracking-wider uppercase">
                    {post.handle}
                  </span>
                  <InstagramIcon className="w-4 h-4 text-[#C9A24B]" />
                </div>

                <div>
                  <p className="text-xs text-white/90 line-clamp-2 italic font-serif">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-[#DFBE70] mt-2">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for custom marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
