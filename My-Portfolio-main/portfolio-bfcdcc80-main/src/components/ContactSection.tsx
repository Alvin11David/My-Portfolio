import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  Send,
  Truck,
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Mail,
  MapPin,
  ArrowUpRight,
  MessageCircle,
  Instagram,
} from "lucide-react";
import { FaWhatsapp, FaBehance } from "react-icons/fa";
import ThreadsIcon from "@/components/icons/ThreadsIcon";
import { useToast } from "@/hooks/use-toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";
import Scene3D from "./Scene3D";
import CloudWave from "./CloudWave";

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "r1x2A2YyfHtXLLHR0";
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_b6hthi8";
const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_mlr9hp4";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const sendIconRef = useRef<SVGSVGElement>(null);
  const deliveryTrailRef = useRef<HTMLDivElement>(null);
  const deliveryCarRef = useRef<HTMLDivElement>(null);
  const dustParticlesRef = useRef<HTMLDivElement>(null);
  const waterFillRef = useRef<HTMLDivElement>(null);
  const waterSurfaceRef = useRef<HTMLDivElement>(null);
  const waterBubblesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const waterFishRef = useRef<(HTMLSpanElement | null)[]>([]);
  const { toast } = useToast();

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const errors = {
      name: "",
      email: "",
      message: "",
    };

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSending) return;

    // Validate form
    if (!validateForm()) {
      return;
    }

    const button = submitButtonRef.current;
    const icon = sendIconRef.current;
    const trail = deliveryTrailRef.current;
    const car = deliveryCarRef.current;
    const dust = dustParticlesRef.current;
    const waterFill = waterFillRef.current;
    const waterSurface = waterSurfaceRef.current;
    const bubbles = waterBubblesRef.current.filter(Boolean);
    const fish = waterFishRef.current.filter(Boolean);

    const deliveryTimeline = gsap.timeline();

    if (button) {
      deliveryTimeline.to(button, {
        scale: 0.98,
        duration: 0.12,
        ease: "power2.out",
      });
    }

    if (trail) {
      deliveryTimeline
        .set(trail, { scaleX: 0, opacity: 0, transformOrigin: "left center" })
        .to(
          trail,
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          0.05,
        )
        .to(
          trail,
          {
            opacity: 0,
            duration: 0.35,
            ease: "power2.in",
          },
          0.55,
        );
    }

    if (waterFill) {
      deliveryTimeline
        .set(
          waterFill,
          {
            opacity: 0,
            scaleY: 0.04,
            transformOrigin: "bottom center",
          },
          0.05,
        )
        .to(
          waterFill,
          {
            opacity: 1,
            scaleY: 1,
            duration: 1.35,
            ease: "power2.inOut",
          },
          0.08,
        )
        .to(
          waterFill,
          {
            scaleY: 0.97,
            duration: 0.25,
            ease: "power1.inOut",
          },
          1.2,
        );
    }

    if (waterSurface) {
      deliveryTimeline
        .set(
          waterSurface,
          {
            opacity: 0,
            scaleY: 0.2,
            y: 14,
            transformOrigin: "bottom center",
          },
          0.12,
        )
        .to(
          waterSurface,
          {
            opacity: 1,
            scaleY: 1,
            y: 0,
            duration: 1.15,
            ease: "power2.out",
          },
          0.26,
        )
        .to(
          waterSurface,
          {
            y: -3,
            duration: 0.22,
            ease: "power1.inOut",
          },
          1.18,
        );
    }

    if (bubbles.length > 0) {
      bubbles.forEach((bubble, index) => {
        const delay = 0.35 + index * 0.08;
        deliveryTimeline
          .set(bubble, { opacity: 0, scale: 0.1, y: 20 }, delay)
          .to(
            bubble,
            {
              opacity: 0.75,
              scale: 1,
              y: -12 - index * 4,
              duration: 0.55,
              ease: "power2.out",
            },
            delay,
          )
          .to(
            bubble,
            {
              opacity: 0,
              scale: 0.5,
              y: -38 - index * 6,
              duration: 0.5,
              ease: "power1.in",
            },
            delay + 0.44,
          );
      });
    }

    if (fish.length > 0) {
      fish.forEach((fishNode, index) => {
        const fromLeft = index % 2 === 0;
        const delay = 0.5 + index * 0.12;
        deliveryTimeline
          .set(
            fishNode,
            {
              opacity: 0,
              x: fromLeft ? -26 : 26,
              y: 16 + index * 2,
              rotate: fromLeft ? 8 : -8,
              scale: 0.82,
            },
            delay,
          )
          .to(
            fishNode,
            {
              opacity: 0.8,
              x: fromLeft ? 36 : -36,
              y: -6 - index * 3,
              rotate: fromLeft ? -6 : 6,
              scale: 1,
              duration: 0.8,
              ease: "sine.inOut",
            },
            delay,
          )
          .to(
            fishNode,
            {
              opacity: 0,
              x: fromLeft ? 54 : -54,
              y: -20 - index * 4,
              duration: 0.35,
              ease: "power1.in",
            },
            delay + 0.72,
          );
      });
    }

    if (car) {
      deliveryTimeline.to(
        car,
        {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease: "power2.in",
        },
        0.2,
      );
    }

    if (dust) {
      const particles = dust.querySelectorAll(".dust-particle");
      particles.forEach((particle, index) => {
        const delay = index * 0.04;
        deliveryTimeline
          .set(particle, { opacity: 1, x: 0, y: 0, scale: 1 }, 0.12 + delay)
          .to(
            particle,
            {
              x: 16 + Math.random() * 20,
              y: -6 + (Math.random() - 0.5) * 16,
              opacity: 0,
              scale: 0,
              duration: 0.45 + Math.random() * 0.15,
              ease: "power1.out",
            },
            0.12 + delay,
          );
      });
    }

    if (icon) {
      deliveryTimeline
        .set(icon, { x: 0, y: 0, rotate: 0, transformOrigin: "50% 50%" }, 0.1)
        .to(
          icon,
          {
            y: -3,
            opacity: 0.35,
            duration: 0.2,
            ease: "power2.out",
          },
          0.12,
        )
        .to(
          icon,
          {
            opacity: 0,
            scale: 0.6,
            duration: 0.18,
            ease: "power2.in",
          },
          0.34,
        )
        .set(icon, { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 });
    }

    if (button) {
      deliveryTimeline.to(button, {
        scale: 1,
        duration: 0.18,
        ease: "back.out(2)",
      });
    }

    setIsSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          title: "New Contact Message",
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setFormErrors({ name: "", email: "", message: "" });
      setFocusedField(null);
    } catch (error) {
      const isNetworkError =
        error instanceof TypeError &&
        error.message.toLowerCase().includes("failed to fetch");

      toast({
        title: "Could not send message",
        description: isNetworkError
          ? "Network request to EmailJS failed. Check your Service ID and EmailJS allowed domains, then try again."
          : "Please try again or email alvin69david@gmail.com directly.",
        variant: "destructive",
      });
      console.error("EmailJS send failed", error);
    } finally {
      setIsSending(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Alvin11David", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/waluube-alvin-david-75778336b/",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/Alvin1_1David",
      label: "Twitter",
    },
    {
      icon: Dribbble,
      href: "https://dribbble.com/alvin11david",
      label: "Dribbble",
    },
    {
      icon: FaBehance,
      href: "https://www.behance.net/alvindavid4",
      label: "Behance",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/Alvin1_1David",
      label: "Instagram",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/256758862363",
      label: "WhatsApp",
    },
    {
      icon: ThreadsIcon,
      href: "https://www.threads.net/@Alvin1_1David",
      label: "Threads",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen overflow-hidden bg-background py-20 md:py-32 lg:py-40"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-primary/5 blur-[120px] sm:blur-[180px]" />
        <div className="absolute bottom-1/4 left-0 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-glow-secondary/5 blur-[100px] sm:blur-[150px]" />

        {/* Mind-blowing 3D Scene */}
        <div className="absolute inset-0 opacity-20 sm:opacity-30">
          <Scene3D variant="contact" />
        </div>
      </div>

      {/* Large background text */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 rotate-90 select-none font-serif text-[20vw] sm:text-[15vw] font-bold leading-none text-foreground/[0.02]">
        CONTACT
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-20 text-center">
          <span className="animate-header mb-4 sm:mb-6 inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.4em] text-primary">
            <MessageCircle className="h-4 w-4" />
            Get In Touch
          </span>
          <h2 className="animate-header font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Let's Create <span className="gradient-text">Together</span>
          </h2>
          <p className="animate-header mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground">
            Have a project in mind? I'd love to hear about it. Let's discuss how
            we can bring your vision to life.
          </p>
        </div>

        <div ref={contentRef} className="mx-auto max-w-6xl">
          <div className="grid gap-12 sm:gap-16 lg:grid-cols-2">
            {/* Left - Contact info */}
            <div className="left-content space-y-8 sm:space-y-10">
              <div>
                <h3 className="mb-4 font-serif text-2xl sm:text-3xl font-bold">
                  Let's Start a Conversation
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground">
                  I'm currently available for freelance projects and full-time
                  opportunities.
                </p>
              </div>

              {/* Contact links */}
              <div className="space-y-4">
                <a
                  href="mailto:alvin69david@gmail.com"
                  className="group flex items-center gap-4 sm:gap-5 rounded-2xl border border-border bg-card/50 p-4 sm:p-5 transition-all duration-500 hover:border-primary/50 hover:bg-card"
                >
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Email
                    </p>
                    <p className="truncate font-medium text-sm sm:text-base">
                      alvin69david@gmail.com
                    </p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:rotate-45" />
                </a>

                <div className="flex items-center gap-4 sm:gap-5 rounded-2xl border border-border bg-card/50 p-4 sm:p-5">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Location
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      Kampala | Uganda
                    </p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Follow Me
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {socialLinks.map((social) => (
                    <MagneticButton
                      key={social.label}
                      href={social.href}
                      className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-border bg-card/50 text-muted-foreground transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary"
                    >
                      <social.icon className="h-5 w-5" />
                    </MagneticButton>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-6 sm:p-8">
                <p className="mb-4 text-base sm:text-lg font-medium">
                  Prefer a quick call?
                </p>
                <p className="mb-6 text-sm sm:text-muted-foreground">
                  Book a free 15-minute intro call to discuss your project.
                </p>
                <a
                  href="tel:+256758862363"
                  className="group inline-flex items-center gap-3 font-semibold text-primary transition-all hover:gap-4"
                >
                  Schedule a call
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
                </a>
              </div>
            </div>

            {/* Right - Form */}
            <div className="right-content">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm lg:p-10"
              >
                <h3 className="mb-6 sm:mb-8 font-serif text-xl sm:text-2xl font-bold">
                  Send a Message
                </h3>

                <div className="space-y-6">
                  {/* Name */}
                  <div className="relative">
                    <label
                      className={`pointer-events-none absolute left-4 origin-left text-muted-foreground transition-all duration-300 ${
                        focusedField === "name" || formData.name
                          ? "-top-2 scale-75 text-primary"
                          : "top-4"
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name) {
                          setFormErrors({ ...formErrors, name: "" });
                        }
                      }}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full rounded-xl border bg-background px-4 pb-4 pt-6 text-foreground outline-none transition-all focus:ring-2 focus:ring-primary/20 ${
                        formErrors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-border focus:border-primary"
                      }`}
                      required
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label
                      className={`pointer-events-none absolute left-4 origin-left text-muted-foreground transition-all duration-300 ${
                        focusedField === "email" || formData.email
                          ? "-top-2 scale-75 text-primary"
                          : "top-4"
                      }`}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formErrors.email) {
                          setFormErrors({ ...formErrors, email: "" });
                        }
                      }}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full rounded-xl border bg-background px-4 pb-4 pt-6 text-foreground outline-none transition-all focus:ring-2 focus:ring-primary/20 ${
                        formErrors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-border focus:border-primary"
                      }`}
                      required
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label
                      className={`pointer-events-none absolute left-4 origin-left text-muted-foreground transition-all duration-300 ${
                        focusedField === "message" || formData.message
                          ? "-top-2 scale-75 text-primary"
                          : "top-4"
                      }`}
                    >
                      Your Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (formErrors.message) {
                          setFormErrors({ ...formErrors, message: "" });
                        }
                      }}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      className={`w-full resize-none rounded-xl border bg-background px-4 pb-4 pt-6 text-foreground outline-none transition-all focus:ring-2 focus:ring-primary/20 ${
                        formErrors.message
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-border focus:border-primary"
                      }`}
                      required
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSending}
                    className={`submit-button group relative w-full overflow-hidden rounded-xl border-2 border-cyan-400/75 bg-transparent py-4 font-semibold transition-all duration-500 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-80 ${
                      isSending ? "text-primary-foreground" : "text-primary"
                    }`}
                  >
                    <div
                      ref={deliveryTrailRef}
                      className="absolute inset-y-1/2 left-6 h-px w-[calc(100%-3rem)] -translate-y-1/2 bg-gradient-to-r from-transparent via-primary-foreground/60 to-transparent opacity-0"
                    />

                    {/* Water fill animation */}
                    <div
                      ref={waterFillRef}
                      className="absolute inset-x-0 bottom-0 top-0 z-0 origin-bottom scale-y-0 opacity-0"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-800 via-sky-600 to-cyan-300/95" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_100%,rgba(255,255,255,0.22),transparent_44%),radial-gradient(circle_at_78%_95%,rgba(255,255,255,0.28),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02))]" />

                      <div className="water-wave-layer water-wave-layer--back" />
                      <div className="water-wave-layer water-wave-layer--front" />

                      <div
                        className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
                        aria-hidden="true"
                      >
                        {[...Array(4)].map((_, i) => (
                          <span
                            key={i}
                            ref={(node) => {
                              waterFishRef.current[i] = node;
                            }}
                            className="absolute bottom-5 text-[10px] sm:text-xs text-cyan-100/80 opacity-0 drop-shadow-[0_0_6px_rgba(186,255,255,0.45)]"
                            style={{ left: `${16 + i * 18}%` }}
                          >
                            <span className="water-fish">
                              &gt;&lt;(((('&gt;
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      ref={waterSurfaceRef}
                      className="absolute inset-x-0 bottom-0 z-0 origin-bottom scale-y-0 opacity-0"
                    >
                      <div className="absolute -top-2 left-0 right-0 h-5 rounded-full bg-cyan-100/80 blur-md" />
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.45),transparent_28%),radial-gradient(circle_at_35%_0%,rgba(255,255,255,0.25),transparent_22%),radial-gradient(circle_at_65%_0%,rgba(255,255,255,0.35),transparent_24%),radial-gradient(circle_at_85%_0%,rgba(255,255,255,0.2),transparent_22%)]" />
                    </div>

                    {/* Delivery car animation */}
                    <div
                      ref={deliveryCarRef}
                      className="absolute inset-y-1/2 left-6 z-10 -translate-y-1/2 text-2xl opacity-0 whitespace-nowrap"
                    >
                      <Truck className="h-6 w-6" />
                    </div>

                    {/* Dust particles */}
                    <div
                      ref={dustParticlesRef}
                      className="absolute inset-0 z-10 pointer-events-none"
                    >
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="dust-particle absolute inset-y-1/2 left-8 w-2 h-2 rounded-full bg-primary-foreground/40 opacity-0"
                          style={{
                            width: `${2 + i * 0.8}px`,
                            height: `${2 + i * 0.8}px`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_hsl(var(--primary-foreground)/0.2),_transparent_35%),radial-gradient(circle_at_80%_50%,_hsl(var(--glow-secondary)/0.18),_transparent_32%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="relative z-20 flex items-center justify-center gap-3">
                      <span className="flex flex-col items-center leading-none sm:flex-row sm:gap-3">
                        <span>
                          {isSending ? "Sending Message" : "Send Message"}
                        </span>
                      </span>
                      <Send
                        ref={sendIconRef}
                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </span>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-glow-secondary to-primary bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-gradient-shift" />
                    <div
                      className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-xl"
                      aria-hidden="true"
                    >
                      {[...Array(4)].map((_, i) => (
                        <span
                          key={i}
                          ref={(node) => {
                            waterBubblesRef.current[i] = node;
                          }}
                          className="absolute bottom-4 h-2 w-2 rounded-full bg-white/70 opacity-0 blur-[0.5px]"
                          style={{ left: `${18 + i * 18}%` }}
                        />
                      ))}
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <CloudWave className="absolute left-0 bottom-0 w-full -z-10" />
    </section>
  );
};

export default ContactSection;
