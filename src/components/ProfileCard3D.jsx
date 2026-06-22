import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text3D, Center, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function HologramRing({ radius, color, speed, offset = 0 }) {
  const ref = useRef()
  const count = 40
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = Math.sin(angle) * radius
    positions[i * 3 + 2] = 0
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed + offset
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={color} transparent opacity={0.5} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function ProfileShape() {
  const mesh = useRef()

  useFrame((state) => {
    mesh.current.rotation.y = state.clock.elapsedTime * 0.08
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  return (
    <group ref={mesh}>
      <Float speed={1.5} floatIntensity={0.5}>
        <mesh>
          <dodecahedronGeometry args={[1.2, 0]} />
          <MeshDistortMaterial
            color="#6366f1"
            distort={0.15}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.7}
            emissive="#6366f1"
            emissiveIntensity={0.1}
          />
        </mesh>
        <mesh>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>
    </group>
  )
}

export default function ProfileCard3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#06b6d4" />
      <ProfileShape />
      <HologramRing radius={1.8} color="#6366f1" speed={0.2} />
      <HologramRing radius={2.2} color="#06b6d4" speed={-0.15} offset={Math.PI / 4} />
      <HologramRing radius={2.6} color="#8b5cf6" speed={0.1} offset={Math.PI / 2} />
    </Canvas>
  )
}
