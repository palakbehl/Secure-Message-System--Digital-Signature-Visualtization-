# Viva Voce Question Bank (25+ Questions & Answers)

### Q1: What is cryptography?
**Answer**: Cryptography is the science of securing communication and data using mathematical algorithms to ensure confidentiality, data integrity, authentication, and non-repudiation.

### Q2: What is information security?
**Answer**: Information security refers to the practice of protecting information assets from unauthorized access, disclosure, modification, disruption, or destruction, typically governed by the CIA triad (Confidentiality, Integrity, Availability).

### Q3: What is hashing?
**Answer**: Hashing is a one-way mathematical function that transforms an arbitrary-length input payload into a unique, fixed-size output string called a hash digest.

### Q4: What is SHA-256?
**Answer**: SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function in the SHA-2 family designed by the NSA. It generates a deterministic 256-bit (32-byte / 64 hex character) hash digest.

### Q5: Why is SHA-256 not encryption?
**Answer**: SHA-256 is a one-way function with no key. It cannot be mathematically reversed or decrypted back into the original input message. Encryption, by contrast, is a two-way operation that uses a key to decrypt ciphertext.

### Q6: What is RSA?
**Answer**: RSA (Rivest–Shamir–Adleman) is an asymmetric public-key cryptographic algorithm based on the practical difficulty of factoring the product of two large prime numbers.

### Q7: Why are two RSA keys used?
**Answer**: Asymmetric cryptography uses a key pair (Public Key and Private Key) so that data encrypted with one key can only be decrypted by the other, eliminating the need to securely distribute secret symmetric keys.

### Q8: What is a public key?
**Answer**: A public key is an asymmetric key that can be freely shared with anyone. It is used by senders to encrypt messages intended for the key owner or to verify digital signatures created by the key owner.

### Q9: What is a private key?
**Answer**: A private key is a secret asymmetric key kept strictly confidential by its owner. It is used to decrypt messages encrypted with the corresponding public key and to sign digital signatures.

### Q10: What is encryption?
**Answer**: Encryption is the process of converting readable plaintext into unreadable ciphertext using an algorithm and a key to ensure confidentiality.

### Q11: What is decryption?
**Answer**: Decryption is the reverse process of converting scrambled ciphertext back into original plaintext using the correct cryptographic key.

### Q12: What is a digital signature?
**Answer**: A digital signature is a mathematical scheme used to demonstrate the authenticity, integrity, and non-repudiation of a digital message or document.

### Q13: How is a digital signature created?
**Answer**: The sender computes a SHA-256 hash of the message and signs (encrypts) that hash digest using their **RSA Private Key** (under RSA-PSS padding).

### Q14: How is a digital signature verified?
**Answer**: The receiver decrypts the signature using the sender's **RSA Public Key** to extract the signed hash, recomputes the SHA-256 hash of the received message, and compares the two hashes. If they match, the signature is valid.

### Q15: What is RSA-PSS?
**Answer**: RSA-PSS (Probabilistic Signature Scheme) is a modern, provably secure padding scheme for RSA digital signatures that adds randomized salt to prevent signature replay and chosen-message attacks.

### Q16: What is RSA-OAEP?
**Answer**: RSA-OAEP (Optimal Asymmetric Encryption Padding) is an asymmetric encryption padding scheme that incorporates randomness and hash functions (SHA-256) to protect RSA encryption against chosen-ciphertext attacks.

### Q17: What is message integrity?
**Answer**: Message integrity ensures that data has not been altered, corrupted, or tampered with in transit between sender and recipient.

### Q18: What is authentication?
**Answer**: Authentication is the process of verifying the identity of the sender or origin of a message.

### Q19: What is the difference between encryption and hashing?
**Answer**: Encryption is a **two-way** process using keys designed to protect confidentiality (recoverable). Hashing is a **one-way** process without keys designed to create a fixed-size fingerprint for integrity verification (non-recoverable).

### Q20: What is the difference between encryption and digital signatures?
**Answer**: Encryption ensures **confidentiality** (hiding plaintext using public key). Digital signatures ensure **authenticity and integrity** (proving origin and non-tampering using private key).

### Q21: What happens if a message is modified in transit?
**Answer**: The receiver's recomputed SHA-256 hash will not match the hash embedded in the digital signature. Signature verification will fail immediately (`INVALID`).

### Q22: Why use SHA-256 instead of MD5 or SHA-1?
**Answer**: MD5 and SHA-1 are cryptographically broken due to practical collision attacks. SHA-256 provides strong collision resistance and meets modern security standards.

### Q23: Why use RSA 2048-bit key size?
**Answer**: RSA 1024-bit is no longer considered secure against modern factoring capabilities. RSA 2048-bit provides 112 bits of equivalent security, balancing high security with fast computational performance.

### Q24: Why must private keys remain secret?
**Answer**: If a private key is compromised, an attacker can decrypt confidential messages and forge valid digital signatures in the owner's name, destroying non-repudiation and authentication.

### Q25: Why does this project store keys in memory instead of a database?
**Answer**: This project is designed as an educational visualizer. Keeping keys in session memory simplifies system architecture, avoids database installation dependencies for evaluation, and keeps all operations dynamic and inspectable.
