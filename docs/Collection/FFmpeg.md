---
title: FFmpeg
description: FFmpeg is a free and open-source software project consisting of a suite of libraries and programs for handling video, audio, and other multimedia files and streams.
---

# FFmpeg

FFmpeg is a free and open-source software project consisting of a suite of libraries and programs for handling video, audio, and other multimedia files and streams.

Check streams:

```bash
ffprobe -v error -show_entries stream=index,codec_name,codec_type movie.mkv
```

Combine audio and video:

```bash
ffmpeg -i video.mkv -i audio.mp3 -map 0:v -map 1:a -c:v copy -shortest movie.mkv
```

Audio:

- `mp3`: 128, 144, 160, _192_
- `vorbis`: 128, 144, _160_, 192 (`ogg`)
- `aac`: 128, 144, 160, 192 (`m4a`)
- `opus`: 128, _144_, 160, 192 (`ogg`/`opus`)

## Audio

Audio conversion:

```bash
ffmpeg -i audio.mka -acodec libmp3lame audio.mp3
```

Extract audio:

```bash
# -map channel
ffmpeg -i movie.mkv -vn -map 0:4 -acodec copy output.mka
```

## Video

Extract video:

```bash
ffmpeg -i movie.mkv -an -map 0:0 -vcodec copy video.mkv
```

## x265

[x265](https://x265.readthedocs.io/en/master/) is a H.265/HEVC encoder.

An application for encoding video streams into the H.265/MPEG-H HEVC compression format.

### Basic Commands

1. Simple encoding:

   ```bash
   x265 inputFile.y4u outFile.hevc
   ```

   > Only _`yuv`_ or _`y4m`_ can be used as input!

2. Encoding Statistics:

   - CLI log:

     ```bash
     --log-level <integer|string>
     ```

     _where_

     | value | log-level      |
     | ----- | -------------- |
     | 0     | error          |
     | 1     | warning        |
     | 2     | info (default) |
     | 3     | debug          |
     | 4     | full           |
     | -1    | disable        |

   - Statistics output to file :

     ```bash
     --csv <filename>
     ```

     - If **`--csv-log-level`** is `0` then _one line per run_.
     - If _greater_ than `0` then _one line per frame_.

3. Progress:

   ```bash
   --no-progress
   ```

   > Disable periodic progress reports from the CLI

## Audio and Video Recording

```bash
ffmpeg -f alsa -ac 2 -i default -acodec libopus -threads 0 -y output.mka
```

```bash
ffmpeg -f x11grab -r 20 -s 1920x1080 -i :0.0 -vcodec libx265 -preset fast -b:v 500k -threads 0 -y output.6.mkv
```

```bash
ffmpeg -f pulse -ac 2 -i default -f x11grab -r 20 -s 1920x1080 -i :0.0 -acodec aac -vcodec libx264 -preset ultrafast -b:v 900k -threads 0 -y output.mkv
```

## Something

I have png images from `0000.png` through `0120.png`. I want to use ffmpeg to convert them into an `mp4` video. The images have an alpha channel, I would like the alpha channel to be composited to the right side of the rgb channels, so that the video has double the width of the input images, with the rgb on the left half and the alpha on the right half. The alpha should be represented as black for 100% transparent and white for 0% transparent

Here is an ffmpeg command that you can use to convert a sequence of png images with an alpha channel into an mp4 video:

```bash
ffmpeg -framerate 24 -i %04d.png -vf "split[rgb][a]:[rgb]setpts=PTS-STARTPTS[rgb]:[a]alphaextract.format=gray[alpha]:[rgb][alpha]hstack" -c:v 1ibx264 -crf 23 -preset veryfast output.mp4
```

This command will convert the png images `0000. png` through `0120.png` at a frame rate of 24 frames per second. The `-vf` option specifies the video filterchain that is used to process the images. In this case, the filterchain uses the `split` filter to split the input images into their red, green, blue (RGB) and alpha channels. The `setpts` filter is then used to adjust the timing of the RGB channels so that they match the alpha channels. The `alphaextract` filter is used to extract the alpha channel and convert it to grayscale. The `format` filter is then used to convert the alpha channel to the desired format (in this case, grayscale). Finally, the `hstack` filter is used to stack the RGB and alpha channels horizontally, with the RGB channels on the left and the alpha channel on the right. The `-c:v` option specifies the codec that should be used for the video, and the `-crf` and `-preset` options control the quality and encoding speed of the output video

## Tools

[Build FFmpeg filters](https://ffmpeg.guide/): A simple GUI tool to create complex FFmpeg filter-graphs quickly and correctly
