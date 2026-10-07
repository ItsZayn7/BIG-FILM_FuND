"use client";

import GlassCard from "@/components/ui/glass-card";
import { Server, Cpu, TrendingUp, Sparkles } from "lucide-react";

export function RevenueCardsSection() {
  return (
    <section className="relative w-full bg-[#d1d1d1] text-[#1a1a1a] pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 px-6 md:px-12 xl:px-24 flex items-center justify-center">
      <div className="mx-auto w-full max-w-[1350px] flex flex-col gap-8 md:gap-12">
        <div className="text-left w-full lg:max-w-none">
          <p className="text-body-text text-[#1a1a1a] leading-relaxed font-medium">
            Rather than depending on one movie or one source of income, BFF’s
            business model combines four complementary revenue streams:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          <GlassCard
            variant="red"
            icon={Server}
            delay={0.1}
            title="Platform Fees"
            description="Fees associated with bringing film offerings to market and supporting them through the BFF platform."
          />
          <GlassCard
            variant="red"
            icon={Cpu}
            delay={0.2}
            title="Project Participation"
            description="Revenue and defined economic participation associated with BFF’s role in financing, developing, and producing individual films."
          />
          <GlassCard
            variant="red"
            icon={TrendingUp}
            delay={0.3}
            title="Performance Upside"
            description="BFF participates in distributable revenue from successful films—aligning the company’s financial upside with performance."
          />
          <GlassCard
            variant="red"
            icon={Sparkles}
            delay={0.4}
            title="Partnerships"
            description="Revenue associated with distribution, licensing, content partnerships, and other commercial relationships."
          />
        </div>
      </div>
    </section>
  );
}
