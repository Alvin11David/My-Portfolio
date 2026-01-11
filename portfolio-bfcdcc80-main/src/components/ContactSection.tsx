import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Send,
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

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Header animation
      if (headerRef.current) {
        const elements = headerRef.current.querySelectorAll(".animate-header");
        gsap.from(elements, {
          opacity: 0,
          y: 100,
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

      // Content animation
      if (contentRef.current) {
        const left = contentRef.current.querySelector(".left-content");
        const right = contentRef.current.querySelector(".right-content");

        gsap.from(left, {
          opacity: 0,
          x: -80,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(right, {
          opacity: 0,
          x: 80,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSending) return;

    const button = formRef.current?.querySelector(".submit-button");
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }

    setIsSending(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          title: "New Contact Message",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setFocusedField(null);
    } catch (error) {
      toast({
        title: "Could not send message",
        description:
          "Please try again or email alvin69david@gmail.com directly.",
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
      className="relative min-h-screen overflow-hidden bg-background py-32 lg:py-40"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[180px]" />
        <div className="absolute bottom-1/4 left-0 h-[500px] w-[500px] rounded-full bg-glow-secondary/5 blur-[150px]" />
      </div>

      {/* Large background text */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 rotate-90 select-none font-serif text-[15vw] font-bold leading-none text-foreground/[0.02]">
        CONTACT
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-20 text-center">
          <span className="animate-header mb-6 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.4em] text-primary">
            <MessageCircle className="h-4 w-4" />
            Get In Touch
          </span>
          <h2 className="animate-header font-serif text-5xl font-bold md:text-6xl lg:text-7xl">
            Let's Create <span className="gradient-text">Together</span>
          </h2>
          <p className="animate-header mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Have a project in mind? I'd love to hear about it. Let's discuss how
            we can bring your vision to life.
          </p>
        </div>

        <div ref={contentRef} className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left - Contact info */}
            <div className="left-content space-y-10">
              <div>
                <h3 className="mb-4 font-serif text-3xl font-bold">
                  Let's Start a Conversation
                </h3>
                <p className="text-lg text-muted-foreground">
                  I'm currently available for freelance projects and full-time
                  opportunities.
                </p>
              </div>

              {/* Contact links */}
              <div className="space-y-4">
                <a
                  href="mailto:hello@portfolio.com"
                  className="group flex items-center gap-5 rounded-2xl border border-border bg-card/50 p-5 transition-all duration-500 hover:border-primary/50 hover:bg-card"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">alvin69david@gmail.com</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:rotate-45" />
                </a>

                <div className="flex items-center gap-5 rounded-2xl border border-border bg-card/50 p-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Kampala | Uganda</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Follow Me
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <MagneticButton
                      key={social.label}
                      href={social.href}
                      className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card/50 text-muted-foreground transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary"
                    >
                      <social.icon className="h-5 w-5" />
                    </MagneticButton>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-8">
                <p className="mb-4 text-lg font-medium">Prefer a quick call?</p>
                <p className="mb-6 text-muted-foreground">
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
                className="rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm lg:p-10"
              >
                <h3 className="mb-8 font-serif text-2xl font-bold">
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
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full rounded-xl border border-border bg-background px-4 pb-4 pt-6 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                    />
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
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full rounded-xl border border-border bg-background px-4 pb-4 pt-6 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                    />
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
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      className="w-full resize-none rounded-xl border border-border bg-background px-4 pb-4 pt-6 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="submit-button group relative w-full overflow-hidden rounded-xl bg-primary py-4 font-semibold text-primary-foreground transition-all duration-500 hover:shadow-xl hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSending ? "Sending..." : "Send Message"}
                      <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-glow-secondary to-primary bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-gradient-shift" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
