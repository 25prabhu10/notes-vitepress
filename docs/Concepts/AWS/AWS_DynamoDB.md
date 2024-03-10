---
title: AWS DynamoDB
description: AWS DynamoDB
prev: ./AWS
---

# AWS DynamoDB

NoSQL Serverless Database

## Traditional Architecture

- Client --> API Layer (EC2 + ASG + ELB) --> Database Layer (RDS - MySQL, PostgreSQL, etc...)
- Traditional applications leverage RDBMS databases
- These databases have the SQL query language
- Strong requirements about how the data should be modeled
- Ability to do join, aggregations, computations
- Vertical scaling (means usually getting a more powerful CPU / RAM / IO)

## NoSQL databases

- NoSQL databases are non-relational databases and are **distributed**
- NoSQL databases include MongoDB, DynamoDB, etc.
- NoSQL databases **do not support join**
- All the data that is needed for a query is present in one row
- NoSQL databases **don't perform aggregations** such as "SUM"
- **NoSQL databases scale horizontally**
- There's no "right or wrong" for NoSQL vs SQL, they just require to model the data differently and think about user queries differently

## DynamoDB

- Fully Managed, Highly available with replication across 3 AZ
- NoSQL database - not a relational database
- Scales to massive workloads, distributed database
- Millions of requests per seconds, trillions of row, 100s of TB of storage
- Fast and consistent in performance (low latency on retrieval)
- Integrated with IAM for security, authorization and administration
- Enables event driven programming with DynamoDB Streams
- Low cost and auto scaling capabilities

### Features

- DynamoDB is made of **tables**
- Each table has a **primary key** (must be decided at creation time)
- Each table can have an infinite number of items (= rows)
- Each item has **attributes** (can be added over time - can be null)
- Maximum **size** of a item is **400KB**
- Data types supported are:
  - Scalar Types: String, Number, Binary, Boolean, Null
  - Document Types: List, Map
  - Set Types: String Set, Number Set, Binary Set

## Primary Keys

- Option 1: **Partition key only (HASH)**
- Partition key must be unique for each item
- Partition key must be "diverse" so that the data is distributed
- _Example:_ `user_id` for a users table

- Option 2: **Partition key + Sort Key**
- The **combination must be unique**
- Data is grouped by partition key
- Sort key == range key
- _Example:_ **users-games** table
  - **user_id** for the partition key
  - **game_id** for the sort key

### Partition Keys Exercise

- We're building a movie database
- What is the best partition key to maximize data distribution?
  - `movie_id`
  - `producer_name`
  - `leader_actor_name`
  - `movie_language`
- `movie_id` has the highest cardinality so it's a good candidate
- `movie_language` doesn't take many values and may be skewed towards English so it's not a great partition key

## Provisioned Throughput

- Table must have provisioned read and write capacity units
- **Read Capacity Units** (RCU): throughput for reads
- **Write Capacity Units** (WCU): throughput for writes
- Option to setup auto-scaling of throughput to meet demand
- Throughput can be exceeded temporarily using _burst credit_
- If burst credit are empty, you'll get a `ProvisionedThroughputException`
- It's then advised to do an exponential back-off retry

### Write Capacity Units

- One write capacity unit represents **one write per second for an item up to 1 KB in size**
- If the items are larger than 1 KB, more WCU are consumed
- _Example_ 1: we write 10 objects per seconds of 2 KB each.
  - We need `2 * 10 = 20 WCU`
- _Example_ 2: we write 6 objects per second of 4.5 KB each
  - We need `6 * 5 = 30 WCU` (4.5 gets rounded to the upper KB)
- _Example_ 3: we write 120 objects per minute of 2 KB each
  - We need `120 / 60 * 2 = 4 WCU`

#### Strongly Consistent Read vs Eventually Consistent Read

- **Eventually Consistent Read**: If we read just after a write, it's possible we'll get unexpected response because of replication (wait time is needed for replication)
- **Strongly Consistent Read**: If we read just after a write, we will get the correct data (slower)
- **By default**: DynamoDB uses Eventually Consistent Reads, but [GetItem](#reading-data), [Query](#query) & [Scan](#scan) provide a `ConsistentRead` parameter you can set to `True`

### Read Capacity Units

- One read capacity unit represents **one strongly consistent read per second**, or **two eventually consistent reads per second, for an item up to 4 KB in size**
- If the items are larger than 4 KB, more RCU are consumed
- `Example` 1: 10 strongly consistent reads per seconds of 4 KB each
  - We need `10 * 4 KB / 4 KB = 10 RCU`
- `Example` 2: 16 eventually consistent reads per seconds of 12 KB each
  - We need `(16 / 2) * ( 12 / 4 ) = 24 RCU`
- `Example` 3: 10 strongly consistent reads per seconds of 6 KB each
  - We need `10 * 8 KB / 4 = 20 RCU` (we have to round up 6 KB to 8 KB)

## Partitions Internal

- Data is divided in partitions
- Partition keys go through a hashing algorithm to know to which partition they go to
- To compute the number of partitions:
  - By capacity: (TOTAL RCU / 3000) + (TOTAL WCU / 1000)
  - By size: Total Size / 10 GB
  - Total partitions = CEILING(MAX(Capacity, Size))
- **WCU and RCU are spread evenly between partitions**

## Throttling

- If we exceed our RCU or WCU, we get `ProvisionedThroughputExceededExceptions`
- Reasons:
  - Hot keys: one partition key is being read too many times (popular item for ex)
  - Hot partitions:
  - Very large items: remember RCU and WCU depends on size of items
- Solutions:
  - Exponential back-off when exception is encountered (already in SDK)
  - Distribute partition keys as much as possible
  - If RCU issue, we can use DynamoDB Accelerator (DAX)

## Writing Data

- **PutItem**: Write data to DynamoDB (create data or full replace)
  - Consumes WCU
- **UpdateItem**: Update data in DynamoDB (partial update of attributes)
  - Possibility to use Atomic Counters and increase them
- **Conditional Writes**:
  - Accept a write / update only if conditions are respected, otherwise reject
  - Helps with concurrent access to items
  - No performance impact

## Deleting Data

- **DeleteItem**:
  - Delete an individual row
  - Ability to perform a conditional delete
- **DeleteTable**:
  - Delete a whole table and all its items
  - Much quicker deletion than calling `DeleteItem` on all items

## Batching Writes

- **BatchWriteItem**:
  - Up to 25 `PutItem` and / or `DeleteItem` in one call
  - Up to 16 MB of data written
  - Up to 400 KB of data per item
- Batching allows you to save in latency by reducing the number of API calls done against DynamoDB
- Operations are done in parallel for better efficiency
- It's possible for part of a batch to fail, in which case we have the try the failed items (using exponential back-off algorithm)

## Reading Data

- `GetItem`:
  - Read based on Primary key
  - Primary Key = HASH or HASH-RANGE
  - Eventually consistent read by default
  - Option to use strongly consistent reads (more RCU - might take longer)
  - `ProjectionExpression` can be specified to include only certain attributes
- `BatchGetItem`:
  - _Up to 100 items_
  - _Up to 16 MB of data_
  - Items are retrieved in parallel to minimize latency

## Query

- Query returns items based on:
  - _PartitionKey_ value (must be = operator)
  - _SortKey_ value (=, <, <=, >, >=, Between, Begin) - optional
  - _FilterExpression_ to further filter (client side filtering)
- Returns:
  - Up to 1 MB of data
  - Or number of items specified in Limit
- Able to do pagination on the results
- Can query table, a local secondary index, or a global secondary index

## Scan

- Scan the entire table and then filter out data (inefficient)
- Returns up to 1 MB of data - use pagination to keep on reading
- Consumes a lot of RCU
- Limit impact using Limit or reduce the size of the result and pause
- For faster performance, use parallel scans:
  - Multiple instances scan multiple partitions at the same time
  - Increases the throughput and RCU consumed
  - Limit the impact of parallel scans just like you would for Scans
- Can use a `ProjectionExpression + FilterExpression` (no change to RCU)

## LSI (Local Secondary Index)

- Alternate range key for your table, **local to the hash key**
- Up to **five local secondary indexes per table.**
- The sort key consists of exactly one scalar attribute.
- The attribute that you choose must be a scalar String, Number, or Binary
- **LSI must be defined at table creation time**
- Any columns other Partition key and Sort key

## GSI (Global Secondary Index)

- To speed up queries on non-key attributes, use a Global Secondary Index
- GSI = partition key + optional sort key
- The index is a new "table" and we can project attributes on it
  - The partition key and sort key of the original table are always projected (KEYS_ONLY)
  - Can specify extra attributes to project (INCLUDE)
  - Can use all attributes from main table (ALL)
- Must define RCU / WCU for the index
- **Possibility to add / modify GSI (not LSI)**

## DynamoDB Indexes and Throttling

- GSI:
  - **If the writes are throttled on the GSI, then the main table will be throttled!**
  - Even if the WCU on the main tables are fine
  - Choose your GSI partition key carefully!
  - Assign your WCU capacity carefully!
- LSI:
  - Uses the WCU and RCU of the main table
  - No special throttling considerations

## DynamoDB Concurrency

- DynamoDB has a feature called **Conditional Update / Delete**
- That means that you can ensure an item hasn't changed before altering it
- That makes DynamoDB an **optimistic locking / concurrency database**
- _Example:_
  - There is an item with an attribute Version = 1
  - Client 1 and Client 2 try to update item Name only if item version = 1
  - Suppose, request of Client 1 is executed first then the Name and Version is updated according to Client 1
  - Now, Client 2 request will try to execute the update but fails because Version of the item is not 1 (as changed by Client 1)

## DAX (DynamoDB Accelerator)

- Seamless **cache for DynamoDB**, no application re-write
- Writes go through DAX to DynamoDB
- Micro second latency for cached reads & queries
- Solves the Hot Key problem (too many reads)
- **5 minutes TTL** for cache by default
- **Up to 10 nodes** in the cluster
- Multi AZ (3 nodes minimum recommended for production)
- Secure (Encryption at rest with KMS, VPC, IAM, CloudTrail...)

### DAX vs ElastiCache

- Store individual objects cache, Query/Scan cache in DAX
- Store aggregation result (store processed data) in ElastiCache

## DynamoDB Streams

- Changes in DynamoDB (Create, Update, Delete) can end up in a DynamoDB Stream
- This stream can be read by AWS Lambda & EC2 instances, and we can then do:
  - React to changes in real time (welcome email to new users)
  - Analytics
  - Create derivative tables / views
  - Insert into ElasticSearch
- Could implement cross region replication using Streams
- Stream has **24 hours of data retention**

- Choose the information that will be written to the stream whenever the data in the table is modified:
  - `KEYS_ONLY`: Only the key attributes of the modified item.
  - `NEW_IMAGE`: The entire item, as it appears after it was modified.
  - `OLD_IMAGE`: The entire item, as it appeared before it was modified.
  - `NEW_AND_OLD_IMAGES`: Both the new and the old images of the item.
- DynamoDB Streams are made of shards, just like Kinesis Data Streams
- You don't provision shards, this is automated by AWS
- **Records are not retroactively populated in a stream after enabling it**

### DynamoDB Streams & Lambda

- You need to **define an Event Source Mapping to read** from a DynamoDB Streams
- You need to ensure the Lambda function has the appropriate permissions
- Your Lambda function is invoked synchronously

## DynamoDB - TTL (Time to Live)

- TTL = automatically delete an item after an expiry date / time
- TTL is provided at no extra cost, deletions do not use WCU / RCU
- TTL is a background task operated by the DynamoDB service itself
- Helps reduce storage and manage the table size over time
- Helps adhere to regulatory norms
- TTL is enabled per row (you define a TTL column, and add a date there)
- DynamoDB typically deletes expired items within 48 hours of expiration
- Deleted items due to TTL are also deleted in GSI / LSI
- DynamoDB Streams can help recover expired items

## DynamoDB CLI - Good to Know

- `--projection-expression`: attributes to retrieve
  - `--filter-expression`: filter results
- General CLI pagination options including DynamoDB / S3:
  - Optimization:
    - `--page-size`: full dataset is still received but each API call will request less data (helps avoid timeouts)
  - Pagination:
    - `--max-items`: max number of results returned by the CLI. Returns NextToken
    - `--starting-token`: specify the last received NextToken to keep on reading

## DynamoDB Transactions

- Transaction = Ability to Create / Update / Delete multiple rows in different tables at the same time
- It's an "all or nothing" type of operation.
- Write Modes: Standard, Transactional
- Read Modes: Eventual Consistency, Strong Consistency, Transactional
- **Consume 2x of WCU / RCU**
- API Name: `TransactWriteItems/TransactGetItems`

- _AccountBalance_ Table:

  | Account_id | balance | Last_transaction_ts |
  | ---------- | ------- | ------------------- |
  | Acct_21    | 230     | 1562503085          |
  | Acct_45    | 120     | 1562503085          |

- _BankTransactions_ Table:

  | Transaction_id | Transaction_time | From_account_id | To_account_id | value |
  | -------------- | ---------------- | --------------- | ------------- | ----- |
  | Tx_12345       | 1561483349       | Acct_45         | Acct_21       | 45    |
  | Tx_23456       | 1562503085       | Acct_21         | Acct_45       | 100   |

- **A transaction is a write to both table, or none!**

### Transactional Capacity Computations

- **5 KB item size**
- _Example:_ Transactional Item Writes per second: 3
  - = `[5 KB / 1 KB per WCU] * 2 (cost of transactional) * 3 (# writes per sec)`
  - = `30 WCU`
- Transactional Item Reads per second: 5
  - = `[5 KB / 4 KB per RCU] * 2 (cost of transactional) * 5 (# per sec)`
  - = `2 (high ceiling) * 2 * 5`
  - = `20 RCU`

## DynamoDB as Session State Cache

- It's common to use DynamoDB to store session state
- **vs ElastiCache**:
  - ElastiCache is in-memory, but DynamoDB is serverless
  - Both are key/value stores
- **vs EFS**:
  - EFS must be attached to EC2 instances as a network drive
- **vs EBS & Instance Store**:
  - EBS & Instance Store can only be used for local caching, not shared caching
- **vs S3**:
  - S3 is higher latency, and not meant for small objects

## DynamoDB Write Sharding

- Imagine we have a voting application with two candidates, **candidate A** and **candidate B**.
- If we use a partition key of `candidate_id`, we will run into partitions issues, as we only have two partitions
- Solution: add a suffix (usually **random suffix**, sometimes calculated suffix)

| Partition Key              | Sort_Key            | Attributes |
| -------------------------- | ------------------- | ---------- |
| CandidateID + RandomSuffix | Vote_date           | Voter_id   |
| **Candidate_A-1**          | 2016-05-17 01.36.45 | 235343     |
| **Candidate_A-1**          | 2016-05-18 01.36.30 | 232312     |
| **Candidate_A-2**          | 2016-06-15 01.36.20 | 098432     |
| **Candidate_B-1**          | 2016-07-1 01.36.15  | 340983     |

## DynamoDB - Write Types

1. **Concurrent Writes**: The second (latest) write overwrites the first (previous) write

2. **Conditional Writes**: The first write is accepted and the second write fails

3. **Atomic Writes**: Both writes succeed and the value is increased by some value in total

4. **Batch Writes**: Write / update many items at a time

## DynamoDB - Large Objects Pattern

- Client --> Small Metadata --> DynamoDB --> Small metadata --> Client
- --> Send large data to S3 --> Amazon S3 bucket --> Retrieve data message from S3

## DynamoDB - Indexing S3 objects metadata

- --Writes--> Amazon S3 --> Lambda Function --> DynamoDB Table
- API for object metadata
  - Search by date
  - Total storage used by a customer
  - List of all objects with certain attributes
  - Find all objects uploaded within a date range

## DynamoDB Operations

- Table Cleanup:
  - Option 1: Scan + Delete => very slow, expensive, consumes RCU & WCU
  - Option 2: Drop Table + Recreate table => fast, cheap, efficient
- Copying a DynamoDB Table:
  - Option 1: Use AWS DataPipeline (uses EMR)
  - Option 2: Create a backup and restore the backup into a new table name (can take some time)
  - Option 3: Scan + Write => write own code

## Security & Other Features

- Security:
  - VPC Endpoints available to access DynamoDB without internet
  - Access fully controlled by IAM
  - Encryption at rest using KMS
  - Encryption in transit using SSL / TLS
- Backup and Restore feature available
  - Point in time restore like RDS
  - No performance impact
- Global Tables
  - Multi region, fully replicated, high performance
- Amazon DMS can be used to migrate to DynamoDB (from Mongo, Oracle, MySQL, S3, etc...)
- You can launch a local DynamoDB on your computer for development purposes

### Users directly interact with DynamoDB

- Web & Mobile Applications --> Login and Get Token & Get Temporary AWS Credentials (Social Identity Provider: Google, Facebook, SAML, OpenID, AWS Cognito User Pools)
- Then use the token for Direct access to AWS --> DynamoDB Table

### DynamoDB - Fine-Grained Access Control

- Using **Web Identity Federation** or **Cognito Identity Pools**, each user gets AWS credentials
- You can assign an IAM role to these users with a **Condition** to limit their API access to DynamoDB
- **LeadingKeys**: limit row-level access for users on the primary key
- **Attributes**: limit specific attributes the user can see

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:BatchGetItem",
        "dynamodb:Query",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:BatchWriteItem"
      ]
    }
  ],
  "Resource": ["arn:aws:dynamodb:us-west-2:123456789012:table/MyTable"],
  "Condition": {
    "ForAllValues:StringEquals": {
      "dynamodb:LeadingKeys": ["${cognito-identity.amazonaws.com:sub}"]
    }
  }
}
```

- See more at: [AWS DynamoDB Conditionals](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
