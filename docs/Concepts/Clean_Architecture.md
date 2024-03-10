---
title: Clean Architecture
description:
---

# Clean Architecture

[Google](https://github.com/jhuangtw/xg2xg)

A domain-centric approach to organizing dependencies

Formerly known as:

- Onion Architecture
- Hexagonal Architecture
- Ports and Adapters

With Clean Architecture, the **Domain** and **Application** layers are at the center of the design (**Core** of the system)

- Dependence on infrastructure concerns is minimized; keeping focus on domain logic

- **Core** should not be dependent on data access and other infrastructure. All dependencies point inwards

  - This is achieved by adding interfaces or abstractions within **Core** that are implemented by layers outside of **Core**.

- Independent of frameworks
- Testable
- Independent of UI
- Independent of database
- Independent anything external

Layers:

- Domain Layer:

  - Contains enterprise logic and types
  - Can be shared across many systems

- Application Layer:

  - Contains business logic and types
  - Specific to that system

- Presentation Layer:

  - Depend on Core system, But not on Infrastructure

- Infrastructure Layer:

  - Depend on Core system, But not on Presentation

Clean Architecture Rules:

1. Model all business rules and entities in the Core project
2. All dependencies flow towards the Core project
3. Inner projects define interfaces; outer projects implement them

What belongs in the **Core project**:

- Interfaces
- Aggregates, Entities
- Value Objects
- Domain Services
- Domain Exceptions
- Domain Events, Event Handlers
- Specifications
- Validators
- Enums
- Custom Guards

What belongs in the **Infrastructure project**:

- Repositories, DbContext Classes, Cached Repositories
- API Clients
- File Systems Accessors, Azure Storage Accessors
- Emailing Implementation, SMS Implementation
- System Clock

What belongs in the **Web/API** project:

- API Endpoints, Razor Pages, Controllers, Views
- API Models, ViewModels
- Filters
- Model Binders
- Tag Helpers
- **Composition Root**

The "Shared Kernel":

- Domain-Driven Design term
- Holds common types shared between DDD apps
- Typically referenced by Core projects
- Ideally distributed as NuGet Packages

What belongs in the **Shared Kernel** project:

- Base Entity, Base Value Object, Base Domain Event, Base Specification
- Common Interfaces, Common Exceptions
- Common Auth
- Common Guards
- Common Libraries, DI, Logging, Validators
- **No Infrastructure Dependencies**

N-Tier/N-Layer Architecture:

- UI --> Business --> Data Access --> DB

## T

- src

  - Domain:

    - Types, Entities, Exceptions
    - Domain specific: Such as Finance domain will have finance specific things like currency, rates, currency representation etc..
    - Less application logic

  - Application:
    - Application specific things. What the application is being built for
    -
  - Infrastructure
  - WebUI

- tests

  - Unit Tests
  - Integration Tests

## Resources

- [Clean Architecture with .NET Core: Getting Started](https://jasontaylor.dev/clean-architecture-getting-started/)
- [Clean Architecture with ASP.NET Core 2.1 | Jason Taylor](https://www.youtube.com/watch?v=_lwCVE_XgqI)

- [Tiny Little Drawing app](https://www.tldraw.com/)
- [Drawing app](https://excalidraw.com/)
