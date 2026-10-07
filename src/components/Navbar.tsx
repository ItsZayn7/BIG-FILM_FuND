"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { openWaitlistModal } from "@/components/ui/WaitlistModal";

interface NavSubLink {
  label: string;
  href: string;
  id: string;
}

interface NavLink {
  label: string;
  href: string;
  id: string;
  dropdown?: NavSubLink[];
}

const navLinks: NavLink[] = [
  { label: "The problem", href: "#problem", id: "problem" },
  { label: "The BFF Model", href: "#new-model", id: "new-model" },
  { label: "Platform", href: "#platform", id: "platform" },
  { label: "Opportunity", href: "#opportunity", id: "opportunity" },
  { label: "How We Make Money", href: "#revenue", id: "revenue" },
  { label: "Built to Execute", href: "#execute", id: "execute" },
  { label: "Founders Club", href: "#founders-club", id: "founders-club" },
  { label: "Investment", href: "#investment", id: "investment" },
  { label: "Contact Us", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileModelDropdown, setMobileModelDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sectionIds = [
      "problem",
      "new-model",
      "platform",
      "opportunity",
      "revenue",
      "execute",
      "founders-club",
      "investment",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-15% 0px -50% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveSection(targetId);
    setMobileMenuOpen(false);

    if (!targetId || targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 85;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (typeof window !== "undefined" && window.history.pushState) {
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  const isParentActive = (link: NavLink) => {
    if (activeSection === link.id) return true;
    if (link.dropdown?.some((sub) => sub.id === activeSection)) return true;
    return false;
  };

  return (
    <header className="fixed left-1/2 top-4 sm:top-6 z-50 w-[96%] lg:w-[98%] xl:w-[95%] max-w-[1450px] -translate-x-1/2 rounded-full">
      {/* Background Layer (White in light theme, Black in dark theme) */}
      <div className="absolute inset-0 z-0 h-full w-full rounded-full bg-white dark:bg-zinc-950 border border-zinc-200/90 dark:border-zinc-800/90 shadow-lg transition-colors duration-300" />
      <div
        className="absolute inset-0 isolate -z-10 h-full w-full overflow-hidden rounded-full bg-white dark:bg-zinc-950 transition-colors duration-300"
      />

      <div className="relative z-10 mx-auto flex h-14 items-center justify-between pl-2 pr-3 lg:pl-2 lg:pr-4">
        <div className="shrink-0">
          <a href="#" onClick={(e) => handleLinkClick(e, "top")} className="flex items-center">
            <img
              src="/images/1212.png"
              alt="BFF Logo"
              decoding="async"
              className="h-18 sm:h-14 w-auto lg:h-16 scale-[1.25] sm:scale-[1.35] lg:scale-[1.5] origin-left transition-transform duration-300 pointer-events-auto"
            />
          </a>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex flex-1 items-center justify-center overflow-visible mx-2">
          <ul className="flex items-center justify-center gap-3 lg:gap-3.5 xl:gap-5 2xl:gap-6 whitespace-nowrap px-1 text-[12px] font-normal leading-[1.20] text-zinc-800 dark:text-zinc-200 transition-all duration-300">
            {navLinks.map((link) => {
              const active = isParentActive(link);
              return (
                <li key={link.label} className="group relative">
                  {link.dropdown ? (
                    <div
                      className={`flex cursor-pointer items-center gap-1 py-4 transition-colors duration-150 relative ${active ? "text-destructive font-bold" : "hover:text-destructive group-hover:text-destructive"
                        }`}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.id)}
                        className="block transition-colors duration-150"
                      >
                        {link.label}
                      </a>
                      <ChevronDown size={12} />
                      {active && (
                        <motion.span
                          layoutId="activeUnderline"
                          className="absolute bottom-1 left-0 right-0 h-[2px] rounded-full bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                        />
                      )}

                      {/* Dropdown Menu */}
                      <div className="absolute left-0 top-full hidden min-w-[260px] flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl p-1.5 shadow-xl group-hover:flex">
                        {link.dropdown.map((sublink) => {
                          const subActive = activeSection === sublink.id;
                          return (
                            <a
                              key={sublink.label}
                              href={sublink.href}
                              onClick={(e) => handleLinkClick(e, sublink.id)}
                              className={`px-3 py-2.5 text-xs transition-colors duration-150 rounded-lg ${subActive
                                ? "bg-destructive/15 text-destructive font-semibold"
                                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-destructive"
                                }`}
                            >
                              {sublink.label}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className={`block py-4 transition-colors duration-150 relative ${active ? "text-destructive font-bold" : "hover:text-destructive"
                        }`}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="activeUnderline"
                          className="absolute bottom-1 left-0 right-0 h-[2px] rounded-full bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                        />
                      )}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right CTA & Mobile Menu Toggle */}
        <div className="shrink-0 flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <button
            onClick={() => openWaitlistModal("waitlist")}
            className="cursor-pointer rounded-full bg-destructive px-3 py-1.5 lg:px-4 lg:py-1.5 text-[9px] sm:text-[10px] lg:text-xs font-semibold text-destructive-foreground shadow-sm transition-all duration-200 hover:scale-105 hover:bg-destructive/95 hover:shadow-md active:scale-95 whitespace-nowrap"
          >
            Join Waitlist
          </button>

          {/* Mobile Menu Button (< lg) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-border text-foreground hover:text-destructive transition-colors cursor-pointer ml-1"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-3 p-4 rounded-3xl bg-background/95 dark:bg-zinc-950/95 border border-border/80 shadow-2xl backdrop-blur-2xl z-50 flex flex-col gap-1 text-left overflow-hidden lg:hidden"
          >
            <div className="flex flex-col space-y-1 max-h-[70vh] overflow-y-auto pr-1">
              {navLinks.map((link) => {
                const active = isParentActive(link);
                return (
                  <div key={link.label} className="border-b border-border/40 last:border-0 pb-1 pt-1">
                    {link.dropdown ? (
                      <div>
                        <button
                          onClick={() => setMobileModelDropdown(!mobileModelDropdown)}
                          className={`w-full flex items-center justify-between py-2 px-3 text-sm font-semibold transition-colors rounded-xl ${active
                            ? "text-destructive bg-destructive/10"
                            : "text-foreground hover:text-destructive hover:bg-muted/40"
                            }`}
                        >
                          <span className="flex items-center gap-2">
                            {active && <span className="w-2 h-2 rounded-full bg-destructive" />}
                            {link.label}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${mobileModelDropdown ? "rotate-180 text-destructive" : ""}`}
                          />
                        </button>

                        {mobileModelDropdown && (
                          <div className="flex flex-col pl-4 pt-1 pb-2 space-y-1">
                            {link.dropdown.map((sublink) => {
                              const subActive = activeSection === sublink.id;
                              return (
                                <a
                                  key={sublink.label}
                                  href={sublink.href}
                                  onClick={(e) => handleLinkClick(e, sublink.id)}
                                  className={`block py-1.5 px-3 text-xs transition-colors rounded-lg ${subActive
                                    ? "text-destructive font-semibold bg-destructive/15"
                                    : "text-muted-foreground hover:text-destructive hover:bg-muted/30"
                                    }`}
                                >
                                  {sublink.label}
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.id)}
                        className={`flex items-center justify-between py-2.5 px-3 text-sm font-semibold transition-colors rounded-xl ${active
                          ? "text-destructive bg-destructive/10"
                          : "text-foreground hover:text-destructive hover:bg-muted/40"
                          }`}
                      >
                        <span className="flex items-center gap-2">
                          {active && <span className="w-2 h-2 rounded-full bg-destructive" />}
                          {link.label}
                        </span>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Menu Footer CTA */}
            <div className="pt-3 mt-1 border-t border-border/60 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Big Film Fund</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWaitlistModal("waitlist");
                }}
                className="py-2 px-4 rounded-full bg-destructive text-white text-xs font-bold uppercase tracking-wider hover:bg-destructive/90 transition-colors shadow-sm"
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG Filter for Navbar */}
      <svg className="hidden">
        <defs>
          <filter
            id="navbar-glass"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05 0.05"
              numOctaves="1"
              seed="2"
              result="turbulence"
            />
            <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurredNoise"
              scale="70"
              xChannelSelector="R"
              yChannelSelector="B"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
            <feComposite in="finalBlur" in2="finalBlur" operator="over" />
          </filter>
        </defs>
      </svg>
    </header>
  );
}


