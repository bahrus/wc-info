import {html} from 'trans-render/lib/html.js';
import {DefineArgs} from 'trans-render/lib/types';
import  'be-definitive/be-definitive.js';
import 'be-reformable/be-reformable.js';
import 'be-observant/be-observant.js';

const mainTemplate = html`
<h1 part=title>Custom Elements API</h1>
<h2 part=package>Package: <label></label></h2>
<form be-reformable='{
    "autoSubmit": true,
    "url": {
        "onSet": "href",
        "vft": "href"
    }
}'></form>
<be-reformable></be-reformable>
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

