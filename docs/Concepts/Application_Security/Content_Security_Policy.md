---
title: Content Security Policy
description: Content Security Policy
---

# Content Security Policy (CSP)

CSP provides additional layer of protection by enforcing loading of resources (scripts, images, etc.) from trusted locations

- It's very effective against XSS, Clickjacking etc.
- Visibility on attacks on app using CSP reporting directive
- Options to deliver CSP:

  - `Content-Security-Policy` header is preferred technique
  - `<meta>` HTML element with `http-equiv` with attribute set to `Content-Security-Policy`
  - `Content-Security-Policy-Report-Only` header used only for monitoring and not enforcing

Headers that can be used:

- `Content-Security-Policy`: yes
- `Content-Security-Policy-Report-Only`: !
- `X-Content-Security-Policy`: no
- `X-WebKit-CSP`: no

_Example:_

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
        default-src 'self';
        font-src 'self' https://fonts.gstatic.com/;
        style-src-elem 'self' googleapis.com;
        "
/>
```

## CSP Directives

CSP - fine grain control set

- **Fetch**: Informs browser of locations to trust and load resources from Eg.: `script-src`, `object-src`

- **Document**: Informs properties of documents to which policies will apply. Eg.: `base-url`, `sandbox`

- **Navigation**: Informs about the location that the document can navigate to. Eg.: `frame-ancestors`

- **Reporting**: Delivers violations to specified location. Eg.: `report-to`, `report-uri`

Special directives:

| Name             | Purpose                                                       |
| ---------------- | ------------------------------------------------------------- |
| `none`           | Strict. No resources allowed.                                 |
| `self`           | Strict. Only resources from same origin.                      |
| `unsafe-inline`  | Weak. Allows scripts in HTML.                                 |
| `unsafe-eval`    | Weak. Allows `eval()` functions in scripts.                   |
| `strict-dynamic` | Strong (if used correctly). Allows trust propagation scripts. |

## Basic CSP Policy

Basic policy with good security has the following requirements:

- All resources are hosted by the same domain of the document
- There are no inlines or evals for scripts and style resources:

  ```http
  Content-Security-Policy: default-src 'self';
  ```

- **Stricter**: Only allow images, scripts, AJAX and CSS from same origin. (No frame, object, media, etc.)

  ```http
  Content-Security-Policy: default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self';
  ```

Order of priority: `default-src` --> `script-src` --> `script-src-elem` | `script-src-attr`

## Locking Down JavaScript

1. **Hash Method**:

   - Calculate the hash of the script or script file

   - Following changes to application is required:

   - Refactor any markup with inline event handlers (e.g. `onclick`) and JavaScript: URIs
   - Move all scripts (movable) from inline to external JS files
   - Add input validation for any user inputs and encoding before writing into DOM

   ```html
   script-src 'sha2-d24982a62c99c55d38cf05efe943324c95a342b019b6a5bc136dc865'

   <!-- chrome calculates for us -->
   <script>
   console.log("this will work");
   </script>

   <script src="https://...">
   ```

2. **Nonce**:

   - Nonce is arbitrary number that can be used just once
   - Nonce is composed of `base64` values
   - Nonce attributes are added to script tags
   - Nonce is verified against the nonce sent in the CSP header

   - Following changes to application is required:

     - Add nonce attribute to all trusted `<script>` elements
     - For every page load, generate a new nonce and use that in CSP header

   ```html
   script-src 'nonce-SecureRandomValue'

   <script nonce="SecureRandomValue">
   console.log("this will work");
   </script>

   <script nonce="SecureRandomValue" src="https://...">
   ```

For dynamic JS:

- Some JS/Framework might add/create scripts dynamically and append to DOM
- If scripts are appended by trusted (nonce) scripts, then allow them

```html
script-src 'nonce-SecureRandomValue' 'strict-dynamic'

<!-- this is allowed -->
<script nonce="SecureRandomValue">
  let s = document.createElement("script");
  s.src = "some.com/some.js";
  document.body.appendChild(s);
</script>

<!-- this is blocked -->
<script src="some.com/some.js">
```

## Preventing Clickjacking

A companion to `X-Frame-Options`:

- Protect page from being framed by other sites
- Prevent all framing of your content:

  ```http
  Content-Security-Policy: frame-ancestors 'none';
  ```

- Allow framing for site itself:

  ```http
  Content-Security-Policy: frame-ancestors 'self';
  ```

- Allow framing for trusted domains:

  ```http
  Content-Security-Policy: frame-ancestors 'trusted.com';
  ```

## Versions

CSP3

## Policy Injection

- New directive `script-src-elem` allows you to control just script blocks

- This allows event handlers but blocks script elements:

  ```http
  Content-Security-Policy: script-src-elem 'none'; script-src-attr 'unsafe-inline';
  ```

- CSP bypass is possible provided you have policy injection flaw
- This directive will overwrite existing `script-src` directives

JSONP problem:

- Allowlist an origin/path hosting a JSONP
- JS execution is allowed. Depends on JSONP endpoint
- CDN typically have numerous exposed JSONP endpoint

## Conclusion

- CSP is very effective with Nonce and/or SHA
- Beware of using `strict-dynamic`. Only on trusted scripts/frameworks
- Start with report only CSP header
- Beware of Unvalidated redirects, JSONP endpoints or Header injection
- Not a substitute for XSS protection
