import React, { useState } from 'react';

export default function RSAKeyCard({ keysData, onRegenerateKeys, onCopy, loading }) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  if (!keysData) return null;

  return (
    <div className="card">
      <div className="card-title" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span>🔑</span> RSA 2048-Bit Key Pair
        </div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={onRegenerateKeys}
          disabled={loading}
        >
          🔄 Generate New Key Pair
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <span className="status-pill success">
          ✓ RSA 2048-bit keys active in server memory
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Format: SPKI (Public) / PKCS#8 (Private)
        </span>
      </div>

      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label className="label" style={{ margin: 0 }}>RSA Public Key (Shareable)</label>
          <button className="btn btn-secondary btn-sm" onClick={() => onCopy(keysData.publicKey, 'Public Key')}>
            📋 Copy Public Key
          </button>
        </div>
        <div className="code-box" style={{ maxHeight: '140px', color: '#67e8f9' }}>
          {keysData.publicKey}
        </div>
      </div>

      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label className="label" style={{ margin: 0 }}>RSA Private Key (Secret)</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowPrivateKey(!showPrivateKey)}
            >
              {showPrivateKey ? '🙈 Hide Private Key' : '👁️ Show Private Key'}
            </button>
            {showPrivateKey && (
              <button className="btn btn-secondary btn-sm" onClick={() => onCopy(keysData.privateKey, 'Private Key')}>
                📋 Copy Private Key
              </button>
            )}
          </div>
        </div>

        {showPrivateKey ? (
          <div className="code-box" style={{ maxHeight: '160px', color: '#fca5a5' }}>
            {keysData.privateKey}
          </div>
        ) : (
          <div className="code-box" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
            •••••••• [PRIVATE KEY HIDDEN FOR SECURITY — Click "Show Private Key" to reveal] ••••••••
          </div>
        )}
      </div>

      <div className="info-box">
        <strong>Asymmetric Key Principles:</strong> The <strong>Public Key</strong> is distributed to anyone to encrypt messages or verify signatures. The <strong>Private Key</strong> must never be shared and is used exclusively by the owner to decrypt ciphertext or sign payloads.
      </div>
    </div>
  );
}
