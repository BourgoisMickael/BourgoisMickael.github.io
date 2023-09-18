---
lang: fr
ref: cfn-drift-detector
date: 2022-11-20
permalink: /fr/projects/cfn-drift-detector
title: "cfn-drift-detector"
excerpt: "Execute une détection de drift régulièrement sur toutes les stacks CloudFormation et reporte les drifts par email"
header:
  teaser: assets/images/projects/cfn-drift-detector/email-screenshot.png
  caption: "[https://github.com/BourgoisMickael/cfn-drift-detector](https://github.com/BourgoisMickael/cfn-drift-detector){:target='_blank'}"
  overlay_image: assets/images/unsplash-image-1.jpg
  overlay_filter: 0.25
  actions:
    - label: Voir sur AWS Serverless Application Repository
      url: https://serverlessrepo.aws.amazon.com/applications/eu-west-3/809187537847/cfn-drift-detector
---

Execute une détection de drift régulièrement sur toutes les stacks CloudFormation et reporte les drifts par email automatiquement.

## Exemple de retour en utilisant SES

![Retour Email](/assets/images/projects/cfn-drift-detector/email-screenshot.png)

# Comment ça marche ?

- Détection
    1. Le scheduler `DetectionSchedule` déclanche la lambda `DetectStackDrifts`. Par défaut, le scheduler tourne toute les 15 minutes entre 6:00 et 7:00 tout les jours. (Cela permet de faire plusieurs tentatives s'il y a du Throttling par CloudFormation).
    2. Pour chaque `Regions` selectionnées, la lambda liste toutes les stacks et filtre celles qui matchent la regex `IgnoreStackIdRegex` et celles sur lesquelles une détection de drift a déjà été effectué avec un age plus petit que `DriftAgeCheckHours` (23 heures par défaut).
    3. Boucle sur toutes les stacks et appel l'API `DetectStackDrift`.

- Notification
    1. Le scheduler `NotificationSchedule` déclanche la lambda `NotifyStackDrifts`. Par défault, le scheduler tourne à 7:45 tout les jours, cela devrait laisser assez de temps à la détection de drift et aux potentiels autres tentatives de finir.
    2. Pour chaque `Regions` selectionnées, la lambda liste toutes les stacks et filtre celles qui matchent la regex `IgnoreStackIdRegex` ou celles qui n'ont pas de drift.
    3. En fonction du `NotifierService`, la lambda envoi un rapport HTML ou texte à l'email de `Destination`

![Architecture](/assets/images/projects/cfn-drift-detector/architecture.png)
