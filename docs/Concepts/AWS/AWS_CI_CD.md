---
title: AWS CI CD
description: AWS CI CD
prev: ./AWS
---

# AWS CI CD

## CICD (Continuous-Integration and Continuous-Delivery)

- We now know how to create resources in AWS manually (Fundamentals)
- We know how to interact with AWS programmatically (CLI)
- We've seen how to deploy code to AWS using Elastic Beanstalk
- All these manual steps make it very likely for us to do mistakes!
- What we'd like is to push our code "in a repository" and have it deployed onto the AWS
  - Automatically
  - The right way
  - Making sure it's tested before deploying
  - With possibility to go into different stages (dev, test, pre-prod, prod)
  - With manual approval where needed
- To be a proper AWS developer... we need to learn AWS CICD

- This section is all about automating the deployment we've done so far while adding increased safety.
- It correspond to a whole part of the AWS Certification
- We'll learn about
  - AWS CodeCommit: storing our code
  - AWS CodePipeline: automating our pipeline from code to ElasticBeanstalk
  - AWS CodeBuild: building and testing our code
  - AWS CodeDeploy: deploying the code to EC2 fleets (not Beanstalk)

## Continuous Integration

- Developers push the code to a code repository often (GitHub / CodeCommit / Bitbucket / etc...)
- A testing / build server checks the code as soon as it's pushed (CodeBuild / Jenkins CI / etc...)
- The developer gets feedback about the tests and checks that have passed / failed
- Find bugs early, fix bugs
- Deliver faster as the code is tested
- Deploy often
- Happier developers, as they're unblocked

## Continuous Delivery

- Ensure that the software can be released reliably whenever needed.
- Ensures deployments happen often and are quick
- Shift away from "one release every 3 months" to "5 releases a day"
- That usually means automated deployment
  - CodeDeploy
  - Jenkins CD
  - Spinnaker Application
  - Etc...

## Technology Stack for CICD

Code --> Build --> Test --> Deploy --> Provision

## CodeCommit

- Version control is the ability to understand the various changes that happened to the code over time (and possibly roll back).
- All these are enabled by using a version control system such as Git
- A Git repository can live on one's machine, but it usually lives on a central online repository
- Benefits are:

  - Collaborate with other developers
  - Make sure the code is backed-up somewhere
  - Make sure it's fully viewable and auditable

- Git repositories can be expensive.
- The industry includes:
  - GitHub: free public repositories, paid private ones
  - BitBucket
  - Etc...
- And AWS CodeCommit:
  - private Git repositories
  - No size limit on repositories (scale seamlessly)
  - Fully managed, highly available
  - Code only in AWS Cloud account => increased security and compliance
  - Secure (encrypted, access control, etc...)
  - Integrated with Jenkins / CodeBuild / other CI tools

### CodeCommit Security

- Interactions are done using Git (standard)
- Authentication in Git:
  - SSH Keys: AWS Users can configure SSH keys in their IAM Console
  - HTTPS: Done through the AWS CLI Authentication helper or Generating HTTPS credentials
  - MFA (multi factor authentication) can be enabled for extra safety
- Authorization in Git:
  - IAM Policies manage user / roles rights to repositories
- Encryption:
  - Repositories are automatically encrypted at rest using KMS
  - Encrypted in transit (can only use HTTPS or SSH - both secure)
- Cross Account access:
  - Do not share your SSH keys
  - Do not share your AWS credentials
  - Use IAM Role in your AWS Account and use AWS STS (with AssumeRole API)

### CodeCommit vs GitHub

Similarities:

- Both are git repositories
- Both support code review (pull requests)
- GitHub and CodeCommit can integrated with AWS CodeBuild
- Both support HTTPS and SSH method of authentication

Differences:

- Security:
  - GitHub: GitHub Users
  - CodeCommit: AWS IAM users & roles,
- Hosted:
  - GitHub: hosted by GitHub
  - GitHub Enterprise: self hosted on your servers
  - CodeCommit: managed & hosted by AWS
- UI:
  - GitHub UI is fully featured
  - CodeCommit UI is minimal

### CodeCommit Notifications

- You can trigger notifications in CodeCommit using AWS SNS (Simple Notification Service) or AWS Lambda or AWS CloudWatch Event Rules
- Use cases for notifications SNS / AWS Lambda notifications:
  - Deletion of branches
  - Trigger for pushes that happens in master branch
  - Notify external Build System
  - Trigger AWS Lambda function to perform codebase analysis (maybe credentials got committed in the code?)
- Use cases for CloudWatch Event Rules:
  - Trigger for pull request updates (created / updated / deleted / commented)
  - Commit comment events
  - CloudWatch Event Rules goes into an SNS topic

### Create a Repository

1. Search for `CodeCommit` --> Create repository
2. Repository settings:

   - Repository name:
   - Description (optional):
   - Tags
   - Enable Amazon CodeGuru Reviewer for Java and Python - optional

3. Connection steps:

   - HTTPS:
   - SSH:
   - HTTPS (GRC):

## CodePipeline

- Continuous delivery
- Visual workflow
- Source: GitHub / CodeCommit / Amazon S3
- Build: CodeBuild / Jenkins / etc...
- Load Testing: 3rd party tools
- Deploy: AWS CodeDeploy / Beanstalk / CloudFormation / ECS...
- Made of stages:
  - Each stage can have sequential actions and / or parallel actions
  - Stages examples: Build / Test / Deploy / Load Test / etc...
  - Manual approval can be defined at any stage

### AWS CodePipeline Artifacts

- Each pipeline stage can create "artifacts"
- Artifacts are passed stored in Amazon S3 and passed on to the next stage

### CodePipeline Troubleshooting

- CodePipeline state changes happen in AWS CloudWatch Events, which can in return create SNS notifications.
  - Ex: you can create events for failed pipelines
  - Ex: you can create events for cancelled stages
- If CodePipeline fails a stage, your pipeline stops and you can get information in the console
- AWS CloudTrail can be used to audit AWS API calls
- If Pipeline can't perform an action, make sure the "IAM Service Role" attached does have enough permissions (IAM Policy)

## CodeBuild

- Fully managed build service
- Alternative to other build tools such as Jenkins
- Continuous scaling (no servers to manage or provision - no build queue)
- Pay for usage: the time it takes to complete the builds
- Leverages Docker under the hood for reproducible builds
- Possibility to extend capabilities leveraging our own base Docker images
- Secure: Integration with KMS for encryption of build artifacts, IAM for build permissions, and VPC for network security, CloudTrail for API calls logging

- Source Code from GitHub / CodeCommit / CodePipeline / S3...
- Build instructions can be defined in code (buildspec.yml file)
- Output logs to Amazon S3 & AWS CloudWatch Logs
- Metrics to monitor CodeBuild statistics
- Use CloudWatch Events to detect failed builds and trigger notifications
- Use CloudWatch Alarms to notify if you need "thresholds" for failures
- CloudWatch Events / AWS Lambda as a Glue
- SNS notifications
- Ability to reproduce CodeBuild locally to troubleshoot in case of errors
- Builds can be defined within CodePipeline or CodeBuild itself

### CodeBuild Support environments

- Java
- Ruby
- Python
- Go
- Node.js
- Android
- .NET Core
- PHP
- Docker: extend any environment you like

### CodeBuild BuildSpec

- buildspec.yml file must be at the root of your code
- Define environment variables:
  - Plaintext variables
  - Secure secrets: use SSM Parameter store
- Phases (specify commands to run):
  - Install: install dependencies you may need for your build
  - Pre build: final commands to execute before build
  - Build: actual build commands
  - Post build: finishing touches (zip output for example)
- Artifacts: What to upload to S3 (encrypted with KMS)
- Cache: Files to cache (usually dependencies) to S3 for future build speedup

### CodeBuild Local Build

- In case of need of deep troubleshooting beyond logs...
- You can run CodeBuild locally on your desktop (after installing Docker)
- For this, leverage the [CodeBuild Agent](https://docs.aws.amazon.com/codebuild/latest/userguide/use-codebuild-agent.html)

### Create a CodeBuild

1. Create build project:

   - Project name:
   - Description (optional):
   - Build badge (optional):
   - Enable concurrent build limit (optional):
   - Source:
     - Source provider: (AWS CodeCommit) (Amazon S3) (GitHub) (Bitbucket) (GitHub Enterprise)
     - Repository:
     - Reference type: (Branch) (Git tag) (Commit ID)
   - Environment image: (Managed image) (Custom image)
   - Operating system: (Ubuntu - recommended) (Amazon Linux 2) (Windows Server 2019)
   - Runtime: Standard
   - Image: Select the latest
   - Image version: Select the latest
   - Environment type: (Linux)
   - Privileged
   - Service role: (New service role) (Existing service role)
   - Role name:
   - Additional configuration: ...
   - Buildspec:
     - Build specification: (Use a buildspec file) (Insert build commands)
     - Buildspec name (optional): (default name is buildspec.yml)
   - Batch configuration:
   - Artificats:
   - Artifacts:
     - Type: (No artifacts) (Amazon S3)
   - Logs:
     - CloudWatch logs (optional):
     - Group name:
     - Stream name:
     - S3 logs (optional):

2. Create a `buildspec.yml` file and place it in the root of your repository:

   ```yaml
   version: 0.2

   phases:
     install:
       runtime-versions:
         nodejs: latest
       commands:
         - echo "installing something"
     pre_build:
       commands:
         - echo "we are in the pre build phase"
     build:
       commands:
         - echo "we are in the build block"
         - echo "we will run some tests"
         - grep -Fq "Congratulations" index.html
     post_build:
       commands:
         - echo "we are in the post build phase"
   ```

3. Start build and verify

### CodeBuild in VPC

- By default, your CodeBuild containers are launched outside your VPC
- Therefore, by default it cannot access resources in a VPC
- You can specify a VPC configuration:
  - VPC ID
  - Subnet IDs
  - Security Group IDs
- Then your build can access resources in your VPC (RDS, ElastiCache, EC2, ALB..)
- Use cases: integration tests, data query, internal load balancers

## AWS CodeDeploy

- We want to deploy our application automatically to many EC2 instances
- These instances are not managed by Elastic Beanstalk
- There are several ways to handle deployments using open source tools (Ansible, Terraform, Chef, Puppet, etc...)
- We can use the managed Service AWS CodeDeploy

## AWS CodeDeploy - Steps to make it work

- Each EC2 Machine (or On Premise machine) must be running the CodeDeploy Agent
- The agent is continuously polling AWS CodeDeploy for work to do
- CodeDeploy sends appspec.yml file
- Application is pulled from GitHub or S3
- EC2 will run the deployment instructions
- CodeDeploy Agent will report of success / failure of deployment on the instance

- EC2 instances are grouped by deployment group (dev / test / prod)
- Lots of flexibility to define any kind of deployments
- CodeDeploy can be chained into CodePipeline and use artifacts from there
- CodeDeploy can re-use existing setup tools, works with any application, auto scaling integration
- Note: Blue / Green only works with EC2 instances (not on premise)
- Support for AWS Lambda deployments (we'll see this later)
- CodeDeploy does not provision resources

### AWS CodeDeploy Primary Components

- Application: unique name
- Compute platform: EC2/On-Premise or Lambda
- Deployment configuration: Deployment rules for success / failures
  - EC2/On-Premise: you can specify the minimum number of healthy instances for the deployment.
  - AWS Lambda: specify how traffic is routed to your updated Lambda function versions.
- Deployment group: group of tagged instances (allows to deploy gradually)
- Deployment type: In-place deployment or Blue/green deployment:
- IAM instance profile: need to give EC2 the permissions to pull from S3 / GitHub
- Application Revision: application code + appspec.yml file
- Service role: Role for CodeDeploy to perform what it needs
- Target revision: Target deployment application version

### AWS CodeDeploy AppSpec

- File section: how to source and copy from S3 / GitHub to filesystem
- Hooks: set of instructions to do to deploy the new version (hooks can have timeouts). The order is:
  - ApplicationStop
  - DownloadBundle
  - BeforeInstall
  - AfterInstall
  - ApplicationStart
  - ValidateService: really important

### AWS CodeDeploy Deploy & Hooks Order

1. ApplicationStop
2. DownloadBundle
3. BeforeInstall
4. Install
5. AfterInstall
6. ApplicationStart
7. ValidateService
8. BeforeAllowTraffic
9. AllowTraffic
10. AfterAllowTraffic

### AWS CodeDeploy Deployment Config

- Configs:
  - One a time: one instance at a time, one instance fails => deployment stops
  - Half at a time: 50%
  - All at once: quick but no healthy host, downtime. Good for dev
  - Custom: min healthy host = 75%
- Failures:
  - Instances stay in "failed state"
  - New deployments will first be deployed to "failed state" instances
  - To rollback: redeploy old deployment or enable automated rollback for failures
- Deployment Targets:
  - Set of EC2 instances with tags
  - Directly to an ASG
  - Mix of ASG / Tags so you can build deployment segments
  - Customization in scripts with DEPLOYMENT_GROUP_NAME environment variables

## CodeDeploy to EC2

- Define how to deploy the application using appspec.yml + deployment strategy
- Will do in-place update to your fleet of EC2 instances
- Can use hooks to verify the deployment after each deployment phase

### CodeDeploy to ASG

- In place updates:
  - Updates current existing EC2 instances
  - Instances newly created by an ASG will also get automated deployments
- Blue / green deployment:
  - A new auto-scaling group is created (settings are copied)
  - Choose how long to keep the old instances
  - Must be using an ELB

### CodeDeploy - roll backs

- You can specify automated rollback options
- Roll back when a deployment fails
- Roll back when alarm thresholds are met
- Disable rollbacks - Do not perform rollbacks for this deployment.
- If a roll back happens, CodeDeploy redeploys the last known good revision as a new deployment.

## CodeStar

- CodeStar is an integrated solution that regroups: GitHub, CodeCommit, CodeBuild, CodeDeploy, CloudFormation, CodePipeline, CloudWatch
- Helps quickly create "CICD-ready" projects for EC2, Lambda, Beanstalk
- Supported languages: C#, Go, HTML 5, Java, Node.js, PHP, Python, Ruby
- Issue tracking integration with: JIRA / GitHub Issues
- Ability to integrate with Cloud9 to obtain a web IDE (not all regions)
- One dashboard to view all your components
- Free service, pay only for the underlying usage of other services
- Limited Customization

### Create a CodeStar Project

1. Goto CodeStar --> Create project
2. Templates:

   - Application type: (Web service) ...
   - AWS service: (AWS Elastic Beanstalk) (AWS EC2) (AWS Lambda) ...

3. Project details:

   - Project name:
   - Project ID:
   - Project repository: (CodeCommit) (GitHub)
   - Repository name:
   - EC2 Configuration:
     - Instance type: t2.micro
     - VPC:
     - Subnet:
     - Key pair:

4. Review
