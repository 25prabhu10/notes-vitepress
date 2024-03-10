---
title: ASP.NET Architectural Patterns
description: A domain-centric approach to organizing dependencies
---

# ASP.NET Architecture

Clean Architecture also known as:

- Onion Architecture
- Hexagonal Architecture
- Ports and Adapters

A domain-centric approach to organizing dependencies

## Two Common Approaches

1. N-Tier / N-Layer: UI --> Business --> Data Access --> DB

2. Clean Architecture:

   - UI --> Domain (Business)
   - Infrastructure (including Data Access) --> Domain (Business)
   - Infrastructure (including Data Access) --> DB

## Clean Architecture Rules

1. Model all business rules and entities in the Core project

2. All dependencies flow towards the core project

3. Inner projects, define interfaces. Outer projects implement them

## Core Project

Should consist of:

- Interfaces

- Entities: Things that have identities and are stored in DB

- Aggregates: Domain driven design pattern to group together entities. Grouping related entities

- Value Objects: Things that don't have identities (`DateTime`). Validation present in the construct, no validation required anywhere else.

- Domain Services: Where logic lives and interactions between entities are defined

- Domain Exceptions: Not depend on low level exception like `NullReference` exception. But create domain exceptions such as `UserNotFound` exception

- Domain Events

- Event Handlers

- Specification: Take query logic (LINQ) out of repository and put it into domain model

- Validations: Fluent validations

- Enums or Smart Enums

- Custom Guards: Simple validators to make sure the system is in a consistent state.

## References

- [Clean Architecture with ASP.NET Core 6](https://www.youtube.com/watch?v=lkmvnjypENw)
