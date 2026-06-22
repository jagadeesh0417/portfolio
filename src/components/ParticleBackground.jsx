import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 2000 }) {
  const mesh = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [count])

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#6366f1'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#06b6d4'),
    ]
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)]
      cols[i * 3] = c.r
      cols[i * 3 + 1] = c.g
      cols[i * 3 + 2] = c.b
    }
    return cols
  }, [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const positionsArray = mesh.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positionsArray[i3 + 1] += Math.sin(t + positionsArray[i3] * 0.5) * 0.001
      positionsArray[i3] += Math.cos(t + positionsArray[i3 + 1] * 0.5) * 0.001
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.rotation.y = t * 0.02
    mesh.current.rotation.x = t * 0.01
  })

  return (
    <points ref={mesh}>
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
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function ParticleBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <Particles />
      </Canvas>
    </div>
  )
}
