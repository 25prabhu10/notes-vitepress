---
title: ASP.NET Core MVC
description: ASP.NET Core's implementation of MVC
---

# ASP.NET Core MVC

## MVC Design Pattern

Model-View-Controller (MVC) is a user interface design pattern

- Promotes separation of concerns across multiple application layers

The MVC design pattern helps to enforce separation of concerns to help you avoid mixing presentation logic, business logic, and data access logic together.

- Model: classes (objects)

  - All business logic
    - Business processes
    - Validation rules
    - Systems integration

- View: web pages (Razor HTML)

  - Very little logic

- Controller: connects models, business logic and web pages

  - Controls application workflow
  - Orchestrates interaction between the model and the view

How website works:

- User requests a web-page / API through an URL
- ASP.NET will intercept this call through a Router
- Router will send the information present in the request to the Controller
- Controller will use the Model to get data from the Database and process this data
- After processing the data Controller will send this data to the View
- View will generate the HTML page with the data it receives and servers it back to the user

### ASP.NET MVC

- Add the MVC middleware `app.UseMvc()`, along with route patterns that the ASP.NET Core MVC middleware should be listening to.

  ```csharp
  app.UseMvc(routes =>
  {
      routes.MapRoute("Default", "{controller=Home}/{actions=Index}/{id?}");
  });

  // Core 3.x +
  app.UseEndpoints(endpoints =>
  {
      endpoints.MapControllers("default", "{controller=Home}/{action=Index}");
  });
  ```

- Add the services MVC requires (DI): 3-5 were added in Core 3.x

  1. `AddMvcCore()`: Only adds core components of the MVC pipeline, requiring you to add any other middleware (needed for your project) by yourself.

     ```csharp
     // MVC Core
     public void ConfigureServices(IServiceCollection services)
     {
         services.AddMvcCore()
                 .AddViews()
                 .AddRazorViewEngine()
                 .AddDataAnnotations() // for model validation
                 .AddApiExplorer(); // for Swagger
     }
     ```

  2. `AddMvc()`: Internally calls `AddMvcCore()` and adds other middleware such as the Razor view engine, Razor pages, CORS, cache tag helper, JSON formatter (in Core 2.x), data annotations etc.

     - everything that `AddControllersWithViews()` does
     - everything that `AddRazorPages()` does

     ```csharp
     public void ConfigureServices(IServiceCollection services)
     {
         services.AddMvc();
     }
     ```

  3. `AddControllers()`: Everything that `AddMvcCore()` does and (Better suited for API apps):

     - authorization services: needed for authorization policies, filters and other authorization components to work
     - API explorer: required if you want to build dynamic API documentation, generate Swagger/OpenAPI files
     - data annotations: needed for model validation with attributes and IValidateableObject to work
     - formatter mappings: needed for content negotiation to work
     - CORS

  4. `AddControllersWithViews()`: Everything that `AddControllers()` does and (building a "classic" MVC site):

     - views functionality: explicitly registers the Razor view engine
     - cache tag helper

  5. `AddRazorPages()`: Everything that `AddMvcCore()` does and:

     - all the core Razor pages features
     - authorization services
     - data annotations
     - cache tag helper

- [ASP.NET Core MVC 3.x - AddMvc(), AddMvcCore(), AddControllers() and other bootstrapping approaches](https://www.strathweb.com/2020/02/asp-net-core-mvc-3-x-addmvc-addmvccore-addcontrollers-and-other-bootstrapping-approaches/)

### Controllers

They are responsible for receiving the request and figuring out what to do with it. In an ASP.NET Core MVC application, controllers are nothing more than classes.

- They contain actions (methods)

## Razor Pages Application

Razor is a template markup syntax.

- Introduced in ASP.NET Core 2.0
- Routing, Models, `ActionResult`, Tag Helpers...
- Razor Pages have two parts:

  1. Razor Page (UI/View)
  2. Page Model (Contains Handlers)

The `View()` looks for `.cshtml` files in the Views directory. It first checks for a directory with the same name as the controller. In that directory it checks for the file with the same name as the action calling the view. If not it will look into the `Shared` directory

### Syntax

- HTML is a valid in Razor pages
- `@`: Is prefixed to C# code, e.g. `@DateTime.Now.Year`

HTML helpers:

- `@Html.ActionHelper`
- `@Url.Action`

::: tip Note
`Microsoft.AspNetCore.App` was the meta-package which contained all features of .NET Core

- Prior to .NET Core 3, meta-package was included as a Nuget Package.
- With .NET Core 3 onwards, meta-package is a part of .NET Core installation itself, the package have been moved out of the meta-package as a separate Nuget Package, like Entity Framework.

:::

## Project

1. Create a ASP.NET Core project:

   ```bash
   # ASP.NET Core Empty
   dotnet new web -n [project name]


   # ASP.NET Core Web App (MVC)
   dotnet new MVC -n [project name]
   ```

- For Login user [UserManager.CheckPasswordAsync vs SignInManager.PasswordSignInAsync](https://stackoverflow.com/questions/53854051/usermanager-checkpasswordasync-vs-signinmanager-passwordsigninasync)

### Project Structure of Razor Pages

Check [Core Project Structure](./ASP_NET_Core.md#aspnet-core-project-structure)

1. Create an ASP.NET Core Web Application MVC (Razor Pages).

2. `[project name].csproj`

3. `Properties/launchSettings.json`

4. `wwwroot/`: folder will contain all the static files like CSS, JavaScript, image files, and libraries. This addresses separation of concerns.

5. `Pages/`: is the main folder in a Razor Project. This folder contains all the pages (views) of the application.

   - There is a _Shared_ folder inside, which contains `.cshtml` files with `_` prefix. These files are known as **partial view** files. They act as components.
   - `_ViewImports.cshtml` - Contains tag helper. This contains global tags, you can define page specific tags inside the specific page folder.
   - `_ViewStart.cshtml` - Defines the master page. Like the layout for all the pages.
   - The rest of the `.cshtml` files in Pages are Razor Pages And other `.cshtml` files have a `.cshtml.cs` file, which is the modal for the view.
   - `index.cshtml` file is the homepage of the application.

6. `Views/`

## Middleware

Check [ASP.NET Core Middleware](./ASP_NET_Core.md#middleware-in-aspnet-core)

### Serve Static Files

Static files are stored within the project's web root directory. The default directory is `{content root}/wwwroot`, but it can be changed with the `UseWebRoot` method.

`wwwroot` folder structure:

- `css`
- `js`
- `lib`
- `images`

Use `app.UseStaticFiles()` method to serve static files from this directory

Other methods:

- `app.UseDirectoryBrowser`: Allows directory listing within specified directories. Disabled by default for security reasons. Add `services.AddDirectoryBrowser()`

- `app.UseDefaultFiles()`: Serve a default file from `wwwroot` without requiring the request URL to include the file's name:

  - `UseDefaultFiles` must be called before `UseStaticFiles`
  - It checks for:
    - `default.htm`
    - `default.html`
    - `index.htm`
    - `index.html`

- `app.UseFileServer()`: Combines the functionality of `UseStaticFiles`, `UseDefaultFiles`, and optionally `UseDirectoryBrowser`

## Error Handling

### Global Exception Handling

- Add `app.UseDeveloperExceptionPage()` to get stack trace and other diagnostic details in the error page. Use this only in **Development environment**

- In production, use `app.UseExceptionHandler("/Error")`. This middleware listens for any unhandled exceptions that may occur during the course of a request, then logs the error and redirects the request to a friendly error page

## Routing in Razor Pages

- Routing in ASP.NET Razor Pages maps URL's to physical files on disk.

- _Pages_ is the root folder where `index.cshtml` (default document) file resides. You can change the root folder in `ConfigureServices` in `Startup.cs` file.

- File extensions are not included in the URL.

| URL                         | Maps TO                                                  |
| --------------------------- | -------------------------------------------------------- |
| `www.domain.com`            | `/Pages/index.cshtml`                                    |
| `www.domain.com/index`      | `/Pages/index.cshtml`                                    |
| `www.domain.com/account`    | `/Pages/account.cshtml` or `/Pages/account/index.cshtml` |
| `www.domain.com/invalidURL` | `/Pages/index.cshtml` _(default path)_                   |

## Tag Helpers

Tag Helpers enable server-side code to participate in creating and rendering HTML elements in Razor files. HTML Helpers alternative.
