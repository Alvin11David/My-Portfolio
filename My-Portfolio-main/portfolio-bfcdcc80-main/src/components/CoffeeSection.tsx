import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Coffee, Heart, Sparkles, MessageCircle, DollarSign } from "lucide-react";
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
        { scope: containerRef }
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
                            If you find my work helpful or inspiring, consider supporting my journey.
                            Every coffee fuels more late-night coding sessions and creative breakthroughs.
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
                                <DialogContent className="sm:max-w-[425px] bg-background border-border backdrop-blur-2xl rounded-[2.5rem] p-8">
                                    <DialogHeader className="mb-6">
                                        <DialogTitle className="text-3xl font-serif text-foreground text-center">Fuel Creativity</DialogTitle>
                                        <DialogDescription className="text-muted-foreground text-center text-base mt-2">
                                            Choose how many coffees you'd like to send my way. $5 per coffee.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="grid gap-8 py-4">
                                        <div className="flex justify-center items-center gap-5">
                                            {[1, 3, 5].map((num) => (
                                                <button
                                                    key={num}
                                                    onClick={() => setCoffees(num)}
                                                    className={`flex flex-col items-center justify-center w-24 h-28 rounded-3xl border transition-all duration-500 ${coffees === num
                                                        ? "bg-primary border-primary text-primary-foreground shadow-2xl shadow-primary/40 scale-110 -translate-y-2"
                                                        : "bg-secondary border-border text-muted-foreground hover:bg-secondary/80 hover:border-primary/50"
                                                        }`}
                                                >
                                                    <span className="text-3xl mb-1">☕</span>
                                                    <span className="font-black text-xl">x{num}</span>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Custom Amount</label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                                    <Input
                                                        type="number"
                                                        value={coffees}
                                                        onChange={(e) => setCoffees(Math.max(1, parseInt(e.target.value) || 1))}
                                                        className="pl-12 bg-secondary border-border text-foreground rounded-2xl h-14 text-lg focus:ring-primary/50"
                                                        placeholder="Enter number of coffees"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Your Message</label>
                                                <div className="relative">
                                                    <MessageCircle className="absolute left-4 top-4 w-4 h-4 text-primary" />
                                                    <Textarea
                                                        placeholder="I love your work! Keep it up..."
                                                        value={message}
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        className="pl-12 bg-secondary border-border text-foreground rounded-2xl min-h-[120px] text-base focus:ring-primary/50 py-4"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-[1.5rem] bg-gradient-to-br from-primary/10 to-secondary border border-primary/20 flex justify-between items-center shadow-inner">
                                            <div>
                                                <p className="text-muted-foreground text-sm font-medium">Total Contribution</p>
                                                <p className="text-xs text-primary/60 font-medium italic">Support helps a lot!</p>
                                            </div>
                                            <span className="text-4xl font-black text-primary drop-shadow-glow">${coffees * coffeePrice}</span>
                                        </div>

                                        <Button
                                            onClick={handleSupport}
                                            className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-background font-black text-xl flex items-center justify-center gap-3 group shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02]"
                                        >
                                            Support Now
                                            <Heart className="w-6 h-6 fill-background group-hover:scale-125 transition-transform duration-500" />
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
                                        <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="Supporter" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-2 border-background bg-primary/20 backdrop-blur-sm flex items-center justify-center text-xs font-black text-primary italic shadow-lg">
                                    +12
                                </div>
                            </div>
                            <span className="text-sm text-muted-foreground font-semibold tracking-wide">Fueling digital dreams daily</span>
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
