---
title: Modern Image Delivery Techniques
description: Modern Image Delivery Techniques
---

# Modern Image Delivery Techniques

You want your website to be blazing fast, so you have minified and compressed all the files delivered to the user. But still there is a significant delay in page loading time. This is because of the images being used on the web page.

According to some analysis of website loading time, it was concluded that nearly 50% of the network traffic was being consumed by the images. Which requires is a lot of network bandwidth. So, to improve the page load time we need to optimize the images and the way they are being delivered.

As per google lighthouse, here are 4 Simple ways of Image Optimizations

1. [Quality](#quality)
2. [Formats](#formats)
3. [Sizing - Image Dimensions](#sizing-image-dimensions)
4. [Lazy Loading](#lazy-loading)

Websites to test web page performance:

- [Google Lighthouse](https://web.dev/measure/) - Run tests on your web page online, you can use Chrome dev tools to run lighthouse locally.

- [WEBPAGETEST](https://www.webpagetest.org/) - Run tests on your web page

- [httparchive](https://httparchive.org/) - Test reports of millions of pages

Network Info can help in image optimization, like check if the user's network is slow, then we can send smaller images or less images.

- `navigator.connection.type;` - Network type that browser uses

- `navigator.connection.downlink` - Effective bandwidth estimate

- `navigator.connection.rtt` - Effective round-trip time estimate

- `navigator.connection.downlinkMax` - Upper bound on the downlink speed of the first network hop

Avoid Base 64 Encoding (Images embedded as Base64 in HTML/CSS/JS) because:

- Images Block the Rendering of the Page
- Images are 20-30% larger
- Caching is limited
- Difficult to reference more than once
- The only advantage of this is Fewer Request

## Quality

Quality of the images matter, a blurry or pixelated image depletes the user experience. So, we want to delivery images which have the similar image quality of the original but are much smaller in size.

- Lighthouse Recommends 85% quality on all images

- Example:

  ```bash
  magick --quality 85 riga.jpg riga85.jpg
  ```

- Online tools can also be used like:

  - [Cloudinary Image Optimization](https://res.cloudinary.com/demo/image/upload/q_60/sample.jpg)

- Instead of setting the quality to fixed, we can use automated quality finders like:

  - Butteraugli

  - SSIM: Structural SIMilarity

  - [cjpeg-dssim](https://github.com/technopagan/cjpeg-dssim)

    ```bash
    cjpeg-dssim jpegoptim riga.jpg
    ```

  - [Cloudinary Auto Quality](https://res.cloudinary.com/demo/image/upload/q_auto/sample.jpg)

- Pages to refer:

  - [Lighthouse Optimize Images](https://developers.google.com/web/tools/lighthouse/audits/optimize-images)
  - [Google Insights Optimize Images](https://developers.google.com/speed/docs/insights/OptimizeImages)

## Formats

Some of the most commonly used image formats on web are:

### **JPEG** - Most widely used

### **PNG** - Used mainly for logos and place where image background transparency is needed

- Convert PNG to JPEG if no special requirement is there.
- Use WebP image format if transparency is required, **Use a backup PNG `src` as WebP is not yet widely supported as of now**.

### **WebP** - Alternative to _JPEG_/_PNG_

- Smaller file sizes compared to JPEG and PNG.

- It can be used for both lossy (JPEG) and losses (PNG) image compression.

- It also supports transparency like PNG.

- _Less support as of now_, we can use JPEG/PNG as a fall back image:

  ```html
  <picture>
    <source width="100%" type="image/webp" srcset="riga.webp" />
    <img width="100%" src="riga_cjpeg_dssim.jpg" alt="Riga, Lativa" />
  </picture>
  ```

### **GIF** - Short animations

According the GIF89a Specification the GIF is not intended for animations.

As a result when a video is converted to GIF the file size increase.

So most of the websites like twitter, Facebook etc,. Use video files for animations as they are much smaller than GIF's. These video files can be of MP4 or WebM format.

Some tips to convert GIF to videos:

- Reduce the video colours to 256 colours (GIF supports only 256 colours).

- Remove audio.

- Using [FFmpeg](https://www.ffmpeg.org/) tool to convert GIF to an MP4 or a WebM video, like:

  ```bash
  ffmpeg -i my-animation.gif -b:v 0 -crf 25 -f mp4 -vcodec libx264 -pix_fmt yuv420p my-animation.mp4
  ```

  ```bash
  ffmpeg -i my-animation.gif -c:v libvpx-vp9 -b:v 0 -crf 41 my-animation.webm
  ```

  > WebM is a relatively new file format and WebM videos are much smaller than MP4 videos

  ::: warning

  Not all browsers support WebM so it makes sense to generate both.

  :::

- Usage:

  ```html
  <video loop autoplay muted playsinline controls="false" src="goats.mp4" />
  ```

  OR

  ```html
  <picture>
    <source type="video/mp4" srcset="goats.mp4" />
    <source type="image/webp" srcset="goats.webp" />
    <img src="goats.gif" alt="Goat" />
  </picture>
  ```

  OR

  ```html
  <video autoplay loop muted playsinline>
    <source src="my-animation.webm" type="video/webm" />
    <source src="my-animation.mp4" type="video/mp4" />
  </video>
  ```

  > Mobile browsers won't auto play videos unless they are muted.

### **SVG** - Vector images

- As it made up of text, it can be compressed using `GZip` or `Brotli`.

## Sizing (Image Dimensions)

Using responsive images decreases the page loading time.

If the website is viewed on a desktop we need a large image, but if the same website is being viewed on a mobile phone then we can use the smaller image as the view-port is smaller. This will reduce the size of the image being delivered to the mobile, thus decreasing the page load time. Which will enhance the user experience.

We can load different images depending on the screen size using the `srcset` attribute of `img` tag. We will add all differently sized image sources and let the browser select the image according to the screen size or pixel density of the device.

> `srcset` is a set of one or more strings separated by commas indicating a set of possible image sources for the user agent to use.

- Usage:

  ```html
  <!-- Change image depending on DPR (Device Pixel Ratio) -->
  <img
    src="cat-500px.jpg"
    srcset="cat-500px.jpg 1x, cat-1000px.jpg 2x, cat-1500px.jpg 3x"
    atl="cat"
  />

  <!-- Change image depending on screen width and (DPR) -->
  <img
    src="cat-500px.jpg"
    srcset="cat-500px.jpg 500w, cat-1000px.jpg 1000w, cat-1500px.jpg 1500w"
    atl="cat"
  />
  ```

- Also using `sizes` we can optimize even more. `sizes` lets us use different images based on media queries.

  ```html
  <img
    src="cat-500px.jpg"
    srcset="cat-500px.jpg 500w, cat-1000px.jpg 1000w, cat-1500px.jpg 1500w"
    atl="cat"
    sizes="(min-width: 760px) calc(50vw - 2em), 100vw"
  />
  ```

  > Use the `w` unit (instead of `px`) to write width descriptors. For example, a 1024px wide image would be written as `1024w`

::: warning

- `srcset` is not widely support as of now, so use a fall-back image source `src`.

- The resource specified by the `src` attribute should be large enough to work well on all device sizes.

:::

::: danger

**25%** (percentages cannot be used with the sizes attribute)

:::

### sharp

The [sharp npm package](https://www.npmjs.com/package/sharp) is a good choice for automating image resizing (for example, generating multiple sizes of thumbnails for all the videos on your website). It is fast and easily integrated with build scripts and tools. On the other hand, [ImageMagick CLI tool](https://www.imagemagick.org/script/index.php) is convenient for one-off image resizing because it is used entirely from the command line.

Node script to convert images using **sharp**:

```javascript
const sharp = require("sharp");
const fs = require("fs");
const directory = "./images";

fs.readdirSync(directory).forEach((file) => {
  sharp(`${directory}/${file}`)
    .resize(200, 100) // width, height
    .toFile(`${directory}/${file}-small.jpg`);
});
```

`ImageMagick` can be used to resize images but we need to automate this process which might complicate things:

```bash
# To resize an image to 33% of its original size
convert -resize 33% flower.jpg flower-small.jpg

# To resize an image to fit within 300px wide by 200px high
## macOS/Linux
convert flower.jpg -resize 300x200 flower-small.jpg

## Windows
magick convert flower.jpg -resize 300x200 flower-small.jpg
```

We can also use Responsive Breakpoint Generators like to get different image dimensions:

- [cloudinary/responsive_breakpoints_generator](https://github.com/cloudinary/responsive_breakpoints_generator)

## Lazy Loading

**Lazy loading** is the strategy of loading resources as they are needed, rather than in advance. This approach frees up resources during the initial page load and avoids loading assets that are never used.

Loading only those image currently present in the view-port.

[lazysizes](https://github.com/aFarkas/lazysizes) is the most popular library for lazy loading images. It is a script that intelligently loads images as the user moves through the page and prioritizes images that the user will encounter soon.

Steps to integrate `lazysizes`:

1. Add the [lazysizes script](https://github.com/aFarkas/lazysizes/blob/gh-pages/lazysizes.min.js) to your pages:

   ```html
   <script src="lazysizes.min.js" async></script>
   ```

2. Add `class="lazyload"` and add `data-src` instead of `src` to all `<img>` and `<picture>` tags:

   - **Add the `lazyload` class**: This indicates to lazysizes that the image should be lazy loaded.
   - **Change the `src` attribute to `data-src`**: When it is time to load the image, the lazysizes code sets the image `src` attribute using the value from the `data-src` attribute.

   ```html
   <img data-src="flower.jpg" class="lazyload" alt="" />

   or

   <picture>
     <source type="image/webp" data-srcset="flower.webp" />
     <source type="image/jpeg" data-srcset="flower.jpg" />
     <img data-src="flower.jpg" class="lazyload" alt="" />
   </picture>
   ```

- Use Preview Images like single colour SVG's.
- [Preview Image](https://github.com/axe312ger/sqip)

## Gulp Tasks

`Imagemin` is an excellent image compression tool, it supports a wide variety of image formats and is easily integrated with build scripts and build tools.

We will use `gulp-imagemin` plugin for image compression. There are specific imagemin plugins to fine tune the quality of images based on image format. Like:

| Image Format | Lossy Plugin(s)                                                      | Lossless Plugin(s)                                                   |
| ------------ | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| JPEG         | [imagemin-mozjpeg](https://www.npmjs.com/package/imagemin-mozjpeg)   | [imagemin-jpegtran](https://www.npmjs.com/package/imagemin-jpegtran) |
| PNG          | [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant) | [imagemin-optipng](https://www.npmjs.com/package/imagemin-optipng)   |
| GIF          | [imagemin-giflossy](https://www.npmjs.com/package/imagemin-giflossy) | [imagemin-gifsicle](https://www.npmjs.com/package/imagemin-gifsicle) |
| SVG          | [Imagemin-svgo](https://www.npmjs.com/package/imagemin-svgo)         |                                                                      |
| WebP         | [imagemin-webp](https://www.npmjs.com/package/imagemin-webp)         |                                                                      |

```javascript
const pngquant = require("imagemin-pngquant");
const mozjpeg = require("imagemin-mozjpeg");
const imageminWebp = require("imagemin-webp");
const imagemin = require("gulp-imagemin");
const gulp = require("gulp");

gulp.task("default", () => {
  gulp
    .src("images/*")
    .pipe(
      imagemin([
        pngquant({ quality: [0.5, 0.5] }),
        mozjpeg({ quality: 50 }),
        imageminWebp({ quality: 50 }),
      ]),
    )
    .pipe(gulp.dest("images/"));
});
```

## References

- [Why Speed Matters](https://web.dev/why-speed-matters/)
- [Fast and Beautiful Modern Image Delivery Techniques](https://www.youtube.com/watch?v=SnFOEhi0ym0&t=262s)
- [HTML WHATWG Images](https://html.spec.whatwg.org/multipage/images.html)
- [Twitter Logo SVG Format](https://gist.github.com/hail2u/2884613?short_path=66a60ff)
- [Gif without the GIF](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/)
