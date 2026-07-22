import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import MagneticButton from "./MagneticButton";
import { ThemeToggle } from "./ThemeToggle";

const sectionColors: Record<string, string> = {
  about: "#00d4aa",
  projects: "#f97316",
  skills: "#a855f7",
  support: "#3b82f6",
  contact: "#06b6d4",
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [buttonColor, setButtonColor] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);
      setIsNavVisible(true);

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        if (window.scrollY > 50) {
          setIsNavVisible(false);
        }
      }, 1400);

      lastScrollYRef.current = currentScrollY;

      // Update progress bar
      if (progressRef.current) {
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / scrollHeight) * 100;
        progressRef.current.style.width = `${progress}%`;
      }

      // Active section
      const sections = ["about", "projects", "skills", "support", "contact"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 300) {
          setActiveSection(section);
          setButtonColor(sectionColors[section] ?? null);
          break;
        }
      }

      if (window.scrollY < 300) {
        setButtonColor(null);
      }
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 2, ease: "power3.out" },
    );
  }, []);

  const navLinks = [
    { href: "#about", label: "About", number: "01" },
    { href: "#projects", label: "Work", number: "02" },
    { href: "#skills", label: "Skills", number: "03" },
    { href: "#support", label: "Support", number: "04" },
    { href: "#contact", label: "Contact", number: "05" },
  ];

  const socialLinks = [
    { label: "GitHub", href: "https://github.com/Alvin11David" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/waluube-alvin-david-75778336b/",
    },
    { label: "Twitter", href: "https://twitter.com/Alvin1_1David" },
  ];

  return (
    <>
      {/* Progress bar */}
      <div className="fixed left-0 right-0 top-0 z-[230] h-[2px] bg-border">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-primary via-glow-secondary to-primary"
          style={{ width: "0%" }}
        />
      </div>

      <header
        ref={navRef}
        className={`fixed left-0 right-0 top-[2px] z-[220] transition-all duration-700 ${
          isScrolled ? "py-3" : "bg-transparent py-5"
        } ${
          isNavVisible || !isScrolled
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-[120%] opacity-0"
        }`}
      >
        <div
          className={`container mx-auto flex max-w-5xl items-center justify-between rounded-full px-5 py-4 transition-all duration-700 ${
            isScrolled
              ? "glass soft-border shadow-2xl shadow-background/30"
              : "bg-transparent"
          }`}
        >
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
                className={`group relative px-5 py-3 text-sm font-medium transition-colors ${
                  activeSection === link.href.slice(1)
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
                      className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-primary to-glow-secondary transition-transform duration-500 ${
                        activeSection === link.href.slice(1)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </span>
                </span>
              </MagneticButton>
            ))}

            <div className="mx-4 h-6 w-[1px] bg-border/50" />

            <ThemeToggle />

            <MagneticButton
              href="#contact"
              className="ml-6 rounded-full px-7 py-3 text-sm font-semibold text-white transition-all duration-500 hover:shadow-xl"
              style={{
                backgroundColor: buttonColor ?? undefined,
                boxShadow: buttonColor ? `0 10px 15px -3px ${buttonColor}40` : undefined,
              }}
            >
              <span className="relative z-10">Let's Talk</span>
            </MagneticButton>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-[240] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/70 text-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary"
            >
              <div className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "top-1/2 -translate-y-1/2 -rotate-45"
                      : ""
                  }`}
                />
              </div>
            </button>
          </div>
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
            className="fixed inset-0 z-[215] flex flex-col items-center justify-center bg-background/98 backdrop-blur-2xl"
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
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {social.label}
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
