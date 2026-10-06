import React from 'react';

export default function ProcessVisualizer({ currentStep, activeMessage }) {
  const stepsList = [
    { id: 1, name: '1. ORIGINAL MESSAGE', desc: activeMessage ? `"${activeMessage}"` : 'Enter payload' },
    { id: 2, name: '2. SHA-256 HASHING', desc: 'Compute 256-bit fixed digest' },
    { id: 3, name: '3. RSA KEY PAIR', desc: 'RSA 2048-bit Public & Private Keys' },
    { id: 4, name: '4. DIGITAL SIGNATURE', desc: 'RSA-PSS + SHA-256 + Private Key' },
    { id: 5, name: '5. SIGNATURE VERIFICATION', desc: 'RSA Public Key check (VALID)' },
    { id: 6, name: '6. RSA-OAEP ENCRYPTION', desc: 'Public Key ciphertext (Confidentiality)' },
    { id: 7, name: '7. RSA-OAEP DECRYPTION', desc: 'Private Key plaintext restoration' }
  ];

  return (
    <div className="card">
      <div className="card-title">
        <span>🗺️</span> Cryptographic Workflow Visualizer
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        Step-by-step sequential breakdown of message hashing, key generation, signing, verification, and encryption.
      </p>

      <div className="visualizer-container">
        {stepsList.map((step, idx) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          let statusClass = '';
          if (isCompleted) statusClass = 'completed';
          if (isActive) statusClass = 'active';

          return (
            <React.Fragment key={step.id}>
              <div className={`step-node ${statusClass}`}>
                <div className="step-number">
                  {isCompleted ? '✓' : step.id}
                </div>
                <div className="step-content">
                  <div className="step-title">{step.name}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
                {isActive && (
                  <span className="badge" style={{ background: 'var(--accent-cyan)', color: '#000', fontSize: '0.7rem' }}>
                    PROCESSING
                  </span>
                )}
                {isCompleted && (
                  <span className="badge" style={{ background: 'var(--status-success-bg)', color: 'var(--status-success)', fontSize: '0.7rem' }}>
                    DONE
                  </span>
                )}
              </div>
              {idx < stepsList.length - 1 && (
                <div className={`step-arrow ${isCompleted || isActive ? 'active' : ''}`}>↓</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
