import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Polyfill for buffer
import { Buffer } from 'buffer'
window.Buffer = Buffer

console.log('main.jsx loading...');

try {
  const rootElement = document.getElementById('root');
  console.log('Root element found:', rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  const root = createRoot(rootElement);
  console.log('React root created');
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  
  console.log('App rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);
  document.body.innerHTML = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: #000;
      color: #B8A99A;
      font-family: Arial, sans-serif;
      text-align: center;
    ">
      <div>
        <h1>Dance Portfolio</h1>
        <p>Error loading app: ${error.message}</p>
        <button onclick="window.location.reload()" style="
          background: #A67C52;
          color: #B8A99A;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        ">
          Reload Page
        </button>
      </div>
    </div>
  `;
}
