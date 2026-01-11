import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MUBSLocatorImage from "@/assets/images/MUBSLocator.jpg";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  accentColor: string;
  technologies: string[];
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "MUBS Locator",
    category: "Fintech",
    description:
      "Find buildings quickly using Google Maps, submit feedback to improve campus facilities, and manage your profile effortlessly.",
    challenge:
      "Students, Parents and visitors get problems when they try to navigate Makerere University.",
    solution:
      "Created a minimalist interface with gesture-based navigation and AI-powered insights.",
    results: [
      "40% increase in daily active users",
      "65% reduction in support tickets",
      "4.9★ App Store rating",
    ],
    image: MUBSLocatorImage,
    accentColor: "emerald",
    technologies: [
      "Flutter Frame work",
      "JavaScript",
      "Firebase",
      "React Native",
    ],
    year: "2024",
  },
  {
    id: 2,
    title: "Nexus Platform",
    category: "SaaS",
    description:
      "An enterprise collaboration platform that brings teams together through seamless communication.",
    challenge: "Remote teams struggled with fragmented tools.",
    solution:
      "Built an all-in-one platform with real-time collaboration and video conferencing.",
    results: [
      "200K+ monthly active users",
      "50% faster project completion",
      "Series B funded",
    ],
    image: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
    accentColor: "violet",
    technologies: ["Next.js", "GraphQL", "WebRTC", "AWS"],
    year: "2024",
  },
  {
    id: 3,
    title: "Pulse Health",
    category: "Healthcare",
    description:
      "A comprehensive health tracking ecosystem that empowers users to take control of their wellness.",
    challenge: "Health data was scattered across multiple apps.",
    solution:
      "Unified all health metrics in one beautiful dashboard with personalized recommendations.",
    results: ["1M+ downloads", "85% user retention", "Featured by Apple"],
    image: "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)",
    accentColor: "rose",
    technologies: ["Swift", "HealthKit", "Firebase", "TensorFlow"],
    year: "2023",
  },
  {
    id: 4,
    title: "Lumina Commerce",
    category: "E-commerce",
    description:
      "A next-generation shopping experience that blends physical and digital retail seamlessly.",
    challenge:
      "Online shopping lacked the tactile experience of in-store browsing.",
    solution:
      "Implemented AR try-on features and personalized AI recommendations.",
    results: [
      "35% higher conversion rate",
      "60% fewer returns",
      "Best E-commerce UX Award",
    ],
    image: "linear-gradient(135deg, #f59e0b 0%, #eab308 100%)",
    accentColor: "amber",
    technologies: ["React", "Three.js", "ARKit", "Shopify"],
    year: "2023",
  },
  {
    id: 5,
    title: "Echo Social",
    category: "Social Media",
    description:
      "A privacy-first social platform that puts meaningful connections over vanity metrics.",
    challenge: "Users were tired of algorithmic feeds and privacy concerns.",
    solution:
      "Built a chronological, ad-free experience with end-to-end encryption.",
    results: [
      "500K signups in first month",
      "92% privacy satisfaction",
      "Featured in Wired",
    ],
    image: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
    accentColor: "blue",
    technologies: ["Flutter", "Rust", "WebSocket", "E2E Encryption"],
    year: "2023",
  },
];

const getBackground = (image: string) =>
  image.startsWith("linear-gradient")
    ? image 
    : `url(${image}) center / cover no-repeat`;

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !horizontalRef.current ||
        !containerRef.current
      )
        return;

      // Header animation
      if (headerRef.current) {
        const elements = headerRef.current.querySelectorAll(".animate-header");
        gsap.from(elements, {
          opacity: 0,
          y: 100,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Horizontal scroll
      const container = containerRef.current;
      const horizontal = horizontalRef.current;
      const cards = horizontal.querySelectorAll(".project-card");

      const totalWidth = horizontal.scrollWidth - container.offsetWidth;

      const scrollTween = gsap.to(horizontal, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const newIndex = Math.floor(self.progress * projects.length);
            setActiveIndex(Math.min(newIndex, projects.length - 1));
          },
        },
      });

      // Card animations
      cards.forEach((card, i) => {
        const inner = card.querySelector(".card-content");
        const image = card.querySelector(".card-image");

        gsap.from(card, {
          opacity: 0,
          scale: 0.8,
          rotateY: -15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="projects" className="relative bg-background">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-[800px] w-[800px] rounded-full bg-primary/5 blur-[200px]" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-glow-secondary/5 blur-[150px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pb-20 pt-32 lg:px-12">
        <div ref={headerRef} className="mx-auto max-w-7xl">
          <span className="animate-header mb-6 inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.4em] text-primary">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            Selected Work
          </span>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="animate-header font-serif text-5xl font-bold leading-[0.9] md:text-6xl lg:text-8xl">
              Projects That
              <br />
              <span className="gradient-text">Define Excellence</span>
            </h2>
            <p className="animate-header max-w-md text-lg text-muted-foreground lg:text-right">
              Each project represents a unique challenge solved through creative
              thinking and technical expertise.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div ref={containerRef} className="relative h-screen">
        <div
          ref={horizontalRef}
          className="absolute left-0 top-0 flex h-full items-center gap-8 px-6 lg:gap-12 lg:px-12"
          style={{ width: `${projects.length * 85 + 15}vw` }}
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="project-card group relative h-[70vh] w-[80vw] flex-shrink-0 cursor-pointer lg:w-[60vw]"
              style={{ perspective: "1200px" }}
            >
              <div
                className="card-content relative h-full w-full overflow-hidden rounded-3xl border border-border/50 transition-all duration-700 group-hover:border-primary/50"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Background gradient */}
                <div
                  className="card-image absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{ background: getBackground(project.image) }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                      backgroundSize: "60px 60px",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                  {/* Top bar */}
                  <div className="absolute left-8 right-8 top-8 flex items-center justify-between lg:left-12 lg:right-12 lg:top-12">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-8 bg-primary" />
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        {project.category}
                      </span>
                    </div>
                    <span className="rounded-full bg-foreground/10 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>

                  {/* Number */}
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 font-serif text-[20vw] font-bold leading-none text-foreground/5 lg:right-12">
                    0{index + 1}
                  </div>

                  {/* Main content */}
                  <div className="relative z-10">
                    <h3 className="mb-4 font-serif text-4xl font-bold text-foreground transition-colors duration-500 group-hover:text-primary md:text-5xl lg:text-6xl">
                      {project.title}
                    </h3>
                    <p className="mb-8 max-w-xl text-lg text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border bg-background/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm transition-all duration-300 group-hover:border-primary/50 group-hover:text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View button */}
                  <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground lg:h-20 lg:w-20">
                      <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45 lg:h-8 lg:w-8" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* End card */}
          <div className="flex h-[70vh] w-[40vw] flex-shrink-0 items-center justify-center">
            <div className="text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Want to see more?
              </p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 font-serif text-3xl font-bold text-foreground transition-colors hover:text-primary md:text-4xl"
              >
                Let's Talk
                <ArrowRight className="h-8 w-8 transition-transform group-hover:translate-x-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === activeIndex ? "w-12 bg-primary" : "w-4 bg-border"
              }`}
            />
          ))}
        </div>

        {/* Current project indicator */}
        <div className="absolute bottom-12 right-12 z-20 hidden items-center gap-4 lg:flex">
          <span className="font-serif text-4xl font-bold text-primary">
            0{activeIndex + 1}
          </span>
          <span className="text-muted-foreground">/</span>
          <span className="font-serif text-2xl text-muted-foreground">
            0{projects.length}
          </span>
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-background/98 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-6 top-6 z-10 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Header */}
              <div
                className="relative aspect-video"
                style={{ background: getBackground(selectedProject.image) }}
              >
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                      backgroundSize: "80px 80px",
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <div className="mb-3 flex items-center gap-4">
                    <span className="h-px w-10 bg-primary" />
                    <span className="text-sm font-bold uppercase tracking-wider text-primary">
                      {selectedProject.category}
                    </span>
                    <span className="ml-auto rounded-full bg-background/80 px-4 py-2 text-sm text-foreground backdrop-blur-sm">
                      {selectedProject.year}
                    </span>
                  </div>
                  <h3 className="font-serif text-5xl font-bold text-foreground md:text-6xl">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-10">
                <p className="mb-12 text-xl text-muted-foreground">
                  {selectedProject.description}
                </p>

                <div className="mb-12 grid gap-10 md:grid-cols-2">
                  <div>
                    <h4 className="mb-4 font-serif text-xl font-bold text-foreground">
                      The Challenge
                    </h4>
                    <p className="text-muted-foreground">
                      {selectedProject.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-4 font-serif text-xl font-bold text-foreground">
                      The Solution
                    </h4>
                    <p className="text-muted-foreground">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div className="mb-12">
                  <h4 className="mb-6 font-serif text-xl font-bold text-foreground">
                    Key Results
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {selectedProject.results.map((result, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-border bg-secondary/30 p-6 text-center"
                      >
                        <span className="text-lg font-medium text-foreground">
                          {result}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="mb-4 font-serif text-xl font-bold text-foreground">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-primary/50 bg-primary/10 px-5 py-2 text-sm font-medium text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
