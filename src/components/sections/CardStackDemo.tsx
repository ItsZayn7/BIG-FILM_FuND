"use client"

import { ContainerScroll, CardSticky } from "@/components/blocks/cards-stack"

const PROCESS_PHASES = [
  {
    id: "process-1",
    title: "Pipeline Development",
    description:
      "Initial film projects have been identified and are progressing through BFF’s evaluation and development process.",
  },
  {
    id: "process-2",
    title: "Proprietary Selection Methodology",
    description:
      "BFF has developed a structured methodology for evaluating projects across creative, audience, commercial, financial, production, and distribution criteria.",
  },
  {
    id: "process-3",
    title: "Platform Design",
    description:
      "The core platform architecture and investor experience have been defined, with prototypes in development and potential build partners under evaluation."
  },
  {
    id: "process-4",
    title: "Integrated Financial Model",
    description:
      "BFF has developed a financial model connecting individual film economics, company revenue streams, platform activity, and participation across a growing pipeline.",
  },
  {
    id: "process-5",
    title: "Industry Network",
    description:
      "The company has established active relationships and leadership experience across development, production, finance, marketing, and global distribution.",
  },
]

const WORK_PROJECTS = [
  {
    id: "work-project-3",
    title: "YCF DEV",
    services: ["Portfolio", "Partnership", "UI UX Design"],
    imageUrl:
      "https://cdn.21st.dev/assets/mirror/88/881fc510d9f2d4be28f9e0a9bf3a36ce76446ffaf10e04ad2b7b267e99c0cc76.jpg",
  },
  {
    id: "work-project-1",
    title: "Stridath Ecommerce",
    services: ["E-Commerce", "Branding", "UI UX Design", "Development"],
    imageUrl:
      "https://cdn.21st.dev/assets/mirror/d9/d98c3e78f2a441997ec696054bf57a19f5b553a4cf983a5428924ca307e12b66.jpg",
  },
  {
    id: "work-project-2",
    title: "Marketing Agency",
    services: ["Partnership", "UI UX Design", "Development"],
    imageUrl:
      "https://cdn.21st.dev/assets/mirror/16/16fe8a91243bb5d80b08fe4ddda63c4fe10956ce0ec4aa5bfa054798a9eb36dc.jpg",
  },
]

const ACHIEVEMENTS = [
  {
    id: "achivement-1",
    title: "4",
    description: "site of the day",
    bg: "rgb(58,148,118)",
  },
  {
    id: "achivement-2",
    title: "60+",
    description: "website created",
    bg: "rgb(195,97,158)",
  },
  {
    id: "achivement-3",
    title: "5+",
    description: "years of experience",
    bg: "rgb(202,128,53)",
  },
  {
    id: "achivement-4",
    title: "6+",
    description: "component created",
    bg: "rgb(135,95,195)",
  },
]
const Process = () => {
  return (
    <section className="relative w-full bg-background py-10 md:py-12 lg:py-16 px-6 md:px-12 xl:px-24 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-[1350px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="flex flex-col items-center lg:items-start lg:pr-8 xl:pr-16 text-center lg:text-left lg:sticky lg:top-[160px] mb-12 lg:mb-0">
            <h5 className="text-h3 text-destructive uppercase tracking-widest font-semibold mb-2.5">
              PROGRESS TO DATE
            </h5>
            <h2 className="text-h2 text-foreground dark:text-white drop-shadow-sm mb-3.5">
              From Foundation to{" "}
              <span className="text-destructive">Launch</span>
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
          <ContainerScroll className="flex flex-col space-y-6 md:space-y-12">
            {PROCESS_PHASES.map((phase, index) => (
              <CardSticky
                key={phase.id}
                index={index + 2}
                className="rounded-[22.5px] border border-zinc-200/90 dark:border-zinc-800/90 bg-card dark:bg-zinc-950 p-5 sm:p-8 lg:p-6 shadow-sm"
              >
                <div className="flex items-start mb-3 sm:mb-6 lg:mb-3">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-destructive sm:mb-1">
                    {phase.title}
                  </h3>
                </div>

                <p className="text-body-text sm:text-base leading-relaxed text-muted-foreground font-medium w-full">
                  {phase.description}
                </p>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </div>
    </section>
  )
}

const Work = () => {
  return (
    <div className="container min-h-svh place-content-center bg-slate-900 p-12 text-stone-50">
      <div className="text-center">
        <h5 className=" text-xs uppercase tracking-wide">latest projects</h5>
        <h2 className="mb-4 mt-1 text-4xl font-bold tracking-tight">
          Get a glimpse of <span className="text-indigo-500">our work</span>
        </h2>
        <p className="mx-auto max-w-prose text-sm text-muted/80">
          From ecommerce to startup landing pages and singl/multi page websites,
          building fully responsive and functional website that showcase your
          product and your unique identity.
        </p>
      </div>
      <ContainerScroll className="min-h-[500vh] py-12">
        {WORK_PROJECTS.map((project, index) => (
          <CardSticky
            key={project.id}
            index={index}
            className="w-full overflow-hidden rounded-sm border border-x-indigo-900 border-y-indigo-500 bg-indigo-950"
            incrementY={60}
            incrementZ={5}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
              <h2 className="text-2xl font-bold tracking-tighter">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-1">
                {project.services.map((service) => (
                  <div
                    key={service}
                    className="flex rounded-xl bg-indigo-900 px-2 py-1"
                  >
                    <span className="text-xs tracking-tighter text-muted">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <img
              className="size-full object-cover"
              width="100%"
              height="100%"
              src={project.imageUrl}
            />
          </CardSticky>
        ))}
      </ContainerScroll>
    </div>
  )
}

const Achievements = () => {
  return (

    <ContainerScroll className="min-h-[400vh] place-items-center space-y-8 p-12 text-center text-zinc-50">
      {ACHIEVEMENTS.map((achievement, index) => (
        <CardSticky
          key={achievement.id}
          incrementY={20}
          index={index + 2}
          className="flex h-72 w-[420px] flex-col place-content-center justify-evenly rounded-2xl  border border-current p-8 shadow-md"
          style={{ rotate: index + 2, background: achievement.bg }}
        >
          <h1 className="text-left text-6xl font-semibold opacity-80">
            {achievement.title}
          </h1>
          <div className="place-items-end text-right">
            <h3 className="max-w-[10ch] text-wrap  text-4xl font-semibold capitalize tracking-tight">
              {achievement.description}
            </h3>
          </div>
        </CardSticky>
      ))}
    </ContainerScroll>

  )
}
export { Process, Work, Achievements }
