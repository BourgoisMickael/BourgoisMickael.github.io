---
lang: en
ref: cfn-drift-detector
date: 2022-11-20
permalink: /en/projects/cfn-drift-detector
title: "cfn-drift-detector"
excerpt: "Perform regular drift detection on every CloudFormation stacks and report drifts by email"
header:
  teaser: assets/images/projects/cfn-drift-detector/email-screenshot.png
  caption: "[https://github.com/BourgoisMickael/cfn-drift-detector](https://github.com/BourgoisMickael/cfn-drift-detector){:target='_blank'}"
  overlay_image: assets/images/unsplash-image-1.jpg
  overlay_filter: 0.25
  actions:
    - label: See on AWS Serverless Application Repository
      url: https://serverlessrepo.aws.amazon.com/applications/eu-west-3/809187537847/cfn-drift-detector
---

Perform regular drift detection on every CloudFormation stacks and report drifts by email automatically.

## Example of output using SES

![Email Output](/assets/images/projects/cfn-drift-detector/email-screenshot.png)

# How does it work ?

- Detection
    1. The `DetectionSchedule` scheduler triggers the `DetectStackDrifts` lambda. By default, it runs every 15 minutes between 6 AM and 7 AM everyday. (It allows retries in case of Throttling by CloudFormation).
    2. For each selected `Regions` the lambda lists all the stacks and filters the ones matching `IgnoreStackIdRegex` and the ones that have already have a drift detection with a age smaller than `DriftAgeCheckHours` (23 hours by default).
    3. Loop over all the stacks and call the `DetectStackDrift` API.

- Notification
    1. The `NotificationSchedule` scheduler triggers the `NotifyStackDrifts` lambda. By default, it runs at 7:45 AM everyday, this should leave enough time for the drift detection and potential retries to finish.
    2. For each selected `Regions` the lambda lists all the stacks and filters the ones matching `IgnoreStackIdRegex` or the ones that are not drifted.
    3. Depending on `NotifierService`, the lambda will send an HTML or text report to the `Destination` email.

![Architecture](/assets/images/projects/cfn-drift-detector/architecture.png)
