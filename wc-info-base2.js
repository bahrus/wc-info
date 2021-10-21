import { html } from 'trans-render/lib/html.js';
import('be-definitive/be-definitive.js');
import('be-reformable/be-reformable.js');
import('be-observant/be-observant.js');
import('./be-reformable-as-wc-info.js');
import('be-hive/be-hive.js');
if (document.querySelector('be-hive') === null) {
    document.body.appendChild(document.createElement('be-hive'));
}
const mainTemplate = html `
<h1 part=title>Custom Elements API</h1>
<h2 part=package>Package: <label></label></h2>
<form be-reformable-as-wc-info='{
    "autoSubmit": true,
    "url": {
        "onSet": "href",
        "vft": "href"
    }
}'></form>
<be-hive></be-hive>
`;
const beDefinitiveProps = {
    config: {
        tagName: 'wc-info-base',
        propDefaults: {
            href: ''
        }
    }
};
mainTemplate.setAttribute('be-definitive', JSON.stringify(beDefinitiveProps));
document.body.appendChild(mainTemplate);
