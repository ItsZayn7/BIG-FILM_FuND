"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, User, Mail, Briefcase, DollarSign } from "lucide-react";

export type ModalType = "waitlist" | "founders";

interface OpenModalDetail {
  type: ModalType;
}

export function openWaitlistModal(type: ModalType = "waitlist") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<OpenModalDetail>("open-bff-modal", { detail: { type } })
    );
  }
}

export function WaitlistModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("waitlist");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    investorType: "Accredited Investor",
    capitalAllocation: "$10,000 - $50,000",
    updatesConsent: true,
  });

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<OpenModalDetail>;
      if (customEvent.detail?.type) {
        setModalType(customEvent.detail.type);
      } else {
        setModalType("waitlist");
      }
      setIsSubmitted(false);
      setIsOpen(true);
    };

    window.addEventListener("open-bff-modal", handleOpen);
    return () => window.removeEventListener("open-bff-modal", handleOpen);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate professional API submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const isFounders = modalType === "founders";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-md lg:max-w-lg bg-zinc-950/95 border border-white/10 dark:border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl z-50 overflow-y-auto max-h-[90vh] text-foreground my-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-zinc-800 transition-colors z-50 cursor-pointer"
              aria-label="Close Modal"
            >
              <X size={16} />
            </button>

            {!isSubmitted ? (
              <div className="relative z-10 flex flex-col space-y-4 sm:space-y-5">
                {/* Header Badge & Titles */}
                <div className="flex flex-col space-y-1.5 pr-6">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {isFounders ? "Join Founders Club" : "Join Big Film Fund Waitlist"}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {isFounders
                      ? "Get early allocation access to top-tier film offerings, direct quarterly reports, and executive roundtable invites."
                      : "Be among the first to explore curated film investment opportunities and participate in standalone offerings."}
                  </p>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-3 pt-1">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                      <User size={14} className="text-destructive" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-destructive/60 focus:ring-1 focus:ring-destructive/60 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                      <Mail size={14} className="text-destructive" />
                      Work or Personal Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-destructive/60 focus:ring-1 focus:ring-destructive/60 transition-all"
                    />
                  </div>

                  {/* Investor Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                      <Briefcase size={14} className="text-destructive" />
                      Investor Profile
                    </label>
                    <select
                      value={formData.investorType}
                      onChange={(e) => setFormData({ ...formData, investorType: e.target.value })}
                      className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-destructive/60 focus:ring-1 focus:ring-destructive/60 transition-all cursor-pointer"
                    >
                      <option value="Accredited Investor">Accredited Investor</option>
                      <option value="Individual Investor">Individual / Retail Investor</option>
                      <option value="Family Office / Institutional">Family Office / Institutional</option>
                      <option value="Filmmaker / Producer">Filmmaker / Producer</option>
                    </select>
                  </div>

                  {/* Estimated Capital Allocation */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                      <DollarSign size={14} className="text-destructive" />
                      Intended Investment Target
                    </label>
                    <select
                      value={formData.capitalAllocation}
                      onChange={(e) => setFormData({ ...formData, capitalAllocation: e.target.value })}
                      className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-destructive/60 focus:ring-1 focus:ring-destructive/60 transition-all cursor-pointer"
                    >
                      <option value="$1,000 - $10,000">$1,000 - $10,000</option>
                      <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                      <option value="$50,000 - $250,000">$50,000 - $250,000</option>
                      <option value="$250,000+">$250,000+</option>
                    </select>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="updatesConsent"
                      checked={formData.updatesConsent}
                      onChange={(e) => setFormData({ ...formData, updatesConsent: e.target.checked })}
                      className="mt-0.5 rounded border-white/20 bg-zinc-900 text-destructive focus:ring-destructive"
                    />
                    <label htmlFor="updatesConsent" className="text-[11px] sm:text-xs text-zinc-400 leading-normal cursor-pointer select-none">
                      Keep me updated on upcoming film offerings, investor distribution reports, and platform milestones.
                    </label>
                  </div>

                  {/* CTA Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full h-11 sm:h-12 rounded-xl bg-destructive hover:bg-destructive/90 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Processing Application...</span>
                    ) : (
                      <>
                        {isFounders ? "Request Founders Access" : "Secure Priority Access"}
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-500 pt-0.5">
                    <ShieldCheck size={12} className="text-zinc-400" />
                    <span>Your information is stored securely & confidential.</span>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Confirmation State */
              <div className="relative z-10 flex flex-col items-center justify-center text-center py-4 space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-900 border border-destructive/50 flex items-center justify-center text-destructive">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xl sm:text-2xl font-bold text-white">Application Received</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. You have been placed on the priority access list.
                  </p>
                </div>

                {/* Membership Card Preview */}
                <div className="w-full bg-zinc-900/90 border border-white/10 rounded-2xl p-3.5 text-left space-y-1.5 mt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Reference ID:</span>
                    <span className="font-mono text-destructive font-bold">#BFF-89412</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Tier Status:</span>
                    <span className="text-white font-medium">{isFounders ? "Founders Club Priority" : "Platform Waitlist"}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Email Registered:</span>
                    <span className="text-white font-medium truncate max-w-[180px]">{formData.email}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full h-10 sm:h-11 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-colors mt-3 cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
