const express = require('express');
const router = express.Router();
const cryptoService = require('../cryptoService');

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'Secure Message System Backend',
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /api/hash
 * Computes SHA-256 hash for input message
 */
router.post('/hash', (req, res) => {
  try {
    const { message } = req.body;
    if (typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Please enter a message.' });
    }

    const hash = cryptoService.computeSHA256(message);
    res.json({
      algorithm: 'SHA-256',
      hashSizeBits: 256,
      hexLength: hash.length,
      hash
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/generate-keys
 * Generates a new RSA 2048-bit key pair in server session
 */
router.post('/generate-keys', (req, res) => {
  try {
    const keys = cryptoService.generateKeyPair();
    res.json({
      algorithm: 'RSA',
      keySize: 2048,
      publicKey: keys.publicKey,
      privateKey: keys.privateKey,
      generatedAt: keys.generatedAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/sign
 * Generates an RSA-PSS + SHA-256 digital signature
 */
router.post('/sign', (req, res) => {
  try {
    const { message } = req.body;
    if (typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Please enter a message.' });
    }

    const keys = cryptoService.getActiveKeys();
    const signature = cryptoService.createDigitalSignature(message, keys.privateKey);

    res.json({
      algorithm: 'RSA-PSS-SHA256',
      signature,
      publicKeyUsed: keys.publicKey
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/verify
 * Cryptographically verifies digital signature against a message
 */
router.post('/verify', (req, res) => {
  try {
    const { message, signature, publicKey } = req.body;

    if (typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required for verification.' });
    }
    if (typeof signature !== 'string' || signature.trim() === '') {
      return res.status(400).json({ error: 'Signature is required for verification.' });
    }

    const keyToUse = publicKey || cryptoService.getActiveKeys().publicKey;
    const valid = cryptoService.verifyDigitalSignature(message, signature, keyToUse);

    res.json({
      valid,
      messageEvaluated: message,
      algorithm: 'RSA-PSS-SHA256'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/encrypt
 * Encrypts a message using RSA-OAEP + SHA-256 and RSA Public Key
 */
router.post('/encrypt', (req, res) => {
  try {
    const { message, publicKey } = req.body;
    if (typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Please enter a message.' });
    }

    const keyToUse = publicKey || cryptoService.getActiveKeys().publicKey;
    const ciphertext = cryptoService.encryptRSAOAEP(message, keyToUse);

    res.json({
      algorithm: 'RSA-OAEP-SHA256',
      ciphertext
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/decrypt
 * Decrypts RSA-OAEP ciphertext using RSA Private Key
 */
router.post('/decrypt', (req, res) => {
  try {
    const { ciphertext, privateKey } = req.body;
    if (typeof ciphertext !== 'string' || ciphertext.trim() === '') {
      return res.status(400).json({ error: 'Ciphertext is required for decryption.' });
    }

    const keyToUse = privateKey || cryptoService.getActiveKeys().privateKey;
    const message = cryptoService.decryptRSAOAEP(ciphertext, keyToUse);

    res.json({
      algorithm: 'RSA-OAEP-SHA256',
      message
    });
  } catch (err) {
    res.status(400).json({ error: 'Decryption failed. Invalid ciphertext or key.' });
  }
});

/**
 * POST /api/run-complete-process
 * Runs full security workflow (Hash -> Sign -> Verify -> Encrypt -> Decrypt)
 */
router.post('/run-complete-process', (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Please enter a message.' });
    }

    const result = cryptoService.runCompleteSecurityProcess(message);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
