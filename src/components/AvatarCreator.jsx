import React, { useState } from 'react';

const AvatarCreator = ({ onAvatarCreate, isVisible }) => {
  const [avatarConfig, setAvatarConfig] = useState({
    name: '',
    color: '#6B8E23',
    size: 1,
    danceStyle: 'contemporary'
  });

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

  if (!isVisible) return null;

  return (
    <div className="avatar-creator">
      <h3>Create Your Dance Avatar</h3>
      
      <div className="form-group">
        <label>Avatar Name:</label>
        <input
          type="text"
          value={avatarConfig.name}
          onChange={(e) => setAvatarConfig({...avatarConfig, name: e.target.value})}
          placeholder="Enter your avatar name"
        />
      </div>

      <div className="form-group">
        <label>Avatar Color:</label>
        <input
          type="color"
          value={avatarConfig.color}
          onChange={(e) => setAvatarConfig({...avatarConfig, color: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Size:</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={avatarConfig.size}
          onChange={(e) => setAvatarConfig({...avatarConfig, size: parseFloat(e.target.value)})}
        />
        <span>{avatarConfig.size}</span>
      </div>

      <div className="form-group">
        <label>Dance Style:</label>
        <select
          value={avatarConfig.danceStyle}
          onChange={(e) => setAvatarConfig({...avatarConfig, danceStyle: e.target.value})}
        >
          <option value="contemporary">Contemporary</option>
          <option value="ballet">Ballet</option>
          <option value="hiphop">Hip Hop</option>
          <option value="jazz">Jazz</option>
          <option value="modern">Modern</option>
        </select>
      </div>

      <button onClick={handleCreateAvatar} className="create-avatar-btn">
        Create Avatar
      </button>
    </div>
  );
};

export default AvatarCreator; 