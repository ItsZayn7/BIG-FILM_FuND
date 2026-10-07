"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import { Rocket, Activity, CheckCircle2 } from "lucide-react";
import { TypewriterText } from "@/components/ui/TypewriterText";

// Interface for individual process card props
export interface ProcessCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
  index?: number;
}

// Reusable Process Card Component
const ProcessCard: React.FC<ProcessCardProps> = ({ icon: Icon, title, description, className, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
    className={cn(
      "group relative w-full overflow-hidden rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-card dark:bg-black p-4 sm:p-5 transition-all cursor-pointer duration-500 hover:border-[#C00000] hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)] backdrop-blur-sm",
      className
    )}
  >
    {/* Sparkling Background for Dark Mode */}
    <div className="absolute inset-0 z-0 hidden dark:block opacity-40 transition-opacity duration-500 group-hover:opacity-100">
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={60}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />
    </div>

    {/* Continuous Automatic Glass Shine Beam */}
    <motion.div
      className="absolute inset-0 z-10 pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-700"
      style={{
        background:
          "linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, 0.35) 45%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.35) 55%, transparent 80%)",
      }}
      animate={{
        x: ["-150%", "200%"],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatDelay: 2,
        ease: [0.25, 1, 0.5, 1],
        delay: index * 0.3,
      }}
    />

    {/* Interactive Hover Light Sheen */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10" />

    {/* Header Row: Icon + Title */}
    <div className="relative z-20 flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-3.5 mb-2 sm:mb-2.5">
      {/* Icon Container */}
      <div className="relative z-20 shrink-0 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-destructive bg-destructive text-white shadow-md transition-all duration-300">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-colors duration-300" />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-destructive transition-colors duration-300">{title}</h3>
    </div>

    {/* Content */}
    <div className="relative z-20 flex flex-col">
      <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

// Interface for the main section props
export interface ProcessSectionProps {
  id?: string;
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  items: ProcessCardProps[];
}

// Main Process Section Component
export const ProcessSection: React.FC<ProcessSectionProps> = ({
  id,
  subtitle,
  title,
  description,
  buttonText,
  items,
}) => {
  return (
    <section
      id={id}
      className="relative w-full scroll-mt-24 py-12 md:py-16 lg:py-16 px-6 md:px-12 xl:px-24 overflow-hidden flex flex-col justify-center bg-[#E0E0E0] text-[#1a1a1a]"
    >
      <div className="mx-auto w-full max-w-[1350px] flex flex-col space-y-8 lg:space-y-10">
        {/* Top Grid: Left Side Text & Right Side Creative Visual Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content (Centered on Mobile, Left Aligned on Desktop) */}
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
            <TypewriterText
              text={subtitle}
              className="text-h3 text-[#C00000] uppercase tracking-widest font-semibold mb-2.5"
            />
            <h2 className="text-h2 text-[#C00000] drop-shadow-sm mb-3.5">
              Market <span className="text-[#C00000]">Execution</span>
            </h2>
            <div className="space-y-4 text-subtitle text-[#1a1a1a] transition-colors duration-300 max-w-md mx-auto lg:max-w-none lg:mx-0">
              <p>{description}</p>
            </div>
            <p className="text-lg font-medium text-[#1a1a1a] mt-3 text-center lg:text-left">
              {buttonText}
            </p>
          </div>

          {/* Right Side - Creative Sleek Glass Execution Card (NO Red Shadow - Hidden on Mobile) */}
          <div className="hidden lg:block relative w-full aspect-video">
            {/* Layered Backdrop Cards */}
            <div className="absolute inset-y-5 -left-5 w-full rounded-3xl bg-zinc-200/50 dark:bg-zinc-900/50 border border-zinc-300/40 dark:border-zinc-800/40 shadow-lg z-0 hidden sm:block" />
            <div className="absolute inset-y-2.5 -left-2.5 w-full rounded-3xl bg-zinc-300/50 dark:bg-zinc-900/70 border border-zinc-300/50 dark:border-zinc-800/60 shadow-xl z-10 hidden sm:block" />

            {/* Main Glass Showcase Card */}
            <div className="absolute inset-0 w-full h-full rounded-3xl bg-card/90 dark:bg-zinc-950/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden z-20 flex flex-col justify-between p-5 sm:p-6 group transition-all duration-500 hover:border-zinc-600 dark:hover:border-zinc-700">
              {/* Subtle Monochrome Sparkle Overlay */}
              <div className="absolute inset-0 z-0 hidden dark:block opacity-25 pointer-events-none">
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={30}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                />
              </div>

              {/* Top Bar Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                  </span>
                  <span className="text-xs font-bold tracking-widest text-foreground dark:text-zinc-200 uppercase">
                    Execution Pipeline
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-destructive bg-zinc-100 dark:bg-zinc-900 px-3 py-1 ">
                  STATUS: ON TRACK
                </span>
              </div>

              {/* Center Timeline Visual */}
              <div className="relative z-10 my-auto py-1 space-y-3">
                {/* Timeline Step 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center text-destructive shrink-0 font-bold text-xs">
                    ✓
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-xs font-semibold text-foreground">
                      <span>01. Foundation & Structuring</span>
                      <span className="text-destructive text-[10px]">COMPLETED</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div className="bg-destructive h-full w-full" />
                    </div>
                  </div>
                </div>

                {/* Timeline Step 2 (Active) */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/20 border border-destructive flex items-center justify-center text-destructive shrink-0 font-bold text-xs">
                    ➔
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-xs font-bold text-foreground">
                      <span className="text-destructive">02. Market Execution</span>
                      <span className="text-destructive text-[10px] animate-pulse">ACTIVE PHASE</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <motion.div
                        className="bg-destructive h-full"
                        animate={{ width: ["40%", "75%", "40%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline Step 3 */}
                <div className="flex items-center gap-3 opacity-60">
                  <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-muted-foreground shrink-0 font-bold text-xs">
                    03
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-xs font-medium text-muted-foreground">
                      <span>03. Platform Scaling</span>
                      <span className="text-[10px]">UPCOMING</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-900 h-1.5 rounded-full mt-1" />
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="relative z-10 grid grid-cols-2 gap-3 pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80">
                <div className="bg-zinc-100 dark:bg-zinc-900/80 p-2 sm:p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-destructive shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
                      Deliverables
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      6 Core Pillars
                    </span>
                  </div>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-900/80 p-2 sm:p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-destructive shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
                      Target Outcome
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      Market Expansion
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Process Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 justify-center items-stretch pt-1 pb-1 text-left">
          {items.map((item, index) => (
            <ProcessCard key={index} index={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

