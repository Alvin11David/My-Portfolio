import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Coffee,
  Heart,
  Sparkles,
  MessageCircle,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CoffeeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coffees, setCoffees] = useState(1);
  const [message, setMessage] = useState("");
  const coffeePrice = 5;

  useGSAP(
    () => {
      gsap.from(".coffee-animate", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.to(".coffee-icon", {
        y: -10,
        rotation: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  const handleSupport = () => {
    // Replace 'yourusername' with your actual Buy Me a Coffee username
    const baseUrl = "https://www.buymeacoffee.com/yourusername";
    const finalUrl = `${baseUrl}?amount=${coffees * coffeePrice}&message=${encodeURIComponent(message)}`;
    window.open(finalUrl, "_blank");
  };

  return (
    <section
      ref={containerRef}
      id="support"
      className="relative py-24 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto rounded-[3rem] border border-border bg-card/50 p-8 md:p-16 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="coffee-animate mb-8 relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <div className="coffee-icon relative flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-blue-600 shadow-xl shadow-primary/20">
                <Coffee className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="coffee-animate mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-bold uppercase tracking-widest text-primary">
              <Heart className="w-3 h-3 fill-current" />
              Support My Work
            </div>

            <h2 className="coffee-animate font-serif text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Fuel the <span className="gradient-text">Innovation</span>
            </h2>

            <p className="coffee-animate max-w-xl text-lg text-muted-foreground mb-10 font-light leading-relaxed">
              If you find my work helpful or inspiring, consider supporting my
              journey. Every coffee fuels more late-night coding sessions and
              creative breakthroughs.
            </p>

            <div className="coffee-animate">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-background font-bold text-lg group shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <span className="flex items-center gap-3">
                      Buy Me a Coffee
                      <Coffee className="w-5 h-5 transition-transform group-hover:rotate-12" />
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[calc(100vh-1.5rem)] overflow-y-auto rounded-t-[2rem] border-border bg-background p-5 backdrop-blur-2xl sm:max-w-[425px] sm:rounded-[2.5rem] sm:p-8">
                  <DialogClose className="absolute right-4 top-4 rounded-full border border-border bg-background/90 p-2 text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary sm:right-4 sm:top-4">
                    <span className="sr-only">Close</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </DialogClose>

                  <DialogHeader className="mb-6 pr-10 sm:pr-0">
                    <DialogTitle className="text-center font-serif text-2xl text-foreground sm:text-3xl">
                      Fuel Creativity
                    </DialogTitle>
                    <DialogDescription className="mt-2 text-center text-sm text-muted-foreground sm:text-base">
                      Choose how many coffees you'd like to send my way. $5 per
                      coffee.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-6 py-2 sm:gap-8 sm:py-4">
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                      {[1, 3, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => setCoffees(num)}
                          className={`flex h-24 w-20 flex-col items-center justify-center rounded-3xl border transition-all duration-500 sm:h-28 sm:w-24 ${
                            coffees === num
                              ? "bg-primary border-primary text-primary-foreground shadow-2xl shadow-primary/40 scale-110 -translate-y-2"
                              : "bg-secondary border-border text-muted-foreground hover:bg-secondary/80 hover:border-primary/50"
                          }`}
                        >
                          <span className="mb-1 text-2xl sm:text-3xl">☕</span>
                          <span className="text-lg font-black sm:text-xl">
                            x{num}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-5 sm:space-y-6">
                      <div className="space-y-2">
                        <label className="ml-1 text-xs font-bold uppercase tracking-widest text-muted-foreground sm:text-sm">
                          Custom Amount
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                          <Input
                            type="number"
                            value={coffees}
                            onChange={(e) =>
                              setCoffees(
                                Math.max(1, parseInt(e.target.value) || 1),
                              )
                            }
                            className="h-12 rounded-2xl border-border bg-secondary pl-12 text-base text-foreground focus:ring-primary/50 sm:h-14 sm:text-lg"
                            placeholder="Enter number of coffees"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="ml-1 text-xs font-bold uppercase tracking-widest text-muted-foreground sm:text-sm">
                          Your Message
                        </label>
                        <div className="relative">
                          <MessageCircle className="absolute left-4 top-4 h-4 w-4 text-primary" />
                          <Textarea
                            placeholder="I love your work! Keep it up..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="min-h-[110px] rounded-2xl border-border bg-secondary py-4 pl-12 text-base text-foreground focus:ring-primary/50 sm:min-h-[120px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-[1.5rem] border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary p-4 shadow-inner sm:p-6">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Contribution
                        </p>
                        <p className="text-xs font-medium italic text-primary/60">
                          Support helps a lot!
                        </p>
                      </div>
                      <span className="text-3xl font-black text-primary drop-shadow-glow sm:text-4xl">
                        ${coffees * coffeePrice}
                      </span>
                    </div>

                    <Button
                      onClick={handleSupport}
                      className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary font-black text-lg text-background shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 sm:h-16 sm:text-xl"
                    >
                      Support Now
                      <Heart className="h-5 w-5 fill-background transition-transform duration-500 group-hover:scale-125 sm:h-6 sm:w-6" />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="coffee-animate flex flex-col sm:flex-row gap-4 items-center mt-12">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold text-foreground overflow-hidden shadow-lg"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 15}`}
                      alt="Supporter"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-background bg-primary/20 backdrop-blur-sm flex items-center justify-center text-xs font-black text-primary italic shadow-lg">
                  +12
                </div>
              </div>
              <span className="text-sm text-muted-foreground font-semibold tracking-wide">
                Fueling digital dreams daily
              </span>
            </div>
          </div>

          <Sparkles className="absolute top-10 right-10 w-6 h-6 text-primary/40 animate-pulse" />
          <Sparkles className="absolute bottom-10 left-10 w-4 h-4 text-purple-400/40 animate-pulse delay-700" />
        </div>
      </div>
    </section>
  );
};

export default CoffeeSection;
