import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import MagneticButton from "./MagneticButton";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update progress bar
      if (progressRef.current) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / scrollHeight) * 100;
        progressRef.current.style.width = `${progress}%`;
      }

      // Active section
      const sections = ["about", "projects", "skills", "support", "contact"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 300) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 2, ease: "power3.out" }
    );
  }, []);

  const navLinks = [
    { href: "#about", label: "About", number: "01" },
    { href: "#projects", label: "Work", number: "02" },
    { href: "#skills", label: "Skills", number: "03" },
    { href: "#support", label: "Support", number: "04" },
    { href: "#contact", label: "Contact", number: "05" },
  ];

  return (
    <>
      {/* Progress bar */}
      <div className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-border">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-primary via-glow-secondary to-primary"
          style={{ width: "0%" }}
        />
      </div>

      <header
        ref={navRef}
        className={`fixed left-0 right-0 top-[2px] z-50 transition-all duration-700 ${isScrolled ? "glass py-4" : "bg-transparent py-6"
          }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <MagneticButton href="#" strength={0.3}>
            <span className="group font-serif text-2xl font-bold text-foreground transition-colors hover:text-primary">
              <span className="relative inline-block overflow-hidden">
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                  P
                </span>
                <span className="absolute left-0 top-0 inline-block translate-y-full text-primary transition-transform duration-500 group-hover:translate-y-0">
                  P
                </span>
              </span>
              ortfolio
              <span className="text-primary">.</span>
            </span>
          </MagneticButton>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <MagneticButton
                key={link.href}
                href={link.href}
                strength={0.2}
                className={`group relative px-5 py-3 text-sm font-medium transition-colors ${activeSection === link.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <span className="relative flex items-center gap-2">
                  <span className="text-[10px] font-bold opacity-40 transition-opacity group-hover:opacity-100">
                    {link.number}
                  </span>
                  <span className="relative">
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-primary to-glow-secondary transition-transform duration-500 ${activeSection === link.href.slice(1)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    />
                  </span>
                </span>
              </MagneticButton>
            ))}

            <MagneticButton
              href="#contact"
              className="ml-6 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all duration-500 hover:shadow-xl hover:shadow-primary/30"
            >
              <span className="relative z-10">Let's Talk</span>
            </MagneticButton>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/50 text-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary md:hidden"
          >
            <div className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-current transition-all duration-300 ${isMobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                  }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-current transition-all duration-300 ${isMobileMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : ""
                  }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-background"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center gap-4 font-serif text-5xl font-bold text-foreground transition-colors hover:text-primary"
                >
                  <span className="text-lg font-medium text-primary opacity-50">
                    {link.number}
                  </span>
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-2 left-0 h-[3px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-20 flex gap-8"
            >
              {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {social}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;