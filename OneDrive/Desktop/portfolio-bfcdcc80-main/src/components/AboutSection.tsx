import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const stats = [
    { number: 8, suffix: "+", label: "Years Experience" },
    { number: 50, suffix: "+", label: "Projects Delivered" },
    { number: 30, suffix: "+", label: "Happy Clients" },
    { number: 15, suffix: "M", label: "Users Reached" },
  ];

  const bioText =
    "I’m a passionate designer and developer with over 2 years of experience creating impactful digital products. I believe in the power of thoughtful design combined with clean, efficient code. I’m currently pursuing a degree in Computer Science at Makerere University.";

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Header animation
      if (headerRef.current) {
        const subtitle = headerRef.current.querySelector(".subtitle");
        const title = headerRef.current.querySelector("h2");

        gsap.from(subtitle, {
          opacity: 0,
          x: -50,
          duration: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        if (title) {
          gsap.from(title, {
            opacity: 0,
            y: 100,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }

      // Image reveal
      if (imageRef.current) {
        const wrapper = imageRef.current.querySelector(".image-wrapper");
        const overlay = imageRef.current.querySelector(".image-overlay");

        gsap.from(wrapper, {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(overlay, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Bio text word-by-word
      if (textRef.current) {
        const words = textRef.current.querySelectorAll(".word");
        gsap.from(words, {
          opacity: 0.15,
          duration: 0.8,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            end: "top 35%",
            scrub: 1,
          },
        });
      }

      // Number counters
      numberRefs.current.forEach((numRef, index) => {
        if (numRef) {
          const finalNumber = stats[index].number;
          gsap.fromTo(
            { val: 0 },
            { val: 0 },
            {
              val: finalNumber,
              duration: 2.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
              onUpdate: function () {
                if (numRef) {
                  numRef.textContent = Math.floor(
                    this.targets()[0].val
                  ).toString();
                }
              },
            }
          );
        }
      });

      // Stats cards stagger
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll(".stat-card");
        gsap.from(cards, {
          opacity: 0,
          y: 60,
          scale: 0.9,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Skills stagger
      if (skillsRef.current) {
        const badges = skillsRef.current.querySelectorAll(".skill-badge");
        gsap.from(badges, {
          opacity: 0,
          scale: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-background py-32 lg:py-40"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-glow-secondary/5 blur-[150px]" />
      </div>

      {/* Large background text */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 -rotate-90 select-none font-serif text-[15vw] font-bold leading-none text-foreground/[0.02]">
        ABOUT
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-24">
          <span className="subtitle mb-6 inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.4em] text-primary">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            About Me
          </span>
          <h2 className="font-serif text-5xl font-bold leading-[0.9] md:text-6xl lg:text-8xl">
            The Story
            <br />
            <span className="gradient-text">Behind the Work</span>
          </h2>
        </div>

        <div className="grid gap-20 lg:grid-cols-2 lg:gap-32">
          {/* Image column */}
          <div ref={imageRef} className="relative">
            <div
              className="image-wrapper relative aspect-[3/4] overflow-hidden rounded-3xl"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <img
                src="/Alvin.jpeg" // put the file in /public or use an import
                alt="Portrait"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Animated gradient background */}
              <div className="image-overlay absolute inset-0 scale-125">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(174 100% 48% / 0.3) 0%, hsl(280 100% 60% / 0.3) 50%, hsl(174 100% 48% / 0.2) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, hsl(174 100% 48% / 0.4) 0%, transparent 60%)",
                    animation: "morph 10s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute h-px w-full bg-foreground/30"
                    style={{ top: `${(i + 1) * 12.5}%` }}
                  />
                ))}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute h-full w-px bg-foreground/30"
                    style={{ left: `${(i + 1) * 16.66}%` }}
                  />
                ))}
              </div>

              {/* Decorative text */}
              <div className="absolute bottom-8 left-8 text-6xl font-bold text-foreground/10 md:text-8xl">
                2026
              </div>
            </div>

            {/* Decorative borders */}
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border-2 border-primary/20" />
            <div className="absolute -bottom-8 -right-8 h-full w-full rounded-3xl border border-primary/10" />
          </div>

          {/* Content column */}
          <div className="flex flex-col justify-center">
            {/* Bio text */}
            <div ref={textRef} className="mb-16">
              <p className="text-2xl leading-relaxed md:text-3xl lg:text-4xl">
                {bioText.split(" ").map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.3em]">
                    {word}
                  </span>
                ))}
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="mb-12 grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="stat-card group rounded-2xl border border-border bg-card/50 p-6 transition-all duration-500 hover:border-primary/50 hover:bg-card"
                >
                  <div className="flex items-baseline gap-1">
                    <span
                      ref={(el) => (numberRefs.current[index] = el)}
                      className="font-serif text-4xl font-bold gradient-text md:text-5xl"
                    >
                      0
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {stat.suffix}
                    </span>
                  </div>
                  <span className="mt-2 block text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div ref={skillsRef}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
  
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "TypeScript",
                  "Node.js",
                  "Figma",
                  "UI/UX Design",
                  "Motion Design",
                  "Three.js",
                  "GSAP",
                  "Next.js",
                  "Tailwind",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="skill-badge rounded-full border border-border bg-secondary/30 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
