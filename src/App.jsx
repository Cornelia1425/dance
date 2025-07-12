import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { Suspense, useState, Component } from 'react'
import WalletConnect from './components/WalletConnect'
import AvatarCreator from './components/AvatarCreator'
import Avatar from './components/Avatar'
import StarField from './components/StarField'
import DanceGalaxy from './components/DanceGalaxy'
import './App.css'

// Error Boundary for Canvas
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Canvas Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#B8A99A',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#8B7355' }}>Something went wrong with the 3D view</h3>
          <p>Please refresh the page to try again.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#8B7355',
              color: '#B8A99A',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAccount, setWalletAccount] = useState(null);
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [currentView, setCurrentView] = useState('universe'); // 'universe' or 'galaxy'
  const [selectedGalaxy, setSelectedGalaxy] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 20]);

  const handleWalletConnect = (account, provider) => {
    setWalletConnected(true);
    setWalletAccount(account);
    // Don't automatically show avatar creator, let user choose
  };

  const handleWalletDisconnect = () => {
    setWalletConnected(false);
    setWalletAccount(null);
    setShowAvatarCreator(false);
  };

  const handleAvatarCreate = (avatar) => {
    // Generate random position near the current camera position
    const randomPosition = [
      cameraPosition[0] + (Math.random() - 0.5) * 10,
      cameraPosition[1] + (Math.random() - 0.5) * 5,
      cameraPosition[2] + (Math.random() - 0.5) * 10
    ];
    
    setAvatars(prevAvatars => [...prevAvatars, {
      ...avatar,
      id: Date.now(),
      position: randomPosition
    }]);
    setShowAvatarCreator(false);
  };

  const handleGalaxyClick = (galaxy) => {
    setSelectedGalaxy(galaxy);
    setCurrentView('galaxy');
    
    // Move avatars to the galaxy position
    const updatedAvatars = avatars.map(avatar => ({
      ...avatar,
      position: [
        galaxy.position[0] + (Math.random() - 0.5) * 4,
        galaxy.position[1] + (Math.random() - 0.5) * 2,
        galaxy.position[2] + (Math.random() - 0.5) * 4
      ]
    }));
    setAvatars(updatedAvatars);
  };

  const handleBackToUniverse = () => {
    setCurrentView('universe');
    setSelectedGalaxy(null);
    setCameraPosition([0, 0, 20]);
    
    // Move avatars back to universe positions
    const updatedAvatars = avatars.map(avatar => ({
      ...avatar,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20 - 10
      ]
    }));
    setAvatars(updatedAvatars);
  };

  return (
    <div className="app-container">
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: cameraPosition, fov: 75 }}
          style={{ background: '#000000' }}
        >
          <Suspense fallback={null}>
            {currentView === 'universe' ? (
              <>
                <StarField 
                  onGalaxyClick={handleGalaxyClick}
                  cameraPosition={cameraPosition}
                  setCameraPosition={setCameraPosition}
                  currentView={currentView}
                />
                
                {/* Display avatars in universe */}
                {avatars.map((avatar) => (
                  <Avatar key={avatar.id} avatar={avatar} />
                ))}
              </>
            ) : (
              <>
                <DanceGalaxy 
                  galaxy={selectedGalaxy}
                  onBack={handleBackToUniverse}
                />
                
                {/* Display avatars in galaxy */}
                {avatars.map((avatar) => (
                  <Avatar key={avatar.id} avatar={avatar} />
                ))}
              </>
            )}
            
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI}
              minDistance={1}
              maxDistance={200}
            />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
      
      <div className="ui-overlay">
        <div className="wallet-section">
          <WalletConnect 
            onConnect={handleWalletConnect}
            onDisconnect={handleWalletDisconnect}
          />
          {walletConnected && currentView === 'universe' && (
            <button 
              onClick={() => setShowAvatarCreator(!showAvatarCreator)}
              className="avatar-btn"
              style={{
                background: 'linear-gradient(45deg, #A67C52, #C17E61)',
                color: '#B8A99A',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '10px',
                width: '100%'
              }}
            >
              {showAvatarCreator ? 'Cancel Avatar Creation' : '🎭 Create Dance Avatar'}
            </button>
          )}
        </div>
        
        {currentView === 'universe' && (
          <AvatarCreator 
            onAvatarCreate={handleAvatarCreate}
            isVisible={showAvatarCreator}
          />
        )}
        
        <div className="instructions">
          <h2>Dance Universe</h2>
          <p>• Click on galaxies to explore</p>
          <p>• Mouse: Rotate view</p>
          <p>• Scroll: Zoom in/out</p>
          <p>• Right click + drag: Pan</p>
          {currentView === 'universe' && (
            <button 
              onClick={handleBackToUniverse}
              className="reset-btn"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                color: '#B8A99A',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px',
                marginTop: '10px'
              }}
            >
              Reset to Universe View
            </button>
          )}
          {walletConnected && (
            <>
              <h3>Web3 Features</h3>
              <p>• Connected: {walletAccount}</p>
              <p>• Avatars: {avatars.length}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
