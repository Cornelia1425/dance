import React, { useState } from 'react';

const AvatarCreator = ({ onAvatarCreate, isVisible }) => {
  const [avatarConfig, setAvatarConfig] = useState({
    name: '',
    color: '#6B8E23',
    size: 1,
    danceStyle: 'contemporary',
    personality: 'energetic'
  });

  const danceStyles = [
    { value: 'contemporary', label: 'Contemporary', emoji: '🩰' },
    { value: 'ballet', label: 'Ballet', emoji: '💃' },
    { value: 'hiphop', label: 'Hip Hop', emoji: '🕺' },
    { value: 'jazz', label: 'Jazz', emoji: '🎭' },
    { value: 'modern', label: 'Modern', emoji: '✨' },
    { value: 'breakdance', label: 'Breakdance', emoji: '🤸' },
    { value: 'salsa', label: 'Salsa', emoji: '💃' },
    { value: 'tango', label: 'Tango', emoji: '🕴️' }
  ];

  const personalities = [
    { value: 'energetic', label: 'Energetic', emoji: '⚡' },
    { value: 'graceful', label: 'Graceful', emoji: '🌸' },
    { value: 'powerful', label: 'Powerful', emoji: '💪' },
    { value: 'mysterious', label: 'Mysterious', emoji: '🌙' },
    { value: 'playful', label: 'Playful', emoji: '🎈' }
  ];

  const handleCreateAvatar = () => {
    if (avatarConfig.name.trim()) {
      // Generate random position in the universe
      const randomPosition = [
        (Math.random() - 0.5) * 20, // X: -10 to 10
        (Math.random() - 0.5) * 10, // Y: -5 to 5
        (Math.random() - 0.5) * 20 - 10 // Z: -20 to 0
      ];
      
      onAvatarCreate({
        ...avatarConfig,
        id: Date.now(),
        position: randomPosition
      });
    }
  };

  const getSelectedDanceStyle = () => {
    return danceStyles.find(style => style.value === avatarConfig.danceStyle);
  };

  const getSelectedPersonality = () => {
    return personalities.find(personality => personality.value === avatarConfig.personality);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.9)',
      padding: '30px',
      borderRadius: '15px',
      color: '#B8A99A',
      backdropFilter: 'blur(20px)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      minWidth: '350px',
      maxWidth: '400px',
      zIndex: 2000,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
    }}>
      <h3 style={{ 
        margin: '0 0 20px 0', 
        color: '#8B7355', 
        textAlign: 'center',
        fontSize: '18px'
      }}>
        🎭 Create Your Dance Avatar
      </h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Avatar Name:
        </label>
        <input
          type="text"
          value={avatarConfig.name}
          onChange={(e) => setAvatarConfig({...avatarConfig, name: e.target.value})}
          placeholder="Enter your avatar name"
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#B8A99A',
            fontSize: '14px'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Avatar Color:
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="color"
            value={avatarConfig.color}
            onChange={(e) => setAvatarConfig({...avatarConfig, color: e.target.value})}
            style={{
              width: '50px',
              height: '40px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          />
          <span style={{ fontSize: '12px' }}>{avatarConfig.color}</span>
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Size: {avatarConfig.size}
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={avatarConfig.size}
          onChange={(e) => setAvatarConfig({...avatarConfig, size: parseFloat(e.target.value)})}
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '3px',
            background: 'rgba(255, 255, 255, 0.2)',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Dance Style:
        </label>
        <select
          value={avatarConfig.danceStyle}
          onChange={(e) => setAvatarConfig({...avatarConfig, danceStyle: e.target.value})}
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#B8A99A',
            fontSize: '14px'
          }}
        >
          {danceStyles.map(style => (
            <option key={style.value} value={style.value}>
              {style.emoji} {style.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
          Personality:
        </label>
        <select
          value={avatarConfig.personality}
          onChange={(e) => setAvatarConfig({...avatarConfig, personality: e.target.value})}
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#B8A99A',
            fontSize: '14px'
          }}
        >
          {personalities.map(personality => (
            <option key={personality.value} value={personality.value}>
              {personality.emoji} {personality.label}
            </option>
          ))}
        </select>
      </div>

      {/* Preview Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#8B7355' }}>
          Preview:
        </h4>
        <p style={{ margin: '5px 0', fontSize: '12px' }}>
          Name: {avatarConfig.name || 'Unnamed'}
        </p>
        <p style={{ margin: '5px 0', fontSize: '12px' }}>
          Style: {getSelectedDanceStyle()?.emoji} {getSelectedDanceStyle()?.label}
        </p>
        <p style={{ margin: '5px 0', fontSize: '12px' }}>
          Personality: {getSelectedPersonality()?.emoji} {getSelectedPersonality()?.label}
        </p>
        <p style={{ margin: '5px 0', fontSize: '12px' }}>
          Size: {avatarConfig.size}x
        </p>
      </div>

      <button 
        onClick={handleCreateAvatar} 
        disabled={!avatarConfig.name.trim()}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          border: 'none',
          background: avatarConfig.name.trim() 
            ? 'linear-gradient(45deg, #A67C52, #C17E61)' 
            : 'linear-gradient(45deg, #666, #888)',
          color: '#B8A99A',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: avatarConfig.name.trim() ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          opacity: avatarConfig.name.trim() ? 1 : 0.7
        }}
        onMouseEnter={(e) => {
          if (avatarConfig.name.trim()) {
            e.target.style.transform = 'scale(1.02)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        {avatarConfig.name.trim() ? '🎭 Create Avatar' : 'Enter a name to create avatar'}
      </button>
    </div>
  );
};

export default AvatarCreator; 