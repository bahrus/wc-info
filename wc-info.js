import { WCInfoBase } from "./wc-info-base.js";
import { define } from "xtal-latx/define.js";
import { createTemplate } from "xtal-element/utils.js";
import { append } from 'trans-render/append.js';
const styleTemplate = createTemplate(
/* html */ `
<style>
:host{
    display: block;
}
main {
    border-color: grey;
    border-width: 1px;
    border-style: solid;
    padding: 8px;
}
details {
    width: 100%;
}
header {
    display: flex;
    justify-content: flex-start;
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
}
mark {
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
.WCLabel {
    font-weight: 800;
    padding-right: 20px;
    flex-basis:25%;
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
//# sourceMappingURL=wc-info.js.map