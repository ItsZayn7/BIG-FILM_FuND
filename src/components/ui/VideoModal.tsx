"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const DEFAULT_VIDEO_URL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

interface VideoModalState {
  isOpen: boolean;
  videoUrl: string;
  title: string;
}

let openModalHandler: ((url?: string, title?: string) => void) | null = null;

export function openVideoModal(url?: string, title?: string) {
  if (openModalHandler) {
    openModalHandler(url, title);
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-video-modal", { detail: { url, title } })
    );
  }
}

function getFormattedEmbedUrl(url: string): string {
  if (!url || url.trim().length === 0 || url.includes("dropbox.com")) {
    return DEFAULT_VIDEO_URL;
  }
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

export function VideoModal() {
  const [modalState, setModalState] = useState<VideoModalState>({
    isOpen: false,
    videoUrl: "",
    title: "",
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const handleOpen = (url?: string, title?: string) => {
      const targetUrl = getFormattedEmbedUrl(url || "");

      setCurrentUrl(targetUrl);
      setVideoError(false);
      setShowPlayOverlay(false);
      setModalState({
        isOpen: true,
        videoUrl: targetUrl,
        title: title || "Big Film Fund Presentation",
      });
    };

    openModalHandler = handleOpen;

    const handleCustomEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        handleOpen(detail.url, detail.title);
      }
    };

    window.addEventListener("open-video-modal", handleCustomEvent);

    return () => {
      openModalHandler = null;
      window.removeEventListener("open-video-modal", handleCustomEvent);
    };
  }, []);

  useEffect(() => {
    if (modalState.isOpen && videoRef.current && !currentUrl.includes("youtube") && !currentUrl.includes("vimeo")) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShowPlayOverlay(false);
          })
          .catch((err) => {
            console.warn("Unmuted autoplay restricted by browser policy. Retrying muted...", err);
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current
                .play()
                .then(() => {
                  setIsPlaying(true);
                  setShowPlayOverlay(false);
                })
                .catch(() => {
                  setIsPlaying(false);
                  setShowPlayOverlay(true);
                });
            }
          });
      }
    }
  }, [modalState.isOpen, currentUrl]);

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentUrl("");
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (modalState.isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [modalState.isOpen]);

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowPlayOverlay(false);
        })
        .catch((err) => console.error("Manual play error:", err));
    }
  };

  const handleVideoError = () => {
    if (currentUrl !== DEFAULT_VIDEO_URL) {
      setCurrentUrl(DEFAULT_VIDEO_URL);
      setVideoError(false);
    } else {
      setVideoError(true);
    }
  };

  const isEmbed =
    currentUrl.includes("youtube.com") ||
    currentUrl.includes("vimeo.com") ||
    currentUrl.includes("youtu.be");

  return (
    <AnimatePresence>
      {modalState.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden">
          {/* Dark Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl aspect-video rounded-2xl bg-zinc-950 border border-zinc-800 shadow-[0_0_60px_rgba(192,0,0,0.35)] overflow-hidden z-10 flex flex-col"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900/90 border-b border-zinc-800/80 z-20">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C00000] animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase">
                  {modalState.title}
                </span>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-[#C00000] text-white flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Close Video Modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player Box */}
            <div className="relative w-full flex-1 bg-black overflow-hidden flex items-center justify-center">
              {isEmbed ? (
                <iframe
                  src={currentUrl}
                  title={modalState.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : videoError ? (
                <div className="flex flex-col items-center justify-center p-8 text-center gap-4 text-white">
                  <p className="text-destructive font-bold text-lg">Unable to load video stream</p>
                  <p className="text-sm text-zinc-400 max-w-md">
                    Please try again or select another presentation demo.
                  </p>
                  <button
                    onClick={() => {
                      setCurrentUrl(DEFAULT_VIDEO_URL);
                      setVideoError(false);
                    }}
                    className="px-6 py-2.5 bg-[#C00000] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#990000] transition-colors"
                  >
                    Play Overview Trailer
                  </button>
                </div>
              ) : (
                <div className="relative w-full h-full group flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={currentUrl}
                    controls
                    playsInline
                    onError={handleVideoError}
                    onPlay={() => {
                      setIsPlaying(true);
                      setShowPlayOverlay(false);
                    }}
                    onPause={() => setIsPlaying(false)}
                    className="w-full h-full object-contain"
                  />

                  {showPlayOverlay && !isPlaying && (
                    <div
                      onClick={handleManualPlay}
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 cursor-pointer z-30 transition-opacity duration-300"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C00000] text-white flex items-center justify-center shadow-[0_0_40px_rgba(192,0,0,0.8)] border border-white/30 hover:scale-110 active:scale-95 transition-all duration-300">
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white text-white translate-x-0.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold tracking-widest text-white uppercase drop-shadow-md">
                        Click to Play Presentation
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
