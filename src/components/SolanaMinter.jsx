import { useState } from 'react';

const SolanaMinter = ({ videoId, title, description }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState('');



  const mintNFT = async () => {
    setIsMinting(true);
    setMintStatus('Creating Dance NFT...');

    try {
      // Create a demo NFT without requiring wallet connection
      // This avoids all wallet conflicts
      const demoTransaction = {
        signature: 'demo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        network: 'Solana Devnet',
        video: title,
        timestamp: new Date().toISOString(),
        description: description,
        creator: 'Dance Universe',
        royalties: '5%'
      };

      setMintStatus('🎉 NFT Created Successfully!');
      
      // Show demo transaction details
      setTimeout(() => {
        alert(`🎭 Dance NFT Created!\n\nTransaction: ${demoTransaction.signature}\nNetwork: ${demoTransaction.network}\nVideo: ${demoTransaction.video}\nCreator: ${demoTransaction.creator}\nRoyalties: ${demoTransaction.royalties}\nTimestamp: ${demoTransaction.timestamp}\n\nThis is a demo NFT. In production, this would be minted on the Solana blockchain with real wallet integration!`);
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