"use client";

import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";
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

export function RevenueSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = "https://vimeo.com/1227838503/9442feddbc?fl=pl&fe=sh";
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
      id="revenue"
      className="relative w-full scroll-mt-24 bg-[#E0E0E0] text-[#1a1a1a] pt-16 md:pt-20 lg:pt-24 pb-4 px-6 md:px-12 xl:px-24 flex flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-[1350px] flex flex-col space-y-10 lg:space-y-16">
        <div className="w-full text-center lg:text-left">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-x-16 lg:gap-y-6 items-start mt-8 lg:mt-0">
            {/* Headers and Intro Sentence */}
            <div className="order-1 lg:col-start-1 lg:row-start-1 lg:pr-8 xl:pr-16 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
              <TypewriterText
                text="HOW WE MAKE MONEY"
                className="text-h3 text-[#C00000] uppercase tracking-widest font-semibold mb-2.5"
              />
              <h2 className="text-h2 text-[#C00000] drop-shadow-sm mb-3.5">
                Multiple <span className="text-[#C00000]">Revenue Streams.</span>
              </h2>
              <div className="text-subtitle text-[#1a1a1a] transition-colors duration-300 max-w-md mx-auto lg:max-w-none lg:mx-0 text-left">
                <p>
                  Big Film Fund is building a platform business, with multiple
                  complementary revenue streams not dependent on the success of
                  any one movie.
                </p>
              </div>
            </div>

            {/* Right Side - Stacked Video Player */}
            <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 relative w-full aspect-video lg:ml-4 sm:ml-8 mt-2 lg:mt-0">
              <div className="absolute inset-y-6 -left-6 w-full bg-white/10 dark:bg-black/20 border border-white/20 shadow-2xl z-0 hidden sm:block rounded-2xl backdrop-blur-sm" />
              <div className="absolute inset-y-3 -left-3 w-full bg-white/15 dark:bg-black/30 border border-white/20 shadow-2xl z-10 hidden sm:block rounded-2xl backdrop-blur-sm" />

              <div ref={containerRef} className="absolute inset-0 w-full h-full rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-border shadow-2xl overflow-hidden z-20 flex items-center justify-center group">
                {isPlaying ? (
                  isEmbed ? (
                    <iframe
                      ref={iframeRef}
                      src={embedUrl}
                      title="Your chance to own the platform"
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
                      src="/5.png"
                      alt="Your chance to own the platform"
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
                        Your chance to own the platform
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
