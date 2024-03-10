---
title: Cryptography
description: Cryptography involves converting sensitive data into a format that is unreadable for an unauthorised user
---

# Cryptography

It is the practice and study of techniques for secure communication in the presence of adversarial behavior

- Cryptography involves converting sensitive data into a format that is unreadable for an unauthorized user

## Hashing

Hashing is one-way operation that produces a message digest

- Used for message integrity, digital signatures & storing passwords

- A salt (some random value) is added to the value before hashing it

- Salting is important to protect against offline password attacks (e.g. **Rainbow Tables**)

- Infeasible to reverse the output

- Timing attacks can be used to hack

> Hash means to chop and mix (in Culinary Terms)

_Example:_

```javascript
const { createHash } = require("crypto");

// Create a string hash
function hash(input) {
  // returns a hash value (also called digest) of size 256-bit
  return createHash("sha256").update(input).digest("hex"); // 'base64' can also be used
}
```

- Salting:

```javascript
const { scryptSync, randomBytes, timingSafeEqual } = require("crypto");

function signup(email, password) {
  const salt = randomBytes(16).toString("hex");

  const hashedPassword = scryptSync(password, salt, 64);

  const user = { email, password: `${salt}:${hashedPassword}` };

  users.push(user);

  return user;
}

function login(email, password) {
  const user = users.find((v) => v.email === email);

  const [salt, key] = user.password.split(":");

  const hashedBuffer = scryptSync(password, salt, 64);

  const keyBuffer = Buffer.from(key, "hex");

  const match = timingSafeEqual(hashedPassword, keyBuffer);

  if (match) return "login success!";

  return "login fail!";
}
```

- **Key Derivation**

_Example:_

```javascript
// the secret message is: JavaScript
md5Hash = "686155af75a60a0f6e9d80c1f7edd3e9";
shaHash = "b6e13ad53d8ec41b034c49f131c64e99cf25207a";
sha256Hash = "eda71746c01c3f465ffd02b6da15a6518e6fbc8f06f1ac525be193be5507069d";
sha512Hash =
  "6179a35e21da636ce44afd549e01cce9e54952f3f7ec40060698a3f58aeb1a5a4e3e82164ee22394d362fdd845570e8df86053bc051b9e3ae6fa4290504579c7";
```

### Hash-Based Message Authentication Code (HMAC)

Hashing is used to provide data integrity

- Message Authentication Code (MAC) is a concept of combining Message + Secret Key when calculating Digest

- Provides _Integrity_ and _Authentication_ for bulk data transfer

- Industry standard implementation of MAC: HAMC (RFC 2104)

  - A hash that requires a password (shared key)

- Example is JWT

_Example:_

```javascript
const { createHmac } = require("crypto");

const key = "super-secret!";
const message = "boo 👻";

const hmac = createHmac("sha256", key).update(message).digest("hex");
```

## Encryption

Encryption turns plaintext into ciphertext (and vice-versa):

- Requires an algorithm and a key

- [Symmetric](#symmetric-encryption) algorithms use the same key for both encryption and decryption

- [Asymmetric] (or public key) algorithms use different keys for encryption (the public key) and decryption (the private key)

1. Encryption At Rest
2. Encryption Transit

### Symmetric Encryption

Symmetric encryption uses a single key to encrypt and decrypt.

- Key needs to be shared
- Which makes it less secure

2 Types:

- Block ciphers encrypt a fixed size of n-bits of data at a time (e.g. DES, 3DES, AES)

  - AES (Advanced Encryption Standard)

- Stream ciphers encrypt 1 byte of data at a time

Block ciphers support different modes of operation:

- Electronic Code Block (ECB):

  - Less secure than others
  - Android uses ECB by default when using AES:

    ```java
    Cipher.getInstance("AES");

    // Use
    Cipher.getInstance("AES/GCM/NOPADDING");
    ```

- Cipher Block Chaining (CBC)

_Example:_ Symmetric encryption

```javascript
const { createCipheriv, randomBytes, createDecipheriv } = require("crypto");

// Cipher
const message = "i like turtles";
const key = randomBytes(32);
const iv = randomBytes(16);

const cipher = createCipheriv("aes256", key, iv);

// Encrypt
const encryptedMessage =
  cipher.update(message, "utf-8", "hex") + cipher.final("hex");

// Decrypt
const decipher = createDecipheriv("aes256", key, iv);
const decryptedMessage =
  decipher.update(encryptedMessage, "hex", "utf-8") + cipher.final("utf-8");

console.log(decryptedMessage.toString("utf-8"));
```

- _IV_ stands from Initialization Vector: Prevent identical sequence of text

### Asymmetric Encryption / Public-Key Cryptography

Asymmetric Encryption encrypts and decrypts the data using two separate yet mathematically connected cryptographic keys.

- The Private Key is intended to be private so that only the authenticated recipient can decrypt the message.

- The Public Key is shared with users how intend to encrypt the message

- Message longer than public key cannot be encrypted using the public key. This is an **important limitation**.

- HTTPS performs key exchange (using public and private keys to generate symmetric key) and then encrypt any data larger than the public key using the resulting symmetric key.

_Example:_

```javascript
const { generateKeyPairSync } = require("crypto");

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048, // the length of your key in bits
  publicKeyEncoding: {
    type: "spki", // recommended to be 'spki' by Node.js docs,
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8", // recommended to be 'pkcs8' by Node.js docs,
    format: "pem",
    // cipher: "aes-256-cbc",
    // passphrase: "top secret",
  },
});

const { publicEncrypt, privateDecrypt } = require("crypto");

const message = "the germans are coming!";

const encryptedData = publicEncrypt(publicKey, Buffer.from(message));

console.log(encryptedData.toString("hex"));

const decryptedData = privateDecrypt(privateKey, encryptedData);

console.log(decryptedData.toString("utf-8"));
```

```bash
# using openssl to generate RSA public and private key
openssl genrsa
```

## Encryption in Transit

- Transport Layer Security (TLS): for end-to-end encryption (over HTTP)
- Not only protects data from unauthorized disclosure/modification, but also provides trust of the web server to the client
- TLS should be used everywhere

- **Diffie–Hellman key exchange**

Protecting Data in Transit:

- For iOS 9 and above:

  - Enabled by default
  - Blocks HTTP resource load
  - Uses URL Loading System (NSAppTransportSecurity) which add further transport layer checks
  - Highly recommended to disallow turning off the strict checks

- For Android 9 and above:

  - Enabled by default
  - Blocks HTTP resource load
  - Uses SSLSocketFactory to add further transport layer checks
  - Highly recommended to disallow turning off the strict checks

### Signing

Digital Signatures

```javascript
const { createSign, createVerify } = require("crypto");
const { publicKey, privateKey } = require("./keypair"); // generated in Asymmetric Encryption

const message = "need for speed";

// sign
const signer = createSign("rsa-sha256");

signer.update(message);

const signature = signer.sign(privateKey, "hex");

// verify
const verifier = createVerify("rsa-sha256");

verifier.update(message);

const isVerified = verifier.verify(publicKey, signature, "hex");
```

### TLS

- Combination of symmetric and asymmetric cryptography
- Provides good compromise between performance and security

- Symmetric Cryptography:

  - Secret key used to encrypt and decrypt data
  - Typically 128 bits in length but 256 bit is secure
  - Fast and efficient
  - Sharing the secret key is hard

- Asymmetric Cryptography:

  - Public/Private key pairs that are mathematically related
  - Public key to encrypt data and private key to decrypt data
  - Requires minimum of 1024 bit key but 2048 bit is preferred
  - Too slow for many purposes but great for generating and exchanging session key

TLS Protocols & Cipher Suites:

| Protocol Version | Cipher Suites | Compliance |
| :--------------: | :-----------: | :--------: |
|      SSLv2       |     Weak      |     -      |
|      SSLv3       |     Weak      |     -      |
|     TLSv1.0      |     Weak      |     -      |
|     TLSv1.1      |   Moderate    |     !      |
|     TLSv1.2      |    Strong     |    yes     |
|     TLSv1.3      |    Strong     |    yes     |

#### Digital Certificates

- Contains the public key of the web server
- Certificate is digitally signed by the CBA

  - Authenticity of the public key and that the owner controls the domain ("Common Name") being secured by the certificate
  - Allows clients to authenticate the web server
  - Must be a SHA-2 certificate
  - CN (Common Name) is being deprecated and will be replaced by SAN (Subject Alternate Name)

##### Certification Authorities

- Validates that an entity (e.g. person, company) submitting a certificate request for a web site is authorised to do so
- May also validate organisation information ("Extended Validation Certificates")
- CA must be trusted by all participants

  - Internet browsers embed public certificates of recognised certification authorities
  - Organisations can embed their own RootCA as a trusted certificate. Limited to internal network only

##### Public Key Infrastructure (PKI)

- PKI is about how two entities learn to trust each other to exchange messages securely.
- Central idea of PKI is that some trusted keys can delegate their trust to other un-trusted keys.
- Instead of just keys, certificates hold more personal information like domain name, organization, etc
- Primarily made up of:

  - Certificate Authority (CA): An entity that issues digital certificates to websites
  - Registration Authority
  - Certificate Databases
  - Certificate Stores
  - Key Archival Servers

### Breaking TLS

- Working with rooted devices
- Trusting any CA certificates (system or custom)
- Accepting self-signed certificates
- Setting permissive hostname verifier

## HTTP Strict Transport Security (HSTS)

- It is a HTTP header
- Ensures all communication are through HTTPS
- Automatically redirects HTTP request to HTTPS (HTTP 307)
- HSTS dose not allow a user to override the invalid certificate message
- **Warning**: Once implemented cannot go back to HTTP without breaking application
- HSTS Directives:

  - `max-age`: Time in seconds for browser to remember HSTS
  - `includeSubDomains`: HSTS rule applies to all of the site's subdomains
  - `preload`:

    - Good:

      - Google maintained list
      - Currently supported by all major browsers
      - Defends against first-time SSL strip attacks

    - Bad:

      - Not an official HSTS spec
      - Sending preload directive can have permanent consequences
      - Preload can only be used with adding all subdomains

  ```http
  Strict-Transport-Security: max-age=3153600; includeSubDomains; preload
  ```

## Best Practices

- Never design your own encryption algorithm
- Use established, public algorithms that have been tested by experts (e.g. AES, RSA, SHA256+)

| Attribute             | Encryption | Hashing | Encoding |
| --------------------- | :--------: | :-----: | :------: |
| Decode                |    yes     |    -    |   yes    |
| Secret/Key Needed     |    yes     |    !    |    -     |
| Password Storage      |     -      |   yes   |    -     |
| Data Storage in DB/FS |    yes     |    -    |    -     |
| Web Tokens            |     -      |    -    |   yes    |

Recommended Cryptographic Algorithms:

| Service                                                      |       Approved        |    Not Approved     |
| ------------------------------------------------------------ | :-------------------: | :-----------------: |
| Data Confidentiality (e.g. DBs, Hard Disks, Flat files, ...) |       AES(256+)       | DES, 2DES, Blowfish |
| Data Integrity                                               | HMAC(128+), SHA(256+) |      MD5, SHA1      |

- Use Argon2bi, bycrpt or sycrpt
- **Strong configuration is required**

## Pinning & Certificate Transparency

> "You should pin anytime you want to be relatively certain of the remote host's identity or when operating in a hostile environment. Since one or both are almost always true, you should probably pin all the time"
>
> - OWASP

What to pin?

- Certificate
- Public Key
- Hash

Where to pin?

- Leaf certificate
- Root certificate
- Intermediate certificate

Mobile Apps:

- Pin against the public key, or more specifically the SubjectPublicKeyInfo (SPKI)
- key storage: Preloading, Trust on first use, **Over the air pin server**
- If bricked, app update can be pushed

Web Apps:

- Pinning happens with HPKP header (deprecated)
- Need second key pinned that's not in current certificate chain. E.g. Backup CSR
- If blocked or compromised, the app is blocked for users till max-age expires or user deletes pinning
- Pinning carries very strong risks of blocking or bricking applications
- Hard to build a pin-set that's guaranteed to work and the risk of hostile pinning
- Very low adoption rate

### Certificate Transparency

How do I trust a CA?

- All CAs must submit certificate activity logs to CT Log services
- CTLogs must be monitored and audited by organisation.
- _A Signed Certificate Timestamp_ (SCT) is generated and returned when a certificate is submitted
- All newly issued certificates must contain SCT and all CAs in Chrome's trusted store should have CT Logs
- Web Server can enforce browsers to check and validate SCT using `Expect-CT` header

  ```http
  Except-CT: max-age=86400, enforce, report-uri="https://example.com/report"
  ```

- Chrome (Full support), Firefox (Implemented but disabled), Safari (Upcoming)

## Encryption Techniques

- Caesar cipher

## Acronyms

- SHA256 (Secure Hash Algorithm 2)
- RSA (Rivest–Shamir–Adleman)
- PEM (Privacy Enhanced Mail)

## References

- _The Code Book: The Science of Secrecy from Ancient Egypt to Quantum Cryptography_ by Simon Singh (ISBN-10: 0-385-495323) (1999) (Introductory)

- _Cryptography Engineering: Design Principles and Practical Applications_ by Niels Ferguson, Tadayoshi Kohno, Bruce Schneier (ISBN-13: 978-0-470-47424-2) (2010)

- _Serious Cryptography: A Practical Introduction to Modern Encryption_ by Jean-Philippe Aumasson (ISBN-13: 978-1593278267) (2017)

- [Password Hashing in PHP](https://www.php.net/manual/en/book.password.php)
- [Using Libsodium in PHP Projects](https://paragonie.com/book/pecl-libsodium)
- [OpenSSL in PHP](https://www.php.net/manual/en/book.openssl.php)

- Cryptographically Secure Pseudorandom Number Generator (CSPRNG) Or Cryptographic Pseudorandom Number Generator (CPRNG)
