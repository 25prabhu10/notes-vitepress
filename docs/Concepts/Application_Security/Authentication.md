---
title: Authentication
description: Different Authentication mechanisms
---

# Authentication

Authentication is the process of identifying users that request access to a system, network, or device.

Access control often determines user identity according to credentials like username and password. Other authentication technologies like biometrics and authentication apps are also used to authenticate user identity

Incorrectly build authentication and session management scheme that allows an attacker to impersonate another user

## Common Authentication Schemes

How Claims Based Authentication works?

1. Browser or Client (user) -- Request token --> Security Token Service (STS) by Identity Provider (IdP)

2. STS Authenticates user by some means, usually username and password

   - For this STS will get information about user from Account/Attribute Store (common example Active Directory)

3. STS creates and returns a token

4. User sends this token along with the request to an application

5. Application can use an Identity Library to verify the token

   - This library will verify token's signature and checks whether this STS is trusted

6. Once verifyed the application can use claims provided by the token to perform actions

7. The **'Basic'** HTTP Authentication Scheme (RFC 7617):

   - Transmits credentials as user-id/password pairs, encoded using _Base64_
   - Part of browser
   - Server responseds with `www-Authenticate` header and when browser see this, it will ask for username and password

   ```http
   HTTP/1.1 401 Unauthorized
   Host: server.example.com
   WWW-Authenticate: Basic realm="WallyWorld"
   ```

   - **Not secure**

   - _Example_:

   ```javascript
   app.use((req, res, next) => {
     // -----------------------------------------------------------------------
     // authentication middleware

     const auth = { login: "yourlogin", password: "yourpassword" }; // change this

     // parse login and password from headers
     const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
     const [login, password] = Buffer.from(b64auth, "base64")
       .toString()
       .split(":");

     // Verify login and password are set and correct
     if (
       login &&
       password &&
       login === auth.login &&
       password === auth.password
     ) {
       // Access granted...
       return next();
     }

     // Access denied...
     res.set("WWW-Authenticate", 'Basic realm="401"'); // change this
     res.status(401).send("Authentication required."); // custom message

     // -----------------------------------------------------------------------
   });

   // or

   const app = require("express")();
   const basicAuth = require("express-basic-auth");

   app.use(
     basicAuth({
       users: { admin: "super secret" },
       challenge: true, // <--- needed to actually show the login dialogue!
     })
   );
   ```

8. The OAuth 2.0 Authorization Framework: **'Bearer'** Token Usage (RFC 6750):

   - Any party in possession of a bearer token (a "bearer") can use it to get access to the associated resources (without demonstrating possession of a cryptographic key)

   - _Example_:

   ```http
   GET /resource HTTP/1.1
   Host: server.example.com
   Authorization: Bearer mF_9.B5f-4.1JqM
   ```

9. HTTP **'Digest'** Access Authentication (RFC 7616):

   - Provides a simple challenge-response authentication mechanism that may be used by a server to challenge a client request and by a client to provide authentication information

   - _Example_:

   ```http
   HTTP/1.1 401 Unauthorized
   WWW-Authenticate: Digest
       realm="http-auth@example.org",
       qop="auth, auth-int",
       algorithm=SHA-256,
       nonce="7ypf/xlj9XXwfDPEoM4URrv/xwf94BcCAzFZH4GiTo0v",
       opaque="FQhe/qaU925kfnzjCev0ciny7QMkPqMAFRtzCUYo5tdS"
   WWW-Authenticate: Digest
       realm="http-auth@example.org",
       qop="auth, auth-int",
       algorithm=MD5,
       nonce="7ypf/xlj9XXwfDPEoM4URrv/xwf94BcCAzFZH4GiTo0v",
       opaque="FQhe/qaU925kfnzjCev0ciny7QMkPqMAFRtzCUYo5tdS"
   ```

10. HOBA

    - See RFC 7486, Section 3, HTTP Origin-Bound Authentication, digital-signature-based

11. Mutual

    - See RFC 8120

12. Negotiate / NTLM

    - See RFC4599

13. VAPID

    - See RFC 8292

14. SCRAM

    - See RFC 7804

15. AWS4-HMAC-SHA256

    - See AWS docs. This scheme is used for AWS3 server authentication.

Types:

1. Password-based Authentication:
2. Multi-Factor Authentication (MFA):

   - An authentication method that requires two or more independent ways to identify a user

3. [Token-based Authentication]
4. Certificate-based authentication

## Authorization

### Least Privileges

These vulnerabilities are exposed when application privileges are loosely assigned

- This can allow users or processes more privilege than they actually require to complete their function
- "Least Privilege" is a general rule that says all user, application and system functions should run with the least amount of privileges possible to complete their role

The "Least Privilege" concept will not stop application security weaknesses, like code injections, for example. However, it will make it much harder for an attacker to further exploit those weaknesses

- Deny by default; allow on a case-by-case basis

### Insecure Direct Object Reference

This vulnerability allows an attacker to bypass authorization checks in order to gain access to protected resources

- A direct object reference occurs when a reference to an internal object (e.g. file, DB key ...) is exposed through a link or parameter value. If no authorization check is in place, attackers can manipulate these to access unauthorized data

The impact of an attack depends on the parameter:

- _Example:_ If the attacker is able to access another user's password, if he's able to access another user's shopping basket he could buy products in that user's name.
- This attack can also be used to access files from the system

Prevention:

- Prevent attackers from directly targeting unauthorized resources by using per user or per session indirect references instead, implement access control checks to make sure the user is authorized for the requested information
- Never rely on user-defined inputs parameters (GET/POST parameters, cookies, HTTP headers, etc) to authorize access to sensitive resources.
- Always rely on server-side session information. Use mapping values to access objects
- Use centralized authorization routines. No two separate pieces of code should verify if an account belongs to a certain user

### Missing Functional level access control

Missing functional level access control occurs when users can perform functions they have not been authorised for when resources can be accessed by an authorised user s

- functional level access control is missing when access checks have not been implemented or when a protection mechanism exists but is not properly configured

- an attacker could fauj request in order to access functionality without proper authorisation. an attacker could gain access to the administrative panel of your application. and employee from the sales department could view information from the financial department.

Prevention:

- protect all business functions using a role based authorisation mechanism, server side. authorisation should be implemented using centralised authorisation routing. deny access by default

- all business functions should be authorised
- implement authorisation using a role based mechanism
- you centralised authorisation proteins. easy-to-use external module
- deny access by default
- perform access control server side

## Authentication Mechanism

- OAuth 1.0
- OAuth 1.0a
- [OAuth 2.0](#oauth)

_Example_: Session based auth:

```javascript
const sessions = require("client-session");

app.use(
  sessions({
    cookieName: "session",
    secret: "great secret",
    duration: 30 * 60 * 1000, // 30 min
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true, // destroy cookies when the browser closes
  })
);

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (password !== user.password) {
      return res
        .status(401)
        .json({ error: { message: "Invalid username or password" } });
    }

    req.session.userId = user.id;
    return res.redirect("/");
  });
});
```

_Example:_

- Endpoint to determine if credentials are valid:

```http
# basic auth example request
api.example.com
GET /
Authorization: Basic (base64 encoded credentials here)

# oauth 2.0 example request
api.example.com
GET /?access_token=foo
```

- Response from the endpoint:

```http
HTTP/1.1 200 OK
Content-Type: text/json
{
    "organization" : {
         "name" : "Runscope",
         "id" : "O94107"
    },
    "user" : {
        "name" : "John Sheehan"
        "id" : 123
        "subscription_expires" : 1356976799
    }
}
```

- If the credentials are invalid, the API will return an error:

```http
HTTP/1.1 401 Unauthorized
Content-Type: text/json
{
    "error" : {
        "code" : 401
        "message" : "The credentials provided are invalid."
        "more_info_url" : "http://example.com/help/errors/401"
    }
}
```

## OAuth

The [OAuth 2.0](https://www.rfc-editor.org/rfc/rfc6749) authorization framework is a protocol that allows a user to grant a third-party web site or application access to the user's protected resources, without necessarily revealing their long-term credentials or even their identity

- OAuth 2.0 is about resource access and sharing

### OpenID Connect (OIDC) Protocol

OpenID Connect (OIDC) is an identity layer built on top of the [OAuth 2.0](#oauth) framework. It allows third-party applications to verify the identity of the end-user and to obtain basic user profile information. OIDC uses JSON web tokens (JWTs), which you can obtain using flows conforming to the OAuth 2.0 specifications

- OIDC is about user authentication
- Its purpose is to give you **one login for multiple sites**
- An open standard for decentralized authentication

- [Authorization Code Flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow)

## Tokens

There are two types of tokens that are related to identity:

- ID tokens: for authentication, OpenID using JWT
- Access tokens: allow access to a resource, OAuth2.0 (Allows an application to access specific resources on behalf of a user)

3 specialized tokens:

- **Refresh tokens**: A token used to obtain a renewed access token without having to re-authenticate the user

- **IDP access tokens**: Access tokens issued by identity providers after user authentication that you can use to call the third-party APIs

- **Auth0 Management API access tokens**: Short-lived tokens containing specific claims (scopes) that allow you to call Management API endpoints

Other tokens:

- Simple web tokens (SWTs)
- Security Assertion Markup Language (SAML) tokens

### JSON Web Token (JWT)

JSON Web Token (JWT) [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object

- This information can be verified and trusted because it is digitally signed

- JWTs can be signed using a secret (with the `HMAC` algorithm) or a public/private key pair using `RSA` or `ECDSA`

- **JWTs are tokens**, but not all tokens are JWTs
- Relatively small size
- Can be sent through a URL, through a `POST` parameter, or inside an HTTP header

Use case for JWT:

- Authorization:
- Information Exchange:

### JWT Structure

JSON Web Tokens consist of 3 parts separated by dots (`.`) `xxxxx.yyyyy.zzzzz`:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- Header:

  - Typically consists of two parts:

    - The type of the token, which is JWT
    - The signing algorithm being used, such as `HMAC`, `SHA256` or `RSA`

  - This JSON is **Base64Url** encoded

  - _Example_:

  ```json
  {
    "alg": "HS256",
    "typ": "JWT"
  }
  ```

- Payload:

  - Contains the claims
  - Claims are statements about an entity (typically, the user) and additional data
  - There are 3 types of claims:

    - [Registered]
    - [Public]
    - [Private]

  - This JSON is **Base64Url** encoded

  - Do note that for signed tokens this information, though protected against tampering, is readable by anyone. Do **not put secret information in the payload or header elements of a JWT unless it is encrypted**

- Signature:

  - To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that

  - _Example_: useing the HMAC SHA256 algorithm

  ```javascript
  HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret);
  ```

  - The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is

#### Registered Claims

The JWT specification defines seven reserved claims that are **not required, but are recommended** to allow interoperability with third-party applications:

- `iss` (issuer): Issuer of the JWT

- `sub` (subject): Subject of the JWT (the user)

- `aud` (audience): Recipient for which the JWT is intended

- `exp` (expiration time): Time after which the JWT expires

- `nbf` (not before time): Time before which the JWT must not be accepted for processing

- `iat` (issued at time): Time at which the JWT was issued; can be used to determine age of the JWT

- `jti` (JWT ID): Unique identifier; can be used to prevent the JWT from being replayed (allows a token to be used only once)

_Example:_

```json
{
  "iss": "http://YOUR_DOMAIN/",
  "sub": "auth0|123456",
  "aud": "YOUR_CLIENT_ID",
  "exp": 1311281970,
  "iat": 1311280970,
  "name": "Jane Doe",
  "given_name": "Jane",
  "family_name": "Doe",
  "gender": "female",
  "birthdate": "0000-10-31",
  "email": "janedoe@example.com",
  "picture": "http://example.com/janedoe/me.jpg"
}
```

#### Public Claims

These can be defined at will by those using JWTs. But to avoid collisions they should be defined in the [IANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml) or be defined as a URI that contains a collision resistant namespace

#### Private Claims

These are the custom claims created to share information between parties that agree on using them and are neither registered or public claims

_Example_:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

### JWT Authentication Process

Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the Authorization header using the Bearer schema:

```http
Authorization: Bearer <token>
```

Best Practices:

- Stop using JWT for sessions

- Do not keep tokens longer than required (some servers don't accept more than 8KB in headers), use `exp`, `nfb` and `iat` claims

- Do not store sensitive session data in browser storage due to lack of security

- Use Pairwise Pseudonymous Identifiers (PPID) that can be used instead of a plain user ID

- Always check the issuer: check `iss` claim against a whitelist

- It is hard to invalidate the session of an attacker after detecting a compromise and they can call APIs with this token

- If that could pose problems to your application, you can change the bearer token into a Proof of Possession token (a PoP token) by adding a `cnf` claim - a confirmation claim. The claim contains information that allows the resource server to verify whether the holder is allowed to use the given token, e.g., a fingerprint of the client's certificate

- Always Check the Audience: The resource server should always check the `aud` claim and verify that the token was issued to an audience that the server is part of (as the aud claim can contain an array, the resource server should check if the correct value is present in that array)

> [](https://curity.io/resources/learn/jwt-best-practices/)

## Impact

Attacker can take identity of victim

## Mitigation

- **Don't develop your own authentication schemes**
- Use open source frameworks that are **actively maintained** by the community
- Use strong passwords (upper, lower, number, special characters)
- Require current credential when sensitive information is required or changed
- Multi-factor authentication (sms, password, fingerprint, iris scan, etc.)
- Log-out or expire session after `x` amount of time
- Be careful with 'remember me' functionality

## Passwords

Always hash passwords before saving to Database

- **Never use MD5** for password storage

Password Entropy matters (amount of information held in the password)

- It can easily be brute forced if its 8 or less chars.
- Is it dictionary attackable
- Min 16 characters

-PBKDF2

### Hashing

Used to:

- Used as signatures

Hashing algorithms must be:

- Reasonable fast (not too quick)
- Change in 1 bit at any place should change the whole hash (called the avalanche effect)
- Should avoid has collisions (the pigeon hole principal)

Salting must be used:

- Salts must be long strings
- Salts must be unique to each user

## References

- [Root cause analysis of session management and broken authentication vulnerabilities](https://ieeexplore.ieee.org/abstract/document/6280203)
- [xkcd: Password Strength](https://xkcd.com/936/)
- [xkcd: Password Reuse](https://xkcd.com/792/)

### Cracking Passwords

- [hashcat](https://hashcat.net/hashcat/):
