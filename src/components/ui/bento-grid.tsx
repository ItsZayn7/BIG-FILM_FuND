"use client";
import { clsx } from "clsx";
import { motion } from "framer-motion";

export default function FUIBentoGridDark() {
  return (
    <section className="w-full bg-background  pb-8">
      <div className="w-full px-6 md:px-12 xl:px-24 mx-auto max-w-[1350px]">
        <div className="flex flex-col items-start text-left">
          <h2 className="text-h2 text-foreground dark:text-white drop-shadow-sm mb-3.5">Radical <span className="text-destructive">Transparency.</span></h2>
          <p className="text-subtitle text-muted-foreground">Delivered Through the Platform.</p>
        </div>
      </div>
    </section>
  );
}

export function BentoCard({
  dark = true,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
}: {
  dark?: boolean;
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  fade?: ("top" | "bottom")[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-xl",
        "bg-black dark:bg-[#0a0a0a] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] shadow-sm ring-1 ring-white/10",
        "data-[dark]:bg-zinc-900 data-[dark]:ring-white/15",
      )}
    >
      <div className="relative h-[22rem] shrink-0">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-black to-50% opacity-25" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-black to-50% opacity-25" />
        )}
      </div>
      <div className="relative p-6 lg:p-8 z-20 isolate mt-[-110px] h-[14rem] backdrop-blur-xl text-white bg-black/40 border-t border-white/10">
        <h1 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{eyebrow}</h1>
        <p className="mt-1 text-xl font-medium tracking-tight text-white group-data-[dark]:text-white">
          {title}
        </p>
        <p className="mt-2 max-w-[600px] text-sm/6 text-zinc-300">{description}</p>
      </div>
    </motion.div>
  );
}
