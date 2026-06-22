import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function SphereCore() {
  const mesh = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * 0.1
    mesh.current.rotation.y = state.clock.elapsedTime * 0.15
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    if (glowRef.current) {
      glowRef.current.rotation.x = state.clock.elapsedTime * 0.05
      glowRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })

  return (
    <group>
      <Sphere ref={mesh} args={[1.8, 64, 64]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#6366f1"
          emissiveIntensity={0.2}
        />
      </Sphere>
      <Sphere ref={glowRef} args={[2.2, 32, 32]}>
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.08}
          wireframe
        />
      </Sphere>
    </group>
  )
}

function OrbitingRing({ radius, color, speed, offset = 0 }) {
  const ref = useRef()
  const particlesRef = useRef()

  const particlePositions = useMemo(() => {
    const count = 60
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * radius * 0.3
      pos[i * 3 + 2] = 0
    }
    return pos
  }, [radius])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed + offset
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 + offset) * 0.3
    }
  })

  return (
    <group ref={ref}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={60}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={color}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

function DataNodes() {
  const nodes = useMemo(() => {
    const arr = []
    for (let i = 0; i < 12; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.4
      arr.push({
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ],
        delay: Math.random() * Math.PI * 2,
      })
    }
    return arr
  }, [])

  const mesh = useRef()

  useFrame((state) => {
    if (mesh.current) {
      const positions = mesh.current.geometry.attributes.position.array
      nodes.forEach((node, i) => {
        const i3 = i * 3
        const pulse = Math.sin(state.clock.elapsedTime * 2 + node.delay) * 0.15
        positions[i3] = node.pos[0] + (node.pos[0] / 2.4) * pulse
        positions[i3 + 1] = node.pos[1] + (node.pos[1] / 2.4) * pulse
        positions[i3 + 2] = node.pos[2] + (node.pos[2] / 2.4) * pulse
      })
      mesh.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={nodes.length}
          array={new Float32Array(nodes.flatMap(n => n.pos))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#06b6d4" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </points>
  )
}

export default function AISphere() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <SphereCore />
      <OrbitingRing radius={2.8} color="#6366f1" speed={0.3} offset={0} />
      <OrbitingRing radius={3.2} color="#06b6d4" speed={-0.2} offset={Math.PI / 3} />
      <OrbitingRing radius={3.6} color="#8b5cf6" speed={0.15} offset={Math.PI / 1.5} />
      <DataNodes />
    </Canvas>
  )
}
