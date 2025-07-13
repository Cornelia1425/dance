import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const Avatar = ({ avatar, isUser = false }) => {
  const meshRef = useRef();

  // Enhanced dance animation based on style and personality
  useFrame((state) => {
    if (meshRef.current) {
      // Keep avatar in center of view, just gentle floating motion
      meshRef.current.position.x = 0;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      meshRef.current.position.z = 0;
      
      // Dynamic animations based on dance style and personality
      const time = state.clock.elapsedTime;
      
      if (avatar.danceStyle === 'contemporary') {
        meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
        meshRef.current.rotation.z = Math.sin(time * 0.2) * 0.05;
      } else if (avatar.danceStyle === 'ballet') {
        meshRef.current.rotation.z = Math.sin(time * 0.4) * 0.05;
        meshRef.current.rotation.y = Math.sin(time * 0.1) * 0.03;
      } else if (avatar.danceStyle === 'hiphop') {
        meshRef.current.rotation.x = Math.sin(time * 0.6) * 0.08;
        meshRef.current.rotation.y = Math.sin(time * 0.4) * 0.06;
      } else if (avatar.danceStyle === 'jazz') {
        meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.07;
        meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.04;
      } else if (avatar.danceStyle === 'modern') {
        meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.09;
        meshRef.current.rotation.x = Math.sin(time * 0.4) * 0.03;
      } else if (avatar.danceStyle === 'breakdance') {
        meshRef.current.rotation.x = Math.sin(time * 0.8) * 0.12;
        meshRef.current.rotation.y = Math.sin(time * 0.6) * 0.1;
        meshRef.current.rotation.z = Math.sin(time * 0.4) * 0.08;
      } else if (avatar.danceStyle === 'salsa') {
        meshRef.current.rotation.y = Math.sin(time * 0.7) * 0.08;
        meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.06;
      } else if (avatar.danceStyle === 'tango') {
        meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.04;
        meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
      }
      
      // Personality-based scaling effects
      if (avatar.personality === 'energetic') {
        meshRef.current.scale.x = 1 + Math.sin(time * 2) * 0.1;
        meshRef.current.scale.y = 1 + Math.sin(time * 2) * 0.1;
        meshRef.current.scale.z = 1 + Math.sin(time * 2) * 0.1;
      } else if (avatar.personality === 'graceful') {
        meshRef.current.scale.x = 1 + Math.sin(time * 0.5) * 0.05;
        meshRef.current.scale.y = 1 + Math.sin(time * 0.5) * 0.05;
        meshRef.current.scale.z = 1 + Math.sin(time * 0.5) * 0.05;
      } else if (avatar.personality === 'powerful') {
        meshRef.current.scale.x = 1 + Math.sin(time * 1.5) * 0.15;
        meshRef.current.scale.y = 1 + Math.sin(time * 1.5) * 0.15;
        meshRef.current.scale.z = 1 + Math.sin(time * 1.5) * 0.15;
      } else if (avatar.personality === 'mysterious') {
        meshRef.current.scale.x = 1 + Math.sin(time * 0.3) * 0.03;
        meshRef.current.scale.y = 1 + Math.sin(time * 0.3) * 0.03;
        meshRef.current.scale.z = 1 + Math.sin(time * 0.3) * 0.03;
      } else if (avatar.personality === 'playful') {
        meshRef.current.scale.x = 1 + Math.sin(time * 1.2) * 0.08;
        meshRef.current.scale.y = 1 + Math.sin(time * 1.2) * 0.08;
        meshRef.current.scale.z = 1 + Math.sin(time * 1.2) * 0.08;
      }
    }
  });

  // Get emoji for dance style
  const getDanceStyleEmoji = (style) => {
    const emojis = {
      contemporary: '🩰',
      ballet: '💃',
      hiphop: '🕺',
      jazz: '🎭',
      modern: '✨',
      breakdance: '🤸',
      salsa: '💃',
      tango: '🕴️'
    };
    return emojis[style] || '💃';
  };

  // Get emoji for personality
  const getPersonalityEmoji = (personality) => {
    const emojis = {
      energetic: '⚡',
      graceful: '🌸',
      powerful: '💪',
      mysterious: '🌙',
      playful: '🎈'
    };
    return emojis[personality] || '✨';
  };

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
      
      {/* Dance style indicator with emoji */}
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
        {getDanceStyleEmoji(avatar.danceStyle)} {avatar.danceStyle}
      </Text>
      
      {/* Personality indicator */}
      <Text
        position={[0, -1.1 * avatar.size, 0]}
        fontSize={0.1}
        color="#A67C52"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.8}
        strokeOpacity={0}
        strokeWidth={0}
      >
        {getPersonalityEmoji(avatar.personality)} {avatar.personality}
      </Text>
    </group>
  );
};

export default Avatar; 