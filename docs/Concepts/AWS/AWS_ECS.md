---
title: ECS
description: ECS
prev: ./AWS
---

# ECS

ECS (Elastic Container Service)

## Docker

- Docker is a software development platform to deploy apps
- Apps are packaged in containers that can be run on any OS
- Apps run the same, regardless of where they're run
- Any machine
- No compatibility issues
- Predictable behaviour
- Less work
- Easier to maintain and deploy
- Works with any language, any OS, any technology

### Where Docker images are stored?

- Docker images are stored in Docker Repositories
- Public: [Docker Hub](https://hub.docker.com/)
- Find base images for many technologies or OS:
  - Ubuntu
  - MySQL
  - NodeJS, Java...
- Private: Amazon ECR (Elastic Container Registry)

### Docker versus Virtual Machines

- Docker is "sort of " a virtualization technology, but not exactly
- Resources are shared with the host => many containers on one server

### Getting Started with Docker

- Download [Docker](https://www.docker.com/get-started)

### Docker Containers Management

- To manage containers, we need a container management platform
- Three choices:
- ECS: Amazon's own platform
- Fargate: Amazon's own Serverless platform
- EKS: Amazon's managed Kubernetes (open source)

## ECS Clusters

- ECS Clusters are logical grouping of EC2 instances
- Multiple EC2 instances which will house the docker containers
- EC2 instances run the ECS agent (Docker container)
- The ECS agents registers the instance to the ECS cluster
- The EC2 instances run a special AMI, made specifically for ECS

### Create Cluster

Steps:

1. Goto ECS --> Clusters --> Create Cluster
2. Select EC2 Linux + Newtworking (old way)
3. Configure cluster:

   - Cluster name:
   - Provisioning Model: (On-Demand Instance) (Spot)
   - EC2 instance type: `t2.micro`
   - Number of instances: 1
   - EC2 AMI ID: Amazon Linux 2 AMI
   - Root EBS Volume Size (GiB): 30
   - Key pair:
   - Networking:
     - VPC:
     - Subnets: (add more for more availability)
     - Auto assign public IP:
     - Security group:
     - Security group inbound rules: 0.0.0.0/0:22 (for SSH)
   - Container instance IAM role

## ECS Task Definitions

- Tasks definitions are metadata in JSON form to tell ECS how to run a Docker Container
- It contains crucial information around:
  - Image Name
  - Port Binding for Container and Host
  - Memory and CPU required
  - Environment variables
  - Networking information
  - IAM Role
  - Logging configuration (ex CloudWatch)

### Create Task Definition

Steps:

1. Goto ECS --> Task Definitions
2. Create new Task Definition:

   - Select launch type compatibility: (FARGATE) (EC2)
   - Task Definition Name:
   - Task Role: (optional IAM role that tasks can use to make API requests to authorized AWS services...)
   - Network Mode: default (Bridge (default on Linux)) (Host) (awsvpc) (None) (NAT is default on Windows)
   - Task size:
     - Task memory (MiB):
     - Task CPU (unit):
   - Container Definitions:
     - Add container
     - Container name:
     - Hard Limits (MiB)\*: Hard Limit - 200
     - Port mappings: 8080 (Host port): 80 (Container port) - (If Host is left empty, ports are auto assigned)
     - ...more options
   - ...more options

## ECS Service

- ECS Services help define how many tasks should run and how they should be run
- They ensure that the number of tasks desired is running across our fleet of EC2 instances.
- They can be linked to ELB / NLB / ALB if needed

### Create a Service

Steps:

1. Goto Clusters and select a cluster --> Services
2. Configure service:

   - Launch type: (FARGATE) (EC2)
   - Task Definition: Select a task
   - Cluster: Select a cluster
   - Service name:
   - Service type: (REPLICA) (DAEMON: Automatic number of tasks)
   - Number of tasks: 1
   - Minimum healthy percent: 0 (default 100)
   - Maximum percent: 200
   - Deployments:
     - Rolling update
     - Blue/green deployment governed by AWS CodeDeploy
   - Task Placement: (Custom) (AZ Balanced Spread) (AZ Balanced BinPack) (BinPack) (One Task Per Host)
   - Configure network:
   - Load balancing:
     - None
     - Application Load Balancer
     - Network Load Balancer
     - Classic Load Balancer
   - ...more options

3. Now a task will be started by the service

::: warning NOTE
A service cannot be updated to add a Load balancer.
To add a Load balancer you need to set it during the creation of the service.
:::

## ECR Repository

- So far we've been using Docker images from Docker Hub (public)
- ECR is a private Docker image repository
- Access is controlled through IAM (permission errors => policy)
- AWS CLI v1 login command (may be asked at the exam)

  ```bash
  $(aws ecr get-login --no-include-email --region eu-west-1)
  ```

- AWS CLI v2 login command (newer, may also be asked at the exam - pipe)

  ```bash
  aws ecr get-login-password --region eu-west-1 | docker login --username AWS -- password-stdin 1234567890.dkr.ecr.eu-west-1.amazonaws.com
  ```

- Docker Push & Pull:

  ```bash
  docker push 1234567890.dkr.ecr.eu-west-1.amazonaws.com/demo:latest
  docker pull 1234567890.dkr.ecr.eu-west-1.amazonaws.com/demo:latest
  ```

### Create Repository

Steps:

1. Repository access and tags:

   - Repository name:
   - Tag immutability: (cannot push new images with the same tag)

2. Image scan settings: (scan images for security)

## Fargate

- When launching an ECS Cluster, we have to create our EC2 instances
- If we need to scale, we need to add EC2 instances
- So we manage infrastructure...
- With Fargate, it's all Serverless!
- We don't provision EC2 instances
- We just create task definitions, and AWS will run our containers for us
- To scale, just increase the task number. Simple! No more EC2 J

## ECS IAM Roles Deep Dive

- EC2 Instance Profile:
  - Used by the ECS agent
  - Makes API calls to ECS service
  - Send container logs to CloudWatch Logs
  - Pull Docker image from ECR
- ECS Task Role:
  - Allow each task to have a specific role
  - Use different roles for the different ECS Services you run
  - Task Role is defined in the task definition

## ECS Tasks Placement

- When a task of type EC2 is launched, ECS must determine where to place it, with the constraints of CPU, memory, and available port.
- Similarly, when a service scales in, ECS needs to determine which task to terminate.
- To assist with this, you can define a task placement strategy and task placement constraints
- Note: this is only for ECS with EC2, not for Fargate

## ECS Task Placement Process

- Task placement strategies are a best effort
- When Amazon ECS places tasks, it uses the following process to select container instances:
  1. Identify the instances that satisfy the CPU, memory, and port requirements in the task definition.
  2. Identify the instances that satisfy the task placement constraints.
  3. Identify the instances that satisfy the task placement strategies.
  4. Select the instances for task placement.

## ECS Task Placement Strategies

- Binpack

  - Place tasks based on the least available amount of CPU or memory
  - This minimizes the number of instances in use (cost savings)

  ```json
  {
    "placementStrategy": [
      {
        "field": "memory",
        "type": "binpack"
      }
    ]
  }
  ```

- Random

  - Place the task randomly

  ```json
  {
    "placementStrategy": [
      {
        "type": "random"
      }
    ]
  }
  ```

- Spread

  - Place the task evenly based on the specified value
  - Example: instanceId, attribute:ecs.availability-zone

  ```json
  {
    "placementStrategy": [
      {
        "field": "attribute:ecs.availability-zone",
        "type": "spread"
      }
    ]
  }
  ```

- You can mix them together

  ```json
  {
    "placementStrategy": [
      {
        "field": "attribute:ecs.availability-zone",
        "type": "spread"
      },
      {
        "field": "memory",
        "type": "spread"
      }
    ]
  }
  ```

  ```json
  {
    "placementStrategy": [
      {
        "field": "attribute:ecs.availability-zone",
        "type": "spread"
      },
      {
        "field": "memory",
        "type": "binpack"
      }
    ]
  }
  ```

## ECS Task Placement Constraints

- distinctInstance: place each task on a different container instance

  ```json
  {
    "placementStrategy": [
      {
        "type": "distinctInstance"
      }
    ]
  }
  ```

- memberOf: places task on instances that satisfy an expression

  - Uses the Cluster Query Language (advanced)

  ```json
  {
    "placementStrategy": [
      {
        "field": "attribute:ecs.instance-type = ~ t2.*",
        "type": "memberof"
      }
    ]
  }
  ```

## ECS - Service Auto Scaling

- CPU and RAM is tracked in CloudWatch at the ECS service level
- Target Tracking: target a specific average CloudWatch metric
- Step Scaling: scale based on CloudWatch alarms
- Scheduled Scaling: based on predictable changes
- ECS Service Scaling (task level) ≠ EC2 Auto Scaling (instance level)
- Fargate Auto Scaling is much easier to setup (because serverless)

## ECS - Cluster Capacity Provider

- A Capacity Provider is used in association with a cluster to determine the infrastructure that a task runs on
  - For ECS and Fargate users, the FARGATE and FARGATE_SPOT capacity providers are added automatically
  - For Amazon ECS on EC2, you need to associate the capacity provider with an auto-scaling group
- When you run a task or a service, you define a capacity provider strategy, to prioritize in which provider to run.
- This allows the capacity provider to automatically provision infrastructure for you

## ECS Data Volumes - EC2 Task Strategies

- The EBS volume is already mounted onto the EC2 instances
- This allows your Docker containers to mount the EBS volume and extend the storage capacity of your task
- Problem: if your task moves from one EC2 instance to another one, it won't be the same EBS volume and data
- Use cases:
  - Mount a data volume between different containers on the same instance
  - Extend the temporary storage of a task

## ECS Data Volumes - EFS File Systems

- Works for both EC2 Tasks and Fargate tasks
- Ability to mount EFS volumes onto tasks
- Tasks launched in any AZ will be able to share the same data in the EFS volume
- Fargate + EFS = serverless + data storage without managing servers
- Use case: persistent multi-AZ shared storage for your containers

## ECS Data Volumes - Bind Mounts Sharing data between containers

- Works for both EC2 Tasks (using Fargate or EC2 instance storage) and Fargate tasks (get 4 GB for volume mounts)
- Useful to share an ephemeral storage between multiple containers part of the same ECS task
- Great for "sidecar" container pattern where the sidecar can be used to send metrics/logs to other destinations (separation of concerns)

## ECS Summary + Exam Tips

- ECS is used to run Docker containers and has 3 flavors:
- ECS "Classic": provision EC2 instances to run containers onto
- Fargate: ECS Serverless, no more EC2 to provision
- EKS: Managed Kubernetes by AWS

ECS Classic

- EC2 instances must be created
- We must configure the file /etc/ecs/ecs.config with the cluster name
- The EC2 instance must run an ECS agent
- EC2 instances can run multiple containers on the same type:
  - You must not specify a host port (only container port)
  - You should use an Application Load Balancer with the dynamic port mapping
  - The EC2 instance security group must allow traffic from the ALB on all ports
- ECS tasks can have IAM Roles to execute actions against AWS
- Security groups operate at the instance level, not task level

ECR is used to store Docker Images

- ECR is tightly integrated with IAM
- AWS CLI v1 login command (may be asked at the exam)
- $(aws ecr get-login --no-include-email --region eu-west-1)
- "aws ecr get-login" generates a "docker login" command
- AWS CLI v2 login command (newer, may also be asked at the exam - pipe)
- aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 1234567890.dkr.ecr.eu-west-1.amazonaws.com
- Docker Push & Pull:
  - docker push 1234567890.dkr.ecr.eu-west-1.amazonaws.com/demo:latest
  - docker pull 1234567890.dkr.ecr.eu-west-1.amazonaws.com/demo:latest
- In case an EC2 instance (or you) cannot pull a Docker image, check IAM

Fargate

- Fargate is Serverless (no EC2 to manage)
- AWS provisions containers for us and assigns them ENI
- Fargate containers are provisioned by the container spec (CPU / RAM)
- Fargate tasks can have IAM Roles to execute actions against AWS

Fargate vs Lambda

|             | Fargate                                        | Lambda                                               |
| ----------- | ---------------------------------------------- | ---------------------------------------------------- |
| Cold Starts | Yes (shorter)                                  | Yes                                                  |
| Duration    | As long as you want                            | **15 mins** (max)                                    |
| Memory      | Up to **30 GB**                                | Up to **3 GB**                                       |
| Containers  | Your provide your own containers               | Limited to standardize containers                    |
| Integration | More manual labour                             | Seamlessly integrates with other serverless services |
| Pricing     | Pay at least 1 min and every additional second | Pay per 100ms                                        |

ECS Other

- ECS does integrate with CloudWatch Logs:
  - You need to setup logging at the task definition level
  - Each container will have a different log stream
  - The EC2 Instance Profile needs to have the correct IAM permissions
- Use IAM Task Roles for your tasks
- Task Placement Strategies: binpack, random, spread
- Service Auto Scaling with target tracking, step scaling, or scheduled
- Cluster Auto Scaling through Capacity Providers
