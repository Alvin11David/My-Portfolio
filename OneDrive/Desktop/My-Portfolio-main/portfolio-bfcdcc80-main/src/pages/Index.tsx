import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import FloatingLanguages from "@/components/FloatingLanguages";
import SkillsSection from "@/components/SkillsSection";
import CoffeeSection from "@/components/CoffeeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 0.8, // Reduced for better performance
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            lenis.scrollTo(element as HTMLElement, { offset: 0 });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Waluube | Alvin | David</title>
        <meta
          name="description"
          content="Award-winning designer and developer specializing in creating immersive digital experiences. View my portfolio of innovative projects and get in touch."
        />
        <meta property="og:title" content="Portfolio | Designer & Developer" />
        <meta
          property="og:description"
          content="Crafting digital experiences that inspire. Explore my work and let's build something extraordinary together."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://portfolio.com" />
      </Helmet>

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      <main className="relative overflow-x-hidden">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        {/* <FloatingLanguages /> */}{" "}
        {/* Temporarily disabled for performance testing */}
        <CoffeeSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
