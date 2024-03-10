---
title: Entity Framework Core
description: Entity Framework uses EDM (Entity Data Model) for all database-related operations
---

# Entity Framework Core

Entity Framework uses EDM (Entity Data Model) for all database-related operations.

EF Database Context is a bridge between the Entity Classes (C# classes) and the database tables (SQL).

ORM (Object Relational Mapper):

- Allow the computer to generate database tables based on classes defined in the application
- Database is updated using migrations
- Entity Framework is Microsoft's ORM
- Simple for basic applications

Data Access Object (DAO) (Old way):

- Manually create tables
- Traditional method of database access
- Write your own SQL statements
- Database managers (DBA's) prefer DAOs
- Provides more visibility on finding problems

## Setup

- Few Packages are need to work with EF Core:

  - [DB Provider](#database-providers) Package: Specific to the DB that is being used:

    - `Microsoft.EntityFrameworkCore.SqlServer` if the DB is SQL Server
    - The other dependent packages are installed automatically such as `Relational`, `EntityFrameworkCore`

  - Type of DB: Relational, NoSQL, etc.

    - `Microsoft.EntityFrameworkCore.Relational` as SQL Server is RDBMS

  - `Microsoft.EntityFrameworkCore` package contains the EF Core functionality

- Create the [DbContext class](#dbcontext-class):

  ```csharp
  public class AppDbContext : DbContext
  {
      public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
      {
      }

      // Model (Entity)
      public DbSet<Book> Books { get; set; }
  }
  ```

- Register and configure the `DbContext` class with a DB provider to the DI system in the `Startup.cs` file:

  - `AddDbContextPool` has better performance than `AddDbContext`
  - Don't use `AddDbContextPool` if private properties are used

  ```csharp
  public void ConfigureServices(IServiceCollection services)
  {
      // In-memory
      services.AddDbContextPool<TodoContext>(opt => opt.UseInMemoryDatabase("TodoList"));

      // SQLite
      services.AddDbContextPool<AppDbContext>(options => options.UseSqlite($"Data Source={DbPath}"));

      // MySQL
      services.AddDbContextPool<AppDbContext>(options => options.UseMySQL(Configuration.GetConnectionString("DefaultConnectionString")));
  }
  ```

## DbContext Class

To use `DbContext` class in our application, create a class that derives from the `DbContext` class:

- Pass configuration information to the `DbContext` using `DbContextOptions` instance
- Think of it as the database

```csharp
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Model (Entity)
    public DbSet<Book> Books { get; set; }
}
```

- The `DbContext` class includes a `DbSet<TEntity` property for each entity in the model
- Think of it as the table in the database

- This `DbSet` property `Books` will be used to query and save instances of the Book class

  - The name of this `DbSet` property corresponds to the table name EF Core will create

  - The columns of this table will correspond to the properties of `Books` class

- The LINQ queries against the `DbSet<TEntity>` will be translated into queries against the underlying database

## Database Providers

EF Core wide verity of databases.

Sample list:

- SQLite: `Microsoft.EntityFrameworkCore.Sqlite`
- SQL Server
- MySQL
- Maria
- Oracle
- PostgreSQL

- In-memory: The In-Memory provider was not designed for use outside of **testing environments** and should never be used as such: `Microsoft.EntityFrameworkCore.InMemory`

## Repository Pattern

It is an abstraction of the data access layer, it hides the details of how exactly the data is saved or retrieved from the underlying data source (such as databases, flat files, web services, etc.)

- The details of how the data is stored and retrieved is in the respective repository

## Migrations

EF Core Migrations: Provides a way to incrementally update the database schema to keep in sync with the application's data model while preserving existing data in the database.

- In other words, Migration keeps the database schema and application model classes in sync

- Install `Microsoft.EntityFrameworkCore.Tools` for EF Core Migrations

- Add the connection string into `appsettings.json` file. For MySQL it is `Server=localhost;port=3306;user=;database=;password=`

- Run migration: `Add-Migration InitialDbMigration`

- It will create a class with the name provided during migration which inherits from `Migration`

- It will have methods such as `CreateTable` with the name provide in the connection string

- Update the database: `Update-Database`

1. Add a new migration:

   ```bash
   # Help command
   Get-Help about_EntityFrameworkCore

   # string can be anything meaningful
   # old way: Enable migrations
   Add-Migration "initialSetup"

   # using `dotnet` CLI
   dotnet ef migrations add "initialSetup"
   ```

   - The above command create a directory called "Migrations" at the root of the project
   - Inside this directory a new files are created:

     - `XXXXX_[name of migration].cs-`: The main migrations file. It contains the operations necessary to apply the migration (in `Up`) and to revert it (in `Down`).

     - `XXXXX_[name of migration].Designer.cs`: The migrations metadata file. Contains information used by EF.

     - `AppDbContextModelSnapshot.cs`: A snapshot of your current model. Used to determine what changed when adding the next migration.

2. Update the database to the last migration or to a specified migration.

   ```bash
   # using `dotnet` CLI
   dotnet ef database update

   # update database to the last migration
   Update-Database


   # update database to a specific migration
   Update-Database [migration name or migration id]


   # reverts all migrations
   Update-Database 0
   ```

### Remove-Migration

Removes the last migration (rolls back the code changes that were done for the migration):

```bash
Remove-Migration

# using `dotnet` CLI
dotnet ef migrations remove
```

- Removing migration that has already been applied to the database will throw error

- To undo the applied migrations use `Update-Database` command with the name of the migration previous to the one that needs to be reverted

- Then run `Remove-Migration` to remove the migration

## Data Seeding

Data seeding is the process of populating a database with an initial set of data.

There are several ways this can be accomplished in EF Core:

1. Model seed data:

   ```csharp
   protected override void OnModelCreating(ModelBuilder modelBuilder)
   {
       modelBuilder.Entity<Blog>().HasData(new Blog { BlogId = 1, Url = "http://sample.com" });
   }
   ```

   - Id needs to be provided

2. Manual migration customization:

   ```csharp
   protected override void OnModelCreating(ModelBuilder modelBuilder)
   {
       migrationBuilder.InsertData(
           table: "Blogs",
           columns: new[] { "Url" },
           values: new object[] { "http://generated.com" });
   }
   ```

3. Custom initialization logic:

   ```csharp
   using (var context = new DataSeedingContext())
   {
       context.Database.EnsureCreated();

       var testBlog = context.Blogs.FirstOrDefault(b => b.Url == "http://test.com");
       if (testBlog == null)
       {
           context.Blogs.Add(new Blog { Url = "http://test.com" });
       }

       context.SaveChanges();
   }
   ```

Perform migration and update database.

_Example:_ Create an extension class for data seeding, this keeps the `DbContext` class clean:

```csharp
public static class DataSeed(this ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>().HasData(
        new Blog { BlogId = 1, Url = "http://sample.com" },
        new Blog { BlogId = 2, Url = "https://example.io" }
        );
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    migrationBuilder.DataSeed();
}
```

## Cascading referential integrity constraint

- No Action (Update/Delete action cannot be performed prevented)
- Cascade
- Set NULL
- Set Default

On Update: default is No Action
On Delete: default is Cascade

## Model Class

Class properties can have [annotations](#annotations)

## Annotations

- Annotations as derived from `System.ComponentModel.DataAnnotations`
- Not all database related properties can be configured using annotations
- For more control use `OnModelCreating` method

  _Example:_

  ```csharp
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
     modelBuilder.Entity<Blog>().Property(b => b.Title).HasMaxLength(50).IsRequired();
  }

  // we can achive the same using annotations on the property `Title` in model class `Blog`
  [MaxLength(50)]
  [Required]
  public string Title { get; set; }
  ```

## Fluent API

Fluent API is an advanced way of specifying model configuration that covers everything that data annotations can do in addition to some more advanced configuration not possible with data annotations.

- Fluent API is another way to configure your domain classes.

If both Data annotations and Fluent API are use the precedence is:

- Fluent API > Data Annotations > Default Conventions

The Code First Fluent API is most commonly accessed by overriding the OnModelCreating method on your derived DbContext.

- Fluent API provides more functionality for configuration than DataAnnotations. Fluent API supports the following types of mappings.

## Data Transfer Object (DTO)

The contract enabled between the client and the service
