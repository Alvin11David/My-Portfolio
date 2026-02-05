import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Torus,
  Environment,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";

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
function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4aa" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />

      <CameraController />

      <MorphingSphere position={[0, 0, 0]} color="#00d4aa" />
      <GlowingRing position={[0, 0, 0]} color="#a855f7" />

      <ParticleField />
      <Stars
        radius={50}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <Environment preset="night" />
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
