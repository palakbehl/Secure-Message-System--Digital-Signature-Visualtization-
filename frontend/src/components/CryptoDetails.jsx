import React, { useState } from 'react';

export default function CryptoDetails() {
  const [isOpen, setIsOpen] = useState(false);

  const specItems = [
    { name: 'Hash Algorithm', spec: 'SHA-256', desc: 'Produces a fixed 256-bit (32-byte) message digest; collision resistant.' },
    { name: 'RSA Key Length', spec: '2048 bits', desc: 'Standard security key length providing 112 bits of equivalent symmetric security.' },
    { name: 'Encryption Padding', spec: 'RSA-OAEP', desc: 'Optimal Asymmetric Encryption Padding with SHA-256 to prevent chosen-ciphertext attacks.' },
    { name: 'Signature Scheme', spec: 'RSA-PSS', desc: 'Probabilistic Signature Scheme offering provable security under the random oracle model.' },
    { name: 'Public Key Format', spec: 'SubjectPublicKeyInfo (SPKI)', desc: 'X.509 standard structure formatted in PEM format.' },
    { name: 'Private Key Format', spec: 'PKCS#8', desc: 'Standard private key information syntax formatted in PEM format.' },
    { name: 'Encoding Encodings', spec: 'Hex / Base64', desc: 'Hexadecimal used for Hashes (64 chars); Base64 used for signatures and ciphertexts.' }
  ];

  return (
    <div className="card">
      <div
        className="card-title"
        style={{ cursor: 'pointer', marginBottom: isOpen ? '1rem' : '0', borderBottom: isOpen ? '1px solid var(--border-color)' : 'none' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span>⚙️</span> Cryptographic Parameter Details
        </div>
        <span style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>
          {isOpen ? '▲ Hide Specifications' : '▼ View Technical Specifications'}
        </span>
      </div>

      {isOpen && (
        <div style={{ marginTop: '0.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.5rem' }}>Parameter</th>
                <th style={{ padding: '0.5rem' }}>Specification</th>
                <th style={{ padding: '0.5rem' }}>Technical Rationale</th>
              </tr>
            </thead>
            <tbody>
              {specItems.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '0.6rem 0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>{item.name}</td>
                  <td style={{ padding: '0.6rem 0.5rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{item.spec}</td>
                  <td style={{ padding: '0.6rem 0.5rem', color: 'var(--text-secondary)' }}>{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
