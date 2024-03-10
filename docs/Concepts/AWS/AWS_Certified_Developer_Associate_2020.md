---
title: AWS Certified Developer - Associate
description: AWS Certified Developer - Associate
prev: ./AWS
---

# AWS Certified Developer - Associate

- It costs **$150**
- **130 minutes**
- **65 questions**
- **~72%** passing score
- Valid for **3 years**

## AWS

- AWS (**Amazon Web Services**) is a _Cloud Provider_
- They provide many servers and services that can be used **on demand** and **scaled easily**
- For more details checkout [AWS](./AWS.md)

## Who is the Developer Associate for

- Web developers
- Building **Cloud-First web-applications**
- Deploying web-applications
- Transitioning from web-developer to **Cloud Engineer** role.

## Exam Guide Breakdown

- Course Code: **DVA-C01**
- Passing Grade: **720/1000** (~72%)
- 65 questions (**18 questions** can go **wrong**)
- 130mins (**2mins per question**)
- Multiple-choice (**1 out of 4**)
- Multiple-responses (**2 or more out of 5**)
- Portions:
  - 22% Development (14.3 questions)
  - 26% Security (16.9 questions)
  - 30% Development with AWS Services (19.5 questions)
  - 10% Refactoring (6.5 questions)
  - 12% Monitoring and Troubleshooting (7.8 questions)

### Recommended White-papers

- Oct 2018 - **Architecting for the Cloud: AWS Best Practices**
- Jun 2017 - **Practicing Continuous Integration and Continuous Delivery on AWS Accelerating Software Delivery with DevOps**
- Sept 2017 - _Microservices on AWS_
- Nov 2017 - Serverless Architectures with AWS Lambda
- Apr 2019 - Optimizing Enterprise Economics with Serverless Architectures
- Nov 2017 - _Running Containerized Microservices on AWS_
- Aug 2016 - _Blue/Green Deployments on AWS_
- [AWS White-papers link](https://aws.amazon.com/whitepapers)

## Training

- Instructor: Jatin Goel
- [Classroom](https://www.cloudwizardconsulting.com/)
- [Meeting link](https://app.gotomeeting.com/?meetingId=590486733)
- [Meeting 2](https://global.gotomeeting.com/join/590486733)
- [Notes](https://evantage.gilmoreglobal.com/#)
- [Company](https://www.cloudwizardconsulting.com/)
- [Lab](https://cloudwizard.qwiklabs.com/)

AWS Account:

- Username: `awsstudent`
- Password: `&7XYBKcRxky`
- AWS Account: `932904713611`

## Extras

- [Instance purchasing options](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html)

- If not sure, leverage the [AWS Compute Optimizer](https://aws.amazon.com/compute-optimizer/)

- ALB Vs NLB - [ELB Features](https://aws.amazon.com/elasticloadbalancing/features/)

- Please share one example for SNS
- A: [SNS Examples](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples.html)

- Link for outpost please?
- [Outposts](https://aws.amazon.com/outposts/)

- Please provide any link to Aws hardware devices ?
- A: [Snowball](https://aws.amazon.com/snowball/)
- [Outposts](https://aws.amazon.com/outposts/)

- Is there issue of exposing my IP? (with Route 53)
- A: Amazon Route 53 automatically creates a name server (NS) record that has the same name as your hosted zone. It lists the four name servers that are the authoritative name servers for your hosted zone e.g. [AWS Route 53 - FAQs](https://aws.amazon.com/route53/faqs/)

- Can you provide a real life example of Route53?
- A: Sure, like for disaster recovery, if one region goes down, route 53 will do the failover to another region automatically. There are diff options you get : have a look in here :[AWS Route 53](https://aws.amazon.com/route53/features/)

- What is block here?
- A: Block is defined as we save data on hard disks, it is into blocks hence faster to find it. EBS is like hard disks

- Can we create RAID structures with EBS manually or its taken care by the system itself?
- A: Yes. You can stripe multiple volumes together to achieve up to 260,000 IOPS or 60,000 Mbps (or 7500 MB/s) when attached to larger EC2 instances. However, performance for st1 and sc1 scales linearly with volume size so there may not be as much of a benefit to stripe these volumes together.

- Webinar staffto everyone

- Q: how does S3 bucket charges
- A: [S3 - Pricing](https://aws.amazon.com/s3/pricing/)

- Q: Can an EBS connect to multiple EC2 instances (12:19 PM)
- A: one EBS to one EC2 however we launched newer types of multiattach EBS [EBS Volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volumes-multi.html)

- Q: different b/w efs and ebs (12:27 PM)
- A: [EFS](https://aws.amazon.com/efs/when-to-choose-efs/)

- Q: diff between EFS and S3? ( 12:27 PM)
- A: [EFS](https://aws.amazon.com/efs/when-to-choose-efs/)

- Q: DynamoDB is a Non rdbs db? ( 12:27 PM)
- A: yes !

- Q: How many questions , duration, (12:41 PM)
- A: We will cover these Q at the end. 65 Q in 90 mins.

- Some of Lambda examples here: [Lambda - Samples](https://docs.aws.amazon.com/lambda/latest/dg/lambda-samples.html)

- [Cloudping](https://www.cloudping.info/)

- The role of AWS Fargate in the container world: [Fargate](https://aws.amazon.com/blogs/containers/the-role-of-aws-fargate-in-the-container-world/)

- [ECS](https://aws.amazon.com/ecs/)

- ECS vs. EKS: [ECS vs EKS](https://aws.amazon.com/blogs/containers/amazon-ecs-vs-amazon-eks-making-sense-of-aws-container-services/)

- [AWS Free Tier](https://aws.amazon.com/free)
- Is it just me who can hear Shwetabh with lag ?

- [AWS Calculator](https://calculator.aws/#/)
- [AWS Plans](https://aws.amazon.com/premiumsupport/plans/)
- [Cloudskills Review](https://pages.awscloud.com/traincert-learn-aws-cloudskills.html) ; Pls review this link and save it.)
- [AWS Certified Cloud Practitioner - Exam Guide](https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide.pdf)
- [AWS Certified Cloud Practitioner - Sample Questions](https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Sample-Questions.pdf)
- AWS Partners: [AWS Partners Portal](https://www.aws.training/Details/eLearning?id=60697)
- [AWS Certified Cloud Practitioner](https://aws.amazon.com/certification/certified-cloud-practitioner/)

> Shwetabh Varma (Organizer, Presenter)to Everyone (public 2:21 PM)
> Shwetabh Varma - Linkedin, linkedin.com/in/shwetabh-varma-482b0a13/
> Parvesh Chopra (Organizer)to Everyone (public 1:58 PM)
