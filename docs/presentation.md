# Academic Presentation Guide (12 Slides & 5-Minute Script)

## Slide Structure

### Slide 1: Title & Academic Context
- **Title**: Implementation and Visualisation of a Secure Message System
- **Technologies**: RSA, SHA-256, Digital Signatures, React, Express
- **Subject**: Information and Network Security (INS)
- **Presenter**: B.Tech 7th Semester Student

### Slide 2: Problem Statement
- Cryptographic concepts are traditionally taught as abstract mathematical formulas.
- Difficulty in understanding how hashing differs fundamentally from encryption.
- Need for a visual, interactive tool to demonstrate data integrity and tamper detection in real-time.

### Slide 3: Objectives & Scope
- Build a full-stack educational dashboard for message security visualization.
- Implement production-grade standard crypto: RSA 2048, SHA-256, RSA-OAEP, RSA-PSS.
- Visually demonstrate digital signature generation, verification, and tamper detection.

### Slide 4: Technology Stack & Architecture
- **Frontend**: React, Vite, JavaScript, Custom Cybersecurity Dark CSS.
- **Backend**: Node.js, Express REST API.
- **Cryptography Engine**: Node.js built-in `crypto` module (native OpenSSL C++ bindings).
- **Database**: Zero-dependency session memory for simplicity.

### Slide 5: Cryptographic Hashing (SHA-256)
- Converts any plaintext message into a fixed 256-bit (64 hex character) digest.
- One-way, non-invertible mathematical operation.
- Demonstrates the avalanche effect (1 bit change $\rightarrow$ complete hash shift).

### Slide 6: RSA Public-Key Cryptography
- Asymmetric key pair: Public Key (shared) and Private Key (secret).
- 2048-bit modulus provides strong NIST-compliant security.
- Eliminates key distribution bottleneck inherent in symmetric ciphers.

### Slide 7: RSA-OAEP Encryption & Decryption
- Optimal Asymmetric Encryption Padding (OAEP) with SHA-256.
- Encrypts payload with Public Key to guarantee **Confidentiality**.
- Decrypts payload using matching Private Key to restore original plaintext.

### Slide 8: Digital Signatures (RSA-PSS)
- Probabilistic Signature Scheme (PSS) combined with SHA-256.
- Signed using sender's **Private Key**.
- Guarantees **Message Integrity**, **Authentication**, and **Non-Repudiation**.

### Slide 9: Signature Verification Process
- Receiver decrypts signature with sender's **Public Key**.
- Receiver recomputes SHA-256 hash of received payload.
- Matching hashes confirm payload authenticity; mismatch alerts tampering.

### Slide 10: Interactive Tamper Detection Feature
- Real-time demonstration: Message signed $\rightarrow$ Payload altered $\rightarrow$ Signature check fails (`INVALID`).
- Restoring original payload immediately restores `VALID` status.
- Visually proves digital signature integrity guarantees.

### Slide 11: Encryption vs Digital Signature Comparison
- **Encryption**: Purpose is Confidentiality (keeping plaintext secret).
- **Digital Signature**: Purpose is Integrity & Authenticity (proving origin & non-tampering).
- Both can be combined for complete end-to-end channel security.

### Slide 12: Conclusion & Summary
- Successfully built an educational web application for INS curriculum demonstration.
- Demonstrated 100% test pass rate across all cryptographic operations.
- App provides clear visual feedback for viva evaluation.

---

## 5-Minute Viva Presentation Script

> **"Respected Examiners and Faculty, good morning.**
>
> Today I present my B.Tech 7th-semester mini-project titled **'Implementation and Visualisation of a Secure Message System Using RSA, SHA-256 and Digital Signatures'**.
>
> **The core problem** this project addresses is that cryptography is often studied as static mathematics. It is difficult to visualize what happens to a message during hashing, signing, and encryption. My project solves this by creating an interactive, cybersecurity-themed dashboard built with **React, Express, and Node.js's built-in crypto module**.
>
> **Here is how the application works during execution:**
> 1. When a user inputs a message, the system computes its **SHA-256 hash digest**, creating a unique 256-bit fingerprint.
> 2. Next, an **RSA 2048-bit key pair** is generated. The public key can be shared freely, while the private key remains secret.
> 3. The system generates a **Digital Signature** using **RSA-PSS with SHA-256** and the sender's Private Key.
> 4. To verify the signature, the backend uses the **Public Key**. If the hashes match, the UI displays **VALID**, confirming **Message Integrity and Authentication**.
> 5. My system includes a live **Tamper Detection Demo**. If an attacker alters even one character in the message, signature verification fails instantly with an **INVALID** warning.
> 6. Finally, we demonstrate **Confidentiality** using **RSA-OAEP encryption** with the Public Key, followed by successful decryption with the Private Key.
>
> In conclusion, this project clearly distinguishes between **Hashing (integrity fingerprinting)**, **Encryption (confidentiality)**, and **Digital Signatures (authentication and non-repudiation)**. All backend cryptographic operations were validated using automated unit tests with a 100% pass rate.
>
> Thank you, and I am now open to your questions!"
