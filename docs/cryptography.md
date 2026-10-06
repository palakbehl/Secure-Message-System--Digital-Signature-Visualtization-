# Cryptographic Fundamentals & Specifications

This document outlines the core cryptographic concepts implemented in this application for academic study.

## 1. Cryptographic Hashing & SHA-256
- **Definition**: A mathematical algorithm that maps arbitrary-length data to a fixed 256-bit (32-byte) digest.
- **Properties**:
  1. *Pre-image resistance*: Given $H$, it is computationally infeasible to find $M$ such that $Hash(M) = H$.
  2. *Second pre-image resistance*: Given $M_1$, it is infeasible to find $M_2 \neq M_1$ such that $Hash(M_1) = Hash(M_2)$.
  3. *Collision resistance*: Infeasible to find any two distinct inputs $M_1, M_2$ with identical hashes.
- **Avalanche Effect**: Changing a single bit in the input message flips over 50% of the output hash bits.

## 2. Asymmetric Cryptography & RSA 2048
- **Concept**: Uses a mathematical key pair — a **Public Key** for encryption/verification and a **Private Key** for decryption/signing.
- **Mathematics**:
  - Select large prime numbers $p$ and $q$.
  - Compute modulus $n = p \times q$. For 2048-bit RSA, $n$ is 2048 bits long.
  - Compute Euler's totient $\phi(n) = (p-1)(q-1)$.
  - Choose public exponent $e = 65537$.
  - Calculate private exponent $d \equiv e^{-1} \pmod{\phi(n)}$.

## 3. RSA-OAEP Encryption & Decryption
- **OAEP**: Optimal Asymmetric Encryption Padding.
- **Why padding is mandatory**: Raw ("textbook") RSA is deterministic ($C = M^e \pmod n$), making it vulnerable to frequency analysis, chosen-plaintext attacks, and structural mathematical exploits.
- **OAEP Process**: Adds random padding and passes the payload through a Feistel network with SHA-256 hash functions before modular exponentiation, making ciphertexts non-deterministic and secure against Chosen-Ciphertext Attacks (CCA2).

## 4. Digital Signatures & RSA-PSS
- **PSS**: Probabilistic Signature Scheme (RFC 8017).
- **Signing Flow**:
  1. Input Message $M \rightarrow$ SHA-256 Hash $H$.
  2. Apply PSS padding with random salt to $H$.
  3. Raise padded hash to private exponent $d \pmod n$: $S = (Pad(H))^d \pmod n$.
- **Verification Flow**:
  1. Compute $H' = SHA256(M_{received})$.
  2. Raise signature $S$ to public exponent $e \pmod n$: $Unpad(S^e \pmod n)$.
  3. Verify unpadded hash matches $H'$.
- **Security Guarantee**: Guarantees **Message Integrity**, **Authentication**, and **Non-Repudiation**.
