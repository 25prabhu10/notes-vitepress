---
title: Logging
description: Logging
---

# Logging

Why is logging needed?

- Security:

  - Security Incidents
  - Vulnerability detected and exploitation
  - Anti-automation monitoring
  - Audit trails

- Compliance:

  - Policy Violations
  - Compliance monitoring
  - Data for request for information (e.g. freedom of information)

- Operational:

  - Problems and unusual conditions
  - Performance monitoring

What should be in a log?

- When:

  - Log date and time
  - Interaction identifier (linking all (relevant) events for a single user interaction)

- Where:

  - Application ID (e.g. name and version)
  - Application address (e.g. cluster/host name or IP address and port number)
  - Geolocation of server
  - Window/form/page (e.g. entry point URL and HTTP method)
  - Code location (e.g. script name, module name)

- Who:

  - Source IP address
  - User identity (e.g. primary key value, username etc.)

- What:

  - Type of event
  - Severity
  - Security relevant event flags
  - Description

Basically:

- Operational Events:

  - App errors and system errors
  - Startups and shutdowns
  - High risk operations (e.g. Delete)
  - Excessive use
  - Unacceptable/unexpected behaviour

- Security Events:

  - Input/output validation failures
  - Authentication (success & failures)
  - Authorization (failures)

- Compliance Events:

  - Legal and Opt-Ins
  - Data collection audit trail

What not to log?

- Operational Events:

  - Application Source Code
  - Session ID & Access Tokens

- Security Events:

  - PII (Personal Identifiable Information) and Passwords
  - DB connection strings
  - Encryption keys and other master secrets

- Compliance Events:

  - Commercially sensitive information
  - Information that is illegal to collect

## Tools

- Splunk

  - Security Information and Event Management (SIEM): Centralized logging platform
