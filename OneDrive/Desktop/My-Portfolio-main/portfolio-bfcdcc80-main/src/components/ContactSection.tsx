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
import Scene3D from "./Scene3D";

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
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setFormErrors({ name: "", email: "", message: "" });
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
