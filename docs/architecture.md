# System Architecture & Data Flow

## 1. High-Level System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    REACT FRONTEND                       │
│  - User Input & Demo Controllers                        │
│  - Visual Flowchart Step Orchestrator                   │
│  - Hashing, Key, Signature, Verification & Tamper Cards │
│  - Interactive Encryption vs Signature Matrix           │
│  - Audit Console Event Logger                           │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ HTTP REST API (Fetch / CORS)
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    EXPRESS BACKEND                      │
│  - Express.js Server & Route Handlers                   │
│  - Input Validation & Error Handling                    │
│  - In-Memory Session Key Storage                        │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ Native Bindings
                             ▼
┌─────────────────────────────────────────────────────────┐
│                 NODE.JS CRYPTO MODULE                   │
│  - SHA-256 Hashing Engine                               │
│  - RSA 2048-Bit Key Pair Generator                      │
│  - RSA-OAEP Padding Encryption & Decryption             │
│  - RSA-PSS Padding Signature & Verification             │
└─────────────────────────────────────────────────────────┘
```

## 2. End-to-End Cryptographic Data Flow

```
[USER INPUT: Plaintext Message]
           │
           ├──────────► [POST /api/hash] ────────────► [SHA-256 Digest (64 Hex Chars)]
           │
           ├──────────► [POST /api/generate-keys] ───► [RSA 2048 Public & Private Keys]
           │
           ├──────────► [POST /api/sign] ────────────► [RSA-PSS Base64 Digital Signature]
           │                                                       │
           ├──────────► [POST /api/verify] ◄───────────────────────┘
           │                 │
           │                 ├─► (Unmodified Payload) ──► VALID (Integrity & Authenticity Confirmed)
           │                 └─► (Tampered Payload) ───► INVALID (Tamper Alert Triggered)
           │
           ├──────────► [POST /api/encrypt] ─────────► [RSA-OAEP Base64 Ciphertext]
           │                                                       │
           └──────────► [POST /api/decrypt] ◄──────────────────────┘
                             │
                             └─► [Restored Plaintext Message]
```

## 3. Technology Selection Rationale
- **Frontend**: React + Vite for lightweight, fast component rendering and state animation.
- **Backend**: Express.js for simple, un-opinionated REST routing.
- **Cryptography**: Node.js `crypto` module (OpenSSL C++ wrapper) ensures zero external dependencies and enforces modern standards (`RSA_PKCS1_OAEP_PADDING` and `RSA_PKCS1_PSS_PADDING`).
