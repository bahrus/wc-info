[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/wc-info)

<a href="https://nodei.co/npm/wc-info/"><img src="https://nodei.co/npm/wc-info.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/wc-info">

# wc-info

wc-info provides some helper resources for a server-side html api that provides UI-friendly views of the [custom elements manifest file](https://github.com/open-wc/custom-elements-manifest). The web components it provides are currently deprecated.

**NB**  A great, more fully featured alternative to wc-info is the [api-viewer element](https://api-viewer-element.netlify.com/#api-viewer).

First, a reusable, high performing url can take as a query string parameter a link to any custom elements manifest file, and display it in HTML format:

For example:  https://cf-sw.bahrus.workers.dev/?href=https://cdn.skypack.dev/@shoelace-style/shoelace/dist/custom-elements.json&ts=1

Such links are iframeable.

To see the usage:   https://cf-sw.bahrus.workers.dev

Many aspects of the api are customizable, as the usage form indicates.

OpenAPI spec:  https://unpkg.com/wc-info/openAPI.json


To embed just the bare minimum html and apply customizations as needed:

https://cf-sw.bahrus.workers.dev/?href=https://cdn.skypack.dev/@shoelace-style/shoelace/dist/custom-elements.json&embedded=true

Another parameter, "tags" can be used to filter the output, based on a comma delimited list of tags.

Source code for worker:  https://github.com/bahrus/cf-sw

To embed this bare minimum html in an existing parent html stream, one of the fastest ways to do this is with the k-fetch web component:

```html
<k-fetch href="https://cf-sw.bahrus.workers.dev/?href=https://cdn.skypack.dev/@shoelace-style/shoelace/dist/custom-elements.json&embedded=true" as=html target=bra-ket-ui5><k-fetch>
```

Some web component libraries like ui-5, carbon design (and hopefully mwc (status is tbd)) provide support for providing more functionality over the bare-bones html elements this service provides.

The bra-ket web component provides support for this scenario.  Display the initial output of the service based on out-of-the-box formatting browsers provide for table elements.  Then, once the dependencies of ui-5 are fully downloaded, only then does the initial output get transformed (via xslt) into the equivalent markup using ui-5 components.  The transition is almost unnoticeable in high performance scenarios, but makes the loading experience much better on slower devices / networks.

So now the markup looks as follows:

```html
    <k-fetch href="https://cf-sw.bahrus.workers.dev/?href=https://cdn.skypack.dev/@shoelace-style/shoelace/dist/custom-elements.json&embedded=true" as=html target=bra-ket-ui5></k-fetch>
    <bra-ket-ui5 ></bra-ket-ui5>
```


<!--[Demo](https://codepen.io/bahrus/pen/LYjxKGo)-->


## Viewing Your Element (locally)

```
$ npm install
$ npm run serve
```


