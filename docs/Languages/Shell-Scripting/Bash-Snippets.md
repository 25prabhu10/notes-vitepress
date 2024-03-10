---
title: Bash Snippets
description: Collection of CLI applications and commands.
---

# Bash Snippets

## General

1. Find difference in output of two shell commands:

   ```bash
   diff <(ls) <(ll)

   # or to see all the difference similar to (n)vim -d (diff)
   nvim <(pacman -Qi nvim) <(pacman -Si nvim)
   ```

2. Upload files and share for free (limit 10GB):

   ```bash
   curl --upload-file ./hello.txt https://transfer.sh/hello.txt
   ```

3. Translate or delete charaters:

   ```bash
   echo $PATH
   # /home/prabhu/.local/bin:/usr/local/sbin

   echo $PATH | tr ':' '\n'
   # /home/prabhu/.local/bin
   # /usr/local/sbin
   ```

4. Columnate lists:

   ```bash
   mount | column -t
   ```

[Arch Webcam Setup](https://wiki.archlinux.org/title/webcam_setup)

## Images

- Compress image:

  ```bash
  magick -format jpg -quality 50 /path/to/image.svg /path/to/image.jpg

  # or

  mogrify -compress JPEG -quality 50 /path/to/image.jpg

  # or

  convert -strip -interlace Plane -gaussian-blur 0.05 -quality 85% /path/to/source/image.jpg /path/to/result/image.jpg

  # or

  jpegoptim --size=512k /path/to/image.jpg
  ```

- Compare images: using [Image magick compare](https://imagemagick.org/script/compare.php)

  ```bash
  magick compare image1.jpg image2.jpg diff.png
  ```

## 7z

- 7z with ultra compression:

  ```bash
  7z a -t7z -m0=lzma -mx=9 -mfb=64 -md=32m -ms=on archive.7z dir1
  ```

## PDF

- PDF to image:

  ```bash
  # pdftoppm <image_format> <input_pdf> <image_output>

  pdftoppm -png resume.pdf resume.png

  # by default it will output 100 DPI, which can be increased
  pdftoppm -png -rx 300 -ry 300 resume.pdf resume.png
  ```

## ffmpeg

- Simple conversion of videos:

  ```bash
  ffmpeg -i input.mp4 output.mp4
  ```

[ffmpeg documentation](../../Collection/FFmpeg.md)

## mpv

Use mpv to take snapshots from webcam:

```bash
mpv av://v4l2:/dev/video0 --profile=low-latency --untimed
```

To use MJPEG as the pixelformat instead of the default, which in most cases is YUYV, you can run the following instead:

```bash
mpv --demuxer-lavf-format=video4linux2 --demuxer-lavf-o-set=input_format=mjpeg av://v4l2:/dev/video0
```

In some cases this can lead to drastic improvements in quality and performance (_5 FPS_ -> _30 FPS_ for example), [see the mpv documentation](https://github.com/mpv-player/mpv/wiki/Video4Linux2-Input)

## Python

### pip

- pip batch update:

  ```bash
  pip install -U `pip list --outdated | tail -n +3 | awk '{print $1}'`
  ```

## Manjaro

### Pacman

- List all installed packages sorted by size:

  ```bash
  pacman -Qi | awk '/^Name/{name=$3} /^Installed Size/{print $4$5, name}' | sort -h
  ```

- Clear _pacman_ cache

  ```bash
  # get total cached packages
  sudo ls /var/cache/pacman/pkg/ | wc -l

  # get total cache size
  du -sh /var/cache/pacman/pkg/

  # clean all packages, expect the 3 most recent versions
  sudo paccache -r

  # clean all packages, expect the n most recent versions
  sudo paccache -rk n

  # remove all uninstalled packages
  sudo paccache -ruk0

  # OR
  sudo pacman -Sc

  # remove all installed and uninstalled package cache
  sudo pacman -Scc
  ```

- Alternative create a hook to auto clean cache

  ```bash
  sudo vi /etc/pacman.d/hooks/clean_package_cache.hook
  ```

  ```text
  [Trigger]
  Operation = Upgrade
  Operation = Install
  Operation = Remove
  Type = Package
  Target = *
  [Action]
  Description = Cleaning pacman cache...
  When = PostTransaction
  Exec = /usr/bin/paccache -r
  ```

> Refer: [Recommended ways to clean cache](https://ostechnix.com/recommended-way-clean-package-cache-arch-linux/)

## Starship Prompt

[Starship](https://starship.rs/) is a minimal, blazing-fast, and infinitely customizable cross-shell prompt for any shell

### Installation Linux

1. Install/Update the latest version:

   ```bash
   curl -sS https://starship.rs/install.sh | sh
   ```

2. Add the following to the end of `~/.bashrc` or `~/.zshrc`:

   ```bash
   eval "$(starship init bash)"
   # -- or --
   eval "$(starship init zsh)"
   ```

## OpenSSH

Known Hosts

- Remove Entry from the Known-Hosts File:

```bash
ssh-keygen -R hostname
```

Using the SSH Config File

If you are regularly connecting to multiple remote systems over SSH, you can configure your remote servers with the `.ssh/config` file

_Example:_

```ini
Host dev
    HostName dev.your-domain
    User xcad
  Port 7654
    IdentityFile ~/.ssh/targaryen.key
Host *
    User root
    Compression yes
```

Connect to a host (like `dev` , eg.) with `ssh dev`

## OpenSSL

- Generate a DKIM private and public keypair:

```bash
openssl genrsa -out dkim_private.pem 2048

openssl rsa -in dkim_private.pem -pubout -outform der 2>/dev/null | openssl base64 -A
```

## KDE

### Baloo File Indexer

- Disable it

  ```bash
  balooctl suspend
  balooctl disable
  ```
