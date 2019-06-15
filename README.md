[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/wc-info)

<a href="https://nodei.co/npm/wc-info/"><img src="https://nodei.co/npm/wc-info.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/wc-info">

# wc-info

UI for [VSCode's html data file](https://code.visualstudio.com/updates/v1_31#_html-and-css-custom-data-support)

So far, only attributes are supported, and it's been a few months since the schema has been updated.  So this web component adds additional support for custom events (but schema will change to support whatever VSCode decides, should they add support).  Such support should go a long way towards declaring a "contract" between independent components.

```JSON
```

## Basic in-built styling

<!--
```
<custom-element-demo>
<template>
    <div>
      <wc-info
        package-name="npm install wc-info"
        href="https://unpkg.com/wc-info@0.0.25/html.json"
      >
      </wc-info>
      <wc-info
        package-name="npm install if-diff"
        href="https://unpkg.com/if-diff@0.0.20/html.json"
      >
      </wc-info>
      <wc-info
        package-name="npm install p-d.p-u"
        href="https://unpkg.com/p-d.p-u@0.0.101/html.json"
      >
      </wc-info>
      <wc-info
        package-name="npm install pre-render-tron"
        href="https://unpkg.com/pre-render-tron@0.0.6/html.json"
      >
      </wc-info>
      <wc-info
        package-name="npm install hypo-link"
        href="https://unpkg.com/hypo-link@0.0.10/html.json"
      >
      </wc-info>
    </div>
    <style>
      wc-info {
        margin-top: 10px;
      }
    </style>
        <!-- Use experimental import maps -->
        <script defer src="https://cdn.jsdelivr.net/npm/es-module-shims@0.2.0/dist/es-module-shims.js"></script>
        <script type="importmap-shim">
          {
            "imports": {
              "xtal-latx/": "https://cdn.jsdelivr.net/npm/xtal-latx@0.0.88/",
              "trans-render/": "https://cdn.jsdelivr.net/npm/trans-render@0.0.60/",
              "hypo-link/": "https://cdn.jsdelivr.net/npm/hypo-link@0.0.8/",
              "xtal-element/": "https://cdn.jsdelivr.net/npm/xtal-element@0.0.23/",
              "wc-info/": "https://cdn.jsdelivr.net/npm/wc-info@0.0.28/"
              
            }
          }
          </script>
          
        <script  type="module-shim">
          import 'wc-info/wc-info.js';
        </script>
</template>
</custom-element-demo>
```
-->



## Viewing Your Element (locally)

```
$ polymer serve
```

[polymer serve](https://www.npmjs.com/package/polymer-cli) required (for now) due to use of bare import specifiers.


<!--
[Here's](https://github.com/search?q=%22description%22+%22tags%22+path%3A%2F+filename%3A%22html.json%22) a URL that may provide an approximate list of all the VSCode web-components.json files.
-->

