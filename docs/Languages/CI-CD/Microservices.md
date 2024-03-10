---
title: Microservices
description:
date: 2023-03-24
lastmod: 2023-10-04
---

# Microservices

Monolith Applications:

- All components are part of a single unit
- Everything is developed, deployed and scaled as 1 unit
- App usually must be written with 1 tech stack
- Teams need to be careful to not affect each other's work
- 1 single artifact, so you must redeploy the entire application on each update

```text
The Options

             ^
             |
             | Distributed BBoM           Microservices
             |
Distribution |
             |
             | Big Ball of Mud (BBoM)     Modular Monolith
             |
             |----------------------------------------------->
                               Modularisation
```

Are you sure?

## Service Registry

How applications and services locate each other

## Load Balancer

Efficiently distributes network traffic across a group of backend services

## Circuit Breaker

Stops an application from performing an operation that is likely to fail

## API Gateway

A server that is the single entry point into the system

## External Configuration

Keeps the configuration information in a centralized external store

## Bounded Context

The boundary of a model that represents its concepts, relationships, and rules

## References

- [5 Microservices Misconceptions](https://redis.com/blog/5-microservices-misconceptions/?utm_source=marketo&utm_medium=email&utm_campaign=March_2023_newsletter&mkt_tok=OTE1LU5GRC0xMjgAAAGKjJhaOSj_kmp5uYNVRxI3cr5ViVBgiFI6mr87hD69pBGwrwvDbZzEzlmO7XbYqcbrEQ-w2Wm6NOHSinzvW8YwguMCP8kupyLp48LE4VIZH43xzdc)
