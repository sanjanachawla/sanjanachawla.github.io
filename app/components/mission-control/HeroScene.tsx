"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group, Mesh, Points } from "three";
import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  Texture,
  Vector3,
} from "three";

type HeroSceneProps = {
  missionEntered: boolean;
};

type SceneSystemProps = HeroSceneProps & {
  isCompact: boolean;
};

const SATELLITE_ORBIT_RADIUS = 2.48;
const SATELLITE_ORBIT_VERTICAL_OFFSET = -0.68;

export function HeroScene({ missionEntered }: HeroSceneProps) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateCompactMode = () => setIsCompact(mediaQuery.matches);

    updateCompactMode();
    mediaQuery.addEventListener("change", updateCompactMode);

    return () => {
      mediaQuery.removeEventListener("change", updateCompactMode);
    };
  }, []);

  return (
    <div className="absolute inset-x-0 top-0 z-0 h-[21.5rem] sm:h-[23rem] md:inset-0 md:h-auto lg:left-[31%]">
      <Canvas
        camera={{ position: [0.55, 0.75, 7.85], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#02050c"]} />
        <fog attach="fog" args={["#02050c", 8, 18]} />
        <ambientLight intensity={0.22} />
        <directionalLight position={[4, 2.5, 4]} intensity={3.65} color="#d9f7ff" />
        <pointLight position={[-4, -2, 3]} intensity={1.35} color="#0ea5e9" />
        <StarField radius={80} depth={50} count={2400} speed={0.35} />
        <MissionCamera isCompact={isCompact} missionEntered={missionEntered} />
        <EarthSystem isCompact={isCompact} missionEntered={missionEntered} />
      </Canvas>
    </div>
  );
}

function MissionCamera({ isCompact, missionEntered }: SceneSystemProps) {
  useFrame(({ camera, clock }) => {
    const elapsed = clock.getElapsedTime();
    const targetZ = isCompact ? 9.25 : missionEntered ? 7.1 : 7.85;
    const baseX = isCompact ? 0 : 0.55;
    const baseY = isCompact ? 0.5 : 0.75;
    const lookAtX = isCompact ? 0.02 : 0.32;
    const lookAtY = isCompact ? 0.08 : -0.08;

    camera.position.x = baseX + Math.sin(elapsed * 0.08) * (isCompact ? 0.08 : 0.18);
    camera.position.y = baseY + Math.sin(elapsed * 0.11) * (isCompact ? 0.05 : 0.08);
    camera.position.z += (targetZ - camera.position.z) * 0.025;
    camera.lookAt(lookAtX, lookAtY, 0);
  });

  return null;
}

function StarField({
  radius,
  depth,
  count,
  speed,
}: {
  radius: number;
  depth: number;
  count: number;
  speed: number;
}) {
  const starsRef = useRef<Points>(null);
  const positions = useMemo(() => {
    const result = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const distance = radius - seededRandom(i * 3 + 1) * depth;
      const theta = seededRandom(i * 3 + 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 3) - 1);
      const index = i * 3;

      result[index] = Math.sin(phi) * Math.cos(theta) * distance;
      result[index + 1] = Math.sin(phi) * Math.sin(theta) * distance;
      result[index + 2] = Math.cos(phi) * distance;
    }

    return result;
  }, [count, depth, radius]);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * speed * 0.018;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d9f7ff"
        depthWrite={false}
        opacity={0.82}
        size={0.08}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function EarthSystem({ isCompact, missionEntered }: SceneSystemProps) {
  const groupRef = useRef<Group>(null);
  const earthRef = useRef<Mesh>(null);
  const cloudRef = useRef<Mesh>(null);
  const [orbitHot, setOrbitHot] = useState(false);
  const earthTexture = useMemo(() => createEarthTexture(), []);
  const cloudTexture = useMemo(() => createCloudTexture(), []);

  useEffect(() => {
    return () => {
      earthTexture.dispose();
      cloudTexture.dispose();
    };
  }, [cloudTexture, earthTexture]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(elapsed * 0.07) * 0.08;
      groupRef.current.rotation.x = -0.18 + Math.sin(elapsed * 0.05) * 0.035;
      groupRef.current.position.x = isCompact ? 0 : missionEntered ? 0.06 : 0.42;
      groupRef.current.position.y = isCompact ? 0.08 : -0.08;
      groupRef.current.scale.setScalar(isCompact ? 0.88 : 1);
    }

    if (earthRef.current) {
      earthRef.current.rotation.y = elapsed * 0.08;
    }

    if (cloudRef.current) {
      cloudRef.current.rotation.y = elapsed * 0.105;
    }
  });

  return (
    <group ref={groupRef} position={[0.42, -0.08, 0]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.9, 96, 96]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.82}
          metalness={0}
          emissive="#08235a"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.94, 96, 96]} />
        <meshStandardMaterial
          map={cloudTexture}
          transparent
          opacity={0.42}
          depthWrite={false}
          roughness={0.9}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.12, 96, 96]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.18}
          side={BackSide}
          blending={AdditiveBlending}
        />
      </mesh>
      <OrbitingSatellite orbitHot={orbitHot} setOrbitHot={setOrbitHot} />
    </group>
  );
}

function OrbitingSatellite({
  orbitHot,
  setOrbitHot,
}: {
  orbitHot: boolean;
  setOrbitHot: (value: boolean) => void;
}) {
  const satelliteRef = useRef<Group>(null);
  const satelliteBodyRef = useRef<Group>(null);
  const orbitRef = useRef<Group>(null);
  const scaleTarget = useMemo(() => new Vector3(1, 1, 1), []);
  const labelTexture = useMemo(() => createSatelliteLabelTexture(), []);
  const orbitPositions = useMemo(() => {
    const result = new Float32Array(181 * 3);

    for (let i = 0; i <= 180; i += 1) {
      const angle = (i / 180) * Math.PI * 2;
      const index = i * 3;

      result[index] = Math.cos(angle) * SATELLITE_ORBIT_RADIUS;
      result[index + 1] = Math.sin(angle) * SATELLITE_ORBIT_RADIUS;
      result[index + 2] = 0;
    }

    return result;
  }, []);

  useEffect(() => {
    return () => {
      labelTexture.dispose();
    };
  }, [labelTexture]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const angle = elapsed * 0.28;

    if (orbitRef.current) {
      orbitRef.current.rotation.x = 1.05;
      orbitRef.current.rotation.z = -0.38 + Math.sin(elapsed * 0.08) * 0.08;
    }

    if (satelliteRef.current) {
      satelliteRef.current.position.set(
        Math.cos(angle) * SATELLITE_ORBIT_RADIUS,
        Math.sin(angle) * SATELLITE_ORBIT_RADIUS,
        0,
      );
      satelliteRef.current.rotation.set(0.4, -angle, 0.2);
      const scale = orbitHot ? 1.02 : 0.88;
      scaleTarget.set(scale, scale, scale);
      satelliteRef.current.scale.lerp(scaleTarget, 0.12);
    }

    if (satelliteBodyRef.current) {
      satelliteBodyRef.current.position.y = Math.sin(elapsed * 2) * 0.025;
      satelliteBodyRef.current.rotation.x = Math.sin(elapsed * 2) * 0.15;
      satelliteBodyRef.current.rotation.z = Math.cos(elapsed * 1.4) * 0.08;
    }
  });

  return (
    <group ref={orbitRef} position={[0, SATELLITE_ORBIT_VERTICAL_OFFSET, 0]}>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[orbitPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={orbitHot ? "#a5f3fc" : "#22d3ee"}
          linewidth={orbitHot ? 2.2 : 1.15}
          opacity={orbitHot ? 0.95 : 0.48}
          transparent
        />
      </line>
      <group
        ref={satelliteRef}
        onPointerOver={(event) => {
          event.stopPropagation();
          setOrbitHot(true);
        }}
        onPointerOut={() => setOrbitHot(false)}
      >
        <group ref={satelliteBodyRef}>
          <mesh>
            <boxGeometry args={[0.28, 0.18, 0.2]} />
            <meshStandardMaterial color="#dff8ff" metalness={0.65} roughness={0.28} />
          </mesh>
          <mesh position={[-0.28, 0, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.38, 0.025, 0.16]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0284c7" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0.28, 0, 0]}>
            <boxGeometry args={[0.38, 0.025, 0.16]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0284c7" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <coneGeometry args={[0.08, 0.22, 16]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.5} roughness={0.32} />
          </mesh>
          {orbitHot ? (
            <sprite position={[0, 0.45, 0]} scale={[1.05, 0.26, 1]}>
              <spriteMaterial map={labelTexture} transparent depthWrite={false} />
            </sprite>
          ) : null}
        </group>
      </group>
    </group>
  );
}

function createEarthTexture(): Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new Texture();
  }

  const ocean = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  ocean.addColorStop(0, "#09204a");
  ocean.addColorStop(0.45, "#0d5f9f");
  ocean.addColorStop(1, "#06152d");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 0.95;
  const landMasses = [
    [260, 310, 210, 88, -0.2],
    [420, 485, 180, 110, 0.28],
    [820, 285, 270, 115, 0.08],
    [960, 465, 210, 82, -0.3],
    [1300, 350, 310, 130, 0.12],
    [1590, 530, 180, 95, 0.3],
    [1760, 255, 145, 72, -0.18],
  ];

  for (const [x, y, width, height, rotation] of landMasses) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    const grd = ctx.createRadialGradient(0, 0, 20, 0, 0, width);
    grd.addColorStop(0, "#4b9275");
    grd.addColorStop(0.65, "#3d6f4c");
    grd.addColorStop(1, "#1f4a2e");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.ellipse(0, 0, width, height, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "#9bdcff";
  for (let y = 90; y < canvas.height; y += 120) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= canvas.width; x += 90) {
      ctx.lineTo(x, y + Math.sin(x * 0.012 + y) * 16);
    }
    ctx.stroke();
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = "srgb";
  return texture;
}

function createCloudTexture(): Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new Texture();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 90; i += 1) {
    const x = (i * 173) % canvas.width;
    const y = 70 + ((i * 89) % 360);
    const width = 80 + ((i * 37) % 180);
    const height = 10 + ((i * 17) % 34);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(i) * 0.6);
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, width);
    gradient.addColorStop(0, "rgba(255,255,255,0.78)");
    gradient.addColorStop(0.55, "rgba(230,245,255,0.32)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(0, 0, width, height, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = "srgb";
  return texture;
}

function createSatelliteLabelTexture(): Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new Texture();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(8,47,73,0.72)";
  ctx.fillRect(8, 8, canvas.width - 16, canvas.height - 16);
  ctx.strokeStyle = "rgba(165,243,252,0.78)";
  ctx.lineWidth = 3;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
  ctx.fillStyle = "#cffafe";
  ctx.font = "600 34px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SAT-01 locked", canvas.width / 2, canvas.height / 2 + 2);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = "srgb";
  return texture;
}
