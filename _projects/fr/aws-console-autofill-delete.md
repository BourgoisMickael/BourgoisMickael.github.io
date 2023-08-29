---
lang: fr
ref: aws-console-autofill-delete
date: 2022-07-19
permalink: /fr/projects/aws-console-autofill-delete
title: "AWS Console autofill delete"
excerpt: "Extension pour navigateur qui remplit automatiquement l'input de confirmation de suppression"
header:
  teaser: assets/images/projects/aws-console-autofill-delete/promo-1400.png
  caption: "[https://github.com/BourgoisMickael/aws-console-autofill-delete](https://github.com/BourgoisMickael/aws-console-autofill-delete){:target='_blank'}"
  overlay_image: assets/images/projects/aws-console-autofill-delete/promo-medium.png
  overlay_filter: 0.25
---
<p align="center">
  <img src="/assets/images/projects/aws-console-autofill-delete/logo.png" alt="logo" />
  <br/>
  <a href="https://chrome.google.com/webstore/detail/aws-console-autofill-dele/hmndplgjjgpdbcofbmbiejojppbgdbbg"><img alt="Chrome Extension" src="https://img.shields.io/chrome-web-store/v/hmndplgjjgpdbcofbmbiejojppbgdbbg"/></a>
  <a href="https://addons.mozilla.org/en-US/firefox/addon/aws-console-autofill-delete/"><img alt="Mozilla Add-on" src="https://img.shields.io/amo/v/aws-console-autofill-delete"/></a>
</p>

Vous en avez marre de remplir la modal de confirmation de suppression pour supprimer une ressource sur la console AWS ? Cette extension **remplit automatiquement l'input pour vous**.
Et cela fonctionne dans n'importe quelle langue.

- [Installer l'extension Chrome ](https://chrome.google.com/webstore/detail/aws-console-autofill-dele/hmndplgjjgpdbcofbmbiejojppbgdbbg)
- [Installer l'add-on Firefox](https://addons.mozilla.org/en-US/firefox/addon/aws-console-autofill-delete/)


![Demo](/assets/images/projects/aws-console-autofill-delete/demo.gif)

Le remplissage automatique fonctionne sur plus de **25** services.

De nouveaux services vont être ajouter. Vous pouvez ouvrir une issue ou contribuer si vous voulez qu'un service soit implémenté.

Parfois, AWS met à jour ses interfaces et l'extension peut cesser de fonctionner pour certains services. Si tel est le cas, faites-le-moi savoir afin que je puisse mettre à jour l'extension.

# Description

L'extension utilise [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) pour écouter les mutation sur la page. Quand le DOM change, [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) essaie de trouver l'input dans une modal et le texte pour remplir l'input.

