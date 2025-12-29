import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

// Lazy load the 3D scene for better performance
const Scene3D = lazy(() => import("./Scene3D"));

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    // Delay loading of 3D scene for smoother initial experience
    const timer = setTimeout(() => setShowScene(true), 1000);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Cinematic overlay reveal
    if (overlayRef.current) {
      tl.set(overlayRef.current, { scaleY: 1 });
      tl.to(overlayRef.current, {
        scaleY: 0,
        duration: 1.8,
        ease: "power4.inOut",
      }, 0);
    }

    // Blob animations
    blobRefs.current.forEach((blob, i) => {
      if (blob) {
        gsap.set(blob, { scale: 0, opacity: 0 });
        tl.to(blob, {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
        }, 0.5 + i * 0.2);
      }
    });

    // Line decorations
    lineRefs.current.forEach((line, i) => {
      if (line) {
        gsap.set(line, { scaleY: 0 });
        tl.to(line, {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.inOut",
        }, 0.4 + i * 0.1);
      }
    });

    // Subtitle clip reveal
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
      tl.to(subtitleRef.current, {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        duration: 1.2,
        ease: "power3.inOut",
      }, 0.8);
    }

    // 3D headline animation
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll('.headline-line');
      lines.forEach((line, lineIndex) => {
        const chars = line.querySelectorAll('.char');
        gsap.set(chars, {
          opacity: 0,
          y: 150,
          rotateX: -90,
          transformOrigin: "center bottom",
        });
        tl.to(chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.4,
          stagger: 0.025,
          ease: "power4.out",
        }, 0.9 + lineIndex * 0.15);
      });
    }

    // Description fade
    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { opacity: 0, y: 50, filter: "blur(10px)" });
      tl.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
      }, 1.6);
    }

    // CTA with scale bounce
    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll('.cta-btn');
      gsap.set(buttons, { opacity: 0, y: 60, scale: 0.8 });
      tl.to(buttons, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
      }, 1.8);
    }

    // Scroll indicator
    if (scrollIndicatorRef.current) {
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: -30 });
      tl.to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, 2.3);
    }

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
          scrub: 1.5,
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
          scrub: 1,
        },
      });
    }

  }, { scope: sectionRef });

  const headlineWords = [
    { text: "Crafting", gradient: false },
    { text: "Digital", gradient: true },
    { text: "Experiences", gradient: false },
    { text: "That", gradient: false },
    { text: "Inspire", gradient: true },
  ];

  const splitWord = (word: string, isGradient: boolean) => {
    return word.split('').map((char, i) => (
      <span
        key={i}
        className={`char inline-block will-change-transform ${isGradient ? 'gradient-text text-glow' : ''}`}
        style={{ perspective: '1000px' }}
      >
        {char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Cinematic overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[100] origin-top bg-primary"
      />

      {/* 3D Background Scene */}
      <Suspense fallback={null}>
        {showScene && (
          <div className="absolute inset-0 z-[1] opacity-50">
            <Scene3D variant="hero" />
          </div>
        )}
      </Suspense>
      <div
        ref={videoRef}
        className="absolute inset-0 z-[1]"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div
          ref={el => blobRefs.current[0] = el}
          className="absolute -left-20 -top-20 h-[600px] w-[600px] rounded-full opacity-0"
          style={{
            background: 'radial-gradient(circle, hsl(174 100% 48% / 0.15) 0%, transparent 70%)',
            animation: 'morph 15s ease-in-out infinite',
          }}
        />
        <div
          ref={el => blobRefs.current[1] = el}
          className="absolute -right-32 top-1/3 h-[800px] w-[800px] rounded-full opacity-0"
          style={{
            background: 'radial-gradient(circle, hsl(280 100% 60% / 0.12) 0%, transparent 70%)',
            animation: 'morph 20s ease-in-out infinite reverse',
          }}
        />
        <div
          ref={el => blobRefs.current[2] = el}
          className="absolute -bottom-32 left-1/3 h-[500px] w-[500px] rounded-full opacity-0"
          style={{
            background: 'radial-gradient(circle, hsl(174 100% 48% / 0.1) 0%, transparent 70%)',
            animation: 'morph 18s ease-in-out infinite',
            animationDelay: '-5s',
          }}
        />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 z-[2]">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={el => lineRefs.current[i] = el}
            className="absolute top-0 h-full w-px origin-top"
            style={{
              left: `${(i + 1) * 14.28}%`,
              background: 'linear-gradient(to bottom, transparent, hsl(174 100% 48% / 0.08) 30%, hsl(174 100% 48% / 0.08) 70%, transparent)',
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
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6">
        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mb-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.4em] text-primary sm:text-sm"
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
          style={{ perspective: '1000px' }}
        >
          <h1 className="font-serif font-bold leading-[0.9] tracking-tight">
            <span className="headline-line block" style={{ transformStyle: 'preserve-3d' }}>
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
            <span className="headline-line mt-2 block" style={{ transformStyle: 'preserve-3d' }}>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                {splitWord("Experiences", false)}
              </span>
            </span>
            <span className="headline-line mt-2 block" style={{ transformStyle: 'preserve-3d' }}>
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
          ref={descriptionRef}
          className="mb-14 max-w-2xl text-center text-lg text-muted-foreground sm:text-xl"
        >
          I transform ideas into immersive digital experiences through elegant code
          and thoughtful design. Let's build something extraordinary together.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col gap-5 sm:flex-row">
          <MagneticButton
            href="#projects"
            className="cta-btn group relative overflow-hidden rounded-full bg-primary px-10 py-5 font-semibold text-primary-foreground transition-all duration-500 hover:shadow-2xl hover:shadow-primary/40"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore My Work
              <svg
                className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-45"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-glow-secondary to-primary bg-[length:200%_100%] transition-all duration-700 group-hover:animate-gradient-shift" />
          </MagneticButton>

          <MagneticButton
            href="#contact"
            className="cta-btn group relative overflow-hidden rounded-full border-2 border-primary/50 bg-transparent px-10 py-5 font-semibold text-foreground backdrop-blur-sm transition-all duration-500 hover:border-primary hover:bg-primary/10 hover:text-primary"
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
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
      >
        <a
          href="#about"
          className="group flex flex-col items-center gap-4 text-muted-foreground transition-colors duration-500 hover:text-primary"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
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
    </section>
  );
};

export default HeroSection;