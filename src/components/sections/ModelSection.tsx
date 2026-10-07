import { TypewriterText } from "@/components/ui/TypewriterText";

export function ModelSection() {
  return (
    <section
      id="new-model"
      className="relative w-full scroll-mt-24 bg-background py-14 md:py-18 lg:py-20 px-6 md:px-12 xl:px-24 flex flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <TypewriterText
            text="THE BFF MODEL"
            className="text-h3 text-destructive uppercase tracking-widest font-semibold mb-2.5"
          />
          <h2 className="text-h2 text-foreground dark:text-white drop-shadow-sm mb-3.5">
            A New Model For{" "}
            <span className="text-destructive">Film Investing</span>
          </h2>
        </div>

        <div className="w-full max-w-[1350px] text-center lg:text-left mt-6 lg:mt-8 space-y-4 text-foreground/90 dark:text-zinc-200 text-subtitle font-normal leading-relaxed">
          <p>
            Big Film Fund is building a platform designed to make film
            investing more accessible, and fundamentally, more
            investor-focused.
          </p>
          <p>
            In addition to opening the door to film investment
            opportunities for everyday investors, BFF has designed a
            new model around a few clear principles.
          </p>
        </div>
      </div>
    </section>
  );
}

