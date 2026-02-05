import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MarqueeTextProps {
  text: string;
  speed?: number;
  className?: string;
  direction?: 'left' | 'right';
}

const MarqueeText = ({ 
  text, 
  speed = 50, 
  className = '',
  direction = 'left' 
}: MarqueeTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return;

    const inner = innerRef.current;
    const width = inner.offsetWidth / 2;
    
    gsap.set(inner, { x: direction === 'left' ? 0 : -width });
    
    gsap.to(inner, {
      x: direction === 'left' ? -width : 0,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });
  }, [speed, direction]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-8 flex items-center gap-8">
            <span className="font-serif text-7xl font-bold text-foreground/5 md:text-9xl lg:text-[12rem]">
              {text}
            </span>
            <span className="text-primary/20">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeText;
