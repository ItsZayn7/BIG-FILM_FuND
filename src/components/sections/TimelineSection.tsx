"use client";

import { useState, useRef, useEffect } from "react";

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import MobileRadialCarousel from "@/components/ui/mobile-radial-carousel";
import {
  Search,
  FileText,
  Blocks,
  CircleDollarSign,
  Rocket,
  Users,
  Play,
} from "lucide-react";

import { TypewriterText } from "@/components/ui/TypewriterText";

export const opportunityTimelineData = [
  {
    id: 1,
    title: "Source",
    date: "Jan 2026",
    content: "High potential film projects.",
    description: "Curating studio-grade film projects with strong commercial potential and vetted talent.",
    category: "Sourcing & Curation",
    icon: Search,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Evaluate",
    date: "Feb 2026",
    content: "Disciplined commercial evaluation.",
    description: "Rigorous financial analysis, distribution modeling, and independent risk assessment.",
    category: "Commercial Discipline",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Structure",
    date: "Mar 2026",
    content: "Investor-aligned legal and financial structures.",
    description: "Creating clear, investor-first ownership models and transparent waterfall mechanics.",
    category: "Investor Alignment",
    icon: Blocks,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 4,
    title: "Finance",
    date: "Apr 2026",
    content: "Access capital efficiently.",
    description: "Seamless fractional capital allocation allowing direct participation in vetted films.",
    category: "Efficient Capitalization",
    icon: CircleDollarSign,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 50,
  },
  {
    id: 5,
    title: "Bring To Market",
    date: "May 2026",
    content: "Strategic distribution and positioning.",
    description: "Executing global theatrical, digital, and streaming sales strategies for maximum reach.",
    category: "Strategic Distribution",
    icon: Rocket,
    relatedIds: [4, 6],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 6,
    title: "Investor Experience",
    date: "Jun 2026",
    content: "Transparent ongoing and informative.",
    description: "Real-time performance metrics, automated revenue updates, and complete transparency.",
    category: "Radical Transparency",
    icon: Users,
    relatedIds: [5],
    status: "pending" as const,
    energy: 10,
  },
];

function getEmbedUrl(url: string): string {
  if (url.includes("vimeo.com")) {
    if (url.includes("player.vimeo.com/video/")) {
      return url.includes("autoplay") ? url : `${url}${url.includes("?") ? "&" : "?"}autoplay=1&autopause=0`;
    }
    const matches = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-zA-Z0-9]+))?/);
    if (matches && matches[1]) {
      const videoId = matches[1];
      const hash = matches[2];
      const hashParam = hash ? `?h=${hash}&` : "?";
      return `https://player.vimeo.com/video/${videoId}${hashParam}autoplay=1&autopause=0&title=0&byline=0&portrait=0`;
    }
  }
  return url;
}

export function TimelineSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = "https://vimeo.com/1228043168/0d79dcb98b?fl=ip&fe=ec&share=copy";
  const embedUrl = getEmbedUrl(videoSrc);
  const isEmbed = videoSrc.includes("vimeo.com") || videoSrc.includes("youtube.com") || videoSrc.includes("youtu.be");

  useEffect(() => {
    if (!isPlaying) return;

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (iframeRef.current?.contentWindow) {
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ method: "pause" }),
                "*"
              );
            }
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isPlaying]);

  return (
    <section className="relative w-full bg-background py-16 md:py-20 lg:py-24 px-6 md:px-12 xl:px-24 flex justify-center overflow-hidden">
      <div className="mx-auto w-full max-w-[1350px] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left side text */}
        <div className="flex flex-col items-center lg:items-start lg:pr-8 xl:pr-16 z-10 text-foreground order-1 lg:order-1 text-center lg:text-left">
          <div>
            <TypewriterText
              text="FILM IS NEXT"
              className="text-h3 text-destructive uppercase tracking-widest font-semibold mb-2.5"
            />
            <h2 className="text-h2 text-foreground dark:text-white drop-shadow-sm mb-3.5">
              Building the System for <br className="hidden sm:inline" />
              <span className="text-destructive">Modern Film Investing</span>
            </h2>
          </div>

          <div className="space-y-4 text-subtitle text-muted-foreground transition-colors duration-300 max-w-md mx-auto lg:max-w-none lg:mx-0 text-left">
            <p>
              Bringing film investing into the modern era requires more than
              putting traditional film deals online. It requires
              investor-focused structures, disciplined commercial evaluation, a
              repeatable project pipeline, and a platform that brings the entire
              investment experience together.
            </p>
            <p className="font-semibold text-destructive">
              That is the system BFF is building.
            </p>
          </div>
        </div>

        {/* Right side Stacked Video Player Box with 4.jpeg Thumbnail */}
        <div className="relative w-full aspect-video order-2 lg:order-2">
          {/* Back layers for stack effect */}
          <div className="absolute inset-y-6 -left-6 w-full bg-zinc-200/50 dark:bg-zinc-900/50 border border-border/40 shadow-2xl z-0 hidden sm:block rounded-2xl backdrop-blur-sm" />
          <div className="absolute inset-y-3 -left-3 w-full bg-zinc-300/50 dark:bg-zinc-900/70 border border-border/50 shadow-2xl z-10 hidden sm:block rounded-2xl backdrop-blur-sm" />

          {/* Main Video frame */}
          <div ref={containerRef} className="absolute inset-0 w-full h-full rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-border shadow-2xl overflow-hidden z-20 flex items-center justify-center group">
            {isPlaying ? (
              isEmbed ? (
                <iframe
                  ref={iframeRef}
                  src={embedUrl}
                  title="Film Is Next Overview"
                  className="w-full h-full border-0 rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-cover rounded-2xl"
                />
              )
            ) : (
              <div
                onClick={() => setIsPlaying(true)}
                className="relative w-full h-full flex items-center justify-center cursor-pointer"
              >
                {/* Thumbnail Image 4.jpeg */}
                <img
                  src="/4.png"
                  alt="Film Is Next Overview"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/55 group-hover:bg-black/30 transition-colors duration-500 z-10" />

                {/* Centered Play Button & Label */}
                <div className="relative z-20 flex flex-col items-center gap-3 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C00000] border border-white/40 text-white flex items-center justify-center shadow-[0_0_25px_rgba(192,0,0,0.6)] group-hover:scale-110 group-hover:bg-[#a00000] transition-all duration-300">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white text-white translate-x-0.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-white uppercase drop-shadow-md">
                    Watch Overview
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
