import React from 'react';

export default function SignatureCard({ signature, algorithm = 'RSA-PSS-SHA256', onCopy }) {
  if (!signature) return null;

  return (
    <div className="card">
      <div className="card-title">
        <span>✍️</span> Digital Signature Generation
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <span className="status-pill success">
          ✓ Digital Signature Generated
        </span>
        <span className="badge">
          Algorithm: {algorithm}
        </span>
      </div>

      {/* Signature Flowchart Mini Diagram */}
      <div style={{ background: '#090d16', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid var(--border-color)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', textAlign: 'center', color: '#93c5fd' }}>
        Message ➔ SHA-256 Hashing ➔ 256-bit Digest ➔ RSA Private Key (RSA-PSS Padding) ➔ Base64 Signature
      </div>

      <div className="form-group">
        <label className="label">Generated Digital Signature (Base64 Encoded)</label>
        <div className="code-box" style={{ color: '#d8b4fe' }}>
          {signature}
          <button className="copy-btn" onClick={() => onCopy(signature, 'Digital Signature')}>
            📋 Copy Signature
          </button>
        </div>
      </div>

      <div className="info-box">
        <strong>Digital Signature Mechanics:</strong> A digital signature is created by hashing the original message with SHA-256 and signing the resulting digest using the sender's <strong>RSA Private Key</strong> under the secure <strong>RSA-PSS</strong> (Probabilistic Signature Scheme) padding model.
      </div>
    </div>
  );
}
