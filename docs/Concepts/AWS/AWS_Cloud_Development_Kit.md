---
title: AWS Cloud Development Kit
description: AWS Cloud Development Kit
prev: ./AWS
---

# AWS Cloud Development Kit

- Define your cloud infrastructure using a familiar language:
  - JavaScript/TypeScript, Python, Java, and .NET
- Contains high level components called constructs
- The code is "compiled" into a CloudFormation template (JSON/YAML)
- **You can therefore deploy infrastructure and application runtime code together**
  - Great for Lambda functions
  - Great for Docker containers in ECS / EKS

```javascript
const vpc = new ec2.Vpc(this, "MyVpc", {});

const cluster = new ec2.Cluster(this, "MyCluster", {});

new ecs_patterns.ApplicationLoadBalancedFargateService(...);
```
