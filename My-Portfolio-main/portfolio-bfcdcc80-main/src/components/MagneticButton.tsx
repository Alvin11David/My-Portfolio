import { useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
}

const MagneticButton = ({ 
  children, 
  className = '', 
  strength = 0.4,
  href,
  onClick 
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || !contentRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(buttonRef.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power3.out',
    });
    
    gsap.to(contentRef.current, {
      x: x * strength * 0.5,
      y: y * strength * 0.5,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current || !contentRef.current) return;
    
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });
    
    gsap.to(contentRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      ref={buttonRef as any}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-button inline-block ${className}`}
    >
      <span ref={contentRef} className="inline-block">
        {children}
      </span>
    </Component>
  );
};

export default MagneticButton;
