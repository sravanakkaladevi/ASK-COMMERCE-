"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function FilmModal() {
  const { isFilmOpen, setIsFilmOpen } = useCart();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    setCurrentTime(formatTime(cur));
    if (dur) {
      setDuration(formatTime(dur));
      setProgress((cur / dur) * 100);
    }
  };

  if (!isFilmOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsFilmOpen(false)}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-[#C9A24B]/30 z-10 flex flex-col justify-between"
        >
          {/* Top Bar */}
          <div className="p-6 bg-gradient-to-b from-black/90 to-transparent flex items-center justify-between text-white z-20">
            <div className="flex items-center gap-3">
              <span className="font-display text-xl tracking-[0.2em] text-[#DFBE70]">
                DRIFT SILKS
              </span>
              <span className="text-white/40 text-xs">|</span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#FAF7F2]/80">
                Heritage Handloom & Atelier Runway Film &apos;26
              </span>
            </div>

            <button
              onClick={() => setIsFilmOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Real Video Player */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              src="/videos/intro-video.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05] cursor-pointer"
            />
            {/* Film grain vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* Center Play indicator overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 space-y-4 pointer-events-none">
            <button
              onClick={togglePlay}
              className="pointer-events-auto w-20 h-20 rounded-full bg-[#C9A24B]/90 hover:bg-[#C9A24B] text-[#1C1512] flex items-center justify-center shadow-2xl transition-all transform hover:scale-110"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 fill-current ml-1" />
              )}
            </button>

            <div className="bg-black/60 backdrop-blur-md px-6 py-2.5 rounded-full border border-[#C9A24B]/40">
              <p className="text-xs uppercase tracking-[0.3em] text-[#DFBE70] font-medium flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Varanasi & Kanchipuram Loom Documentary
              </p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="p-6 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex items-center justify-between text-white z-20">
            <div className="flex items-center gap-4 text-xs font-mono text-[#FAF7F2]/80">
              <span>{currentTime} / {duration}</span>
              <div className="w-48 sm:w-80 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C9A24B] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-2 text-xs"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-400" />
                  <span className="hidden sm:inline">Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#DFBE70]" />
                  <span className="hidden sm:inline">Sound: On</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
