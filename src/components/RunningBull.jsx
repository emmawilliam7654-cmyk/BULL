import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import './RunningBull.css'

const BULL_GREEN = '#00ff41'
const BULL_DARK = '#0a2a0f'

function BullModel() {
  const group = useRef()
  const legFL = useRef()
  const legFR = useRef()
  const legBL = useRef()
  const legBR = useRef()
  const bodyRef = useRef()

  useFrame((_, delta) => {
    const t = Date.now() * 0.003
    if (!group.current) return
    // Run cycle: legs alternate
    const stride = Math.sin(t * 12) * 0.35
    if (legFL.current) {
      legFL.current.rotation.x = stride
      legBR.current.rotation.x = stride
    }
    if (legFR.current) {
      legFR.current.rotation.x = -stride
      legBL.current.rotation.x = -stride
    }
    // Body bob
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.abs(Math.sin(t * 10)) * 0.04
    }
  })

  return (
    <group ref={group} position={[0, -0.2, 0]} scale={1.2}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.28, 0.32]} />
        <meshStandardMaterial color={BULL_DARK} emissive={BULL_GREEN} emissiveIntensity={0.15} />
      </mesh>
      {/* Head */}
      <mesh position={[0.32, 0.38, 0]} castShadow>
        <boxGeometry args={[0.22, 0.2, 0.22]} />
        <meshStandardMaterial color={BULL_DARK} emissive={BULL_GREEN} emissiveIntensity={0.12} />
      </mesh>
      {/* Snout */}
      <mesh position={[0.48, 0.35, 0]} castShadow>
        <boxGeometry args={[0.1, 0.12, 0.14]} />
        <meshStandardMaterial color={BULL_DARK} />
      </mesh>
      {/* Horns */}
      <mesh position={[0.36, 0.52, 0.12]} rotation={[0.3, 0, 0.2]} castShadow>
        <coneGeometry args={[0.03, 0.14, 6]} />
        <meshStandardMaterial color="#2a2a2a" emissive={BULL_GREEN} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.36, 0.52, -0.12]} rotation={[0.3, 0, -0.2]} castShadow>
        <coneGeometry args={[0.03, 0.14, 6]} />
        <meshStandardMaterial color="#2a2a2a" emissive={BULL_GREEN} emissiveIntensity={0.2} />
      </mesh>
      {/* Legs */}
      <mesh ref={legFL} position={[0.18, 0.12, 0.14]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.04, 0.22, 8]} />
        <meshStandardMaterial color={BULL_DARK} emissive={BULL_GREEN} emissiveIntensity={0.1} />
      </mesh>
      <mesh ref={legFR} position={[0.18, 0.12, -0.14]} rotation={[-0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.04, 0.22, 8]} />
        <meshStandardMaterial color={BULL_DARK} emissive={BULL_GREEN} emissiveIntensity={0.1} />
      </mesh>
      <mesh ref={legBL} position={[-0.18, 0.12, 0.14]} rotation={[-0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.04, 0.22, 8]} />
        <meshStandardMaterial color={BULL_DARK} emissive={BULL_GREEN} emissiveIntensity={0.1} />
      </mesh>
      <mesh ref={legBR} position={[-0.18, 0.12, -0.14]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.04, 0.22, 8]} />
        <meshStandardMaterial color={BULL_DARK} emissive={BULL_GREEN} emissiveIntensity={0.1} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} castShadow shadow-mapSize={[256, 256]} />
      <pointLight position={[-2, 2, 2]} color={BULL_GREEN} intensity={0.4} />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <BullModel />
      </Float>
    </>
  )
}

export default function RunningBull() {
  return (
    <div className="running-bull" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 1.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
