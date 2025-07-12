import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const galaxies = [
  { id: 1, name: 'Education', position: [-15, 5, -8], color: '#4A90A2', glowColor: '#7FB3C7', size: 0.8 },
  { id: 2, name: 'Theatre', position: [12, -3, -12], color: '#8B4513', glowColor: '#D2691E', size: 1.2 },
  { id: 3, name: 'Party', position: [-8, -8, -6], color: '#FFD700', glowColor: '#FFA500', size: 1.0 },
  { id: 4, name: 'Culture', position: [15, 2, -10], color: '#9370DB', glowColor: '#BA55D3', size: 0.9 },
  { id: 5, name: 'Exchange', position: [0, 10, -15], color: '#228B22', glowColor: '#32CD32', size: 0.7 }
];

const StarField = ({ onGalaxyClick, cameraPosition, setCameraPosition, currentView }) => {
  const [hoveredGalaxy, setHoveredGalaxy] = useState(null);
  const [selectedGalaxy, setSelectedGalaxy] = useState(null);
  const [zoomTarget, setZoomTarget] = useState(null);
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current && currentView === 'universe') {
      // Gentle rotation of the entire starfield - only in universe view
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.025;
    }
  });

  const handleGalaxyClick = (galaxy) => {
    setSelectedGalaxy(galaxy);
    onGalaxyClick(galaxy);
    
    // Smooth camera transition to galaxy
    const targetPosition = [
      galaxy.position[0] * 0.5,
      galaxy.position[1] * 0.5,
      galaxy.position[2] + 3
    ];
    setCameraPosition(targetPosition);
  };

  const handleGalaxyHover = (galaxy) => {
    setHoveredGalaxy(galaxy.id);
    setZoomTarget(galaxy);
    document.body.style.cursor = 'pointer';
  };

  const handleGalaxyLeave = () => {
    setHoveredGalaxy(null);
    setZoomTarget(null);
    document.body.style.cursor = 'default';
  };

  const handleWheel = (event) => {
    if (zoomTarget) {
      // Calculate zoom direction
      const zoomDirection = event.deltaY > 0 ? 1 : -1;
      
      // Get current camera position
      const currentPos = cameraPosition;
      
      // Calculate direction to galaxy
      const directionToGalaxy = [
        zoomTarget.position[0] - currentPos[0],
        zoomTarget.position[1] - currentPos[1],
        zoomTarget.position[2] - currentPos[2]
      ];
      
      // Normalize direction
      const length = Math.sqrt(
        directionToGalaxy[0] ** 2 + 
        directionToGalaxy[1] ** 2 + 
        directionToGalaxy[2] ** 2
      );
      
      const normalizedDirection = [
        directionToGalaxy[0] / length,
        directionToGalaxy[1] / length,
        directionToGalaxy[2] / length
      ];
      
      // Move camera towards or away from galaxy
      const zoomSpeed = 0.5;
      const newPosition = [
        currentPos[0] + normalizedDirection[0] * zoomDirection * zoomSpeed,
        currentPos[1] + normalizedDirection[1] * zoomDirection * zoomSpeed,
        currentPos[2] + normalizedDirection[2] * zoomDirection * zoomSpeed
      ];
      
      setCameraPosition(newPosition);
    }
  };

  return (
    <group ref={groupRef} onWheel={handleWheel}>
      {/* Background stars - bigger, denser, more glowing */}
      {Array.from({ length: 500 }).map((_, i) => (
        <mesh
          key={`star-${i}`}
          position={[
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 50 - 25
          ]}
        >
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial 
            color="#E6E6FA" 
            emissive="#E6E6FA" 
            emissiveIntensity={6.0}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Additional dense glowing particles */}
      {Array.from({ length: 300 }).map((_, i) => (
        <mesh
          key={`ethereal-${i}`}
          position={[
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 60 - 30
          ]}
        >
          <sphereGeometry args={[0.02, 10, 10]} />
          <meshStandardMaterial 
            color="#F0F8FF" 
            emissive="#F0F8FF" 
            emissiveIntensity={4.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Interactive galaxies - dreamy star clusters with intense glow */}
      {galaxies.map((galaxy) => (
        <group key={galaxy.id} position={galaxy.position}>
          {/* Large invisible clickable sphere for easy targeting */}
          <mesh
            onClick={() => handleGalaxyClick(galaxy)}
            onPointerOver={() => handleGalaxyHover(galaxy)}
            onPointerOut={handleGalaxyLeave}
          >
            <sphereGeometry args={[galaxy.size * 3, 8, 8]} />
            <meshStandardMaterial 
              color={hoveredGalaxy === galaxy.id ? galaxy.glowColor : '#ffffff'} 
              transparent 
              opacity={hoveredGalaxy === galaxy.id ? 0.1 : 0}
            />
          </mesh>

          {/* Galaxy cluster - many small, intensely glowing stars */}
          {Array.from({ length: 200 }).map((_, i) => {
            // Special plate shape for Exchange galaxy
            if (galaxy.id === 5) {
              // Create spiral galaxy plate shape
              const radius = Math.random() * galaxy.size * 2;
              const angle = Math.random() * Math.PI * 2;
              const spiralOffset = radius * 0.3; // Spiral effect
              const height = (Math.random() - 0.5) * galaxy.size * 0.3; // Very thin
              
              return (
                <mesh
                  key={`galaxy-star-${galaxy.id}-${i}`}
                  position={[
                    Math.cos(angle + spiralOffset) * radius,
                    height,
                    Math.sin(angle + spiralOffset) * radius
                  ]}
                >
                  <sphereGeometry args={[0.015, 12, 12]} />
                  <meshStandardMaterial 
                    color={galaxy.color} 
                    emissive={galaxy.glowColor} 
                    emissiveIntensity={hoveredGalaxy === galaxy.id ? 25.0 : 18.0}
                    transparent
                    opacity={hoveredGalaxy === galaxy.id ? 1.0 : 0.95}
                  />
                </mesh>
              );
            } else {
              // Regular spherical cluster for other galaxies
              return (
                <mesh
                  key={`galaxy-star-${galaxy.id}-${i}`}
                  position={[
                    (Math.random() - 0.5) * galaxy.size * 2.5,
                    (Math.random() - 0.5) * galaxy.size * 2.5,
                    (Math.random() - 0.5) * galaxy.size * 2.5
                  ]}
                >
                  <sphereGeometry args={[0.015, 12, 12]} />
                  <meshStandardMaterial 
                    color={galaxy.color} 
                    emissive={galaxy.glowColor} 
                    emissiveIntensity={hoveredGalaxy === galaxy.id ? 25.0 : 18.0}
                    transparent
                    opacity={hoveredGalaxy === galaxy.id ? 1.0 : 0.95}
                  />
                </mesh>
              );
            }
          })}

          {/* Additional small glowing particles around the cluster */}
          {Array.from({ length: 150 }).map((_, i) => {
            // Special plate shape for Exchange galaxy
            if (galaxy.id === 5) {
              // Create outer spiral arms
              const radius = galaxy.size * 2.5 + Math.random() * galaxy.size * 1.5;
              const angle = Math.random() * Math.PI * 2;
              const spiralOffset = radius * 0.2;
              const height = (Math.random() - 0.5) * galaxy.size * 0.2;
              
              return (
                <mesh
                  key={`ethereal-galaxy-${galaxy.id}-${i}`}
                  position={[
                    Math.cos(angle + spiralOffset) * radius,
                    height,
                    Math.sin(angle + spiralOffset) * radius
                  ]}
                >
                  <sphereGeometry args={[0.01, 10, 10]} />
                  <meshStandardMaterial 
                    color={galaxy.color} 
                    emissive={galaxy.glowColor} 
                    emissiveIntensity={hoveredGalaxy === galaxy.id ? 20.0 : 15.0}
                    transparent
                    opacity={hoveredGalaxy === galaxy.id ? 1.0 : 0.9}
                  />
                </mesh>
              );
            } else {
              // Regular spherical cluster for other galaxies
              return (
                <mesh
                  key={`ethereal-galaxy-${galaxy.id}-${i}`}
                  position={[
                    (Math.random() - 0.5) * galaxy.size * 3.5,
                    (Math.random() - 0.5) * galaxy.size * 3.5,
                    (Math.random() - 0.5) * galaxy.size * 3.5
                  ]}
                >
                  <sphereGeometry args={[0.01, 10, 10]} />
                  <meshStandardMaterial 
                    color={galaxy.color} 
                    emissive={galaxy.glowColor} 
                    emissiveIntensity={hoveredGalaxy === galaxy.id ? 20.0 : 15.0}
                    transparent
                    opacity={hoveredGalaxy === galaxy.id ? 1.0 : 0.9}
                  />
                </mesh>
              );
            }
          })}

          {/* Extra bright core stars for maximum visibility */}
          {Array.from({ length: 50 }).map((_, i) => {
            // Special plate shape for Exchange galaxy
            if (galaxy.id === 5) {
              // Create bright central bulge
              const radius = Math.random() * galaxy.size * 0.8;
              const angle = Math.random() * Math.PI * 2;
              const height = (Math.random() - 0.5) * galaxy.size * 0.4;
              
              return (
                <mesh
                  key={`core-star-${galaxy.id}-${i}`}
                  position={[
                    Math.cos(angle) * radius,
                    height,
                    Math.sin(angle) * radius
                  ]}
                >
                  <sphereGeometry args={[0.02, 16, 16]} />
                  <meshStandardMaterial 
                    color={galaxy.color} 
                    emissive={galaxy.glowColor} 
                    emissiveIntensity={hoveredGalaxy === galaxy.id ? 35.0 : 25.0}
                    transparent
                    opacity={1.0}
                  />
                </mesh>
              );
            } else {
              // Regular spherical cluster for other galaxies
              return (
                <mesh
                  key={`core-star-${galaxy.id}-${i}`}
                  position={[
                    (Math.random() - 0.5) * galaxy.size * 1.5,
                    (Math.random() - 0.5) * galaxy.size * 1.5,
                    (Math.random() - 0.5) * galaxy.size * 1.5
                  ]}
                >
                  <sphereGeometry args={[0.02, 16, 16]} />
                  <meshStandardMaterial 
                    color={galaxy.color} 
                    emissive={galaxy.glowColor} 
                    emissiveIntensity={hoveredGalaxy === galaxy.id ? 35.0 : 25.0}
                    transparent
                    opacity={1.0}
                  />
                </mesh>
              );
            }
          })}

          {/* Hover effect - multiple pulsing rings with intense glow */}
          {hoveredGalaxy === galaxy.id && (
            <>
              {/* Inner ring */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[galaxy.size * 1.5, galaxy.size * 1.7, 32]} />
                <meshStandardMaterial 
                  color={galaxy.glowColor} 
                  transparent 
                  opacity={0.8}
                  emissive={galaxy.glowColor}
                  emissiveIntensity={2.0}
                />
              </mesh>
              {/* Outer ring */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[galaxy.size * 2.2, galaxy.size * 2.4, 32]} />
                <meshStandardMaterial 
                  color={galaxy.glowColor} 
                  transparent 
                  opacity={0.6}
                  emissive={galaxy.glowColor}
                  emissiveIntensity={1.5}
                />
              </mesh>
            </>
          )}
        </group>
      ))}

      {/* Simple text labels - always visible and not blocked */}
      {galaxies.map((galaxy) => (
        <Text
          key={`text-${galaxy.id}`}
          position={[
            galaxy.position[0],
            galaxy.position[1] + galaxy.size * 1.5,
            galaxy.position[2]
          ]}
          fontSize={0.4}
          color="#8B7355"
          anchorX="center"
          anchorY="middle"
          visible={hoveredGalaxy === galaxy.id}
          fillOpacity={1}
          strokeOpacity={0}
          strokeWidth={0}
          letterSpacing={0.08}
          scale={[5, 5, 5]}
          rotation={[0, 0, 0]}
        >
          {galaxy.name}
        </Text>
      ))}
    </group>
  );
};

export default StarField;