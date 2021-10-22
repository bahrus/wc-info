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
<template be-repeated='{
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
}'>
    <custom-element-declaration></custom-element-declaration>
</template>
<template be-definitive='{
    "config":{
        "tagName": "custom-element-declaration",
        "propDefaults":{
            "name":"", "tn":"", "description":"", "attr":[], "events":[], "props":[], "slots":[],
            "cssProperties": [], "cssParts": [], "methods":[],
            "updateTransform":{
                "h2[-id]": "tn",
                "a[-href]": ["#", "tn"],
                "a": "tn",
                "dfn": "description",
                ".attr[-iff]":"attr",
                ".events[-iff]": "events",
                ".props[-iff]": "props",
                ".slots[-iff]": "slots",
                ".css-props[-iff]": "cssProperties",
                ".css-parts[-iff]": "cssParts",
                ".methods[-iff]": "methods"                
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
    <template be-switched='{
        "if": true,
        "ifNonEmptyArray": {"onSet": "attr", "vft": "attr"},
        "ifMediaMatches": "(min-width: 600px)"
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
                    "list": {"onSet": "attr", "vft": "attr"},
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
    <template be-switched='{
        "if": true,
        "ifNonEmptyArray": {"onSet": "attr", "vft": "attr"},
        "ifMediaMatches": "(max-width: 599px)"
    }'>
        <table part=ce-attributes class="narrow attributes">
            <caption part=cea-title class=title>Attributes</caption>
            <tbody>
                <tr part=cea-item class=item be-repeated='{
                    "list": {"onSet": "attr", "vft": "attr"},
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
    <template be-switched='{
        "if": true,
        "ifNonEmptyArray": {"onSet": "events", "vft": "events"},
        "ifMediaMatches": "(min-width: 600px)"
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
                    "list": {"onSet": "events", "vft": "events"},
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

    <be-hive></be-hive>
</template>
<be-hive></be-hive>
`;
const beDefinitiveProps: DefineArgs = {
    config:{
        tagName: 'wc-info-base',
        propDefaults: {
            href: ''
        }
    }
}
mainTemplate.setAttribute('be-definitive', JSON.stringify(beDefinitiveProps));
document.body.appendChild(mainTemplate);


