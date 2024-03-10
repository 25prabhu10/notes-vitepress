---
title: Internet Information Services (IIS)
description: IIS is an extensible web server software
---

# IIS

Internet Information Services (IIS)

- IIS is a windows component that works as a web-server.

- It hosts both HTTP and FTP on the server.

- IIS Express is light weight and is used for local development.

- `w3wp.exe` worker process

## Setup

Enable (install) IIS from Control Panel:

- Control Panel --> Turn Windows features on or off --> Enable Internet Information Services (IIS)

- `w3wp.exe`: worker process

## Application Pool

- Isolation between websites

Web Platform Installer to install tools

## IIS Express

IIS Express is a lightweight self-contained version of IIS, optimized for developing applications

- Visual Studio uses IIS Express for development
- `iisexpress.exe` worker process
- Not used in production
