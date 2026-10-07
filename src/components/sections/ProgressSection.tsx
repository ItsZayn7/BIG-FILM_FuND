import MobileRadialCarousel from "@/components/ui/mobile-radial-carousel";
import { opportunityTimelineData } from "@/components/sections/TimelineSection";
import { TypewriterText } from "@/components/ui/TypewriterText";

export function ProgressSection() {
  return (
    <section
      id="progress-to-date"
      className="relative w-full scroll-mt-24 bg-background py-16 md:py-20 lg:py-24 px-6 md:px-12 xl:px-24 flex flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-[1350px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="flex flex-col items-center lg:items-start lg:pr-8 xl:pr-16 order-1 lg:order-1 text-center lg:text-left">
            <TypewriterText
              text="PROGRESS TO DATE"
              className="text-h3 text-destructive uppercase tracking-widest font-semibold mb-2.5"
            />
            <h2 className="text-h2 text-foreground dark:text-white drop-shadow-sm mb-3.5">
              From Foundation to <span className="text-destructive">Launch</span>
            </h2>
            <div className="space-y-4 text-subtitle text-muted-foreground max-w-md mx-auto lg:max-w-none lg:mx-0 text-left">
              <p>
                Big Film Fund has spent its development phase building more
                than a concept.
              </p>
              <p>
                Rather than rushing a single film to market, BFF has focused on
                establishing the core capabilities required to source, evaluate,
                structure, and support film investment opportunities repeatedly.
              </p>
            </div>
          </div>

          {/* Right side circular system */}
          <div className="relative w-full flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0">
            <MobileRadialCarousel timelineData={opportunityTimelineData} />
          </div>
        </div>
      </div>
    </section>
  );
}
