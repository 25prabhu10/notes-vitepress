---
title: ASP.NET Core
description: ASP.NET Core is a free and open-source web framework.
---

# ASP.NET Core

ASP.NET Core (Active Server Pages) was released in 2016. It's not tied to windows assemblies like `System.Web`, [IIS](./IIS.md) and Windows.

- Open Source
- Cross-platform

> .NET: Document (Data) Object Type (Technologies) Network Enabled Technologies

Old ASP.NET Framework:

- ASP.NET Webform (state-full)
- [ASP.NET MVC 5](./ASP_NET_Core_MVC.md)
- ASP.NET API 2.2

**Why .NET Core?**

- Previously too many vertical frameworks: Desktop/Phone/Silverlight/ASP.NET/Web API
- Unify and simply them

**Components of Core:**

1. .NET Core
2. ASP.NET Core
3. [Entity Framework Core](./../Entity_Framework_Core.md)

## Telemetry

Telemetry is on by default.

- Set `$Env:DOTNET_CLI_TELEMETRY_OPTOUT = 1` to opt out

## ASP.NET Core Project Structure

1. `[project name].csproj`: The Project configuration file, will contain the Target Framework, Nuget package details and other project related settings. This file is used by MSbuild during the build process. For more details visit [project-file](https://docs.microsoft.com/en-us/aspnet/web-forms/overview/deployment/web-deployment-in-the-enterprise/understanding-the-project-file).

   - Defines how the project will be built

   - `TargetFramework`: Specifies the target framework for the application.

     - To specify a target framework we use _Target Framework Moniker_ (TFM).
     - E.g. `netcoreapp3.1`

   - `AspNetCoreHostingModel`: Specifies how the application should be hosted

     - `InProcess` or `OutOfProcess`

   - `PackageReference`: Used to include a reference to the NuGet package that is installed for the application

     - Metapackage - `Microsoft.AspNetCore.App`
     - A metagpackage has no content of its own
     - It just contains a list of dependencies (other packages)
     - When the version is not specified, an implicit version is specified by the SDK
     - Rely on the implicit version rather than explicitly setting the version number on the package reference

2. `Properties/launchSettings.json`: Which will contain the details for starting the project during development or production environment.

   - You can create different profiles based on the requirement.
   - Visual Studio will use the profiles defined here to run the project

3. `appsettings.json`: Application configuration file, it store details such as database connection strings, API keys, etc.

   - All the application's settings are contained in this file. (Restart VS after making changes to this file)
   - Different environment specific settings can be used, by creating files in the below mentioned format
   - `appsettings.[environment].json`
   - `appsettings.Development.json`

4. `Program.cs`: Entry point of the .NET Core applications. Host configuration.

5. `Startup.cs`: Configures services and application request pipelines (middlewares)

   - **`Program.cs` and `Startup.cs` files are combined into `Program.cs` file from ASP.NET Core 6+**

   - `public IConfiguration Configuration { get; }`: Read configuration settings from multiple sources like `appsettings.json`, Environment variables, files...

### HTTP Request Flow

1. When the browser makes a request, it first arrives at a web server like **[IIS](./IIS.md)**
2. _IIS_ will invoke the Dot.NET runtime which will load the CLR.
3. Now the request looks for an entry point, i.e. `main` function present in the `Program.cs` file and execute it.
4. This will start the internal web server in the application.
5. The `main` and `startup` class will configure the application.
6. The request will be routed form _IIS_ to _[Kestrel](./Deployment.md#kestrel)_.
7. Now the request is pushed to the application.
8. The request will be processed by all the middleware.
9. The generated response will be routed back to _Kestrel_ that will again pass it to _IIS_, which will produce the response on the browser.

### `Program.cs` File

The application always starts execution from the `static Main` function present in `Program.cs` file

Program is concerned with infrastructure configuration that will typically remain stable throughout the lifetime of the project, such as:

- Application Settings: Loads configuration settings (such as `appsettings.json`) at runtime such as connection strings, usernames and passwords

- Logging
- HTTP Server (Kestrel)
- Content Root
- IIS Integration

The `WebHost.CreateDefaultBuilder()` (Core 2.x), `Host.CreateDefaultBuilder()` (Core 3.x - 5.x), and `WebApplication.CreateBuilder()` (Core 6+) method performs various tasks:

- Setting up the web server
- Loading the host and application configuration from various configuration sources
- Configuring logging
- Web builder configurations are done in `Startup.cs` file (before ASP.NET Core 6+)

_Example:_

```csharp
// ASP.NET Core 2.x
public class Program
{
    public static void Main(string[] args)
    {
        BuildWebHost(args).Run();
    }

    public static IWebHost BuildWebHost(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>()
            .Build();
}

// ASP.NET Core 3.x - 5.x
public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}

// ASP.NET Core 6+
// Single file, no need of `Startup.cs` file
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseStaticFiles();

app.MapGet("/", () => "Hello World!");
app.MapRazorPages();

app.Run();
```

An ASP.NET Core application can be hosted:

- `InProcess`:

  - `CreateDefaultBuilder()` method calls `UseIIS()` method and hosts the app inside of the IIS worker process (`w3wp.exe`) or IIS Express (`iisexpress.exe`)
  - `InProcess` hosting delivers significantly higher request throughput that `OutOfProcess` hosing

- Out-Of-Process:

  - Two ways of hosting:

    - Kestrel as the server
    - Reverse proxy + Kestrel

  - `OutOfProcess` hosting model forward we requests to a backend ASP.NET Core app running the Kestrel Server

### `Startup.cs` File

Startup file (**not needed from ASP.NET Core 6+**) is used to configure the majority of your application's custom behaviour, such as:

- Dependency Injection: To correctly create classes at runtime, dependencies are registered with a container
- Middleware Pipeline
- Endpoint Configuration

Methods present in the file:

- `ConfigureServices`: Add and configure services, like entity framework, etc..
- `Configure`: Add and configure middle-ware to the pipe line.

### Application Configurations

- Use the inbuilt ASP.NET Core's configuration library to create a configuration object

  ```csharp
  private readonly IConfiguration Configuration;

  public Startup(IConfiguration configuration)
  {
      Configuration = configuration;
  }
  ```

- Configurations are saved in the `appsettings.json` file. Custom configurations can be added as key-value pairs:

  ```json
  {
    "Logging": {
      "LogLevel": {
        "Default": "Information",
        "Microsoft": "Warning",
        "Microsoft.Hosting.Lifetime": "Information"
      }
    },
    "AllowedHosts": "*",
    "CustomConfigKey": false,
    "NestedKey": {
      "SomeKey": true
    }
  }
  ```

- Access the configuration value, same as accessing an objects key-value:

  ```csharp
  Configuration["CustomConfigKey"]

  // Access nested configs : (colon) is used instead of a . (dot)
  Configuration["NestedKey:SomeKey"]
  ```

- If the custom configuration key is not defined, then it will return null value

- Value in the right format:

  ```csharp
  Configuration.GetValue<bool>("CustomConfigKey")
  ```

Configuration management:

- `appsettings.json`: Will contain default values
- `appsettings.Development.json`: Will contain configurations related to development environment
- `appsettings.Production.json`: Will contain configurations related to production environment

## Dependency Injection

ASP.NET Core supports the [Dependency Injection](../../../Concepts/Design_Patterns/Design_Patterns.md) (DI) software design pattern, which is a technique for achieving _Inversion of Control_ (IoC) between classes and their dependencies.

- Dependency injection, a development pattern which encourages loose coupling between components.

Services are typically registered in the app's Startup.ConfigureServices method.

- The `Startup.ConfigureServices` method accepts one parameter an instance of the `IServiceCollection` named `services`. This object exposes a handful of helpful methods that allow you to configure your dependency injection logic:

  1. `AddScoped`: We get the same instance within the scope of a given HTTP request but a new instance across different HTTP requests

  2. `AddSingleton`: Single instance is created and used for the entire applications lifetime

  3. `AddTransient`: Shortest. A new instance is provided every time an instance is requested whether it is the scope of the same HTTP request or across different HTTP requests

- _Injection_ of the service into the constructor of the class where it's used. The framework takes on the responsibility of creating an instance of the dependency and disposing of it when it's no longer needed.

- The collective set of dependencies that must be resolved is typically referred to as a dependency tree, dependency graph, or object graph.

## Middleware in ASP.NET Core

Middleware is software that's assembled into an app pipeline to handle requests and responses. Each component:

- Chooses whether to pass the request to the next component in the pipeline.

- Can perform work before and after the next component in the pipeline.

When the browser sends a request to the server, the request is attached to a context object:

- This object is passed to the first pipe which process the request and determines if a response is needed, if not the context is passed along to the next pipe.
- This process continues till a response is given back to the browser.

- If the middleware doesn't pass along the request, it's called short-circuiting the request pipeline.
- Short-circuiting is often desirable because it avoids unnecessary work.
- When a middleware short-circuits, it's called a terminal middleware because it prevents further middleware from processing the request.

### Request Delegates

- Request delegates are used to build the request pipeline. The request delegates handle each HTTP request.

- Request delegates are configured using `Run`, `Map`, and `Use` extension methods.

Registering middleware:

1. `app.Run(IApplicationBuilder, RequestDelegate)`:

   - Adds a _terminal middleware_ delegate as it prevents further middleware from processing the request.
   - Will never call subsequent middleware
   - `Run` delegates don't receive a `next` parameter.

   ```csharp
   app.Run(async context =>
   {
       await context.Response.WriteAsync("Hello world!");
   });
   ```

2. `app.Use`: If you want to pass the request to the next delegate use `app.Use` instead of `app.Run`.

   - The `next` parameter represents the next delegate in the pipeline.
   - You can _short-circuit_ the pipeline by not calling the `next` parameter.
   - You can typically perform actions both before and after the `next` delegate

   ```csharp
   app.Use(async (context, next) =>
   {
       // Do work that doesn't write to the Response.
       await next.Invoke();
       // Do logging or other work that doesn't write to the Response.
   });
   ```

3. `app.Map`: extensions are used as a convention for branching the pipeline.

   - `Map` branches the request pipeline based on matches of the given request path.
   - If the request path starts with the given path, the branch is executed.

   ```csharp
   app.Map("/map1", HandleMapTest1);

   app.Map("/map2", HandleMapTest2);

   app.Run(async context =>
   {
       await context.Response.WriteAsync("Hello from non-Map delegate. <p>");
   });

   app.Run();

   static void HandleMapTest1(IApplicationBuilder app)
   {
       app.Run(async context =>
       {
           await context.Response.WriteAsync("Map Test 1");
       });
   }

   static void HandleMapTest2(IApplicationBuilder app)
   {
       app.Run(async context =>
       {
           await context.Response.WriteAsync("Map Test 2");
       });
   }
   ```

### Middleware Order

- Middlewares are executed on the order they are added

- The order in which the middleware are registered matter

_Example:_ ASP.NET Core MVC and Razor Pages apps request processing pipeline:

![middleware pipeline](./middleware-pipeline.svg)

_Example:_

```csharp
// Middleware that is not added when creating a new web app with individual users accounts is commented out.
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseDatabaseErrorPage();
    }
    else
    {
        app.UseExceptionHandler("/Error");

        // Adds the "Strict-Transport-Security" header
        app.UseHsts();
    }

    // Redirects HTTP requests to HTTPS
    app.UseHttpsRedirection();

    // Returns static files and short-circuits further request processing
    app.UseStaticFiles();

    // Conforms the app to the EU General Data Protection Regulation (GDPR) regulations.
    // app.UseCookiePolicy();

    app.UseRouting();
    // app.UseRequestLocalization();
    // app.UseCors();

    // Attempts to authenticate the user before they're allowed access to secure resources
    app.UseAuthentication();

    // Authorizes a user to access secure resources
    app.UseAuthorization();

    // Establishes and maintains session state. If the app uses session state, call Session Middleware after Cookie Policy Middleware and before MVC Middleware
    // app.UseSession();
    // app.UseResponseCompression();
    // app.UseResponseCaching();

    // Add Razor Pages endpoints to the request pipeline
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapRazorPages();
        endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

Recommendations regarding order:

- `UseCors`, `UseAuthentication`, and `UseAuthorization` must appear in the order shown.

- `UseCors` currently must appear before `UseResponseCaching` due to a bug.

- `UseRequestLocalization` must appear before any middleware that might check the request culture (for example, `app.UseMvcWithDefaultRoute()`).

## Routing

Routing is responsible for matching incoming HTTP requests and dispatching those requests to the app's executable endpoints.

- Endpoints are the app's units of executable request-handling code.
- Endpoints are defined in the app and configured when the app starts.
- The endpoint matching process can extract values from the request's URL and provide those values for request processing.
- Using endpoint information from the app, routing is also able to generate URLs that map to endpoints.

ASP.NET Core controllers use the Routing middleware to match the URLs of incoming requests and map them to actions.

Routing uses a pair of middlewares:

1. `UseRouting`: Matches request to an endpoint.

2. `UseEndpoints`: Execute the matched endpoint.

::: tip NOTE
In Core 6.0, the `WebApplicationBuilder` implicitly calls `UseRouting` and `UseEndpoints`.

- Apps can change the order in which `UseRouting` and `UseEndpoints` run by calling these explicitly

:::

Route templates:

- Are defined in startup code or attributes.
- Describe how URL paths are matched to actions.
- Are used to generate URLs for links. The generated links are typically returned in responses.

Types of Routing:

1. Conventional routing: typically used with controllers and views.

   - Routing Configuration:

     ```csharp
     app.UseEndpoints(endpoints =>
     {
         endpoints.MapControllerRoute(
             name: "default",
             pattern: "{controller=Home}/{action=Index}/{id?}");
     });
     ```

   - The single route is named `default` route
   - The route template `"{controller=Home}/{action=Index}/{id?}"`:
     - Matches a URL path like `/Products/Details/5`
     - `Home` is default controller
     - `Index` is default action
     - `?` defines `id` as optional

2. Attribute routing: **preferred with REST APIs**

   - Placing a route on the controller or action makes it attribute-routed.

     ```csharp
     public void ConfigureServices(IServiceCollection services)
     {
         services.AddControllers();
     }

     public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
     {
         app.UseRouting();

         app.UseEndpoints(endpoints =>
         {
             endpoints.MapControllers();
         });
     }
     ```

   - The `HomeController.Index` action is run for any of the URL paths `/`, `/Home`, `/Home/Index`, or `/Home/Index/3`:

     ```csharp
     public class HomeController : ControllerBase // Controller
     {
         [Route("")]
         [Route("Home")]
         [Route("Home/Index")]
         [Route("Home/Index/{id?}")]
         public IActionResult Index(int? id)
         {
             return ControllerContext.MyDisplayRouteInfo(id);
         }

         [Route("Home/About")]
         [Route("Home/About/{id?}")]
         public IActionResult About(int? id)
         {
             return ControllerContext.MyDisplayRouteInfo(id);
         }
     }
     ```

   - Using token replacement. The tokens `[action]`, `[area]`, and `[controller]` are replaced with the values of the action name, area name, and controller name from the action where the route is defined:

     ```csharp
     public class HomeController : Controller
     {
         [Route("")]
         [Route("Home")]
         [Route("[controller]/[action]")]
         public IActionResult Index()
         {
             return ControllerContext.MyDisplayRouteInfo();
         }

         [Route("[controller]/[action]")]
         public IActionResult About()
         {
             return ControllerContext.MyDisplayRouteInfo();
         }
     }

     [Route("[controller]/[action]")]
     public class HomeController : Controller
     {
         [Route("~/")]
         [Route("/Home")]
         [Route("~/Home/Index")]
         public IActionResult Index()
         {
             return ControllerContext.MyDisplayRouteInfo();
         }

         public IActionResult About()
         {
             return ControllerContext.MyDisplayRouteInfo();
         }
     }
     ```

Reserved routing names:

- `action`
- `area`
- `controller`
- `handler`
- `page`

HTTP verb templates:

- `[HttpGet]`
- `[HttpPost]`
- `[HttpPut]`
- `[HttpDelete]`
- `[HttpHead]`
- `[HttpPatch]`

Route templates:

- All the HTTP verb templates are route templates.
- `[Route]`

_Example:_

```csharp
[Route("api/[controller]")]
[ApiController]
public class Test2Controller : ControllerBase
{
    [HttpGet]   // GET /api/test2
    public IActionResult ListProducts()
    {
        return ControllerContext.MyDisplayRouteInfo();
    }

    [HttpGet("{id}")]   // GET /api/test2/xyz
    public IActionResult GetProduct(string id)
    {
       return ControllerContext.MyDisplayRouteInfo(id);
    }

    [HttpGet("int/{id:int}")] // GET /api/test2/int/3
    public IActionResult GetIntProduct(int id)
    {
        // Returns "404 Not Found" if non-numeric value is passed
        return ControllerContext.MyDisplayRouteInfo(id);
    }

    [HttpGet("int2/{id}")]  // GET /api/test2/int2/3
    public IActionResult GetInt2Product(int id)
    {
        // Returns "400 Bad Request" if non-numeric value is passed
        return ControllerContext.MyDisplayRouteInfo(id);
    }
}
```

Route name: can be used to generate a URL based on a specific route. Route names:

- Have no impact on the URL matching behaviour of routing.
- Are only used for URL generation.
- Route names must be unique application-wide

```csharp
[HttpGet("/products2/{id}", Name = "Products_List")]

// or using `nameof()`

[HttpGet("/products2/{id}", Name = nameof(GetProduct))]
public IActionResult GetProduct(int id)
{
    return ControllerContext.MyDisplayRouteInfo(id);
}
```

## Authentication

Authentication is identifying who the user is

ASP.NET Core Identity:

- Is an API that supports user interface (UI) login functionality.

- Manages users, passwords, profile data, roles, claims, tokens, email confirmation, and more.

Steps to add Identity to the application:

1. Inherit from `IdentityDbContext` class instead of `DbContext`, as this class provides all the `DbSet` properties needed to manage the identity tables in the underlying data store

   ```csharp
   public class AppDbContext : IdentityDbContext<IdentityUser>
   {
       public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
       {
       }
   }
   ```

2. Add ASP.NET Core Identity services to the application:

   ```csharp
   // IdentityUser and IdentityRole are built-in class
   // Here EntityFramework is used to handle the database

   services.AddIdentity<IdentityUser, IdentityRole>()
           .AddEntityFrameworkStores<AppDbContext>();
   ```

   - The built-in classes have limited properties, if we need to store more information about the user:

     - Create a class that inherits from `IdentityUser` and extends it with new properties
     - Then replace `IdentityUser` with the new class in the `AddIdentity` service

3. Add the `UseAuthentication()` middleware:

4. Create migration and update database, so that the required Identity tables are created

5. Add the `[Authorize]` attribute to the controller or the actions that needs authentication

6. Add the `[AllowAnonymous]` attribute to allow unauthenticated users

::: tip NOTE

- If `[Authorize]` on the controller and `[AllowAnonymous]` on the action works

- If `[AllowAnonymous]` on the controller and `[Authorize]` on the action will not work. That action can be accessed by unauthenticated users

:::

### User Management

- `UserManager<IdentityUser>`: Provides the APIs for managing user in a persistence store.

- `SignInManager<IdentityUser>`: Provides the APIs for user sign in.

```csharp
[AllowAnonymous]
public class CustomerController : Controller
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;

    public CustomerController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCustomerAsync([FromBody] UserModel user)
    {
        var newUser = new IdentityUser
        {
            UserName = user.UserName
            Email = user.Email
        };

        var result = await userManager.CreateAsync(newUser, user.Password);

        if (result.Succeeded)
        {
            await signInManager.SignInAsync(user, isPersistent: false);

            return RedirectToAction("/");
        }

        foreach(var error in result.Errors)
        {
        }
    }
}
```

### Configure Identity Services

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.Configure<IdentityOptions>(options =>
    {
        // Password settings.
        options.Password.RequireDigit = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequireUppercase = true;
        options.Password.RequiredLength = 6;
        options.Password.RequiredUniqueChars = 1;

        // Lockout settings.
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.AllowedForNewUsers = true;

        // User settings.
        options.User.AllowedUserNameCharacters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
        options.User.RequireUniqueEmail = false;
    });

    services.ConfigureApplicationCookie(options =>
    {
        // Cookie settings
        options.Cookie.HttpOnly = true;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

        options.LoginPath = "/Identity/Account/Login";
        options.AccessDeniedPath = "/Identity/Account/AccessDenied";
        options.SlidingExpiration = true;
    });
}
```

## Authorization

Authorization is identifying what the user can and cannot do

Role management:

- `RoleManager<IdentityRole>`: Provides the APIs for managing roles in a persistence store

| Role | Claims |
| ---- | ------ |

In ASP.NET Core, a Role is a Claim with Type Role

### Role Based Authorization

Roles

- Boolean
- Encapsulating:

  - Users
  - Functions

### Claims Based Authorization

Claims: A claim is a name-value pair that represents what the subject is, not what the subject can do

- Key-Value pair
- User property
- Describes the user

- `ClaimType` comparison is case in-sensitive
- `ClaimValue` comparison is case sensitive

### Policy

- Authorization Function

### External Identity Providers

Trusted External Identity Providers such as:

- Google
- Microsoft
- Facebook
- Twitter

Steps for the integration: In all cases, we must complete an application registration procedure that is vendor dependent and that usually involves:

1. Getting a Client Application ID

2. Getting a Client Application Secret

3. Configuring a redirection URL, that's handled by the authorization middleware and the registered provider

4. Optionally, configuring a sign-out URL to properly handle sign out in a Single Sign On (SSO) scenario

```csharp
public void ConfigureServices(IServiceCollection services)
{
    //...

    services.AddAuthentication()
        .AddMicrosoftAccount(microsoftOptions =>
        {
            microsoftOptions.ClientId = Configuration["Authentication:Microsoft:ClientId"];
            microsoftOptions.ClientSecret = Configuration["Authentication:Microsoft:ClientSecret"];
        })
        .AddGoogle(googleOptions => { ... })
        .AddTwitter(twitterOptions => { ... })
        .AddFacebook(facebookOptions => { ... });
    //...
}
```

## Response Compression

- At the reverse proxy layer (IIS, Nginx, Apache). Handling compression at reverse proxy layer is better because these servers are typically much faster and more efficient at compressing responses

- Or use `Microsoft.AspNetCore.ResponseCompression` to handle compression in the application

## JSON Serialization

Parse (de-serialize) JSON to object notations

- `JSON.Net` by _Newtonsoft_
- `System.Text.Json`: .NET 3+ and should be preferred. Not all features are implemented

- De-serialize an Object:

  ```csharp
  public class Account
  {
      public string Email { get; set; }
      public bool Active { get; set; }
      public DateTime CreatedDate { get; set; }
      public IList<string> Roles { get; set; }
  }

  string json = @"{
    'Email': 'james@example.com',
    'Active': true,
    'CreatedDate': '2013-01-20T00:00:00Z',
    'Roles': [
      'User',
      'Admin'
    ]
  }";

  Account account = JsonConvert.DeserializeObject<Account>(json);

  Console.WriteLine(account.Email);
  // james@example.com
  ```

- Serialize an Object

  ```csharp
  Account account = new Account
  {
      Email = "james@example.com",
      Active = true,
      CreatedDate = new DateTime(2013, 1, 20, 0, 0, 0, DateTimeKind.Utc),
      Roles = new List<string>
      {
          "User",
          "Admin"
      }
  };

  string json = JsonConvert.SerializeObject(account, Formatting.Indented);
  // {
  //   "Email": "james@example.com",
  //   "Active": true,
  //   "CreatedDate": "2013-01-20T00:00:00Z",
  //   "Roles": [
  //     "User",
  //     "Admin"
  //   ]
  // }
  ```

## Secret Manager

Keeps production secrets like database connection strings, API and encryption keys out of source control

- **Meant to be used for development purpose only**
- The secrets are stored as plain text in the `secrets.json` file located in `C:\Users\{UserName}\AppData\Roaming\Microsoft\UserSecrets\{ID}\`

  - `UserName`: is the current windows user
  - `ID`: Random GUID used to link secrets with a particular project

- No configuration changes needed

```bash
# initialize
dotnet user-secrets init

# add secret
dotnet user-secrets set MongoDbSettings:Password Pass#word1
```

## Email Confirmation

- Prevents accidental account hijacking
- Reduces spam registration
- Prevents unsolicited emails
- Easy to recover account

```csharp
services.AddIdentity<IdentityUser, IdentityRole>(options =>
        {
            //...

            options.SignIn.RequireConfirmedEmail - true;
        }).AddEntityFrameworkStores<AppDbContext>();
```

- Generate email confirmation token:

  ```csharp
  var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
  ```

- Generate email confirmation link:

  ```csharp
  var confirmationLink = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, token = token }, Request.Scheme);
  ```

## Encryption

Data Protection API (DPAPI) can be used

## Nuget Packages

1. Use `Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation` Nuget package to hot reload. Also add `app.AddRazorPages().AddRazorRuntimeCompilation()` to Startup file.

2. `Microsoft.EntityFrameworkCore` to access Database. `Microsoft.EntityFrameworkCore.SqlServer` for SqlServer. For Sqlite use [Sqlite EntityFramework](https://docs.microsoft.com/en-us/ef/core/get-started/?tabs=visual-studio). `Microsoft.EntityFrameworkCore.Tools` to run migrations. Add the below connection string in `appsettings.json` file:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=(LocalDb)\\MSSQLocalDB:..."
     }
   }
   ```

   Connection String is found in the respective SQL Application.

## Versions

To target older ASP.NET Core versions add a `global.json` file to the working directory:

```json
{
  "sdk": {
    "version": "1.1.9"
  }
}
```

### ASP.NET Core 1.0

- 27 June 2016 (VS 2015 update 3)
- Used a `project.json` file for project and package configuration, references
- Improved separations of concerns between content and resources

  - Public, static resources (CSS, JavaScript, images) in `wwwroot` directory

- VS 2017 moved back to `.csproj` file from `project.json`

  - Change allows for MSBuild support
  - Project file updates:

    - Removed list of `included` files
    - Manage NuGet package references

#### Dependency Injection Built-In

Dependency injection is completely built in:

- No need to bring in **Ninject** or **Autofac** etc.
- Items added to the services container in `Startup.cs`
- Services are accessed through:

  - Constructor injection
  - Method injection (with `[FromServices]`)
  - View injection (with `@inject`)
  - `ApplicationServices` (for non-controller classes) (NOT DI)
  - `HttpContext.RequestServices` (for controllers) (NOT DI)
  - Injection is the preferred mechanism

- Custom services can be registered as well:

  - Transient: created each time there is a request (by any class)
  - Scoped: created once per request (HTTP request)
  - Singleton: max of one instance per application
  - Instance: similar to singleton, but created when instance is called

### Bundling & Minification

- Configured with `bundleconfig.json`
- Bundler & Minifier VS extension

  - Includes file watcher for `bundleconfig.json`
  - Bundle on build requires additional NuGet package
  - Set bindings with Task Runner Explorer

- `BundlerMinifierCore` works with .NET Core CLI

  - Must manually configure `.csproj` file
  - Execute with "dotnet bundle" or "dotnet bundle clean"

#### Environment Awareness & Configuration

- ASP.NET Core uses `ASPNETCORE_ENVIRONMENT` variable
  - Development, Staging, Production are built-in environments
- Determining which configuration files to load
- Running different code based on environment using `IHostingEnvironment env`:
  - Use `env.EnvironmentName`
  - Use `env.IsDevelopment()`
- Environment Tag Helper

- Applications are configured using:

  - Simple JSON (or other file types)
  - CLI arguments
  - Environment variables
  - In-memory .NET objects
  - Encrypted user store
  - Custom providers

  - Configuration values are set in the order received
  - Environment determines which additional files to load:

    - `appsettings.<environment>.json`

  - Custom classes can represent configuration values:

    - Can bind to entire configuration or individual sections with `services.Configure<T>`

    - Requires the `Microsoft.Extensions.Options.ConfigurationExtensions` package

    - Can be added to DI container and injection in with `IOption<T>`

  - Added in 1.1

    - `ReloadOnChange` for `AddJsonFile` and `IOptionsSnapshot` for object injection
    - Azure Key Vault configuration provider

  - Changed in 2.0

    - Configuration is loaded using `CreateDefaultBuilder`

#### Web host configuration & SSL

- Create a Web host:

  - ASP.NET Core application are console applications that create a web host
    - Kestrel in 1.0
  - The web host is created with the `WebHostBuilder` class
    - Responsible for app startup and lifetime management
  - At min, it configures a server and request processing pipeline
  - Additional features and configuration are opt-in:
    - `UseIISIntegration` adds IIS with reverse proxy
    - `UseStartup<T>` adds configuration (Configure and ConfigureServices)

- **Changed in 1.1**

  - Added `HTTP.sys IServer` (called `WebListener` in 1.1)

- **Changed in 2.0**

  - `CreateDefaultBuilder` configures standard `IWebHostBuilder`
  - Many additional options added to `WebHostBuilder`

_Example:_ Create a web host

```csharp
public class Program
{
  public static void Main(string[] args)
  {
    var host = new WebHostBuilder()
                    .UseKestrel()
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .UseIISIntegration()
                    .UseStartup<Startup>()
                    .UseApplicationInsights()
                    .Build();

    host.Run();
  }
}
```

1. Using SSL Locally: IIS

   - Check Enable SSL on Debug project property page
   - Configure MVC for SSLPort (44300 or greater)
   - Add RequireHttps attribute/filter/etc.
   - Add `iisSettings.iisExpress.sslPort: 44329` to `launchSettings.json` file
   - If you have not already trusted it. You'll get an exception in the browser.

   - **Added in 1.1:**

     - URL rewriting to HTTPS

   _Example:_

   ```csharp
   public void ConfigureServices(IServiceCollection services)
   {
     // services.AddMvc(options => options.SslPort = 44329);

     var sslPort = Configuration.GetValue<int>("iisSettings:iisExpress:sslPort");
     services.AddMvc(options => options.SslPort = sslPort);
   }

   // Add HTTPS attributes to the controllers
   [RequireHttps]
   public class AccountController : Controller
   {
   }
   ```

2. Using SSL Locally: Kestrel

   - Install the desktop development with C++ workload
   - Need the `Microsoft.AspNetCore.Server.Kestrel.Https` package
   - Make a cert, convert to `.pfx` format
   - Make `.pfx` file into X509 certificate, add it to Kestrel options, specify ports
   - Add `RequireHttps` attribute, configure MVC for SSLPort

- **Added in 1.1:**

  - URL rewriting to HTTPS

- **Changed in 2.0:**

  - Kestrel configuration (breaking changes)

- **Changed in 2.1**

  - HTTPS on by default in development
  - Addition of specialized middleware for redirects
  - Kestrel listens on `https://localhost:5001` with dev certificate

#### Application Startup

- The `Startup` class configures services and application pipeline

- The Constructor creates the configuration builder and configures user secrets (if needed)

- The `Configure` method sets up how application will respond to HTTP requests
- The `ConfigureServices` method configures services and DI

- **Changed in 2.0**
  - Configuration created in `DefaultWebHostBuilder`, injected into `Startup.cs`

#### Standard Logging Is Built-In

ASP.NET Core provides `ILoggerFactory` available in Startup's Configure method

- Additional built-in or third-party providers can be added

- `LoggerFactory` available through injection using `ILogger<T>`

- **Changed in 2.0:**

  - Logging incorporated in DI system by default
  - Configured in `Program.cs` instead of `Startup.cs`

#### Controllers and Actions

- Controller, AsyncController, APIController all rolled into one
- All return `IActionResult` (or `Task<IActionResult>`) or its derivatives
- many helper methods built into base controller for returning `HttpStatusCodes`:
  - `NoContent(204)`, `OK(200)`, `BadRequest(400)`, etc
- API methods must specify HTTP verb (as opposed to API 2.2)
  - No longer based on name of method

#### Tag Helpers

New in ASP.NET Core

- Enable server-side code to participate in rendering HTML elements in Razor views
- Reduces the transition between code and markup

  - Keeps developers and designers in the HTML

- Attach to HTML elements in views:
  - HTML Helpers are invoked as methods
  - Custom Tag Helpers can be created

Form Tag Helper:

- Support tags (must include at least one)

  - `asp-area`
  - `asp-controller`
  - `asp-action`
  - `asp-antiforgery` (true by default)
  - `asp-rout-[parametername]` (e.g. `asp-route-id="1"`)
  - `asp-all-route-data`: Uses a dictionary for the route data
  - `asp-route` (for named routes)

- Area, Controller, Action are defaulted to current route
- Equivalent functionality to `@Html.BeginForm/EndForm`

Form Field Tag Helpers:

- Include, Input, TextArea, Select Tag Helpers
- Model property is selected with `asp-for`
  - Provides strong typing with model properties
- Generate Id and Name values based on model property
- Add HTML5 validation attributes based on data annotations

Input:

- Adds HTML type based on .NET data type or data annotation:
  - For example, `Bool` => `type="checkbox`, `[EmailAddress]` => `type="email"`
- Equivalent to `@Html.TextBoxFor` or `@Html.EditorFor`

TextArea:

- Equivalent to `@Html.TextAreaFor`

Select:

- Generates option elements based on "asp-items" attribute
- Equivalent to `@Html.DropDownListFor` or `@Html.ListBoxFor`

Label:

- Property selected with `asp-for`
- Generates label caption and "for" attribute
- Equivalent to `@Html.LabelFor`

Validation Tag Helpers:

- Validation message:

  - Property selected with `asp-validation-for`
  - Generates `data-valmsg-for` attribute
  - Equivalent to `@Html.ValidationMessageFor`

- Validation summary:
  - Enabled with `asp-validation-summary`
  - Equivalent to `@Html.ValidationSummary`

Non-Form Tag Helpers:

- Anchor: additionally supports:

  - `asp-fragment`
  - `asp-hostname`

- Environment:

  - Conditionally renders content based on the runtime environment
  - The "names" attribute accepts one or more environment names
  - If `HostingEnvironment.EnvironmentName` matches, content is loaded
  - **Changed in 2.0:**
    - Added the `include` and `exclude` attributes

- Link/Script/Image:

  - Link:
    - `asp-append-version` tag adds hash of file to URL
    - Resolves issue of file still cached when contents change
    - Adds `?v=[hash of file]` to the URL

- Cache/Distributed Cache:

  - Provides a way to mark content as cached using the `[cache]` tag

  - Supports absolute, time-span, or sliding expiration

  - Supports additional cache options

  - Distributed Cache Tag helper:

    - Inherits from Cache Tag Helper
    - Supports SQL Server or Redis as a distributed cache

Custom Tag Helpers:

- Derive from `TagHelper`
- Public properties become lower-kebab-cased attributes
- Process method builds the rendered tag
- Assembly containing custom Tag Helpers must be registered in `_ViewImports.cshtml`

#### View Components

View Components combine server-side code with partial views:

- Used to render a chunk of the response

Limitations:

- Can't serve as a client-side end point
- Don't use model binding
- Don't participate in controller lifecycle

Create `ViewComponent` Class:

- Derive from `ViewComponent`

  - Can also use name ending in `ViewComponent` or decorate with `[ViewComponent]`

- Implement `InvokeAsync` and return `IViewComponentResult`
  - Any data needed for view passed into view as `viewmodel`
  - Typically returns a partial view
- Create standard partial view: default name is `default.cshtml`

- Must locate partial view in:

  - `Views/[controller_name]/Components/[view_component_name]/[view_name]`
  - `Views/Shared/Components/[view_component_name]/[view_name]`

- Invoke from a view (or layout)

  - `@Component.InvokeAsync("[name]", [anonymous type with parameters])`

- Invoke from a controller action method: `return ViewComponent("[name]", [anonymous type with parameters]);`

- **Changed in 1.1:**
  - Can be invoked as a Tag Helper from view (or layout)

### ASP.NET Core 1.1

- Recommended for production
- Entity Framework Core 1.1 (IMHO) is production ready

  - Added/fixed features:

    - Connection Resiliency
    - Explicit loading
    - Mapping to computed columns

  - Additional features:
    - Mapping to Fields
    - `DbSet.Find`

View Components Invoked as Tag Helpers:

- Must be registered in `_ViewImports.cshtml`
- `@addTagHelper *,[assembly name]`

- Pascal-cased names are changed to lower-kebab-case
- For the view component and any parameter names
- Tags start with `vc`: `<vc:categories-as-menus/>`

Configuration Updates

- Reload on change in `AddJsonFile`

  - Parameter existed in 1.0; only supported in 1.1 and later

- `IOptionSnapshot`:
  - Used for injection of custom settings classes into classes, methods, and views
  - Supports reload on change

**View Pre-Compilation**:

- Views can now be compiled with application publication

  - Requires `Microsoft.AspNetCore.Mvc.Razor.ViewComponent` package
  - Requires updating the project file: `<MvcRazorCompileOnPublish>true</MvcRazorCompileOnPublish>`

- 2 Considerations:

  - Resulting publication bundle is smaller
  - Views cannot be edited after pre-compilation

- **Updated in 2.0:**
  - View are pre-compiled by default

WebListener Server for Windows:

- Runs on top of Windows `Http.Sys` kernel
- Doesn't rely on IIS
- Takes advantage of Windows-specific features
- Requires `Microsoft.AspNetCore.Server.WebListener` package
- Shipped as 1.0 and 1.1 releases

- **Changed in 2.0:**
  - Changed to `Http.Sys`, option expanded

Middleware Components:

- Middleware components handle requests and responses
- Each component:
  - Chooses to send the request to the next component or not
  - Can perform work before and after invoking the next component
- **Replaces `HTTPModules` and `HTTPHandlers`**
- Completely configured in code

1. URL Rewriting Middleware:

   - Modifies a request URL based on set rules
   - Must add `Microsoft.AspNetCore.Rewrite` package
   - Capable of redirects (client-side) and rewrite (server-side)
   - Can be configured with:

     - Text (regex, case sensitive)
     - IIS standard XML formatted rules or Apache Mod_Rewrite syntax
     - C# code (methods or classes)

   - **Changed in 2.0:**

     - Configuration of IIS and Apache rules

   - **Changed in 2.1:**

     - Addition of middleware to intelligently redirect to HTTPS

   - Redirects are configured with regex, replacement, and status code

     - Defaults to 302 (temporary) if status code is not supplied
     - Can also redirect to secure end point

   - Rewrites are configured with regex, replacement, and whether or not to continue processing rules
   - Methods change the response through code
   - Can add classes that implement `IRule` interface

2. Response Caching Middleware:

   - Requires `Microsoft.AspNetCore.ResponseCaching` package
   - Add `services.AddResponseCaching()` in `ConfigureServices`
   - Add `app.UseResponseCaching()` in `Configure`
   - Use `[ResponseCache]` controller attribute
   - Options:

     - `UseCaseSensitivePaths(default=false)`
     - `MaximumBodySize(default=64MB)`
     - `SizeLimit(default=100MB)`

   - **Changed in 2.0:**
     - Where it gets configured

3. Response Compression Middleware:

   - Requires `Microsoft.AspNetCore.ResponseCompression` package
   - Add `services.AddResponseComporession()` in `ConfigureServices`
   - Add `app.UseResponseCompression()` in `Configure`
   - Configure compression provider (default is gzip)
   - **Note: Will fail if user agent contains "AppleWebKit/537.36 (KHTML, like Gecko)"**

   - **Changed in 2.0:**
     - Where it gets configured

4. Middleware as MVC Filters:

   - Filters have access to MVC context and constructs
   - Using middleware as filters provides same access

     - Run in same stage as resources filters

   - Create a class with `Configure` method
   - Add to controller/action using the `[MiddlewareFilter]` attribute

**WebSocket Support**:

- Enables working directly with a socket connection
  - Requires `Microsoft.AspNetCore.WebSockets` package
- Configure the middleware
- Accept `WebSocketRequests`
- Send and Receive messages

- **SignalR** (.NET Core 3.0 or later) provides more power:

  - Included in the `Microsoft.AspNetCore.App` shared framework
  - `Microsoft.AspNetCore.SignalR.Client` package

- **Added in 2.1:**
  - SignalR support

### ASP.NET Core 2.0

Package/Runtime Update:

- `Microsoft.AspNetCore.All` meta-package (.NET Core 2)

  - Includes all ASP.NET Core, EF, and their internal/third-party dependencies

- .Net Core Runtime Store:

  - Contains all packages (pre-compiled) from `Microsoft.AspNetCore.All` meta-package

- Package trimming (pre-release)
  - Requires `Microsoft.Packaging.Tools.Trimming` package
  - Add `<TrimUnusedDependencies>True</TrimUnusedDependencies>` to project file

Entity Framework Updates:

- Entity Framework DbContext pooling
- Owned tables/table splitting
- Like operator
- Improved [LINQ](./../LINQ.md) translation
- Global query filters
- String interpolation in raw SQL
- Explicitly compiled queries
- Scalar function mapping
- And more

Using Docker:

- Build a custom image based on an existing `aspnetcore` image

  - Enable Docker support in the new project wizard
  - Add Docker support in VS 2017 through project context menu
  - Select the same target OS that Docker is targeting

- Docker doesn't use the `launchSettings.json`
- Configured through the Docker files
- Docker-Compose project in startup project

  - Switch to ASP.NET Core project to disable Docker

- Localhost:{ServicePort} is the window into your application

`WebHost.CreateDefaultBuilder`:

- Encapsulates the most common tasks:

  - Configures Kestrel and IISIntegration
  - Sets content root directory
  - Loads configuration from:

    - `appsettings.json/appsettings.{environmentname}.json`
    - User secrets (in development)
    - Environment variables/command-line arguments

  - Configures logging for console and debug logging using filtering rules from `appsettings`

  - Can add additional configuration, logging providers, and servers
  - Can execute `Configure` and `ConfigureServices` directly from the WebHostBuilder without having to use a startup class.

Configuration Updates:

- Configuration is built in `Program.cs` by `CreateDefaultBuilder`
- `IConfiguration` is added to DI container
  - Injected into constructor for `Startup.cs`
- Additional configuration can be added using WebHostBuilder
  - `ConfigureAppConfiguration((context, config) => {})`

Logging Changes:

- Default logging is configured in `Program.cs` by `CreateDefaultBuilder`
- Log filters can be configured in:

  - `appsettings.json`
  - Through code

- Additional logging providers can be added using WebHostBuilder
  - `ConfigureAppLogging((context, logging) => {})`

**`Http.Sys`:**

- Renamed from WebListener (introduced in 1.1)
- Requires `Microsoft.AspNetCore.Server.HttpSys` package; merger of:

  - `Microsoft.AspNetCore.Server.WebListener`
  - `Microsoft.Net.Http.Server`

- Configurable options:
- Authentication
- Max client connections
- Max request body size
- URL prefixes
- **Can't use with IIS**

Rewriting Middleware Updates:

- Changes to how IIS and Apache rules are acquired
- Additional IIS URL Rewrite Module features are supported:

  - Global rules
  - Rewrite maps
  - CustomResponse action
  - Action: CustomResponse

- **Changed in 2.1:**
  - Addition of middleware to intelligently redirect to HTTPS

Kestrel Updates:

- Improvements to make it more suitable as an internet facing server
- Added server limits for:
  - Max client connections
  - Max request body size
  - Min request body data rate
- Now uses a Listen (ListenUnixSocket)
  - Can't use `UseUrls` for HTTPS

Using SSL Locally: Kestrel

- Same as in 1.1
- No need to create X506 certificate
- Copy `.pfx` to project
- Add Listen options to `UseKestrel()`
- Configure HTTP and HTTPS
- Add SSLPort to MVC

- **Changed in 2.1:**
  - Development certificate is created when .NET Core SDK is installed
  - Development certificate is trusted through VS or .NET Core CLI

SSL in Docker:

- Enable SSL in Kestrel
- Map entry ports to 80, 443 in `docker-compose.override.yml`

  - `8080:80`
  - `44300:443`

- Set SSL Port in MVC to Docker Port (44300)
- Set service URL in docker-compose project

**Razor Pages**:

- Razor Pages are designed for creating page-focused scenarios
- Less overhead than MVC
- Enabled alongside MVC
  - All part of the same framework
  - Framework looks for Razor Pages in the `Pages/` folder by default
- Declared with `@page` directive, operates as an action:

  - Requests don't go through a controller
  - Use code behind files for C# code

- Support model binding, Tag Helpers, HTML Helpers

### ASP.NET Core 2.1

Compatibility Version:

- `SetCompatibilityVersion` method allows for opt-in or opt-out of potentially breaking pages
- opting in produces the latest behaviour
- Default for 2.0 and 2.1 apps is 2.0 compatibility
- Set in `ConfigureServices()`
  - `services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);`

`Microsoft.AspNetCore.All` meta-package:

- This new package includes all supported packages by:
  - ASP.NET Core team
  - EF Core Team
  - Plus Json.NET, Remotion.Linq, and lx-Async

Client Libraries and Library Manger:

- VS 2017 (15.8+) added Library Manger
- Which is similar to GulpJS, GruntJS, webpack, npm

- Why Library Manger?

  - Not currently using an open-source tool
  - Need/want complete control over the file destination
  - Smaller footprint for libraries
  - Loads only specified files

- Add specific files and versions from cdnjs, unpkg, or the filesystem
- IntelliSense in `libman.json`
- Clean/restore on build
- GUI for building `libman.json`
- Install `LibMan` as a global tool
- `dotnet tool install -g Microsoft.Web.LibraryManager.CLI`
- Execute the appropriate command
  - `init`, `[un]install`, `clean`, `restore`, `update`
  - `libman install ../../ --provider filesystem --files test.js --destination wwwroot/lib/test`

SignalR Features:

- Handle connection management automatically
- Send messages to all connected clients automatically
- Send messages to specific clients or groups of clients
- Scales to handle increased traffic

SignalR Mechanics:

- ASP.NET Core SignalR uses WebSockets to handle real-time communications.
- Hubs are used to communicate between the clients and the servers.
- SignalR handles the dispatching across machine boundaries
  - Allowing clients to call the server and vice versa

SignalR Hub Protocols:

- Text protocol based on JSON
- Binary protocol based on MessagePack
- Older browsers must support XHR Level 2 to provide MessagePack support

Implementing SignalR:

- SignalR server library is in `Microsoft.AspNetCore.App`
- Add SignalR client library using Library Manager

  - `@aspnet/signalR` from unpkg

- Create a SignalR hub
- Enable CORS as necessary

**ApiController** Attribute:

- APIController attribute + ControllerBase --> Enables REST behaviours

- Automatic HTTP 400 (Bad Request) with invalid ModelState
  - Customizable with `InvalidModelStateResponseFactory`
- Multipart/form-data request inference
- Binding source parameter inference

Binding Source Parameter inference:

- Complex types --> FormBody
- IFormFile, IFormFileCollection --> FromForm
- Values matching the route --> FromRoute
- All others --> FromQuery

Razor Pages Improvements:

- Razor Pages increased search area:

  - Current Pages folder
  - `/Pages/Shared`
  - `/Views/Shared`

- Razor Pages support areas

**Razor Class Libraries**:

- Razor-based UIs can be distributed as a library
  - Share across multiple projects
  - App startup time is improved
  - Views and pages are automatically discovered
  - Views and pages can be overwritten by the app
- They can include:
  - Razor views
  - Pages
  - Controllers
  - View components
  - Models (page and data)

HTTPS and Security Middleware:

- `app.UseHttpsRedirection()` replaces `RequireHttpsAttribute`
- Creates a temporary redirect (307), best for development
- Configures a permanent redirect for production
- Trust the development certificate: `dotnet dev-certs https --trust`

Kestrel listens on port `https://*:5001` with local development certificate

EU General Data Protection Regulation (GDPR):

- Rules to protect EU citizens from privacy and data breaches
- Applies to all companies that process data for EU citizens
- All websites should consider GDPR compliance

- ASP.NET Core 2.1 GDPR Support:

  - Configurable cookie policy options
  - Cookie consent partial view
  - User download/deletion of personal data
  - Privacy policy page

- Enabled with `app.UseCookiePolicy`:
  - Enables consent pop-up window
  - Disables non-essential cookies
  - Sets cookie `AspNet.Consent`:
    - Values (yes || no)
    - SameSite=Lax (default)
    - Expiration (current time + 5 hrs)
    - Secure if HTTPS request

### ASP.NET Core 2.2

- To adopt the in-process hosting model for IIS, add the `<AspNetCoreHostingModel>` property with a value of InProcess to a `<PropertyGroup>` in the project file

- `ConfigureKestrel`

- If your app does logging provider initialization, filtering, and configuration loading in the `Startup` class, move that code to `Program.Main`:

  ```csharp
  public static void Main(string[] args)
  {
      var webHost = new WebHostBuilder()
          // ...
          .ConfigureLogging((hostingContext, logging) =>
          {
              logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
              logging.AddConsole()
                     .AddFilter<ConsoleLoggerProvider>
                         (category: null, level: LogLevel.Information)
                     // or
                     .AddFilter<ConsoleLoggerProvider>
                         ((category, level) => category == "A" ||
                             level == LogLevel.Critical)
              );
          })
          // ...
  }
  ```

- `System.Text.Json` supports asynchronous serialization

### ASP.NET Core 3.0

- Remove `<AspNetCoreHostingModel>` element
- Remove `<Microsoft.AspNetCore.App>` and `Microsoft.AspNetCore.Razor.Design`
- `services.AddMvc` to `services.AddRazorPages`
- No need to set `CompatibilityVersion` in `services.AddMvc`
- Added `app.UseAuthorization()`
- Use `app.UseEndpoints`
- Default to the in-process hosting model in ASP.NET Core 3.0 or later

### ASP.NET Core 3.1

### ASP.NET Core 5.0

- Integration of OpenAPI V3.0 (Swagger)
- `F5`: opens swagger page (`localhost:44315/swagger/index.html`)
- `NSwag`: Generates HTTPClient from the `swagger.json` output

### ASP.NET Core 6.0

- Implicit `using` directive
