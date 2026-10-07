"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { openWaitlistModal } from "@/components/ui/WaitlistModal";
import { cn } from "@/lib/utils";

const LINE_1 = "Film Investing.";
const LINE_2 = "Reimagined";
const LINE_3 = "For Investors";

export function HeroSection() {
  const [typedCount, setTypedCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setTypedCount(38);
      setShowCursor(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const initialDelay = 120;

    const scheduleNextChar = (currentCount: number) => {
      if (currentCount >= 38) {
        setShowCursor(false);
        return;
      }

      let delay = 60;

      if (currentCount === 0) {
        delay = initialDelay;
      } else if (currentCount === 15 || currentCount === 25) {
        delay = 380;
      }

      timeoutId = setTimeout(() => {
        const nextCount = currentCount + 1;
        setTypedCount(nextCount);
        if (nextCount >= 38) {
          // Immediately hide cursor when the last character finishes
          setShowCursor(false);
        }
        scheduleNextChar(nextCount);
      }, delay);
    };

    scheduleNextChar(0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const line1Count = Math.min(typedCount, 15);
  const line2Count = Math.max(0, Math.min(typedCount - 15, 10));
  const line3Count = Math.max(0, Math.min(typedCount - 25, 13));

  const CursorIndicator = () => (
    <span
      className={cn(
        "inline-block w-[3px] sm:w-[4px] md:w-[5px] h-[0.82em] bg-destructive ml-0.5 sm:ml-1 align-middle -translate-y-[0.04em] rounded-full transition-opacity duration-300 animate-typewriter-cursor shrink-0",
        showCursor ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-hidden="true"
    />
  );

  return (
    <section className="relative w-full min-h-screen lg:min-h-[100vh] pt-24 pb-10 lg:pt-20 xl:pt-24 lg:pb-12 px-6 md:px-12 xl:px-24 flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-background">
      {/* Hero Background Image - Mobile Light Mode (< lg) */}
      <img
        src="/mobhero.jpeg"
        alt="Hero Background Mobile Light"
        loading="eager"
        decoding="sync"
        className="block dark:hidden lg:hidden absolute inset-0 w-full h-full object-cover object-center opacity-45 pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
      />

      {/* Hero Background Image - Mobile Dark Mode (< lg) */}
      <img
        src="/mobherodark.jpeg"
        alt="Hero Background Mobile Dark"
        loading="eager"
        decoding="sync"
        className="hidden dark:block dark:lg:hidden absolute inset-0 w-full h-full object-cover object-center opacity-50 pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
      />

      {/* Mobile Subtle Contrast Overlay for Crisp Text Readability */}
      <div className="block lg:hidden absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white dark:from-background/80 dark:via-background/50 dark:to-background pointer-events-none z-[1]" />

      {/* Hero Background Image - Desktop Light Mode (>= lg) */}
      <img
        src="/herooo.png"
        alt="Hero Background Desktop Light"
        loading="eager"
        decoding="sync"
        className="hidden lg:block dark:hidden absolute inset-0 w-full h-full object-cover object-[85%_center] xl:object-right pointer-events-none z-0 opacity-90 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
      />

      {/* Hero Background Image - Desktop Dark Mode (>= lg) */}
      <img
        src="/darkhe.PNG"
        alt="Hero Background Desktop Dark"
        loading="eager"
        decoding="sync"
        className="hidden dark:lg:block absolute inset-0 w-full h-full object-cover object-[85%_center] xl:object-right pointer-events-none z-0 opacity-85 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
      />

      {/* Desktop Readability Backdrop Gradient Overlay (Prevents Hero Copy/Image Overlap on Laptop & Desktop Screens) */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[75%] xl:w-[65%] 2xl:w-[58%] bg-gradient-to-r from-white via-white/95 via-65% to-transparent dark:from-background dark:via-background/95 dark:via-65% dark:to-transparent pointer-events-none z-[1]" />

      {/* Subtle Bottom Gradient Fade */}
      <div className="absolute inset-x-0 bottom-0 h-16 lg:h-24 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-background dark:via-background/80 pointer-events-none z-[2]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1350px] items-center gap-8 lg:gap-12 lg:grid-cols-2">
        <div className="z-10 flex flex-col items-start justify-center space-y-4 lg:space-y-3.5 xl:space-y-5 text-left max-w-2xl lg:max-w-[560px] xl:max-w-2xl mx-auto lg:mx-0 opacity-100">

          {/* Main Heading with Zero Layout Shift & Smooth Self-Reserving Typewriter Animation */}
          <div className="relative max-w-[340px] sm:max-w-[420px] lg:max-w-none mx-auto lg:mx-0 text-left">
            <h1
              className="text-[clamp(2.35rem,10.5vw,3rem)] lg:text-h1 text-foreground leading-[1.0] lg:leading-[1.05] font-semibold text-left"
              aria-label="Film Investing. Reimagined For Investors"
            >
              {/* Line 1 */}
              <span className="block whitespace-pre-wrap text-left" aria-hidden="true">
                <span>{LINE_1.slice(0, line1Count)}</span>
                {showCursor && typedCount <= 15 && <CursorIndicator />}
                <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
                  {LINE_1.slice(line1Count)}
                </span>
              </span>

              {/* Line 2 */}
              <span className="block text-destructive whitespace-pre-wrap text-center lg:text-left" aria-hidden="true">
                <span>{LINE_2.slice(0, line2Count)}</span>
                {showCursor && typedCount > 15 && typedCount <= 25 && <CursorIndicator />}
                <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
                  {LINE_2.slice(line2Count)}
                </span>
              </span>

              {/* Line 3 */}
              <span className="block text-destructive whitespace-pre-wrap text-center lg:text-left" aria-hidden="true">
                <span>{LINE_3.slice(0, line3Count)}</span>
                {showCursor && typedCount > 25 && <CursorIndicator />}
                <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
                  {LINE_3.slice(line3Count)}
                </span>
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-start space-y-4 text-left text-[17px] text-muted-foreground leading-relaxed max-w-[340px] sm:max-w-md lg:max-w-none">
            <p>
              Big Film Fund is creating a new way to finance movies – powered by
              a technology platform that connects investors, filmmakers, and
              audiences.
            </p>

            <p>
              For everyday investors, that opens the door once largely
              reserved for Hollywood studios and industry insiders, to an
              opportunity to own a stake in the movies they believe in, and
              share in their success.
            </p>

            <p className="font-bold text-destructive">
              But opening access to film investing is the beginning.
            </p>

            <p>
              Our model is designed for investors from the ground up – with
              clean ownership structures that align incentives with filmmakers
              and producers (without complex Hollywood recoupment
              waterfalls), rigorous commercial discipline from start to
              finish, all delivered with radical transparency.
            </p>

            <p className="font-bold text-destructive">
              No more opaque Hollywood economics.
            </p>

            <p>
              This is an opportunity to own part of the company building that
              future.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-start items-center gap-4 pt-1 lg:pt-0.5 w-full">
            <button
              onClick={() => openWaitlistModal("waitlist")}
              className="relative group overflow-hidden cursor-pointer rounded-full bg-[#C00000] px-7 py-3.5 lg:px-8 lg:py-3.5 xl:py-4 text-base font-bold text-white shadow-xl border border-red-400/30 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#990000] hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2.5"
            >
              <span className="relative z-10 tracking-wide uppercase text-sm font-black">
                Join Waitlist
              </span>
              <ArrowRight
                size={18}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              />
              {/* Glass Shimmer Reflection */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


