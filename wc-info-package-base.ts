import {html} from 'xtal-element/lib/html.js';
import {WCInfoPackageProps} from './types.js';
import {X} from 'xtal-element/lib/X.js';
import('proxy-prop/proxy-prop.js');
import('xtal-fetch/xtal-fetch-get.js');
import('pass-down/p-d.js');

import('carbon-copy/c-c.js');
import('ib-id/i-bid.js');
import('if-diff/if-diff.js');

const mainTemplate = html`
<template id=wc-info-module>
    <details>
        <summary>{{path}}</summary>
        <div>Summary: {{summary}}</div>
        <div>Is a {{kind}}</div>
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
    <div>{{kind}} name: {{name}}</div>
    <div>Description: {{description}}</div>
</template>
<c-c copy from-prev-sibling string-props='["name", "description", "kind"]'  noshadow></c-c>

<template id=wc-info-declaration>
    <div>{{kind}} name: {{name}}</div>
    <div>Description: {{description}}</div>
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
    <div>{{kind}} name: {{name}}</div>
    <div>Description: {{description}}</div>
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

<p-p from-parent-or-host observe-prop=href to=[-href] m=1></p-p>
<xtal-fetch-get fetch -href></xtal-fetch-get>
<p-d on=result-changed to=[-list] val-from-target=result.modules></p-d>

<div>Modules</div>
<i-bid -list>
    <wc-info-module></wc-info-module>
</i-bid>
`;


export class WCInfoPackageBase extends X implements WCInfoPackageProps{}

X.tend({
    name: 'wc-info-package-base',
    class: WCInfoPackageBase as {new(): X},
    propDefs: {
        href:{
            dry: true,
            type: String,
        }
    },
    mainTemplate,
    noShadow: true,
});
