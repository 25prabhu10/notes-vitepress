---
title: Logging
description: Recording application events
---

# Logging

ASP.NET Core provides default logging

- Don't use string interpolation to log any data

_Example:_ `CreateHostBuilder` in `Program.cs` sets up default logging

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureLogging((context, logging) =>
            {
                logging.ClearProviders();
                logging.AddConfiguration(context.Configuration.GetSection("Logging"));
                logging.AddDebug();
                logging.AddConsole();
            })
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
```

## Logging Levels

- `Trace` = 0: Very detailed info which may contain sensitive data. Should not be enabled in production

- `Debug` = 1: For debugging and development. Use with caution in production due to the high volume.

- `Information` = 2: Tracks the general flow of the app. May have long-term value.

- `Warning` = 3: For abnormal or unexpected events. Typically includes errors or conditions that don't cause the app to fail. Potential issues

- `Error` = 4: For errors and exceptions that cannot be handled. These messages indicate a failure in the current operation or request, not an app-wide failure.

- `Critical` = 5: For failures that require immediate attention. Examples: data loss scenarios, out of disk space

- `None` = 6: Specifies that a logging category shouldn't write messages.

## Configuration

Logging related configurations for the application are present in the `appsettings.json` file:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  }
}
```

## Logging Providers

Logging providers stores or displays logs also known as **sinks**

The built-in Core logging providers:

- Console: logs output to the console

- Debug: Writes log output by using the `System.Diagnostics.Debug` class. Calls to `System.Diagnostics.Debug.WriteLine` write to the Debug provider (Debug window in Visual Studio)

- Event Source: The `EventSource` provider writes to a cross-platform event source with the name `Microsoft-Extensions-Logging`

- EventLog (Windows only): Sends log output to the Windows Event Log

- AzureAppServicesFile and AzureAppServicesBlob: Writes logs to text files in an Azure App Service app's file system and to blob storage in an Azure Storage account.

- Azure ApplicationInsights: Writes logs to Azure Application Insights.

Some 3rd party logging providers:

- [Serilog](https://github.com/serilog/serilog-aspnetcore)
- [NLog](https://github.com/NLog/NLog.Extensions.Logging)
- [Elmah.io](https://github.com/elmahio/Elmah.Io.Extensions.Logging)
- [Sentry](https://github.com/getsentry/sentry-dotnet)
- [GELF](https://github.com/mattwcole/gelf-extensions-logging)
- [JSNLog](https://github.com/mperdeck/jsnlog)
- [KissLog](https://github.com/KissLog-net/KissLog.Sdk)
- [Log4Net](https://github.com/huorswords/Microsoft.Extensions.Logging.Log4Net.AspNetCore)

In ASP.NET Core, by default `CreateBuilder` function adds the following logging providers

- Console
- Debug
- EventSource
- EventLog

We can override the provider and provide our own configurations:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Or

builder.Host.ConfigureLogging(logging =>
{
    logging.ClearProviders();
    logging.AddConsole();
});
```

## Create Logs

1. Create a logger, `ILogger<AboutModel>`, which uses a log category of the fully qualified name of the type `AboutModel`. The log category is a string that is associated with each log.

2. Call `LogInformation` to log at the Information level. The Log level indicates the severity of the logged event.

```csharp
public class AboutModel : PageModel
{
    private readonly ILogger _logger;

    public AboutModel(ILogger<AboutModel> logger)
    {
        _logger = logger;
    }
    public string ? Message { get; set; }

    public void OnGet()
    {
        Message = $"About page visited at {DateTime.UtcNow.ToLongTimeString()}";
        _logger.LogInformation(Message);
    }
}
```

## NLog

- Add `NLog` and `NLog.Web.AspNetCore` packages to the project
- Create `nlog.config` file in the root of your project
- Add the configurations like:

  ```xml
  <?xml version="1.0" encoding="utf-8" ?>
    <nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        autoReload="true"
        internalLogLevel="info"
        internalLogFile="internal-nlog.txt">

      <!-- enable asp.net core layout renderers -->
        <extensions>
            <add assembly="NLog.Web.AspNetCore" />
        </extensions>

        <!-- the targets to write to -->
        <targets>
            <!-- write logs to file  -->
            <target xsi:type="File" name="allfile" fileName="c:\temp\nlog-all-${shortdate}.log"
            layout="${longdate}|${event-properties:item=EventId_Id}|${level:uppercase=true}|${logger}|${message} ${exception:format=tostring}" />

          <!-- another file log, only own logs. Uses some ASP.NET core renderers -->
          <target xsi:type="File" name="ownFile-web" fileName="c:\temp\nlog-own-${shortdate}.log"
            layout="${longdate}|${event-properties:item=EventId_Id}|${level:uppercase=true}|${logger}|${message} ${exception:format=tostring}|url: ${aspnet-request-url}|action: ${aspnet-mvc-action}" />

            <!--Console Target for hosting lifetime messages to improve Docker / Visual Studio startup detection -->
          <target xsi:type="Console" name="lifetimeConsole" layout="${MicrosoftConsoleLayout}" />

            <target xsi:type="ColoredConsole" name="consoleTarget"  layout="${longdate} ${uppercase:${level}} ${message}" />
        </targets>

        <!-- rules to map from logger name to target -->
        <rules>
            <!--All logs, including from Microsoft-->
          <logger name="*" minlevel="Trace" writeTo="allfile" />

          <!--Output hosting lifetime messages to console target for faster startup detection -->
          <logger name="Microsoft.Hosting.Lifetime" minlevel="Info" writeTo="lifetimeConsole, ownFile-web" final="true" />

          <!--Skip non-critical Microsoft logs and so log only own logs (BlackHole) -->
          <logger name="Microsoft.*" maxlevel="Info" final="true" />
          <logger name="System.Net.Http.*" maxlevel="Info" final="true" />

          <logger name="*" minlevel="Trace" writeTo="ownFile-web" />

            <logger name="myLogger" minlevel="Debug" writeTo="consoleTarget" />
        </rules>
    </nlog>
  ```

  - `autoReload="true"`: This is a property that enables the ASP.NET Core Application to reload the config file during runtime on any detected changes in the settings.
  - `throwExceptions="false"`: Do not throw exception if the Nlog.config file is invalid in Production.

- Update the `program.cs`: Or just add `logging.AddNLog()`

  ```csharp
  public class Program
    {
        public static void Main(string[] args)
        {
            var logger = NLog.LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();

            try
            {
                logger.Debug("init main");
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception exception)
            {
                //NLog: catch setup errors
                logger.Error(exception, "Stopped program because of exception");
                throw;
            }
            finally
            {
                // Ensure to flush and stop internal timers/threads before application-exit (Avoid segmentation fault on Linux)
                NLog.LogManager.Shutdown();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.SetMinimumLevel(LogLevel.Trace);
                })
                .UseNLog();  // NLog: Setup NLog for Dependency injection
    }
  ```

- Configure `appsettings.json`: The Logging configuration specified in appsettings.json overrides any call to SetMinimumLevel. So either remove "Default": or adjust it correctly to your needs.

  ```json
  {
    "Logging": {
      "LogLevel": {
        "Default": "Trace",
        "Microsoft": "Warning",
        "Microsoft.Hosting.Lifetime": "Information"
      }
    },
    "AllowedHosts": "*"
  }
  ```

  - `appsettings.Development.json`: Use environment specific files to override logging configs

- Write logs user logs:

  ```csharp
  public class HomeController : Controller
  {
      private readonly ILogger<HomeController> _logger;

      public HomeController(ILogger<HomeController> logger)
      {
          _logger = logger;
          _logger.LogDebug(1, "NLog injected into HomeController");
      }

      public IActionResult Index()
      {
          _logger.LogInformation("Hello, this is the index!");
          return View();
      }
  }
  ```

## Structured Logging (Serilog)

- `Program.cs`

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        var configuration = new ConfigurationBuilder()
                        .AddJsonFile("appsettings.json")
                        .Build();

        Log.Logger = new LoggerConfiguration()
                    .ReadFrom.Configuration(configuration)
                    .CreateLogger();

        try
        {
            Log.Information("Application starting up");
            CreateHostBuilder(args).Build().Run();
        }
        catch (Exception ex)
        {
            Log.Fatal(ex, "The application failed to start correctly.");
        }
        finally
        {
            Log.CloseAndFlush();
        }
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .UseSerilog()
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}
```

- `appsettings.json`:

  ```json
  {
    "AllowedHosts": "*",
    "Serilog": {
      "Using": [],
      "MinimumLevel": {
        "Default": "Information",
        "Override": {
          "Microsoft": "Warning",
          "System": "Warning"
        }
      },
      "Enrich": [
        "FromLogContext",
        "WithMachineName",
        "WithProcessId",
        "WithThreadId"
      ],
      "WriteTo": [
        { "Name": "Console" },
        {
          "Name": "File",
          "Args": {
            "path": "E\\App\\log.txt",
            "outputTemplate": "{Timestamp:G} {Message}{NewLine:1}{Exception:1}"
          }
        },
        {
          "Name": "File",
          "Args": {
            "path": "E\\App\\log.json",
            "formatter": "Serilog.Formatting.Json.JsonFormatter, Serilog"
          }
        },
        {
          "Name": "Seq",
          "Args": {
            "ServerUrl": "http://localhost:8081"
          }
        }
      ]
    }
  }
  ```

- `app.UseSerilogRequestLogging();`

- Use [Seq](https://datalust.co/seq) for parsing and visualizing structured logs

## HTTP Logging

HTTP Logging is a middleware that logs information about HTTP requests and HTTP responses. HTTP logging provides logs of:

- HTTP request information
- Common properties
- Headers
- Body
- HTTP response information

HTTP Logging is valuable in several scenarios to:

- Record information about incoming requests and responses.
- Filter which parts of the request and response are logged.
- Filtering which headers to log.

HTTP Logging **can reduce the performance of an app**, especially when logging the request and response bodies.

::: tip NOTE
HTTP Logging can potentially log personally identifiable information (PII). Consider the risk and avoid logging sensitive information.
:::

Enabling HTTP logging:

```csharp
app.UseHttpLogging();
```

### Setup

- By default, HTTP Logging logs common properties for requests and responses such as:
  - path
  - status-code
  - headers

HTTP logging configurations are present in the `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information",
      "Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware": "Information"
    }
  }
}
```

HTTP Logging options:

```csharp
builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.All;
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.ResponseHeaders.Add("MyResponseHeader");
    logging.MediaTypeOptions.AddText("application/javascript");
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;

});
```

- `LoggFields`: An enum flag that configures specific parts of the request and response to log. `HttpLoggingOptions.LoggingFields`

- `RequestHeaders` and `ResponseHeaders`: Set of request and response headers that are allowed to be logged

## References

- [NLog Configuration File](https://github.com/NLog/NLog/wiki/Configuration-file)
- [Logging, Monitoring, and Telemetry in ASP.NET Core 6 with Serilog](https://www.youtube.com/watch?v=hJ0QHRV3RPQ)
