"use client";

import { useState, useRef, useEffect } from "react";
import GlassCard from "@/components/ui/glass-card";
import { Search, CheckCircle2, Clapperboard, Globe, ShieldCheck, Play } from "lucide-react";
import { TypewriterText } from "@/components/ui/TypewriterText";

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

export function ExecuteSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = "https://vimeo.com/1227838485/cc66c6a81e?fl=ip&fe=ec&share=copy";
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
    <section
      id="execute"
      className="relative w-full scroll-mt-24 py-16 md:py-20 lg:py-24 px-6 md:px-12 xl:px-24 overflow-hidden flex flex-col justify-center bg-background"
    >
      <div className="mx-auto w-full max-w-[1350px] flex flex-col space-y-10 lg:space-y-16">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-x-16 lg:gap-y-6 items-start mt-8 lg:mt-0">
          {/* Headers and Opening Text */}
          <div className="order-1 lg:col-start-1 lg:row-start-1 lg:pr-8 xl:pr-16 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            <TypewriterText
              text="BUILT TO EXECUTE"
              className="text-h3 text-destructive uppercase tracking-widest font-semibold mb-2.5"
            />
            <h2 className="text-h2 text-foreground dark:text-white drop-shadow-sm mb-3.5">
              The Capabilities <span className="text-destructive">Behind the Model</span>
            </h2>
            <div className="space-y-4 text-subtitle text-muted-foreground transition-colors duration-300 max-w-md mx-auto lg:max-w-none lg:mx-0 text-left">
              <p>
                A better film investment model only matters if it can be
                executed in the real world.
              </p>
              <p>
                Building a successful film investment platform requires more
                than technology. It requires access to investable projects,
                experienced commercial judgment, disciplined financial
                governance, professional production oversight, and the ability
                to bring films to audiences.
              </p>
            </div>
          </div>

          {/* Right Side - Stacked Video Player */}
          <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 relative w-full aspect-video lg:ml-4 sm:ml-8 mt-2 lg:mt-0">
            <div className="absolute inset-y-6 -left-6 w-full bg-zinc-200 dark:bg-zinc-900 border border-border/40 shadow-2xl z-0 hidden sm:block rounded-2xl" />
            <div className="absolute inset-y-3 -left-3 w-full bg-zinc-300 dark:bg-zinc-900 border border-border/50 shadow-2xl z-10 hidden sm:block rounded-2xl" />

            <div ref={containerRef} className="absolute inset-0 w-full h-full rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-border shadow-2xl overflow-hidden z-20 flex items-center justify-center group">
              {isPlaying ? (
                isEmbed ? (
                  <iframe
                    ref={iframeRef}
                    src={embedUrl}
                    title="Built To Execute Overview"
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
                  <img
                    src="/6.png"
                    alt="Built To Execute Overview"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  />

                  <div className="absolute inset-0 bg-black/40 dark:bg-black/55 group-hover:bg-black/30 transition-colors duration-500 z-10" />

                  <div className="relative z-20 flex flex-col items-center gap-3 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C00000] border border-white/40 text-white flex items-center justify-center shadow-[0_0_25px_rgba(192,0,0,0.6)] group-hover:scale-110 group-hover:bg-[#a00000] transition-all duration-300">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white text-white translate-x-0.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-widest text-white uppercase drop-shadow-md">
                      Watch Capabilities
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lifecycle Sentence */}
          <div className="order-3 lg:col-start-1 lg:row-start-2 lg:pr-8 xl:pr-16 w-full text-left mt-2 lg:mt-0">
            <div className="text-subtitle text-muted-foreground transition-colors duration-300 max-w-md mx-auto lg:max-w-none lg:mx-0 text-left">
              <p>
                Big Film Fund brings those capabilities together across the full
                film lifecycle.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Execution Cards in a Single Row */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch pt-4 pb-2">
          {/* Card 1 */}
          <GlassCard
            variant="red"
            icon={Search}
            delay={0.1}
            title="Project Access"
            description="A growing pipeline sourced through filmmakers, producers, representatives, and development relationships."
            className="w-full min-h-[240px] sm:min-h-[260px]"
          />

          {/* Card 2 */}
          <GlassCard
            variant="red"
            icon={CheckCircle2}
            delay={0.2}
            title="Disciplined Greenlight"
            description="A rigorous evaluation methodology testing creative strength, audience thesis, commercial potential, and risk."
            className="w-full min-h-[240px] sm:min-h-[260px]"
          />

          {/* Card 3 */}
          <GlassCard
            variant="red"
            icon={Clapperboard}
            delay={0.3}
            title="Production Execution"
            description="Experienced producers, defined budgets, clear agreements, accountable milestones, and professional oversight."
            className="w-full min-h-[240px] sm:min-h-[260px]"
          />

          {/* Card 4 */}
          <GlassCard
            variant="red"
            icon={Globe}
            delay={0.4}
            title="Distribution"
            description="Global distribution experience and commercial relationships that inform positioning to reach audiences."
            className="w-full min-h-[240px] sm:min-h-[260px]"
          />

          {/* Card 5 */}
          <GlassCard
            variant="red"
            icon={ShieldCheck}
            delay={0.5}
            title="Platform Oversight"
            description="Standalone structures, disciplined capital management, consistent reporting, and ongoing visibility."
            className="w-full min-h-[240px] sm:min-h-[260px]"
          />
        </div>
      </div>
    </section>
  );
}
