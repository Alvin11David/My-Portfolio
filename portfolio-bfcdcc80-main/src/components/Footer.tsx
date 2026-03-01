import { useRef } from "react";
import { ArrowUp, Heart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollToPlugin);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 2,
      ease: "power4.inOut",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-border bg-card"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

      <div className="container relative z-10 mx-auto px-6 py-20">
        {/* Main footer content */}
        <div className="mb-16 flex flex-col items-center justify-between gap-10 lg:flex-row">
          {/* Logo and tagline */}
          <div className="text-center lg:text-left">
            <a
              href="#"
              className="mb-4 inline-block font-serif text-4xl font-bold text-foreground transition-colors hover:text-primary"
            >
              Portfolio<span className="text-primary">.</span>
            </a>
            <p className="max-w-sm text-muted-foreground">
              Crafting digital experiences that inspire and deliver results.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-8">
            {["About", "Work", "Skills", "Contact"].map((link) => (
              <MagneticButton
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link}
              </MagneticButton>
            ))}
          </nav>

          {/* Back to top */}
          <MagneticButton
            onClick={scrollToTop}
            className="group flex items-center gap-3 rounded-full border border-border bg-secondary/50 px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
          >
            Back to top
          </MagneticButton>
        </div>

        {/* Large decorative text */}
        <div className="mb-16 overflow-hidden">
          <div className="animate-marquee flex whitespace-nowrap font-serif text-[10vw] font-bold text-foreground/[0.03]">
            <span className="mr-8">LET'S CREATE SOMETHING AMAZING TOGETHER •</span>
            <span className="mr-8">LET'S CREATE SOMETHING AMAZING TOGETHER •</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} All rights reserved.
          </p>
          
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            Designed & built by
            <Heart className="h-4 w-4 fill-primary text-primary" />
            Waluube Alvin David
          </p>

          <div className="flex gap-6">
            {["Privacy", "Terms"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Grain overlay */}
      <div className="noise-overlay absolute inset-0" />
    </footer>
  );
};

export default Footer;