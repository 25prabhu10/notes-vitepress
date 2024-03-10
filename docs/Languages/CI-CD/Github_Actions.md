---
title: GitHub Actions
description: GitHub Actions enables us to create custom software development lifecycle workflows directly in the GitHub repository.
---

# GitHub Actions

Github Actions enables us to create custom software development lifecycle workflows directly in the Github repository.

It is a platform to _automate developer (any users) workflows_.

How GitHub Actions automate workflows?

- When something happens _in or to the repository_.In GitHub these are know as GitHub events such as _Pull Requests_, _Issue created_, _New Contributers, etc._.
- Listen to these events and trigger workflow. _Automatic actions_ are executed in response.

Some examples of workflows:

- Running tests, linting and other tasks whenever something happens to the repository.

Most common workflow includes CI/CD pipelines.

::: tip Note
**Commit code --> Test --> Build --> Push --> Deploy**
:::

Why use GitHub Actions as a CI/CD tool?

- use **same tool** instead of third-party integration if the code already exists in GitHub.
- setting up pipelines are **easy**.
- **developers focused**.

## Syntax used for GitHub Actions

**YAML** file is used for writing the configuration file.

- `name`: Displayed on repository's action page (optional).
- `on`: Name of GitHub event that triggers the workflow.
- `jobs`: One or more jobs can be written. Groups a set of actions which run in a sequence of tasks (steps).
- `uses`: Selects the action.
