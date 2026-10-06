import React from 'react';

export default function EncryptionCard({ message, ciphertext, decryptedMessage, onCopy }) {
  if (!ciphertext) return null;

  return (
    <div className="card">
      <div className="card-title">
        <span>🔐</span> RSA-OAEP Public-Key Encryption & Decryption
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <span className="status-pill success">
          ✓ RSA-OAEP Decryption Successful
        </span>
        <span className="badge">
          Padding: RSA-OAEP + SHA-256
        </span>
      </div>

      {/* Encryption Flow Mini Diagram */}
      <div style={{ background: '#090d16', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid var(--border-color)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', textAlign: 'center', color: '#93c5fd' }}>
        Plaintext ➔ RSA Public Key (RSA-OAEP) ➔ Ciphertext (Base64) ➔ RSA Private Key ➔ Original Plaintext
      </div>

      <div className="form-group">
        <label className="label">Original Message (Input Plaintext)</label>
        <div className="code-box" style={{ color: '#e5e7eb' }}>
          {message}
        </div>
      </div>

      <div className="form-group">
        <label className="label">RSA-OAEP Encrypted Ciphertext (Base64)</label>
        <div className="code-box" style={{ color: '#fef08a' }}>
          {ciphertext}
          <button className="copy-btn" onClick={() => onCopy(ciphertext, 'Ciphertext')}>
            📋 Copy Ciphertext
          </button>
        </div>
      </div>

      <div className="form-group">
        <label className="label">Decrypted Plaintext Output</label>
        <div className="code-box" style={{ color: '#6ee7b7' }}>
          {decryptedMessage}
        </div>
      </div>

      <div className="info-box">
        <strong>Confidentiality via Asymmetric Encryption:</strong> RSA-OAEP (Optimal Asymmetric Encryption Padding) encrypts data using the recipient's <strong>Public Key</strong>. Only the holder of the corresponding <strong>Private Key</strong> can reverse the transformation and retrieve the original plaintext, ensuring total message secrecy over untrusted networks.
      </div>
    </div>
  );
}
