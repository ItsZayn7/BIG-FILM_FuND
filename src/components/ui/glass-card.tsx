"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ElementType;
  titleClassName?: string;
  delay?: number;
  step?: string | number;
  flipOnHover?: boolean;
  variant?: "default" | "red" | "pulse";
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, title, description, icon: Icon = Sparkles, titleClassName, delay = 0, step, flipOnHover, variant = "default", ...props }, ref) => {
    const isRedVariant = variant === "red" || variant === "pulse";

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.8,
          delay: delay * 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          y: -6,
          scale: 1.015,
          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        }}
        className={`group relative w-full h-full min-h-0 sm:min-h-[290px] lg:min-h-[220px] p-[1.5px] rounded-3xl overflow-hidden shadow-md cursor-pointer ${className || ""}`}
        {...props}
      >
        {/* Continuous Rotating Red Glowing Border Beam (Sharp & Crisp Light Line, Zero Red Shade) */}
        {isRedVariant && (
          <div className="absolute -inset-[200%] bg-[conic-gradient(from_0deg,transparent_0_330deg,#C00000_360deg)] animate-border-spin pointer-events-none" />
        )}

        {/* Inner Card Container */}
        <div className="relative w-full h-full rounded-[22.5px] bg-card dark:bg-zinc-950 border border-zinc-200/90 dark:border-zinc-800/90 p-5 sm:p-8 lg:p-6 flex flex-col justify-between text-left transition-colors duration-300 shadow-sm overflow-hidden z-10">
          {/* Continuous Automatic Glass Shine Beam (45-degree angle sweep) */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.25) 55%, transparent 80%)",
            }}
            animate={{
              x: ["-150%", "200%"],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: [0.25, 1, 0.5, 1],
              delay: delay * 0.4,
            }}
          />

          {/* TOP SECTION: Icon Badge & Title */}
          <div className="relative w-full flex flex-row sm:flex-col items-center sm:items-start gap-4 mb-3 sm:mb-6 lg:mb-3 z-20">
            {/* Circular Icon Badge with Silky-Smooth Continuous Beat Animation */}
            <div className="relative flex items-center justify-center shrink-0 w-14 h-14 sm:w-16 sm:h-16">
              {/* Outer Clean Pulse Ring (No Red Box Shadow) */}
              <motion.div
                className={`absolute inset-0 rounded-full pointer-events-none transform-gpu ${
                  isRedVariant
                    ? "bg-[#C00000]/10 dark:bg-[#C00000]/15 border border-[#C00000]/30"
                    : "bg-zinc-400/20 dark:bg-zinc-600/20 border border-zinc-300/30"
                }`}
                animate={{
                  scale: [1, 1.24, 1],
                  opacity: [0.35, 0.85, 0.35],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Inner Snug Breathing Ring */}
              <motion.div
                className={`absolute inset-1 rounded-full pointer-events-none transform-gpu ${
                  isRedVariant
                    ? "border border-[#C00000]/20"
                    : "bg-zinc-200/40 dark:bg-zinc-800/40"
                }`}
                animate={{
                  scale: [0.98, 1.12, 0.98],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Center Icon Circle */}
              <div
                className={`relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-transform duration-300 ${
                  isRedVariant
                    ? "bg-destructive border border-destructive text-white shadow-md"
                    : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-foreground"
                }`}
              >
                {Icon && (
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2] ${
                    isRedVariant ? "text-white" : "text-foreground"
                  }`} />
                )}
              </div>
            </div>

            {/* Card Title */}
            <h3 className={`text-lg sm:text-xl font-bold tracking-tight transition-colors duration-300 ${isRedVariant ? "text-destructive" : "text-foreground dark:text-white"} ${titleClassName || ""}`}>
              {title}
            </h3>
          </div>

          {/* MIDDLE / CONTENT SECTION: Description */}
          <div className="relative z-20 flex-1 flex flex-col justify-start">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
              {description}
            </p>
          </div>

          {/* Top Subtle Border Highlight */}
          <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/15 to-transparent pointer-events-none" />
        </div>
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;



