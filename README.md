[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/wc-info)

<a href="https://nodei.co/npm/wc-info/"><img src="https://nodei.co/npm/wc-info.png"></a>

File Sizes:

Base (style-less):  <img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/wc-info@0.0.8/dist/wc-info-base.iife.min.js?compression=gzip">

# wc-info

UI for [VSCode's web-component.json file](https://code.visualstudio.com/updates/v1_30#_html-custom-tags-attributes-support)

## Basic in-built styling

<!--
```
<custom-element-demo>
<template>
    <div>
        <wc-info href="https://unpkg.com/wc-info@0.0.9/web-components.json"></wc-info>
        <script type="module" src="https://unpkg.com/wc-info@0.0.9/wc-info.js?module"></script>
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

        <wc-info-base href="https://unpkg.com/wc-info@0.0.9/web-components.json"></wc-info-base>
        <style>
        :host{
            display: block;
        }
        main{
            border-color:grey;
            border-width:1px;
            border-style:solid;
            padding:8px;
        }
        header{
            
            display:flex;
            flex-direction:row;
            justify-content:flex-start;
        }
        mark{
            flex:0 1 auto;
            position:absolute;
            left:50%;
            transform: translateX(-50%);
        }
        nav{
            margin-left:auto;
        }
        a{
            text-decoration:none;
        }
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
        <script type="module" src="https://unpkg.com/wc-info@0.0.9/wc-info-base.js?module"></script>
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





