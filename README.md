[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/wc-info)

<a href="https://nodei.co/npm/wc-info/"><img src="https://nodei.co/npm/wc-info.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/wc-info">

# wc-info

UI for [VSCode's html data file](https://code.visualstudio.com/updates/v1_31#_html-and-css-custom-data-support) / [Web Component Analyzer](https://www.npmjs.com/package/web-component-analyzer) JSON format.

Schema for properties and events is based on the Web Component Analyzer format (subject to change), which extends the VSCode format. 

An enhanced JSON schema file with this additional support for properties and custom events is provided:  [https://unpkg.com/wc-info@0.0.70/schema.json](https://unpkg.com/wc-info@0.0.70/schema.json).

Additional experimental support for examples / test cases is also included in the schema.


## Basic in-built styling

[Demo](https://jsfiddle.net/bahrus/xzo0j6g2/4/)

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
    
    <script type="module" src="https://unpkg.com/wc-info@0.0.70/wc-info.js?module"></script>
  </div>
</template>
</custom-element-demo>
```
-->

A web is available that allows you to pass in the package name via the query string, and it generates the syntax document:

https://bahrus.github.io/wc-info/syntax.html?npmPackage=[npm package name]

This assumes the package contains a "custom-elements.json" file in the root folder.

For example:

<a href="https://bahrus.github.io/wc-info/syntax.html?npmPackage=xtal-text-input-md">Syntax for xtal-text-input-md</a>



## Viewing Your Element (locally)

```
$ npm install
$ npm run serve
```


