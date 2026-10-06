# REST API Specification

Base URL: `http://localhost:5000/api`

---

### 1. Health Check
`GET /api/health`

**Response (200 OK):**
```json
{
  "status": "ok",
  "system": "Secure Message System Backend",
  "timestamp": "2026-09-09T09:45:00.000Z"
}
```

---

### 2. Compute SHA-256 Hash
`POST /api/hash`

**Request:**
```json
{
  "message": "Hello World"
}
```

**Response (200 OK):**
```json
{
  "algorithm": "SHA-256",
  "hashSizeBits": 256,
  "hexLength": 64,
  "hash": "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
}
```

---

### 3. Generate RSA Key Pair
`POST /api/generate-keys`

**Response (200 OK):**
```json
{
  "algorithm": "RSA",
  "keySize": 2048,
  "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n-----END PUBLIC KEY-----",
  "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQ...\n-----END PRIVATE KEY-----",
  "generatedAt": "2026-09-09T09:45:00.000Z"
}
```

---

### 4. Create Digital Signature
`POST /api/sign`

**Request:**
```json
{
  "message": "Hello World"
}
```

**Response (200 OK):**
```json
{
  "algorithm": "RSA-PSS-SHA256",
  "signature": "kF9qZ2...Base64Signature==",
  "publicKeyUsed": "-----BEGIN PUBLIC KEY-----..."
}
```

---

### 5. Verify Digital Signature
`POST /api/verify`

**Request:**
```json
{
  "message": "Hello World",
  "signature": "kF9qZ2...Base64Signature==",
  "publicKey": "-----BEGIN PUBLIC KEY-----..."
}
```

**Response (200 OK):**
```json
{
  "valid": true,
  "messageEvaluated": "Hello World",
  "algorithm": "RSA-PSS-SHA256"
}
```

---

### 6. Encrypt Message
`POST /api/encrypt`

**Request:**
```json
{
  "message": "Hello World"
}
```

**Response (200 OK):**
```json
{
  "algorithm": "RSA-OAEP-SHA256",
  "ciphertext": "aB3x9K...Base64Ciphertext=="
}
```

---

### 7. Decrypt Message
`POST /api/decrypt`

**Request:**
```json
{
  "ciphertext": "aB3x9K...Base64Ciphertext=="
}
```

**Response (200 OK):**
```json
{
  "algorithm": "RSA-OAEP-SHA256",
  "message": "Hello World"
}
```

---

### 8. Run Complete Process
`POST /api/run-complete-process`

**Request:**
```json
{
  "message": "Hello World"
}
```

**Response (200 OK):**
```json
{
  "message": "Hello World",
  "hash": "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e",
  "publicKey": "-----BEGIN PUBLIC KEY-----...",
  "signature": "kF9qZ2...==",
  "signatureValid": true,
  "ciphertext": "aB3x9K...==",
  "decryptedMessage": "Hello World",
  "steps": [...]
}
```
