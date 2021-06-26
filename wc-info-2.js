import { html } from 'xtal-element/lib/html.js';
import { xc } from 'xtal-element/lib/XtalCore.js';
import { xp } from 'xtal-element/lib/XtalPattern.js';
import { define } from 'xtal-element/lib/define.js';
import { DOMKeyPE } from 'xtal-element/lib/DOMKeyPE.js';
import('proxy-prop/proxy-prop.js');
import('xtal-fetch/xtal-fetch-get.js');
import('pass-down/p-d.js');
import('carbon-copy/c-c.js');
import('ib-id/i-bid.js');
import('if-diff/if-diff.js');
const mainTemplate = html `
<style>
details{
    margin-left: 20px;
}
</style>
<template id=wc-info-module>
    <details>
        <summary>{{path}}</summary>
        <div>Summary: {{summary}}</div>
        <div>Kind: {{kind}}</div>
        <proxy-prop from-upsearch=wc-info-module observe-prop=exports  to=[-iff] m=1></proxy-prop>
        <if-diff -iff>
            <template>
                <details>
                    <summary>Exports</summary>
                    <proxy-prop from-upsearch=wc-info-module observe-prop=exports  to=[-list]></proxy-prop>
                    <i-bid -list>
                        <wc-info-export></wc-info-export>
                    </i-bid>
                </details>
            </template>
        </if-diff>
        <proxy-prop from-upsearch=wc-info-module observe-prop=declarations to=[-iff]></proxy-prop>
        <if-diff -iff>
            <template>
                <details>
                    <summary>Declarations</summary>
                    <proxy-prop from-upsearch=wc-info-module observe-prop=declarations to=[-list]></proxy-prop>
                    <i-bid -list>
                        <wc-info-declaration></wc-info-declaration>
                    </i-bid>
                </details>
            </template>
        </if-diff>
    </details>
</template>
<c-c copy from-prev-sibling string-props='["path", "summary", "kind"]' obj-props='["exports", "declarations"]' noshadow></c-c>

<template id=wc-info-export>
    <div>{{name}}</div>
    <div>Description: {{description}}</div>
    <div>Kind: {{kind}}</div>
</template>
<c-c copy from-prev-sibling string-props='["name", "description", "kind"]'  noshadow></c-c>

<template id=wc-info-declaration>
    <div>{{name}}</div>
    <div>Description: {{description}}</div>
    <div>Kind: {{kind}}</div>
    <details>
        <summary>Members</summary>
        <proxy-prop from-upsearch=wc-info-declaration observe-prop=members to=[-list]></proxy-prop>
        <i-bid -list>
            <wc-info-member></wc-info-declaration>
        </i-bid>
    </details>
</template>
<c-c copy from-prev-sibling string-props='["name", "description", "kind"]' obj-props='["members"]' noshadow></c-c>

<template id=wc-info-member>
    <div>{{name}}</div>
    <div>Description: {{description}}</div>
    <div>Kind: {{kind}}</div>

    <details>
        <summary>Parameters</summary>
    </details>
</template>
<c-c copy from-prev-sibling string-props='["name", "description", "kind"]' obj-props='["parameters"]' noshadow></c-c>

<template id=wc-info-parameter>
</template>
<c-c copy from-prev-sibling string-props='["name", "description", "kind"]' obj-props='["parameters"]' noshadow></c-c>

<proxy-prop from-host observe-prop=href to=[-href] ></proxy-prop>
<xtal-fetch-get fetch -href></xtal-fetch-get>
<p-d on=result-changed to=[-list] val-from-target=result.modules></p-d>
<div>Modules</div>
<i-bid -list>
    <wc-info-module></wc-info-module>
</i-bid>
`;
export class WCInfo extends HTMLElement {
    static is = 'wc-info';
    self = this;
    propActions = propActions;
    clonedTemplate;
    domCache;
    reactor = new xp.RxSuppl(this, [{
            rhsType: Array,
            ctor: DOMKeyPE
        }]);
    mainTemplate = mainTemplate;
    connectedCallback() {
        xc.mergeProps(this, slicedPropDefs);
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
    href;
    packageInfo;
    modules;
}
const propActions = [
    xp.manageMainTemplate,
    xp.createShadow
];
const baseProp = {
    async: true,
    dry: true,
};
const strProp1 = {
    ...baseProp,
    type: String
};
const objProp1 = {
    ...baseProp,
    type: Object,
};
const nnObjProp = {
    ...objProp1,
    stopReactionsIfFalsy: true,
};
const propDefMap = {
    ...xp.props,
    href: strProp1,
    packageInfo: nnObjProp,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(WCInfo, slicedPropDefs, 'onPropChange');
define(WCInfo);
