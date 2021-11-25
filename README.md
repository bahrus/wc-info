[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/wc-info)

<a href="https://nodei.co/npm/wc-info/"><img src="https://nodei.co/npm/wc-info.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/wc-info">

# wc-info

**NB**  A great, more fully featured alternative to wc-info is the [api-viewer element](https://api-viewer-element.netlify.com/#api-viewer).

wc-info provides a UI friendly view of the a [custom elements manifest file](https://github.com/open-wc/custom-elements-manifest).

First, a reusable, high performing url can take as a query string parameter a link to a custom elements manifest file, and display it in HTML format:

For example:  https://cf-sw.bahrus.workers.dev/?href=https://cdn.skypack.dev/xtal-editor/custom-elements.json


## Basic in-built styling

[Demo](https://codepen.io/bahrus/pen/LYjxKGo)



A website  is available that allows you to pass in the package name via the query string, and it generates the syntax document:

https://bahrus.github.io/wc-info/syntax.html?npmPackage=[npm package name]

This assumes the package contains a "custom-elements.json" file in the root folder.

For example:

<a href="https://bahrus.github.io/wc-info/syntax.html?npmPackage=xtal-text-input-md">Syntax for xtal-text-input-md</a>



## Viewing Your Element (locally)

```
$ npm install
$ npm run serve
```


