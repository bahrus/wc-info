import {html} from 'trans-render/lib/html.js';
import {DefineArgs} from 'trans-render/lib/types';
import  'be-definitive/be-definitive.js';

const mainTemplate = html`
<h1 part=title>Custom Elements API</h1>
`;
const beDefinitiveProps: DefineArgs = {
    config:{
        tagName: 'wc-info-base'
    }
}
mainTemplate.setAttribute('be-definitive', JSON.stringify(beDefinitiveProps));
document.body.appendChild(mainTemplate);

