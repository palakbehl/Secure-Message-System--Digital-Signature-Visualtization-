# Implementation and Visualisation of a Secure Message System Using RSA, SHA-256 and Digital Signatures

> **B.Tech 7th Semester Mini-Project**  
> **Subject**: Information and Network Security (INS)  
> **Disclaimer**: *Educational Demonstration — Not intended for production security.*

---

## 1. Introduction
This project is a full-stack educational web application designed to demonstrate and visualize fundamental cryptographic operations required in the *Information and Network Security (INS)* curriculum. It provides an interactive interface for performing and observing SHA-256 message hashing, RSA 2048-bit key generation, RSA-PSS digital signatures, signature verification, message tamper detection, and RSA-OAEP asymmetric encryption/decryption.

## 2. Problem Statement
Cryptographic operations are often presented as abstract mathematical algorithms. Students frequently struggle to visualize how data payloads change during hashing, signing, and encryption, or to understand the fundamental difference between data confidentiality (encryption) and data integrity/authentication (digital signatures).

## 3. Objectives
- Implement zero-dependency, native Node.js cryptography (RSA-2048, SHA-256, RSA-OAEP, RSA-PSS).
- Provide a step-by-step visual flowchart showing message transformations in real-time.
- Build an interactive **Tamper Detection Demo** to visually prove signature failure when payload content is modified.
- Include complete academic documentation, viva voce Q&A, and a presentation script for college evaluation.

## 4. Motivation
To create a practical, visual, and presentation-ready mini-project that can be demonstrated live during mini-project evaluations, college presentations, and practical viva voce exams.

## 5. Key Features
- **Interactive Input & Demo Loader**: Load sample text or type custom payloads with validation.
- **Sequential Process Visualizer**: 7-stage animated flowchart highlighting active step execution.
- **SHA-256 Hashing**: Fixed 256-bit digest generation with explicit "Hashing vs Encryption" breakdown.
- **RSA Key Manager**: RSA 2048-bit key pair display with Show/Hide private key toggles and copy buttons.
- **Digital Signatures**: RSA-PSS + SHA-256 Base64 signature creation.
- **Signature Verification**: Live cryptographic integrity check with status banners.
- **Tamper Detection Demonstration**: Interactively modify signed messages and observe `INVALID` signature alerts.
- **RSA-OAEP Encryption & Decryption**: Round-trip demonstration of asymmetric confidentiality.
- **Encryption vs Signature Matrix**: Purpose matrix comparing Confidentiality vs Integrity/Authenticity.
- **Real-Time Audit Log**: Timestamped console window recording all security events.
- **Technical Parameter Spec Drawer**: Expandable table detailing algorithm parameters.

## 6. Technologies Used
- **Frontend**: React 18, Vite, JavaScript (ES6+), HTML5, Custom CSS (Dark Cybersecurity Theme).
- **Backend**: Node.js, Express.js, CORS.
- **Cryptography Engine**: Node.js built-in `crypto` module (Native OpenSSL wrapper).
- **Database**: Zero-dependency session memory for simplicity.

## 7. System Architecture
```
React Frontend (Vite) ◄── REST API (HTTP/JSON) ──► Express Backend ──► Node.js crypto module
                                                                            │
                                                       ┌────────────────────┴────────────────────┐
                                                   SHA-256       RSA-2048      RSA-PSS / RSA-OAEP
```

## 8. Application Workflow
1. User enters plaintext message.
2. Backend computes **SHA-256** hex digest (256 bits).
3. Backend activates/generates **RSA 2048-bit** key pair.
4. Backend creates **RSA-PSS + SHA-256** digital signature using Private Key.
5. Backend verifies digital signature using Public Key (`VALID`).
6. Backend encrypts plaintext using **RSA-OAEP + SHA-256** and Public Key.
7. Backend decrypts ciphertext using Private Key (`Restored Plaintext`).

## 9. SHA-256 Explanation
SHA-256 is a deterministic, one-way cryptographic hash function producing a 256-bit digest. It is non-invertible and exhibits the *avalanche effect* (1 bit change alters >50% of the hash output).

## 10. RSA Explanation
RSA is an asymmetric algorithm based on prime factorization difficulty. It utilizes a Public Key for encryption/verification and a Private Key for decryption/signing.

## 11. RSA Encryption & Decryption
Uses **RSA-OAEP** (Optimal Asymmetric Encryption Padding) with SHA-256 to ensure non-deterministic, CCA2-secure encryption for data confidentiality.

## 12. Digital Signature Explanation
Uses **RSA-PSS** (Probabilistic Signature Scheme) with SHA-256 to sign message hashes using the Private Key, guaranteeing origin authenticity and non-repudiation.

## 13. Signature Verification
The recipient decrypts the signature using the Public Key and compares the embedded hash with the recomputed payload hash.

## 14. Encryption vs Digital Signature
| Property | RSA Encryption | Digital Signature |
| :--- | :--- | :--- |
| **Primary Goal** | Confidentiality (Secrecy) | Integrity & Authenticity |
| **Key for Sender** | Recipient's Public Key | Sender's Private Key |
| **Key for Recipient** | Recipient's Private Key | Sender's Public Key |

## 15. Project Structure
```
ins project/
├── backend/            # Express.js REST API & Node.js Crypto Service
│   ├── server.js
│   ├── cryptoService.js
│   ├── routes/cryptoRoutes.js
│   └── tests/crypto.test.js
├── frontend/           # React + Vite UI Dashboard
│   ├── src/
│   │   ├── components/  # Header, MessageInput, ProcessVisualizer, etc.
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── index.css
├── docs/               # Academic Documentation Suite
│   ├── project-overview.md
│   ├── architecture.md
│   ├── cryptography.md
│   ├── api.md
│   ├── viva-questions.md
│   └── presentation.md
└── README.md
```

## 16. API Documentation Summary
- `GET  /api/health` - System health check.
- `POST /api/hash` - Compute SHA-256 digest.
- `POST /api/generate-keys` - Generate RSA 2048-bit key pair.
- `POST /api/sign` - Generate RSA-PSS signature.
- `POST /api/verify` - Verify digital signature.
- `POST /api/encrypt` - Encrypt with RSA-OAEP.
- `POST /api/decrypt` - Decrypt with RSA-OAEP.
- `POST /api/run-complete-process` - Full workflow execution.

## 17. Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## 18. Running the Project

### Start Express Backend (Port 5000)
```bash
cd backend
npm start
```

### Start React Frontend (Port 5173)
In a second terminal window:
```bash
cd frontend
npm run dev
```

Open browser at: `http://localhost:5173`

## 19. Running Unit Tests
Execute the backend test suite:
```bash
cd backend
npm test
```

## 20. Limitations
- Key pairs are stored in server session memory for demonstration simplicity. Restarting the backend server generates a new key pair session.

## 21. Future Enhancements
- Support hybrid AES-256 + RSA envelope encryption for large files.
- Add X.509 Digital Certificate simulation and Certificate Authority (CA) validation tree.

## 22. Conclusion
This mini-project successfully bridges cryptographic theory and practical software engineering, providing an intuitive, interactive platform for learning and demonstrating RSA, SHA-256, and digital signatures.
