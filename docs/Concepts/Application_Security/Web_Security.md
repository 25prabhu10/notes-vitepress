---
title: Web Security
description: The protective measures and protocols that organizations adopt to protect the organization from, cyber criminals and threats that use the web channel.
---

# Web Security

The protective measures and protocols that organizations adopt to protect the organization from, cyber criminals and threats that use the web channel.

Using Defense In Depth approach: By increasing the number of layers, an attacker's chance of success is decreased. For example an applications which contains:

1. Sensitive data is encrypted when stored in the database
2. Application has an extensive input validation
3. Hosts are patched with the latest security patches
4. The internal network is segregated into different zones protected by firewall rules
5. A firewall separates the internal perimeter from the internet
6. Servers are located in a badge-reader protected room
7. Finally, security assessments are performed to check adherence

- Vulnerabilities and Exploits

## Preventing vulnerabilities

1. At the "Data" layer: Access controls, Encryption, Backup and restore procedures
2. At the "Application" layer: Authentication, Authorization, Auditing (otherwise known as AAA). Securing coding, and Hardening.
3. At the "Host" layer: Hardening, Authentication, Patch management, Antivirus
4. On the "Internal network": Network segmentation, IPsec, TLS, NAT
5. At the "Perimeter" layer: Firewall, TLS, Denial of service, prevention
6. And finally, you should consider "Physical Security" including: Guards, Locks, Tracking devices, and Badging systems

### Threat Modelling

Threat Modelling is a way to identify, communicate, and understand security threats and mitigations

Different Threat Modelling

- [STRIDE](#stride)

#### STRIDE

Developed by Microsoft, STRIDE is considered one of the most comprehensive ways to identify threats.

STRIDE stands for:

- Spoofing: Authentication

  - Spoofing is the impersonation of something or someone else

- Tampering: Integrity
  - Tampering happens when attacker modify data or code
- Repudiation: Non-repudiation
  - Repudiation occurs when someone claims not to have performed an action
- Information disclosure: Confidentiality
  - Information disclosure describes when information is exposed to users who are not authorized to see it
- Denial of service: Availability
  - Denial of service happens when service is denied or degraded
- Elevation of privilege: Authorization
  - Elevation of privilege means users can gain capabilities when they don't have proper authorization

## Security

More complex the application (more ways to interact) more potential bugs: Combinatorial explosion of different ways an API can be used

1. What is Application Security?

   - Security beyond infrastructure
   - Integrating security tooling to DevOps a.k.a DevSecOps
   - Determine security posture for application
   - Understanding technical risks
   - Providing technical recommendations
   - Application security guidelines and standards for Group
   - Knowledge sharing and presentations on security

2. Why is Application Security Important?

   - PCI DSS.
   - APRA Prudential Standard CPS 234 & Practice Guide CPG 234.

Common form of attacks:

- **Spam**: Sent from legitimate IP address, less likely to be blocked
- **Denial of service**: attack competitors, or seek ransom
- Infect visiting users with **malware**: Infect one server, use it to infect hundreds of thousands of clients
- **Data theft**: Steal credentials, credit card numbers, intellectual property

Different Parts of Web Security:

- **Browser security**:

  - _Example:_ [Same-Origin Policy](./SameOrigin_Policy.md) - Isolate sites from each other, while running in the same browser

- **Server app security**:

  - Attackers can run arbitrary HTTP clients: can send anything to server

- **Client app security**:

  - Prevent user from being attacked while using web app locally

- **Protect the user**:

  - From social engineering
  - From trackers, private data being leaked

Why is web security hard?

- Social engineering is very effective
- Extremely ambitious goal: Run untrusted code securely
- Different sites interacting in the same tab like ads ("mashups")
- Low-level features: hardware access
- Desire for high performance
- APIs were not designed from first principles: evolved
- Strict backwards compatibility requirements
- **"Don't break the web"**

> "Modern web applications are built on a tangle of technologies that have been developed over time and then haphazardly pieced together. Every piece of the web application stack, from HTTP requests to browser-side scripts, comes with important yet subtle security consequences. To keep users safe, it is essential for developers to confidently navigate this landscape."
>
> - Tangled Web

The browser has a seemingly impossible task:

- Sites - **even malicious ones** can:
- Download content from **anywhere**
- Spawn worker processes
- Open sockets to a server, or even to another user's browser
- Display media in huge number of formats
- Run custom code on the GPU
- Save/read data from the filesystem

> "It's all too easy to criticize, lament, and create paranoid scenarios about the 'unsound security foundations' of the web. Truth is, all of that criticism is true, and yet the web has proven to be an incredibly robust platform."
>
> - Ilya Grigorik, Google web performance engineer

## The Five Stages of Hacking

1. [Reconnaissance](#reconnaissance) - Gathering Information

   - Passive Reconnaissance
   - Active Reconnaissance

2. Scanning and Enumeration
3. Gaining Access - Exploitation, Remote Connection Execution (RCE)
4. Maintaining Access
5. Covering Tracks

### Reconnaissance

1. Passive Reconnaissance:

   - Target Validation: `WHOIS`, `nslookup`, `dnsrecon`
   - Finding Subdomains: Google Fu, `dig`, `Nmap`, `Sublist3r`, `Bluto`, `crt.sh`, etc.
   - Fingerprinting: `Nmap`, `Wappalyze`, `WhatWeb`, `BuiltWith`, `Netcat`
   - Data Breaches: `HaveIBeenPwned` and similar lists

## OWASP Top 10

1. Insecure Direct Object References
2. Missing Function Level Access Control
3. Unvalidated Redirects and Forwards
4. Click Jacking attacks
5. Insufficient Attack Protection
6. Under-protected APIs

### 2021 List

1. Broken Access Control
2. [Cryptographic](./Cryptography.md) Failures (2017 - 3)
3. [Injection](./Code_Injection.md)
4. **Insecure Design**
5. Security Misconfiguration
6. Vulnerable and Outdated Components (2017 - 9)
7. [Identification and Authentication Failures](./Authentication.md) (2017 - 2)
8. **Software and Data Integrity Failures**
9. Security Logging and Monitoring Failures
10. **Server-Side Request Forgery** (SSRF) (2017 - 10)

### 2017 List

1. Injection
2. Broken Authentication
3. Sensitive Data Exposure
4. **XML External Entities**
5. Broken Access Control (2013 - 4 & 7)
6. Security Misconfiguration
7. Cross-Site Scripting (XSS): [Cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
8. **Insecure De-serialization**
9. Using Components with Known Vulnerabilities
10. **Insufficient Logging & Monitoring**

### 2013 List

1. Injection
2. Broken Authentication and Session Management
3. Cross-Site Scripting (XSS)
4. Insecure Direct Object References
5. Security Misconfiguration
6. Sensitive Data Exposure
7. Missing Function Level Access Control
8. [Cross-Site Request Forgery (CSFR)](./CrossSite_Resource_Forgery.md)
9. Using Components with Known Vulnerabilities
10. Unvalidated Redirects and Forwards

## Cross-Origin Resource Sharing (CORS)

All cross-origin calls must return with `Access-Control-*` headers to indicate white-listed applications

- `Access-Control-Allow-Origin`: List of origins allowed to connect to this API
- `Access-Control-Allow-Methods`: List of methods allowed for the API

Pre-flight question:

- Browser sends request with `OPTION` method set to receive CORS headers from backend
- After verification, browser sends the actual request

| Attributes           | Simple Request                                                       | Pre-flighted Request                |
| -------------------- | -------------------------------------------------------------------- | ----------------------------------- |
| Methods              | `GET`, `HEAD`, `POST`                                                | `DELETE`, `PUT`, `PATCH`, `CONNECT` |
| Allowed Headers      | `Accept`, `Accept-Language`,`Content-Language`, `Content-Type`, etc. | N/A                                 |
| Non-Standard Headers | Not-allowed, Upgrade to Pre-flighted                                 | N/A                                 |

## Same-Site Policy

Site vs Origin:

- Two URIs are part of the same origin, if they have the same scheme, host and port
- Two URIs are part of the same site, if they have the same domain and suffix

- Same Site:

  ```url
  https://foo.example.org
  https://bar.example.org
  ```

- Cross Site:

  ```url
  https://foo.github.io
  https://bar.github.io
  ```

- Same Site:

  ```url
  https://foo.bar.example.org
  https://bar.example.org
  ```

### SSP Applicable

Which is blocked?

- **Web Forms: applies**

  - Scripts, images, etc. which remain constant:

    ```url
    <script src="https://cross-origin/my.js">
    ```

  - Cross-origin web forms:

    ```url
    <form action="https://cross-origin/getmyval" method="GET">
    ```

- **JavaScript: applies**

  - Content operated via XMLHTTPRequest or Fetch (APIs):

    ```url
    fetch("https://cross-origin/getmyval")
    ```

## Security Headers

Mandatory security headers for apps:

- [`Strict-Transport-Security`](./Cryptography.md#http-strict-transport-security-hsts) enforces secure (HTTP over SSL/TLS) connections to the server

- `X-XSS-Protection` enables the [Cross-site scripting (XSS)](./Cross_Site_Scripting.md) filter built into most recent web browsers

- [`Content-Security-Policy`](./Content_Security_Policy.md) prevents a wide range of attacks, including Cross-site scripting and other cross-site injections

- Reduce Fingerprinting:

  - `X-Powered-By`:

- MIME Sniffing Protection:

  - When content type is:

    - **Set**: Some browsers (IE) try to verify content type with actual content payload
    - **Not Set**: Some browsers guess content type while others block loading of page

  - Block browser MIME sniffing
  - Blocks request if MIME type does not match tag types, e.g. `script`
  - Preferred Header Settings:

  ```http
  X-Content-Type-Options: nosniff
  ```

- Clickjacking Protection (Legacy):

  - AKA UI redressing
  - Attackers trick users into clicking hidden actionable content

    - CSS is used to create and manipulate layers
    - iframes are used to create hidden content

  - Prevent framing of your site as iframe in another website:

    - Complete deny:

      ```http
      X-Frame-Options: deny
      ```

    - Allow same origin:

      ```http
      X-Frame-Options: sameorigin
      ```

    - Allow from specific origin:

      - Allow from is deprecated in some browsers and should not be relied upon - use in conjunction with CSP

      ```http
      X-Frame-Options: allow-from https://normal-website.com
      ```

  ::: tip NOTE
  Clickjacking attacks are not mitigated by CSRF tokens
  :::

- Cache Headers:

  - Properly configured caching header is to avoid having sensitive information stored in browser or proxy:

    - `Cache-Control`: Header to determine if page should be cached
    - `Expires`: Not relevant in modern browsers but needed to stay consistent
    - `Pragma`: This is older header and replaced by `Cache-Control`

  ```http
  Cache-Control: private, no-cache, no-store, max-age=0, no-transform
  Pragma: no-cache
  Expires: 0
  ```

  ::: tip NOTE
  `no-cache` only works for proxies and `no-store` only works for browsers
  :::

You can cache:

- Static or non-personalised content
- Only `GET` request
- Only cache HTTP 200 OK response

You can't cache:

- Sensitive information/PII
- Set cookies request
- `Cache-Control` header that contains `private` and `no-cache` and `no-store`
- `Pragma` header that contains `private` and `no-cache` and `no-store`

Examples of extensions to cache:

| Web                | Images | Font |
| ------------------ | ------ | ---- |
| css                | jpg    | woff |
| js                 | jpeg   | tff  |
| json (static only) | png    | eot  |
|                    | gif    |      |
|                    | svg    |      |
|                    | jpg    |      |

## Regular expression Denial of Service - ReDoS

- [Regular expression Denial of Service](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)

Check if regex is safe:

- [safe-regex](https://github.com/davisjam/safe-regex)

## Resources

- CS-241 and CS-253 (Stanford): [YouTube Link](https://www.youtube.com/watch?v=5JJrJGZ_LjM&list=PL1y1iaEtjSYiiSGVlL1cHsXN_kvJOOhu-&index=1)

- [Adopting CSP](https://csp.withgoogle.com/docs/adopting-csp.html)
