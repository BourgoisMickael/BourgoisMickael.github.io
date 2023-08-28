---
lang: en
ref: aws-console-autofill-delete
permalink: /en/projects/aws-console-autofill-delete
title: "AWS Console autofill delete"
excerpt: "Browser extension to automatically fills the deletion confirmation input"
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


Tired of filling the deletion confirmation modal to delete a resource on AWS console ? This extension **automatically fills the input for you**. And it works in any language.

- [Install Chrome Extension](https://chrome.google.com/webstore/detail/aws-console-autofill-dele/hmndplgjjgpdbcofbmbiejojppbgdbbg)
- [Install Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/aws-console-autofill-delete/)


![Demo](/assets/images/projects/aws-console-autofill-delete/demo.gif)

The automatic filling is implemented for more than **25** services.

More services are to come. You can open an issue or contribute if you'd like a service to be implemented.

Sometimes AWS updates their interfaces and the extension might stop working for some services. If this is the case, let me know so I can update the extension.

# Description

The extension use [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to listen for mutation in the page. Whenever the DOM changes, [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) tries to find the input in a modal and the text to fill in that input.

