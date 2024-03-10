---
title: CI/CD
description: Continuous Integration (CI) and (more often) Continuous Delivery or (less often) Continuous Deployment (CD)
---

# CI/CD

CI/CD or CICD is the combined practices of continuous integration (CI) and (more often) continuous delivery or (less often) continuous deployment (CD)

- CI/CD is a method to frequently deliver apps to customers by introducing automation into the stages of app development

## The Ideal CI/CD Pipeline

1. Source:

   - Require X reviewers

2. Build:

   - Compile source and dependencies
   - Run unit tests
   - Check and enforce code coverage % (90+)

3. Test Environment:

   - Run Integration tests

4. Staging Environment:
5. Prod Environment (1box) (10% traffic):

   - Alarms on Errors, Latency, Key Business Metrics
   - Bake Period: 24 hours
   - Anomaly Detection
   - Error counts + Latency Breaches
   - Canary

6. Prod Environment:

   - Alarms on Errors, Latency, Key Business Metrics
   - Bake Period: 24 hours
   - Anomaly Detection
   - Error counts + Latency Breaches
   - Canary
