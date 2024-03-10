---
title: Application Security
next: ./Web_Security.md
sidebar: false
---

# Table of Content

1. [Web Security](./Web_Security.md)
2. [Cryptography](./Cryptography.md)
3. [Authentication](./Authentication.md)
4. [API](./API.md)
5. [Cross-site scripting (XSS)](./Cross_Site_Scripting.md)
6. [SQL Injections](./Code_Injection.md#sql-injection)
7. [Content Security Policy](./Content_Security_Policy.md)
8. [Same-Origin Policy](./SameOrigin_Policy.md)
9. XPATH Injection
10. [HTTP Security](../Web/HTTP.md#http-security)
11. [Unicode Normalisation Vulnerability](./Unicode.md)

- Typosquatting

Minimum Viable Security (MVS):

- Start early
- Shift-left
- Iterative work

Security Categories:

1. Secret Detection: Your data

   - To detect secrets in various formats:

     - Passwords
     - Access keys
     - API tokens
     - Credit card numbers

   - Secret detection can prevent fraudulent use of credentials that were committed accidentally

   - Tools:

     - [gitleaks](https://github.com/zricethezav/gitleaks) by Zachary Rice
     - [git-secrets](https://github.com/awslabs/git-secrets) by AWS
     - [detect-secrets](https://github.com/Yelp/detect-secrets) by Yelp

2. Dependency Check ([SCA](#software-composition-analysis-sca)): Your libraries

   - To detect open source components with known vulnerabilities

   - Tools for Python:

     - [OWASP dependency-check](https://github.com/jeremylong/DependencyCheck)
     - [Safety](https://github.com/pyupio/safety) by Pyup.io
     - [Jake](https://github.com/sonatype-nexus-community/jake) by Sonatype

3. Infrastructure Misconfiguration: Your infrastructure

   - To detect security misconfigurations in your infrastructure-as-code, before they reach the cloud

     - Missing encryption
     - Broad Permissions
     - No logging
     - Default Port

   - Tools:

     - [KICS](https://github.com/Checkmarx/kics) by Checkmarx
     - [TFSEC](https://github.com/aquasecurity/tfsec) by Aqua Security
     - [checkov](https://github.com/bridgecrewio/checkov) by Bridgecrew (Palo Alto)

4. Container Scanning: Your packaging

   - To detect vulnerabilities and configuration issues in container images

   - Tools:

     - [Trivy](https://github.com/aquasecurity/trivy) by Aqua Security
     - [Clair](https://github.com/quay/clair) by Quay.io
     - [Anchore](https://github.com/anchore/anchore-engine)

5. Runtime Scanning: Your runtime

   - To detect vulnerabilities in web applications (and API) while they are running
   - DAST (Dynamic Application Security Testing)

   - Tools:

     - [ZAP](https://github.com/zaproxy/zaproxy) by OWASP
     - [Nikto](https://github.com/sullo/nikto)
     - [Arachni](https://github.com/Arachni/arachni)

-[5 Security Tools All Developers Should Know About](https://www.youtube.com/watch?v=M-LSpxgNxsM)

- [Example project](https://github.com/ranreg/Open-Source-Summit-2022)

- [JIT - Security Platform](https://www.jit.io/)

## XPATH Injection

## Static Analysis Security Testing (SAST)

Static Code Analysis

1. What is Static Code Analysis?

   - Predicting defects in code without running it

2. How Static Code Analysis tools work?

   - At the core of most popular static analysis libraries is the concept of an **Abstract Syntax Tree**, or AST for short. An AST is a representation of source code as a tree structure: each source file is a root node, and root-level constructs declared in the file are child nodes of that node. Those child nodes can each have child nodes within them

3. Some of the Static Code Analyses are:

   - There are many Static Code Analyses for different languages

   - As JavaScript is a dynamically typed language, we can use [ESLint](https://eslint.org/) (linter) and [Prettier](https://prettier.io/) (formatter) to catch most of the errors

   - [Flow](https://flow.org/) from Facebook is a Static type checker. It can be used alongside linters and formatters to catch more bugs

   - [TypeScript](https://www.typescriptlang.org/) extends JavaScript by adding types

   - [`Checkmarx`](./Checkmarx.md), `JFROG XRAY` are some of the other tools

4. What are the other techniques to find bugs?

   - **_Code Coverage Tools_** - Code coverage provides information about whether, and optionally how often certain parts of an application have been executed. It's commonly used to determine how thoroughly a test suite exercises a particular codebase. [JestJS](https://jestjs.io/) is a testing framework for JavaScript with code coverage

   - **_Software Composition Analysis_** - Identify Vulnerabilities In Open Source Libraries used as dependencies in the project. [RetireJS](https://github.com/RetireJS/retire.js) is one such tool for JavaScript

## Software Composition Analysis (SCA)

- Artifactory X-ray
- SonarCube
- Snyk

## References

- [Different Vulnerability Payloads](https://github.com/swisskyrepo/PayloadsAllTheThings)
- [OWASP API Security](https://github.com/OWASP/API-Security)
- [CheatSheet](https://cheatsheetseries.owasp.org/)
- [Stanford - CS 253 Web Security](https://web.stanford.edu/class/cs253/)
- Insecure apps for testing:

  - [Juice Shop](https://github.com/bkimminich/juice-shop)
  - [WebGoat](https://github.com/WebGoat/WebGoat): A Java based deliberately insecure application and companion app **WebWolf**

Books:

- _The Web Application Hacker's Handbook: Finding and Exploiting Security Flaws_ (ISBN-13: 978-1118026472) (2011)

- _Alice and Bob Learn Application Security_ by Tanya Janca (ISBN-13: 978-1119687351) (2020)
