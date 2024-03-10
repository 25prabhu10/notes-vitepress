---
title: AWS Elastic Beanstalk
description: AWS Elastic Beanstalk
prev: ./AWS
---

# AWS Elastic Beanstalk

Developer problems on AWS

- Managing infrastructure
- Deploying Code
- Configuring all the databases, load balancers, etc
- Scaling concerns
- Most web apps have the same architecture (ALB + ASG)
- All the developers want is for their code to run!
- Possibly, consistently across different applications and environments

## Elastic Beanstalk

- Elastic Beanstalk is a developer centric view of deploying an application on AWS
- It uses all the component's we've seen before: EC2, ASG, ELB, RDS, ...
- Managed service
  - Automatically handles capacity provisioning, load balancing, scaling, application health monitoring, instance configuration, ...
  - Just the application code is the responsibility of the developer
- We still have full control over the configuration
- Beanstalk is free but you pay for the underlying instances

## Elastic Beanstalk - Components

- Application: collection of Elastic Beanstalk components (environments, versions, configurations, ...)
- Application Version: an iteration of your application code
- Environment:
  - Collection of AWS resources running an application version (only one application version at a time)
  - Tiers: Web Server Environment Tier & Worker Environment Tier
  - You can create multiple environments (dev, test, prod, ...)

## Elastic Beanstalk - Supported Platforms

- Go
- Java SE
- Java with Tomcat
- .NET Core on Linux
- .NET on Windows Server
- Node.js
- PHP
- Python
- Ruby
- Packer Builder
- Single Container Docker
- Multi-container Docker
- Preconfigured Docker
- If not supported, you can write your custom platform (advanced)

## Beanstalk Deployment Options for Updates

- All at once (deploy all in one go) - fastest, but instances aren't available to serve traffic for a bit (downtime)
- Rolling: update a few instances at a time (bucket), and then move onto the next bucket once the first bucket is healthy
- Rolling with additional batches: like rolling, but spins up new instances to move the batch (so that the old application is still available)
- Immutable: spins up new instances in a new ASG, deploys version to these instances, and then swaps all the instances when everything is healthy

### All at once

- **Fastest deployment**
- Application has **downtime**
- Great for quick iterations in development environment
- No additional cost

### Rolling

- Application is **running below capacity**
- Can set the bucket size
- Application is **running both versions simultaneously**
- **No additional cost**
- Long deployment

### Rolling with additional batches

- Application is **running at capacity**
- Can set the bucket size
- Application is **running both versions simultaneously**
- **Small additional cost**
- Additional batch is removed at the end of the deployment
- Longer deployment
- Good for prod

### Immutable

- **Zero downtime**
- New Code is **deployed to new instances on a temporary ASG**
- **High cost, double capacity**
- **Longest deployment**
- **Quick rollback in case of failures (just terminate new ASG)**
- **Great for prod**

### Blue / Green

- Similar to Immutable
- Not a "direct feature" of Elastic Beanstalk
- Zero downtime and release facility
- Create a new "stage" environment and deploy v2 there
- The new environment (green) can be validated independently and roll back if issues
- Route 53 can be setup using weighted policies to redirect a little bit of traffic to the stage environment
- Using Beanstalk, "swap URLs" when done with the environment test

::: danger DNS CHANGE
It uses new load balancer, so the changes happen at DNS level. This is a problem as DNS changes have to propagate to servers around the world.
:::

## Elastic Beanstalk - Traffic Splitting

- Canary Testing
- New application version is deployed to a temporary ASG with the same capacity
- A small % of traffic is sent to the temporary ASG for a configurable amount of time
- Deployment health is monitored
- If there's a deployment failure, this triggers an automated rollback (very quick)
- No application downtime
- New instances are migrated from the temporary to the original ASG
- Old application version is then terminated

> Elastic Beanstalk Deployment Summary from [AWS Doc](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.deploy-existing-version.html)

## Elastic Beanstalk CLI

- We can install an additional CLI called the "EB cli" which makes working with Beanstalk from the CLI easier
- Basic commands are:
  - `eb init`: Configure your project directory and the EB CLI
  - `eb create`: Create your first env
  - `eb status`: see the current status of your env
  - `eb health`: view health info about the instances and the state of your overall env (use `--refresh` to update every 10s)
  - `eb events`: see a list of events output by EB
  - `eb logs`: pull logs from an instance in your env
  - `eb open`: open your env's website in a browser
  - `eb deploy`: once the env is running, deploy an update
  - `eb config`: take a look at the configuration options available for your running env
  - `eb terminate`: delete the environment
- It's helpful for your automated deployment pipelines!

## Elastic Beanstalk Deployment Process

- Describe dependencies (`requirements.txt` for Python, `package.json` for Node.js)
- Package code as zip, and describe dependencies
  - Python: `requirements.txt`
  - Node.js: `package.json`
- Console: upload zip file (creates new app version), and then deploy
- CLI: create new app version using CLI (uploads zip), and then deploy
- Elastic Beanstalk will deploy the zip on each EC2 instance, resolve dependencies and start the application

## Beanstalk Lifecycle Policy

- Elastic Beanstalk can store at most 1000 application versions
- If you don't remove old versions, you won't be able to deploy anymore
- To phase out old application versions, use a lifecycle policy
  - Based on time (old versions are removed)
  - Based on space (when you have too many versions)
- Versions that are currently used won't be deleted
- Option not to delete the source bundle in S3 to prevent data loss

## Elastic Beanstalk Extensions

- A zip file containing our code must be deployed to Elastic Beanstalk
- All the parameters set in the UI can be configured with code using files
- Requirements:
  - in the .ebextensions/ directory in the root of source code
  - YAML / JSON format
  - .config extensions (example: logging.config)
  - Able to modify some default settings using: option_settings
  - Ability to add resources such as RDS, ElastiCache, DynamoDB, etc...
- Resources managed by .ebextensions get deleted if the environment goes away

## Elastic Beanstalk Under the Hood

- Under the hood, Elastic Beanstalk relies on CloudFormation
- CloudFormation is used to provision other AWS services (we'll see later)
- Use case: you can define CloudFormation resources in your .ebextensions to provision ElastiCache, an S3 bucket, anything you want!
- Let's have a sneak peak into it!

## Elastic Beanstalk Cloning

- Clone an environment with the exact same configuration
- Useful for deploying a "test" version of your application
- All resources and configuration are preserved:
  - Load Balancer type and configuration
  - RDS database type (but the data is not preserved)
  - Environment variables
- After cloning an environment, you can change settings

## Elastic Beanstalk Migration: Load Balancer

- After creating an Elastic Beanstalk environment, you cannot change the Elastic Load Balancer type (only the configuration)
- To migrate:

  1. create a new environment with the same configuration except LB (can't clone)
  2. deploy your application onto the new environment
  3. perform a CNAME swap or Route 53 update

## RDS with Elastic Beanstalk

- RDS can be provisioned with Beanstalk, which is great for dev / test
- This is not great for prod as the database lifecycle is tied to the Beanstalk environment lifecycle
- The best for prod is to separately create an RDS database and provide our EB application with the connection string

## Elastic Beanstalk Migration: Decouple RDS

1. Create a snapshot of RDS DB (as a safeguard)
2. Go to the RDS console and protect the RDS database from deletion
3. Create a new Elastic Beanstalk environment, without RDS, point your application to existing RDS
4. perform a CNAME swap (blue/green) or Route 53 update, confirm working
5. Terminate the old environment (RDS won't be deleted)
6. Delete CloudFormation stack (in DELETE_FAILED state)

## Elastic Beanstalk - Single Docker

- Run your application as a single docker container
- Either provide:
  - Dockerfile: Elastic Beanstalk will build and run the Docker container
  - `Dockerrun.aws.json` (v1): Describe where _already built_ Docker image is
    - Image
    - Ports
    - Volumes
    - Logging
    - Etc...
- Beanstalk in Single Docker Container does not use ECS

## Elastic Beanstalk - Multi Docker Container

- Multi Docker helps run multiple containers per EC2 instance in EB
- This will create for you:
  - ECS Cluster
  - EC2 instances, configured to use the ECS Cluster
  - Load Balancer (in high availability mode)
  - Task definitions and execution
- Requires a config `Dockerrun.aws.json` (v2) at the root of source code
- `Dockerrun.aws.json` is used to generate the ECS task definition
- Your Docker images must be pre-built and stored in ECR for example

## Elastic Beanstalk and HTTPS

- Beanstalk with HTTPS
  - Idea: Load the SSL certificate onto the Load Balancer
  - Can be done from the Console (EB console, load balancer configuration)
  - Can be done from the code: `.ebextensions/securelistener-alb.config`
  - SSL Certificate can be provisioned using ACM (AWS Certificate Manager) or CLI
  - Must configure a security group rule to allow incoming port 443 (HTTPS port)
- Beanstalk redirect HTTP to HTTPS
  - Configure your instances to redirect HTTP to HTTPS: [Example configurations](https://github.com/awsdocs/elastic-beanstalk-samples/tree/master/configuration-files/aws-provided/security-configuration/https-redirect)
  - OR configure the Application Load Balancer (ALB only) with a rule
  - Make sure health checks are not redirected (so they keep giving 200 OK)

## Web Server vs Worker Environment

- If your application performs tasks that are long to complete, offload these tasks to a dedicated
  worker environment
- Decoupling your application into two tiers is common
- Example: processing a video, generating a zip file, etc
- You can define periodic tasks in a file `cron.yaml`
- Worker Environment:
  - creates an ASG
  - creates a SQS Queue
  - Installs the Sqsd daemon on the EC2 instances
  - Creates CloudWatch Alarm to dynamically scale instances based on health

## Elastic Beanstalk - Custom Platform (Advanced)

- Custom Platforms are very advanced, they allow to define from scratch:
  - The Operating System (OS)
  - Additional Software
  - Scripts that Beanstalk runs on these platforms
- Use case: app language is incompatible with Beanstalk & doesn't use Docker
- To create your own platform:
  - Define an AMI using `Platform.yaml` file
  - Build that platform using the Packer software (open source tool to create AMIs)
- Custom Platform vs Custom Image (AMI):
  - Custom Image is to tweak an existing Beanstalk Platform (Python, Node.js, Java...)
  - Custom Platform is to create an entirely new Beanstalk Platform
