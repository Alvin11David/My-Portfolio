import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Custom hook for scroll-triggered animations
export const useScrollTrigger = (
  ref: RefObject<HTMLElement>,
  animation: (element: HTMLElement, tl: gsap.core.Timeline) => void,
  options?: ScrollTrigger.Vars
) => {
  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    });

    animation(ref.current, tl);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [ref, animation, options]);
};

// Custom hook for parallax effect
export const useParallax = (
  ref: RefObject<HTMLElement>,
  speed: number = 0.5
) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [ref, speed]);
};

// Text split animation utility
export const splitTextAnimation = (
  element: HTMLElement,
  options?: {
    stagger?: number;
    duration?: number;
    ease?: string;
    y?: number;
  }
) => {
  const text = element.textContent || '';
  element.innerHTML = '';
  
  const chars = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = `translateY(${options?.y || 50}px)`;
    element.appendChild(span);
    return span;
  });

  return gsap.to(chars, {
    opacity: 1,
    y: 0,
    duration: options?.duration || 0.6,
    stagger: options?.stagger || 0.02,
    ease: options?.ease || 'power3.out',
  });
};

// Magnetic effect for buttons/elements
export const useMagnetic = (ref: RefObject<HTMLElement>, strength: number = 0.5) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength]);
};

// Reveal animation for sections
export const createRevealAnimation = (element: HTMLElement) => {
  gsap.set(element, { opacity: 0, y: 100 });
  
  return gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
};

// Stagger children animation
export const staggerReveal = (
  parent: HTMLElement,
  childSelector: string,
  options?: {
    stagger?: number;
    duration?: number;
    y?: number;
  }
) => {
  const children = parent.querySelectorAll(childSelector);
  
  gsap.set(children, { opacity: 0, y: options?.y || 60 });
  
  return gsap.to(children, {
    opacity: 1,
    y: 0,
    duration: options?.duration || 0.8,
    stagger: options?.stagger || 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: parent,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
};

export { gsap, ScrollTrigger };
