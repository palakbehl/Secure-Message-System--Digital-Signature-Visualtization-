import React, { useState, useEffect } from 'react';

export default function TamperDemoCard({ onRunTamperTest, onVerify, signature, initialMessage = '' }) {
  const [tamperedMessage, setTamperedMessage] = useState(initialMessage || 'Hello World');
  const [isTampered, setIsTampered] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Synchronize with active evaluated message whenever initialMessage or signature changes
  useEffect(() => {
    if (initialMessage) {
      setTamperedMessage(initialMessage);
    }
    setIsTampered(false);
    setTestResult(null);
  }, [initialMessage, signature]);

  const handleTamperMessage = async () => {
    const altered = tamperedMessage.includes('!') ? tamperedMessage + ' [TAMPERED]' : tamperedMessage + '!';
    setTamperedMessage(altered);
    setIsTampered(true);
    setLoading(true);

    try {
      const res = await onVerify(altered, signature);
      setTestResult(res.valid);
    } catch (err) {
      setTestResult(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreMessage = async () => {
    const original = initialMessage || 'Hello World';
    setTamperedMessage(original);
    setIsTampered(false);
    setLoading(true);

    try {
      const res = await onVerify(original, signature);
      setTestResult(res.valid);
    } catch (err) {
      setTestResult(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ border: isTampered ? '1px solid var(--status-danger)' : '1px solid var(--status-success)' }}>
      <div className="card-title">
        <span>🧪</span> Tamper Detection Demonstration
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Test how cryptographic digital signatures instantly detect unauthorized message modifications in transit.
      </p>

      {!signature && (
        <div className="info-box" style={{ marginBottom: '1rem', borderLeftColor: 'var(--status-warning)', background: 'rgba(245, 158, 11, 0.08)' }}>
          💡 <strong>How to test this:</strong> First enter a message and click <strong>"Run Complete Security Process"</strong> above. Once a digital signature is generated, you can click <strong>"Modify Message"</strong> to observe how tampering with the message causes verification to fail instantly!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <span className="label">Active Evaluated Message</span>
          <div className="code-box" style={{ color: isTampered ? '#fca5a5' : '#a7f3d0' }}>
            {tamperedMessage}
          </div>
        </div>

        <div>
          <span className="label">Original Signature (Fixed)</span>
          <div className="code-box" style={{ maxHeight: '65px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {signature ? signature : 'Run security process to generate signature'}
          </div>
        </div>
      </div>

      <div className="btn-group" style={{ marginBottom: '1rem' }}>
        {!isTampered ? (
          <button
            className="btn btn-warning"
            onClick={handleTamperMessage}
            disabled={!signature || loading}
          >
            🚨 Modify Message (Simulate Tampering)
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={handleRestoreMessage}
            disabled={loading}
          >
            🔄 Restore Original Message
          </button>
        )}
      </div>

      {testResult !== null && (
        <div>
          {testResult === false ? (
            <div className="warning-box">
              <strong style={{ fontSize: '1rem' }}>✗ SIGNATURE INVALID — TAMPER DETECTED!</strong>
              <p style={{ marginTop: '0.4rem' }}>
                The payload was modified to <code>"{tamperedMessage}"</code> after signing. Because the computed SHA-256 digest of the tampered message no longer matches the signed hash, cryptographic signature verification fails immediately!
              </p>
            </div>
          ) : (
            <div className="info-box" style={{ borderLeftColor: 'var(--status-success)', background: 'rgba(16, 185, 129, 0.08)' }}>
              <strong style={{ color: 'var(--status-success)', fontSize: '1rem' }}>✓ SIGNATURE VALID — ORIGINAL INTEGRITY RESTORED</strong>
              <p style={{ marginTop: '0.4rem', color: '#a7f3d0' }}>
                The original message payload <code>"{tamperedMessage}"</code> has been restored. The cryptographic signature matches the message hash perfectly.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
