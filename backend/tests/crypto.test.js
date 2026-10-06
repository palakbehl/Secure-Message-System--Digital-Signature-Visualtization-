const assert = require('assert');
const cryptoService = require('../cryptoService');

console.log('==================================================');
console.log('RUNNING BACKEND CRYPTOGRAPHIC UNIT TEST SUITE');
console.log('==================================================');

let testsPassed = 0;
let testsFailed = 0;

function runTest(testName, fn) {
  try {
    fn();
    console.log(`[PASS] ${testName}`);
    testsPassed++;
  } catch (err) {
    console.error(`[FAIL] ${testName}`);
    console.error(`       Error: ${err.message}`);
    testsFailed++;
  }
}

// 1. SHA-256 Hashing Test
runTest('1. SHA-256 Hashing produces 64-char hex string', () => {
  const hash = cryptoService.computeSHA256('Hello World');
  assert.strictEqual(typeof hash, 'string');
  assert.strictEqual(hash.length, 64);
  assert.strictEqual(hash, 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e');
});

// 2. RSA Key Generation Test
runTest('2. RSA 2048-bit Key Pair Generation', () => {
  const keys = cryptoService.generateKeyPair();
  assert.ok(keys.publicKey.includes('BEGIN PUBLIC KEY'));
  assert.ok(keys.privateKey.includes('BEGIN PRIVATE KEY'));
});

// 3 & 4 & 5. RSA Encryption, Decryption & Round Trip
runTest('3, 4, 5. RSA-OAEP Encryption, Decryption & Round Trip', () => {
  const originalMessage = 'Confidential INS Message 2026';
  const keys = cryptoService.getActiveKeys();
  const ciphertext = cryptoService.encryptRSAOAEP(originalMessage, keys.publicKey);
  assert.ok(typeof ciphertext === 'string' && ciphertext.length > 0);
  assert.notStrictEqual(ciphertext, originalMessage);

  const decryptedMessage = cryptoService.decryptRSAOAEP(ciphertext, keys.privateKey);
  assert.strictEqual(decryptedMessage, originalMessage, 'Decrypted message must equal original message');
});

// 6 & 7. Digital Signature Generation & Valid Verification
runTest('6, 7. RSA-PSS Digital Signature Generation & Valid Verification', () => {
  const message = 'Authenticated Document Payload';
  const keys = cryptoService.getActiveKeys();
  const signature = cryptoService.createDigitalSignature(message, keys.privateKey);
  assert.ok(typeof signature === 'string' && signature.length > 0);

  const isValid = cryptoService.verifyDigitalSignature(message, signature, keys.publicKey);
  assert.strictEqual(isValid, true, 'Valid signature should verify as TRUE');
});

// 8. Modified Message Verification Failure (Tamper Detection)
runTest('8. Modified Message Verification Failure (Tamper Detection)', () => {
  const originalMessage = 'Hello World';
  const keys = cryptoService.getActiveKeys();
  const signature = cryptoService.createDigitalSignature(originalMessage, keys.privateKey);

  const modifiedMessage = 'Hello World!';
  const isValid = cryptoService.verifyDigitalSignature(modifiedMessage, signature, keys.publicKey);
  assert.strictEqual(isValid, false, 'Modified message must fail signature verification');
});

// 9. Modified Signature Verification Failure
runTest('9. Tampered Signature Verification Failure', () => {
  const message = 'Hello World';
  const keys = cryptoService.getActiveKeys();
  const signature = cryptoService.createDigitalSignature(message, keys.privateKey);

  // Corrupt a few characters in the signature base64
  const tamperedSig = signature.substring(0, 10) + 'X' + signature.substring(11);
  const isValid = cryptoService.verifyDigitalSignature(message, tamperedSig, keys.publicKey);
  assert.strictEqual(isValid, false, 'Tampered signature must fail verification');
});

// 10. Invalid Base64 Handling
runTest('10. Invalid Base64 Handling Graceful Recovery', () => {
  const message = 'Hello World';
  const keys = cryptoService.getActiveKeys();
  const isValid = cryptoService.verifyDigitalSignature(message, '!!!NotValidBase64!!!', keys.publicKey);
  assert.strictEqual(isValid, false, 'Invalid base64 should gracefully return false');
});

// 11. Empty Message Handling
runTest('11. Empty Message Input Error Validation', () => {
  assert.throws(() => {
    cryptoService.runCompleteSecurityProcess('');
  }, /Please enter a message/);
});

// 12. Complete Process Execution Test
runTest('12. End-to-End Complete Security Process Integration', () => {
  const result = cryptoService.runCompleteSecurityProcess('Full Test Message');
  assert.strictEqual(result.message, 'Full Test Message');
  assert.strictEqual(result.signatureValid, true);
  assert.strictEqual(result.decryptedMessage, 'Full Test Message');
  assert.strictEqual(result.steps.length, 7);
});

console.log('==================================================');
console.log(`TEST SUITE COMPLETE: ${testsPassed} Passed, ${testsFailed} Failed`);
console.log('==================================================');

if (testsFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
