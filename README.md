[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/wc-info)

<a href="https://nodei.co/npm/wc-info/"><img src="https://nodei.co/npm/wc-info.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/wc-info">

# wc-info

wc-info provides a utility library for generating a Custom Element Manifest (CEM), specifically tailored for HTML-based declarative custom elements that build on xtal-element.

## Usefulness of Custom Element Manifest

Just some existing tooling that builds on top of Custom Element Manifests:

- [WC Language Server](https://github.com/wc-toolkit/wc-language-server)
- [CEM Tools](https://github.com/break-stuff/cem-tools)
- [Improved Debugging Support via Chrome Extension](https://chromewebstore.google.com/detail/web-component-devtools/gdniinfdlmmmjpnhgnkmfpffipenjljo?pli=1)
- [Documentation Generation](https://wc-info.bahrus.workers.dev/)

The three artifacts needed to generate the file:

- doc.mjs -- a three line canned script file that points to the types.d.ts (typically) file that defines the properties with descriptions
- A types.d.ts file that defines the "abstract class" and "package", for example, and points to the ".mjs" file that defines the definition of the html generator:

```TypeScript
import {SimpleWCInfo} from './ts-refs/wc-info/SimpleWCInfo';

export interface EndUserProps{
    ...
}

...
export abstract class ScratchBoxInfo implements SimpleWCInfo {
    src: './root.mjs';
    tagName: 'scratch-box';
    props: EndUserProps;

}

export type Package = [ScratchBoxInfo]
```

- A *.mjs file that is used to generate the *.html distributable (the generator is not maintained in this package).  The mjs file contains more information about the properties that are used in the generation of the manifest file, such as the corresponding attribute name (if applicable), read only status, etc. 


## Examples

###  [scratch-box](https://github.com/bahrus/scratch-box)

- [doc.mjs](https://github.com/bahrus/scratch-box/blob/baseline/doc.mjs)
- [types](https://github.com/bahrus/scratch-box/blob/baseline/types.d.ts)
- [root.mjs](https://github.com/bahrus/scratch-box/blob/baseline/root.mjs)
- [custom-elements.json](https://cdn.jsdelivr.net/npm/scratch-box@0.0.13/custom-elements.json)
- [Documentation](https://wc-info.bahrus.workers.dev/?href=https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fscratch-box%400.0.13%2Fcustom-elements.json&stylesheet=https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fwc-info%400.0.182%2Fsimple-ce-style.css&embedded=false&tags=&ts=2025-10-07T07%3A54%3A33.702Z&intro=scratch-box+custom+element)



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


