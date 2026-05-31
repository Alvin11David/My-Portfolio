import { useEffect, useState, useRef } from "react";

interface SplashProps {
  onFinish?: () => void;
}

const LEVELS = [
  { name: "Warming Up", duration: 700 },
  { name: "Rendering", duration: 800 },
  { name: "Polishing", duration: 700 },
  { name: "Ready", duration: 600 },
];

const SplashScreen = ({ onFinish }: SplashProps) => {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [levelIndex, setLevelIndex] = useState(-1);
  const [levelProgress, setLevelProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  // initial faux-loading
  useEffect(() => {
    let raf: number | null = null;
    let start: number | null = null;
    const duration = 1200; // ms

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(1, elapsed / duration);
      setProgress(Math.round(pct * 100));
      if (elapsed < duration) {
        raf = requestAnimationFrame(step);
      } else {
        setProgress(100);
        setTimeout(() => setReady(true), 180);
      }
    };

    raf = requestAnimationFrame(step);
    rafRef.current = raf;
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // run level sequence when started
  useEffect(() => {
    if (!started) return;

    let cancelled = false;

    const runLevel = async (index: number) => {
      setLevelIndex(index);
      setLevelProgress(0);
      const { duration } = LEVELS[index];
      const startTime = performance.now();

      return new Promise<void>((resolve) => {
        const loop = (now: number) => {
          if (cancelled) return resolve();
          const elapsed = now - startTime;
          const pct = Math.min(1, elapsed / duration);
          setLevelProgress(Math.round(pct * 100));
          if (pct < 1) {
            requestAnimationFrame(loop);
          } else {
            // small pause between levels
            setTimeout(resolve, 260);
          }
        };
        requestAnimationFrame(loop);
      });
    };

    (async () => {
      for (let i = 0; i < LEVELS.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await runLevel(i);
      }
      if (!cancelled) {
        // final flourish before finishing: show confetti then finish
        setLevelIndex(LEVELS.length - 1);
        setLevelProgress(100);
        setShowConfetti(true);
        setTimeout(() => onFinish && onFinish(), 900);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [started, onFinish]);

  const roles = ["Designer", "Developer", "Creator"];
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    if (started) return; // stop cycling once started
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      1400,
    );
    return () => clearInterval(id);
  }, [started]);

  const [showConfetti, setShowConfetti] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div
      aria-hidden={false}
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-background to-transparent"
    >
      <div className="relative flex w-full max-w-3xl flex-col items-center gap-6 px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="rounded-full p-4 glow-lg bg-gradient-to-r from-primary to-glow-secondary">
              <svg
                width="56"
                height="56"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor="#00f5d4" />
                    <stop offset="100%" stopColor="#b76cff" />
                  </linearGradient>
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r="44"
                  stroke="url(#g)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="200"
                  strokeDashoffset="0"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="200"
                    to="0"
                    dur="1.4s"
                    fill="freeze"
                  />
                </circle>
                <text
                  x="50%"
                  y="54%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontFamily="Playfair Display, Georgia, serif"
                  fontSize="34"
                  fill="#fff"
                >
                  P
                </text>
              </svg>
            </div>

            <div className="text-left">
              <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">
                Portfolio<span className="text-primary">.</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Crafting digital experiences — interactive intro
              </p>
            </div>
          </div>

          <div className="ml-auto hidden sm:block text-right text-xs text-muted-foreground">
            Click start to begin
          </div>
        </div>

        {/* Loading or level UI */}
        {!started ? (
          <>
            <div className="w-full rounded-full bg-card/40 p-1">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-primary via-glow-secondary to-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
              <span>
                {ready ? "Ready — press Start" : "Initializing visuals"}
              </span>
              <span>{progress}%</span>
            </div>

            <div className="mt-4 w-full flex items-center justify-center">
              <button
                className={`rounded-full px-8 py-3 text-sm font-semibold transition-transform duration-300 transform-gpu ${
                  ready
                    ? "bg-gradient-to-r from-primary to-glow-secondary text-primary-foreground hover:scale-105 shadow-2xl"
                    : "bg-card/30 text-muted-foreground cursor-not-allowed opacity-60"
                }`}
                onClick={handleStart}
                disabled={!ready}
                aria-label="Enter the portfolio"
              >
                Enter Portfolio
              </button>
            </div>
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>
                {LEVELS[Math.max(0, Math.min(levelIndex, LEVELS.length - 1))]
                  ?.name || "Starting"}
              </span>
              <span>{levelProgress}%</span>
            </div>

            <div className="w-full rounded-full bg-card/40 p-1">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-primary via-glow-secondary to-primary transition-all"
                style={{ width: `${levelProgress}%` }}
              />
            </div>

            <div className="mt-6 flex justify-center gap-4">
              {LEVELS.map((l, i) => (
                <div key={l.name} className="flex flex-col items-center gap-2">
                  <div
                    className={`h-4 w-4 rounded-full transition-transform duration-300 ${
                      i <= levelIndex
                        ? "bg-primary scale-110 shadow-lg"
                        : "bg-card/30"
                    }`}
                    aria-hidden
                  />
                  <div className="text-[10px] text-muted-foreground">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl animate-float" />
          <div className="pointer-events-none absolute -right-40 -bottom-40 h-[360px] w-[360px] rounded-full bg-glow-secondary/8 blur-2xl animate-gradient-shift" />
        </div>
        {/* confetti container */}
        {showConfetti && (
          <div className="pointer-events-none confetti-container absolute inset-0 z-40">
            {Array.from({ length: 36 }).map((_, i) => {
              const left = Math.random() * 100;
              const delay = Math.random() * 0.6;
              const bg = [
                "#FF6B6B",
                "#FFD93D",
                "#6BCB77",
                "#4D96FF",
                "#B76CFF",
              ][i % 5];
              return (
                <span
                  key={i}
                  className="confetti-piece"
                  style={{
                    left: `${left}%`,
                    background: bg,
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
