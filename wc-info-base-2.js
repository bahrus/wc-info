import { html } from 'xtal-element/lib/html.js';
import { xc } from 'xtal-element/lib/XtalCore.js';
import { xp } from 'xtal-element/lib/XtalPattern.js';
import { define } from 'xtal-element/lib/define.js';
import { DOMKeyPE } from 'xtal-element/lib/DOMKeyPE.js';
const mainTemplate = html `
iah
`;
export class WCInfo extends HTMLElement {
    static is = 'wc-info';
    self = this;
    propActions = propActions;
    clonedTemplate;
    domCache;
    reactor = new xp.RxSuppl(this, [{
            rhsType: Array,
            ctor: DOMKeyPE
        }]);
    mainTemplate = mainTemplate;
    connectedCallback() {
        xc.mergeProps(this, slicedPropDefs);
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
}
const propActions = [
    xp.manageMainTemplate,
    xp.createShadow
];
const propDefMap = {
    ...xp.props,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(WCInfo, slicedPropDefs, 'onPropChange');
define(WCInfo);
