---
title: regex collection
description: Collection of regex sequence
---

# Regex Collection

- Email:

  ```python
  import re

  email = input("Email: ")

  if re.search("^[A-Za-z0-9].+@(cs50.)?(h|v).edu$", email):
      print("Thanks")
  ```

- Convert CamelCase letter to letters with space:

  ```javascript
  "RedAndBlue".replace(/\B([A-Z])\B/g, " $1");
  // "Red And Blue"
  ```
