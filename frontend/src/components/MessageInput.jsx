import React from 'react';

export default function MessageInput({
  message,
  setMessage,
  onRunProcess,
  onLoadDemo,
  onReset,
  loading,
  error
}) {
  return (
    <div className="card">
      <div className="card-title">
        <span>✉️</span> Enter Your Message
      </div>

      {error && (
        <div className="error-banner">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <div className="form-group">
        <label className="label">Plaintext Input Message</label>
        <textarea
          className="textarea-input"
          placeholder="Type a message to secure..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
      </div>

      <div className="btn-group">
        <button
          className="btn btn-primary"
          onClick={onRunProcess}
          disabled={loading}
        >
          {loading ? '⚡ Executing Crypto Operations...' : '🔒 Run Complete Security Process'}
        </button>

        <button
          className="btn btn-secondary"
          onClick={onLoadDemo}
          disabled={loading}
        >
          📄 Load Demo Message
        </button>

        <button
          className="btn btn-warning"
          onClick={onReset}
          disabled={loading}
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}
