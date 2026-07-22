import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";
import CloudWave from "./CloudWave";
import braBackgroundStripes from "@/assets/images/bra-background-stripes.svg";
import greFireStripes from "@/assets/images/gre-fire-stripes.svg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Parallax scroll effect
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          yPercent: 80,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.3,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  const splitWord = (word: string, isGradient: boolean) => {
    return word.split("").map((char, i) => (
      <span
        key={i}
        className={`char inline-block will-change-transform ${isGradient ? "gradient-text text-glow" : ""}`}
        style={{ perspective: "1000px" }}
      >
        {char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="section-shell relative h-screen w-full overflow-hidden bg-background"
    >
      <div
        ref={videoRef}
        className="absolute inset-0 z-[1]"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <img src={braBackgroundStripes} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" aria-hidden="true" />
        <img src={greFireStripes} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" aria-hidden="true" />
        <div
          className="absolute -left-20 -top-20 h-[600px] w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(174 100% 48% / 0.15) 0%, transparent 70%)",
            animation: "morph 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -right-32 top-1/3 h-[800px] w-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(280 100% 60% / 0.12) 0%, transparent 70%)",
            animation: "morph 20s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute -bottom-32 left-1/3 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(174 100% 48% / 0.1) 0%, transparent 70%)",
            animation: "morph 18s ease-in-out infinite",
            animationDelay: "-5s",
          }}
        />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 z-[2]">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-px origin-top"
            style={{
              left: `${(i + 1) * 14.28}%`,
              background:
                "linear-gradient(to bottom, transparent, hsl(174 100% 48% / 0.08) 30%, hsl(174 100% 48% / 0.08) 70%, transparent)",
            }}
          />
        ))}
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 z-[5]" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[6] bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 z-[6] bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[3]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 pt-20">
        {/* Subtitle */}
        <p
          className="hero-badge mb-8 flex items-center gap-4 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary sm:text-sm"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
          <span className="relative">
            Designer & Developer
            <span className="absolute -inset-2 animate-pulse rounded-full bg-primary/10 blur-xl" />
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
        </p>

        {/* 3D Headline */}
        <div
          ref={headlineRef}
          className="mb-10 overflow-visible text-center"
          style={{ perspective: "1000px" }}
        >
          <h1 className="mx-auto max-w-6xl font-serif font-bold leading-[0.88] tracking-tight">
            <span
              className="headline-line block"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                {splitWord("Crafting", false)}
              </span>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                {splitWord(" ", false)}
              </span>
              <span className="text-5xl italic sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                {splitWord("Digital", true)}
              </span>
            </span>
            <span
              className="headline-line mt-2 block"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                {splitWord("Experiences", false)}
              </span>
            </span>
            <span
              className="headline-line mt-2 block"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                {splitWord("That", false)}
              </span>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                {splitWord(" ", false)}
              </span>
              <span className="text-5xl italic sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                {splitWord("Inspire", true)}
              </span>
            </span>
          </h1>
        </div>

        {/* Description with blur reveal */}
        <p
          className="mb-14 max-w-2xl text-center text-lg text-muted-foreground sm:text-xl"
        >
          I transform ideas into immersive digital experiences through elegant
          code and thoughtful design. Let's build something extraordinary
          together.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row mb-20">
          <MagneticButton
            href="#projects"
            className="cta-btn group relative overflow-hidden rounded-full bg-primary px-10 py-5 font-semibold text-primary-foreground transition-all duration-500 hover:shadow-2xl hover:shadow-primary/35"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore My Work
              <svg
                className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-45"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-glow-primary to-primary bg-[length:200%_100%] transition-all duration-700 group-hover:animate-gradient-shift" />
          </MagneticButton>

          <MagneticButton
            href="#contact"
            className="cta-btn group relative overflow-hidden rounded-full border border-border bg-background/40 px-10 py-5 font-semibold text-foreground backdrop-blur-md transition-all duration-500 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
          >
            <span className="flex items-center gap-3">
              Let's Talk
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
              </span>
            </span>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
      >
        <a
          href="#about"
          className="group flex flex-col items-center gap-4 text-muted-foreground transition-colors duration-500 hover:text-primary"
        >
          <div className="relative h-16 w-[1px] overflow-hidden rounded-full bg-border">
            <div className="absolute inset-x-0 top-0 h-8 animate-bounce-subtle bg-gradient-to-b from-primary to-transparent" />
          </div>
        </a>
      </div>

      {/* Corner decorations */}
      <div className="absolute left-8 top-8 z-20 hidden h-24 w-24 border-l-2 border-t-2 border-primary/20 md:block" />
      <div className="absolute bottom-8 right-8 z-20 hidden h-24 w-24 border-b-2 border-r-2 border-primary/20 md:block" />

      {/* Large background text */}
      <div className="absolute bottom-0 left-0 z-[1] select-none overflow-hidden whitespace-nowrap font-serif text-[20vw] font-bold leading-none text-foreground/[0.02]">
        PORTFOLIO
      </div>
      <CloudWave className="absolute left-0 bottom-0 w-full -z-10" />
    </section>
  );
};

export default HeroSection;
