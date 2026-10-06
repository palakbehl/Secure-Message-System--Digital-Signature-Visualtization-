const API_BASE = '/api';

/**
 * Helper to handle fetch requests cleanly with JSON parsing and error handling
 */
async function fetchJSON(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `HTTP error ${res.status}`);
    }
    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Backend server is offline. Please start the Express server on port 5000.');
    }
    throw err;
  }
}

export async function checkHealth() {
  return fetchJSON('/health');
}

export async function hashMessage(message) {
  return fetchJSON('/hash', {
    method: 'POST',
    body: JSON.stringify({ message })
  });
}

export async function generateKeys() {
  return fetchJSON('/generate-keys', {
    method: 'POST'
  });
}

export async function signMessage(message) {
  return fetchJSON('/sign', {
    method: 'POST',
    body: JSON.stringify({ message })
  });
}

export async function verifySignature(message, signature, publicKey) {
  return fetchJSON('/verify', {
    method: 'POST',
    body: JSON.stringify({ message, signature, publicKey })
  });
}

export async function encryptMessage(message, publicKey) {
  return fetchJSON('/encrypt', {
    method: 'POST',
    body: JSON.stringify({ message, publicKey })
  });
}

export async function decryptMessage(ciphertext, privateKey) {
  return fetchJSON('/decrypt', {
    method: 'POST',
    body: JSON.stringify({ ciphertext, privateKey })
  });
}

export async function runCompleteProcess(message) {
  return fetchJSON('/run-complete-process', {
    method: 'POST',
    body: JSON.stringify({ message })
  });
}
