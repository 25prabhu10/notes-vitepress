---
title: PL/SQL
description: Procedural Structured Query Language
---

# PL/SQL

## Wrappers

- Wrapping is the process of hiding PL/SQL source code
- Wrapping helps to protect your source code by converting it into an intermediate form of object code. By hiding application internals, the wrapper prevents:

  - misuse of your application by other developers
  - exposure of your algorithms to business competitors

- You can wrap PL/SQL source code with wither the wrap utility or `DBMS_DDL` subprograms

Limitations:

- Cannot wrap code for triggers
- Not downward compatible
- Does not detect syntax or semantic errors
- Wrapped code is twice or thrice larger than the original file
