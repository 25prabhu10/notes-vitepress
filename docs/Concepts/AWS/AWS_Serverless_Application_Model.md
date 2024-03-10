---
title: AWS Serverless Application Model
description: AWS Serverless Application Model
prev: ./AWS
---

# AWS Serverless Application Model

- SAM: Serverless Application Model
- Framework for developing and deploying serverless applications
- All the configuration is YAML code
- Generate complex CloudFormation from simple SAM YAML file
- Supports anything from CloudFormation: Outputs, Mappings, Parameters, Resources...
- Only two commands to deploy to AWS
- SAM can use CodeDeploy to deploy Lambda functions
- SAM can help you to run Lambda, API Gateway, DynamoDB locally

## AWS SAM - Recipe

- Transform Header indicates it's SAM template:
  - _Transform: 'AWS::Serverless-2016-10-31'_
- Write Code:
  - _AWS::Serverless::Function_
  - _AWS::Serverless::Api_
  - _AWS::Serverless::SimpleTable_
- Package & Deploy:
  - _aws cloudformation package / sam package_
  - _aws cloudformation deploy / sam deploy_

## Deep dive into SAM deployment

1. aws cloudformation package:

   - SAM Template YAML file --Transform--> Generated Template CloudFormation YAML
   - Application Code + Swagger File (optional) --Zip and upload--> Code S3 bucket --reference--> Generated Template CloudFormation YAML

2. aws cloudformation deploy:

   - Generated Template CloudFormation YAML --Create and execute change set--> AWS CloudFormation --> Stack

- To installing the SAM CLI follow the steps provided in [AWS SAM CLI - Installation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

- See example application on how to use SAM by visiting [AWS SAM Examples](https://github.com/amazon-archives/serverless-app-examples/tree/master/javascript)

## SAM and CodeDeploy

- SAM framework natively uses CodeDeploy to update Lambda functions
- Traffic Shifting feature
- Pre and Post traffic hooks features to validate deployment (before the traffic shift starts and after it ends)
- Easy & automated rollback using CloudWatch Alarms

## SAM - Exam Summary

- SAM is built on CloudFormation
- SAM requires the **Transform** and **Resources** sections
- Commands to know:
  - sam build: fetch dependencies and create local deployment artifacts
  - sam package: package and upload to Amazon S3, generate CF template
  - sam deploy: deploy to CloudFormation
- SAM Policy templates for easy IAM policy definition
- SAM is integrated with CodeDeploy to do deploy to Lambda aliases

## Serverless Application Repository (SAR)

- Managed repository for serverless applications
- The applications are packaged using SAM
- Build and publish applications that can be re-used by organizations
- Can share publicly
- Can share with specific AWS accounts
- This prevents duplicate work, and just go straight to publishing
- Application settings and behaviour can be customized using Environment variables
