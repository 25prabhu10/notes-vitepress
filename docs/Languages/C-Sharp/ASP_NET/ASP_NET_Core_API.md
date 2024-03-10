---
title: ASP.NET Core API
description: Creating RESTful APIs using ASP.NET Core
---

# ASP.NET Core API

Create Web APIs using ASP.NET Core

## Minimal API

ASP.NET Core Minimal API is a low footprint and super mini sized project type helps to develop an API with less code

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

## Project

1. Create a web API project with Swagger support (ASP.NET Core 5+):

   ```bash
   dotnet new webapi -n [project name]
   ```

2. The above command scaffolds these files and folder (Check [Core Project Structure](./ASP_NET_Core.md#aspnet-core-project-structure.md)):

   - `Controller/`
   - `Properties/launchSettings.json`: Visual Studio will use the profiles defined here to run the project
   - `appsettings.json`: Application configuration file, it store details such as database connection strings, API keys, etc.
   - `[project name].csproj`: Defines how the project will be built
   - `Program.cs`: Entry point of the .NET Core applications. Host configuration.
   - `Startup.cs`: Configures services and application request pipelines (middle-ware)

     - `public IConfiguration Configuration { get; }`: Read configuration settings from multiple sources like `appsettings.json`, Environment variables, files...

3. Trust the development certificate provided by dotnet:

   ```bash
   dotnet dev-certs https --trust
   ```

4. Build and run the project.

   ```bash
   dotnet run
   ```

5. Open Swagger page: `https://localhost:5001/swagger`

## Routing

**Attribute routing** is preferred with REST APIs.

Configure routing in your API application:

```csharp
 public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
 {
     // Matches request to an endpoint.
     app.UseRouting();

     // Execute the matched endpoint.
     app.UseEndpoints(endpoints =>
     {

         // Adds endpoints for controller actions to the `IEndpointRouteBuilder` without specifying any routes.
         endpoints.MapControllers();
     });
 }
```

- Middlewares that depend on endpoint resolution such as `app.UseAuthentication()`, `app.UseAuthorization()`, etc. must be placed between `UseRouting` and `UseEndpoints`

Register routing service:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddRouting(options =>
        {
            // Set all generated paths URLs to lowercase
            options.LowercaseUrls = true;
        });
}
```

## Controllers

A controller based web API consists of one or more controller classes that derive from `ControllerBase`.

- `ControllerBase` is lightweight and dose not have support for views.

_Example:_

```csharp
[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
    // POST: api/WeatherForecast/pets
    [HttpPost("pets", Name = nameof(Create))]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Pet>> AddPetsAsync([Frombody] Pet pet)
    {
        pet.Id = _petsInMemoryStore.Any() ?
                 _petsInMemoryStore.Max(p => p.Id) + 1 : 1;

        await _petsInMemoryStore.AddAsync(pet);

        return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
    }
}
```

Register the Controller service:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers(options =>
    {
        // Register filters here
        options.Filters.Add<JsonExceptionFilter>();

        // Use this if suffix "Async" should not be trimmed off of action names
        // "public async IActionResult ListAsync()" will be matched
        // with "List" not "ListAsync"
        options.SuppressAsyncSuffixInActionNames = false;
    });
}
```

### ApiController Attribute

ApiController attribute: The `[ApiController]` attribute can be applied to a controller class to enable the following opinionated, API-specific behaviours:

- Attribute routing is a requirement: `[Route("[controller]")]`
- Automatic HTTP 400 responses: makes model validation errors automatically trigger an HTTP 400 response
- Binding source parameter inference
- Multipart/form-data request inference
- Problem details for error status codes

Some useful attributes:

- `[Route]`: Specifies URL pattern for a controller or action.
- `[Bind]`: Specifies prefix and properties to include for model binding.
- `[HttpGet]`: Identifies an action that supports the HTTP GET action verb.
- `[Consumes]`: Specifies data types that an action accepts.
- `[Produces]`: Specifies data types that an action returns.

### Binding Source Parameter Inference

A binding source attribute defines **the location at which an action parameter's value is found**.

The following binding source attributes exist:

| Attribute        | Binding source                                      |
| ---------------- | --------------------------------------------------- |
| `[FromBody]`     | Request body                                        |
| `[FromForm]`     | Form data in the request body                       |
| `[FromHeader]`   | Request header                                      |
| `[FromQuery]`    | Request query string parameter                      |
| `[FromRoute]`    | Route data from the current request                 |
| `[FromServices]` | The request service injected as an action parameter |

```csharp
[HttpGet]
public ActionResult<List<Product>> Get([FromQuery] bool discontinuedOnly = false)
```

- The [ApiController] attribute applies inference rules for the default data sources of action parameters.

- These rules save you from having to identify binding sources manually by applying attributes to the action parameters.

### Control API Behaviour

- The default inference rules can be disabled by setting `SuppressInferBindingSourcesForParameters` to `true`

_Example:_

```csharp
services.AddControllers()
    .ConfigureApibehaviourOptions(options =>
    {
        // Disable multipart/form-data request inference when [FromForm] is used
        options.SuppressConsumesConstraintForFormFileParameters = true;

        // Disable default inference rules
        options.SuppressInferBindingSourcesForParameters = true;

        // Disable automatic 400 response
        options.SuppressModelStateInvalidFilter = true;

        // Disable ProblemDetails response
        options.SuppressMapClientErrors = true;
    });
```

### Return Types

1. Specific Type: Return the data with no HttpStatus code
2. `IActionResult`: Return data with HttpStatus code
3. `ActionResult<T>`: Implements IActionResult and extends the return type

   - No need to use `Type` property of `[ProducesResponseType]`: `[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Product))]`

```csharp
public ActionResult<Product> GetById(int id)
```

### Base Controller Class

A custom base controller class can be created, which will be annotated with attributes that will be used on most of the controllers defined in the application such as `[ApiController]`

```csharp
[ApiController]
public class MyControllerBase : ControllerBase
{
}

// Derived Controller
[Produces(MediaTypeNames.Application.Json)]
[Route("[controller]")]
public class PetsController : MyControllerBase
```

## Exception Handling

An exception filter that catches any unhandled exceptions and send the error message back to the client as a nicely formatted JSON response

- Create a class to model exception response
- Create a filter: Filter runs before or after ASP.NET Core processes a request

## Resources

[RESTful APIs](./../../../Concepts/Web/RESTful_Web_Services.md) are all about returning and manipulating resources.

- We can use a base class for all the resource models we'll need to return from the API.

### Entities / Domains / Models

A _model_ is a set of classes that represent the data that the app manages.

Create `record` Types instead of `class` as they provide more features like:

- Use for immutable objects
- With-expressions support
- Value-based equality support

Using `init` instead of `set` or `private set`:

```csharp
// You can do this
Item item = new()
{
    Id = Guid.NewGuid()
};

// But not this
item.Id = Guid.NewGuid();
```

Example folder structures:

- `Data/Models/[modelClasses].cs`

Entity Framework lets us use simple classes to represent database entities.

- These are sometimes called POCOs (Plain Old CLR Objects)

## Asynchronous

Asynchronous all the way.

## Database

Working with Database using:

- [Entity Framework Core](./../Entity_Framework_Core.md)
- Dapper

### Authentication And Authorization

- Implemented using the ASP.NET Core Identity packages.

- ASP.NET Core Identity contains reusable code for dealing with accounts, passwords, and other authentication concerns.

- Use `OpenIddict` for OpenId implementation

## API Security

Checkout [Application Security](./../../../Concepts/Application_Security/).

1. Transport security: Add security settings to Reverse Proxies as well

   - Turn oh HTTPS (enabled by default)
   - Reject HTTP, by using HTTP Strict Transport Security (HSTS):

     - Useful for browsers, but an edge case for API projects
     - Do not use `[RequireHttpsAttribute]` in API projects
     - Don't redirect `app.UseHttpsRedirection()`, instead APIs should either:

       - Not listen on HTTP
       - Close the connection with status code 400 (Bad Request) and not serve the request

2. Application security

### Cross-Origin Resource Sharing (CORS)

Dose your API need CORS?

- Accessed by browsers

Server can whitelist certain origins, HTTP methods, headers, and other element of the request.

- Add CORS middleware:

  ```csharp
  var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

  // Create CORS policy
  services.AddCors(options =>
  {
      options.AddPolicy(name: MyAllowSpecificOrigins, builder => builder.WithOrigins("https://example.com"));

      // can be used in development
      // .AllowAnyOrigin()

      // More refined control
      // WithOrigins("https://25prabhu10.github.io", "https://example.com").WithMethods("POST");
  });


  app.UseRouting();

  // Add CORS middleware
  app.UseCors(MyAllowSpecificOrigins);
  ```

## Health Check

Health Checks allow us to determine the overall health and availability of our application infrastructure

Application exposes HTTP endpoints which can be configured to provide information:

- Response time
- Memory usage

ASP.NET provides 3 different health check levels:

- **Healthy**: Application is healthy and in a normal, working state.

- **Unhealthy**: Application is unhealthy and is offline or an unhandled exception was thrown while executing the check.

- **Degraded**: Application is still running, but not responding within an expected timeframe.

Types of Health Checks:

- **Basic health probes** are the simplest form of health checking. They are configured as a URL endpoint, which will respond with a health response. These basic checks allow us to very quickly determine if our application is healthy or not.

- **System** health checks give us a plethora of information, such as disk storage and memory usage of the underlying host our application is running on.

- **Database** probes can determine whether our database provider is online and whether our application can successfully talk to it.

- **Custom** health checks can range from anything such as checking a 3rd party service or API our application relies on, to checking our logging storage is not near capacity. These are more general and would require custom code to be written to execute the checks.

_Example:_

```csharp
// Health checks can be chained
services.AddHealthChecks()
        .AddCheck<ExampleHealthCheck>("example_health_check")
        .AddSqlServer(Configuration["ConnectionStrings:DefaultConnection"]);


app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHealthChecks("/health")
             .RequireHost("www.contoso.com:5001")
             .RequireAuthorization();
});
```

- To check health hit route: `/health`

- To make health check depend on the health of dependents (databases) use the appropriate Nuget package, for mongodb:

  ```bash
  dotnet add package AspNetCore.HealthChecks.MongoDb
  ```

Create custom health checks:

```csharp
// Create a new health check service
public class ExampleHealthCheck: IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context,
        CancellationToken cancellationToken = default(CancellationToken))
    {
        var healthCheckResultHealthy = true;

        if (healthCheckResultHealthy)
        {
            return Task.FromResult(
                HealthCheckResult.Healthy("A healthy result."));
        }

        return Task.FromResult(
            new HealthCheckResult(context.Registration.FailureStatus,
            "An unhealthy result."));
    }
}

// Register the health check service
services.AddHealthChecks()
        .AddCheck<ExampleHealthCheck>("example_health_check");
```

ASP.NET provides health check UI dashboard through the nuget package `AspNetCore.HealthChecks.UI`:

_Example:_

```json
// Configuration
{
  "HealthChecks-UI": {
    "HealthChecks": [
      {
        "Name": "Ordering HTTP Check",
        "Uri": "http://host.docker.internal:5102/hc"
      },
      {
        "Name": "Ordering HTTP Background Check",
        "Uri": "http://host.docker.internal:5111/hc"
      }
      //...
    ]
  }
}
```

```csharp
// Startup.cs from WebStatus(Watch Dog) service
//
public void ConfigureServices(IServiceCollection services)
{
    //…
    // Registers required services for health checks
    services.AddHealthChecksUI();
}
//…
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    //…
    app.UseHealthChecksUI(config => config.UIPath = "/hc-ui");
    //…
}
```

## Secrets Management

- [.Net Secrets Manger](./ASP_NET_Core.md#secret-manager)

## API Versioning

APIs need to be versioned if breaking changes need to be implemented

- Create directories/namespaces like `v1`, `v2` and add the controllers inside them

- Use `Microsoft.AspNetCore.Mvc.Versioning` package: `services.AddApiVersioning()`

Approaches to Restful Versioning:

1. Don't version (clients should be dynamic)

2. Content/Media type (header) versioning: Content negotiation process that already exists in HTTP. When clients request a media type using the Accept header they can explicitly include a version number or string in the media type itself.

   ```http
   GET api/test HTTP/1.1
   host: localhost

   Accept: application/ion+json;v=2.0
   content-type: text/plain;v=1.0
   ```

   ```csharp
   services.AddApiVersioning(options =>
   {
       options.DefaultApiVersion = new ApiVersion(1, 0);

       options.AssumeDefaultVersionWhenUnspecified = true;

       options.ApiVersionReader = new MediaTypeApiVersionReader();

       // Send API version info in response
       // api-supported-versions 1.0
       options.ReportApiVersions = true;

       // Select most recent API version if there is no version defined as a part of the content-type media type
       options.ApiVersionSelector = new CurrentImplementationApiVersionSelector(options);
   });
   ```

3. URL prefix (path) versioning:

   - `/api/v1/test`, `/api/v2/test`
   - Least restful
   - But more explicit to the clients

   ```csharp
   [ApiVersion("1.0")]
   [ApiController]
   [Route("api/v{version:apiversion}/[controller]")]
   public class TestController : ControllerBase
   ```

4. Query String:

   - `/api/test?api-version=1.0`, `/api/test?api-version=2.0`

   ```csharp
   [ApiVersion("1.0")]
   [ApiController]
   [Route("api/[controller]")]
   public class TestController : ControllerBase
   ```

   - Set default version:

   ```csharp
   services.AddApiVersioning(config =>
   {
       config.DefaultApiVersion = new ApiVersion(1, 0);

       config.AssumeDefaultVersionWhenUnspecified = true;
   });
   ```

5. HTTP Header:

   ```http
   GET api/test HTTP/1.1
   host: localhost

   custom-version-header: 1.0
   ```

   ```csharp
   services.AddApiVersioning(config =>
   {
       config.DefaultApiVersion = new ApiVersion(1, 0);

       config.AssumeDefaultVersionWhenUnspecified = true;

       config.ApiVersionReader = new HeaderApiVersionReader("custom-version-header");
   });
   ```

## API Tools

- Postman
- Swagger

Swagger setup with Swashbuckle and NSwag:

- Add middleware
- Add API details
- Add XML documentation

```csharp
services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "London API",
        Version = "v1",
        Description = "A simple example ASP.NET Core Web API",
        TermsOfService = new Uri("https://example.com/terms"),
        Contact = new OpenApiContact
        {
            Name = "Shayne Boyer",
            Email = string.Empty,
            Url = new Uri("https://twitter.com/spboyer"),
        },
        License = new OpenApiLicense
        {
            Name = "Use under LICX",
            Url = new Uri("https://example.com/license"),
        }

    });

    // Set the comments path for the Swagger JSON and UI.
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

// Add Middleware
if (env.IsDevelopment())
{
    // Enable middleware to serve generated Swagger as a JSON endpoint.
    app.UseSwagger();

    // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.)
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "London API v1"));
}


// In controller/actions add doc string/comments

/// <summary>
/// Get response
/// </summary>
/// <returns>A String</returns>
/// <response code="200">Returns a string</response>
[HttpGet()]
public IActionResult GetRoot()
```

## Caching Response

1. Client-side caching:

   - ASP.NET Core uses the `ResponseCache` attribute to indicate that a particular response is cacheable.

     ```csharp
     public class RootController : ControllerBase
     {
         [HttpGet(Name = nameof(GetRoot))]
         [ResposeCache(Duration = 86400)]
         public IActionResult GetRoot()
         {
             return Ok("Hello, World!");
         }
     }
     ```

   - Response will include `Cache-Control` header: `Cache-Control: public,max-age=86400`

   - Using cache profiles we can reuse the cache settings in many places:

     ```csharp
     services.AddMvc(options =>
         {
             options.CacheProfiles.Add("Static", new CacheProfile
             {
                 Duration = 86400
             });
         });


     // Add that profile to endpoints

     [HttpGet(Name = nameof(GetRoot))]
     [ResposeCache(CacheProfilename = "Static")]
     public IActionResult GetRoot()
     {
         return Ok("Hello, World!");
     }
     ```

   - ASP.NET Core doesn't handle the `ETag` header by default

2. Server-side caching:

   - Add middleware: `services.AddResponseCaching()` and `app.UseResponseCaching()`
   - Add the Response cache attribute to the endpoints:

     ```csharp
     [HttpGet(Name = nameof(GetRoot))]
     [ResposeCache(Duration = 86400, VeryByQeryKeys = new[] { "offset", "limit", "orderBy", "search" })]
     public IActionResult GetRoot()
     {
         return Ok("Hello, World!");
     }
     ```

### In-Memory Caching

```csharp
services.AddMemoryCache();
```

- Add `Microsoft.Extensions.Caching.Memory` package

```csharp
// Use DI to inject the memoryCache into services that need it

public SampleDataAccess(IMemoryCache memoryCache)
{
  _memoryCache = memoryCache;
}

public async Task<List<EmployeeModel>> GetEmployeesCache()
{
  List<EmployeeModel> output;

  output = _memoryCache.Get<List<EmployeeModel>>("employees");

  if (output is null)
  {
    // Call DB
    output.Add(new EmployeeModel {...});

    // Add the response to cache
    _memoryCache.Set("employees", output, TimeSpan.FromMinutes(1));
  }

  return output;
}
```

## Docker

```bash
docker run -d --rm --name mongo -p 27017:27017 -v mongodbdata:/data/db mongo
```

Enable username and password:

```bash
docker run -d --rm --name mongo -p 27017:27017 -v mongodbdata:/data/db -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=Pass#word1 mongo
```
