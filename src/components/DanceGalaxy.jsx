import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import SolanaMinter from './SolanaMinter';

const DanceGalaxy = ({ galaxy, onBack }) => {
  const groupRef = useRef();

  // Removed rotation - galaxy content stays static
  // useFrame((state) => {
  //   if (groupRef.current) {
  //     // Gentle rotation of the galaxy
  //     groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  //   }
  // });

  const getGalaxyContent = (galaxyName) => {
    switch (galaxyName) {
      case 'Education':
        return {
          title: 'Education',
          description: 'Learn dance techniques, history, and theory',
          videoId: 'rfBCmE7K4lc',
          theme: '#4A90A2',
          glowColor: '#7FB3C7'
        };
      case 'Theatre':
        return {
          title: 'Theatre',
          description: 'Professional performances and stage productions',
          videoId: 'rfBCmE7K4lc',
          theme: '#8B4513',
          glowColor: '#D2691E'
        };
      case 'Party':
        return {
          title: 'Party',
          description: 'Social dancing, clubs, and celebrations',
          videoId: 'rfBCmE7K4lc',
          theme: '#FFD700',
          glowColor: '#FFA500'
        };
      case 'Culture':
        return {
          title: 'Culture',
          description: 'Traditional and cultural dance forms',
          videoId: 'rfBCmE7K4lc',
          theme: '#9370DB',
          glowColor: '#BA55D3'
        };
      case 'Exchange':
        return {
          title: 'Exchange',
          description: 'Collaborative dance experiences and cultural exchange',
          videoId: 'rfBCmE7K4lc',
          theme: '#228B22',
          glowColor: '#32CD32'
        };
      default:
        return {
          title: 'Galaxy',
          description: 'Explore the world of dance',
          videoId: 'rfBCmE7K4lc',
          theme: '#ffffff',
          glowColor: '#ffffff'
        };
    }
  };

  const content = getGalaxyContent(galaxy.name);

  return (
    <group ref={groupRef} scale={[10, 10, 10]}>
      {/* Galaxy center - cluster of small stars with intense glow */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={`center-star-${i}`}
          position={[
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
          ]}
        >
          <sphereGeometry args={[0.05, 4, 4]} />
          <meshStandardMaterial 
            color={content.theme} 
            emissive={content.glowColor} 
            emissiveIntensity={4.0}
          />
        </mesh>
      ))}

      {/* Galaxy rings with intense glow */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={`ring-${i}`} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3 + i * 1.5, 3.2 + i * 1.5, 32]} />
          <meshStandardMaterial 
            color={content.theme} 
            transparent 
            opacity={0.5 - i * 0.1}
            emissive={content.glowColor}
            emissiveIntensity={2.0}
          />
        </mesh>
      ))}

      {/* Orbiting stars with intense glow */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={`orbit-star-${i}`}
          position={[
            Math.cos(i * Math.PI * 2 / 12) * 4,
            Math.sin(i * Math.PI * 2 / 12) * 0.5,
            Math.sin(i * Math.PI * 2 / 12) * 4
          ]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial 
            color={content.theme} 
            emissive={content.glowColor} 
            emissiveIntensity={3.5}
          />
        </mesh>
      ))}

      {/* Galaxy title */}
      <Text
        position={[0, 5, 0]}
        fontSize={0.8}
        color="#8B7355"
        anchorX="center"
        anchorY="middle"
        billboarding={true}
        fillOpacity={1}
        strokeOpacity={0}
        strokeWidth={0}
        letterSpacing={0.1}
      >
        {content.title}
      </Text>

      {/* Galaxy description */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.25}
        color="#B8A99A"
        anchorX="center"
        anchorY="middle"
        maxWidth={12}
        billboarding={true}
        fillOpacity={0.9}
        strokeOpacity={0}
        strokeWidth={0}
        letterSpacing={0.05}
        lineHeight={1.4}
      >
        {content.description}
      </Text>

      {/* Video screen */}
      <group position={[0, 0, 3]}>
        <mesh>
          <boxGeometry args={[4, 2.5, 0.1]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        <Html
          position={[0, 0, 0.06]}
          transform
          occlude
          distanceFactor={1.5}
          zIndexRange={[0, 10]}
        >
          <div style={{ width: '400px', height: '250px', background: '#000', padding: '0', margin: '0', position: 'relative' }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${content.videoId}`}
              title={content.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 'none', margin: '0', padding: '0' }}
            />
            
            {/* Solana Mint button - only for Exchange galaxy */}
            {galaxy.name === 'Exchange' && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <SolanaMinter 
                  videoId={content.videoId}
                  title={content.title}
                  description={content.description}
                />
                <div style={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: '#B8A99A',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  maxWidth: '200px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  💡 Tip: If you see wallet errors, try disabling MetaMask temporarily
                </div>
              </div>
            )}
          </div>
        </Html>
      </group>

      {/* Back button */}
      <Html position={[0, -4, 0]}>
        <button 
          onClick={onBack}
          style={{
            background: 'rgba(0,0,0,0.7)',
            color: '#B8A99A',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ← Back to Universe
        </button>
      </Html>
    </group>
  );
};

export default DanceGalaxy; 