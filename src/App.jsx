import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Html } from '@react-three/drei'
import { Suspense } from 'react'
import './App.css'

function VideoScreen({ position, videoId, title }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[6, 4, 0.1]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <Html
        position={[0, 0, 0.06]}
        transform
        occlude
        distanceFactor={1.5}
        zIndexRange={[0, 10]}
      >
        <div style={{ width: '600px', height: '400px', background: '#000', padding: '0' }}>
          <iframe
            width="600"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Html>
      <Text
        position={[0, -2.5, 0.1]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
    </group>
  )
}

function ExhibitionCenter() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#16213e" />
      </mesh>
      
      {/* Walls */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[50, 20]} />
        <meshStandardMaterial color="#0f3460" />
      </mesh>
      <mesh position={[0, 0, 10]}>
        <planeGeometry args={[50, 20]} />
        <meshStandardMaterial color="#0f3460" />
      </mesh>
      <mesh position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0f3460" />
      </mesh>
      <mesh position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0f3460" />
      </mesh>
      
      {/* Single floating video screen */}
      <VideoScreen 
        position={[0, 0, 0]} 
        videoId="rfBCmE7K4lc" 
        title="Dance Performance" 
      />
      
      {/* Floating particles */}
      {Array.from({ length: 150 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 20
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#4a90e2" emissive="#4a90e2" emissiveIntensity={0.5} />
        </mesh>
      ))}
      
      {/* Welcome text */}
      <Text
        position={[0, 3, -8]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        The Dance Theatre
      </Text>
      
      <Text
        position={[0, 2, -8]}
        fontSize={0.4}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
      >
        Welcome to the Exhibition Center
      </Text>
    </>
  )
}

function App() {
  return (
    <div className="app-container">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #0f0f23, #1a1a2e)' }}
      >
        <Suspense fallback={null}>
          <ExhibitionCenter />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>
      <div className="ui-overlay">
        <div className="instructions">
          <h2>Controls</h2>
          <p>• Mouse: Rotate view</p>
          <p>• Scroll: Zoom in/out</p>
          <p>• Right click + drag: Pan</p>
        </div>
      </div>
    </div>
  )
}

export default App
