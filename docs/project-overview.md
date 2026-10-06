# Project Overview: Secure Message System

## 1. Project Title
**Implementation and Visualisation of a Secure Message System Using RSA, SHA-256 and Digital Signatures**

## 2. Academic Context
- **Course**: B.Tech 7th Semester — Information and Network Security (INS)
- **Institution Objective**: Practical application and interactive visualization of core cryptographic primitives prescribed in the university syllabus.

## 3. Problem Statement
Traditional cybersecurity lectures often present cryptographic operations like hashing, asymmetric key pair generation, RSA encryption/decryption, and digital signatures in pure mathematical formulas. Students often struggle to conceptualize:
- How message digests guarantee data integrity.
- Why hashing is fundamentally distinct from encryption.
- How RSA public/private key pairs provide non-repudiation and authentication via digital signatures.
- How message tampering is detected in transit.

## 4. Objectives
- Develop an end-to-end interactive web dashboard for visualizing cryptographic message security.
- Implement production-grade crypto algorithms using Node.js's built-in `crypto` module (RSA-2048, SHA-256, RSA-OAEP, RSA-PSS).
- Provide a step-by-step interactive workflow visualizer showing payload state transformations.
- Create an interactive **Tamper Detection Demonstration** allowing users to modify payload content in real-time and observe signature verification failure.
- Offer an exhaustive viva voce question bank and academic presentation guide.

## 5. Scope & Educational Disclaimer
This application is strictly designed as an **Educational Demonstration — Not intended for production security**. Key pairs are maintained in server session memory without persistent database overhead to prioritize architectural simplicity and clarity for academic evaluation.
