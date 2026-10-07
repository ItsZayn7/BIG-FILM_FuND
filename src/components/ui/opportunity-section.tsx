"use client";

import React from "react";
import { TrendingUp, Play, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { openVideoModal } from "@/components/ui/VideoModal";

const BANNER_ITEMS = [
  {
    image: "/f1.jpeg",
    title: "Discover",
    subtitle: "Curated Opportunities",
    tag: "01 / EXPLORE",
  },
  {
    image: "/f2.jpeg",
    title: "Evaluate",
    subtitle: "Integrated Film Plans",
    tag: "02 / RIGOR",
  },
  {
    image: "/f3.jpeg",
    title: "Transact",
    subtitle: "Direct Participation",
    tag: "03 / STRUCTURE",
  },
  {
    image: "/f4.jpeg",
    title: "Manage",
    subtitle: "Unified Portfolio",
    tag: "04 / HOLDINGS",
  },
  {
    image: "/f5.jpeg",
    title: "Understand",
    subtitle: "Radical Transparency",
    tag: "05 / REPORTING",
  },
  {
    image: "/f6.jpeg",
    title: "Infrastructure",
    subtitle: "Modern Film Finance",
    tag: "06 / ECOSYSTEM",
  }, {
    image: "/f7.jpeg",
    title: "rally",
    subtitle: "Modern Film Finance",
    tag: "06 / EC",
  },
  {
    image: "/f8.jpeg",
    title: "Anglelist",
    subtitle: "Modern Film Finance",
    tag: "06 / ECOS",
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

export default function OpportunitySection() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const videoSrc = "https://vimeo.com/1228043170/264e12457f?fl=ip&fe=ec&share=copy";
  const embedUrl = getEmbedUrl(videoSrc);
  const isEmbed = videoSrc.includes("vimeo.com") || videoSrc.includes("youtube.com") || videoSrc.includes("youtu.be");

  React.useEffect(() => {
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
      id="opportunity"
      className="relative scroll-mt-24 w-full bg-[#E0E0E0] text-[#1a1a1a] py-16 md:py-20 lg:py-24 px-6 md:px-12 xl:px-24 flex justify-center"
    >
      <div className="mx-auto w-full max-w-[1350px] flex flex-col gap-12 lg:gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - All Copy Shown in Full */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div>
              <TypewriterText
                text="THE OPPORTUNITY"
                className="text-h3 text-[#C00000] uppercase tracking-widest font-semibold mb-2.5"
              />
              <h2 className="text-h2 text-[#1a1a1a] drop-shadow-sm mb-3.5">
                Film is Ready for Modern <br className="hidden sm:inline" />
                <span className="text-[#1a1a1a]/70">Investment Infrastructure.</span>
              </h2>
            </div>

            <div className="flex flex-col space-y-6 pt-4 text-left">
              {/* Point 1 */}
              <div>
                <p className="text-sm md:text-base text-[#1a1a1a] leading-relaxed">
                  Film is a global business—financed, produced, distributed, and consumed in markets
                  around the world.
                </p>
              </div>

              {/* Point 2 */}
              <div>
                <p className="text-sm md:text-base text-[#1a1a1a] leading-relaxed">
                  Yet film investing remains largely fragmented: built around private networks, one-off deals, inconsistent structures, and investor experiences that begin and end with each individual project.
                </p>
              </div>

              {/* Point 3 */}
              <div>
                <p className="text-sm md:text-base text-[#1a1a1a] leading-relaxed">
                  The opportunity is not simply to give more people access to film investments. It is to transform how those opportunities are sourced, evaluated, structured, financed, brought to market, and experienced by investors.
                </p>
              </div>

              {/* Point 4 */}
              <div>
                <p className="text-sm md:text-base text-[#1a1a1a] leading-relaxed">
                  <span className="font-bold text-[#C00000]">Big Film Fund</span> is building the
                  model and platform to make that transformation possible.
                </p>
              </div>

              {/* Point 5 */}
              <div>
                <p className="text-sm md:text-base text-[#C00000] font-bold leading-relaxed">
                  Film is ready for that transformation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 2A Video Card - "Investing has changed" */}
          <div className="flex flex-col w-full h-full my-auto justify-center items-center">
            <div className="relative w-full aspect-video">
              {/* Stacked depth layers */}
              <div className="absolute inset-y-6 -left-6 w-full bg-white/10 dark:bg-black/20 border border-white/20 shadow-2xl z-0 hidden sm:block rounded-2xl backdrop-blur-sm" />
              <div className="absolute inset-y-3 -left-3 w-full bg-white/15 dark:bg-black/30 border border-white/20 shadow-2xl z-10 hidden sm:block rounded-2xl backdrop-blur-sm" />

              {/* Video Card Container */}
              <div ref={containerRef} className="absolute inset-0 w-full h-full rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-border shadow-2xl overflow-hidden z-20 flex items-center justify-center group">
                {isPlaying ? (
                  isEmbed ? (
                    <iframe
                      ref={iframeRef}
                      src={embedUrl}
                      title="Investing Has Changed"
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
                      src="/3.png"
                      alt="Investing has changed"
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
                        Investing has changed
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Structural Shift Card with Running Banner */}
        <div className="relative w-full rounded-3xl bg-gradient-to-r from-[#090909] via-[#121212] to-[#171717] border border-zinc-800/80 p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col gap-8 overflow-hidden text-left">
          {/* Ambient Red Radial Glow */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#C00000]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-10">
            {/* Red Glowing Icon Circle */}
            <div className="relative z-10 flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C00000] via-[#470003] to-[#101010] border border-red-500/70 text-white shadow-[0_0_25px_rgba(192,0,0,0.4)]">
              <TrendingUp size={32} strokeWidth={1.7} />
            </div>

            {/* Content Text */}
            <div className="relative z-10 max-w-4xl space-y-2.5">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Investing itself has undergone a <span className="text-[#C00000]">structural shift.</span>
              </h3>
              <p className="text-zinc-300 leading-relaxed text-sm md:text-base font-normal">
                Platforms did more than open access to startups, real estate, and alternative assets. They created the infrastructure that made those opportunities easier to discover, evaluate, transact, manage, and understand.
              </p>
            </div>
          </div>

          {/* Running Image Marquee Banner (f1.jpeg to f6.jpeg - Ultra Compact) */}
          <div className="relative w-full mt-1 pt-1 pb-1 overflow-hidden group/marquee">
            {/* Left and Right Gradient Mask Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-[#0d0d0d] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[#0d0d0d] to-transparent z-20 pointer-events-none" />

            <div className="flex overflow-hidden">
              <motion.div
                className="flex gap-3 sm:gap-4 shrink-0"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 18,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[...BANNER_ITEMS, ...BANNER_ITEMS, ...BANNER_ITEMS, ...BANNER_ITEMS].map((item, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 sm:w-28 md:w-36 h-14 sm:h-16 md:h-20 shrink-0 rounded-lg overflow-hidden border border-white/20 bg-black/40 shadow-md group/card hover:border-[#C00000] hover:shadow-[0_0_15px_rgba(192,0,0,0.5)] transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={`Banner item ${idx}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300 pointer-events-none"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

