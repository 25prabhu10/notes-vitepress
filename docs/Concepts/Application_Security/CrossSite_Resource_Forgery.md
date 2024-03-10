---
title: Cross-Site Request Forgery (CSRF)
description: CSRF is a type of malicious exploit of a website
---

# Cross-Site Request Forgery (CSRF)

**Cross-site request forgery**, also known as **one-click attack** or **session riding** and abbreviated as **CSRF** (sometimes pronounced _sea-surf_) or **XSRF**, is a type of malicious exploit of a website where unauthorized commands are submitted from a user that the web application trusts

- Attack which forces an end user to execute unwanted actions on a web app in which they're currently authenticated

- Normal users: CSRF attack can force user to perform requests like transferring funds, changing email address, etc.

- Admin users: CSRF attack can force admins to add new admin user, or in the worst case, run commands directly on the server

- Effective even when attacker can't read the HTTP response

## Prevention

- Synchronizer token pattern (STP): technique where a token, **secret and unique value for each request**, is embedded by the web application in all HTML forms and verified on the server side:

  ```html
  <input
    type="hidden"
    name="csrfmiddlewaretoken"
    value="KbyUmhTLMpYj7CD2di7JKP1P3qmLlkPt"
  />
  ```

- Cookie-to-header token
