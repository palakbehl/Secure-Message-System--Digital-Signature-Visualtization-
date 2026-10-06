import React from 'react';

export default function HashCard({ message, hashData, onCopy }) {
  if (!hashData) return null;

  return (
    <div className="card">
      <div className="card-title">
        <span>#️⃣</span> Cryptographic Hashing — SHA-256
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        <div>
          <span className="label">Algorithm</span>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--accent-cyan)' }}>
            SHA-256
          </div>
        </div>
        <div>
          <span className="label">Hash Output Size</span>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--accent-cyan)' }}>
            256 bits (32 bytes)
          </div>
        </div>
        <div>
          <span className="label">Hex String Length</span>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--accent-cyan)' }}>
            {hashData.hash ? hashData.hash.length : 64} characters
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="label">Original Message Input</label>
        <div className="code-box" style={{ color: '#e5e7eb' }}>
          {message}
        </div>
      </div>

      <div className="form-group">
        <label className="label">SHA-256 Hexadecimal Hash Digest</label>
        <div className="code-box">
          {hashData.hash}
          <button className="copy-btn" onClick={() => onCopy(hashData.hash, 'SHA-256 Hash')}>
            📋 Copy Hash
          </button>
        </div>
      </div>

      <div className="info-box">
        <strong>SHA-256 Explanation:</strong> SHA-256 is a deterministic one-way cryptographic hash function that produces a unique 256-bit fingerprint for any input payload. Due to the <em>avalanche effect</em>, altering even a single character in the message produces a radically different hash digest.
      </div>

      <div className="warning-box" style={{ marginTop: '0.6rem' }}>
        <strong>IMPORTANT ACADEMIC CONCEPT: HASHING ≠ ENCRYPTION</strong>
        <p style={{ marginTop: '0.2rem', fontSize: '0.85rem', color: '#f87171' }}>
          Hashing is a strictly <strong>one-way mathematical operation</strong> with no key. You cannot "decrypt" a hash back into the original plaintext. Encryption, by contrast, is a <strong>two-way operation</strong> requiring a key to reverse.
        </p>
      </div>
    </div>
  );
}
