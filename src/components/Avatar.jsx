import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const Avatar = ({ avatar, isUser = false }) => {
  const meshRef = useRef();

  // Simple dance animation
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.y = avatar.position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Rotation based on dance style
      if (avatar.danceStyle === 'contemporary') {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      } else if (avatar.danceStyle === 'ballet') {
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
      } else if (avatar.danceStyle === 'hiphop') {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
      }
    }
  });

  return (
    <group position={avatar.position} ref={meshRef}>
      {/* Triangle head */}
      <mesh position={[0, 0.3 * avatar.size, 0]}>
        <coneGeometry args={[0.2 * avatar.size, 0.4 * avatar.size, 3]} />
        <meshStandardMaterial color={avatar.color} />
      </mesh>
      
      {/* Diamond body */}
      <mesh position={[0, -0.1 * avatar.size, 0]}>
        <octahedronGeometry args={[0.2 * avatar.size, 0]} />
        <meshStandardMaterial color={avatar.color} />
      </mesh>
      
      {/* Avatar glow effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6 * avatar.size, 8, 8]} />
        <meshStandardMaterial 
          color={avatar.color} 
          transparent 
          opacity={0.1}
        />
      </mesh>
      
      {/* Avatar name */}
      <Text
        position={[0, 0.9 * avatar.size, 0]}
        fontSize={0.15}
        color="#8B7355"
        anchorX="center"
        anchorY="middle"
      >
        {avatar.name}
      </Text>
      
      {/* Dance style indicator */}
      <Text
        position={[0, -0.5 * avatar.size, 0]}
        fontSize={0.1}
        color="#B8A99A"
        anchorX="center"
        anchorY="middle"
      >
        {avatar.danceStyle}
      </Text>
    </group>
  );
};

export default Avatar; 