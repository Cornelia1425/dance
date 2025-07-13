import React, { useState, useEffect } from 'react';

const WalletTest = () => {
  const [walletStatus, setWalletStatus] = useState('Checking...');
  const [phantomAvailable, setPhantomAvailable] = useState(false);
  const [metamaskAvailable, setMetamaskAvailable] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check for wallet availability
    const checkWallets = () => {
      const phantom = window.phantom?.solana;
      const metamask = window.ethereum;
      
      setPhantomAvailable(!!phantom);
      setMetamaskAvailable(!!metamask);
      
      if (phantom || metamask) {
        setWalletStatus('Wallets detected');
      } else {
        setWalletStatus('No wallets found');
      }
    };

    checkWallets();
    
    // Check again after a short delay
    const timer = setTimeout(checkWallets, 1000);
    return () => clearTimeout(timer);
  }, []);

  const connectPhantom = async () => {
    if (!window.phantom?.solana) {
      alert('Phantom wallet not found. Please install Phantom extension.');
      return;
    }

    setIsConnecting(true);
    try {
      const response = await window.phantom.solana.connect();
      setConnectedWallet('Phantom');
      setWalletAddress(response.publicKey.toString());
      setWalletStatus('Connected to Phantom');
    } catch (error) {
      console.error('Phantom connection error:', error);
      alert('Failed to connect to Phantom wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      alert('MetaMask not found. Please install MetaMask extension.');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      setConnectedWallet('MetaMask');
      setWalletAddress(accounts[0]);
      setWalletStatus('Connected to MetaMask');
    } catch (error) {
      console.error('MetaMask connection error:', error);
      alert('Failed to connect to MetaMask');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setConnectedWallet(null);
    setWalletAddress('');
    setWalletStatus('Disconnected');
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '20px',
      borderRadius: '10px',
      color: '#B8A99A',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      fontSize: '12px',
      minWidth: '250px'
    }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#8B7355' }}>Wallet Connection</h3>
      
      {connectedWallet ? (
        <div>
          <p style={{ margin: '5px 0', color: '#14F195' }}>✅ {connectedWallet} Connected</p>
          <p style={{ margin: '5px 0', fontSize: '10px', wordBreak: 'break-all' }}>
            {formatAddress(walletAddress)}
          </p>
          <button
            onClick={disconnectWallet}
            style={{
              background: 'linear-gradient(45deg, #FF6B6B, #FF8E8E)',
              color: '#B8A99A',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '10px',
              marginTop: '8px',
              width: '100%'
            }}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div>
          <p style={{ margin: '5px 0' }}>Status: {walletStatus}</p>
          <p style={{ margin: '5px 0' }}>Phantom: {phantomAvailable ? '✅' : '❌'}</p>
          <p style={{ margin: '5px 0' }}>MetaMask: {metamaskAvailable ? '✅' : '❌'}</p>
          
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {phantomAvailable && (
              <button
                onClick={connectPhantom}
                disabled={isConnecting}
                style={{
                  background: 'linear-gradient(45deg, #9945FF, #14F195)',
                  color: '#B8A99A',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '5px',
                  cursor: isConnecting ? 'not-allowed' : 'pointer',
                  fontSize: '10px',
                  opacity: isConnecting ? 0.7 : 1
                }}
              >
                {isConnecting ? 'Connecting...' : 'Connect Phantom'}
              </button>
            )}
            
            {metamaskAvailable && (
              <button
                onClick={connectMetaMask}
                disabled={isConnecting}
                style={{
                  background: 'linear-gradient(45deg, #F6851B, #FFA726)',
                  color: '#B8A99A',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '5px',
                  cursor: isConnecting ? 'not-allowed' : 'pointer',
                  fontSize: '10px',
                  opacity: isConnecting ? 0.7 : 1
                }}
              >
                {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletTest; 