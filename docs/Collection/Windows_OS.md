---
title: Windows OS
description: Windows OS
---

# Windows OS

## Windows Quirks

Collection of windows quirks.

1. **`Con`, `aux`, `prn`, `lst`, `com0 to com9`, `Lpt0 to ltp9`, `null`** cannot be used as name for files and folders in windows. Because all those names for device files in MS dos

2. In **Excel 29th February 1900** is a valid date, which is not

## PowerShell

PowerShell is a task automation and configuration management program from Microsoft, consisting of a command-line shell and the associated scripting language

PowerShell was made open-source and cross-platform with PowerShell Core, and can be installed on multiple operating systems

Install PowerShell [Windows](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows)

PowerShell Remote Access Open new Remote Session:

```powershell
Enter-PSSession -ComputerName <SERVER> -Credential <USERNAME>
```

## Environment Variables

Environment Variables can be used in PowerShell with the prefix `$env:`

_Example:_

- Variable: `%APPDATA%`
- In PowerShell: `$env:APPDATA`
- In CMD: `echo %APPDATA%`

### List of environment variables

| Variable                      | Description                                                              |
| ----------------------------- | ------------------------------------------------------------------------ |
| `%ALLUSERSPROFILE%`           | `C:\ProgramData`                                                         |
| `%APPDATA%`                   | `C:\Users\{username}\AppData\Roaming`                                    |
| `%COMMONPROGRAMFILES%`        | `C:\Program Files\Common Files`                                          |
| `%COMMONPROGRAMFILES(x86)%`   | `C:\Program Files (x86)\Common Files`                                    |
| `%CommonProgramW6432%`        | `C:\Program Files\Common Files`                                          |
| `%COMSPEC%`                   | `C:\Windows\System \cmdexe`                                              |
| `%HOMEDRIVE%`                 | `C:\`                                                                    |
| `%HOMEPATH%`                  | `C:\Users\{username}`                                                    |
| `%LOCALAPPDATA%`              | `C:\Users\{username}\AppData\Local`                                      |
| `%LOGONSERVER%`               | `\\{domain_logon_server}`                                                |
| `%PATH%`                      | `C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem`                |
| `%PathExt%`                   | `.com;.exe;.bat;.cmd;.vbs;.vbe;.js;.jse;.wsf;.wsh;.msc`                  |
| `%PROGRAMDATA%`               | `C:\ProgramData`                                                         |
| `%PROGRAMFILES%`              | `C:\Program Files`                                                       |
| `%ProgramW6432%`              | `C:\Program Files`                                                       |
| `%PROGRAMFILES(X86)%`         | `C:\Program Files (x86)`                                                 |
| `%PROMPT%`                    | `$P$G`                                                                   |
| `%SystemDrive%`               | `C:`                                                                     |
| `%SystemRoot%`                | `C:\Windows`                                                             |
| `%TEMP%`                      | `C:\Users\{username}\AppData\Local\Temp`                                 |
| `%TMP%`                       | `C:\Users\{username}\AppData\Local\Temp`                                 |
| `%USERDOMAIN%`                | Userdomain associated with current user                                  |
| `%USERDOMAIN_ROAMINGPROFILE%` | Userdomain associated with roaming profile                               |
| `%USERNAME%`                  | `{username}`                                                             |
| `%USERPROFILE%`               | `C:\Users\{username}`                                                    |
| `%WINDIR%`                    | `C:\Windows`                                                             |
| `%PUBLIC%`                    | `C:\Users\Public`                                                        |
| `%PSModulePath%`              | `%SystemRoot%\system32\WindowsPowerShell\v1.0\Modules\`                  |
| `%OneDrive%`                  | `C:\Users\{username}\OneDrive`                                           |
| `%DriverData%`                | `C:\Windows\System32\Drivers\DriverData`                                 |
| `%CD%`                        | Outputs current directory path (cmd)                                     |
| `%CMDCMDLINE%`                | Outputs command line used to launch current Command Prompt session (cmd) |
| `%CMDEXTVERSION%`             | Outputs the number of current command processor extensions (cmd)         |
| `%COMPUTERNAME%`              | Outputs the system name                                                  |
| `%DATE%`                      | Outputs current date (cmd)                                               |
| `%TIME%`                      | Outputs time (cmd)                                                       |
| `%ERRORLEVEL%`                | Outputs the number of defining exit status of previous command (cmd)     |
| `%PROCESSOR_IDENTIFIER%`      | Outputs processor identifier                                             |
| `%PROCESSOR_LEVEL%`           | Outputs processor level                                                  |
| `%PROCESSOR_REVISION%`        | Outputs processor revision                                               |
| `%NUMBER_OF_PROCESSORS%`      | Outputs the number of physical and virtual cores                         |
| `%RANDOM%`                    | Outputs random number from `0` through `32767`                           |
| `%OS%`                        | Windows_NT                                                               |

## Chocolatey

[Chocolatey](https://chocolatey.org) is a machine-level, command-line package manager and installer for Windows software

Installation:

1. Check the Execution Policy:

   - Run `Get-ExecutionPolicy`
   - If it returns `Restricted`, then run `Set-ExecutionPolicy AllSigned` or `Set-ExecutionPolicy Bypass -Scope Process`

2. Install Chocolatey:

   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

3. Check if you install chocolatey

   ```powershell
   choco -?
   ```

- Install software package:

```powershell
choco install <package>
```

## `Certutil`

`Certutil.exe` is a command-line program for Windows, installed as part of Certificate Services. You can use `certutil.exe` to dump and display certification authority (CA) configuration information, configure Certificate Services, backup and restore CA components, and verify certificates, key pairs, and certificate chains

```powershell
# WIP
certutil -addstore -f "ROOT" new-root-certificate.crt
certutil -delstore "ROOT" serial-number-hex
```

## WSL

### Backup and Restore WSL

- Listing Running Distros:

  ```powershell
  wsl --list --verbose
  ```

- Starting/Restarting a Distro:

  ```powershell
  wsl --distribution DISTRO-NAME
  ```

- Terminate a Running Distro:

  ```powershell
  wsl --t DISTRO-NAME
  ```

- Terminate All Running Distros and WSL process:

  ```powershell
  wsl --shutdown
  ```

- Backup a WSL Distro:

  ```powershell
  wsl --export (distribution) (filename.tar)
  ```

- Restore a WSL Distro from Backup:

  ```powershell
  wsl --import (distribution) (install location) (file location and filename)
  ```

### Symbolic Links

- Link `.ssh` folder:

  ```bash
  sudo ln -s /mnt/c/Users/lempa/.ssh ~/.ssh
  ```

- Link `.kube` folder:

  ```bash
  sudo ln -s /mnt/c/Users/lempa/.ssh ~/.ssh
  ```

### File Permissions

Advanced settings configuration in WSL: [WSL Config Parameters](https://docs.microsoft.com/en-us/windows/wsl/wsl-config)

_Example:_ `wsl.conf`

```bash
[automount]
enabled = true
options = "metadata,uid=1000,gid=1000,umask=077,fmask=11,case=off"
mountFsTab = true

[interop]
enabled = false
appendWindowsPath = false
```

### Networking

PortForwarding

- Find IP Address

  ```powershell
  bash.exe -c "ifconfig eth0 | grep 'inet '"
  ```

- Add PortForwarding

  ```powershell
  $port = 8080
  $remoteaddr = 0.0.0.0
  netsh interface portproxy add v4tov4 listenport=$port connectport=$port connectaddress=$remoteaddr
  netsh advfirewall firewall add rule name=$port dir=in action=allow protocol=TCP localport=$port
  ```

- Delete PortForwarding

  ```PowerShell
  $port = 8080
  netsh interface portproxy delete v4tov4 listenport=$port
  netsh advfirewall firewall delete rule name=$port
  ```

- Show PortForwarding

  ```powershell
  netsh interface portproxy show v4tov4
  ```

### Linux desktop in WSL2

With WSL2 it's possible to install and run a Linux desktop environment (XFCE). A tutorial on how
to implement that, can be found [here](https://thedatabaseme.de/2022/05/15/shorty-running-xfce-linux-desktop-on-wsl2/).

## Windows Updates

- Install Windows Update:

```powershell
Install-Module -Name PSWindowsUpdate
```

- List all Commands:

```powershell
Get-Command -module PSWindowsUpdate

Get-WUInstall
```
