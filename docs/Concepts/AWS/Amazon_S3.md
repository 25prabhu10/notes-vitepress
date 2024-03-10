---
title: Amazon S3
description: Amazon S3
prev: ./AWS
---

# Amazon S3 (Simple Storage Service)

- Amazon S3 is one of the **main building blocks** of AWS
- It's advertised as **"infinitely scaling" storage**
- It's widely popular
- Many websites use Amazon S3 as a backbone
- Many AWS services uses Amazon S3 as an integration as well

## Buckets

- Amazon S3 allows people to **store objects (files) in "buckets" (directories)**
- Buckets **must have a globally unique name**
- Buckets are **defined** at the **region level**
- Naming convention:
  - No uppercase
  - No underscore
  - 3-63 characters long
  - Not an IP
  - Must start with lowercase letter or number

## Objects

- Objects (files) have a **Key**
- The key is the **FULL path**:
  - `s3://my-bucket/my_file.txt`
  - `s3://my-bucket/my_folder1/another_folder/my_file.txt`
- The key is composed of **prefix + object name**
  - `s3://my-bucket/my_folder1/another_folder/my_file.txt`
- There's no concept of "directories" within buckets (although the UI will trick you to think otherwise)
- Just keys with very long names that contain slashes ("/")
- Object values are the content of the body:
  - Max Object Size is 5TB (5000GB)
  - If uploading more than 5GB, must use "multi-part upload"
- Metadata (list of text key / value pairs - system or user metadata)
- Tags (Unicode key / value pair - up to 10) - useful for security / lifecycle
- Version ID (if versioning is enabled)

## Create a Amazon S3 Bucket

Steps:

1. Goto Amazon S3
2. Create bucket:

   - General configuration
   - Bucket name: this should be unique name across global S3 (like a username for a website)
   - AWS Region: (S3 console is Global but Buckets are Regional)
   - Block all public access
   - Bucket Versioning: Disabled
   - Tags
   - Default encryption: Disabled
   - Advanced settings: Object lock (disabled)

## Amazon S3 - Versioning

- You can version your files in Amazon S3
- It is enabled at the bucket level
- Same key overwrite will increment the "version": 1, 2, 3....
- It is best practice to version your buckets
  - Protect against unintended deletes (ability to restore a version)
  - Easy roll back to previous version
- Notes:
  - Any file that is not versioned prior to enabling versioning will have version "null"
  - Suspending versioning does not delete the previous versions

## S3 Encryption for Objects

- There are 4 methods of encrypting objects in S3
  - SSE-S3: encrypts S3 objects using keys handled & managed by AWS
  - SSE-KMS: leverage AWS Key Management Service to manage encryption keys
  - SSE-C: when you want to manage your own encryption keys
  - Client Side Encryption
- It's important to understand which ones are adapted to which situation for the exam

### SSE-S3

- SSE-S3: encryption using keys handled & managed by Amazon S3
- Object is encrypted server side
- AES-256 encryption type
- Must set header: "x-amz-server-side-encryption": "AES256"

### SSE-KMS

- SSE-KMS: encryption using keys handled & managed by KMS
- KMS Advantages: user control + audit trail
- Object is encrypted server side
- Must set header: "x-amz-server-side-encryption": "aws:kms"

### SSE-C

- SSE-C: server-side encryption using data keys fully managed by the customer outside of AWS
- Amazon S3 does not store the encryption key you provide
- HTTPS must be used
- Encryption key must provided in HTTP headers, for every HTTP request made

### Client Side Encryption

- Client library such as the Amazon S3 Encryption Client
- Clients must encrypt data themselves before sending to S3
- Clients must decrypt data themselves when retrieving from S3
- Customer fully manages the keys and encryption cycle

### Encryption in transit (SSL/TLS)

- Amazon S3 exposes:
  - HTTP endpoint: non encrypted
  - HTTPS endpoint: encryption in flight
- You're free to use the endpoint you want, but HTTPS is recommended
- Most clients would use the HTTPS endpoint by default
- HTTPS is mandatory for SSE-C
- Encryption in flight is also called SSL / TLS

## S3 Security

- User based
  - IAM policies - which API calls should be allowed for a specific user from IAM console
- Resource Based
  - Bucket Policies - bucket wide rules from the S3 console - allows cross account
  - Object Access Control List (ACL) - finer grain
  - Bucket Access Control List (ACL) - less common
- Note: an IAM principal can access an S3 object if
  - the user IAM permissions allow it OR the resource policy ALLOWS it
  - AND there's no explicit DENY

### S3 Bucket Policies

- JSON based policies
  - Resources: buckets and objects
  - Actions: Set of API to Allow or Deny
  - Effect: Allow / Deny
  - Principal: The account or user to apply the policy to
- Use S3 bucket for policy to:
  - Grant public access to the bucket
  - Force objects to be encrypted at upload
  - Grant access to another account (Cross Account)

### Bucket settings for Block Public Access

- Block public access to buckets and objects granted through
  - new access control lists (ACLs)
  - any access control lists (ACLs)
  - new public bucket or access point policies
- Block public and cross-account access to buckets and objects through any public bucket or access point policies
- These settings were created to prevent company data leaks
- If you know your bucket should never be public, leave these on
- Can be set at the account level

### S3 Default Encryption vs Bucket Policies

- One way to "force encryption" is to use a bucket policy and refuse any API call to PUT an S3 object without encryption headers:
- Another way is to use the "default encryption" option in S3 (which is SSE-S3)
- Note: Bucket Policies are evaluated before "default encryption"

### S3 Security - Other

- Networking:
  - Supports VPC Endpoints (for instances in VPC without www internet)
- Logging and Audit:
  - S3 Access Logs can be stored in other S3 bucket
  - API calls can be logged in AWS CloudTrail
- User Security:
  - MFA Delete: MFA (multi factor authentication) can be required in versioned buckets to delete objects
  - Pre-Signed URLs: URLs that are valid only for a limited time (ex: premium video service for logged in users)

#### S3 Pre-Signed URLs

- Can generate pre-signed URLs using SDK or CLI
  - For downloads (easy, can use the CLI)
  - For uploads (harder, must use the SDK)
- Valid for a default of 3600 seconds, can change timeout with `--expires-in` [TIME_BY_SECONDS] argument
- Users given a pre-signed URL inherit the permissions of the person who generated the URL for GET / PUT
- Examples :
  - Allow only logged-in users to download a premium video on your S3 bucket
  - Allow an ever changing list of users to download files by generating URLs dynamically
  - Allow temporarily a user to upload a file to a precise location in our bucket

##### Generate S3 Pre-Signed URL using CLI

1. Use the below command:

   ```bash
   aws s3 presigned <s3://mybuckt/myobject> --region my-region

   # Add expire time
   aws s3 presigned <s3://mybuckt/myobject> --expires-in 300 --region my-region

   # If you are getting any errors then run this
   # set the proper signature version in order not to get issue
   # when generating URLs for encrypted files
   aws configure set default.s3.signature_version s3v4
   ```

### Create a S3 Bucket policy

Steps:

1. Goto Amazon S3 --> the bucket --> Permissions
2. Bucket policy (written in JSON)
3. Policy Generator:

   1. Select Policy Type: S3 Bucket Policy
   2. Add Statement(s):
      - Effect: Allow or Deny
      - Principal: \* (everywhere)
      - AWS Service: Amazon S3
      - Actions: PutObject (Upload file)
      - Amazon Resource Name (ARN): (arn:aws:s3:::<bucket_name>/<key_name>) add \* instead of <key_name> to select all objects
      - Add Conditions (optional)
        - Condition: Null (Check value of Key)
        - Key: s3:x-amz-server-side-encryption
        - Value: true
      - Add more statements
   3. Generate Policy

4. Paste the generated policy and save changes

## S3 Websites

- S3 can host static websites and have them accessible on the www
- The website URL will be:
  - `<bucket-name>.s3-website-<AWS-region>.amazonaws.com`
    OR
  - `<bucket-name>.s3-website.<AWS-region>.amazonaws.com`
- If you get a 403 (Forbidden) error, make sure the bucket policy allows public reads!

### S3 as a static website host

Steps:

1. Create a bucket and upload the static site `index.html` and error page `error.html` for 404 errors
2. Unblock all public access
3. Add AWS Policy to make objects publicly accessible
4. Goto Properties --> Static website hosting:

   - Static website hosting: Enable
   - Hosting type: Host a static website (or Redirect requests for an object)
   - Index document: `index.html`
   - Error document (optional): `error.html`

5. Open the URL present in the Static website hosting section

### CORS

- An origin is a scheme (protocol), host (domain) and port
  - E.g.: `https://www.example.com` (implied port is 443 for HTTPS, 80 for HTTP)
- CORS means Cross-Origin Resource Sharing
- Web Browser based mechanism to allow requests to other origins while visiting the main origin
- Same origin: `http://example.com/app1` & `http://example.com/app2`
- Different origins: `http://www.example.com` & `http://other.example.com`
- The requests won't be fulfilled unless the other origin allows for the requests, using CORS Headers (ex: Access-Control-Allow-Origin)

#### S3 CORS

- If a client does a cross-origin request on our S3 bucket, we need to enable the correct CORS headers
- It's a popular exam question
- You can allow for a specific origin or for \* (all origins)

## S3 MFA-Delete

- MFA (multi factor authentication) forces user to generate a code on a device (usually a mobile phone or hardware) before doing important operations on S3
- To use MFA-Delete, enable Versioning on the S3 bucket
- You will need MFA to
  - permanently delete an object version
  - suspend versioning on the bucket
- You won't need MFA for
  - enabling versioning
  - listing deleted versions
- Only the bucket owner (root account) can enable/disable MFA-Delete
- MFA-Delete currently can only be enabled using the CLI

Steps:

1. For this you need to enable MFA for your account
2. Run the below command to enable MFA delete:

   ```bash
   aws s3api put-bucket-versioning --bucket <bucket_name> --versioning-configuration Status=Enabled,MFADelete=Enabled --mfa "<arn-of-mfa-device> <mfa-code>" --profile root-mfa-delete-demo
   ```

3. Run the below command to disable MFA delete:

   ```bash
   aws s3api put-bucket-versioning --bucket <bucket_name> --versioning-configuration Status=Enabled,MFADelete=Disabled --mfa "<arn-of-mfa-device> <mfa-code>" --profile root-mfa-delete-demo
   ```

## S3 Access Logs

- For audit purpose, you may want to log all access to S3 buckets
- Any request made to S3, from any account, authorized or denied, will be logged into another S3 bucket
- That data can be analyzed using data analysis tools...
- Or Amazon Athena
- The log format is at: [AWS log format](https://docs.aws.amazon.com/AmazonS3/latest/dev/LogFormat.html)

### S3 Access Logs: Warning

- Do not set your logging bucket to be the monitored bucket
- It will create a logging loop, and your bucket will grow in size exponentially

## S3 Replication (CRR & SRR)

- Must enable versioning in source and destination
- Cross Region Replication (CRR)
- Same Region Replication (SRR)
- Buckets can be in different accounts
- Copying is asynchronous
- Must give proper IAM permissions to S3 eu-west-1
- CRR - Use cases: compliance, lower latency access, replication across accounts
- SRR - Use cases: log aggregation, live replication between production and test accounts

### S3 Replication - Notes

- After activating, only new objects are replicated (not retroactive)
- For DELETE operations:
- Can replicate delete markers from source to target (optional setting)
- Deletions with a version ID are not replicated (to avoid malicious deletes)
- There is no "chaining" of replication
- If bucket 1 has replication into bucket 2, which has replication into bucket 3
- Then objects created in bucket 1 are not replicated to bucket 3

### Replicate S3 Bucket

Steps:

1. Open the original bucket
2. Goto Management --> Replication rules
3. Create replication rules:

   - Replication rule name:
   - Status: Enabled
   - Source bucket:
     - Limit the scope
     - Apply to all objects in this bucket
   - Destination:
     - Choose a bucket in this account: Bucket name
     - Specify a bucket in another account: Account ID, Bucket name
     - Delete marker replication
   - Create or use IAM Role

## S3 Storage Classes

- Amazon S3 Standard - General Purpose
- Amazon S3 Standard - Infrequent Access (IA)
- Amazon S3 One Zone - Infrequent Access
- Amazon S3 Intelligent Tiering
- Amazon Glacier
- Amazon Glacier Deep Archive
- Amazon S3 Reduced Redundancy Storage (deprecated - omitted)

### S3 Standard - General Purpose

- High durability (99.999999999%) of objects across multiple AZ
- If you store 10,000,000 objects with Amazon S3, you can on average expect to incur a loss of a single object once every 10,000 years
- 99.99% Availability over a given year
- Sustain 2 concurrent facility failures
- Use Cases: Big Data analytics, mobile & gaming applications, content distribution...

### S3 Standard - Infrequent Access (IA)

- Suitable for data that is less frequently accessed, but requires rapid access when needed
- High durability (99.999999999%) of objects across multiple AZs
- 99.9% Availability
- Low cost compared to Amazon S3 Standard
- Sustain 2 concurrent facility failures
- Use Cases: As a data store for disaster recovery, backups...

### S3 One Zone - Infrequent Access (IA)

- Same as IA but data is stored in a single AZ
- High durability (99.999999999%) of objects in a single AZ; data lost when AZ is destroyed
- 99.5% Availability
- Low latency and high throughput performance
- Supports SSL for data at transit and encryption at rest
- Low cost compared to IA (by 20%)
- Use Cases: Storing secondary backup copies of on-premise data, or storing data you can recreate

### S3 Intelligent Tiering

- Same low latency and high throughput performance of S3 Standard
- Small monthly monitoring and auto-tiering fee
- Automatically moves objects between two access tiers based on changing access patterns
- Designed for durability of 99.999999999% of objects across multiple Availability Zones
- Resilient against events that impact an entire Availability Zone
- Designed for 99.9% availability over a given year

### Amazon Glacier

- Low cost object storage meant for archiving / backup
- Data is retained for the longer term (10s of years)
- Alternative to on-premise magnetic tape storage
- Average annual durability is 99.999999999%
- Cost per storage per month ($0.004 / GB) + retrieval cost
- Each item in Glacier is called "Archive" (up to 40TB)
- Archives are stored in "Vaults"

### Amazon Glacier & Glacier Deep Archive

- Amazon Glacier - 3 retrieval options:
  - Expedited (1 to 5 minutes)
  - Standard (3 to 5 hours)
  - Bulk (5 to 12 hours)
  - Minimum storage duration of 90 days
- Amazon Glacier Deep Archive - for long term storage - cheaper:
  - Standard (12 hours)
  - Bulk (48 hours)
  - Minimum storage duration of 180 days

### S3 Storage Classes Comparison

|                                    |      S3 Standard       | S3 Intelligent-Tiering |     S3 Standard-IA     |     S3 One Zone-IA     |       S3 Glacier       | S3 Glacier Deep Archive |
| ---------------------------------- | :--------------------: | :--------------------: | :--------------------: | :--------------------: | :--------------------: | :---------------------: |
| Designed for durability            | 99.999999999% (11 9's) | 99.999999999% (11 9's) | 99.999999999% (11 9's) | 99.999999999% (11 9's) | 99.999999999% (11 9's) | 99.999999999% (11 9's)  |
| Designed for availability          |         99.99%         |         99.9%          |         99.9%          |         99.5%          |         99.99%         |         99.99%          |
| Availability SLA                   |         99.9%          |          99%           |          99%           |          99%           |         99.9%          |          99.9%          |
| Availability Zones                 |          >=3           |          >=3           |          >=3           |           1            |          >=3           |           >=3           |
| Minimum capacity charge per object |          N/A           |          N/A           |         128KB          |         128KB          |          40KB          |          40KB           |
| Minimum storage duration charge    |          N/A           |        30 days         |        30 days         |        30 days         |        90 days         |        180 days         |
| Retrieval fee                      |          N/A           |          N/A           |    per GB retrieved    |    per GB retrieved    |    per GB retrieved    |    per GB retrieved     |

S3 Storage Classes - Price Comparison

_Example:_ us-east-2

|                                    |  S3 Standard  | S3 Intelligent-Tiering | S3 Standard-IA | S3 One Zone-IA |                                  S3 Glacier                                   |             S3 Glacier Deep Archive              |
| ---------------------------------- | :-----------: | :--------------------: | :------------: | :------------: | :---------------------------------------------------------------------------: | :----------------------------------------------: |
| Storage Cost (per GB per month     |    $0.023     |    $0.0125 - $0.023    |    $0.0125     |     $0.01      |                            $0.004 Minimum 90 days                             |            $0.00099 Minimum 180 days             |
| Retrieval Cost (per 1000 requests) |  GET $0.0004  |      GET $0.0004       |   GET $0.001   |   GET $0.001   |     GET $0.0004 + (Expedited - $10.0) (Standard - $0.05) (Bulk - $0.025)      | GET $0.0004 + (Standard - $0.10) (Bulk - $0.025) |
| Time to retrieve                   | Instantaneous |     Instantaneous      | Instantaneous  | Instantaneous  | (Expedited - 1 to 5 minutes) (Standard - 3 to 5 hours) (Bulk - 5 to 12 hours) |     (Standard - 12 hours) (Bulk - 48 hours)      |
| Monitoring Cost (per 1000 objects) |               |        $0.0025         |                |                |                                                                               |                                                  |

S3: Moving between storage classes

- You can transition objects between storage classes
- For infrequently accessed object, move them to STANDARD_IA
- For archive objects you don't need in real-time, GLACIER or DEEP_ARCHIVE
- Moving objects can be automated using a lifecycle configuration

## S3 Lifecycle Rules

- Transition actions: It defines when objects are transitioned to another storage class.
  - Move objects to Standard IA class 60 days after creation
  - Move to Glacier for archiving after 6 months
- Expiration actions: configure objects to expire (delete) after some time
  - Access log files can be set to delete after a 365 days
  - Can be used to delete old versions of files (if versioning is enabled)
  - Can be used to delete incomplete multi-part uploads
- Rules can be created for a certain prefix (ex - s3://mybucket/mp3/\*)
- Rules can be created for certain objects tags (ex - Department: Finance)

### S3 Lifecycle Rules - Scenario 1

- Your application on EC2 creates images thumbnails after profile photos are uploaded to Amazon S3. These thumbnails can be easily recreated, and only need to be kept for 45 days. The source images should be able to be immediately retrieved for these 45 days, and afterwards, the user can wait up to 6 hours. How would you design this?
- S3 source images can be on STANDARD, with a lifecycle configuration to transition them to GLACIER after 45 days.
- S3 thumbnails can be on ONEZONE_IA, with a lifecycle configuration to expire them (delete them) after 45 days.

### S3 Lifecycle Rules - Scenario 2

- A rule in your company states that you should be able to recover your deleted S3 objects immediately for 15 days, although this may happen rarely. After this time, and for up to 365 days, deleted objects should be recoverable within 48 hours.
- You need to enable S3 versioning in order to have object versions, so that "deleted objects" are in fact hidden by a "delete marker" and can be recovered
- You can transition these "noncurrent versions" of the object to S3_IA
- You can transition afterwards these "noncurrent versions" to DEEP_ARCHIVE

### Create Lifecycle rules

Steps:

1. Goto Bucket --> Management --> Lifecycle rules
2. Create lifecycle rule:

   - Lifecycle rule name
   - Choose a rule scope: (Limit the scope...) (...all objects...)
   - Actions:
     - Transition _current_ versions of objects between storage classes
     - Transition _previous_ versions of objects between storage classes
     - Expire _current_ versions of objects
     - Permanently delete _previous_ versions of objects
     - Delete expired delete markers or incomplete multipart uploads
   - Transition current versions of objects between storage classes:
     - Storage class transition: Standard-IA --> Intelligent-Tiering --> Glacier --> Glacier Deep Archive
     - Days after object creation: 30 --> 70 --> 180

## S3: Baseline Performance

- Amazon S3 automatically scales to high request rates, latency 100-200 ms
- Your application can achieve at least 3,500 PUT/COPY/POST/DELETE and 5,500 GET/HEAD requests per second per prefix in a bucket.
- There are no limits to the number of prefixes in a bucket.
- Example (object path => prefix):
  - bucket/folder1/sub1/file => /folder1/sub1/
  - bucket/folder1/sub2/file => /folder1/sub2/
  - bucket/1/file => /1/
  - bucket/2/file => /2/
- If you spread reads across all four prefixes evenly, you can achieve 22,000 requests per second for GET and HEAD

### S3: KMS Limitation

- If you use SSE-KMS, you may be impacted by the KMS limits
- When you upload, it calls the GenerateDataKey KMS API
- When you download, it calls the Decrypt KMS API
- Count towards the KMS quota per second (5500, 10000, 30000 req/s based on region)
- You can request a quota increase using the Service Quotas Console

### S3 Performance

- Multi-Part upload:
  - recommended for files > 100MB, must use for files > 5GB
  - Can help parallelize uploads (speed up transfers)
- S3 Transfer Acceleration
  - Increase transfer speed by transferring file to an AWS edge location which will forward the data to the S3 bucket in the target region
  - Compatible with multi-part upload

### S3 Performance: S3 Byte-Range Fetches

- Parallelize GETs by requesting specific byte ranges
- Better resilience in case of failures
- Can be used to retrieve only partial
- Can be used to speed up downloads data (for example the head of a file)

## S3 Select & Glacier Select

- Retrieve less data using SQL by performing server side filtering
- Can filter by rows & columns (simple SQL statements)
- Less network transfer, less CPU cost client-side

## S3 Event Notifications

- S3:ObjectCreated, S3:ObjectRemoved, S3:ObjectRestore, S3:Replication...
- Object name filtering possible (\*.jpg)
- Use case: generate thumbnails of images uploaded to S3
- Can create as many "S3 events" as desired
- S3 event notifications typically deliver events in seconds but can sometimes take a minute or longer
- If two writes are made to a single non-versioned object at the same time, it is possible that only a single event notification will be sent
- If you want to ensure that an event notification is sent for every successful write, you can enable versioning on your bucket.

## AWS Athena

- Serverless service to perform analytics directly against S3 files
- Uses SQL language to query the files
- Has a JDBC / ODBC driver
- Charged per query and amount of data scanned
- Supports CSV, JSON, ORC, Avro, and Parquet (built on Presto)
- Use cases: Business intelligence / analytics / reporting, analyze & query VPC Flow Logs, ELB Logs, CloudTrail trails, etc...
- Exam Tip: Analyze data directly on S3 => use Athena
