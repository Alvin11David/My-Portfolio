import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Code2,
  Palette,
  Server,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Database,
  Globe,
  Cloud,
  GitBranch,
  Zap,
  PenTool,
  CreditCard,
  Send,
  Box,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
  color: string;
  shadowColor: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Code2 className="h-8 w-8 text-cyan-400" />,
    skills: [
      { name: "React.js / Next.js", level: 96 },
      { name: "TypeScript", level: 94 },
      { name: "JavaScript", level: 94 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Three.js / GSAP", level: 85 },
      { name: "Framer Motion", level: 88 },
    ],
    color: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
    shadowColor: "shadow-cyan-500/20",
  },
  {
    title: "Backend",
    icon: <Server className="h-8 w-8 text-emerald-400" />,
    skills: [
      { name: "Node.js", level: 72 },
      { name: "Python", level: 60 },
      { name: "MySQL", level: 60 },
    ],
    color: "from-emerald-500/20 via-teal-500/20 to-green-500/20",
    shadowColor: "shadow-emerald-500/20",
  },
  {
    title: "Infrastructure",
    icon: <Cloud className="h-8 w-8 text-purple-400" />,
    skills: [
      { name: "Docker", level: 42 },
      { name: "Vercel", level: 88 },
      { name: "Firebase / Supabase", level: 87 },
    ],
    color: "from-purple-500/20 via-fuchsia-500/20 to-pink-500/20",
    shadowColor: "shadow-purple-500/20",
  },
];

const tools = [
  { name: "Git", icon: <GitBranch className="h-4 w-4" /> },
  { name: "Blender", icon: <Zap className="h-4 w-4" /> },
  { name: "Affinity", icon: <Palette className="h-4 w-4" /> },
  { name: "Vercel", icon: <Globe className="h-4 w-4" /> },
  { name: "Three.js", icon: <Box className="h-4 w-4" /> },
  { name: "GSAP", icon: <Sparkles className="h-4 w-4" /> },
  { name: "Redis", icon: <Database className="h-4 w-4" /> },
  { name: "Prisma", icon: <Database className="h-4 w-4" /> },
  { name: "Supabase", icon: <Database className="h-4 w-4" /> },
  { name: "Stripe", icon: <CreditCard className="h-4 w-4" /> },
  { name: "Figma", icon: <PenTool className="h-4 w-4" /> },
  { name: "Postman", icon: <Send className="h-4 w-4" /> },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Header entrance
      gsap.from(".animate-header", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });

      // Card entrance
      const cards = gsap.utils.toArray(".skill-card");
      cards.forEach((card: any, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 100,
          scale: 0.9,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });

        // Skill bar fill
        const bars = card.querySelectorAll(".skill-bar-fill");
        bars.forEach((bar: any) => {
          const level = bar.getAttribute("data-level");
          gsap.to(bar, {
            width: `${level}%`,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          });
        });
      });

      // Floating blobs
      gsap.to(".bg-blob", {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 2,
          from: "random",
        },
      });

      // Marquee
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 40,
          ease: "none",
          repeat: -1,
        });
      }
    },
    { scope: sectionRef },
  );

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    card: HTMLDivElement,
  ) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out",
    });

    const glow = card.querySelector(".card-glow") as HTMLElement;
    if (glow) {
      gsap.to(glow, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        opacity: 0.6,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    const glow = card.querySelector(".card-glow") as HTMLElement;
    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen overflow-hidden bg-background py-24 lg:py-32"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-blob absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="bg-blob absolute bottom-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="bg-blob absolute top-[40%] left-[20%] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Marquee Text */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 overflow-hidden opacity-[0.05] select-none pointer-events-none">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap font-serif text-[15vw] font-black uppercase tracking-tighter text-foreground"
        >
          <span className="mr-20">
            Mastery & Strategy • Mastery & Strategy •
          </span>
          <span className="mr-20">
            Mastery & Strategy • Mastery & Strategy •
          </span>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="mb-24 text-center">
          <div className="animate-header inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3 w-3" />
            Skillset
          </div>
          <h2 className="animate-header font-serif text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
            Technical <span className="gradient-text">Proficiency</span>
          </h2>
          <p className="animate-header mx-auto max-w-2xl text-lg text-foreground font-light leading-relaxed">
            Architecting digital excellence through a sophisticated stack of
            modern technologies and refined design principles.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          ref={cardsRef}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24"
        >
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              onMouseMove={(e) =>
                handleMouseMove(e, e.currentTarget as HTMLDivElement)
              }
              onMouseLeave={(e) =>
                handleMouseLeave(e.currentTarget as HTMLDivElement)
              }
              className={`skill-card relative group rounded-[2rem] border border-border bg-card/50 p-8 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-card ${category.shadowColor} hover:shadow-2xl`}
              style={{ perspective: "1000px" }}
            >
              <div className="card-glow absolute inset-0 -z-10 bg-gradient-to-br from-primary/30 to-transparent blur-3xl opacity-0 transition-opacity duration-300" />

              {/* Category Header */}
              <div className="mb-10 flex items-center justify-between">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} border border-border`}
                >
                  {category.icon}
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-black text-foreground/10">
                    0{idx + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground tracking-tight">
                    {category.title}
                  </h3>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-8">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group/skill">
                    <div className="mb-3 flex items-end justify-between">
                      <span className="text-sm font-medium text-foreground group-hover/skill:text-primary transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest text-primary/60 uppercase">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative h-[6px] w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="skill-bar-fill absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"
                        style={{ width: "0%" }}
                        data-level={skill.level}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 bg-white/30 rounded-full blur-md animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools Section */}
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/80 mb-8">
            Extended Ecosystem
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {tools.map((tool) => (
              <Badge
                key={tool.name}
                variant="outline"
                className="px-6 py-2 rounded-full border-border bg-card/50 text-foreground hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all duration-300 cursor-default flex items-center gap-2"
              >
                {tool.icon}
                {tool.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
