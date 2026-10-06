import React from 'react';

export default function VerificationCard({ verificationResult, message, signature }) {
  if (verificationResult === null || verificationResult === undefined) return null;

  const isValid = Boolean(verificationResult);

  return (
    <div className="card">
      <div className="card-title">
        <span>🛡️</span> Digital Signature Verification
      </div>

      <div style={{ marginBottom: '1rem' }}>
        {isValid ? (
          <div className="status-pill success" style={{ fontSize: '1rem', padding: '0.6rem 1.25rem' }}>
            ✓ SIGNATURE VALID — Message Integrity & Authenticity Verified
          </div>
        ) : (
          <div className="status-pill danger" style={{ fontSize: '1rem', padding: '0.6rem 1.25rem' }}>
            ✗ SIGNATURE INVALID — Message or Signature Has Been Tampered With
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="label">Message Evaluated</label>
        <div className="code-box" style={{ color: isValid ? '#a7f3d0' : '#fca5a5' }}>
          {message}
        </div>
      </div>

      {isValid ? (
        <div className="info-box">
          <strong>Verification Process:</strong> The receiver uses the sender's <strong>RSA Public Key</strong> to decrypt the signature and verify that the recomputed SHA-256 hash matches the signature digest. Because the hashes match, the receiver is guaranteed:
          <ul style={{ marginLeft: '1.2rem', marginTop: '0.4rem' }}>
            <li><strong>Message Integrity:</strong> The payload was not altered during transmission.</li>
            <li><strong>Authentication & Non-Repudiation:</strong> Only the owner of the matching private key could have produced this signature.</li>
          </ul>
        </div>
      ) : (
        <div className="warning-box">
          <strong>Verification Failure:</strong> The signature check failed! The message content evaluated does not correspond to the digital signature. This indicates data tampering, unauthorized modification, or an incorrect public key.
        </div>
      )}
    </div>
  );
}
