import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronDown,
  FolderOpen,
  Globe2,
  LayoutGrid,
  Cpu,
  Smartphone,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MUBSLocatorImage from "@/assets/images/MUBSLocator.jpg";
import MchencuziAuditImage from "@/assets/images/Mchencuzi Audit.png";
import HeplerAppImage from "@/assets/images/Helper Cover.jpg";
import TimeSync from "@/assets/images/Time Sync.png";
import BibleAppImage from "@/assets/images/BibleApp.png";
import VeritasImage from "@/assets/images/Veritas.png";
import EdwinsBakeHouseImage from "@/assets/images/EdwinsBakeHouse.png";
import JamboPOSImage from "@/assets/images/JamboPOS.png";
import StudentUniversityPortal from "@/assets/images/StudentUniversityPortal.png";
import SunbirdGenAIImage from "@/assets/images/Sunbird GenAI App.png";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  group: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  accentColor: string;
  technologies: string[];
  year: string;
  liveUrl?: string;
  webUrl?: string;
  playStoreUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "MUBS Locator",
    category: "Fintech",
    group: "Mobile Apps",
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
    liveUrl: "https://apps.apple.com/ug/app/mubs-locator/id6755059078",
    webUrl: "https://mubs-locator.web.app/",
  },
  {
    id: 2,
    title: "Mchencuzi Audit",
    category: "Audit Software",
    group: "Enterprise Systems",
    description:
      "Mchencuzi Audit Software is a digital audit management system designed to support the planning, execution, documentation, and reporting of audit activities in an efficient and organized manner.",
    challenge:
      "Traditional audit processes were inefficient, prone to errors, and lacked transparency.",
    solution:
      "Developed a comprehensive digital platform with automated workflows, real-time tracking, and advanced reporting features.",
    results: [
      "70% reduction in audit time",
      "95% increase in accuracy",
      "Adopted by 50+ organizations",
    ],
    image: MchencuziAuditImage,
    accentColor: "blue",
    technologies: ["Angular", "Affinity", "Supabase", "Express"],
    year: "2025",
  },
  {
    id: 3,
    title: "C-Helper App",
    category: "Healthcare",
    group: "Mobile Apps",
    description:
      "Find trusted help fast or earn more work—match, chat, and get paid in one place.",
    challenge:
      "Unemployement and underemployment were rising, while people struggled to find reliable help for everyday tasks.",
    solution:
      "Built a mobile app platform that connects people needing help with local helpers, featuring secure payments, real-time chat, and AI-driven matching.",
    results: ["1M+ downloads", "85% user retention", "Featured by Apple"],
    image: HeplerAppImage,
    accentColor: "rose",
    technologies: [
      "Flutter",
      "Firebase",
      "Blender",
      "Affinity",
      "Relworx",
      "Figma",
    ],
    year: "2026",
    liveUrl: "https://apps.apple.com/ug/app/c-helper-app/id6759479834",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.helperapp.mobile&referrer=utm_source%3Dgoogle%26utm_medium%3Dorganic%26utm_term%3Dc-helper&pcampaignid=APPU_1_ehEMatmcCa6ki-gPuca46A4",
    webUrl: "https://c-helper-support.lovable.app/",
  },
  {
    id: 4,
    title: "Time Sync",
    category: "Education",
    group: "Web Apps",
    description:
      "A next-generation education timer that helps students manage their study sessions effectively.",
    challenge:
      "Students often struggle with time management and maintaining focus during study sessions.",
    solution:
      "Developed an intuitive timer with customizable intervals, progress tracking, and focus mode features.",
    results: ["35% higher conversion rate", "60% fewer returns"],
    image: TimeSync,
    accentColor: "amber",
    technologies: ["Angular", "Three.js", "Supabase", "Figma"],
    year: "2026",
    webUrl: "https://timetablesync-d33fc.web.app/",
  },
  {
    id: 5,
    title: "Bible App",
    category: "Spiritual",
    group: "Mobile Apps",
    description:
      "A comprehensive Bible application offering multiple translations, daily devotionals, and offline access for spiritual growth.",
    challenge:
      "Many users lacked easy access to scripture and devotionals, especially offline or in regions with limited connectivity.",
    solution:
      "Developed a user-friendly app with offline Bible versions, daily devotionals, bookmarks, and a powerful search feature.",
    results: [
      "200K+ downloads worldwide",
      "4.8★ average rating",
      "Used in 30+ countries",
    ],
    image: BibleAppImage,
    accentColor: "violet",
    technologies: ["React Native", "Firebase", "TypeScript", "Expo"],
    year: "2023",
    webUrl: "https://church-bible-app.netlify.app/",
  },
  {
    id: 6,
    title: "Veritas Institute",
    category: "Education",
    group: "Web Apps",
    description: "",
    challenge:
      "Education institutions need a clear, trustworthy web presence that makes it easy for visitors to explore offerings quickly.",
    solution:
      "Designed a responsive, content-focused website with clear navigation, strong visual hierarchy, and conversion-ready sections.",
    results: [
      "Faster program discovery",
      "Improved first-visit engagement",
      "Clearer admissions journey",
    ],
    image: VeritasImage,
    accentColor: "teal",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    year: "2026",
    webUrl: "https://institute-demo-site.netlify.app/",
  },
  {
    id: 7,
    title: "Edwin's Bake House",
    category: "Bakery",
    group: "Web Apps",
    description: "",
    challenge:
      "Small food brands need a polished online presence that makes browsing products and placing orders feel simple and inviting.",
    solution:
      "Built a responsive showcase site with clear product presentation, strong branding, and easy access to key business details.",
    results: [
      "Clearer product visibility",
      "Improved online ordering flow",
      "Stronger brand presentation",
    ],
    image: EdwinsBakeHouseImage,
    accentColor: "orange",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    year: "2026",
    webUrl: "https://edwins-bake-house.vercel.app/",
  },
  {
    id: 8,
    title: "JamboPOS",
    category: "Point of Sale",
    group: "Web Apps",
    description:
      "A streamlined point-of-sale prototype built to help businesses manage sales, inventory, and daily operations.",
    challenge:
      "Retail and service businesses need a fast, reliable system that simplifies checkout and keeps operations organized.",
    solution:
      "Created a clean POS experience with structured workflows, intuitive navigation, and clear business-focused presentation.",
    results: [
      "Simplified checkout flow",
      "Better daily sales tracking",
      "Clearer inventory management",
    ],
    image: JamboPOSImage,
    accentColor: "emerald",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    year: "2026",
    webUrl: "https://jambo-pos-system-prototype.netlify.app/",
  },
  {
    id: 9,
    title: "Student University Portal",
    category: "Education",
    group: "Web Apps",
    description:
      "A student portal designed to bring academic information, services, and university updates into one place with a Firebase backend.",
    challenge:
      "Students need a single destination for academic resources, updates, and everyday university workflows.",
    solution:
      "Built a clean portal experience that organizes key student actions and information into one accessible interface.",
    results: [
      "Centralized student access",
      "Simplified information discovery",
      "Clearer university communication",
    ],
    image: StudentUniversityPortal,
    accentColor: "blue",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Firebase"],
    year: "2026",
    webUrl: "https://universityportal2026.web.app/",
  },
  {
    id: 10,
    title: "Sunbird GenAI App",
    category: "AI Platform",
    group: "AI Platforms",
    description:
      "A GenAI app that summarizes text, translates it, and generates audio output from both text and audio input pipelines.",
    challenge:
      "Users needed a single tool to handle text and audio workflows across multiple local languages.",
    solution:
      "Built an AI workflow that supports text summarization, translation, transcription, and audio generation in one interface.",
    results: [
      "Text and audio pipelines",
      "Multi-language support",
      "End-to-end AI workflow",
    ],
    image: SunbirdGenAIImage,
    accentColor: "violet",
    technologies: ["React", "TypeScript", "Firebase", "AI/ML"],
    year: "2026",
    webUrl: "https://internship-assessment-steel.vercel.app/",
  },
];

const getBackgroundImage = (image: string) =>
  image.startsWith("linear-gradient") ? image : `url(${image})`;

const projectGroups = [
  {
    title: "Mobile Apps",
    description:
      "Pocket-first experiences with polished app-store style previews.",
    icon: Smartphone,
  },
  {
    title: "Web Apps",
    description:
      "Modern web experiences, dashboards, and polished business sites.",
    icon: Globe2,
  },
  {
    title: "AI Platforms",
    description:
      "Generative AI tools, assistants, and intelligent workflow platforms.",
    icon: Cpu,
  },
  {
    title: "Enterprise Systems",
    description: "Operational tools and structured systems for real workflows.",
    icon: Building2,
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openGroup, setOpenGroup] = useState<string>("Mobile Apps");

  const groupedProjects = projectGroups.map((group) => ({
    ...group,
    projects: projects.filter((project) => project.group === group.title),
  }));

  useGSAP(
    () => {
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

      const folders = sectionRef.current?.querySelectorAll(".project-folder");
      folders?.forEach((folder) => {
        gsap.from(folder, {
          opacity: 0,
          y: 80,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: folder,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    if (!selectedProject) return;

    const scrollY = window.scrollY || window.pageYOffset;
    const bodyStyle = document.body.style;
    const originalPosition = bodyStyle.position;
    const originalTop = bodyStyle.top;
    const originalWidth = bodyStyle.width;

    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";

    return () => {
      bodyStyle.position = originalPosition || "";
      bodyStyle.top = originalTop || "";
      bodyStyle.width = originalWidth || "";
      window.scrollTo(0, scrollY);
    };
  }, [selectedProject]);

  return (
    <section ref={sectionRef} id="projects" className="relative bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-[800px] w-[800px] rounded-full bg-primary/5 blur-[200px]" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-glow-secondary/5 blur-[150px]" />
      </div>

      <div className="relative z-10 px-6 pb-12 pt-20 lg:px-12">
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

      <div className="relative z-10 px-6 pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-10">
          {groupedProjects.map((group, groupIndex) => {
            const Icon = group.icon;
            const isOpen = openGroup === group.title;
            const previewProjects = group.projects.slice(0, 3);

            return (
              <section
                key={group.title}
                className="project-folder relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.08),transparent_35%),radial-gradient(circle_at_bottom_left,hsl(var(--glow-secondary)/0.08),transparent_30%)]" />

                <button
                  type="button"
                  onClick={() => setOpenGroup(isOpen ? "" : group.title)}
                  className="relative flex w-full flex-col gap-5 p-5 text-left md:p-7"
                >
                  <div className="flex flex-col gap-4 border-b border-border/60 pb-5 md:flex-row md:items-end md:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_30px_hsl(var(--primary)/0.18)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                          <FolderOpen className="h-3.5 w-3.5 text-primary" />
                          Folder {String(groupIndex + 1).padStart(2, "0")}
                        </div>
                        <h3 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                          {group.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                          {group.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm text-muted-foreground">
                      <LayoutGrid className="h-4 w-4 text-primary" />
                      {group.projects.length} items
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {previewProjects.map((project, previewIndex) => (
                      <div
                        key={project.id}
                        className="relative h-16 w-20 overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm"
                        style={{
                          transform: `translateY(${previewIndex * 2}px)`,
                        }}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: getBackgroundImage(project.image),
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                      </div>
                    ))}
                    <span className="ml-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                      {isOpen ? "Tap to collapse" : "Tap to open folder"}
                    </span>
                    <ChevronDown
                      className={`ml-auto h-5 w-5 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 md:px-7 md:pb-7">
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                          {group.projects.map((project) => (
                            <article
                              key={project.id}
                              onClick={() => setSelectedProject(project)}
                              className="project-card group relative cursor-pointer overflow-hidden rounded-[1.75rem] border border-border/60 bg-background/80 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_80px_rgba(0,0,0,0.14)]"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-glow-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                              <div className="relative p-4">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-border/50 bg-secondary/40">
                                  <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                      backgroundImage: getBackgroundImage(
                                        project.image,
                                      ),
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90" />
                                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                                    <div>
                                      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-background/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur-sm">
                                        {project.category}
                                      </div>
                                      <h4 className="max-w-[14rem] font-serif text-2xl font-bold text-foreground drop-shadow-sm">
                                        {project.title}
                                      </h4>
                                    </div>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/75 text-foreground backdrop-blur-sm transition-transform duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
                                      <ArrowUpRight className="h-5 w-5" />
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-4 grid gap-4 sm:grid-cols-[1.25fr_0.75fr]">
                                  <div>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                      {project.description}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                      {project.technologies
                                        .slice(0, 3)
                                        .map((tech) => (
                                          <span
                                            key={tech}
                                            className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                                          >
                                            {tech}
                                          </span>
                                        ))}
                                    </div>
                                  </div>

                                  <div className="rounded-[1.25rem] border border-border/60 bg-secondary/30 p-4">
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                                      File preview
                                    </div>
                                    <div className="mt-3 space-y-2">
                                      <div className="h-2 w-20 rounded-full bg-primary/70" />
                                      <div className="h-2 w-full rounded-full bg-border/80" />
                                      <div className="h-2 w-5/6 rounded-full bg-border/70" />
                                    </div>
                                    <div className="mt-4 text-xs text-muted-foreground">
                                      {project.year} • {project.group}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            );
          })}

          <div className="rounded-[2rem] border border-border/60 bg-card/80 p-8 text-center backdrop-blur-xl md:p-12">
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

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[260] flex items-end justify-center overflow-y-auto bg-background/98 p-2 backdrop-blur-xl sm:items-center sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-5xl max-h-[calc(100vh-1rem)] flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl sm:rounded-3xl sm:max-h-[calc(100vh-2rem)]"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary sm:right-6 sm:top-6 sm:h-14 sm:w-14"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <div
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain sm:max-h-[calc(100vh-2rem)]"
                style={{
                  WebkitOverflowScrolling: "touch",
                  touchAction: "pan-y",
                }}
                onWheelCapture={(e) => e.stopPropagation()}
              >
                <div
                  className="relative aspect-[4/3] sm:aspect-video bg-cover bg-center"
                  style={{
                    backgroundImage: getBackgroundImage(selectedProject.image),
                  }}
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

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-10">
                    <div className="mb-3 flex flex-wrap items-center gap-3 sm:gap-4">
                      <span className="h-px w-8 bg-primary sm:w-10" />
                      <span className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
                        {selectedProject.category}
                      </span>
                      <span className="ml-auto rounded-full bg-background/80 px-3 py-1.5 text-xs text-foreground backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                        {selectedProject.year}
                      </span>
                    </div>
                    <h3 className="max-w-3xl font-serif text-3xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 sm:p-10">
                  <p className="mb-8 text-base text-muted-foreground sm:mb-12 sm:text-xl">
                    {selectedProject.description}
                  </p>

                  {(selectedProject.liveUrl ||
                    selectedProject.webUrl ||
                    selectedProject.playStoreUrl) && (
                    <div className="mb-8 sm:mb-12">
                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        {selectedProject.liveUrl && (
                          <a
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
                          >
                            View on App Store
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}

                        {selectedProject.playStoreUrl && (
                          <a
                            href={selectedProject.playStoreUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
                          >
                            Get on Google Play
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}

                        {selectedProject.webUrl && (
                          <a
                            href={selectedProject.webUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-secondary/30 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-primary hover:text-primary sm:w-auto"
                          >
                            Visit Web App
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mb-8 grid gap-6 md:mb-12 md:grid-cols-2 md:gap-10">
                    <div>
                      <h4 className="mb-3 font-serif text-lg font-bold text-foreground sm:mb-4 sm:text-xl">
                        The Challenge
                      </h4>
                      <p className="text-muted-foreground">
                        {selectedProject.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-3 font-serif text-lg font-bold text-foreground sm:mb-4 sm:text-xl">
                        The Solution
                      </h4>
                      <p className="text-muted-foreground">
                        {selectedProject.solution}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8 sm:mb-12">
                    <h4 className="mb-4 font-serif text-lg font-bold text-foreground sm:mb-6 sm:text-xl">
                      Key Results
                    </h4>
                    <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                      {selectedProject.results.map((result, i) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-border bg-secondary/30 p-4 text-center sm:p-6"
                        >
                          <span className="text-sm font-medium text-foreground sm:text-lg">
                            {result}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 font-serif text-lg font-bold text-foreground sm:mb-4 sm:text-xl">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-xs font-medium text-primary sm:px-5 sm:text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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
