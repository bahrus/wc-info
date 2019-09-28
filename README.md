[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/wc-info)

<a href="https://nodei.co/npm/wc-info/"><img src="https://nodei.co/npm/wc-info.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/wc-info">

# wc-info

UI for [VSCode's html data file](https://code.visualstudio.com/updates/v1_31#_html-and-css-custom-data-support) / [Web Component Analyzer](https://www.npmjs.com/package/web-component-analyzer) JSON format.

So far, VSCode only supports attributes, and it's been a few months since the schema has been updated.  So this web component adds additional support for properties and custom events (but schema will change to support whatever VSCode decides, should they add support).  Schema for properties and events is based on the Web Component Analyzer format (subject to change).  

An enhanced JSON schema file with this additional support for properties and custom events is provided:  [https://unpkg.com/wc-info@0.0.66/schema.json](https://unpkg.com/wc-info@0.0.58/schema.json).


## Basic in-built styling

[Demo](https://jsfiddle.net/bahrus/xzo0j6g2/)

<!--
```
<custom-element-demo>
<template>
  <div>
    <div>
      <wc-info package-name="npm.wc-info" href="https://unpkg.com/wc-info@0.0.69/custom-elements.json">
      </wc-info>
      <wc-info package-name="npm.xtal-fetch" href="https://unpkg.com/xtal-fetch@0.0.73/custom-elements.json">
      </wc-info>
      <wc-info package-name="npm.xtal-frappe-chart" href="https://unpkg.com/xtal-frappe-chart@0.0.47/custom-elements.json"></wc-info>
      <wc-info package-name="npm.if-diff" href="https://unpkg.com/if-diff@0.0.34/html.json">
      </wc-info>
      <wc-info package-name="npm.p-et-alia" href="https://unpkg.com/p-et-alia@0.0.47/custom-elements.json">
      </wc-info>
      <wc-info package-name="npm.pre-render-tron" href="https://unpkg.com/pre-render-tron@0.0.6/html.json">
      </wc-info>
      <wc-info package-name="npm.hypo-link" href="https://unpkg.com/hypo-link@0.0.15/html.json">
      </wc-info>

    </div>
    <style>
      wc-info {
        margin-top: 10px;
      }
    </style>
    
    <script type="module" src="https://unpkg.com/wc-info@0.0.69/wc-info.js?module"></script>
  </div>
</template>
</custom-element-demo>
```
-->



## Viewing Your Element (locally)

```
$ npm run serve
```


