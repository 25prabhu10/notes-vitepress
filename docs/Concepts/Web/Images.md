---
title: Image
description: Image formates and compression
---

# Image

## JPEG Tools

1. [openjpeg](https://github.com/uclouvain/openjpeg)

   - `opj_compress`
   - Converts `*.pnm, *.pgm, *.ppm, *.pgx, *png, *.bmp, *.tif, *.raw or *.tga` formats into `jpeg`.

2. [libjpeg-turbo](https://github.com/libjpeg-turbo/libjpeg-turbo)

   - Used by `mozjpeg`
   - `cjpeg [options] [filename] > [output filename]`

3. [guetzli](https://github.com/google/guetzli)

   - Slow

4. [mozjpeg](https://github.com/mozilla/mozjpeg)

   - Based on `libjpeg-turbo`.
   - Good quality and fast.

5. [imagemagick](https://github.com/imagemagick/imagemagick)

   - All in one image converter
   - `convert [options] [filename]`
   - `magick` alias
   - Other tools
