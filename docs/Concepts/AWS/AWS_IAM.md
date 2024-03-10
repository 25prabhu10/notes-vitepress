---
title: IAM
description: IAM
prev: ./AWS
---

# IAM

- IAM: **Identity and Access Management** (_Global Service_)
- **Root account** created by default, **shouldn't be used or shared**
- **User represents the person or service**, they have the ability to sign in to the AWS Management Console for interactive tasks and to make programmatic requests to AWS.
- **Group is a collection of IAM users**. Can **only contain users**, and not other groups
- **Role is very similar to a user**. However, a role **dose not have any credentials** associated with it
- Users don't have to belong to a group, and user can belong to multiple groups

- Some AWS service will need to perform actions on behalf of the user.
- To do so, they are **assigned permissions** to AWS services **with IAM Roles**
- Common roles:
  - EC2 Instance Roles
  - Lambda Function Roles
  - Roles for CloudFormation

Permissions:

- **User or Groups can be assigned** JSON documents called **policies**
- These **policies define the permissions** of the users
- In AWS you apply the **least privilege principle**: don't give more permissions than a user needs

Dashboard:

- Create a new user (using root user for most of the task is not advisable)
- Provide `User Name`, `Access type: AWS Management Console access`
- Create a new user group, in this case called `admin` with `AdministratorAccess` policy
- Add tags (optional), these are meta-data attached to the user.

## Policies

A **policy is an object in AWS** that, when associated with an identity or resource, **defines their permissions**.

When you create a permissions policy to restrict access to a resource, you can choose an _identity-based policy_ or a _resource-based policy_:

1. **Identity-based policies are attached to an IAM user, group, or role**.

   - These policies let you specify what that identity can do (its permissions).
   - It is _resource-level permission_ in an identity-based policy.
   - Identity-based policies can be **managed or inline**.
   - User can have **standalone policies** called **inline policies**
   - User can define their own polices

2. **Resource-based policies are attached to a resource**.

   - With resource-based policies, you can specify who has access to the resource and what actions they can perform on it.
   - Resource-based policies are **inline only**, not managed.

::: tip NOTE
_Resource-based policies_ differ from _resource-level permissions_. You can attach resource-based policies directly to a resource. Resource-level permissions refer to the ability to use ARNs to specify individual resources in a policy. Resource-based policies are supported only by some AWS services.
:::

### Policy evaluation logic

- Check [Policy evaluation logic](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
- Explicit **`Deny` overrides all `Allow`**
- AWS checks first for all polices for a `Deny`. If exists, then request is denied.
- AWS then checks for each `Allow`. If **at least one policy statement allows the action, request is allowed**. No matter whether the `Allow` is in the **identity-based or resource-based policy**.

::: danger NOTE
**The above logic dose not apply for requests made from one account to another**. There must be polices on both accounts that allow the operation. The requester in Account A must have an identity-based policy that allows them to make a request to the resource in Account B. Also, the resource-based policy in Account B must allow the requester in Account A to access the resource.
:::

_Steps_:

1. **Authentication**: AWS **first authenticates the _principle_** that makes the request, if necessary. This step is **not necessary for a few services**, such as **Amazon S3**, that allow some requests from anonymous users.

2. **Processing the request context**: Gather following info into a _request context_:

   - **Actions (or operations)**: The actions or operations that the principal wants to perform.
   - **Resources**: The AWS resource object upon which the actions or operations are performed.
   - **Principal**: **The user, role, federated user, or application that sent the request**. Information about the principal includes the policies that are associated with that principal.
   - **Environment data**: Information about the _IP address, user agent, SSL enabled status, or the time of day_.
   - **Resource data**: Data related to the resource that is being requested. This can include information such as a DynamoDB table name or a tag on an Amazon EC2 instance.
   - _AWS uses the above info to find policies that apply to the request context_.

::: warning IMPLICIT DENY
By default, all requests are implicitly denied with the **exception of the AWS account root user**, which has full access.
:::

### Policies Structure

- Consists of

  - `Version`: policy language version, always include "2012-10-17" (**required**)
  - `Id`: an identifier for the policy (optional)
  - `Statement`: one or more individual statements (**required**)

- Statement consists of

  - `Sid`: an identifier for the statement (optional)
  - `Effect`: whether the statement allows or denies access (`Allow`, `Deny`)
  - `Principal`: account/user/role to which this policy applied to
  - `Action`: action that is being controlled for a given service
  - `Resource`: list of resources to which the actions applied to
  - `Condition`: conditions for when this policy is in effect (optional)

_Example:_

```json
{
  "Version": "2012-10-17",
  "Id": "S3-Account-Permisions",
  "Statement": [
    {
      "Sid": "1",
      "Effect": "Allow",
      "Principal": {
        "AWS": ["arn:aws:iam::123456789012:root"]
      },
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": ["arn:aws:s3:::mybucket/*"]
    }
  ]
}
```

### Testing IAM Policy

- Using this link [IAM Policy Simulator](https://policysim.aws.amazon.com/home/index.jsp)
- Using CLI, add `--dry-run` to simulate the command

  ```bash
  aws run-instances --dry-run --image-id ami-06340c812baa7 --instance-type t2.micro
  ```

### Password Policy

- Strong passwords = higher security
- In AWS, you can setup a password policy:
  - Set a minimum password length
  - Require specific character types:
    - _Including uppercase letters_
    - _Lowercase letters_
    - _Numbers_
    - _Non-alphanumeric characters_
  - Allow all IAM users to change their own passwords
  - Require users to change their password after some time (password expiration)
  - Prevent password re-use

## Multi Factor Authentication - MFA

- Users have access to your account and can possibly change configurations or delete resources in your AWS account
- **Root account and IAM users must have MFA**
- **MFA = password + security device**

### MFA devices

- Virtual MFA device

  - Google Authenticator (phone only)
  - Authy (multi-device)

- Universal 2nd Factor (U2F) Security Key

  - YubiKey by Yubico (3rd party) (Hardware)

- Hardware Key Fob MFA Device

  - Provided by Gemalto (3rd party)
  - For AWS GovCloud (US) - Provided by SurePassID (3rd party)

## How can users access AWS?

- There are 3 options:

  - _AWS Management Console (protected by password + MFA)_
  - _AWS Command Line Interface (CLI)_: protected by access keys
  - _AWS Software Developer Kit (SDK)_ - for code: protected by access keys

- Access Keys are generated through the AWS Console
- Users manage their own access keys

- AWS CLI can be used to interact with AWS
- New AWS CloudShell can also be used

## IAM Security Tools

- **IAM Credentials Report (account-level)**

  - A report that lists all your account's users and the status of their various credentials

- **IAM Access Advisor (user-level)**

  - Access advisor shows the service permissions granted to a user and when those services were last accessed
  - You can use this information to revise your polices

## IAM Guidelines & Best Practices

- Don't use the root account except for AWS account setup
- One physical user = One AWS user
- **Assign users to groups** and assign permissions to groups
- Create a **strong password policy**
- Use and enforce the use of **Multi Factor Authentication (MFA)**
- Create and use **Roles** for giving permissions to AWS services
- Use Access Keys for Programmatic Access (CLI/SDK)
- Audit permissions of your account with the IAM Credentials Report
