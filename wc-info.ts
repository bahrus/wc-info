import {html} from 'trans-render/lib/html.js';
import {DefineArgs} from 'trans-render/lib/types';
import ('be-definitive/be-definitive.js');
import ('be-reformable/be-reformable.js');
import ('be-observant/be-observant.js');
import ('./be-reformable-as-wc-info.js');
import ('be-hive/be-hive.js');
import ('be-repeated/be-repeated.js');
import ('be-switched/be-switched.js');

if(document.querySelector('be-hive')===null){
    document.body.appendChild(document.createElement('be-hive'));
}

const mainTemplate = html`
<style>
    .be-lazy-loaded{
        position:absolute;
        top: -10000px;
        display:block;
    }
</style>
<link rel=stylesheet be-observant='{
    "href": ".cssHref"
}'>
<h1 part=title>Custom Elements API</h1>
<h2 part=package>Package: <label></label></h2>
<form be-reformable-as-wc-info='{
    "autoSubmit": true,
    "emitEvents": ["declarations"],
    "url": {
        "onSet": "href",
        "vft": "href"
    }
}'></form>
<custom-element-declaration data-is-hostish be-repeated='{
    "transform": {
        "custom-element-declaration": [{
            "name": "name",
            "tn": "tagName",
            "description": "description",
            "attr": "attributes",
            "events": "events",
            "props": "unevaluatedNonStaticPublicFields",
            "slots": "slots",
            "cssProperties": "cssProperties",
            "cssParts": "cssParts",
            "methods": "methods"
        }]
    },
    "list": {"observe": "form", "vft": "declarations", "fromProxy": "reformable-as-wc-info"}
}'
></custom-element-declaration>
<template be-definitive='{
    "config":{
        "tagName": "custom-element-declaration",
        "propDefaults":{
            "name":"", "tn":"", "description":"", "attr":[], "events":[], "props":[], "slots":[],
            "cssProperties": [], "cssParts": [], "methods":[], "noshadow": true,
            "updateTransform":{
                "h2[-id]": "tn",
                "a[-href]": ["#", "tn"],
                "a": "tn",
                "dfn": "description"             
            }           
        }
    }
}'>

    <hr>
    <h2 -id part=tag-name class=tag-name>
        <a -href -text-content></a>
    </h2>
    <dfn part=ce-description class=description></dfn>

    <!-- Attributes -->

    <!-- Large Screen Attributes -->
    <template class=be-lazy-loaded be-switched='{
        "if": true,
        "ifNonEmptyArray": ".attr",
        "ifMediaMatches": "(min-width: 600px)",
        "lazyDisplay": true, "lazyDelay": 1000
    }'>
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
                <tr part=cea-item class=item be-repeated='{
                    "list": ".attr",
                    "transform": {
                        ".name": ".name ?? - ",
                        ".description": ".description ?? - ",
                        ".type": ".type.text ?? - ",
                        ".inherited-from": ["", ".inheritedFrom.name", " ", ".inheritedFrom.module"]                        
                    }
                }'>
                    <td part=ceai-name-value class=name></td>
                    <td part=ceai-description-value class=description></td>
                    <td part=ceai-type-value class=type data-len="{{type.text.length ?? '0'}}"></td>
                    <td part=ceai-inherited-from-value class=inherited-from></td>
                </tr>
            </tbody>
        </table>
    </template>

    <!-- Small Screen Attributes -->
    <template class=be-lazy-loaded be-switched='{
        "if": true,
        "ifNonEmptyArray": ".attr",
        "ifMediaMatches": "(max-width: 599px)",
        "lazyDisplay": true, "lazyDelay": 1000
    }'>
        <table part=ce-attributes class="narrow attributes">
            <caption part=cea-title class=title>Attributes</caption>
            <tbody>
                <tr part=cea-item class=item be-repeated='{
                    "list": ".attr",
                    "transform": {
                        ".name": ".name ?? - ",
                        ".description-value": ".description ?? - ",
                        ".type-value": ["Type: ", ".type.text ?? - "],
                        ".default-value": ["Default: ", ".default ?? -"],
                        ".inherited-from": ["", ".inheritedFrom.name", " ", ".inheritedFrom.module"]                        
                    }
                }'>
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
                        <div class=description-value></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </template>

    <!-- Events -->

    <!-- Large Screen Events -->
    <template class=be-lazy-loaded be-switched='{
        "if": true,
        "ifNonEmptyArray": ".events",
        "ifMediaMatches": "(min-width: 600px)",
        "lazyDisplay": true, "lazyDelay": 1000
    }'>
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
                <tr part=cee-item class=item be-repeated='{
                    "list": ".events",
                    "transform": {
                        ".name": ".name ?? - ",
                        ".description": ".description ?? - ",
                        ".type": ".type.text ?? - ",
                        ".inherited-from": ["", ".inheritedFrom.name", " ", ".inheritedFrom.module"]                        
                    }
                }'>
                    <td part=ceei-name-value class=name></td>
                    <td part=ceei-description-value class=description></td>
                    <td part=ceei-type-value class=type data-len="{{type.text.length ?? '0'}}"></td>
                    <td part=ceei-inherited-from-value class=inherited-from></td>
                    <td></td>                        
                </tr>
            </tbody>
        </table>
    </template>

    <!-- Small Screen Events -->
    <template class=be-lazy-loaded be-switched='{
        "if": true,
        "ifNonEmptyArray": ".events",
        "ifMediaMatches": "(max-width: 599px)",
        "lazyDisplay": true, "lazyDelay": 1000
    }'>
        <table part=ce-events class="narrow events">
            <caption part=cee-title class=title>Events</caption>
            <tbody>
                <tr part=cee-item class=item be-repeated='{
                    "list": ".events",
                    "transform": {
                        ".name": ".name ?? - ",
                        ".description-value": ".description ?? - ",
                        ".type-value":["Type: ", ".type.text ?? - "],
                        ".inherited-from": ["", ".inheritedFrom.name", " ", ".inheritedFrom.module"]                        
                    }
                }'>
                    <td part=ceei-name-type-default-values class=name-type-default>
                        <hr part=ceeintdv-event-line>
                        <div part=ceeintdv-event-value class=attr-value>Event: <strong class=name></strong></div>
                        <hr part=ceeintdv-type-line>
                        <div part=ceeintdv-type-value class=type-value></div>
                        <!-- <hr part=ceeintdv-default-line>
                        <div part=ceeintdv-default-value class=default-value>Default: {{default ?? '-' }}</div> -->
                    </td>
                    <td part=ceei-description-value class=description>
                        <hr>
                        <div part=ceeidv-label class=description-label>Description</div>
                        <div class=description-value></div>
                    </td>                            
                </tr>
            </tbody>
        </table>
    </template>

    <!-- props -->

    <!-- Large Screen Props -->
    <template class=be-lazy-loaded be-switched='{
        "if": true,
        "ifNonEmptyArray": ".props",
        "ifMediaMatches": "(min-width: 600px)",
        "lazyDisplay": true, "lazyDelay": 1000
    }'>
        <table part=ce-properties class=properties part=properties>
            <caption part=cep-title class=title>Properties</caption>
            <thead>
                <tr part=cep-header class=header>
                    <th part=ceph-name-label class=name>Property</th>
                    <th part=ceph-description-label class=description>Description</th>
                    <th part=ceph-type-label class=type>Type</th>
                    <th part=ceph-default-label class=default>Default</th>
                    <th part=ceph-inherited-from-label class=inherited-from>Inherited From</th>
                </tr>
            </thead>
            <tbody>
                <tr part=cep-item class=item be-repeated='{
                    "list": ".props",
                    "transform": {
                        ".name": ".name ?? - ",
                        ".description": ".description ?? - ",
                        ".type-text": ".type.text ?? - ",
                        "code": ".default ?? - ",
                        ".inherited-from": ["", ".inheritedFrom.name", " ", ".inheritedFrom.module"]                        
                    }
                }'>
                    <td part=cepi-name-value class=name></td>
                    <td part=cepi-description-value class=description></td>
                    <td part=cepi-type-text-value class=type-text></td>
                    <td part=cepi-default-value class=default><code></code></td></td>
                    <td part=cepi-inherited-from-value class=inherited-from></td>
                </tr>
            </tbody>
        </table>
    </template>

    <!-- Small Screen Props -->
    <template class=be-lazy-loaded be-switched='{
        "if": true,
        "ifNonEmptyArray": ".props",
        "ifMediaMatches": "(max-width: 599px)",
        "lazyDisplay": true, "lazyDelay": 1000
    }'>
        <table part=ce-narrow-properties class="narrow properties" part=properties>
            <caption part=cenp-title class=title>Properties</caption>
            <tbody>
                <tr part=cep-item class=item be-repeated='{
                    "list": ".props",
                    "transform": {
                        ".name": ".name ?? - ",
                        ".description-value": ".description ?? - ",
                        ".type-value": ["Type: ", ".type.text ?? - "],
                        "code": ".default ?? - ",
                        ".inherited-from": ["", ".inheritedFrom.name", " ", ".inheritedFrom.module"]                        
                    }
                }'>
                    <td part=cenpi-name-type-default-values class=name-type-default>
                        <hr part=cenpintdv-prop-line>
                        <div part=cenpintdv-property-value class=property-value>Property: <strong class=name></strong></div>
                        <hr part=cenpintdv-type-line>
                        <div part=cenpintdv-type-value class=type-value></div>
                        <hr part=cenpintdv-default-line>
                        <div part=cenpintdv-default-value class=default-value>Default: <code></code></div>
                        <hr>
                    </td>
                    <td part=cenpi-description-value class=description>
                        <hr>
                        <div part=cenpidv-label class=description-label>Description</div>
                        <div part=cenpidv-description class=description-value></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </template>

    <!-- slots -->
    <template class=be-lazy-loaded be-switched='{
        "if": true,
        "ifNonEmptyArray": ".slots",
        "lazyDisplay": true, "lazyDelay": 1000
    }'>
        <table part=ce-slots class=slots>
            <caption part=ces-title class=title>Slots</caption>
            <thead>
                <tr part=ces-header class=header>
                    <th part=cesh-slot-label class=name>Slot</th>
                    <th part=cesh-description-label class=description>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr part=ces-item class=item be-repeated='{
                    "list": ".slots",
                    "transform":{
                        ".name": ".name ?? - ",
                        ".description": ".description ?? - "                        
                    }
                }'>
                    <td part=cesi-name-value class=name></td>
                    <td part=cesi-description-value class=description></td>
                </tr>
            </tbody>
        </table>
    </template>

    <!-- CSS Props -->
    <template class=be-lazy-loaded be-switched='{
        "if": true,
        "ifNonEmptyArray": ".cssProperties",
        "lazyDisplay": true, "lazyDelay": 1000
    }'>
        <table part=ce-css-props class=css-props>
            <caption part=cecp-title class=title>CSS Properties</caption>
            <thead>
                <tr part=cecp-header class=header>
                    <th part=cecph-css-prop-label class=name>Property</th>
                    <th part=cecph-description-label class=description>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr part=ces-item class=item be-repeated='{
                    "list": ".cssProperties",
                    "transform":{
                        ".name": ".name ?? - ",
                        ".description": ".description ?? - "                        
                    }
                }'>
                    <td part=cesi-name-value class=name>{{name}}</td>
                    <td part=cesi-description-value class=description>{{description ?? '-'}}</td>
                </tr>
            </tbody>
        </table>
    </template>

    <!-- CSS Parts -->
    <template class=be-lazy-loaded be-switched='{
        "if": true,
        "ifNonEmptyArray": ".cssParts",
        "lazyDisplay": true, "lazyDelay": 1000
    }'>
        <table part=ce-css-props class=css-props>
            <caption part=cecp-title class=title>CSS Parts</caption>
            <thead>
                <tr part=cecp-header class=header>
                    <th part=cecph-css-prop-label class=name>Part</th>
                    <th part=cecph-description-label class=description>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr part=ces-item class=item be-repeated='{
                    "list": ".cssParts",
                    "transform": {
                        ".name": ".name ?? - ",
                        ".description": ".description ?? - "                        
                    }
                }'>
                    <td part=cesi-name-value class=name></td>
                    <td part=cesi-description-value class=description></td>                           
                </tr>
            </tbody>
        </table>
    </template>

    <!-- Methods -->

    <!-- Large Screen -->
    <template class=be-lazy-loaded be-switched='{
        "if": true,
        "ifNonEmptyArray": ".methods",
        "lazyDisplay": true, "lazyDelay": 1000
    }'>
        <table part=ce-methods class=methods>
            <caption part=cem-title class=title>Methods</caption>
            <thead>
                <tr part=cem-header class=header>
                    <th part=cemh-name-label class=name>Method</th>
                    <th part=cemh-description-label class=description>Description</th>
                    <th part=cemh-type-label class=description>Type</th>
                    <th part=cemh-inherited-from-label class=inherited-from>Inherited From</th>
                    <th part=cemh-parameters-label class=parameters>Parameters</th>
                </tr>
            </thead>
            <tbody>
                <tr part=cem-item class=item be-repeated='{
                    "list": ".methods",
                    "transform":{
                        ".name": ".name ?? - ",
                        ".description": ".description ?? - ",
                        ".type-text": ".type.text ?? - ",
                        "code": ".default ?? - ",
                        ".inherited-from": ["", ".inheritedFrom.name", " ", ".inheritedFrom.module"]                        
                    }
                }'>
                    <td part=cemi-name-value class=name></td>
                    <td part=cemi-description-value class=description></td>
                    <td part=cemi-type-text-value class=type-text></td>
                    <td part=cemi-inherited-from-value class=inherited-from></td>
                    <td part=cemi-parameters-value class=parameters>
                        <table part=cemipv-details class=details>
                            <!-- <caption part=cemipvd-title class=title>Parameters</caption> -->
                            <thead>
                                <tr part=cemipvd-header class=header>
                                    <th part=cemipvdh-param-name-label class=param-name-label>Parameter</th>
                                    <th part=cemipvdh-param-type-label class=param-typetype-label>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class=param-item be-repeated='{
                                    "nestedLoopProp": "parameters",
                                    "transform": {
                                        ".param-name": ".name ?? -",
                                        ".param-type": ".type.text ?? -"
                                    }
                                }'>
                                    <td class=param-name></td>
                                    <td class=param-type></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </template>

</template>
<be-hive></be-hive>
`;
const beDefinitiveProps: DefineArgs = {
    config:{
        tagName: 'wc-info',
        propDefaults: {
            href: '',
            cssHref: 'https://unpkg.com/wc-info/simple-ce-style.css'
        }
    }
}
mainTemplate.setAttribute('be-definitive', JSON.stringify(beDefinitiveProps));
document.body.appendChild(mainTemplate);


