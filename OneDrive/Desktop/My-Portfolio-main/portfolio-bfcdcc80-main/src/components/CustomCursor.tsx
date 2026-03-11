import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
  life: number;
}

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [mousePos, setMousePos] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const bubbleIdRef = useRef(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorTextEl = cursorTextRef.current;

    if (!cursor || !cursorDot || !cursorTextEl) return;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePos({ x, y });

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.to(cursorDot, {
        x: x,
        y: y,
        duration: 0.1,
      });
    };

    const onMouseEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);

      const text = target.dataset.cursorText || "";
      setCursorText(text);

      gsap.to(cursor, {
        scale: text ? 2.5 : 1.5,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeaveInteractive = () => {
      setIsHovering(false);
      setCursorText("");

      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseEnterHidden = () => {
      setIsHidden(true);
    };

    const onMouseLeaveHidden = () => {
      setIsHidden(false);
    };

    // Add listeners
    window.addEventListener("mousemove", onMouseMove);

    // Scroll bubble effect
    const onWheel = (e: WheelEvent) => {
      // Create bubbles at cursor position with randomness
      const newBubble: Bubble = {
        id: bubbleIdRef.current++,
        x: mousePos.x + (Math.random() - 0.5) * 100, // Random offset
        y: mousePos.y + (Math.random() - 0.5) * 100,
        size: Math.random() * 20 + 10, // Size between 10-30px
        velocityX: (Math.random() - 0.5) * 2, // Random initial velocity
        velocityY: (Math.random() - 0.5) * 2,
        life: 1, // Full life
      };

      setBubbles((prev) => [...prev, newBubble]);
    };

    window.addEventListener("wheel", onWheel);

    // Animation loop for bubble physics
    const animateBubbles = () => {
      setBubbles((prevBubbles) =>
        prevBubbles
          .map((bubble) => {
            // Calculate distance to cursor
            const dx = mousePos.x - bubble.x;
            const dy = mousePos.y - bubble.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Apply attraction force (weaker for larger bubbles)
            const force = Math.min(0.5, 50 / (distance + 1)) / bubble.size;
            const accelX = dx * force * 0.01;
            const accelY = dy * force * 0.01;

            // Update velocity with damping
            const newVelocityX = (bubble.velocityX + accelX) * 0.95;
            const newVelocityY = (bubble.velocityY + accelY) * 0.95;

            // Update position
            const newX = bubble.x + newVelocityX;
            const newY = bubble.y + newVelocityY;

            // Decrease life
            const newLife = bubble.life - 0.02;

            return {
              ...bubble,
              x: newX,
              y: newY,
              velocityX: newVelocityX,
              velocityY: newVelocityY,
              life: newLife,
            };
          })
          .filter((bubble) => bubble.life > 0),
      );

      animationRef.current = requestAnimationFrame(animateBubbles);
    };

    animateBubbles();

    // Interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor-hover]",
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    // Hidden cursor elements
    const hiddenElements = document.querySelectorAll("[data-cursor-hide]");
    hiddenElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterHidden);
      el.addEventListener("mouseleave", onMouseLeaveHidden);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("wheel", onWheel);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      hiddenElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterHidden);
        el.removeEventListener("mouseleave", onMouseLeaveHidden);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 mix-blend-difference transition-opacity duration-300 md:block ${
          isHidden ? "opacity-0" : "opacity-100"
        } ${isHovering ? "bg-primary/10" : ""}`}
      >
        <div
          ref={cursorTextRef}
          className={`absolute inset-0 flex items-center justify-center text-[10px] font-medium uppercase tracking-wider text-primary transition-opacity duration-200 ${
            cursorText ? "opacity-100" : "opacity-0"
          }`}
        >
          {cursorText}
        </div>
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary mix-blend-difference transition-opacity duration-300 md:block ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Scroll bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="pointer-events-none fixed z-[9998] rounded-full"
          style={{
            left: bubble.x - bubble.size / 2,
            top: bubble.y - bubble.size / 2,
            width: bubble.size,
            height: bubble.size,
            opacity: bubble.life,
            transform: `scale(${0.5 + bubble.life * 0.5})`,
          }}
        >
          {/* Outer glassy bubble */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0.05) 100%)",
              backdropFilter: "blur(1px)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.6),
                0 2px 4px rgba(0,0,0,0.1),
                0 0 20px rgba(255,255,255,0.3)
              `,
            }}
          />

          {/* Inner highlight/reflection */}
          <div
            className="absolute rounded-full bg-white"
            style={{
              width: bubble.size * 0.3,
              height: bubble.size * 0.3,
              top: bubble.size * 0.2,
              left: bubble.size * 0.25,
              opacity: 0.9,
              filter: "blur(0.5px)",
            }}
          />

          {/* Secondary highlight */}
          <div
            className="absolute rounded-full bg-white"
            style={{
              width: bubble.size * 0.15,
              height: bubble.size * 0.15,
              top: bubble.size * 0.4,
              left: bubble.size * 0.6,
              opacity: 0.6,
              filter: "blur(0.2px)",
            }}
          />
        </div>
      ))}
    </>
  );
};

export default CustomCursor;
