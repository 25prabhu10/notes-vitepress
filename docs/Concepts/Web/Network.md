---
title: Network
description:
---

# Network

## Twisted Pair Cables Cheat-Sheet

## Cable Types

### Unshielded Twisted Pair (UTP)

As the title states, a UTP cable has no shielding. This is the most used and most basic type of cable. The cable contains pairs of wires twisted together to help reduce and prevent electromagnetic interference.

### Shielded Twisted Pair (STP)

STP cables are similar to UTP cables, where the wires are twisted together and then wrapped with a shielding or screening material which consits of foil wrapping or a copper braid jacket.

### Foil Twisted Pair (FTP)

With FTP cables, each twisted pair of cables is wrapped in a shielding of foil to protect the cable from EMI and crosstalk.

### Shielded Foil Twisted Pair (S/FTP)

A cable that is classified as S/FTP or Shielded Foil Twisted Pair is a combination of both FTP and STP shielding. The wires inside the cable are twisted and then shielded with a foil wrapping, then the 4-pair grouping of foiled wires are shielded by a wrapping of either foil or a flexible braided screening. This provides the highest level of protection against EMI and crosstalk.

## Wiring

- TIA/EIA 568A Wiring:

| Pin | Color-Text       |
| --- | ---------------- |
| 1   | White and Green  |
| 2   | Green            |
| 3   | White and Orange |
| 4   | Blue             |
| 5   | White and Blue   |
| 6   | Orange           |
| 7   | White and Brown  |
| 8   | Brown            |

- TIA/EIA 568B Wiring:

| Pin | Color-Text       |
| --- | ---------------- |
| 1   | White and Orange |
| 2   | Orange           |
| 3   | White and Green  |
| 4   | Blue             |
| 5   | White and Blue   |
| 6   | Green            |
| 7   | White and Brown  |
| 8   | Brown            |

- Categories:

| Category   | MHz     | Speed                 |
| ---------- | ------- | --------------------- |
| CAT 3 UTP  | 16MHz   | 10Mps up to 100m      |
| CAT 4 UTP  | 20MHz   | 16Mps up to 100m      |
| CAT 5 UTP  | 100MHz  | 100Mbps up to 100m    |
| CAT 5e UTP | 100MHz  | 1000Mbps up to 100m   |
| CAT 5e STP | 100MHz  | 1000Mbps up to 100m   |
| CAT 6 UTP  | 250MHz  | 10Gbps over to 33-55m |
| CAT 6a STP | 500MHz  | 10Gbps over 100m      |
| CAT 7 STP  | 600MHz  | 10Gbps over 100m      |
| CAT 7a STP | 1000MHz | 10Gbps over 100m      |
| CAT 8 STP  | 2000MHz | 25/40Gps up to 30m    |

## TCP vs UDP

Each frame goes through several buffers as you send it: The application buffer, The Protocol Buffer, The Software interface buffer and the Hardware interface buffer. As you start stressing the stack by sending high speed data you will fill up these buffers and either block or lose data. You also have strategies for timeliness and polling that can impact your performance. For example, by using a larger buffer and poll less often you can get much better performance while sacrificing latency

TCP is optimized for high speed bulk transfers while UDP is optimized for low latency in the Linux kernel. This has an impact on buffer sizes and how data is polled and handed over. In addition to this, you frequently have offloading to hardware for TCP. I would expect considerably better performance for TCP compared to UDP

Note that sending high speed data over UDP is usually a bad idea, unless you implement your own congestion control. TCP protects your network from congestion collapses. Use UDP when you have small amounts of data or high timeliness requirements
