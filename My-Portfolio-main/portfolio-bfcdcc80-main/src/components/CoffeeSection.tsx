import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Coffee,
  Minus,
  Heart,
  Plus,
  Sparkles,
  MessageCircle,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CloudWave from "./CloudWave";
import blueBackgroundStripes from "@/assets/images/blue-background-stripes.svg";
import oredFireStripes from "@/assets/images/ored-fire-stripes.svg";

const CoffeeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coffees, setCoffees] = useState(1);
  const [message, setMessage] = useState("");
  const [isCoffeeDialogOpen, setIsCoffeeDialogOpen] = useState(false);
  const coffeePrice = 5;

  const adjustCoffees = (delta: number) => {
    setCoffees((prev) => Math.max(1, prev + delta));
  };

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
        <img src={blueBackgroundStripes} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" aria-hidden="true" />
        <img src={oredFireStripes} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" aria-hidden="true" />
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
              <Dialog
                open={isCoffeeDialogOpen}
                onOpenChange={setIsCoffeeDialogOpen}
              >
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
                <DialogContent className="max-h-[92vh] overflow-hidden rounded-t-[2rem] border-border bg-background p-0 backdrop-blur-2xl sm:max-w-[440px] sm:rounded-[2.5rem]">
                  <div className="h-2 w-full bg-gradient-to-r from-primary/80 via-blue-500/70 to-primary/80" />
                  <div className="pointer-events-none absolute -left-24 top-20 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
                  <div className="pointer-events-none absolute -right-20 bottom-24 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl" />

                  <div
                    className="max-h-[calc(92vh-0.5rem)] overflow-y-auto overscroll-contain px-5 pb-5 pt-6 sm:px-8 sm:pb-8"
                    onWheelCapture={(e) => e.stopPropagation()}
                  >
                    <DialogHeader className="mb-6 pr-10 animate-in fade-in-0 slide-in-from-top-1 duration-300">
                      <DialogTitle className="text-center font-serif text-2xl text-foreground sm:text-3xl">
                        Fuel Creativity
                      </DialogTitle>
                      <DialogDescription className="mt-2 text-center text-sm text-muted-foreground sm:text-base">
                        Choose how many coffees you'd like to send my way. $5
                        per coffee.
                      </DialogDescription>
                    </DialogHeader>

                    <div
                      className="mb-5 flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary animate-in fade-in-0 slide-in-from-top-1 duration-500 sm:text-sm"
                      style={{ animationDelay: "90ms" }}
                    >
                      <Sparkles className="h-4 w-4" />
                      Quick support, huge impact
                    </div>

                    <div
                      className="grid gap-6 py-1 animate-in fade-in-0 slide-in-from-bottom-1 duration-500 sm:gap-8 sm:py-3"
                      style={{ animationDelay: "140ms" }}
                    >
                      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                        {[1, 3, 5].map((num) => (
                          <button
                            key={num}
                            onClick={() => setCoffees(num)}
                            className={`flex h-24 w-20 flex-col items-center justify-center rounded-3xl border transition-all duration-500 animate-in fade-in-0 zoom-in-95 sm:h-28 sm:w-24 ${
                              coffees === num
                                ? "scale-110 -translate-y-2 border-primary bg-primary text-primary-foreground shadow-2xl shadow-primary/40"
                                : "border-border bg-secondary text-muted-foreground hover:border-primary/50 hover:bg-secondary/80"
                            }`}
                            style={{ animationDelay: `${180 + num * 35}ms` }}
                          >
                            <span className="mb-1 text-2xl sm:text-3xl">
                              ☕
                            </span>
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
                          <div className="rounded-[1.35rem] border border-border bg-secondary/70 p-2 shadow-inner transition-all duration-300 focus-within:border-primary/50 focus-within:shadow-primary/10 focus-within:shadow-lg">
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="secondary"
                                onClick={() => adjustCoffees(-1)}
                                disabled={coffees <= 1}
                                className="h-11 w-11 shrink-0 rounded-xl border border-border/80 bg-background/80 p-0 text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Decrease coffee amount"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>

                              <div className="relative flex-1">
                                <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                                <Input
                                  type="number"
                                  min={1}
                                  step={1}
                                  inputMode="numeric"
                                  value={coffees}
                                  onChange={(e) =>
                                    setCoffees(
                                      Math.max(
                                        1,
                                        parseInt(e.target.value) || 1,
                                      ),
                                    )
                                  }
                                  className="h-11 rounded-xl border-border bg-background pl-9 pr-11 text-center text-base font-semibold text-foreground [appearance:textfield] focus-visible:ring-primary/50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                  placeholder="Coffees"
                                />
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                  cups
                                </span>
                              </div>

                              <Button
                                type="button"
                                variant="secondary"
                                onClick={() => adjustCoffees(1)}
                                className="h-11 w-11 shrink-0 rounded-xl border border-primary/30 bg-primary/10 p-0 text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                aria-label="Increase coffee amount"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <p className="mt-2 px-1 text-[11px] font-medium text-muted-foreground">
                              Tip: use +/- for quick changes.
                            </p>
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

                      <div
                        className="rounded-[1.5rem] border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary p-4 shadow-inner animate-in fade-in-0 slide-in-from-bottom-2 duration-500 sm:p-6"
                        style={{ animationDelay: "220ms" }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Total Contribution
                            </p>
                            <p className="text-xs font-medium italic text-primary/60">
                              Support helps a lot!
                            </p>
                          </div>
                          <span
                            key={coffees}
                            className="text-3xl font-black text-primary drop-shadow-glow animate-in fade-in-0 zoom-in-95 duration-300 sm:text-4xl"
                          >
                            ${coffees * coffeePrice}
                          </span>
                        </div>
                      </div>

                      <div
                        className="sticky bottom-0 z-10 -mx-5 bg-background/95 px-5 pb-1 pt-3 backdrop-blur animate-in fade-in-0 slide-in-from-bottom-1 duration-500 sm:-mx-8 sm:px-8"
                        style={{ animationDelay: "260ms" }}
                      >
                        <Button
                          onClick={handleSupport}
                          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary font-black text-lg text-background shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 sm:h-16 sm:text-xl"
                        >
                          Support Now
                          <Heart className="h-5 w-5 fill-background transition-transform duration-500 group-hover:scale-125 sm:h-6 sm:w-6" />
                        </Button>
                      </div>
                    </div>
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
