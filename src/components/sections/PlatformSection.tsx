"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { TypewriterText } from "@/components/ui/TypewriterText";
import { openVideoModal } from "@/components/ui/VideoModal";
import { cn } from "@/lib/utils";

interface PlatformPointProps {
  fullText: string;
  highlight?: boolean;
}

function PlatformPointItem({ fullText, highlight }: PlatformPointProps) {
  return (
    <div className="flex flex-col space-y-2 group text-left">
      <p
        className={`text-body-text transition-colors duration-300 ${highlight
          ? "font-bold text-[#C00000]"
          : "text-[#1a1a1a]"
          }`}
      >
        {fullText}
      </p>
    </div>
  );
}

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

function PlatformVideoCard({
  title,
  imageSrc,
  videoSrc,
}: {
  title: string;
  imageSrc: string;
  videoSrc: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <div className="relative w-full aspect-video">
      {/* Back layers for stacked 3D card depth effect */}
      <div className="absolute inset-y-6 -left-6 w-full bg-white/10 dark:bg-black/20 border border-white/20 shadow-2xl z-0 hidden sm:block rounded-2xl backdrop-blur-sm" />
      <div className="absolute inset-y-3 -left-3 w-full bg-white/15 dark:bg-black/30 border border-white/20 shadow-2xl z-10 hidden sm:block rounded-2xl backdrop-blur-sm" />

      {/* Main Video Card Frame */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-border shadow-2xl overflow-hidden z-20 flex items-center justify-center group">
        {isPlaying ? (
          isEmbed ? (
            <iframe
              ref={iframeRef}
              src={embedUrl}
              title={title}
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
              src={imageSrc}
              alt={title}
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
                {title}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const RADICAL_SERVICES = [
  {
    id: "independence",
    title: "Independence",
    description:
      "Because every film has its own entity, capitalization, accounting, revenue, and distributions, investors can follow each project as an individual investment while viewing their film holdings together in one place.",
    image: "/RT3.png",
  },
  {
    id: "visibility",
    title: "Visibility",
    description:
      "The BFF dashboard is designed to provide ongoing visibility into project progress, financial reporting, revenue activity, and distributions-without forcing investors to navigate disconnected entities, reports, and intermediaries.",
    image: "/RT1.jpeg",
  },
];

export function PlatformSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % RADICAL_SERVICES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + RADICAL_SERVICES.length) % RADICAL_SERVICES.length);
  }, []);

  return (
    <section
      id="platform"
      className="relative w-full scroll-mt-24 bg-[#E0E0E0] text-[#1a1a1a] py-16 md:py-20 lg:py-24 px-6 md:px-12 xl:px-24 flex flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-[1350px] flex flex-col gap-16 md:gap-20">
        {/* Top Block: THE PLATFORM Introductory Copy & Second Investor Dashboard Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Side - Text & Content (Fully Visible Copy) */}
          <div className="flex flex-col items-center lg:items-start gap-6 order-1 lg:order-1 lg:pr-8 xl:pr-16 text-center lg:text-left">
            <div>
              <TypewriterText
                text="THE PLATFORM"
                className="text-h3 text-[#C00000] uppercase tracking-widest font-semibold mb-2.5"
              />
              <h2 className="text-h2 text-[#1a1a1a] drop-shadow-sm mb-3.5">
                Discover.
                <span className="text-[#C00000]"> Invest.</span>
                <br />
                Follow the Story.
              </h2>
            </div>

            <div className="flex flex-col gap-4 sm:gap-6 mt-2">
              <PlatformPointItem fullText="Big Film Fund brings the film investment experience together in one place." />
              <PlatformPointItem fullText="Through the BFF platform, investors can discover a curated selection of films, explore the creative and commercial case behind each project, and choose the opportunities they believe in." />
              <PlatformPointItem fullText="When investors participate in a film offering, their capital is pooled specifically for that project. They can invest in one film or build a personal portfolio across multiple standalone opportunities over time." />
              <PlatformPointItem fullText="And the experience doesn’t end when the investment is made. Through the BFF dashboard, investors can follow each film’s progress from financing through production, release, and revenue—with access to project milestones, investor updates, financial reporting, and distributions." />
              <PlatformPointItem
                highlight
                fullText="Choose the films. Follow the journey. See how your investment performs."
              />
            </div>
          </div>

          {/* Right Side - Hero Video Player & Platform Highlights */}
          <div className="relative w-full flex flex-col gap-6 lg:ml-4 sm:ml-8 order-2 lg:order-2">
            {/* Video Card: Watch Platform Overview */}
            <PlatformVideoCard
              title="Watch Platform Overview"
              imageSrc="/2.png"
              videoSrc="https://vimeo.com/1228043169/02e4df1e71?fl=ip&fe=ec&share=copy"
            />
          </div>
        </div>

        {/* Standalone Sub-Section Block: Radical Transparency */}
        <div className="flex flex-col gap-8 pt-8 lg:pt-14">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1a1a1a] drop-shadow-sm mb-2">
              Radical <span className="text-[#C00000]">Transparency.</span>
            </h3>
            <p className="text-subtitle text-[#1a1a1a]">
              Delivered Through the Platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-2">
            {/* Left Column: Radical Transparency Items */}
            <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
              <p className="text-body-text text-[#1a1a1a] leading-relaxed mb-6">
                BFF's structure makes a clean financial picture possible. The platform makes it visible.
              </p>
              <div className="flex flex-col space-y-4">
                {RADICAL_SERVICES.map((service, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className="group relative flex items-start gap-4 p-6 rounded-2xl bg-white text-left transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex flex-col gap-2 flex-1">
                        {service.title && (
                          <span className="text-2xl md:text-3xl tracking-tight transition-colors duration-300 text-[#C00000] font-bold">
                            <span className="mr-2">0{index + 1}</span>
                            {service.title}
                          </span>
                        )}
                        <p className="text-[#1a1a1a] text-sm md:text-base font-normal leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Image Showcase with Navigation Buttons */}
            <div className="lg:col-span-7 flex flex-col justify-center items-center my-auto order-1 lg:order-2 w-full">
              <div className="relative group/gallery w-full">
                <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-muted/30 border border-border/40 shadow-xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full cursor-pointer"
                      onClick={handleNext}
                    >
                      <img
                        src={RADICAL_SERVICES[activeIndex]?.image}
                        alt={RADICAL_SERVICES[activeIndex]?.title || "Radical Transparency"}
                        className="w-full h-full object-cover m-0! p-0! block"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-all active:scale-90 shadow-md"
                      aria-label="Previous"
                    >
                      <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-all active:scale-90 shadow-md"
                      aria-label="Next"
                    >
                      <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
