---
title: EC2
description: EC2
prev: ./AWS
---

# EC2

EC2: **Elastic Compute Cloud** (_Infrastructure as a Service_)

It mainly consists in the capability of:

- Renting virtual machines (EC2) - Compute units
- Storing data on virtual drives (EBS)
- Distributing load across machines (ELB)
- Scaling the services using an auto-scaling group (ASG)

## EC2 Sizing and Configuration

- **Operating System (OS)**: Linux, Windows or Mac OS
- How much compute power & cores (CPU)
- How much random-access memory (RAM)
- How much storage space:
  - **Network-attached** (EBS & EFS)
  - **Hardware** (EC2 Instance Store)
- Network card: speed of the card, Public IP address
- Firewall rules: security group
- Bootstrap scrip (configure at first launch): EC2 User Data

## EC2 User Data

- It is possible to bootstrap the instances using an EC2 User Data script.
- **Bootstrapping** means launching commands when a machine starts
- That script is **only run once** at the instance **first start**
- EC2 user data is used to automate boot tasks such as:
  - Installing updates
  - Installing software
  - Downloading common files form the internet
  - Anything that is needed
- The EC2 User Data Script runs with the root user

## Creating an EC2 Instance

Steps:

1. Choose an [Amazon Machine Image](#ami) (AMI)
2. Choose an Instance Type:

   - `t2.micro` is available in free tire

3. Configure Instance Details

   - User data: Paste the bootstrap script here

   ```bash
   #!/bin/bash
   # install httpd (Linux 2 version)
   yum update -y
   yum install -y httpd
   systemctl start httpd
   systemctl enable httpd
   echo "<h1>Hello World from $(hostname -f)</h1>" > /var/www/html/index.html
   ```

4. Add Storage
5. Add Tags
6. Configure Security Group:
   - Create a **new** security group
   - Type: **HTTP**
7. Review Instance Launch
8. Select an existing key pair or create a new key pair
   - Download the Key pair
   - Used to SSH into the server

## EC2 Instance Types

[List of current EC2 instance types](https://aws.amazon.com/ec2/instance-types/):

1. General Purpose:

   - Great for a diversity of workloads such as web servers or code repositories
   - Balance between: Compute, Memory, and Networking

2. Compute Optimized:

   - Great for compute-intensive tasks that require high performance processors
   - Batch processing workloads
   - Media transcoding
   - High performance web servers
   - High performance computing (HPC)
   - Scientific modeling and machine learning
   - Dedicated gaming servers
   - Name starts with `c`

3. Memory Optimized:

   - Fast performance for workloads that process large data sets in memory
   - High performance, relational/non-relational databases
   - Distributed web scale cache stores
   - In-memory databases optimized for BI (business intelligence)

4. Accelerated Computing

5. Storage Optimized:

   - Great for storage-intensive tasks that require high, sequential read and write access to large data sets in local storage
   - High frequency online transaction processing (OLTP) systems
   - Relational & NoSQL databases
   - Cache for in-memory databases (for example: Redis)
   - Data warehousing applications
   - Distributed file systems

_Example:_ (EC2 instance types)

| Instance    | vCPU | Mem (GiB) | Storage        | Network Performance | EBS Bandwidth (Mbps) |
| ----------- | ---- | --------- | -------------- | ------------------- | -------------------- |
| t2.micro    | 1    | 1         | EBS-Only       | Low to Moderate     |                      |
| t2.xlarge   | 4    | 16        | EBS-Only       | Moderate            |                      |
| c5d.4xlarge | 16   | 32        | 1x400 NVMe SSD | Up to 10 Gbps       | 4700                 |
| r5.16xlarge | 64   | 512       | EBS-Only       | 20 Gbps             | 13600                |
| m5.8xlarge  | 32   | 128       | EBS-Only       | 10 Gbps             | 6800                 |

- Instance Features
- Measuring Instance Performance
- AWS EC2 naming convention:
  - `m5.2xlarge`
  - `m`: instance class
  - `5`: generation (AWS improves them over time)
  - `2xlarge`: size within the instance class

> [List all EC2 instance and calculate costs](https://instances.vantage.sh/)

## Security Groups

- Security Groups are the fundamental of network security in AWS
- They **control how traffic is allowed** into or out of our EC2 Instances
- Security groups **only contain allow** rules
- Security groups rules can reference by IP or by security groups

- Security groups are acting as a "firewall" on EC2 instances
- They regulate:

  - **Access to Ports**
  - Authorised IP ranges - IPv4 and IPv6
  - Control of **inbound network** (from other to the instance)
  - Control of **outbound network** (from the instance to other)

- **Can be attached to multiple instances**
- Locked down to a region/VPC combination
- Dose live "outside" the EC2 - **if traffic is blocked the EC2 instance won't see it**
- It's good to maintain one separate security group for SSH access
- If your application is not accessible (time out), then it's a security group issue
- If your application gives a "connection refused" error, then it's an application error or it's not launched
- All **inbound traffic** is **blocked by default**
- All **outbound traffic** is **authorised by default**

### Classic Ports

| Port | Protocol                                   | Details                        |
| ---- | ------------------------------------------ | ------------------------------ |
| 22   | SSH (Secure Shell)                         | log into a Linux instance      |
| 21   | FTP (File Transfer Protocol)               | upload files into a file share |
| 22   | SFTP (Secure File Transfer Protocol)       | upload files using SSH         |
| 80   | HTTP (Hypertext Transfer Protocol)         | access unsecured websites      |
| 443  | HTTPS (Hypertext Transfer Protocol Secure) | access secured websites        |
| 3389 | RDP (Remote Desktop Protocol)              | log into a Windows instance    |

## SSH into EC2 Instance

You can connect to an EC2 instance from your workstation through SSH.

### In Linux/Mac

Steps:

1. Copy the `Public IPv4 address` of the EC2 instance

2. Open your preferred terminal and use the `ssh` command as shown below:

   ```bash
   ssh ec2-user@3.235.85.95
   ```

3. You will get an error like this:

   ```bash
   ...
   ec2-user@3.235.85.95: Permission denied (publickey,gssapi-keyex,gssapi-with-mic).
   ```

4. This is because AWS will not allow anyone to connect to the EC2 instance without proper permissions. To proceed you will need the private key that you downloaded while creating the EC2 instance ([Creating an EC2 Instance](#creating-an-ec2-instance) - Step 8)

5. Use the downloaded key with the `-i` flag in `ssh` command:

   ```bash
   ssh -i EC2Tutorial.pem ec2-user@3.235.85.95
   ```

6. It should connect to the EC2 instance and you can start working on it

7. If you get error like this:

   ```bash
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   @         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   Permissions 0644 for '../Documents/AWS/EC2Tutorial.pem' are too open.
   It is required that your private key files are NOT accessible by others.
   This private key will be ignored.
   ...
   ```

8. This is because the key file has write permissions enabled. To correct the permission run:

   ```bash
   chmod 0400 EC2Tutorial.pem
   ```

9. Re-run the `ssh` command (step 5). It should connect to the EC2 instance and you can start working on it

### In Windows

1. Download and install `PuTTY`
2. After installing, open `PuTTYgen` (PuTTY Key Generator) to convert the AWS EC2 private key (.pem) file into a format that PuTTY understands called ppk (PuTTY Private Key)

   - `File` --> `Load private key` --> Select the private key
   - After importing the key select --> `Save private key` --> `Yes` --> Save the file `filename.ppk`

3. Copy the `Public IPv4 address` of the EC2 instance. Open PuTTY and paste the IP address in `Host Name (or IP address)` and append it with the username like this: `ec2-user@3.235.85.95`
4. Save the session and double click on the session to open it
5. You will get an error like: **Disconnected: No supported authentication methods available...**
6. This is because the private key is not included. To include the file:

   - `Connection` --> `SSH` --> `Auth` --> Browse and select the private key under `Private key file for authentication`

7. Now open the session
8. It should connect to the EC2 instance and you can start working on it

::: tip WINDOWS 10
Windows 10 comes with OpenSSH installed. In that case you can follow the steps mentioned above for [Linux/Mac](#in-linuxmac). No need to use PuTTY.
:::

## EC2 Instances Purchasing

1. [On-Demand Instances](#ec2-on-demand-instances): short workload, predictable pricing
2. [Reserved](#ec2-reserved-instances): (minimum 1 year)
   - **Reserved Instances**: long workloads (like databases)
   - **Convertible Reserved Instances**: long workloads with flexible instances
   - **Scheduled Reserved Instances**: example - every Thursday between 3 and 6 pm
3. [Spot Instances](#ec2-spot-instances): short workloads, cheap, can lose instances (less reliable)
4. [Dedicated Hosts](#ec2-dedicated-hosts): book an entire physical server, control instance placement
5. [Dedicated Instances](#ec2-dedicated-instances): no other customers will share your hardware

### EC2 On-Demand Instances

- **Pay for what you use**:
  - Linux: billing per second, after the first minute
  - All other operating systems (ex: Windows): billing per hour
- Has the **highest cost** but no upfront payment
- **No long-term commitment**
- Recommended for **short-term** and **uninterrupted workloads**, where you can't predict how the application will behave

### EC2 Reserved Instances

1. **Reserved Instances**:

   - **Up to 75% discount** compared to On-demand
   - Reservation period: **1 year** = + discount | **3 year** = +++ discount
   - Purchasing options: no upfront | partial upfront = + discount | All upfront = ++ discount
   - Reserve a specific instance type
   - Recommended for **steady-state usage application (think database)**

2. **Convertible Reserved Instance**:

   - Can **change the EC2 instance type**
   - Up to 54% discount

3. **Scheduled Reserved Instance**:

   - **Launch within time window you reserve**
   - When you require a fraction of day/week/month
   - Still commitment over 1 or 3 years
   - **Currently not available**

### EC2 Spot Instances

- Can get a **discount of up to 90%** compared to On-demand
- Instances that you can **"lose" at any point of time** if your max price is less than the current spot price
- The Most cost-efficient instances in AWS
- **Useful for workloads that are resilient to failure**:
  - Batch jobs
  - Data analysis
  - Image processing
  - Any distributed workloads
  - Workloads with a flexible start and end time
- Not suitable for critical jobs or databases

### EC2 Dedicated Hosts

- An Amazon EC2 Dedicated Host is a physical server with EC2 instance capacity fully dedicated to your use. Dedicated Hosts can help you address **compliance requirements** and reduce costs by allowing you to **use your existing server-bond software licences**
- Allocated for your account for a **3 year period reservation**
- **More expensive**
- Useful for software that have complicated licensing model (BYOL - Bring Your Own License)
- Or for companies that have strong regulatory or compliance needs

### EC2 Dedicated Instances

- Dedicated Instances running on hardware that's dedicated to a single customer (account)
- Dedicated Instances that belong to different AWS accounts are physically isolated at a hardware level
- May share hardware with other non-dedicated instances in the same account
- No control over instance placement (can move hardware after Stop/Start)

### Difference between Dedicated Instances and Dedicated Hosts

| Characteristic                                      | Dedicated Instances | Dedicated Hosts |
| --------------------------------------------------- | :-----------------: | :-------------: |
| Enables the use of dedicated physical servers       |          X          |        X        |
| Per instance billing (subject to $2 per region fee) |          X          |                 |
| Per host billing                                    |                     |        X        |
| Visibility of sockets, cores, host ID               |                     |        X        |
| Affinity between a host and instance                |                     |        X        |
| Targeted instance placement                         |                     |        X        |
| Automatic instance placement                        |          X          |        X        |
| Add capacity using an allocation request            |                     |        X        |

### AWS EC2 Instance Metadata

- AWS EC2 Instance Metadata is powerful but one of the least known features to developers
- It allows AWS EC2 instances to **"learn about themselves" without using an IAM Role for that purpose.**
- The URL is `http://169.254.169.254/latest/meta-data`
- You can retrieve the IAM Role name from the metadata, but you CANNOT retrieve the IAM Policy.
- Metadata = Info about the EC2 instance
- Userdata = launch script of the EC2 instance

```bash
curl http://169.254.169.254
```

AWS Instance calls `http://169.254.169.254/latest/meta-data/iam/security-credentials/<IAM_ROLE>` to get the Token attached a specific Role to make other calls.

## EC2 Instance Storage

### EBS Volume

- An EBS (Elastic Block Store) Volume is a network drive you can attach to your instances while they run
- It allows your instances to persist data, even after their termination
- They can only be mounted to one instance at a time (at the CCP level)
- They are bound to **a specific availability zone**
- Analogy: Think of them as a "network USB stick"

- It's a network drive (i.e. not a physical drive)
  - It uses the network to communicate the instance, which means there might be a bit of latency
  - It can be detached from an EC2 instance and attached to another one quickly
- It's locked to an Availability Zone (AZ)
  - An EBS Volume in `us-east-1a` cannot be attached to `us-east-1b`
  - To move a volume across, you first need to snapshot it
- Have a provisioned capacity (size in GBs, and IOPs)
  - You get billed for all the provisioned capacity
  - You can increase the capacity of the drive over time

::: tip NOTE

- CCP - Certified Cloud Practitioner - one EBS can be only mounted to one EC2 instance. Associate Level (Solutions Architect, Developer, SysOps): "multi-attach" feature for some EBS.
- Free tier: 30 GB of free EBS storage of type General Purpose (SSD) or Magnetic per month

:::

### EBS - Delete on Termination attribute

- Controls the EBS behaviour when an EC2 instance terminates
  - By default, the root EBS volume is deleted (attribute enabled)
  - By default, any other attached EBS volume is not deleted (attribute disabled)
- This can be controlled by the AWS console/AWS CLI
- Use case: preserve root volume when instance is terminated

### EBS Snapshots

- Make a backup (snapshot) of EBS volume at a point in time
- Not necessary to detach volume to do snapshot, but recommended
- Can copy snapshots across AZ or Region

### AMI

- AMI: Amazon Machine Image
- AMI are a customization of an EC2 instance
  - You add your own software, configuration, operating system, monitoring...
  - Faster boot/configuration time because all your software is pre-packaged
- AMI are built for a specific region (and can be copied across regions)
- EC2 instances can be launched from:
  - A Public AMI: AWS provided
  - Your own AMI: make and maintain them yourself
  - An AWS Marketplace AMI: an AMI someone else made (and potentially sells)

AMI Process (from an EC2 instance)

- Start an EC2 instance and customize it
- Stop the instance (for data integrity)
- Build an AMI - this will also create EBS snapshots
- Launch instances from other AMIs

### EC2 Instance Store

- EBS volumes are network drives with good but "limited" performance
- If you need a high-performance hardware disk, use EC2 Instance Store
- Better I/O performance
- EC2 Instance Store lose their storage if they're stopped (ephemeral)
- Good for buffer/cache/scratch data/temporary content
- Risk of data loss if hardware fails
- Backups and Replication are your responsibility

### EBS Volume Types

- EBS Volumes come in 6 types:
  - **gp2/gp3 (SSD)**: General purpose SSD volume that balances price and performance for a wide variety of workloads
  - **io1/io2 (SSD)**: Highest performance SSD volume for mission-critical low-latency or high throughput workloads
  - **st1 (HDD)**: Low cost HDD designed for frequently accessed, throughput intensive workloads
  - **sc1 (HDD)**: Lowest cost HDD volume designed for less frequently accessed workloads
- EBS Volumes are characterized in Size | Throughput | IOPS (I/O Ops Per Sec)
- **Only gp2/gp3 and io1/io2 can be used as boot volumes**

1. General Purpose SSD

   - Cost effective storage, low-latency
   - System boot volumes, Virtual desktops, Development and test environments
   - 1 GiB - 16 TiB
   - gp3:
     - Baseline of 3,000 IOPS and throughput of 125 MiB/s
     - Can increase IOPS up to 16,000 and throughput up to 1000 MiB/s independently
   - gp2:
     - Small gp2 volumes can burst IOPS to 3,000
     - Size of the volume and IOPS are linked, max IOPS is 16,000
     - 3 IOPS per GB, means at 5,334 GB we are at the max IOPS

2. Provisioned IOPS (PIOPS) SSD

   - Critical business applications with sustained IOPS performance
   - Or applications that need more than 16,000 IOPS
   - Great for databases workloads (sensitive to storage perf and consistency)
   - io1/io2 (4 GiB - 16 TiB):
     - Max PIOPS: 64,000 for Nitro EC2 instances & 32,000 for other
     - Can increase PIOPS independently from storage size
     - io2 have more durability and more IOPS per GiB (at the same price as io1)
   - io2 Block Express (4 GiB - 64 TiB):
     - Sub-millisecond latency
     - Max PIOPS: 256,000 with an IOPS:GiB ratio of 1,000:1
   - Supports EBS Multi-attach

3. Hard Disk Drives (HDD)

   - Cannot be a boot volume
   - 125 MiB to 16 TiB
   - Throughput Optimized HDD (st1)
     - Big Data, Data Warehouses, Log Processing
     - Max throughput 500 MiB/s - max IOPS 500
   - Cold HDD (sc1):
     - For data that is infrequently accessed
     - Scenarios where lowest cost is important
     - Max throughput 250 MiB/s - max IOPS 250

#### EBS Multi-Attach - io1/io2 family

- Attach the same EBS volume to multiple EC2 instances in the same AZ
- Each instance has full read & write permissions to the volume
- Use case:
  - Achieve higher application availability in clustered Linux applications (ex: Teradata)
  - Applications must manage concurrent write operations
- Must use a file system that's cluster-aware (not XFS, EX4, etc...)

### EFS - Elastic File System

- Managed NFS (network file system) that can be mounted on many EC2
- EFS works with EC2 instances in multi-AZ
- Highly available, scalable, expensive (3x gp2), pay per use

- Use cases: content management, web serving, data sharing, Wordpress
- Uses NFSv4.1 protocol
- Uses security group to control access to EFS
- Compatible with Linux based AMI (not Windows)
- Encryption at rest using KMS

- POSIX file system (~Linux) that has a standard file API
- File system scales automatically, pay-per-use, no capacity planning!

#### EFS - Performance & Storage Classes

- EFS Scale
  - 1000s of concurrent NFS clients, 10 GB+ /s throughput
  - Grow to Petabyte-scale network file system, automatically
- Performance mode (set at EFS creation time)
  - General purpose (default): latency-sensitive use cases (web server, CMS, etc...)
  - Max I/O - higher latency, throughput, highly parallel (big data, media processing)
- Throughput mode
  - Bursting (1 TB = 50MiB/s + burst of up to 100MiB/s)
  - Provisioned: set your throughput regardless of storage size, ex: 1 GiB/s for 1 TB storage
- Storage Tiers (lifecycle management feature - move file after N days)
  - Standard: for frequently accessed files
  - Infrequent access (EFS-IA): cost to retrieve files, lower price to store

### Creating EFS

Steps:

1. Name (Optional)
2. Availability and Durability:
   - Region (across multiple AZs)
   - One Zone (within a single AZ)
3. Automatic backups (Additional pricing)
4. Lifecycle management (Saves money by moving less frequently used files to EFS-IF storage)
5. Performance mode:
   - General Purpose
   - Maz I/O
6. Throughput mode:
   - Bursting (scales with file system)
   - Provisioned (fixed at specific amount)
7. Enable Encryption
8. Network access
9. Chose Virtual Private Cloud (VPC)
10. Mount targets:
    - Availability Zones
    - Subnet ID
    - IP address
    - Security Groups (create a new security group and add it here or use the existing ones) with inbound rules:
      - Type: NFS
    - Recommended enabling EFS service-linked role using AWS IAM.
11. File system policy (optional)

### Mounting EFS onto EC2 Instances

Steps:

1. Before starting we need to install `amazon-efs-utils` package in the EC2 instance

   ```bash
   sudo yum install -y amazon-efs-utils
   ```

2. Create a `efs` directory

   ```bash
   mkdir efs
   ```

3. Now mount the EFS onto the `efs` directory

   ```bash
   sudo mount -t efs -o tls fs-5dafeeac:/ efs
   ```

4. `cd` into `efs` directory and starting placing files

### EBS vs EFS

1. EBS - Elastic Block Storage

   - EBS volumes...
     - Can be attached to only one instance at a time
     - Are locked at the Availability Zone (AZ) level
     - gp2: IO increases if the disk size increases
     - io1: can increase IO independently
   - To migrate an EBS volume across AZ
     - Take a snapshot
     - Restore the snapshot to another AZ
     - EBS backups use IO and you shouldn't run them while your application is handling a lot of traffic
   - Root EBS Volumes of instances get terminated by default if the EC2 instance gets terminated. (you can disable that)

2. EFS - Elastic File System

   - Mounting 100s of instances across AZ
   - EFS share website files (WordPress)
   - Only for Linux Instances (POSIX) Availability Zone 1 Linux

   - EFS has a higher price point than EBS
   - Can leverage EFS-IA for cost savings

   - Remember: EFS vs EBS vs Instance Store
