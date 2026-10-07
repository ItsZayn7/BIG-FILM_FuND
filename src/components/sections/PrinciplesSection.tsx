"use client";

import { DestinationCard } from "@/components/ui/card-21";

export function PrinciplesSection() {
  return (
    <section
      id="model"
      className="relative w-full scroll-mt-24 bg-background pb-16 md:pb-20 lg:pb-24 pt-4 px-6 md:px-12 xl:px-24 flex flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-[1350px] grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <div id="clean-picture" className="w-full min-h-[580px] lg:min-h-[640px] h-full scroll-mt-28">
          <DestinationCard
            imageUrl="/model-card-1.webp"
            location="Each Film. One Clean Economic Picture."
            href="#"
            buttonText="See How"
            themeColor="0 84% 30%"
            footerHint="ⓘ How does BFF keep each film financially separate?"
            footerHintContent={
              <>
                <p>
                  Each BFF film is maintained as a separate legal and economic entity. No other BFF film’s costs or losses are charged against it, and its capital, expenses, revenue, reporting, and distributions remain attached only to that project.
                </p>
                <p>
                  This avoids cross-collateralization between BFF films and preserves a clean financial picture for each investment.
                </p>
              </>
            }
            description={
              <>
                <p>
                  In traditional film finance, a movie can generate revenue
                  while its investors are left wondering where the money
                  went. One film’s earnings may become entangled with other
                  projects, shared company expenses, and layers of
                  participants who are paid before the investor.
                </p>
                <p>
                  BFF is designed to preserve a clean line between a film’s
                  performance and its investors’ participation.
                </p>
              </>
            }
            readMoreContent={{
              title: "",
              description: (
                <>
                  <p>
                    Each film stands on its own — with its own company, investors,
                    capitalization, budget, accounting, revenue, and distributions.
                  </p>
                  <p>
                    The performance of one film is not mixed with the economics of another.
                    Investors can evaluate a standalone opportunity, understand exactly what
                    they own, and follow how the film’s performance translates into their
                    participation.
                  </p>
                </>
              ),
            }}
          />
        </div>
        <div id="no-back" className="w-full min-h-[580px] lg:min-h-[640px] h-full scroll-mt-28">
          <DestinationCard
            imageUrl="/card22.png"
            location="No Back of the Line."
            flag=""
            stats=""
            href="#"
            buttonText="See How"
            themeColor="250 50% 30%"
            footerHint="ⓘ What is a recoupment waterfall?"
            footerHintContent={
              <>
                <p>
                  A recoupment waterfall establishes the order in which a film’s revenue is allocated among distributors, sales agents, investors, producers, and other participants.
                </p>
                <p>
                  These structures often include multiple tiers of fees, expenses, repayment priorities, and negotiated positions. A party at a later tier generally does not participate until the requirements of the tiers ahead of it have been satisfied.
                </p>
                <p>
                  BFF does not use a traditional sequential recoupment waterfall among its film participants. Once distributable revenue reaches the film entity, investors, filmmakers, and BFF share in the same revenue event according to their respective participation percentages.
                </p>
              </>
            }
            description={
              <>
                <p>
                  In traditional film finance, not everyone shares in a
                  movie’s revenue at the same time. The money is distributed
                  in a predefined order, and investors often have to wait
                  while others are paid first.
                </p>
                <p>BFF is designed differently.</p>
              </>
            }
            readMoreContent={{
              title: "",
              description: (
                <>
                  <p>
                    When distributable revenue is received, investors,
                    filmmakers, and BFF participate according to clearly
                    defined percentages — without a complex, sequential
                    Hollywood recoupment waterfall.
                  </p>
                </>
              ),
            }}
          />
        </div>
        <div id="discipline" className="w-full min-h-[580px] lg:min-h-[640px] h-full scroll-mt-28">
          <DestinationCard
            imageUrl="/model-card-3.webp"
            location="Commercial Discipline, Built In"
            flag=""
            stats=""
            href="#"
            buttonText="See How"
            themeColor="150 50% 25%"
            footerHint="ⓘ What does “fully capitalized” mean?"
            footerHintContent={
              <>
                <p>
                  Traditional film financing often centers on the cost of getting a movie made, leaving marketing, delivery, distribution, and other commercialization needs to be solved later.
                </p>
                <p>
                  BFF takes a more complete approach by fully capitalizing every project around its anticipated production AND commercialization requirements - not simply the cost of getting the film made.
                </p>
                <p>
                  By accounting upfront for the resources required to complete, deliver, market, and distribute the film, we reduce the risk of reaching the end of production without a funded path to an audience.
                </p>
                <p>
                  It’s not only a production budget. It’s a plan for the full path to the audience.
                </p>
              </>
            }
            description={
              <>
                <p>
                  At BFF, commercial discipline isn’t a checkpoint. It’s a design principle.
                </p>
                <p>
                  From the first review, the film’s creative ambition, audience, path to market, capitalization, and investor economics are evaluated as one integrated plan.
                </p>
                <p>
                  That discipline extends to how each film is funded. Before production begins, every BFF project must be fully capitalized for its anticipated journey to market — not simply for the cost of getting the film made.
                </p>
              </>
            }
            readMoreContent={{
              title: "",
              description: (
                <>
                  <p>
                    A project moves forward only when BFF believes it can be responsibly financed, professionally executed, and brought to market within a credible commercial framework.
                  </p>
                  <p>
                    We don’t finance a production and hope a business emerges. We finance a plan designed to reach an audience.
                  </p>
                </>
              ),
            }}
          />
        </div>
      </div>
    </section>
  );
}
