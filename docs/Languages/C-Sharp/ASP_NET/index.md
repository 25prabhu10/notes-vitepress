---
title: ASP.NET
next: ./ASP_NET_Core.md
sidebar: false
---

# Table of Content

1. [ASP.NET Core](./ASP_NET_Core.md)
2. [ASP.NET Core API](./ASP_NET_Core_API.md)
3. [ASP.NET Core MVC](./ASP_NET_Core_MVC.md)
4. [Deployment](./Deployment.md)
5. [ASP.NET Architectural Patterns](./ASP_NET_Architectural_Patterns.md)
6. [ASP.NET Framework MVC 5](./ASP_NET_MVC.md)
7. [IIS](./IIS.md)

## ASP.NET Core Developer Roadmap in 2022

Reference: [ASP.NET Core Developer Roadmap](https://github.com/MoienTajik/AspNetCore-Developer-Roadmap)

- [Proto Hackers](https://protohackers.com/)

1. General Development Skills

   - [GIT](./../../Git)
   - [HTTP/HTTPS](../../../Concepts/Web/HTTP.md) protocol
   - [dotnet CLI](../Dotnet_CLI.md)
   - [Data Structures and Algorithms](./../../../Concepts/Data-Structures_and_Algorithms/)

2. C#

   - [C# 10](./../C-Sharp.md)
   - .NET Core 6

3. [SQL](./../../SQL) Fundamentals

   - Fundamentals about database design and SQL Syntax
   - Stored Procedures
   - Constraints
   - Triggers

4. ASP.NET Core Basics

   - MVC
   - RESTful API
   - Routing
   - Minimal API
   - Razor Pages
   - Razor Components
   - Middlewares
   - Filters & Attributes
   - Application Settings & Configurations
   - Authentication & Authorization (Identity, IdentityServer, Auth0/OIDC, OWASP Top 10)

5. [SOLID Principals](../../../Concepts/Design_Patterns/README.md#solid-principles)

   - S: Single-responsiblity Principle (SRP)
   - O: Open-closed Principle (OCP)
   - L: Liskov Substitution Principle (LSP)
   - I: Interface Segregation Principle (ISP)
   - D: Dependency Inversion Principle (DIP)
   - DRY
   - KISS
   - YAGNI

6. ORM

   - [Entity Framework Core](./../Entity_Framework_Core.md)

     - Basic
     - Code First + Migrations
     - Lazy Loading, Eager Loading, Explicit Loading
     - TPT, TPH

   - Dapper

   - RepoDB
   - NHibernate

7. Dependency Injection

   - DI Containers

     - `Microsoft.Extensions.DependencyInjection`
     - AutoFac

     - Ninject
     - Castle Windsor
     - Simple Injector

   - Scrutor

   - Life Cycles

     - Scoped
     - Transient
     - Singleton

8. Caching

   - Memory Cache

   - Distributed Cache

     - Redis

       - StackExchange.Redis
       - EasyCaching

     - Memcached

   - Entity Framework 2nd Level Cache

9. [Databases](./../../SQL)

   - Relational

     - SQLite
     - PostgreSQL
     - MariaDB
     - SQL Server
     - MySQL

   - Cloud Databases

     - Azure CosmoDB
     - [Amazon DynamoDB](./../../../Concepts/AWS/AWS_DynamoDB.md)

   - Search Engines

     - ElasticSearch
     - Solr
     - Sphinx

   - NoSQL

     - Redis
     - MongoDB
     - LiteDB
     - Apache Cassandra
     - RavenDB
     - CouchDB

10. [Logging](./../Logging.md) Frameworks

    - Serilog
    - NLog

    - Log Management System

      - ELK Stack
      - Datadog
      - loggly.com
      - Sentry.io
      - elmah.io

11. Metrics

    - OpenTelemetry
    - Prometheus
    - Grafana
    - ELK Stack

12. Distributed Tracing

    - Datadoog
    - Lightstep
    - Jeager

13. API Clients & Communications

    - [REST](../../../Concepts/Web/RESTful_Web_Services.md)

      - OData
      - Sieve

    - gRPC

    - GraphQL

      - HotChocolate
      - GraphQL-dotnet

14. Real-Time Communication

    - SignalR Core
    - [Web Sockets](./../../../Concepts/Web/WebSocket.md)

15. Object Mapping

    - AutoMapper
    - Mapster
    - ExpressMapper
    - AgileMapper

16. Task Scheduling

    - Native BackgroundService
    - HangFire
    - Quartz
    - Coravel

17. [Testing](./../../../Concepts/Testing/)

    - [Unit Testing](./../../../Concepts/Testing/Unit_Testing.md)

      - Frameworks

        - xUnit
        - NUnit
        - MSTest

      - Mocking

        - Moq
        - NSubstitute
        - FakeItEasy

      - Assertion
        - FluentAssertions
        - Shouldly

    - Integration Testing

      - WebApplicationFactory
      - TestServer

    - Behaviour Testing

      - SpecFlow
      - BDDfy
      - LightBDD

    - E2E Testing

      - Selenium
      - Playwright
      - Puppeteer Sharp

18. API SDK Libraries

    - Refit
    - RestSharp

19. Micro-Services

    - Cloud Provider

      - [AWS](../../../Concepts/AWS/)
      - Azure
      - GCP

    - Serverless

      - [AWS Lambda](./../../../Concepts/AWS/AWS_Lambda.md)
      - Azure Functions

    - Message-Broker

      - RabbitMQ
      - Apache Kafka
      - ActiveMQ
      - [AWS SNS](./../../../Concepts/AWS/AWS_Integration_and_Messaging.md)
      - Azure Service Bus
      - NetMQ

    - Message-Bus

      - MassTransit
      - [AWS SQS](./../../../Concepts/AWS/AWS_Integration_and_Messaging.md)
      - NServiceBus
      - EasyNetQ
      - CAP

    - Event Streaming

      - Apache Kafka
      - [AWS Kinesis](./../../../Concepts/AWS/AWS_Integration_and_Messaging.md)
      - Azure Event Hubs

    - API Gateway

      - Ocelot
      - [AWS API Gateway](./../../../Concepts/AWS/AWS_API_Gateway.md)
      - Azure
      - GCP

    - Containerization

      - [Docker](./../../CI-CD/Docker/Docker.md)

    - Orchestration

      - Kubernetes
      - Docker Swarm

    - Reverse Proxy

      - YARP
      - Trefik

    - Other

      - Orleans
      - SteelToe
      - Dapr
      - Tye

20. CI/CD

    - GitHub Actions
    - Azure Pipelines
    - TeamCity
    - Octopus
    - Travis CI
    - Jenkins
    - Circle CI

21. [Design Patterns](../../../Concepts/Design_Patterns/)

    - CQRS
    - Decorator
    - Strategy
    - Builder
    - Singleton
    - Facade

22. Client-Side Libraries

    - Blazor

23. Template Engines

    - Razor
    - DotLiquid
    - Scriban
    - Fluid

24. Good to Know Libraries

    - Polly
    - MediatR
    - FluentValidation
    - Benchmark.NET
    - Swashbuckle
    - NodaTime
    - GenFU
