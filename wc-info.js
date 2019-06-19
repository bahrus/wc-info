import { WCInfoBase } from "./wc-info-base.js";
import { define } from "trans-render/define.js";
import { createTemplate } from "xtal-element/utils.js";
import { append } from 'trans-render/append.js';
const styleTemplate = createTemplate(
/* html */ `
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
<style>
:host{
    display: block;
    border-color: black;
    border-width: 1px;
    border-style: solid;
    
}

aside{
    font-size:0.75rem;
}

section[data-type]{
    margin-left:20px;
}

main {
    padding: 8px;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Roboto, sans-serif;
}
details {
    width: 100%;
    
}
dl{
    margin-left:20px;
}
header {
    display: flex;
    justify-content: flex-start;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Roboto, sans-serif;
    width:100%;
}
@media only screen and (max-width: 800px) {
    header{
    flex-direction: column;
    }
}
@media only screen and (min-width: 801px) {
    header{
    flex-direction: row;
    }
}        
summary {
    margin-top: 20px;
    list-style: none;
    cursor:pointer;
}
summary::-webkit-details-marker{
    display:none;
}
h3 {
    flex: 0 1 auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
nav {
    margin-left: auto;
}
a {
    text-decoration: none;
}
.card {
    padding: 16px;
    mix-blend-mode: difference;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    /* transition: 0.3s; */
}
.WCName {
    font-weight: 800;
    padding-right: 20px;
    flex-basis:25%;
    display:flex;
    flex-direction:row;
}
.WCDescription{
    flex-basis:75%;
}
dd {
    margin-inline-start: 20%;
}
dt {
    font-weight: 700;
}
.WCInfo.card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
`);
//const mainTemplateExt = createTemplate(mainTemplateExt$);
export class WCInfo extends WCInfoBase {
    constructor() {
        super(...arguments);
        this._renderOptions = {
            initializedCallback: (ctx, target) => {
                append(target, styleTemplate);
            }
        };
    }
    static get is() {
        return "wc-info";
    }
    get noShadow() {
        return false;
    }
    get renderOptions() {
        return this._renderOptions;
    }
}
define(WCInfo);
