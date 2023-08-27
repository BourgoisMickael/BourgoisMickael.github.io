---
lang: fr
ref: raven-os
permalink: /fr/projects/raven-os
title: "Raven-OS"
excerpt: "Raven-OS est le projet EIP (**E**pitech **I**nnovative **P**roject) auquel j'ai participé lors de mes dernières années d'études à Epitech"
header:
  teaser: /assets/images/projects/raven-os/logo_raven_title.png
  #image: /assets/images/projects/raven-os/raven_background.jpg
  #image_description: "Raven-OS background image"
  caption: "[https://raven-os.org](https://raven-os.org){:target='_blank'}"
  overlay_image: /assets/images/projects/raven-os/raven_background.jpg
  overlay_filter: 0.25

gallery:
  - url: /assets/images/projects/raven-os/manifest_create.png
    image_path: /assets/images/projects/raven-os/manifest_create.png
    alt: Vue de création de manifest
    title: Crée un manifest
  - url: /assets/images/projects/raven-os/manifest_get.png
    image_path: /assets/images/projects/raven-os/manifest_get.png
    alt: Vue de détails d'un manifest
    title: Détails d'un manifest
  - url: /assets/images/projects/raven-os/manifest_list.png
    image_path: /assets/images/projects/raven-os/manifest_list.png
    alt: Vue de liste des manifests
    title: Liste des manifests
  - url: /assets/images/projects/raven-os/build_get.png
    image_path: /assets/images/projects/raven-os/build_get.png
    alt: Vue de détails d'une compilation
    title: Détails d'une compilation
  - url: /assets/images/projects/raven-os/build_list.png
    image_path: /assets/images/projects/raven-os/build_list.png
    alt: Vue de liste des compilations
    title: Liste des compilations
  - url: /assets/images/projects/raven-os/admin_panel.png
    image_path: /assets/images/projects/raven-os/admin_panel.png
    alt: Vue du panel d'administration
    title: Panel d'administration
---
# Introduction

Raven est un système d’exploitation innovant et configurable qui cherche à s’adapter aux
besoins de tous ses utilisateurs.

Pour mener ce projet sur deux ans, nous étions une équipe de 16 membres. Au sein d'une plus petite équipe de 3 membres en charge de la partie web, j'ai notamment développé le sous projet [**build-raven-os-org**](https://github.com/raven-os/build-raven-os-org){:target="_blank"}.

Mon rôle était de développer le back end et faire l'intégration avec le front end, un autre membre du groupe s'occupait de faire le design et la mise en page du site.

# Contexte

Raven-OS est composé de plusieurs sous projets, (voir [github](https://github.com/raven-os){:target="_blank"}). Les sous projets en relation avec le service **build-raven-os-org** sont:

- un gestionnaire de packet: [**nest**](https://github.com/raven-os/nest){:target="_blank"}
- un serveur de packet: [**nest-server**](https://github.com/raven-os/nest-server){:target="_blank"}
- un outil pour compiler des packets: [**nbuild**](https://github.com/raven-os/nbuild){:target="_blank"}

Pour contributer au système et créer des nouveaux packets disponible pour tout les utilisateurs il faut:

- écrire un **manifest de compilation**
- passer le manifest à **nbuild** pour compiler les packets
- envoyer les packets compilés sur **nest-server**

# Description

[**build-raven-os-org**](https://github.com/raven-os/build-raven-os-org){:target="_blank"} est une interface web qui permet aux collaborateurs de:
  - Upload ou écrire des manifests de compilation
  - Mettre un jour un manifest de compilation
  - Lister l'historique de modification d'un manifest
  - Programmer une compilation avec un ou plusieurs manifests
  - Suivre la compilation en temps réel
  - Automatiser l'envoi des packets compilés vers **nest-server**


Pour cela le site dispose :
  - d'un systeme de compte utilisateur
  - un panel d'administration avec envoi d'email d'invitation
  - une gestion des droits d'accès

### Démonstration

{% include gallery caption="Capture d'écran des différentes pages" class="project_raven-os_gallery" %}

# Détails techniques

### Les technologies utilisés

Les outils utilisés sont `Node.js`, `Vue.js`, `PostgreSQL`, `RabbitMQ`, `Docker`, `Mocha`.
Le language `Rust` été utilisé au début pour l'api mais étant trop récent, nous avons migré sur `Node.js`.
L'API utilise `Express.js` ainsi que l'ORM `Bookshelf` et pour gérer les configuration la librairie `convict`.

### Diagramme d'interactions entre les services

[![Diagramme d'interactions entre les services](/assets/images/projects/raven-os/diagram_interactions.png "Diagramme d'interactions entre les services")](/assets/images/projects/raven-os/diagram_interactions.png "Diagramme d'interactions entre les services")

### Les ressources

Les données sont limitées à quatre type de ressources:

  - **manifest** utilisés pour décrire un packet et comment le compiler
  - **build** pour décrire une compilation
  - **user** qui crée et maintient des **manifests** et programme des compilations
  - **invitation** pour inscrire des nouveaux **users**, seul un administrateur peut en créer

### Architecture de l'API

[![Diagramme de l'architecture de l'API](/assets/images/projects/raven-os/diagram_api_architecture.png "Diagramme de l'architecture de l'API"){: .img65 .align-center }](/assets/images/projects/raven-os/diagram_api_architecture.png "Diagramme de l'architecture de l'API")

- **Application**: Contient tout les objets du serveur. Instancie tout les modules en s'envoyant comme contexte pour simplifié l'injection de dépendances. Initialise le **mailer**, la **database**, la **queue**, lance les **migrations** et démarre le serveur web.
- **Session**: Middleware qui authentifie les requêtes entrantes via un cookie. Contient la définition d'autre middlewares qui vérifient que l'utilisateur est connecté ou non, si la requête vient du *builder* ou si l'utilisateur est un administrateur.
- **Routing**: Map chaque endpoint à une **action** et ajoute des middlewares de **session** sur chaque routes pour vérifier les permissions.
- **Action**: Point d'entrée logique de la requête dans l'API. Découpée en deux sous entitée:
  - **sanitization / validation**: assure le bon format des données d'entrée.
  - **handler**: gére la requête en appelant le **controller**.
- **Controller**: Contrôle l'intégrité de l'action (par example, pour effectuer une action sur un manifest il faut être admin ou en être le mainteneur) puis envoie des requêtes à la **database** la plupart du temps ou à d'autres services en fonction de l'action.
- **Database**: Implémentation de l'ORM Bookshelf. Pour améliorer la robusté de l'application, lors de la connection à postgres le nombre de tentatives de connection ainsi que l'interval entre les tentatives est configurable.
- **Queue**: Wrapper de `amqplib` utilisé pour communiquer avec `RabbitMQ` pour envoyer des messages au builder lors de la création d'une compilation.
- **WebSocket**: Server qui liste tout les clients qui se connectent et broadcast des messages lors d'une compilation pour fournir des logs en temps réel.
- **Mailer**: Utilise la librairie `nodemailer` pour envoyer des emails d'invitation ou reset un mot de passe.

# Conclusion

Ce projet fût un challenge technique, organisationnel et un source d'apprentisage.

Voir le projet sur github: [https://github.com/raven-os/build-raven-os-org](https://github.com/raven-os/build-raven-os-org){:target="_blank"}
