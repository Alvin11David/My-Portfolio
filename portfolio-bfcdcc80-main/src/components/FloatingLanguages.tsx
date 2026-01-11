import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Box, Torus, Icosahedron, Octahedron, Environment } from "@react-three/drei";
import * as THREE from "three";
import { 
  SiReact, SiTypescript, SiJavascript, SiPython, SiNodedotjs, 
  SiTailwindcss, SiNextdotjs, SiFigma, SiGit, SiDocker,
  SiPostgresql, SiGraphql, SiPrisma, SiSupabase, SiStripe
} from "react-icons/si";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Language {
  name: string;
  icon: React.ReactNode;
  color: string;
  level: number;
}

const languages: Language[] = [
  { name: "React", icon: <SiReact />, color: "#61DAFB", level: 95 },
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", level: 92 },
  { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", level: 94 },
  { name: "Python", icon: <SiPython />, color: "#3776AB", level: 85 },
  { name: "Node.js", icon: <SiNodedotjs />, color: "#339933", level: 88 },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff", level: 90 },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4", level: 94 },
  { name: "Figma", icon: <SiFigma />, color: "#F24E1E", level: 88 },
  { name: "Git", icon: <SiGit />, color: "#F05032", level: 90 },
  { name: "Docker", icon: <SiDocker />, color: "#2496ED", level: 82 },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1", level: 85 },
  { name: "GraphQL", icon: <SiGraphql />, color: "#E10098", level: 87 },
];

// 3D Floating geometry component
function FloatingGeometry({ position, color, geometry }: { position: [number, number, number]; color: string; geometry: 'sphere' | 'torus' | 'icosahedron' | 'octahedron' }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const GeometryComponent = {
    sphere: Sphere,
    torus: Torus,
    icosahedron: Icosahedron,
    octahedron: Octahedron,
  }[geometry];

  const args = geometry === 'torus' ? [0.5, 0.2, 16, 32] : geometry === 'sphere' ? [0.5, 32, 32] : [0.5];

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered ? 1.2 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <GeometryComponent args={args as any} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// Central rotating orb
function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color="#00d4aa"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          emissive="#00d4aa"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Orbiting particles
function OrbitingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;
  
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 3 + Math.random() * 2;
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
    
    colors[i * 3] = 0;
    colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
    colors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
  }
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// 3D Scene
function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4aa" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      <spotLight position={[0, 10, 0]} intensity={0.8} color="#ffffff" angle={0.5} />
      
      <CentralOrb />
      <OrbitingParticles />
      
      <FloatingGeometry position={[-3, 2, -2]} color="#00d4aa" geometry="torus" />
      <FloatingGeometry position={[3, -1, -3]} color="#a855f7" geometry="icosahedron" />
      <FloatingGeometry position={[-2, -2, -1]} color="#3178c6" geometry="octahedron" />
      <FloatingGeometry position={[2.5, 1.5, -2]} color="#f97316" geometry="sphere" />
      
      <Environment preset="night" />
    </>
  );
}

// Language card component with hover effects
function LanguageCard({ language, index }: { language: Language; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      className="language-card group relative"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        '--accent-color': language.color 
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:bg-card/80">
        {/* Glow effect */}
        <div 
          className="absolute -inset-px rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle at center, ${language.color}40, transparent)` }}
        />
        
        {/* Icon container with 3D effect */}
        <div 
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110"
          style={{ 
            background: `linear-gradient(135deg, ${language.color}20, transparent)`,
            boxShadow: isHovered ? `0 0 40px ${language.color}40` : 'none'
          }}
        >
          {/* Rotating ring */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `conic-gradient(from 0deg, ${language.color}, transparent, ${language.color})`,
              animation: isHovered ? 'spin 3s linear infinite' : 'none',
            }}
          />
          <div className="absolute inset-[2px] rounded-2xl bg-card" />
          
          <span 
            className="relative z-10 text-4xl transition-all duration-500 group-hover:scale-125"
            style={{ color: language.color }}
          >
            {language.icon}
          </span>
        </div>

        {/* Name */}
        <span className="font-semibold tracking-wide">{language.name}</span>

        {/* Level bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div 
            className="language-bar h-full rounded-full transition-all duration-1000"
            style={{ 
              width: `${language.level}%`,
              background: `linear-gradient(90deg, ${language.color}, ${language.color}80)`
            }}
          />
        </div>
        
        {/* Level percentage */}
        <span className="text-sm font-bold" style={{ color: language.color }}>
          {language.level}%
        </span>
      </div>
    </div>
  );
}

const FloatingLanguages = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header animation
    if (headerRef.current) {
      const elements = headerRef.current.querySelectorAll('.animate-header');
      gsap.from(elements, {
        opacity: 0,
        y: 100,
        rotateX: -30,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Cards staggered animation
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.language-card');
      gsap.from(cards, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotateY: -20,
        stagger: {
          each: 0.1,
          from: "random"
        },
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate bars
      const bars = cardsContainerRef.current.querySelectorAll('.language-bar');
      gsap.fromTo(bars, 
        { width: '0%' },
        {
          width: (i, target) => target.style.width,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen overflow-hidden bg-background py-20 lg:py-32"
    >
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 opacity-60">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene3D />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-background to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6" ref={containerRef}>
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center" style={{ perspective: '1000px' }}>
          <span className="animate-header mb-6 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.4em] text-primary">
            <span className="h-px w-8 bg-primary" />
            Tech Stack
            <span className="h-px w-8 bg-primary" />
          </span>
          <h2 className="animate-header font-serif text-5xl font-bold md:text-6xl lg:text-7xl">
            Languages & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="animate-header mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Mastering the tools that bring ideas to life
          </p>
        </div>

        {/* Languages grid */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6"
        >
          {languages.map((language, index) => (
            <LanguageCard key={language.name} language={language} index={index} />
          ))}
        </div>

        {/* Floating decorative elements */}
        <div className="pointer-events-none absolute left-10 top-20 h-40 w-40 animate-float rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute right-10 bottom-20 h-60 w-60 animate-float rounded-full bg-glow-secondary/10 blur-3xl" style={{ animationDelay: '2s' }} />
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default FloatingLanguages;
