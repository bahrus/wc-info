import {html} from 'xtal-element/lib/html.js';
import {def} from 'd-fine/def.js';
import { WCInfoBaseProps } from './types.js';
import('./wc-info-fetch2.js');
//import('pass-prop/pass-prop.js');
import('pass-down/p-d.js');
import('ib-id/i-bid.js');
import('d-fine/d-fine.js');

export const mainTemplate = html`
<h1 part=title>Custom Elements API</h1>
<h2 part=package>Package: <label>{{package}}</label></h2>
<!-- <pass-prop observe-host on=href vft=href to=[-href] m=1></pass-prop> -->
<wc-info-fetch fetch -href></wc-info-fetch>
<p-d vft=declarations to=[-list] m=1></p-d>
<i-bid -list id=cust-el-declarations
    transform='{
        "customElementDeclarationElements": [{
            "name": ["name"],
            "tn": ["tagName"],
            "description": ["description"]
        }]
    }'
></i-bid>
<template data-from=cust-el-declarations>
    <custom-element-declaration ></custom-element-declaration>
</template>
<d-fine templ-child as=custom-element-declaration
    prop-defaults='{"name":"", "tn":"", "description":""}'
    transform='{
        "h2": [{"id": ["tn"]}],
        "a": [{"href": ["#", "tn"], "textContent": ["tn"]}],
        "dfn": ["description"]
    }'
    noshadow
>
    <template>
        <hr>
        <h2 part=tag-name class=tag-name>
            <a></a>
        </h2>
        <dfn part=ce-description class=description></dfn>
    </template>
</d-fine>
`;

const WCInfoBase = def(mainTemplate, [], {
    label: ['package'],
    wcInfoFetchElements: [{href: ['href']}]
}, 
true,
{
    config:{
        tagName: 'wc-info-base',
        propDefaults: {
            href: '',
            package: '',
        }
    }
}
);
