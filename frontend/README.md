# React + Vite Cryptography Visualizer Frontend

Interactive React dashboard demonstrating SHA-256 cryptographic hashing, RSA-2048 key management, RSA-PSS digital signatures, signature verification, message tamper detection, and RSA-OAEP asymmetric encryption.

## Features
- **Visual Process Workflow**: Step-by-step interactive timeline with active state highlights.
- **SHA-256 Hashing**: 256-bit digest output and Hashing vs Encryption educational card.
- **RSA Key Manager**: Show/Hide private key toggles, 2048-bit SPKI/PKCS#8 key viewer.
- **Digital Signatures**: RSA-PSS + SHA-256 signature generation.
- **Signature Verification**: Live cryptographic integrity check.
- **Tamper Detection Demo**: Modify payload $\rightarrow$ invalid signature alert $\rightarrow$ restore payload $\rightarrow$ valid signature.
- **RSA Encryption/Decryption**: RSA-OAEP ciphertext creation and decryption round trip.
- **Encryption vs Signature Matrix**: Confidentiality vs Integrity/Authenticity side-by-side comparison.
- **Process Audit Log**: Timestamped real-time event recorder.

## Running locally

```bash
npm install
npm run dev
```

The app will start on `http://localhost:5173`. Ensure the backend Express server is running on `http://localhost:5000`.
