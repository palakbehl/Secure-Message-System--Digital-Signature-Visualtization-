import React from 'react';

export default function ComparisonCard() {
  return (
    <div className="card">
      <div className="card-title">
        <span>⚖️</span> Cryptographic Comparison: Encryption vs Digital Signature
      </div>

      <div className="comparison-grid">
        {/* Card 1: RSA Encryption */}
        <div className="comp-card">
          <div className="comp-title">
            <span>🔐</span> RSA Encryption
          </div>
          <div className="comp-purpose">
            PRIMARY PURPOSE: CONFIDENTIALITY
          </div>
          
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', background: '#090d16', padding: '0.75rem', borderRadius: '6px', marginBottom: '0.85rem', color: '#93c5fd' }}>
            Plaintext<br/>
            &nbsp;↓ (Encrypt with Public Key)<br/>
            Ciphertext<br/>
            &nbsp;↓ (Decrypt with Private Key)<br/>
            Plaintext
          </div>

          <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
            <li>Prevents unauthorized parties from reading sensitive message contents.</li>
            <li>Sender uses recipient's <strong>Public Key</strong>.</li>
            <li>Recipient uses their <strong>Private Key</strong> to decrypt.</li>
          </ul>
        </div>

        {/* Card 2: Digital Signature */}
        <div className="comp-card">
          <div className="comp-title">
            <span>✍️</span> Digital Signature
          </div>
          <div className="comp-purpose" style={{ color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)' }}>
            PURPOSE: INTEGRITY & AUTHENTICATION
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', background: '#090d16', padding: '0.75rem', borderRadius: '6px', marginBottom: '0.85rem', color: '#d8b4fe' }}>
            Message ➔ SHA-256 Hash<br/>
            &nbsp;↓ (Sign with Private Key)<br/>
            Digital Signature<br/>
            &nbsp;↓ (Verify with Public Key)<br/>
            VALID / INVALID
          </div>

          <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
            <li>Guarantees the message was not modified in transit (Integrity).</li>
            <li>Proves exact sender identity (Authentication).</li>
            <li>Prevents sender from denying message creation (Non-repudiation).</li>
          </ul>
        </div>
      </div>

      <div className="info-box" style={{ marginTop: '1rem' }}>
        <strong>Academic Summary:</strong> Encryption keeps data <strong>secret</strong>, whereas Digital Signatures make data <strong>trustworthy</strong>. A secure communication channel often combines both (Sign-then-Encrypt or Encrypt-then-Sign).
      </div>
    </div>
  );
}
