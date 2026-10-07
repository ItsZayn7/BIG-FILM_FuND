"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Building2,
  Clapperboard,
  Users,
  TrendingUp,
  Star,
  Target,
  Zap,
  Network,
  DollarSign,
  Rocket,
  ClipboardList,
  ShieldCheck,
  Clock3,
  Info,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import "./Investment.css";
import { TypewriterText } from "@/components/ui/TypewriterText";
import dynamic from "next/dynamic";

const DemoProcess = dynamic(() => import("@/components/sections/CardStackDemo").then(m => m.Process));

export default function Investment() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = progressRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setProgress(96);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="investment"
      className="relative w-full scroll-mt-24 bg-background py-16 md:py-20 lg:py-24 px-6 md:px-12 xl:px-24 flex flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-[1350px] flex flex-col space-y-12 lg:space-y-16">
        {/* =====================================================
            HERO / INVESTMENT INTRO GRID
        ===================================================== */}
        <div className="flex flex-col gap-8 order-1 lg:order-1">
          {/* Section Heading Header */}
          <div className="w-full text-center lg:text-left">
            <TypewriterText
              text="THE INVESTMENT"
              className="text-h3 text-destructive uppercase tracking-widest font-semibold mb-3"
            />
            <h2 className="text-h2 text-foreground dark:text-white drop-shadow-sm mb-4">
              Own Part of the Company{" "}
              <br className="hidden sm:inline" />
              Building <span className="text-destructive">What Comes Next.</span>
            </h2>
          </div>

          {/* 2-Column Grid: Cards 1-5 (Left) and Selection Framework (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch">
            {/* Left Column: Info Text */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 pt-2 pb-6 lg:pb-0 text-left">
              <p className="text-body-text text-foreground leading-relaxed">
                This offering is an opportunity to purchase shares in Big Film Fund, Inc. – the company building the model, platform, and operating system described on this page.
              </p>
              <p className="text-body-text font-medium text-destructive leading-relaxed">
                You are not investing in a single movie.
              </p>
              <p className="text-body-text text-foreground leading-relaxed">
                You are investing in the company designed to source, evaluate, structure, finance, support, and participate in a growing pipeline of standalone films.
              </p>
              <p className="text-body-text text-foreground leading-relaxed">
                Future film investment opportunities are expected to be offered separately through individual film entities. Each will have its own investors, capitalization, economics, reporting, revenue, and performance.
              </p>
              <p className="text-body-text font-medium text-destructive leading-relaxed">
                Big Film Fund, Inc. is the company bringing those opportunities together through one platform.
              </p>
            </div>

            {/* Right Column: Selection Framework (Starts at Card 1, Ends at Card 5) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col h-full">
              <div className="relative w-full h-full rounded-3xl bg-card dark:bg-zinc-950 border border-border/80 p-5 sm:p-6 lg:p-6 shadow-md flex flex-col justify-between gap-4 text-left">
                {/* Card Header */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-destructive bg-destructive text-white shadow-sm">
                      <Target size={20} strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold text-destructive">
                      Selection Framework
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-md bg-destructive text-white text-xs font-bold uppercase tracking-wider">
                    Complete
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Phase 2 Implementation
                  </span>
                  <p className="text-body-text text-muted-foreground leading-relaxed mt-1.5">
                    BFF has developed a structured methodology for evaluating
                    projects across creative, audience, commercial, financial,
                    production, and distribution criteria.
                  </p>
                </div>

                <div className="w-full h-px bg-border/60" />

                {/* Progress Bar */}
                <div className="flex flex-col gap-2" ref={progressRef}>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 font-bold text-foreground">
                      <Zap size={16} className="text-destructive fill-destructive" />
                      <span>Evaluation Readiness</span>
                    </div>
                    <span className="font-extrabold text-destructive">{progress}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-destructive rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="w-full h-px bg-border/60" />

                {/* Connected Nodes */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <Network size={14} className="text-destructive" />
                    <span>Connected Core Modules</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-muted/40 dark:bg-zinc-900 border border-border/50 text-xs font-bold text-foreground">
                      <span>Pipeline Development</span>
                      <ArrowRight size={14} className="text-destructive" />
                    </div>
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-muted/40 dark:bg-zinc-900 border border-border/50 text-xs font-bold text-foreground">
                      <span>Platform Design</span>
                      <ArrowRight size={14} className="text-destructive" />
                    </div>
                  </div>
                </div>

                {/* 4 Framework Pillars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-muted/30 border border-border/40 gap-1.5">
                    <Target size={18} className="text-destructive" />
                    <span className="text-xs font-semibold text-foreground leading-tight">
                      Pipeline<br />Dev
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-muted/30 border border-border/40 gap-1.5">
                    <Clapperboard size={18} className="text-destructive" />
                    <span className="text-xs font-semibold text-foreground leading-tight">
                      Platform<br />Design
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-muted/30 border border-border/40 gap-1.5">
                    <Users size={18} className="text-destructive" />
                    <span className="text-xs font-semibold text-foreground leading-tight">
                      Industry<br />Network
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-muted/30 border border-border/40 gap-1.5">
                    <DollarSign size={18} className="text-destructive" />
                    <span className="text-xs font-semibold text-foreground leading-tight">
                      Financial<br />Model
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            WHAT THIS ROUND ENABLES & WHY NOW GRID
        ===================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch order-2 lg:order-2">
          {/* Enables Card */}
          <div className="relative rounded-3xl bg-card dark:bg-zinc-950 border border-border/80 p-5 sm:p-6 lg:p-8 shadow-md flex flex-col justify-between space-y-5 text-left order-1 lg:order-1">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-destructive bg-destructive text-white shadow-sm">
                  <BarChart3 size={22} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-destructive tracking-tight">
                  What This Round Enables
                </h3>
              </div>
              <p className="text-body-text text-muted-foreground leading-relaxed font-normal">
                Capital raised through this offering will support BFF's
                transition from development toward live operation, including:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-muted/30 dark:bg-zinc-900 border border-border/60 text-sm font-normal text-foreground/90">
                <Rocket size={18} className="shrink-0 mt-0.5 text-destructive" />
                <span>Advancing the platform and initial investor experience toward launch</span>
              </div>
              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-muted/30 dark:bg-zinc-900 border border-border/60 text-sm font-normal text-foreground/90">
                <ClipboardList size={18} className="shrink-0 mt-0.5 text-destructive" />
                <span>Structuring and preparing the first film investment opportunities</span>
              </div>
              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-muted/30 dark:bg-zinc-900 border border-border/60 text-sm font-normal text-foreground/90">
                <Clapperboard size={18} className="shrink-0 mt-0.5 text-destructive" />
                <span>Expanding and progressing the initial project pipeline</span>
              </div>
              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-muted/30 dark:bg-zinc-900 border border-border/60 text-sm font-normal text-foreground/90">
                <Users size={18} className="shrink-0 mt-0.5 text-destructive" />
                <span>Building operational capacity to evaluate and support films</span>
              </div>
              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-muted/30 dark:bg-zinc-900 border border-border/60 text-sm font-normal text-foreground/90">
                <Users size={18} className="shrink-0 mt-0.5 text-destructive" />
                <span>Growing the founding investor community</span>
              </div>
              <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-muted/30 dark:bg-zinc-900 border border-border/60 text-sm font-normal text-foreground/90">
                <ShieldCheck size={18} className="shrink-0 mt-0.5 text-destructive" />
                <span>Establishing foundation for recurring platform activity and revenue</span>
              </div>
            </div>
          </div>

          {/* Progress to date (Mobile Only) */}
          <div className="block lg:hidden order-2 -mx-6 md:-mx-12 my-8">
            <DemoProcess />
          </div>

          {/* Why Now Card */}
          <div className="relative rounded-3xl bg-card dark:bg-zinc-950 border border-border/80 p-5 sm:p-6 lg:p-8 shadow-md flex flex-col justify-between space-y-5 text-left order-3 lg:order-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-destructive bg-destructive text-white shadow-sm">
                  <Clock3 size={22} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-destructive tracking-tight">
                  Why Now?
                </h3>
              </div>
              <p className="text-body-text text-muted-foreground leading-relaxed">
                BFF has established its investor-focused model, developed its
                proprietary evaluation methodology, assembled industry leadership
                and relationships, identified an initial project pipeline, and defined
                the platform experience.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-card dark:bg-zinc-900 border-2 border-destructive/60 space-y-1.5">
              <p className="text-xl font-bold text-destructive">
                The next step is execution.
              </p>
              <p className="text-body-text text-foreground/90 leading-relaxed font-medium">
                This round is intended to help bring the platform to market, prepare
                the first film offerings, and begin the first operating cycle of Big Film Fund.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            BFF VS FILM DIFFERENCE CARD
        ===================================================== */}
        <div className="relative lg:rounded-3xl lg:bg-card lg:dark:bg-zinc-950 lg:border lg:border-border/80 lg:p-8 lg:shadow-md flex flex-col gap-4 lg:gap-5 text-left order-3 lg:order-3 py-4 lg:py-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-destructive bg-destructive text-white shadow-sm">
              <Info size={22} className="text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-destructive">
              What is the difference between investing in BFF and investing in a film?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-4 pt-1">
            <div className="flex items-start gap-3.5 lg:p-5 lg:rounded-2xl lg:bg-muted/30 lg:dark:bg-zinc-900 lg:border lg:border-border/60">
              <Building2 size={20} className="text-destructive shrink-0 mt-0.5" />
              <p className="text-body-text text-foreground/90 leading-relaxed font-medium">
                Investors in this offering are purchasing shares in Big Film Fund, Inc. They do not
                automatically receive a direct ownership interest in any individual film.
              </p>
            </div>

            <div className="flex items-start gap-3.5 lg:p-5 lg:rounded-2xl lg:bg-muted/30 lg:dark:bg-zinc-900 lg:border lg:border-border/60">
              <Clapperboard size={20} className="text-destructive shrink-0 mt-0.5" />
              <p className="text-body-text text-foreground/90 leading-relaxed font-medium">
                Future film offerings are expected to provide separate opportunities to invest
                in specific film entities through the BFF platform.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            FINAL SECTION CTA (Black & Red Structure)
        ===================================================== */}
        <div className="relative w-full rounded-2xl bg-gradient-to-r from-[#090909] via-[#121212] to-[#171717] border border-zinc-800/80 p-5 sm:p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center gap-5 sm:gap-8 overflow-hidden text-left order-4 lg:order-4">
          {/* Ambient Red Radial Glow */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#C00000]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Red Glowing Icon Circle */}
          <div className="relative z-10 flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C00000] via-[#470003] to-[#101010] border border-red-500/70 text-white shadow-[0_0_25px_rgba(192,0,0,0.4)]">
            <Clapperboard size={32} strokeWidth={1.7} />
          </div>

          {/* Content Text */}
          <div className="relative z-10 max-w-2xl space-y-2">
            <p className="text-body-text text-white/90 leading-relaxed font-normal">
              Today, you can own part of the company building a future where more people can own part of the movies they believe in.
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              <span className="text-[#C00000]">Join Us</span> at the Beginning.
            </h2>
          </div>

          {/* Decorative Subtle Light Trails on Right */}
          <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-40 hidden sm:flex flex-col justify-around overflow-hidden">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C00000]/50 to-transparent transform -rotate-12 translate-x-10" />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C00000]/70 to-transparent transform -rotate-12 translate-x-4" />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C00000]/40 to-transparent transform -rotate-12 translate-x-16" />
          </div>
        </div>
      </div>
    </section>
  );
}

