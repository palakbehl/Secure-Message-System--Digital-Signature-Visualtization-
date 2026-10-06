const crypto = require('crypto');

// In-memory key pair session storage
let currentKeyPair = null;

/**
 * Generates an RSA 2048-bit Key Pair in PEM format
 * Public key: SPKI
 * Private key: PKCS#8
 */
function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  currentKeyPair = { publicKey, privateKey, generatedAt: new Date().toISOString() };
  return currentKeyPair;
}

/**
 * Gets active session keys, generating if absent
 */
function getActiveKeys() {
  if (!currentKeyPair) {
    generateKeyPair();
  }
  return currentKeyPair;
}

/**
 * Computes SHA-256 cryptographic hash of a string
 * Returns hex encoded 256-bit string
 */
function computeSHA256(message) {
  if (typeof message !== 'string') {
    throw new Error('Message must be a string');
  }
  return crypto.createHash('sha256').update(message, 'utf8').digest('hex');
}

/**
 * Creates Digital Signature using RSA-PSS with SHA-256
 */
function createDigitalSignature(message, privateKeyPem = null) {
  if (typeof message !== 'string') {
    throw new Error('Message must be a string');
  }
  const keyToUse = privateKeyPem || getActiveKeys().privateKey;
  const messageBuffer = Buffer.from(message, 'utf8');

  const signatureBuffer = crypto.sign('sha256', messageBuffer, {
    key: keyToUse,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
  });

  return signatureBuffer.toString('base64');
}

/**
 * Verifies Digital Signature using RSA Public Key + RSA-PSS + SHA-256
 */
function verifyDigitalSignature(message, signatureBase64, publicKeyPem = null) {
  if (typeof message !== 'string' || typeof signatureBase64 !== 'string') {
    return false;
  }

  try {
    const keyToUse = publicKeyPem || getActiveKeys().publicKey;
    const messageBuffer = Buffer.from(message, 'utf8');
    const signatureBuffer = Buffer.from(signatureBase64, 'base64');

    return crypto.verify(
      'sha256',
      messageBuffer,
      {
        key: keyToUse,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
      },
      signatureBuffer
    );
  } catch (error) {
    console.error('Signature verification crypto error:', error.message);
    return false;
  }
}

/**
 * Encrypts a message using RSA-OAEP with SHA-256 and RSA Public Key
 */
function encryptRSAOAEP(message, publicKeyPem = null) {
  if (typeof message !== 'string') {
    throw new Error('Message must be a string');
  }
  const keyToUse = publicKeyPem || getActiveKeys().publicKey;
  const messageBuffer = Buffer.from(message, 'utf8');

  const encryptedBuffer = crypto.publicEncrypt(
    {
      key: keyToUse,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256'
    },
    messageBuffer
  );

  return encryptedBuffer.toString('base64');
}

/**
 * Decrypts RSA-OAEP ciphertext using RSA Private Key
 */
function decryptRSAOAEP(ciphertextBase64, privateKeyPem = null) {
  if (typeof ciphertextBase64 !== 'string') {
    throw new Error('Ciphertext must be a Base64 string');
  }

  const keyToUse = privateKeyPem || getActiveKeys().privateKey;
  const ciphertextBuffer = Buffer.from(ciphertextBase64, 'base64');

  const decryptedBuffer = crypto.privateDecrypt(
    {
      key: keyToUse,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256'
    },
    ciphertextBuffer
  );

  return decryptedBuffer.toString('utf8');
}

/**
 * Executes full end-to-end security process workflow
 */
function runCompleteSecurityProcess(message) {
  if (!message || typeof message !== 'string' || message.trim() === '') {
    throw new Error('Please enter a message.');
  }

  const hash = computeSHA256(message);
  const keys = getActiveKeys();
  const signature = createDigitalSignature(message, keys.privateKey);
  const signatureValid = verifyDigitalSignature(message, signature, keys.publicKey);
  const ciphertext = encryptRSAOAEP(message, keys.publicKey);
  const decryptedMessage = decryptRSAOAEP(ciphertext, keys.privateKey);

  const steps = [
    { step: 1, title: 'Original Message Received', details: `Input length: ${message.length} characters` },
    { step: 2, title: 'SHA-256 Hash Computed', details: `Hash: ${hash}` },
    { step: 3, title: 'RSA 2048-Bit Keys Activated', details: 'RSA-2048 Public & Private Keys in memory' },
    { step: 4, title: 'Digital Signature Generated', details: 'RSA-PSS + SHA-256 + Private Key' },
    { step: 5, title: 'Signature Cryptographically Verified', details: signatureValid ? 'VALID' : 'INVALID' },
    { step: 6, title: 'Message Encrypted', details: 'RSA-OAEP + SHA-256 + Public Key' },
    { step: 7, title: 'Message Decrypted', details: 'RSA-OAEP + SHA-256 + Private Key' }
  ];

  return {
    message,
    hash,
    publicKey: keys.publicKey,
    // Private key stays server-side or is only exposed when explicitly requested
    signature,
    signatureValid,
    ciphertext,
    decryptedMessage,
    steps
  };
}

module.exports = {
  generateKeyPair,
  getActiveKeys,
  computeSHA256,
  createDigitalSignature,
  verifyDigitalSignature,
  encryptRSAOAEP,
  decryptRSAOAEP,
  runCompleteSecurityProcess
};
