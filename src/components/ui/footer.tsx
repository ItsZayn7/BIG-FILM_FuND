"use client";

import React from "react";
import { ArrowUp, Mail, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

function handleScrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const navLinks = [
  { name: "Solution", href: "#problem" },
  { name: "Model", href: "#new-model" },
  { name: "Platform", href: "#platform" },
  { name: "Opportunity", href: "#opportunity" },
  { name: "Revenue", href: "#revenue" },
  { name: "Execute", href: "#execute" },
  { name: "Founders Club", href: "#founders-club" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "Email", href: "mailto:investors@bigfilmfund.com", icon: Mail },
  {
    name: "X",
    href: "https://x.com",
    icon: () => (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "Facebook", href: "https://facebook.com", icon: Facebook },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "YouTube", href: "https://youtube.com", icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border/50 text-foreground py-10">
      <div className="mx-auto w-full max-w-[1350px] px-6 sm:px-10 lg:px-16 flex flex-col gap-8">
        {/* Main Minimalist Header Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Logo & Brief Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href="#" className="flex items-center">
              <img
                src="/images/1212.png"
                alt="BFF Logo"
                className="h-12 sm:h-14 w-auto origin-center sm:origin-left transition-transform duration-300"
              />
            </a>
            <span className="hidden sm:inline text-border font-light text-lg">|</span>
            <p className="text-xs text-muted-foreground font-medium tracking-wide">
              Modern Film Investment Infrastructure
            </p>
          </div>

          {/* Minimal Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-destructive transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Separator */}
        <div className="w-full border-t border-border/40" />

        {/* Bottom Social, Controls & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center md:text-left">
          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-border/60 bg-muted/20 text-muted-foreground hover:text-destructive hover:border-destructive/40 hover:bg-destructive/10 transition-all duration-200"
                >
                  <Icon />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-muted-foreground/70">
            © {new Date().getFullYear()} Big Film Fund. All rights reserved.
          </p>

          {/* Theme & Scroll Controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={handleScrollTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 bg-muted/20 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200 cursor-pointer"
            >
              <span>Top</span>
              <ArrowUp className="h-3.5 w-3.5 text-destructive" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
