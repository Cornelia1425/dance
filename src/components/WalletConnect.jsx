import React, { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ onConnect, onDisconnect }) => {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowWalletOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const connectMetaMask = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const account = accounts[0];
        
        setAccount(account);
        onConnect(account, provider);
        setShowWalletOptions(false);
      } else {
        setError('Please install MetaMask to connect your wallet');
      }
    } catch (err) {
      setError('Failed to connect MetaMask: ' + err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const connectPhantom = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      if (typeof window.solana !== 'undefined' && window.solana.isPhantom) {
        const response = await window.solana.connect();
        const account = response.publicKey.toString();
        setAccount(account);
        onConnect(account, window.solana);
        setShowWalletOptions(false);
      } else {
        setError('Please install Phantom wallet to connect');
      }
    } catch (err) {
      setError('Failed to connect Phantom: ' + err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const connectTrustWallet = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const account = accounts[0];
        
        setAccount(account);
        onConnect(account, provider);
        setShowWalletOptions(false);
      } else {
        setError('Please install Trust Wallet to connect');
      }
    } catch (err) {
      setError('Failed to connect Trust Wallet: ' + err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const connectCoinbase = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        const account = accounts[0];
        
        setAccount(account);
        onConnect(account, provider);
        setShowWalletOptions(false);
      } else {
        setError('Please install Coinbase Wallet to connect');
      }
    } catch (err) {
      setError('Failed to connect Coinbase: ' + err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    onDisconnect();
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="wallet-connect" ref={dropdownRef} style={{ position: 'relative' }}>
      {!account ? (
        <div>
          <button 
            onClick={() => setShowWalletOptions(!showWalletOptions)} 
            disabled={isConnecting}
            className="connect-btn"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
          
          {showWalletOptions && (
            <div className="wallet-options" style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              right: '0',
              background: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '10px',
              marginTop: '5px',
              zIndex: 1000,
              backdropFilter: 'blur(10px)'
            }}>
              <button 
                onClick={connectMetaMask}
                disabled={isConnecting}
                style={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #A67C52, #C17E61)',
                  color: '#B8A99A',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginBottom: '8px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                🦊 MetaMask
              </button>
              
              <button 
                onClick={connectPhantom}
                disabled={isConnecting}
                style={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #8B7355, #A67C52)',
                  color: '#B8A99A',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginBottom: '8px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                👻 Phantom
              </button>
              
              <button 
                onClick={connectTrustWallet}
                disabled={isConnecting}
                style={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #C17E61, #D4A574)',
                  color: '#B8A99A',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginBottom: '8px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                🛡️ Trust Wallet
              </button>
              
              <button 
                onClick={connectCoinbase}
                disabled={isConnecting}
                style={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #B8A99A, #D4A574)',
                  color: '#B8A99A',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                🪙 Coinbase Wallet
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="wallet-info">
          <span className="account">{formatAddress(account)}</span>
          <button onClick={disconnectWallet} className="disconnect-btn">
            Disconnect
          </button>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default WalletConnect; 