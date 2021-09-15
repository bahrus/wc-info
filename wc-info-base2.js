import { html } from 'xtal-element/lib/html.js';
import { def } from 'd-fine/def.js';
import('./wc-info-fetch2.js');
import('pass-prop/p-p.js');
import('pass-down/p-d.js');
import('ib-id/i-bid.js');
import('d-fine/d-fine.js');
import('if-diff/if-diff.js');
export const mainTemplate = html `
<h1 part=title>Custom Elements API</h1>
<h2 part=package>Package: <label>{{package}}</label></h2>
<!-- <pass-prop observe-host on=href vft=href to=[-href] m=1></pass-prop> -->
<wc-info-fetch fetch -href></wc-info-fetch>
<p-d vft=declarations to=[-list] m=1></p-d>
<i-bid -list id=cust-el-declarations
    transform='{
        "customElementDeclarationElements": [{
            "name": "name",
            "tn": "tagName",
            "description": "description",
            "attr": "attributes",
            "evnts": "events"
        }]
    }'
></i-bid>
<template data-from=cust-el-declarations>
    <custom-element-declaration ></custom-element-declaration>
</template>
<d-fine templ-child as=custom-element-declaration
    prop-defaults='{"name":"", "tn":"", "description":"", "attr":[], "evnts":[]}'
    transform='{
        "h2": [{"id": "tn"}],
        "a": [{"href": ["#", "tn"], "textContent": "tn"}],
        "dfn": "description",
        "if-diff.attr":[{"iff": "attr"}],
        "if-diff.evnts":[{"iff": "evnts"}]
    }'
    noshadow
>
    <template>
        <hr>
        <h2 part=tag-name class=tag-name>
            <a></a>
        </h2>
        <dfn part=ce-description class=description></dfn>

        <!-- Attributes -->
        <if-diff class=attr -iff is-non-empty-array and media-matches="(min-width: 600px)" lazy-display lazy-delay=200>
            <template>
                <table part=ce-attributes class=attributes>
                    <caption part=cea-title class=title>Attributes</caption>
                    <thead>
                        <tr part=cea-header class=header>
                            <th part=ceah-name-label class=name>Attribute</th>
                            <th part=ceah-description-label class=description>Description</th>
                            <th part=ceah-type-label class=type>Type</th>
                            <th part=ceah-inherited-from-label class=inherited-from>Inherited From</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template>
                            <tr part=cea-item class=item>
                                <td part=ceai-name-value class=name></td>
                                <td part=ceai-description-value class=description></td>
                                <td part=ceai-type-value class=type data-len="{{type.text.length ?? '0'}}"></td>
                                <td part=ceai-inherited-from-value class=inherited-from></td>
                            </tr>
                        </template> 
                    </tbody>
                </table>
                <p-p observe-host vft=attr to=[-list] m=1></p-p>
                <i-bid -list updatable from-previous=table search-for=template transform='{
                    ".name": ".name ?? - ",
                    ".description": ".description ?? - ",
                    ".type": ".type.text ?? - ",
                    ".inherited-from": ["", ".inheritedFrom.name", " ", ".inheritedFrom.module"]
                }'></i-bid>                
            </template>
        </if-diff>
        <if-diff class=attr -iff is-non-empty-array and media-matches="(max-width: 599px)" lazy-display lazy-delay=200>
            <template>
                <table part=ce-attributes class="narrow attributes">
                    <caption part=cea-title class=title>Attributes</caption>
                    <tbody>
                        <template>
                        <tr part=cea-item class=item>
                            <td part=cenai-name-type-default-values class=name-type-default>
                                <hr part=cenaintdv-attr-line>
                                <div part=cenaintdv-attr-value class=attr-value>Attribute: <strong class=name></strong></div>
                                <hr part=cenaintdv-type-line>
                                <div part=cenaintdv-type-value class=type-value></div>
                                <hr part=cenaintdv-default-line>
                                <div part=cenaintdv-default-value class=default-value></div>
                            </td>
                            <td part=cenai-description-value class=description>
                                <hr>
                                <div part=cenaidv-label class=description-label>Description</div>
                                <div class=description></div>
                            </td>
                        </tr>
                        </template>
                    </tbody>
                </table>
                <p-p observe-host vft=attr to=[-list] m=1></p-p>
                <i-bid -list updatable from-previous=table search-for=template transform='{
                    ".name": ".name ?? - ",
                    ".description": ".description ?? - ",
                    ".type-value": ["Type: ", ".type.text ?? - "],
                    ".default-value": ["Default: ", ".default ?? -"],
                    ".inherited-from": ["", ".inheritedFrom.name", " ", ".inheritedFrom.module"]
                }'></i-bid> 

            </template>
        </if-diff>

        <!-- Events -->
        <if-diff class=evnts -iff is-non-empty-array and media-matches="(min-width: 600px)" lazy-display lazy-delay=200>
            <template>
                <table part=ce-events class=events>
                    <caption part=cee-title class=title>Events</caption>
                    <thead>
                        <tr part=cee-header class=header>
                            <th part=ceeh-name-label class=name>Event</th>
                            <th part=ceeh-description-label class=description>Description</th>
                            <th part=ceeh-type-label class=type>Type</th>
                            <th part=ceeh-inherited-from-label class=inherited-from>Inherited From</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template>
                            <tr part=cee-item class=item>
                                <td part=ceei-name-value class=name></td>
                                <td part=ceei-description-value class=description></td>
                                <td part=ceei-type-value class=type data-len="{{type.text.length ?? '0'}}"></td>
                                <td part=ceei-inherited-from-value class=inherited-from></td>
                                <td></td>                        
                            </tr>
                        </template>

                    </tbody>
                </table>
                <p-p observe-host vft=evnts to=[-list] m=1></p-p>
                <i-bid -list updatable from-previous=table search-for=template transform='{
                    ".name": ".name ?? - ",
                    ".description": ".description ?? - ",
                    ".type": ".type.text ?? - ",
                    ".inherited-from": ["", ".inheritedFrom.name", " ", ".inheritedFrom.module"]
                }'></i-bid>                  
            </template>
        </if-diff>
        <if-diff class=evnts -iff is-non-empty-array and media-matches="(max-width: 599px)" lazy-display lazy-delay=200>

        </if-diff>
    </template>
</d-fine>
`;
const WCInfoBase = def(mainTemplate, [], {
    label: 'package',
    wcInfoFetchElements: [{ href: 'href' }]
}, true, {
    config: {
        tagName: 'wc-info-base',
        propDefaults: {
            href: '',
            package: '',
        }
    }
});
