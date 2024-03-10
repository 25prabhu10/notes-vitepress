---
title: CQRS
description: Command and Query Responsibility Segregation (CQRS)
---

# CQRS

Command and Query Responsibility Segregation (CQRS): a pattern that separates read and update operations for a data store. Implementing CQRS in your application can maximize its performance, scalability, and security.

The flexibility created by migrating to CQRS allows a system to better evolve over time and prevents update commands from causing merge conflicts at the domain level.

- `MediatR` package
- Create a folder called `Queries`
- There add a class that gets item: Use `records`

```csharp
public static class GetTodoById {
  // Query / Command
  // All the data we need to execute
  public record Query(int Id): IRequest < Response > ;

  // Handler
  // All the business logic to execute. Returns a response
  public class Handler: IRequestHandler < Query, Response > {
    private readonly Repository _repository;

    public Handler(Repository, repository) {
      _repository = repository;
    }

    public async Task < Response > Handle(Query request, CancellationToken cancellationToken) {
      // All the business logic
      var todo = _repository.Todos.FirstOrDefault(x => x.Id == request.Id);

    }
  }

  // Response
  // The data we want to return
  public record Response(int Id, string Name, bool Completed);
}
```

References:

- [CQRS, Task Based UIs, Event Sourcing agh!](https://web.archive.org/web/20190211113420/http://codebetter.com/gregyoung/2010/02/16/cqrs-task-based-uis-event-sourcing-agh/)
- [Greg Young's Blog](https://web.archive.org/web/20160729165044/https://goodenoughsoftware.net/2012/03/02/cqrs/): CQRS

  - CQRS is not a silver bullet
  - CQRS is not a top level architecture
  - CQRS is not new
  - CQRS is not shiny
  - CQRS will not make your jump shot any better
  - CQRS is not intrinsically linked to DDD
  - CQRS is not Event Sourcing
  - CQRS does not require a message bus
  - CQRS is not a guiding principle / CQS is
  - CQRS is not a good wife
  - CQRS is learnable in 5 minutes

  - CQRS is a small tactical pattern

  - CQRS can open many doors.

  - And yes you can support [RFC 2549](https://datatracker.ietf.org/doc/html/rfc2549) using CQRS

Checkout this [YouTube channel](https://www.youtube.com/channel/UC3RKA4vunFAfrfxiJhPEplw/videos)

## Mediator

The Mediator design pattern defines an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently.

## Repository pattern, Generic Repository Pattern, and Unit of work pattern
