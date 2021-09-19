import { WCInfoBase } from './wc-info-base.js';
import { def } from 'trans-render/lib/def.js';
import { html } from 'trans-render/lib/html.js';
const styleTemplate = html `
<link rel=stylesheet href=https://unpkg.com/wc-info/simple-ce-style.css>
`;
export class WCInfo extends WCInfoBase {
    static is = 'wc-info';
    noshadow = false;
    doTemplMount(self) {
        self.shadowRoot.appendChild(styleTemplate.content.cloneNode(true));
    }
}
def(WCInfo);
