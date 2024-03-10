---
title: Software Architectural Patterns
description:
date: 2023-09-03
lastmod: 2023-09-03
---

# Software Architectural Patterns

An architectural pattern is a general, reusable solution to a commonly occurring problem in software architecture within a given context. Architectural patterns are similar to software design pattern but have a broader scope

1. Layered Pattern:

   - [Clean/Onion Architecture](./Clean_Architecture.md)
   - Layered (n-tire): Separates software into logical layers

2. Event-Driven:

   - Event-Driven: Promotes the production, detection, consumption of, and reaction to events
   - Publish-Subscribe

3. Component-Based:

   - Object-Oriented
   - Microkernel: Separates a minimal function core from extended functionality and customer-specific parts
   - Plug-in

4. Service-Oriented:

   - Service-Oriented (SOA)
   - Broker
   - Microservices: This architecture designs a software application as a suite of independently deployable, small, modular services
   - Serveless (Faas)

5. Data-Centric:

   - CQRS: Separates read and write operations for a data store. It enables independent scaling of read and write workloads and optimizes them separately
   - Event-Sourcing
   - Kappa
   - Lambda

6. Distributed System:

   - Space-Based: This resolves the issues of data consistency, reliable performance, and scalability for large-scale distributed systems
   - Peer-to-Peer

7. Domain-Driven:

   - Hexagonal (Ports & Adapters)
   - Domain-Driven Design (DDD): Focuses on the domain logic and complexity rather that the technology used

8. Separation Of Concern:

   - Model-View Presenter: Derivative of the Model-View-Controller (MVC) pattern, which aims to separate the concerns of data management, user interface, and control flow
   - Model-View-Controller

9. Concurrency:

   - Orchestration Choreography: A central coordinator (often called an orchestrator) that directs the interaction between services. The orchestrator is responsible for managing the control flow and data flow between services
   - Primary-Secondary
   - Pipeline/Pipe-Filter

10. Interpreter: Written in a high-level language, which the interpreter translates into executable code
