'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Billboard,
  Html,
  Image,
  OrbitControls,
  useTexture,
} from '@react-three/drei';
import { Group } from 'three';
import { useRef } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { useTheme } from 'next-themes';

type Logo = {
  name: string;
  image: string;
};

const logos: Logo[] = [
  {
    name: 'Bootstrap',
    image: '/icons/mastery/bootstrap.png',
  },
  {
    name: 'Codeigniter',
    image: '/icons/mastery/codeigniter.png',
  },
  {
    name: 'Next',
    image: '/icons/mastery/next.png',
  },
  {
    name: 'Express',
    image: '/icons/mastery/express.png',
  },
  // {
  //   name: 'React',
  //   image: '/icons/mastery/react.png',
  // },
  // {
  //   name: 'Laravel',
  //   image: '/icons/mastery/laravel.png',
  // },
  // {
  //   name: 'TypeScript',
  //   image: '/icons/mastery/typescript.png',
  // },
  // {
  //   name: 'Prisma',
  //   image: '/icons/mastery/prisma.png',
  // },
  // {
  //   name: 'Docker',
  //   image: '/icons/mastery/docker.png',
  // },
];
function Logo({ url }: { url: string }) {
  const texture = useTexture(url);
  const { theme } = useTheme()
  return (
    <Billboard>
      <group>


        {/* logo */}
        <mesh>
          <planeGeometry args={[0.5, 0.5]} />
          <meshBasicMaterial
            map={texture}
            transparent
          />
        </mesh>
      </group>
    </Billboard>
  );
}
function LogoRing() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.3;
  });

  const radius = 2;

  return (
    <group ref={groupRef}>
      {logos.map((logo, index) => {
        const angle = (index / logos.length) * Math.PI * 2;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={logo.name} position={[x, 0, z]}>
            <Logo url={logo.image} />
          </group>
        );
      })}
    </group>
  );
}

function ProfileImage() {
  return (
    <Image
      url="/assets/foto.png"
      scale={5}
      rotation={[0, 0, 0]}
      position={[0, 1, 0]}
      transparent
    />
  );
}

export default function TechStackOrbit() {
  return (
    <div>
      <div className="h-[60vh] w-full">
        <Canvas className=" w-full h-full"
          camera={{ position: [0, 0, 6], fov: 40 }} gl={{ depth: true }}>
          <ambientLight intensity={2} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={2}
          />

          <ProfileImage />

          <LogoRing />

          <OrbitControls
            enableZoom={false}
            enableRotate={false}
            enablePan={false}
          />
        </Canvas>
      </div>
    </div>
  );
}