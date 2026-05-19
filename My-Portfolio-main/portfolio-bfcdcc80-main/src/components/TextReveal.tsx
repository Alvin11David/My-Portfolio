import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  scrub?: boolean;
}

const TextReveal = ({ children, className = '', delay = 0, scrub = false }: TextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');
    
    if (scrub) {
      gsap.fromTo(chars, 
        { 
          opacity: 0.1,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    } else {
      gsap.fromTo(chars,
        {
          opacity: 0,
          y: 100,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.02,
          delay,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [delay, scrub]);

  const splitText = children.split('').map((char, i) => (
    <span 
      key={i} 
      className="char inline-block"
      style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div ref={containerRef} className={`perspective-1000 ${className}`}>
      <span ref={textRef} className="preserve-3d inline-block">
        {splitText}
      </span>
    </div>
  );
};

export default TextReveal;
