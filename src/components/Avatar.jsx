import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const Avatar = ({ avatar, isUser = false }) => {
  const meshRef = useRef();

  // Simple dance animation - no rotation with universe, just gentle floating
  useFrame((state) => {
    if (meshRef.current) {
      // Keep avatar in center of view, just gentle floating motion
      meshRef.current.position.x = 0;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      meshRef.current.position.z = 0;
      
      // No rotation with universe, just gentle self-rotation
      if (avatar.danceStyle === 'contemporary') {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      } else if (avatar.danceStyle === 'ballet') {
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
      } else if (avatar.danceStyle === 'hiphop') {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
      }
    }
  });

  return (
    <group position={avatar.position} ref={meshRef}>
      {/* Triangle head - made much bigger */}
      <mesh position={[0, 0.6 * avatar.size, 0]}>
        <coneGeometry args={[0.5 * avatar.size, 1.0 * avatar.size, 3]} />
        <meshStandardMaterial 
          color={avatar.color} 
          emissive={avatar.color}
          emissiveIntensity={0.4}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      
      {/* Diamond body - made much bigger */}
      <mesh position={[0, -0.3 * avatar.size, 0]}>
        <octahedronGeometry args={[0.5 * avatar.size, 0]} />
        <meshStandardMaterial 
          color={avatar.color} 
          emissive={avatar.color}
          emissiveIntensity={0.4}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      
      {/* Avatar glow effect - made much bigger */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2 * avatar.size, 16, 16]} />
        <meshStandardMaterial 
          color={avatar.color} 
          transparent 
          opacity={0.25}
          emissive={avatar.color}
          emissiveIntensity={0.15}
        />
      </mesh>
      
      {/* Avatar name */}
      <Text
        position={[0, 1.2 * avatar.size, 0]}
        fontSize={0.2}
        color="#8B7355"
        anchorX="center"
        anchorY="middle"
        fillOpacity={1}
        strokeOpacity={0}
        strokeWidth={0}
      >
        {avatar.name}
      </Text>
      
      {/* Dance style indicator */}
      <Text
        position={[0, -0.8 * avatar.size, 0]}
        fontSize={0.12}
        color="#B8A99A"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.9}
        strokeOpacity={0}
        strokeWidth={0}
      >
        {avatar.danceStyle}
      </Text>
    </group>
  );
};

export default Avatar; 