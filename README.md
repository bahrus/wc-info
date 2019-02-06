[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/wc-info)

<a href="https://nodei.co/npm/wc-info/"><img src="https://nodei.co/npm/wc-info.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/wc-info">

# wc-info

UI for [VSCode's web-component.json file](https://code.visualstudio.com/updates/v1_30#_html-custom-tags-attributes-support)

## Basic in-built styling

<!--
```
<custom-element-demo>
<template>
    <div>
        <wc-info package-name="npm install wc-info" href="https://unpkg.com/wc-info@0.0.12/web-components.json">
        </wc-info>
        <wc-info package-name="npm install if-diff" href="https://unpkg.com/if-diff@0.0.17/web-components.json">
        </wc-info>
        <wc-info package-name="npm install p-d.p-u" href="https://unpkg.com/p-d.p-u@0.0.94/web-components.json">
        </wc-info>
        <wc-info package-name="npm install xtal-fetch" href="https://unpkg.com/xtal-fetch@0.0.53/web-components.json">
        </wc-info>
        <wc-info package-name="npm install xtal-state" href="https://unpkg.com/xtal-state@0.0.60/web-components.json">
        </wc-info>
        <wc-info package-name="npm install billboard-charts" href="https://unpkg.com/billboard-charts@0.1.31/web-components.json">
        </wc-info>
        <wc-info package-name="npm install xtal-siema" href="https://unpkg.com/xtal-siema@0.0.26/web-components.json">
        </wc-info>
        <script type="module" src="https://unpkg.com/wc-info@0.0.23/dist/wc-info.iife.js"></script>
    </div>
</template>
</custom-element-demo>
```
-->

## BYOS (where S=Style)

<!--
```
<custom-element-demo>
  <template>
    <div>

        <wc-info-base href="https://unpkg.com/wc-info@0.0.4/web-components.json" package-name="npm.wc-info"></wc-info-base>
        <style>
            .card {
                    padding: 16px;
                    mix-blend-mode: difference;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
        
                    /* Add shadows to create the "card" effect */
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    /* transition: 0.3s; */
                }
            .WCLabel{
                font-weight: 800;
            }
            dt{
                font-weight: 700;
            }
            .WCInfo.card{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }
        </style>
        <script type="module" src="https://unpkg.com/wc-info@0.0.14/dist/wc-info-base.iife.js"></script>
    </div>
  </template>
</custom-element-demo>
```
-->


## Viewing Your Element (locally)

```
$ polymer serve
```

[polymer serve](https://www.npmjs.com/package/polymer-cli) required (for now) due to use of bare import specifiers.


[Here's](https://github.com/search?q=%22description%22+%22tags%22+path%3A%2F+filename%3A%22web-components.json%22) a URL that may provide an approximate list of all the VSCode web-components.json files.


