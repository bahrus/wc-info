import { X } from 'xtal-element/lib/X.js';
import { html } from 'xtal-element/lib/html.js';
import('proxy-prop/proxy-prop.js');
import('pass-down/p-d-x.js');
import('carbon-copy/c-c.js');
import('xtal-fetch/xtal-fetch-get.js');
import('carbon-copy/c-c.js');
import('ib-id/i-bid.js');
import('if-diff/if-diff.js');
const mainTemplate = html `
<template id=custom-element-declaration>
    <div>{{_tagName}}</div>
</template>
<c-c copy from-prev-sibling string-props='["name", "description", "kind", "_tagName"]' obj-props='["members"]' noshadow></c-c>
<p-p from-parent-or-host observe-prop=href to=[-href] m=1></p-p>
<xtal-fetch-get fetch -href></xtal-fetch-get>
<p-d-x on=result-changed to=[-list] val=target.result val-filter=$.modules.[*].declarations[?(@.tagName)]></p-d-x>
<div>Custom Elements</div>
<i-bid -list>
    <custom-element-declaration></custom-element-declaration>
</i-bid>
`;
export class WCInfoBase extends X {
}
X.tend({
    name: 'wc-info-base',
    class: WCInfoBase,
    propDefs: {
        href: {
            dry: true,
            type: String,
        }
    },
    mainTemplate,
    noShadow: true,
});
