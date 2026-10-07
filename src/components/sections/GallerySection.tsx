"use client";

import React from "react";

export function GallerySection() {
  return (
    <section className="relative w-full bg-background py-16 md:py-20 lg:py-24 px-6 md:px-12 xl:px-24 flex flex-col justify-center items-center">
      <div className="mx-auto w-full max-w-[1350px]">
        <div className="relative w-full rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-border/40 shadow-2xl bg-black/40">
          <img
            src="/mockup.jpeg"
            alt="BFF Platform Mockup"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover block"
          />
        </div>
      </div>
    </section>
  );
}

