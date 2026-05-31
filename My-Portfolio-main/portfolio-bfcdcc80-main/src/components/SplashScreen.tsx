import { useEffect, useState } from "react";

interface SplashProps {
  onFinish?: () => void;
}

const SplashScreen = ({ onFinish }: SplashProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number | null = null;
    let start: number | null = null;

    const duration = 1500; // ms

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(1, elapsed / duration);
      setProgress(Math.round(pct * 100));
      if (elapsed < duration) {
        raf = requestAnimationFrame(step);
      } else {
        // small linger then finish
        setTimeout(() => onFinish && onFinish(), 220);
      }
    };

    raf = requestAnimationFrame(step);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [onFinish]);

  return (
    <div
      aria-hidden={false}
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-background to-transparent"
    >
      <div className="relative flex w-full max-w-3xl flex-col items-center gap-8 px-6">
        <div className="flex items-center gap-6">
          <div className="rounded-full p-4 glow-lg bg-gradient-to-r from-primary to-glow-secondary">
            <svg width="56" height="56" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="#00f5d4" />
                  <stop offset="100%" stopColor="#b76cff" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="44" stroke="url(#g)" strokeWidth="10" strokeLinecap="round" strokeDasharray="200" strokeDashoffset="0">
                <animate attributeName="stroke-dashoffset" from="200" to="0" dur="1.4s" fill="freeze" />
              </circle>
              <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontSize="34" fill="#fff">P</text>
            </svg>
          </div>

          <div className="text-left">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">Portfolio<span className="text-primary">.</span></h1>
            <p className="mt-1 text-sm text-muted-foreground">Crafting digital experiences — loading assets</p>
          </div>
        </div>

        <div className="w-full rounded-full bg-card/40 p-1">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-primary via-glow-secondary to-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          <span>Initializing visuals</span>
          <span>{progress}%</span>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl animate-float" />
          <div className="pointer-events-none absolute -right-40 -bottom-40 h-[360px] w-[360px] rounded-full bg-glow-secondary/8 blur-2xl animate-gradient-shift" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
