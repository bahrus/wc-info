import {html} from 'xtal-element/lib/html.js';
import {xc, ReactiveSurface, IReactor, PropAction, PropDef, PropDefMap} from 'xtal-element/lib/XtalCore.js';
import {WCInfoPackageProps} from './types.d.js';
import {xp} from 'xtal-element/lib/XtalPattern.js';
import {define} from 'xtal-element/lib/define.js';
import { DOMKeyPE } from 'xtal-element/lib/DOMKeyPE.js';
import('proxy-prop/proxy-prop.js');
import('xtal-fetch/xtal-fetch-get.js');
import('pass-down/p-d.js');
import('carbon-copy/c-c.js');
import('ib-id/i-bid.js');
import('if-diff/if-diff.js');

const mainTemplate = html`
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
        <p-p from-upsearch=wc-info-module observe-prop=exports  to=[-iff] m=1></p-p>
        <if-diff -iff is-non-empty-array>
            <template>
                <details>
                    <summary>Exports</summary>
                    <p-p from-upsearch=wc-info-module observe-prop=exports  to=[-list] m=1></p-p>
                    <i-bid -list>
                        <wc-info-export></wc-info-export>
                    </i-bid>
                </details>
            </template>
        </if-diff>
        <p-p from-upsearch=wc-info-module observe-prop=declarations to=[-iff] m=1></p-p>
        <if-diff -iff is-non-empty-array>
            <template>
                <details>
                    <summary>Declarations</summary>
                    <p-p from-upsearch=wc-info-module observe-prop=declarations to=[-list] m=1></p-p>
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
    <p-p from-upsearch=wc-info-declaration observe-prop=members to=[-iff] m=1></p-p>
    <if-diff -iff is-non-empty-array>
        <template>
            <details>
                <summary>Members</summary>
                <p-p from-upsearch=wc-info-declaration observe-prop=members to=[-list] m=1></p-p>
                <i-bid -list>
                    <wc-info-member></wc-info-declaration>
                </i-bid>
            </details>
        </template>
    </if-diff>
</template>
<c-c copy from-prev-sibling string-props='["name", "description", "kind"]' obj-props='["members"]' noshadow></c-c>

<template id=wc-info-member>
    <hr>
    <div>Name: {{name}}</div>
    <div>Description: {{description}}</div>
    <div>Kind: {{kind}}</div>
    <p-p from-upsearch=wc-info-member observe-prop=parameters to=[-iff] m=1></p-p>
    <if-diff -iff is-non-empty-array>
        <template>
            <details>
                <summary>Parameters</summary>
                <p-p from-upsearch=wc-info-member observe-prop=parameters to=[-list] m=1></p-p>
                <i-bid -list>
                    <wc-info-parameter></wc-info-parameter>
                </i-bid>
            </details>
        </template>
    </if-diff>
</template>
<c-c copy from-prev-sibling string-props='["name", "description", "kind"]' obj-props='["parameters"]' noshadow></c-c>

<template id=wc-info-parameter>
    <hr>
    <div>Parameter Name: {{name}}</div>
    
</template>
<c-c copy from-prev-sibling string-props='["name", "description", "kind"]' obj-props='["parameters"]' noshadow></c-c>

<p-p from-host observe-prop=href to=[-href] m=1></p-p>
<xtal-fetch-get fetch -href></xtal-fetch-get>
<p-d on=result-changed to=[-list] val-from-target=result.modules></p-d>
<div>Modules</div>
<i-bid -list>
    <wc-info-module></wc-info-module>
</i-bid>
`;
export class WCInfoPackage extends HTMLElement implements ReactiveSurface, WCInfoPackageProps{
    static is = 'wc-info-package';
    self = this;
    propActions = propActions;
    clonedTemplate: DocumentFragment | undefined; domCache: any;
    reactor: IReactor = new xp.RxSuppl(this, [{
        rhsType: Array,
        ctor: DOMKeyPE
    }]);
    mainTemplate = mainTemplate;
    connectedCallback(){
        xc.mergeProps(this, slicedPropDefs);
    }
    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }


}



const propActions = [
    xp.manageMainTemplate,
    xp.createShadow
] as PropAction[];
const baseProp: PropDef = {
    async: true,
    dry: true,
};
const strProp1: PropDef = {
    ...baseProp,
    type: String
};
const objProp1: PropDef = {
    ...baseProp,
    type: Object,
};
const nnObjProp: PropDef = {
    ...objProp1,
    stopReactionsIfFalsy: true,
}
const propDefMap: PropDefMap<WCInfoPackageProps> = {
    ...xp.props,
    href: strProp1,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(WCInfoPackage, slicedPropDefs, 'onPropChange');
define(WCInfoPackage);