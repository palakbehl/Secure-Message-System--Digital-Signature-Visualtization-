# Express Cryptography Backend

Express.js server leveraging the built-in Node.js `crypto` module for high-level cryptographic operations: SHA-256 Hashing, RSA 2048-bit key generation, RSA-OAEP Encryption/Decryption, and RSA-PSS Digital Signatures.

## Features
- **SHA-256**: Fixed 256-bit cryptographic digest.
- **RSA 2048-bit**: Asymmetric public/private key generation (SPKI/PKCS#8 PEM formats).
- **RSA-OAEP**: Optimal Asymmetric Encryption Padding with SHA-256 for data confidentiality.
- **RSA-PSS**: Probabilistic Signature Scheme with SHA-256 for message authentication & non-repudiation.
- **Session Memory**: Key pairs kept in-memory; regenerated on demand or server reboot.

## Installation & Running

```bash
npm install
npm start
```

## Running Tests

```bash
npm test
```

## API Endpoints

- `GET /api/health` - System health status
- `POST /api/hash` - Compute SHA-256 hash
- `POST /api/generate-keys` - Generate new RSA key pair
- `POST /api/sign` - Create RSA-PSS digital signature
- `POST /api/verify` - Verify digital signature against message
- `POST /api/encrypt` - Encrypt text with RSA-OAEP
- `POST /api/decrypt` - Decrypt ciphertext with RSA-OAEP
- `POST /api/run-complete-process` - Execute full security workflow
