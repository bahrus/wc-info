import {html} from 'trans-render/lib/html.js';
import {DefineArgs} from 'trans-render/lib/types';
import ('be-definitive/be-definitive.js');
import ('be-reformable/be-reformable.js');
import ('be-observant/be-observant.js');
import ('./be-reformable-as-wc-info.js');
import ('be-hive/be-hive.js');
import ('be-repeated/be-repeated.js');

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
I am here
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


