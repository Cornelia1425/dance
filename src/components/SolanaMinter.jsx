import { useState } from 'react';

const SolanaMinter = ({ videoId, title, description }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState('');



  const mintNFT = async () => {
    setIsMinting(true);
    setMintStatus('Checking wallet...');

    try {
      // Wait for wallets to load and check for conflicts
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if Phantom is available
      if (typeof window.solana === 'undefined') {
        throw new Error('Please install Phantom wallet from https://phantom.app/');
      }

      // Check if it's actually Phantom (not MetaMask interference)
      if (!window.solana.isPhantom) {
        throw new Error('Wallet conflict detected. Please:\n1. Disable MetaMask temporarily\n2. Or use a different browser profile\n3. Or try incognito mode');
      }

      setMintStatus('Connecting to Phantom...');
      
      // Try to connect with better error handling
      let publicKey;
      try {
        const response = await window.solana.connect();
        publicKey = response.publicKey.toString();
      } catch (connectError) {
        if (connectError.message.includes('User rejected')) {
          throw new Error('Connection cancelled by user.');
        } else if (connectError.message.includes('Wallet not found')) {
          throw new Error('Please install Phantom wallet from https://phantom.app/');
        } else {
          throw new Error('Connection failed. Please check if Phantom is unlocked and try again.');
        }
      }

      setMintStatus('Wallet connected! Creating demo transaction...');

      // Create demo transaction
      const demoTransaction = {
        signature: 'demo_' + Date.now(),
        network: 'Solana Devnet',
        video: title,
        timestamp: new Date().toISOString(),
        wallet: publicKey.slice(0, 8) + '...' + publicKey.slice(-8)
      };

      setMintStatus('🎉 Demo NFT Created!');
      
      // Show demo transaction details
      setTimeout(() => {
        alert(`🎭 Dance NFT Demo Created!\n\nTransaction: ${demoTransaction.signature}\nNetwork: ${demoTransaction.network}\nVideo: ${demoTransaction.video}\nWallet: ${demoTransaction.wallet}\nTimestamp: ${demoTransaction.timestamp}\n\nThis is a demo. In production, this would create a real Solana NFT!`);
        setIsMinting(false);
        setMintStatus('');
      }, 2000);

    } catch (error) {
      console.error('Minting error:', error);
      setMintStatus(`❌ Error: ${error.message}`);
      setIsMinting(false);
      
      setTimeout(() => {
        setMintStatus('');
      }, 5000);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      zIndex: 1000
    }}>
      <button
        onClick={mintNFT}
        disabled={isMinting}
        style={{
          background: isMinting 
            ? 'linear-gradient(45deg, #666, #888)' 
            : 'linear-gradient(45deg, #9945FF, #14F195)',
          color: '#B8A99A',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '20px',
          cursor: isMinting ? 'not-allowed' : 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          opacity: isMinting ? 0.7 : 1
        }}
        onMouseEnter={(e) => {
          if (!isMinting) {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        }}
      >
        {isMinting ? '⏳ Minting...' : '🎭 MINT NFT'}
      </button>
      
      {mintStatus && (
        <div style={{
          position: 'absolute',
          top: '50px',
          right: '0',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#B8A99A',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '11px',
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {mintStatus}
        </div>
      )}
    </div>
  );
};

export default SolanaMinter; 