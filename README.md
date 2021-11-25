[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/wc-info)

<a href="https://nodei.co/npm/wc-info/"><img src="https://nodei.co/npm/wc-info.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/wc-info">

# wc-info

**NB**  A great, more fully featured alternative to wc-info is the [api-viewer element](https://api-viewer-element.netlify.com/#api-viewer).

wc-info provides a UI friendly view of the [custom elements manifest file](https://github.com/open-wc/custom-elements-manifest).

First, a reusable, high performing url can take as a query string parameter a link to a custom elements manifest file, and display it in HTML format:

For example:  https://cf-sw.bahrus.workers.dev/?href=https://cdn.skypack.dev/xtal-editor/custom-elements.json

Such links are iframeable.

To see the usage:   https://cf-sw.bahrus.workers.dev

To embed just the bare minimum html, allowing the consumer to style and/or adjust the output as needed:

https://cf-sw.bahrus.workers.dev/?href=https://cdn.skypack.dev/xtal-editor/custom-elements.json&embedded=true

Source code for worker:  https://github.com/bahrus/cf-sw


<!--[Demo](https://codepen.io/bahrus/pen/LYjxKGo)-->


## Viewing Your Element (locally)

```
$ npm install
$ npm run serve
```


