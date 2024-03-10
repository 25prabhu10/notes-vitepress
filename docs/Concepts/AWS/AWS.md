---
title: AWS
description: Amazon Web Services is a Cloud Provider
---

# AWS

AWS (**Amazon Web Services**) is a _Cloud Provider_

They provide many servers and services that can be used **on demand** and **scaled easily**

## Amazon Web Services

1. [AWS Global Infrastructure](#aws-global-infrastructure)
2. [IAM](./AWS_IAM.md)
3. [EC2 and Storage](./AWS_EC2.md)
4. [Load Balancing](./AWS_Load_Balancing.md)
5. [RDS](./AWS_RDS.md)
6. [Route 53](./AWS_Route_53.md)
7. [VPC](./AWS_VPC.md)
8. [S3](./Amazon_S3.md)
9. [CloudFront](./AWS_CloudFront.md)
10. [ECS](./AWS_ECS.md)
11. [Elastic Beanstalk](./AWS_Elastic_Beanstalk.md)
12. [AWS CICD](./AWS_CI_CD.md)
13. [AWS CloudFormation](./AWS_CloudFormation.md)
14. [AWS Monitoring, Troubleshooting & Audit](./AWS_Monitoring_Troubleshooting_Audit.md)
15. [AWS Integration and Messaging](./AWS_Integration_and_Messaging.md)
16. [AWS Lambda](./AWS_Lambda.md)
17. [AWS DynamoDB](./AWS_DynamoDB.md)
18. [AWS API Gateway](./AWS_API_Gateway.md)
19. [AWS Serverless Application Model](./AWS_Serverless_Application_Model.md)
20. [AWS Cloud Development Kit](./AWS_Cloud_Development_Kit.md)
21. [AWS Cognito](./AWS_Cognito.md)

## What is Cloud-Computing?

- A model that enables businesses to acquire resources for their IT infrastructure needs on demand

- Cloud resources: Servers, storage, databases, networks, software applications, and so on

- Ensures the instantaneous availability of resources with lower cost and operational overhead

Benefits:

- Cost savings
- Data Loss Prevention
- Scalability
- Flexibility
- Security
- Data Analytics
- Mobile Access

Cloud Economics: Cloud computing reduces Capital Expenditures (CapEx) by eliminating the need to run and maintain your own infrastructure Your costs shift to Operating Expenses (OpEx), which are generally lower as you only pay for the resources you consume

## Types of Cloud

### Public Clouds

- Public Clouds are environments where network infra and resources are made accessible to the public
- Resources are partitioned and distributed amongst multiple customers or tenants

### Private Clouds

- Private Clouds environments are privately owned and hosted by an enterprise.
- Resources are generally made accessible to a private organization and their customers and partners

  - Managed private clouds are deployed and fully managed by a third-party, reducing the IT staffing needs for the enterprise
  - Dedicated private clouds are hosted on a public or private cloud to server a particular department within an enterprise

### Hybrid Clouds

- Hybrid Clouds are cloud environments that appear as a single cloud although they are built from multiple clouds ( connected through LANs, WANs, VPNs and/or APIs )
- Offer flexibility in deployment options by enabling workloads to move between private and public clouds based on computing needs

### Multi Clouds

- Multi-clouds are cloud environments that offer more than one cloud service from more than one public cloud service provider
- Resources are deployed across different cloud availability zones and regions
- All Hybrid Clouds are Multi Clouds

### Top Public Cloud Providers

- Amazon Web Services
- Microsoft Azure
- Google Cloud
- Others Public Cloud Providers
- Cloud Connectors

## Queries

1. IaaS vs PaaS vs SaaS

### Lift and Shift Cloud Migration

Lift and shift (or **rehosting**) is one way you might consider moving to the cloud. Simply put, lift and shift means moving a copy of an existing application and data to cloud infrastructure with minimal or no redesigning or modification.

## AWS Global Infrastructure

- [AWS Regions](#aws-regions)
- [AWS Availability Zones](#aws-availability-zones)
- AWS Data Centres
- [AWS Edge Locations/Points of Presence](#aws-points-of-presence)

> [AWS Global Infrastructure Map](https://infrastructure.aws/)

### AWS Regions

- AWS has **Regions all around the world**
- Names can be `us-east-1`, `eu-west-3`...
- A region is a **cluster of data centres**
- **Most AWS services are region-scoped**

#### How to choose an AWS Region?

- **_Compliance_ with data governance and legal requirements**: data never leaves a region without your explicit permission.
- **_Proximity_ to customers**: reduced latency.
- **_Available services_ within a Region**: new services and new features aren't available in every Region.
- **_Pricing_**: pricing varies region to region and is transparent in the service pricing page.

### AWS Availability Zones

- Each region has many Availability Zones (usually 3, min is 2, max is 6).

_Example:_

| AWS Region                 | Availability Zones |
| -------------------------- | ------------------ |
| `ap-sountheast-2` (Sydney) | `ap-sountheast-2a` |
|                            | `ap-sountheast-2b` |
|                            | `ap-sountheast-2c` |

- Each Availability Zone (AZ) is **one or more discrete data centres with redundant power, networking, and connectivity**
- They're separate from each other, so that they're **isolated from disasters**
- They're connected with high bandwidth, ultra-low latency networking

### AWS Points of Presence

- Amazon has around 216 Points of Presence (205 Edge Locations & 11 Regional Caches) in 84 cities across 42 countries
- Content is delivered to end users with lower latency

### Global and Scoped Services

- AWS has Global Services:

  - [Identity and Access Management](./AWS_IAM.md) (IAM)
  - [Route 53](./AWS_Route_53.md) (DNS service)
  - [CloudFront](./AWS_CloudFront.md) (Content Delivery Network)
  - WAF (Web Application Firewall)

- Most AWS services are Region-scoped:

  - [Amazon EC2](./AWS_EC2.md) (Infrastructure as a Service)
  - [Elastic Beanstalk](./AWS_Elastic_Beanstalk.md) (Platform as a Service)
  - [Lambda](./AWS_Lambda.md) (Function as a Service)
  - Rekognition (Software as a Service)

> [Region Table](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services)

## Developing on AWS

We can interact with AWS using AWS Console (Web Based App), AWS CLI, and AWS SDK.

- We can interact with services manually and they expose standard information for clients:

  - EC2 exposes a standard Linux machine we can use any way we want
  - RDS exposes a standard database we can connect to using a URL
  - ElastiCache exposes a cache URL we can connect to using a URL
  - ASG/ELB are automated and we don't have to program against them
  - Route53 was setup manual

- Developing against AWS has two components:

  - How to perform interactions with AWS without using the Online Console?
  - How to interact with AWS Proprietary services? (S3, DynamoDB, etc...)

- Developing and performing AWS tasks against AWS can be done in several ways

  - Using the AWS CLI on our local computer
  - Using the AWS CLI on our EC2 machines
  - Using the AWS SDK on our local computer
  - Using the AWS SDK on our EC2 machines
  - Using the AWS Instance Metadata Service for EC2

AWS CLI v2 Setup: [Install AWS CLI on Windows/Mac/Linux](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

### CLI Installation Troubleshooting

- If after installing the AWS CLI, you use it and you get the error:

  ```bash
  aws: command not found
  ```

- Then, on Linux, Mac and Windows **the aws executable is not in the PATH environment variable**
- PATH allows your system to know where to find the "aws" executable

### AWS CLI Configuration

- How to properly configure the CLI
- Computer (CLI) --> access over WWW --> AWS NETWORK --> AWS Account (checks credentials and permissions)
- Do not share your AWS Access Key and Secret key with anyone!

1. AWS CLI ON EC2... THE BAD WAY

   - To configure AWS CLI run `aws configure` on EC2
   - But... it's SUPER INSECURE
   - NEVER EVER EVER PUT YOUR PERSONAL CREDENTIALS ON AN EC2
   - Your PERSONAL credentials are PERSONAL and only belong on your PERSONAL computer
   - If the EC2 is compromised, so is your personal account
   - If the EC2 is shared, other people may perform AWS actions while impersonating you
   - For EC2, there's a better way... it's called AWS IAM Roles

2. AWS CLI ON EC2... THE RIGHT WAY

   - IAM Roles can be attached to EC2 instances
   - IAM Roles can come with a policy authorizing exactly what the EC2 instance should be able to do
   - AWS NETWORK --> EC2 Instance --> IAM ROLE --> CLI --> AWS Account (checks credentials and permissions of the ROLE)
   - EC2 Instances can then use these profiles automatically without any additional configurations
   - This is the best practice on AWS and you should 100% do this.

### AWS CLI Dry Runs

- Sometimes, we'd just like to make sure we have the permissions...
- But not actually run the commands!
- Some AWS CLI commands (such as EC2) can become expensive if they succeed, say if we wanted to try to create an EC2 Instance
- Some AWS CLI commands (not all) contain a `--dry-run` option to simulate API calls

### AWS CLI STS Decode Errors

- When you run API calls and they fail, you can get a error long-message
- This error message can be **decoded using** the **STS** command: `sts decode-authorization-message`

  ```bash
  aws sts decode-authorization-message --encoded-message <error_message>
  # It returns a JSON object containing all the error details
  ```

::: tip NOTE
If you get AccessDenied error while running STS, please attach a policy that allows _STS_ with access level of _Write_
:::

### AWS Profile

1. To add a profile into your working machine you need access keys.
2. Create access keys for an IAM user follow this [link](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
3. Now configure AWS CLI with the default profile:

   ```bash
   aws configure
   # It will ask for:
   # AWS Access Key ID [None]: aldjasldjsa
   # AWS Secret Access Key [None]: dkfljdsfljdf
   # Default region name [None]: us-west-2
   # Default output format [None]: json
   ```

4. This will create a `.aws` directory in your home directory. It will contain two files:

   - `config`: It will contain the region details
   - `credentials`: It will contain the profile access key and secret key

You can add multiple profiles:

1. Using `profile` parameter in the CLI you can define profiles and also use them
2. To add a new profile:

   ```bash
   aws configure --profile <profile_name>
   ```

3. So, to use this profile, just append `--profile <profile_name>` to any AWS CLI command you want to run

### MFA with CLI

- To use MFA with the CLI, you must enable MFA from the AWS Console for your profile

1. Create a temporary session
2. To do so, you must run the `sts getsessiontoken` API call

   ```bash
   aws sts get-session-token --serial-number arn-of-the-mfa-device --token-code code-from-token --duration-seconds 3600
   ```

3. Response:

   ```json
   {
     "Credentials": {
       "SecretAccessKey": "secret-access-key",
       "SessionToken": "temporary-session-token",
       "Expiration": "expiration-date-time",
       "AccessKeyId": "access-key-id"
     }
   }
   ```

4. Run the `aws configure --profile <profile_name>` command and provide the access-key and secret-access-key
5. Now open `~/.aws/credentials` file and add the session token:

   ```toml
   aws_session_token = sldjfljdsklfjsdklfjdskljfksdf324.234jv943.///;3423oj23f9
   ```

## AWS SDK

What if you want to perform actions on AWS directly from your applications code ? (without using the CLI)

- You can use an SDK (software development kit)!

- Official SDKs are:

  - Java
  - .NET
  - Node.js
  - PHP
  - Python (named `boto3`/`botocore`)
  - Go
  - Ruby
  - C++

- We have to use the AWS SDK when coding against AWS Services such as DynamoDB

- The AWS CLI uses the Python SDK (`boto3`)

::: tip NOTE
If you don't specify or configure a default region, then `us-east-1` will be chosen by default
:::

### AWS Limits (Quotas)

- API Rate Limits

  - Describe Instances API for EC2 has a limit of 100 calls per seconds
  - `GetObject` on S3 has a limit of 5500 GET per second per prefix
  - For Intermittent Errors: implement [Exponential Back-off](#exponential-back-off)
  - For Consistent Errors: request an API throttling limit increase

- Service Quotas (Service Limits)

  - Running On-Demand Standard Instances: 1152 vCPU
  - You can request a service limit increase by opening a ticket
  - You can request a service quota increase by using the Service Quotas API

#### Exponential Back-off

Exponential Back-off for any AWS service

- If you get _ThrottlingException_ intermittently, use exponential back-off
- Retry mechanism already included in AWS SDK API calls
- Must implement yourself if using the AWS API as-is or in specific cases

  - Must only implement the retries on `5xx` server errors and throttling
  - Do not implement on the `4xx` client errors

### AWS CLI Credentials Provider Chain

The CLI will look for credentials in this order:

1. Command line options: `--region`, `--output`, and `--profile`
2. Environment variables: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_SESSION_TOKEN`
3. CLI credentials file: `aws configure` and `~/.aws/credentials` on Linux/Mac & `C:\Users\user\.aws\credentials` on Windows
4. CLI configuration file: `aws configure` and `~/.aws/config` on Linux/macOS & `C:\Users\USERNAME\.aws\config` on Windows
5. Container credentials: for ECS tasks
6. Instance profile credentials: for EC2 Instance Profiles

#### AWS SDK Default Credentials Provider Chain

The Java SDK (example) will look for credentials in this order:

1. Java system properties: `aws.accessKeyId` and `aws.secretKey`
2. Environment variables: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
3. The default credential profiles file: ex at: `~/.aws/credentials`, shared by many SDK
4. Amazon ECS container credentials: for ECS containers
5. Instance profile credentials: used on EC2 instances

#### AWS Credentials Scenario

- An application deployed on an EC2 instance is using environment variables with credentials from an IAM user to call the Amazon S3 API
- The IAM user has S3FullAccess permissions
- The application only uses one S3 bucket, so according to best practices:

  - An IAM Role & EC2 Instance Profile was created for the EC2 instance
  - The Role was assigned the minimum permissions to access that one S3 bucket
  - The IAM Instance Profile was assigned to the EC2 instance, but it still had access to all S3 buckets. Why?
  - The credentials chain is still giving priorities to the environment variables

#### AWS Credentials Best Practices

- Overall, **NEVER EVER STORE AWS CREDENTIALS IN YOUR CODE**
- Best practice is for credentials to be inherited from the credentials chain
- If using working within AWS, use IAM Roles

  - For EC2 Instances Roles for EC2 Instances
  - For ECS Roles for ECS tasks
  - For Lambda Roles for Lambda functions

- If working outside of AWS, use environment variables/named profiles

#### Signing AWS API requests

- When you call the AWS HTTP API, you sign the request so that AWS can identify you, using your AWS credentials (access key & secret key)
- Note: some requests to Amazon S3 don't need to be signed
- If you use the SDK or CLI, the HTTP requests are signed for you
- You should sign an AWS HTTP request using Signature v4 (SigV4)

#### SigV4 Request examples

- HTTP Header option:

  ```http
  GET https://iam.amazonaws.com/?Action=ListUsers&Version=2010-05-08 HTTP/1.1
  Authorization: AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/iam/aws4_request,
  SignedHeaders=content-type;host;x-amz-date,
  Signature=aajkhf324f9h9fj397g5gb37934hff492345
  content-type: application/x-www-form-urlencoded; charset=utf-8
  ```

- Query String option (ex: S3 pre-signed URLs)

  ```http
  GET https://iam.amazonaws.com/?Action=ListUsers&Version=2010-05-08&
  X-Amz-Algorith=AWS4-HMAC-SHA256&
  X-Amz-Credential=AKIDEXAMPLE%2F20150830%2Fus-east-1%2Fiam%2Faws4_request&
  X-Amz-Date=20150830T123600Z&X-Amz-Expirese=60&X-Amz-SignedHeaders=content-type%3Bhost&
  X-Amz-Signature=aajkhf324f9h9fj397g5gb37934hff492345 HTTP/1.1
  content-type: application/x-www-form-urlencoded; charset=utf-8
  ```

## Scalability & High Availability

Scalability means that an application/system can handle greater loads by adapting

- There are two kinds of scalability:

  - Vertical Scalability
  - Horizontal Scalability (elasticity)

- Scalability is linked but different to High Availability

### Vertical Scalability

Vertically scalability means **increasing the size of the instance**

- Example, your application runs on a `t2.micro`
- Scaling that application vertically means running it on a `t2.large`
- Vertical scalability is **very common for non-distributed systems, such as a database**
- RDS, ElastiCache are services that can scale vertically
- There's **usually a limit to how much you can vertically scale (hardware limit)**

### Horizontal Scalability

Horizontal scalability means **increasing the number of instances/systems for your application**

- Horizontal scaling **implies distributed systems**. This is very common for web applications/modern applications
- It's **easy to horizontally scale** thanks the cloud offerings such as Amazon EC2

### High Availability

- High Availability usually goes hand in hand with horizontal scaling
- High availability means **running your application/system in at least 2 data centers** (Availability Zones)
- The goal of high availability is to **survive a data center loss**
- The high availability can be passive (RDS Multi AZ)
- The high availability can be active (horizontal scaling)

### High Availability and Scalability for EC2

- Vertical Scaling: Increase instance size (scale up/down)

  - From: `t2.nano` - 0.5G of RAM, 1 vCPU
  - To: `u-12tb1.metal` - 12.3TB of RAM, 448 vCPUs

- Horizontal Scaling: Increase number of instances (scale out/in)

  - Auto Scaling Group
  - Load Balancer

- High Availability: Run instances for the same application across multi AZ

  - Auto Scaling Group multi AZ
  - Load Balancer multi AZ

## What is a Distributed System?

A distributed computing system consists of multiple independent software components. These independent software components are located on different systems that communicate in such a way that they appear as a single system to the end user

- Cloud computing is based on the distributed systems model

Types of Distributed Systems:

1. Peer-to-Peer: in the peer-to-peer architectural model, responsibilities are uniformly distributed among machines in the system

2. Client-Server: In the client-server model, data on the server is accessed by clients

3. Three-tier: The three-tier architectural model enables information about the client to be stored in the middle tier

4. N-tier: The n-tier architecture allows an application or server to forward requests to additional enterprise services on the network
