import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorTextEl = cursorTextRef.current;
    
    if (!cursor || !cursorDot || !cursorTextEl) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out',
      });
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const onMouseEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      
      const text = target.dataset.cursorText || '';
      setCursorText(text);
      
      gsap.to(cursor, {
        scale: text ? 2.5 : 1.5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeaveInteractive = () => {
      setIsHovering(false);
      setCursorText('');
      
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseEnterHidden = () => {
      setIsHidden(true);
    };

    const onMouseLeaveHidden = () => {
      setIsHidden(false);
    };

    // Add listeners
    window.addEventListener('mousemove', onMouseMove);
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    // Hidden cursor elements
    const hiddenElements = document.querySelectorAll('[data-cursor-hide]');
    hiddenElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterHidden);
      el.addEventListener('mouseleave', onMouseLeaveHidden);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
      hiddenElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterHidden);
        el.removeEventListener('mouseleave', onMouseLeaveHidden);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 mix-blend-difference transition-opacity duration-300 md:block ${
          isHidden ? 'opacity-0' : 'opacity-100'
        } ${isHovering ? 'bg-primary/10' : ''}`}
      >
        <div
          ref={cursorTextRef}
          className={`absolute inset-0 flex items-center justify-center text-[10px] font-medium uppercase tracking-wider text-primary transition-opacity duration-200 ${
            cursorText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {cursorText}
        </div>
      </div>
      
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary mix-blend-difference transition-opacity duration-300 md:block ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </>
  );
};

export default CustomCursor;
