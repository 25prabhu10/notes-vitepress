---
title: Artifactory
description: An artifact repository manager
---

# Artifactory

Artifactory is an Universal artifact repository manager

- Single source of truth for all packages, container images

Why do we use Artifactory?

- To access external packages:

  - Public NPM and NuGet repositories are not internally accessible (blocked due to security concerns)

  - Artifactory acts as a proxy

  - CI/CD pipeline

    - Built-in automated vulnerability analysis: early detection of security issues
    - License governance: detect ineligible packages
    - Cache

- To store internal packages:

  - Common code
  - DTO packages
  - Shared utilities and tools
  - Releases
  - TeamCity automatically publishes build artefacts to Artifactory

## Packages

- Bundles of code in the form of a file or folder
- Create, share, and consume useful code

## Artifactory Repos

- Packages are stored within repos
- Repos are essentially folders that contain packages
  - Can nest other repos
- Can filter by package type (NPM, NuGet, etc.) or repo type

Repo Types:

- Local: Internally developed packages

- Remote: On-demand mirroring of external third party packages

- Virtual: Aggregates multiple local/remote repositories into a single endpoint

  - e.g.: Your local NPM repository, plus the mirror of `npmjs.com` so you can resolve all dependencies from a single URL
