---
title: Deployment
description: Deploying ASP.NET Core Applications
---

# Deploying ASP.NET Core Applications

Backend:

- Health Checks
- Authentication
- Logger
- Testing Framework

Frontend:

- Stubbing
- Storybook
- Linting
- Testing Framework

## Server Choices

ASP.NET Core applications themselves run as a self-contained process with the help of a server library. If you've developed self-hosted OWIN (Open Web Interface for .NET) applications in the past with ASP.NET, you'll find this pattern familiar. The server itself contains the code that translates raw HTTP requests into the structures that ASP.NET Core is looking for

1. [IIS](./IIS.md)

   - IIS Express

2. `HTTP.sys`

   - Windows only
   - Supports Windows authentication

3. [Kestrel](#kestrel)

   - Cross-platform
   - Highly optimized
   - Recommended

Handling Internet traffic:

- Server directly (edge server): Can be used for simple applications

  - Internet --> Application code: Server (Kestrel or HTTP.sys)
  - App server configured for HTTPS and listening for connections
  - Not good for large applications:

    - Hard to scale
    - No easy way to balance load and send traffic to another server

- Behind a Reverse Proxy or Load Balancer:

  - Internet --> Reverse proxy --> Application code: Server (Kestrel or HTTP.sys)
  - Reverse Proxies like IIS/Nginx
  - Reverse Proxy acts as a load balancer
  - Reverse Proxies configured for HTTPS and listening for connections

### Kestrel

- Fast, open-source, cross-platform web server based on `libuv`
- It is a light weight web server, it can only execute the requests. So external web server is used to configure security, hashing, etc.
- Not used directly in production in production

## Deployment Strategies

- Windows/Azure using IIS: Copy binaries manually

  - IIS acting as reverse proxy to Kestrel

- On a Linux server using Kestrel plus a reverse proxy like Apache or NGINX: Copy binaries manually

- Azure app service: Copy binaries or continuous integration

- Linux using Docker (or other containers): Kestrel on Docker container

Launch settings:

- Profiles are configured with `Properties/launchSettings.json` (edit directly the JSON or project properties)

  - Running an IIS simulates a deployment to a Windows server, using both IIS and Kestrel and tying them together with a reverse proxy.

  - Running in Kestrel is useful for development purposes because of all the extra logging that gets output in the console window.

There are 2 types of web servers:

1. The external web server like (IIS, Apache, etc.) and internal web server hosted by the application like Kestrel. We can use any external or internal servers.

2. We use _Kestrel_ as it has a first class support in ASP.NET Core.

- Classic System relied heavily on `System.web`, which was tied to _IIS_ and _IIS_ is tied to windows.
- That is the reason Classic System cannot be run on servers other than _IIS_ or _Windows_.

### Portable or Stand-Alone Deployment

- .NET Core supports true side-by-side installation of the platform:

  - Installation of additional versions won't affect previously installed versions

- Portable deployments rely on the framework pre-installed:

  - Only deploy application-specific libraries

- Stand-alone deployments contain required:

  - Application files
  - Framework (CoreFX, CoreCLR) files

## Environments

- Development
- Testing
- Staging (Production like)
- Production

`IWebHostEnvironment` determines which environment it's running in by examining an environment variable called `ASPNETCORE_ENVIRONEMT`

- This environment variable value is saved in `Properties/launchSettings.json`

## Project Dependencies

The `.csproj` file defines:

- The dependencies for your application
- What framework you're building against
- It also can be used to include or exclude additional files from the publishing process. Such as static files that are outside the `wwwroot` folder
- Static files placed outside the `wwwroot` folder will not be automatically included in the published site

To add these files: These settings will be included in every publish profile

```xml
<ItemGroup>
   <!-- INCLUDE FILES -->
   <ResolvedFileToPublish Include="README.md">
      <RelativePath>wwwroot\README.md</RelativePath>
   </ResolvedFileToPublish>
   <!-- EXCLUDE FILES -->
   <Content Update="wwwroot\**\*.txt" CopyToPublishDirectory="Never"></Content>
</ItemGroup>
```

## HTTPS

1. HTTPS on edge servers (Kestrel):

   - ASP.NET Core project templates use Kestrel by default when not hosted with IIS. In `Program.cs`:

     - (v3+) The `ConfigureWebHostDefaults` method calls `UseKestrel` internally:

       ```csharp
       public static void Main(string[] args) {
          CreateHostBuilder(args).Build().Run();
       }

       public static IHostBuilder CreateHostBuilder(string[] args) =>
          Host.CreateDefaultBuilder(args)
          .ConfigureWebHostDefaults(webBuilder => {
             webBuilder.UseStartup < Startup > ();
          });
       ```

     - (v6+) The `WebApplication.CreateBuilder` method calls `UseKestrel` internally:

       ```csharp
       var builder = WebApplication.CreateBuilder(args);
       var app = builder.Build();

       app.MapGet("/", () => "Hello World!");

       app.Run();
       ```

   To add Client certificate:

   1. Create a certificate

      ```bash
      makecert -sv [YourName].pvk -n "CN=[YourCN]" [YourCertName].cer -r

      # you will be prompted for a password (twice)

      pvk2pfk -pvk [YourName].pvk -spc [YourCertName].cer -pfx [YourName].pfx -pi [password]

      # pvk2pfx gets installed to %ProgramFiles(x86)%Windows Kits\10\bin\10.0.16299.0\x64
      ```

   2. Add SSL configurations:

      ```csharp
      public class Program {

         public static void Main(string[] args) {
            var cert = new X506Certificate2("PfjEnterprises.pfx", Secrets.PASSWORD);
            var host = new WebHostBuilder()
                  // .UseKestrel()
                  .UseKestrel(cfg => cfg.UseHttps(cert))
                  .UseUrls("http://_:6001;https://_:6002")
                  .UseContentRoot(Directory.GetCurrentDirectory())
                  .UseIISIntegration()
                  .UseStartup < Startup > ()
                  .UseApplicationInsights()
                  .Build();
            host.Run();
         }
      }
      ```

   3. Using SSL Locally

2. HTTPS on reverse proxy servers (Apache or Nginx): Instead of copying a certificate to and adding the right configuration to each server, you only need to configure the certificate at the reverse proxy level.

   - When a new connection arrives, the proxy handles the HTTPS connection, then it turns around and makes an unencrypted HTTP connection internally to your web servers.
   - That way your web servers let the proxy do all the work and don't have to worry about HTTPS and certificates and encryption.
   - Their responses are relayed back over HTTPS by the proxy.
   - The proxy or load balancer will include one or more headers on the internal HTTP connection so that your web servers can understand if requests started on HTTPS.
   - It's important to configure ASP.NET Core to look for these forwarded headers:

     - `X-Forwarded-For: 203.0.113.195`
     - `X-Forwarded-Host: example.io`
     - `X-Forwarded-Proto: https`

   - `ForwardedHeadersMiddleware`, reads these headers and fills in the associated fields on `HttpContext`.

   - Forwarded Headers Middleware is enabled by default by IIS Integration Middleware when the app is hosted out-of-process behind IIS and the ASP.NET Core Module.

   - For other proxies: **Forwarded Headers Middleware should run before other middleware**.

     ```csharp
     public void ConfigureServices(IServiceCollection services)
       {
         services.Configure<ForwardedHeadersOptions>(options =>
         {
            options.ForwardedHeaders =
                  ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
         });
       }

       public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
       {
         app.UseForwardedHeaders();
       }
     ```

## Deploying In IIS

Setup IIS:

1. Install IIS (if necessary)
2. Install .NET Core hosting bundle
3. Restart IIS

Create a Site and Application Pool:

- Open IIS Manager
- Create a new site (Sites --> Add Website)

  - Site Name:
  - Application Pool: (site name)
  - Physical path: (path of the files and binaries of the website)
  - Host name: (localhost)

- Modify the new Application Pool:

  - Basic Settings --> .NET CLR Version: No Manage Code
  - For ASP.NET Core, IIS will not actually be hosting or running any of the application code itself, unlike previous versions. This will be managed by Kestrel, IIS needs to simply forward along requests

Setup Data Protection:

- ASP.NET Core uses the _Windows Data Protection API (DPAPI)_ to encrypt and store keys that are used for authentication in your application. Windows DPAPI isn't intended for use in web applications

- When hosting your application with IIS, you'll need to run a small script to create a registry hive for these keys, otherwise the keys will be regenerated when you restart the application or your server, which will invalidate any user sessions or cookies that were encrypted with the previous old keys

[Data protection](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/?view=aspnetcore-3.1#data-protection)

- Download the [Provision-AutoGenKeys.ps1](https://github.com/dotnet/AspNetCore/blob/main/src/DataProtection/Provision-AutoGenKeys.ps1) script
- Run this script in admin mode:

  - Now elevate this PowerShell window to give it the remote signed execution policy, which allows the execution of that script

    ```powershell
    powershell -ExecutionPolicy RemoteSigned
    ```

  - Execute the script:

    ```powershell
    .\Provision-AutoGenKeys.ps1 [name of the site]
    ```

Publishing Application:

1. With Visual Studio:

   - Open the Publish wizard (Create a publish profile)

   - Pick a publish target:

     - Example: Folder --> select the folder mentioned in the IIS Application Pool --> Physical path

2. Via the CLI:

   ```powershell
   # restore nuget packages
   dotnet restore

   dotnet build

   dotnet publish -c Release
   ```

   - Binaries will be placed in `ProjectFolder/bin/Release/[CoreVersion]/publish/`
   - Copy these files to the folder mentioned in the IIS Application Pool --> Physical path

`Web.config` file is generated when application is published:

- It is not used for the application configuration (as it was in ASP.NET Framework), `appsettings.json` is used now
- IIS still needs `Web.config`, even if ASP.NET Core isn't using it
- Configures the ASP.NET Core module (reverse proxy)
- Is automatically created for you by `dotnet publish` or Visual Studio
- Must be in the application root folder

## Deploying To Azure

- Create an Azure account
- Install Azure SDK for Visual Studio

Azure App Service:

- It is a manage hosting service for your application

- Open the Publish wizard (Create a publish profile)

- Pick a publish Profile --> Microsoft Azure App Service --> Login
- Create a new resource group, new App Service plan
- Publish --> Visual Studio will deploy the application to Azure

Setup Continuous Deployment from source control repository:

## Deploying To Linux

- ASP.NET Core applications can run directly on Linux

1. Install .NET Core Runtime packages for Linux machine
2. Use dotnet CLI to build, run and publish your application
3. Copy the build artifacts (files and directories) to the `/var/websites` or `/var/wwwroot` directory

   ```bash
   sudo cp -r publish/* /var/websites/HelloCoreWorld/
   ```

4. Run the application: `dotnet HellCoreWorld.dll`
5. This will start the Kestrel server

Adding Nginx Reverse Proxy:

1. Install Nginx on the Linux machine
2. Start Nginx:

   ```bash
   sudo service nginx start
   ```

3. Configure Nginx:

   ```bash
   cd /etc/nginx/sites-available/

   # Take a backup of default configuration
   mv sudo cp default default.backup

   # Update the configuration
   sudo vi default
   ```

   ```nginx
   # simple reverse-proxy
   server {
       listen        80;
       server_name   example.io *.example.io;

       location / {
           proxy_pass         http://127.0.0.1:5000;
           proxy_http_version 1.1;
           proxy_set_header   Upgrade $http_upgrade;
           proxy_set_header   Connection keep-alive;
           proxy_set_header   Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header   X-Forwarded-Proto $scheme;
       }
   }
   ```

4. Text the configurations: `sudo nginx -t`
5. On a production server, it's important to set the `server_name` property as well to the domain name that your site will be hosted on.
6. Reload Nginx: `sudo nginx -s reload`

Nginx starts up automatically when the machine boots, but Kestrel and the application have to be started manually:

- Use `systemd` tool to make sure that Kestrel starts hosting your application whenever the machine boots

1. Create a service definition file:

   ```bash
   sudo vi /etc/systemd/system/hellocoreworld.service
   ```

   ```systemd
   [Unit]
   Description=Example ASP.NET web app running on Ubuntu

   [Service]
   WorkingDirectory=/var/websites/HelloCoreWorld
   ExecStart=/usr/bin/dotnet /var/websites/HelloCoreWorld/HelloCoreWorld.dll
   Restart=always
   RestartSec=10
   SyslogIdentifier=hellocoreworld
   User=user or serviceaccount
   Environment=ASPNETCORE_ENVIRONEMT=Production
   Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

   [Install]
   WantedBy=multi-user.target
   ```

2. Enable the service

   ```bash
   systemctl enable hellocoreworld.service
   ```

3. Start the service:

   ```bash
   systemctl start hellocoreworld.service

   # Check the status
   systemctl status hellocoreworld.service
   ```

## Deploying With Docker

On normal server to host any application, things need to be done, Like:

- Install .NET
- Install 3rd-party libraries
- Set up Nginx
- Add Environment Variables
- Run application

These things need to be done on each server, thus adding and maintaining server becomes a complex task

Benefits of Docker:

- Servers are standardized
- Declarative server and application configuration recipe
- Docker Image = fundamental unit of deployment
- Containers can be duplicated easily

1. Install Docker
2. Create the `Dockerfile` at the root of the project

   ```dockerfile
   # syntax=docker/dockerfile:1
   FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
   WORKDIR /app

   # Copy csproj and restore as distinct layers
   COPY *.csproj ./
   RUN dotnet restore

   # Copy everything else and build
   COPY .. ./
   RUN dotnet publish -c Release -o out

   # Build runtime image
   FROM mcr.microsoft.com/dotnet/aspnet:6.0
   WORKDIR /app
   COPY --from=build-env /app/out .
   ENTRYPOINT ["dotnet", "hellocoreworld.dll"]
   ```

3. Build the Docker Image:

   ```bash
   docker build -t [username/image name] .

   # check if image was created
   docker image ls
   ```

4. Run the newly created Docker Image:

   ```bash
   # in development environment
   docker run -it -p 5000:5000 [image name]

   # production
   docker run -d -p 5000:5000 [image name]

   # monitor docker status
   docker ps

   # docker ps --format 'table {{.Names}}\t{{.Images}}\t{{.Status}}\t{{.Ports}}'
   ```

5. Shut the container down:

   ```bash
   docker stop [image name]
   ```

Create Nginx Docker Containers:

1. Create a `Dockerfile` for Nginx in the project: `/nginx/Dockerfile`

   ```dockerfile
   FROM nginx
   COPY nginx.conf /etc/nginx/nginx.conf
   ```

2. Create `nginx.conf` file:

   ```nginx
   events { worker_connections 1024; }

   http {
    server {
        listen        80;
        server_name   example.io *.example.io;

        location / {
            proxy_pass         http://kestrel:5000;
            proxy_http_version 1.1;
            proxy_set_header   Upgrade $http_upgrade;
            proxy_set_header   Connection keep-alive;
            proxy_set_header   Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto $scheme;
        }
    }
   }
   ```

3. Docker Compose needs a set of instructions that tells Compose how to structure our multi-container application. Create `docker-compose.yml` file at the root of the project;

   ```yaml
   ngnix:
     build: ./ngnix
     ports:
       - "80:80"
     links:
       - kestrel:kestrel
   kestrel:
     build: .
     ports:
       - "5000"
   ```

4. Run `docker-compose` from the root of the project

   ```bash
   docker-compose up
   ```

Save the images that we created, so that it can be shared and loaded on other machines:

```bash
docker save -o [output-image-name].tar [image-name]

# load image
docker load -i [output-image-name].tar
```
