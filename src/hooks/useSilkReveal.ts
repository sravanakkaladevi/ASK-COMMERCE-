"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SilkRevealOptions {
  stagger?: number;
  y?: number;
  skewY?: number;
  duration?: number;
  start?: string;
  scrub?: boolean | number;
  selector?: string;
}

export function useSilkReveal<T extends HTMLElement = HTMLDivElement>(
  options: SilkRevealOptions = {}
) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Set elements immediately visible
      const elements = containerRef.current.querySelectorAll(
        options.selector || ".silk-item, .silk-line"
      );
      gsap.set(elements, { opacity: 1, y: 0, skewY: 0 });
      return;
    }

    const {
      stagger = 0.08,
      y = 60,
      skewY = 4,
      duration = 1.1,
      start = "top 85%",
      selector = ".silk-item",
    } = options;

    const ctx = gsap.context(() => {
      // 1. General Silk Reveal Items
      const items = containerRef.current?.querySelectorAll(selector);
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: y,
            skewY: skewY,
            transformOrigin: "0% 50%",
          },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: duration,
            ease: "power4.out",
            stagger: stagger,
            scrollTrigger: {
              trigger: containerRef.current,
              start: start,
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Split Masked Lines
      const maskedLines =
        containerRef.current?.querySelectorAll(".silk-masked-text");
      if (maskedLines && maskedLines.length > 0) {
        gsap.fromTo(
          maskedLines,
          {
            yPercent: 110,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: start,
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Ken-Burns slow image scale on scroll
      const parallaxImages =
        containerRef.current?.querySelectorAll(".silk-parallax-img");
      parallaxImages?.forEach((img) => {
        gsap.fromTo(
          img,
          {
            scale: 1.15,
          },
          {
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement || img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [options]);

  return containerRef;
}
