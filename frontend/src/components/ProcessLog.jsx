import React, { useEffect, useRef } from 'react';

export default function ProcessLog({ logs }) {
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="card">
      <div className="card-title" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span>📜</span> Security Process Audit Log
        </div>
        <span className="badge" style={{ fontSize: '0.75rem' }}>
          {logs.length} Events Logged
        </span>
      </div>

      <div className="log-window">
        {logs.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '0.5rem' }}>
            No cryptographic operations recorded yet. Enter a message and run process.
          </div>
        ) : (
          logs.map((log, idx) => (
            <div className="log-entry" key={idx}>
              <span className="log-time">[{log.time}]</span>
              <span className="log-msg">{log.message}</span>
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}
