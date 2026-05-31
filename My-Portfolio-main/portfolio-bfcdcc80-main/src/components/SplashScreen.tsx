import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";

/* ─── Types & constants ──────────────────────────────────────────────────── */

interface SplashProps {
  onFinish?: () => void;
}

const STAGES = [
  { name: "Loading Assets",   duration: 700, end: 28  },
  { name: "Preparing Layout", duration: 650, end: 54  },
  { name: "Applying Styles",  duration: 550, end: 75  },
  { name: "Rendering Views",  duration: 500, end: 91  },
  { name: "Final Polish",     duration: 400, end: 100 },
];

const MESSAGES = [
  "Every great design begins with an even better story",
  "Craft that whispers before it speaks",
  "Beauty is the argument that wins without words",
  "Where precision and poetry share the same breath",
];

const CONFETTI_COLORS = ["#C9A84C","#D4AF50","#F0D080","#8B3A2A","#A89FE0","#F9F5EE"];

/* ─── Particle system ────────────────────────────────────────────────────── */

interface Particle {
  x: number; y: number; r: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  rgb: string;
}

function makeParticle(cw: number, ch: number, init = false): Particle {
  return {
    x: Math.random() * cw,
    y: init ? Math.random() * ch : ch + 10,
    r: Math.random() * 1.4 + 0.3,
    vx: (Math.random() - 0.5) * 0.18,
    vy: -(Math.random() * 0.45 + 0.1),
    life: 0,
    maxLife: Math.random() * 220 + 100,
    rgb: `${Math.floor(Math.random() * 20 + 175)},${Math.floor(Math.random() * 60 + 120)},38`,
  };
}

/* ─── Styles (injected once) ─────────────────────────────────────────────── */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Tenor+Sans&family=Crimson+Pro:ital,wght@0,200;0,300;1,200;1,300&display=swap');

  .sp-corner {
    opacity: 0; position: absolute; width: 28px; height: 28px;
    border-color: rgba(180,149,42,0.35); border-style: solid;
  }
  .sp-corner-tl { top: 28px; left: 28px;   border-width: 1px 0 0 1px; }
  .sp-corner-tr { top: 28px; right: 28px;  border-width: 1px 1px 0 0; }
  .sp-corner-bl { bottom: 28px; left: 28px;  border-width: 0 0 1px 1px; }
  .sp-corner-br { bottom: 28px; right: 28px; border-width: 0 1px 1px 0; }

  .sp-deco-l, .sp-deco-r {
    position: absolute; top: 50%; height: 1px; width: 0; opacity: 0.22;
  }
  .sp-deco-l { left: 0;  background: linear-gradient(90deg,  #B8952A, transparent); }
  .sp-deco-r { right: 0; background: linear-gradient(270deg, #B8952A, transparent); }

  .sp-fc {
    position: absolute; pointer-events: none; opacity: 0;
    font-family: 'DM Serif Display', serif; font-style: italic;
    color: rgba(180,149,42,0.055); user-select: none;
    line-height: 1; transform-style: preserve-3d;
  }

  .sp-tl1 {
    font-family: 'DM Serif Display', serif; font-style: italic;
    font-weight: 400; color: #F9F5EE; line-height: 0.9;
    display: block; opacity: 0; transform-style: preserve-3d;
  }
  .sp-tl2 {
    font-family: 'DM Serif Display', serif; font-weight: 400;
    color: transparent; -webkit-text-stroke: 1px #D4AF50;
    line-height: 0.9; display: block; opacity: 0; transform-style: preserve-3d;
  }
  .sp-tl3 {
    font-family: 'Crimson Pro', serif; font-weight: 200; font-style: italic;
    color: #F0D080; letter-spacing: 3px; display: block; opacity: 0; margin-top: 18px;
  }

  .sp-rule {
    height: 1px; width: 0;
    background: linear-gradient(90deg, transparent 0%, #B8952A 25%, #D4AF50 50%, #B8952A 75%, transparent 100%);
    margin: 30px auto;
  }

  .sp-msg {
    position: absolute; width: 100%;
    font-family: 'Crimson Pro', serif; font-size: 16px;
    font-weight: 300; font-style: italic;
    color: #A09070; letter-spacing: 0.5px;
    opacity: 0; transform: translateY(12px);
  }

  .sp-enter-btn {
    font-family: 'Tenor Sans', sans-serif; font-size: 11px;
    letter-spacing: 5px; text-transform: uppercase;
    color: #1A0F08;
    background: linear-gradient(135deg,#B8952A,#D4AF50,#F0D080,#D4AF50);
    background-size: 200% auto;
    border: none; border-radius: 2px;
    padding: 15px 48px; cursor: pointer;
    transform-style: preserve-3d;
    transition: background-position 0.4s; outline: none;
  }
  .sp-enter-btn:hover { background-position: right center; }

  .sp-ghost-btn {
    font-family: 'Tenor Sans', sans-serif; font-size: 11px;
    letter-spacing: 3px; text-transform: uppercase;
    color: #D4AF50; background: transparent;
    border: 1px solid rgba(180,149,42,0.3); border-radius: 2px;
    padding: 15px 36px; cursor: pointer;
    transition: border-color 0.3s, color 0.3s; outline: none;
  }
  .sp-ghost-btn:hover { border-color: #D4AF50; color: #F0D080; }

  .sp-prog-track { height: 1px; background: rgba(180,149,42,0.15); position: relative; }
  .sp-prog-fill  {
    height: 100%; position: absolute; top: 0; left: 0;
    background: linear-gradient(90deg,#8B3A2A,#B8952A,#D4AF50);
    transition: width 0.04s linear;
  }
  .sp-prog-glow {
    position: absolute; top: -4px; width: 8px; height: 8px;
    border-radius: 50%; background: #D4AF50;
    box-shadow: 0 0 10px 3px rgba(212,175,80,0.7); opacity: 0;
    transition: left 0.04s linear;
  }
  .sp-stage-lbl {
    font-family: 'Tenor Sans', sans-serif; font-size: 10px;
    letter-spacing: 3px; text-transform: uppercase; color: #6A6050;
  }
  .sp-pct-lbl {
    font-family: 'Crimson Pro', serif; font-size: 14px;
    font-style: italic; color: #D4AF50;
    font-variant-numeric: tabular-nums;
  }

  .sp-badge-ring {
    width: 68px; height: 68px; border-radius: 50%;
    border: 1px solid #D4AF50;
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .sp-burst {
    position: absolute; border-radius: 50%;
    border: 1px solid #D4AF50; width: 100%; height: 100%;
    animation: spBurst 1s ease forwards;
  }
  @keyframes spBurst {
    0%   { transform: scale(1);   opacity: 0.5; }
    100% { transform: scale(2.4); opacity: 0;   }
  }
  .sp-badge-txt {
    font-family: 'Crimson Pro', serif; font-size: 15px;
    font-style: italic; font-weight: 200; color: #D4AF50; letter-spacing: 2px;
  }

  .sp-confetti {
    position: absolute; top: -10px; width: 7px; height: 10px;
    border-radius: 2px; animation: spFall 1.4s ease-in forwards;
  }
  @keyframes spFall {
    0%   { transform: translateY(0)     rotate(0deg);   opacity: 1; }
    100% { transform: translateY(560px) rotate(540deg); opacity: 0; }
  }
`;

/* ─── Component ──────────────────────────────────────────────────────────── */

const SplashScreen = ({ onFinish }: SplashProps) => {
  const rootRef      = useRef<HTMLDivElement>(null);
  const sceneRef     = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const rafBgRef     = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const msgTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef   = useRef(false);         // sync flag for handlers

  const [msgIndex,      setMsgIndex]      = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const [stageLabel,    setStageLabel]    = useState("Initialising");
  const [showProgress,  setShowProgress]  = useState(false);
  const [showSuccess,   setShowSuccess]   = useState(false);
  const [showBtns,      setShowBtns]      = useState(false); // mount btns AFTER timeline starts
  const [confetti, setConfetti] = useState<{ left: number; delay: number; bg: string }[]>([]);

  /* ── Canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const root   = rootRef.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => { canvas.width = root.offsetWidth; canvas.height = root.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const cw = () => canvas.width;
    const ch = () => canvas.height;
    particlesRef.current = Array.from({ length: 90 }, () => makeParticle(cw(), ch(), true));

    const loop = () => {
      rafBgRef.current = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, cw(), ch());

      const g = ctx.createRadialGradient(cw()/2, ch()*0.38, 0, cw()/2, ch()/2, cw()*0.85);
      g.addColorStop(0,   "rgba(38,18,8,1)");
      g.addColorStop(0.5, "rgba(22,10,5,1)");
      g.addColorStop(1,   "rgba(10,7,3,1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, cw(), ch());

      particlesRef.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life++;
        if (p.life > p.maxLife || p.y < -10) Object.assign(p, makeParticle(cw(), ch(), false));
        const a = Math.sin((p.life / p.maxLife) * Math.PI) * 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.rgb},${a})`;
        ctx.fill();
      });
    };
    loop();

    return () => { cancelAnimationFrame(rafBgRef.current); window.removeEventListener("resize", resize); };
  }, []);

  /* ── GSAP entrance timeline ── */
  useEffect(() => {
    // Mount buttons immediately so they exist in DOM for GSAP to target
    setShowBtns(true);

    // Use a tiny timeout so React has committed the DOM before GSAP runs
    const tid = setTimeout(() => {
      const tl = gsap.timeline();

      tl
        .to(".sp-corner", { opacity: 1, duration: 0.7, stagger: 0.15, ease: "power2.out" })
        .to(".sp-deco-l",  { width: "36%", duration: 1.3, ease: "power3.out" }, 0.3)
        .to(".sp-deco-r",  { width: "36%", duration: 1.3, ease: "power3.out" }, 0.3)
        .to("#sp-fc1",     { opacity: 1, y: -12, duration: 2.2, ease: "power2.out" }, 0.2)
        .to("#sp-fc2",     { opacity: 1, y:  12, duration: 2.2, ease: "power2.out" }, 0.5)
        .to("#sp-fc3",     { opacity: 1,         duration: 2.2, ease: "power2.out" }, 0.7)
        .to("#sp-eyebrow", { opacity: 1, y: 0,   duration: 0.8, ease: "power3.out" }, 0.6)
        .fromTo("#sp-tl1",
          { opacity: 0, rotateX: -90, y: 30, transformOrigin: "center bottom" },
          { opacity: 1, rotateX:   0, y:  0, duration: 1.1, ease: "back.out(1.5)" }, 1.1)
        .fromTo("#sp-tl2",
          { opacity: 0, rotateX:  90, y: -30, transformOrigin: "center top" },
          { opacity: 1, rotateX:   0, y:   0, duration: 1.1, ease: "back.out(1.5)" }, 1.35)
        .to("#sp-tl3",  { opacity: 1, duration: 0.9, ease: "power3.out" }, 1.9)
        .to("#sp-rule", { width: 320,  duration: 1.3, ease: "power3.inOut" }, 1.7)
        .to("#sp-msgs", { opacity: 1,  duration: 0.7, ease: "power2.out" }, 2.3)
        // Buttons were already rendered; animate them in from opacity 0
        .fromTo("#sp-btns",
          { opacity: 0, y: 16 },
          { opacity: 1, y:  0, duration: 0.9, ease: "back.out(1.7)" }, 2.5);

      // Ambient idle loops
      gsap.to("#sp-tl1", { rotateY:  4, duration: 7,   repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
      gsap.to("#sp-tl2", { rotateY: -4, duration: 8,   repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.5 });
      gsap.to("#sp-fc1", { y: "-=18",   duration: 5,   repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.2 });
      gsap.to("#sp-fc2", { y: "+=14",   duration: 6,   repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.8 });
      gsap.to("#sp-fc3", { y: "-=10",   duration: 4.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.9 });

      // First message
      gsap.fromTo("#sp-msg-0", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, delay: 2.6 });
    }, 50);

    return () => clearTimeout(tid);
  }, []);

  /* ── Message carousel ── */
  useEffect(() => {
    msgTimerRef.current = setInterval(() => {
      if (startedRef.current) return;
      setMsgIndex(prev => {
        const next = (prev + 1) % MESSAGES.length;
        gsap.to(`#sp-msg-${prev}`, { opacity: 0, y: -12, duration: 0.5, ease: "power2.in" });
        gsap.fromTo(`#sp-msg-${next}`,
          { opacity: 0, y: 12 },
          { opacity: 1, y:  0, duration: 0.7, delay: 0.35, ease: "power2.out" });
        return next;
      });
    }, 3400);
    return () => { if (msgTimerRef.current) clearInterval(msgTimerRef.current); };
  }, []);

  /* ── 3D tilt ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const root  = rootRef.current;
    const scene = sceneRef.current;
    if (!root || !scene) return;
    const { left, top, width, height } = root.getBoundingClientRect();
    const mx = (e.clientX - left) / width  - 0.5;
    const my = (e.clientY - top)  / height - 0.5;
    gsap.to(scene, {
      rotateY: mx * 9, rotateX: -my * 6,
      duration: 0.55, ease: "power2.out",
      transformPerspective: 1400, transformOrigin: "center center",
    });
    gsap.to("#sp-fc1", { x: mx *  28, duration: 0.8, ease: "power2.out" });
    gsap.to("#sp-fc2", { x: mx * -22, duration: 0.8, ease: "power2.out" });
    gsap.to("#sp-fc3", { x: mx *  16, duration: 0.8, ease: "power2.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    gsap.to(scene, { rotateY: 0, rotateX: 0, duration: 1.2, ease: "elastic.out(1,0.5)" });
  }, []);

  /* ── Button micro-interactions ── */
  const onEnterEnter  = () => gsap.to("#sp-enter-btn", { scale: 1.07, y: -3, rotateX: 12, duration: 0.35, ease: "back.out(2)",       transformPerspective: 600 });
  const onEnterLeave  = () => gsap.to("#sp-enter-btn", { scale: 1,    y:  0, rotateX:  0, duration: 0.5,  ease: "elastic.out(1,0.6)" });

  /* ── Progress rAF helper ── */
  const animateTo = (
    cur: { v: number }, target: number, dur: number,
    onTick: (v: number) => void, onDone: () => void
  ) => {
    const start = cur.v, t0 = performance.now();
    const step = (now: number) => {
      const p    = Math.min(1, (now - t0) / dur);
      const ease = p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p+2, 2)/2;
      cur.v = Math.round(start + (target - start) * ease);
      onTick(cur.v);
      p < 1 ? requestAnimationFrame(step) : (onTick(target), onDone());
    };
    requestAnimationFrame(step);
  };

  /* ── Enter click ── */
  const handleEnter = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    if (msgTimerRef.current) clearInterval(msgTimerRef.current);

    gsap.to("#sp-msgs", { opacity: 0, y: -8, duration: 0.4 });
    gsap.to("#sp-btns", { opacity: 0, y:  8, duration: 0.4 });

    setTimeout(() => {
      setShowProgress(true);

      // GSAP targets the element after React renders it
      requestAnimationFrame(() => {
        gsap.fromTo("#sp-progress", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
        gsap.to("#sp-prog-glow",    { opacity: 1, duration: 0.5, delay: 0.3 });
      });

      const cur = { v: 0 };
      const run = (i: number) => {
        if (i >= STAGES.length) { finishLoad(); return; }
        const s = STAGES[i];
        setStageLabel(s.name);
        gsap.fromTo("#sp-stage-lbl", { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.4 });
        animateTo(cur, s.end, s.duration, v => setStageProgress(v), () => setTimeout(() => run(i + 1), 160));
      };
      run(0);
    }, 500);
  };

  /* ── Finish ── */
  const finishLoad = () => {
    gsap.to("#sp-progress", {
      opacity: 0, y: -10, duration: 0.5,
      onComplete: () => {
        setShowProgress(false);
        setConfetti(Array.from({ length: 42 }, (_, i) => ({
          left:  Math.random() * 100,
          delay: Math.random() * 0.7,
          bg:    CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        })));
        setShowSuccess(true);

        requestAnimationFrame(() => {
          gsap.fromTo("#sp-success",
            { opacity: 0, scale: 0.6, y: 24 },
            { opacity: 1, scale: 1,   y:  0, duration: 0.9, ease: "back.out(1.8)" });
          gsap.to("#sp-tl1", { color: "#D4AF50", duration: 0.9, delay: 0.3 });
          gsap.fromTo("#sp-rule", { opacity: 1 }, { opacity: 0.2, duration: 0.5, yoyo: true, repeat: 3 });
        });

        setTimeout(() => onFinish?.(), 1800);
      },
    });
  };

  /* ── Render ── */
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={rootRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden", perspective: "1400px" }}
      >
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        />

        {/* Corner ornaments */}
        <div className="sp-corner sp-corner-tl" />
        <div className="sp-corner sp-corner-tr" />
        <div className="sp-corner sp-corner-bl" />
        <div className="sp-corner sp-corner-br" />

        {/* Deco lines */}
        <div className="sp-deco-l" />
        <div className="sp-deco-r" />

        {/* Background letterforms */}
        <div id="sp-fc1" className="sp-fc" style={{ fontSize: "clamp(100px,22vw,200px)", top: "2%",  left:  "1%" }}>W</div>
        <div id="sp-fc2" className="sp-fc" style={{ fontSize: "clamp(80px,16vw,150px)",  bottom:"4%", right: "2%" }}>P</div>
        <div id="sp-fc3" className="sp-fc" style={{ fontSize: "clamp(60px,10vw,110px)",  top: "18%", right: "6%" }}>&amp;</div>

        {/* 3D scene */}
        <div
          ref={sceneRef}
          style={{
            position: "relative", zIndex: 2,
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            transformStyle: "preserve-3d",
            padding: "60px 40px",
          }}
        >
          {/* Eyebrow */}
          <div
            id="sp-eyebrow"
            style={{
              fontFamily: "'Tenor Sans', sans-serif", fontSize: 11,
              letterSpacing: 6, textTransform: "uppercase",
              color: "#D4AF50", opacity: 0, marginBottom: 22,
            }}
          >
            Portfolio — Est. 2024
          </div>

          {/* Title */}
          <div style={{ textAlign: "center", transformStyle: "preserve-3d" }}>
            <span id="sp-tl1" className="sp-tl1" style={{ fontSize: "clamp(52px,9vw,88px)" }}>Welcome</span>
            <span id="sp-tl2" className="sp-tl2" style={{ fontSize: "clamp(52px,9vw,88px)" }}>Traveller</span>
            <span id="sp-tl3" className="sp-tl3" style={{ fontSize: "clamp(15px,2vw,21px)" }}>
              A curated space where design meets intention
            </span>
          </div>

          {/* Gold divider */}
          <div id="sp-rule" className="sp-rule" />

          {/* Message carousel */}
          <div
            id="sp-msgs"
            style={{
              height: 30, overflow: "hidden", position: "relative",
              width: "min(420px, 90vw)", textAlign: "center", opacity: 0,
            }}
          >
            {MESSAGES.map((msg, i) => (
              <div key={i} id={`sp-msg-${i}`} className="sp-msg">{msg}</div>
            ))}
          </div>

          {/* Buttons — always mounted so GSAP can target them */}
          {showBtns && (
            <div
              id="sp-btns"
              style={{
                display: "flex", gap: 16, alignItems: "center",
                marginTop: 36, opacity: 0,           // starts invisible; GSAP fades in
                flexWrap: "wrap", justifyContent: "center",
                pointerEvents: startedRef.current ? "none" : "auto",
              }}
            >
              <button
                id="sp-enter-btn"
                className="sp-enter-btn"
                onMouseEnter={onEnterEnter}
                onMouseLeave={onEnterLeave}
                onClick={handleEnter}
              >
                Enter
              </button>
              <button
                className="sp-ghost-btn"
                onClick={() => {
                  /* wire up to your about / work section */
                }}
              >
                Discover ↗
              </button>
            </div>
          )}

          {/* Progress bar */}
          {showProgress && (
            <div
              id="sp-progress"
              style={{ marginTop: 44, width: "min(320px,80vw)", opacity: 0 }}
            >
              <div className="sp-prog-track">
                <div className="sp-prog-fill"  style={{ width: `${stageProgress}%` }} />
                <div id="sp-prog-glow" className="sp-prog-glow" style={{ left: `${stageProgress}%`, opacity: 0 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                <span id="sp-stage-lbl" className="sp-stage-lbl">{stageLabel}</span>
                <span className="sp-pct-lbl">{stageProgress}%</span>
              </div>
            </div>
          )}

          {/* Success badge */}
          {showSuccess && (
            <div
              id="sp-success"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 44, opacity: 0 }}
            >
              <div className="sp-badge-ring">
                <div className="sp-burst" />
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M5 13L10.5 18.5L21 8" stroke="#D4AF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="sp-badge-txt">You are most welcome</span>
            </div>
          )}
        </div>

        {/* Confetti */}
        {confetti.length > 0 && (
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 40, overflow: "hidden" }}>
            {confetti.map((c, i) => (
              <span
                key={i}
                className="sp-confetti"
                style={{ left: `${c.left}%`, background: c.bg, animationDelay: `${c.delay}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SplashScreen;