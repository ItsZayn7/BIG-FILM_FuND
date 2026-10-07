"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { openWaitlistModal } from "@/components/ui/WaitlistModal";
import { ArrowRight, Sparkles, X } from "lucide-react";

export function StickyFooterCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.offsetHeight;

      // Show sticky bar after hero (300px), but hide when reaching near the footer
      if (scrollPosition > 300 && scrollPosition + windowHeight < bodyHeight - 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 w-full z-40 border-t border-white/30 dark:border-white/10 bg-white/55 dark:bg-zinc-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_-10px_30px_rgba(0,0,0,0.12)] py-2 px-4 sm:px-8 lg:px-12 text-foreground"
        >
          <div className="mx-auto w-full max-w-[1350px] flex items-center justify-between gap-3 sm:gap-6">
            {/* Left Info / Live Badge */}
            <div className="flex items-center gap-2.5 text-left">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-xs sm:text-sm font-bold tracking-tight text-foreground">
                  Big Film Fund
                </span>
                <span className="hidden sm:inline text-muted-foreground text-xs">•</span>
                <span className="text-[11px] sm:text-xs text-muted-foreground font-medium">
                  Film Investing. Reimagined. <span className="hidden md:inline">— Priority access open.</span>
                </span>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => openWaitlistModal("founders")}
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-destructive px-3.5 py-1.5 rounded-full border border-border hover:border-destructive/40 transition-all cursor-pointer whitespace-nowrap bg-muted/30"
              >
                <Sparkles size={12} className="text-destructive" />
                Founders Club
              </button>

              <button
                onClick={() => openWaitlistModal("waitlist")}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-destructive-foreground bg-destructive hover:bg-destructive/90 px-4 py-1.5 rounded-full shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap uppercase tracking-wider"
              >
                Join Waitlist
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
