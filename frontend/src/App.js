import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    if (!text) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/generate-qr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      
      const data = await response.json();
      setQrCode(data.qr_code);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <div className="input-section">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to generate QR code"
        />
        <button onClick={generateQR} disabled={loading}>
          {loading ? 'Generating...' : 'Generate QR'}
        </button>
      </div>
      {qrCode && (
        <div className="qr-section">
          <img src={qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default App;