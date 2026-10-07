"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { LiquidButton } from "./liquid-glass-button";

interface DestinationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  location: string;
  flag?: string;
  stats?: string;
  description?: React.ReactNode;
  readMoreContent?: {
    title: React.ReactNode;
    description: React.ReactNode;
  };
  buttonText?: string;
  href?: string;
  themeColor: string;
  footerHint?: React.ReactNode;
  footerHintContent?: React.ReactNode;
}

const DestinationCard = React.forwardRef<HTMLDivElement, DestinationCardProps>(
  (
    {
      className,
      imageUrl,
      location,
      flag,
      stats,
      description,
      readMoreContent,
      buttonText,
      href,
      themeColor,
      footerHint,
      footerHintContent,
      ...props
    },
    ref,
  ) => {
    const [activeView, setActiveView] = React.useState<"front" | "main" | "hint">("front");

    const innerContent = (
      <>
        {/* Background Image with Parallax Zoom */}
        <img
          src={imageUrl}
          alt={location}
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 pointer-events-none"
        />

        {/* Content */}
        <div className="relative grid h-full w-full p-4 sm:p-5 text-white items-end">
            {/* Glass Container Wrapper - Sleek compact height matching Card 3 */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col h-[400px] sm:h-[420px] justify-between col-start-1 row-start-1 w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-300 transform-gpu bg-black/20 backdrop-blur-xl group-hover:border-white/20 p-5 sm:p-6"
            >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            {/* Front Content */}
            <div
              className={cn(
                "relative flex flex-col h-full justify-between transition-all duration-500",
                activeView !== "front"
                  ? "opacity-0 pointer-events-none absolute inset-x-5 inset-y-5 scale-[0.95] overflow-hidden"
                  : "opacity-100 scale-100",
              )}
            >
              <div className="flex flex-col flex-1 min-h-0 justify-start overflow-y-auto custom-scrollbar pr-1 space-y-2">
                <h3 className="text-[20px] font-extrabold text-white drop-shadow-md shrink-0 min-h-[52px] tracking-wide">
                  {location} {flag && <span className="ml-1">{flag}</span>}
                </h3>
                {stats && (
                  <p className="text-sm text-white/90 font-medium drop-shadow-sm shrink-0">{stats}</p>
                )}

                {description && (
                  <div className="text-[14px] text-white/95 mt-1 space-y-2 leading-relaxed">{description}</div>
                )}
              </div>

              <div className="pt-3 shrink-0 flex flex-col items-end gap-2">
                <button
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-[14px] font-medium text-white transition-all shadow-md hover:shadow-lg hover:scale-105 cursor-pointer"
                  onClick={(e) => {
                    if (readMoreContent) {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveView("main");
                    }
                  }}
                >
                  {readMoreContent ? (buttonText || "Read More") : "Explore"} <ArrowRight size={16} />
                </button>
                {footerHint && (
                  <button 
                    onClick={(e) => {
                      if (footerHintContent) {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveView("hint");
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-[12px] font-medium text-white transition-all shadow-md hover:shadow-lg hover:scale-105 cursor-pointer text-left"
                  >
                    {footerHint}
                  </button>
                )}
              </div>
            </div>

            {/* Back Content - Scrollable Text inside fixed card height */}
            {(readMoreContent || footerHintContent) && (
              <div
                className={cn(
                  "relative flex flex-col h-full justify-between transition-all duration-500 overflow-hidden",
                  activeView === "front"
                    ? "opacity-0 pointer-events-none absolute inset-x-5 inset-y-5 scale-[1.05]"
                    : "opacity-100 scale-100",
                )}
              >
                <div className="flex flex-col h-full min-h-0 justify-between">
                  {readMoreContent?.title && activeView === "main" && (
                    <h3 className="text-subtitle font-bold text-white shrink-0 pb-2 drop-shadow-md border-b border-white/15">
                      {readMoreContent.title}
                    </h3>
                  )}
                  <div className="text-sm text-white/95 my-2.5 space-y-2 leading-relaxed flex-1 overflow-y-auto custom-scrollbar pr-1.5">
                    {activeView === "hint" && footerHintContent ? footerHintContent : readMoreContent?.description}
                  </div>
                  <div className="pt-2 shrink-0 flex justify-start">
                    <button
                      className="flex items-center gap-2 px-6 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-[14px] font-medium text-white transition-all shadow-md hover:shadow-lg hover:scale-105 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveView("front");
                      }}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );

    const cardWrapperClass =
      "relative block w-full h-full rounded-3xl overflow-hidden transition-all duration-500 ease-in-out group-hover:scale-[1.01]";

    return (
      <div
        ref={ref}
        style={
          {
            // @ts-ignore - CSS custom properties are valid
            "--theme-color": themeColor,
          } as React.CSSProperties
        }
        className={cn("group w-full h-full", className)}
        {...props}
      >
        {readMoreContent ? (
          <div
            onClick={(e) => {
              e.preventDefault();
              if (isExpanded) {
                setIsExpanded(false);
              }
            }}
            className={cn(cardWrapperClass, "cursor-pointer")}
          >
            {innerContent}
          </div>
        ) : (
          <a
            href={href}
            className={cardWrapperClass}
            aria-label={`Explore details for ${location}`}
          >
            {innerContent}
          </a>
        )}
      </div>
    );
  },
);
DestinationCard.displayName = "DestinationCard";

export { DestinationCard };
