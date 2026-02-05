import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Torus,
  Environment,
  Stars,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

// Mind-blowing crystal structure that morphs and pulses
function CrystalStructure() {
  const groupRef = useRef<THREE.Group>(null);
  const crystalsRef = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }

    crystalsRef.current.forEach((crystal, i) => {
      if (crystal) {
        crystal.rotation.x = state.clock.elapsedTime * (0.5 + i * 0.1);
        crystal.rotation.z = state.clock.elapsedTime * (0.3 + i * 0.15);
        crystal.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2);
      }
    });
  });

  const crystalPositions = [
    [0, 0, 0],
    [2, 1, -1],
    [-2, -1, 1],
    [1, -2, -0.5],
    [-1, 2, 0.5],
  ];

  const crystalColors = ["#00d4aa", "#a855f7", "#ff6b6b", "#ffd93d", "#6bcf7f"];

  return (
    <group ref={groupRef}>
      {crystalPositions.map((pos, i) => (
        <Float key={i} speed={2 + i * 0.5} rotationIntensity={1 + i * 0.3} floatIntensity={1 + i * 0.2}>
          <mesh
            ref={(el) => (crystalsRef.current[i] = el)}
            position={pos as [number, number, number]}
          >
            <octahedronGeometry args={[0.8 + i * 0.2, 0]} />
            <MeshDistortMaterial
              color={crystalColors[i]}
              distort={0.2 + i * 0.1}
              speed={1 + i * 0.3}
              roughness={0.1}
              metalness={0.9}
              emissive={crystalColors[i]}
              emissiveIntensity={0.3 + i * 0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Dynamic particle system that forms text shapes
function TextParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const textRef = useRef<THREE.Group>(null);

  // Create particles that form "WALUUBE" text
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);

    // Create text-forming particle positions
    for (let i = 0; i < 2000; i++) {
      // Create a flowing text shape
      const t = (i / 2000) * Math.PI * 4;
      const radius = 3 + Math.sin(t * 3) * 0.5;

      positions[i * 3] = Math.cos(t) * radius + Math.sin(t * 2) * 0.8;
      positions[i * 3 + 1] = Math.sin(t) * radius * 0.7 + Math.cos(t * 3) * 0.3;
      positions[i * 3 + 2] = Math.sin(t * 1.5) * 0.5 + Math.cos(t * 4) * 0.2;

      // Dynamic colors based on position
      const hue = (t / (Math.PI * 4)) * 0.8 + 0.1;
      const color = new THREE.Color();
      color.setHSL(hue, 0.8, 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;

      // Animate particle positions for flowing effect
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 2000; i++) {
        const t = (i / 2000) * Math.PI * 4 + state.clock.elapsedTime * 0.5;
        positions[i * 3 + 1] += Math.sin(t + state.clock.elapsedTime) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={2000}
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
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating geometric elements with complex animations
function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * (1 + i * 0.2) + i) * 0.002;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Large floating torus */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[4, 2, -2]}>
          <torusGeometry args={[1.2, 0.3, 16, 100]} />
          <MeshDistortMaterial
            color="#00d4aa"
            distort={0.4}
            speed={1.5}
            roughness={0.2}
            metalness={0.8}
            emissive="#00d4aa"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Morphing sphere */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-3, -1, 1]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial
            color="#a855f7"
            distort={0.6}
            speed={2}
            roughness={0.1}
            metalness={0.9}
            emissive="#a855f7"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Icosahedron */}
      <Float speed={2.5} rotationIntensity={3} floatIntensity={1.5}>
        <mesh position={[1, -3, 0]}>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshStandardMaterial
            color="#ff6b6b"
            emissive="#ff6b6b"
            emissiveIntensity={0.4}
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      </Float>

      {/* Dodecahedron */}
      <Float speed={1.8} rotationIntensity={2.5} floatIntensity={1.2}>
        <mesh position={[-1, 3, -1]}>
          <dodecahedronGeometry args={[0.5]} />
          <MeshDistortMaterial
            color="#ffd93d"
            distort={0.3}
            speed={1.8}
            roughness={0.3}
            metalness={0.7}
            emissive="#ffd93d"
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Animated energy rings with pulsing effects
function EnergyRings() {
  const ringsRef = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z = state.clock.elapsedTime * (0.5 + i * 0.2);
        ring.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + i * Math.PI * 0.5) * 0.3);
      }
    });
  });

  return (
    <>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          position={[0, 0, 0]}
          rotation={[Math.PI * 0.5, 0, 0]}
        >
          <torusGeometry args={[2 + i * 1.5, 0.05, 8, 64]} />
          <meshBasicMaterial
            color={["#00d4aa", "#a855f7", "#ff6b6b"][i]}
            transparent
            opacity={0.6 - i * 0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  );
}

// Morphing sphere with dynamic distortion
function MorphingSphere({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (materialRef.current) {
      materialRef.current.distort =
        0.3 + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          ref={materialRef}
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

// Glowing torus ring
function GlowingRing({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[1.2, 0.1, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

// Particle field
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = new THREE.Color();
      color.setHSL(0.5 + Math.random() * 0.1, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
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
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Mind-blowing geometric structure for contact section
function ContactGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const octahedronRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }

    if (octahedronRef.current) {
      octahedronRef.current.rotation.x = -state.clock.elapsedTime * 0.8;
      octahedronRef.current.rotation.y = state.clock.elapsedTime * 0.6;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 1.2;
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.9;
    }

    if (sphereRef.current) {
      sphereRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 2) * 0.5;
      sphereRef.current.position.x =
        Math.cos(state.clock.elapsedTime * 1.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central octahedron */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <mesh ref={octahedronRef}>
          <octahedronGeometry args={[1.5, 0]} />
          <MeshDistortMaterial
            color="#00d4aa"
            distort={0.2}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            emissive="#00d4aa"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Orbiting torus */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={0.8}>
        <mesh ref={torusRef} position={[3, 0, 0]}>
          <torusGeometry args={[0.8, 0.2, 16, 100]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.4}
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      </Float>

      {/* Floating sphere */}
      <Float speed={4} rotationIntensity={3} floatIntensity={2}>
        <mesh ref={sphereRef} position={[-2, 1, 1]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <MeshDistortMaterial
            color="#ff6b6b"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#ff6b6b"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Connecting lines */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, 0, 3, 0, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00d4aa" opacity={0.6} transparent />
      </line>

      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, 0, -2, 1, 1])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ff6b6b" opacity={0.6} transparent />
      </line>
    </group>
  );
}

// Enhanced particle system for contact section
function ContactParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 800;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Create a spherical distribution
      const radius = Math.random() * 8 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Color gradient based on position
      const hue = (phi / Math.PI) * 0.3 + 0.5; // Green to purple range
      const color = new THREE.Color();
      color.setHSL(hue, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.03;
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
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Contact scene with mind-blowing geometry
function ContactScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00d4aa" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#a855f7" />
      <pointLight position={[0, 0, 8]} intensity={0.8} color="#ff6b6b" />

      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        color="#ffffff"
        castShadow
      />

      <ContactGeometry />
      <ContactParticles />
      <Stars
        radius={30}
        depth={30}
        count={1500}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      <Environment preset="sunset" />
    </>
  );
}

// Mouse-reactive camera
function CameraController() {
  const { camera } = useThree();

  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main 3D scene component for hero/background
// Mind-blowing Hero Scene with dynamic text-forming particles and morphing crystals
function HeroScene() {
  return (
    <>
      {/* Advanced lighting setup */}
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00d4aa" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#a855f7" />
      <pointLight position={[0, 0, 8]} intensity={1} color="#ff6b6b" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.6}
        penumbra={0.5}
        intensity={1.5}
        color="#ffffff"
        castShadow
      />

      {/* Interactive camera controller */}
      <CameraController />

      {/* Main morphing crystal structure */}
      <CrystalStructure />

      {/* Dynamic text-forming particle system */}
      <TextParticles />

      {/* Floating geometric elements */}
      <FloatingGeometry />

      {/* Enhanced particle field */}
      <ParticleField />

      {/* Animated energy rings */}
      <EnergyRings />

      {/* Distant stars for depth */}
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={6}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* Atmospheric environment */}
      <Environment preset="sunset" />
    </>
  );
}

interface Scene3DProps {
  variant?: "hero" | "skills" | "minimal" | "contact";
  className?: string;
}

const Scene3D = ({ variant = "hero", className = "" }: Scene3DProps) => {
  const renderScene = () => {
    switch (variant) {
      case "contact":
        return <ContactScene />;
      case "hero":
      default:
        return <HeroScene />;
    }
  };

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {renderScene()}
      </Canvas>
    </div>
  );
};

export default Scene3D;
