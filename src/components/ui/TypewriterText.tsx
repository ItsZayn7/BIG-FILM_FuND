"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per character
  initialDelay?: number; // ms delay before starting
  cursorColor?: string;
  hideCursorOnComplete?: boolean;
  as?: React.ElementType;
}

export function TypewriterText({
  text,
  className = "",
  speed = 65,
  initialDelay = 0,
  cursorColor = "bg-destructive",
  hideCursorOnComplete = true,
  as: Component = "h3",
}: TypewriterTextProps) {
  const [typedCount, setTypedCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setTypedCount(text.length);
      setShowCursor(false);
      return;
    }

    let timerId: NodeJS.Timeout;

    const scheduleNextChar = (count: number) => {
      if (count >= text.length) {
        setShowCursor(false);
        return;
      }

      let delay = speed;
      if (count === 0) {
        delay = initialDelay;
      }

      timerId = setTimeout(() => {
        const nextCount = count + 1;
        setTypedCount(nextCount);
        if (nextCount >= text.length) {
          setShowCursor(false);
        }
        scheduleNextChar(nextCount);
      }, delay);
    };

    scheduleNextChar(0);

    return () => clearTimeout(timerId);
  }, [hasStarted, text, speed, initialDelay]);

  const displayedText = text.slice(0, typedCount);
  const isTypingActive = showCursor && typedCount < text.length;

  return (
    <div ref={containerRef} className="relative inline-block max-w-full">
      {/* Ghost element for zero layout shift */}
      <Component className={cn("invisible select-none pointer-events-none whitespace-nowrap", className)} aria-hidden="true">
        {text}
      </Component>

      {/* Visible typewriter text */}
      <Component className={cn("absolute inset-0 left-0 top-0 whitespace-nowrap flex items-center justify-center lg:justify-start", className)}>
        <span>{displayedText}</span>
        {isTypingActive && (
          <span
            className={cn(
              "inline-block w-[2.5px] sm:w-[3.5px] h-[0.8em] ml-0.5 align-baseline rounded-full transition-opacity duration-200 animate-typewriter-cursor shrink-0",
              cursorColor
            )}
            aria-hidden="true"
          />
        )}
      </Component>
    </div>
  );
}
