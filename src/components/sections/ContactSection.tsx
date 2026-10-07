"use client";

import React, { useState } from "react";
import {
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Clapperboard,
  MessageSquare,
  MapPin,
  Sparkles,
  ShieldCheck,
  User,
  HelpCircle,
} from "lucide-react";
import { openWaitlistModal } from "@/components/ui/WaitlistModal";
import { TypewriterText } from "@/components/ui/TypewriterText";

const inquiryTypes = [
  { id: "Investor Relations", label: "Investor Desk", icon: Building2, desc: "For shareholding & allocation queries" },
  { id: "Film Submissions", label: "Film Submissions", icon: Clapperboard, desc: "For filmmakers & production teams" },
  { id: "Founders Club", label: "Founders Club", icon: Sparkles, desc: "For priority founding member access" },
  { id: "Press & Media", label: "Press & Media", icon: MessageSquare, desc: "For interviews & media inquiries" },
];

export function ContactSection() {
  const [activeTab, setActiveTab] = useState("Investor Relations");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <section
      id="contact"
      className="relative w-full scroll-mt-24 bg-[#E0E0E0] text-[#1a1a1a] py-16 md:py-24 px-6 md:px-12 xl:px-24 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto w-full max-w-[1350px] space-y-14">
        {/* Header Section */}
        <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
          <TypewriterText
            text="CONTACT US"
            className="text-h3 text-[#C00000] uppercase tracking-widest font-semibold mb-2.5"
          />
          <h2 className="text-h2 text-[#C00000] drop-shadow-sm mb-3.5">
            Have Questions?{" "}
            <br className="hidden sm:inline" />
            <span className="text-[#C00000]">Let&apos;s Connect.</span>
          </h2>
          <p className="text-subtitle text-[#1a1a1a] leading-relaxed max-w-md mx-auto lg:max-w-2xl lg:mx-0">
            Direct communication channels for investors, filmmakers, packagers, and institutional partners. Our leadership team is ready to assist.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Channels & Information - Hidden on Mobile View */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-6 text-left">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#1a1a1a] tracking-tight">
                Direct Communication Desks
              </h3>
              <p className="text-body-text text-[#1a1a1a] leading-relaxed text-sm">
                Connect directly with the appropriate division at Big Film Fund.
              </p>
            </div>

            {/* Interactive Cards List */}
            <div className="flex flex-col gap-4">
              {/* Card 1: Investor Relations */}
              <div
                onClick={() => setActiveTab("Investor Relations")}
                className={`relative group p-5 sm:p-6 rounded-2xl bg-card dark:bg-zinc-950 border transition-all duration-300 cursor-pointer ${activeTab === "Investor Relations"
                  ? "border-destructive shadow-md ring-1 ring-destructive/40"
                  : "border-border/80 hover:border-destructive/40"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-destructive bg-destructive text-white shadow-md">
                    <Building2 size={22} strokeWidth={2} className="text-white" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-destructive text-base">Investor Relations Desk</h4>
                    <p className="text-xs text-muted-foreground">For shareholding, Founders Club & allocation</p>
                    <span className="inline-block pt-1 text-xs font-semibold text-destructive group-hover:underline">
                      investors@bigfilmfund.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Film Submissions */}
              <div
                onClick={() => setActiveTab("Film Submissions")}
                className={`relative group p-5 sm:p-6 rounded-2xl bg-card dark:bg-zinc-950 border transition-all duration-300 cursor-pointer ${activeTab === "Film Submissions"
                  ? "border-destructive shadow-md ring-1 ring-destructive/40"
                  : "border-border/80 hover:border-destructive/40"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-destructive bg-destructive text-white shadow-md">
                    <Clapperboard size={22} strokeWidth={2} className="text-white" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-destructive text-base">Film Project Submissions</h4>
                    <p className="text-xs text-muted-foreground">For filmmakers, producers & packagers</p>
                    <span className="inline-block pt-1 text-xs font-semibold text-destructive group-hover:underline">
                      submissions@bigfilmfund.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3: Press & Media */}
              <div
                onClick={() => setActiveTab("Press & Media")}
                className={`relative group p-5 sm:p-6 rounded-2xl bg-card dark:bg-zinc-950 border transition-all duration-300 cursor-pointer ${activeTab === "Press & Media"
                  ? "border-destructive shadow-md ring-1 ring-destructive/40"
                  : "border-border/80 hover:border-destructive/40"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-destructive bg-destructive text-white shadow-md">
                    <MessageSquare size={22} strokeWidth={2} className="text-white" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-destructive text-base">Media & Executive Press</h4>
                    <p className="text-xs text-muted-foreground">For media coverage, interviews & speaking</p>
                    <span className="inline-block pt-1 text-xs font-semibold text-destructive group-hover:underline">
                      press@bigfilmfund.com
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#d1d1d1] flex items-center gap-3">
                <Clock size={18} className="text-[#1a1a1a] shrink-0" />
                <div className="text-xs text-[#1a1a1a]">
                  <span className="font-bold text-[#1a1a1a] block">Response SLA</span>
                  Within 24 Hours
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#d1d1d1] flex items-center gap-3">
                <MapPin size={18} className="text-[#1a1a1a] shrink-0" />
                <div className="text-xs text-[#1a1a1a]">
                  <span className="font-bold text-[#1a1a1a] block">Headquarters</span>
                  Los Angeles & NY
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Creative Contact Form */}
          <div className="w-full lg:col-span-7">
            <div className="relative w-full rounded-3xl bg-card dark:bg-zinc-950 border border-border/80 p-6 sm:p-10 shadow-xl text-left overflow-hidden">
              {/* Subtle top metallic highlight */}
              <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-destructive/50 to-transparent pointer-events-none" />

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                      Send a Direct Message
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Our executive team will review and respond to your message promptly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
                        <User size={15} className="text-destructive" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-background dark:bg-zinc-900 border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-destructive focus:ring-1 focus:ring-destructive transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
                        <Mail size={15} className="text-destructive" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-background dark:bg-zinc-900 border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-destructive focus:ring-1 focus:ring-destructive transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject Line */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
                      <HelpCircle size={15} className="text-destructive" />
                      Subject Line
                    </label>
                    <input
                      type="text"
                      placeholder="Summary of your inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-background dark:bg-zinc-900 border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-destructive focus:ring-1 focus:ring-destructive transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
                      <MessageSquare size={15} className="text-destructive" />
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please share details about your inquiry or project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-background dark:bg-zinc-900 border border-border/80 rounded-xl p-4 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-destructive focus:ring-1 focus:ring-destructive transition-all resize-none"
                    />
                  </div>

                  {/* Confidentiality Notice */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                    <ShieldCheck size={14} className="text-destructive shrink-0" />
                    <span>Your inquiry is treated with strict confidentiality.</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#C00000] text-white font-bold tracking-wide uppercase rounded-xl hover:bg-[#990000] transition-all duration-300 hover:scale-[1.01] shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Transmitting Message...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success Confirmation State */
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-destructive/40 flex items-center justify-center text-destructive">
                    <CheckCircle2 size={36} />
                  </div>

                  <div className="space-y-2 max-w-md">
                    <h4 className="text-2xl font-bold text-foreground">Inquiry Received</h4>
                    <p className="text-body-text text-muted-foreground leading-relaxed text-sm">
                      Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. Your message to our <span className="font-semibold text-destructive">{activeTab}</span> team has been transmitted.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                    }}
                    className="px-6 py-2.5 rounded-full border border-border bg-muted/40 hover:bg-muted text-xs font-bold uppercase tracking-wider text-foreground transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
