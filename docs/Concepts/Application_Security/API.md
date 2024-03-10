---
title: API Security
description: Securing API endpoints
---

# API Security

API security is nothing but securing the API endpoints from attackers and building your APIs in a secure fashion.

APIs inherit most of the problems with session/session-less management.

A vulnerable API could lead to:

- Unauthorized Access
- Data Leakage
- Sanctioning Fuzzy Input
- Injection Vulnerabilities
- Parameter Tampering, etc.

## Broken Function And Object Level Authorisation

- Function level authorisation is poor implementation of resource scope

- Object level authorisation is poor implementation of resource access

## Excessive Data Exposure

- Excessive data (sensitive) returned by API when not intended

## Lack Of Resource Rate-Limiting

- Rate-limiting is crucial to API abuse and/or DOS

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 992
```

## Mass Assignment

- Use of functions that automatically bind input from client into variables or objects

- Filter data

[Mass Assignment exploit](https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html)

## Security Misconfiguration

Security misconfiguration with APIs often are very common with generic HTTP issues:

- Application stack hardening
- Missing security patches for frameworks
- Unnecessary features enabled (e.g. HTTP verbs)
- TLS missing
- Security headers missing
- CORS headers missing or incorrect
- Error messages include stack trace etc.

## Missing Object Level Access Control

- Object level access control acts as an authorization mechanism.
- Access control is generally set up at the code level to determine which objects a given user can and cannot access.

Prevention Methods

- Ensure the authorization mechanism is set up based on the application's user policies and data level access hierarchy.
- Perform checks to see whether users have access to perform the requested action for each function.
- Use difficult to predict globally unique identifiers to ID records.
- Ensure there are tests in place to evaluate the access control mechanism.

::: danger Vulnerabilities
Failure to set up object level access control can leave records or other objects open to unauthorized access or modification.
:::

## Security Testing Tools

| Security Issues                   | Tools to Test                                   |
| --------------------------------- | ----------------------------------------------- |
| Injection Flaw (SQLi, LDAP, CRLF) | Burp Suite, Proxy, SQLmap, Astra Security Scan  |
| Broken Authentication             | Burp Suite, Manual Testing, Astra Security Scan |
| Data Exposure                     | Acunetix, DirBuster, Astra Security Scan        |
| XSS                               | Burp Suite, Manual Testing, Astra Security Scan |

## API Security Testing

1. Test for API Input Fuzzing:

   - Fuzzing simply means **providing random data to the API until it spills something out** (some info, some error message or anything to imply that random data has been processed by the API)

   - _Example:_ For numerical inputs, try: 0, -ve numbers or very large numbers. For string inputs, try: SQL queries or system commands or random characters

   - Fuzzapi: Automate testing

2. Test for API Injection Attacks:

   1. SQL Injection (SQLi):

      - SQLi attacks are successful when the unsanitized API input is processed by the DB.
      - _Example:_ Inputs like, `or 1=1--`, `and 1=1--`, URL based: `http://example.com/api/auth-token/user=admin'or 1=1--`
      - Sqlmap: Automate testing

   2. Command Injection:

      - When OS commands are provided as inputs and these commands then get executed on the server.
      - _Example:_ For a Linux system: `rm /` removes root directory, when URL encoded this command looks like this `rm%20/`. URL: `http://example.com/view?name=file.txt;rm%20/`
      - Commix: Automate testing

   3. Test for Parameter Tampering:

      - Parameters sent through an API request may be vulnerable to tampering. Attacker can change the values of a product and buy it for free.
      - _Example:_ If there is a hidden field in the form submitted by the user:

        ```html
        <input type="hidden" name="price" value="100.00" />
        ```

        - Attacker can change the value from 100.00 to 1 and get the product at very low cost.

   4. Test for Unhandled HTTP Methods

      - If a server dose not support an HTTP method, typically it should show an error.
      - But this not the case always especially for vulnerable APIs
      - If the server dose not support an HTTP method it should respond with **405 Method Not Allowed**
