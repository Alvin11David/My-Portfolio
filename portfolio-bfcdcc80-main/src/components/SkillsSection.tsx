import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Code2, Palette, Server, Cpu, Layers, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Code2 className="h-6 w-6" />,
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 94 },
      { name: "Framer Motion", level: 88 },
    ],
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Design",
    icon: <Palette className="h-6 w-6" />,
    skills: [
      { name: "Figma", level: 94 },
      { name: "UI/UX Design", level: 90 },
      { name: "Motion Design", level: 85 },
      { name: "Design Systems", level: 88 },
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Backend",
    icon: <Server className="h-6 w-6" />,
    skills: [
      { name: "Node.js", level: 87 },
      { name: "PostgreSQL", level: 82 },
      { name: "GraphQL", level: 85 },
      { name: "REST APIs", level: 90 },
    ],
    color: "from-emerald-500 to-teal-500",
  },
];

const tools = [
  "Git",
  "Docker",
  "AWS",
  "Vercel",
  "Three.js",
  "GSAP",
  "Redis",
  "Prisma",
  "Supabase",
  "Stripe",
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header animation
    if (headerRef.current) {
      const elements = headerRef.current.querySelectorAll('.animate-header');
      gsap.from(elements, {
        opacity: 0,
        y: 80,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Cards animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.skill-card');
      
      cards.forEach((card, index) => {
        const cardEl = card as HTMLElement;
        
        gsap.from(cardEl, {
          opacity: 0,
          y: 100,
          rotateX: -15,
          scale: 0.9,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardEl,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.15,
        });

        // Animate skill bars
        const bars = cardEl.querySelectorAll('.skill-bar-fill');
        bars.forEach((bar, barIndex) => {
          const targetWidth = (bar as HTMLElement).dataset.level + '%';
          gsap.fromTo(
            bar,
            { width: '0%', opacity: 0 },
            {
              width: targetWidth,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardEl,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
              delay: 0.4 + barIndex * 0.1,
            }
          );
        });
      });
    }

    // Tools badges
    if (toolsRef.current) {
      const badges = toolsRef.current.querySelectorAll('.tool-badge');
      gsap.from(badges, {
        opacity: 0,
        scale: 0,
        y: 40,
        stagger: 0.05,
        duration: 0.6,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: toolsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Marquee animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    }

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen overflow-hidden bg-background py-32 lg:py-40"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-glow-secondary/5 blur-[120px]" />
      </div>

      {/* Background marquee */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 overflow-hidden opacity-[0.02]">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap font-serif text-[20vw] font-bold"
        >
          <span className="mr-8">SKILLS & EXPERTISE •</span>
          <span className="mr-8">SKILLS & EXPERTISE •</span>
          <span className="mr-8">SKILLS & EXPERTISE •</span>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-20 text-center">
          <span className="animate-header mb-6 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.4em] text-primary">
            <Sparkles className="h-4 w-4" />
            Expertise
          </span>
          <h2 className="animate-header font-serif text-5xl font-bold md:text-6xl lg:text-7xl">
            Skills & <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="animate-header mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A blend of technical expertise and creative vision, constantly evolving with the latest technologies.
          </p>
        </div>

        {/* Skills cards */}
        <div ref={cardsRef} className="mb-20 grid gap-8 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-card group rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:bg-card"
              style={{ perspective: '1000px' }}
            >
              {/* Header */}
              <div className="mb-8 flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                  {category.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold">{category.title}</h3>
              </div>

              {/* Skills list */}
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm font-bold text-primary">{skill.level}%</span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="skill-bar-fill absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-glow-secondary"
                        data-level={skill.level}
                      />
                      {/* Animated shimmer */}
                      <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-0 transition-opacity group-hover:animate-shimmer group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional tools */}
        <div ref={toolsRef} className="text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-border" />
            <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Also proficient in
            </span>
            <span className="h-px w-12 bg-border" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="tool-badge rounded-full border border-border bg-secondary/30 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/20"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;