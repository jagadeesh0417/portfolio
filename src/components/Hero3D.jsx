import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Box, Torus, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'

function FloatingGeometry() {
  const group = useRef()

  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Torus args={[1.2, 0.05, 16, 100]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
        </Torus>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <Icosahedron args={[0.5, 0]} position={[1.8, 1.5, -0.5]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            distort={0.2}
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.6}
          />
        </Icosahedron>
      </Float>

      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <Box args={[0.4, 0.4, 0.4]} position={[-1.6, -1.2, -1]}>
          <meshStandardMaterial color="#06b6d4" transparent opacity={0.5} wireframe />
        </Box>
      </Float>

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
        <Torus args={[0.8, 0.03, 8, 50]} position={[-1.8, 1.8, 0.5]}>
          <meshBasicMaterial color="#ec4899" transparent opacity={0.2} />
        </Torus>
      </Float>

      <Float speed={3} rotationIntensity={0.4} floatIntensity={1}>
        <Icosahedron args={[0.3, 0]} position={[2, -1.5, 0.8]}>
          <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.4} />
        </Icosahedron>
      </Float>
    </group>
  )
}

function ConnectingLines() {
  const ref = useRef()
  const positions = new Float32Array([
    -2, -1.5, 0, 0, 0, 0,
    0, 0, 0, 2, 1.5, 0,
    -1.5, 2, 0, 0, 0, 0,
    0, 0, 0, 1.5, -2, 0,
    -2, 0, 1, 0, 0, 0,
    0, 0, 0, 2, 0, -1,
  ])

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={12}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.1} />
    </lineSegments>
  )
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#6366f1" />
      <pointLight position={[5, -3, 2]} intensity={0.3} color="#06b6d4" />
      <FloatingGeometry />
      <ConnectingLines />
    </Canvas>
  )
}
