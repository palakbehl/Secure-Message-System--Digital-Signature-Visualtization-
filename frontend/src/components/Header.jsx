import React from 'react';

export default function Header() {
  return (
    <header className="header-container">
      <h1 className="main-title">SECURE MESSAGE SYSTEM</h1>
      <div className="subtitle">RSA • SHA-256 • DIGITAL SIGNATURE VISUALISATION</div>
      
      <p className="description">
        An interactive academic demonstration of cryptographic hashing, RSA public-key encryption, digital signatures, and message integrity verification.
      </p>

      <div className="badge-row">
        <span className="badge">RSA 2048-bit</span>
        <span className="badge">SHA-256</span>
        <span className="badge">RSA-OAEP</span>
        <span className="badge">RSA-PSS</span>
        <span className="badge">Node.js Crypto</span>
      </div>

      <div className="disclaimer-badge">
        ⚠️ Educational Demonstration — Not intended for production security.
      </div>
    </header>
  );
}
