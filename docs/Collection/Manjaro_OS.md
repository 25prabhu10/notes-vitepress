---
title: Manjaro OS
description: Free fast, arch Linux based operating system.
---

# Manjaro OS

Things to do after installing _Manjaro OS_.

## Disable Start-Up Process

1. Stop and disable **Bluetooth**:

   ```bash
   sudo systemctl stop bluetooth.service
   sudo systemctl disable bluetooth.service
   systemctl status bluetooth.service
   ```

   ::: tip REFERENCE
   [Cleaning Your Linux Startup Process](https://www.linux.com/topic/desktop/cleaning-your-linux-startup-process/)
   :::

2. To stop other service to start Bluetooth, mask it using `sudo systemctl mask bluetooth.service`

## Dual Booting OS

Dual boot windows and linux

### Remove Linux From Dual Boot

Here are two methods to remove the OS.

#### Method 1

1. Boot into _Windows 10_.
2. Go to **Disk Management**.
3. Delete the drive(s) containing the _Linux OS_.
4. Delete the **Free Partition**.
5. Then rebuild **`mbr`**.

#### Method 2

1. `shift + Restart` -> Troubleshoot -> Advanced options -> `cmd` -> then type:

   ```bash
   bootrec /fixmbr
   bootrec /fixboot
   bootrec /scanos
   bootrec /rebuildbcd
   ```

2. `bcdedit /enum all`

3. `bcdedit /delete identifier`
