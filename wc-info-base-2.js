import { html } from 'xtal-element/lib/html.js';
import { xc } from 'xtal-element/lib/XtalCore.js';
import { xp } from 'xtal-element/lib/XtalPattern.js';
import { define } from 'xtal-element/lib/define.js';
import { DOMKeyPE } from 'xtal-element/lib/DOMKeyPE.js';
import('proxy-prop/proxy-prop.js');
import('xtal-fetch/xtal-fetch-get.js');
import('pass-up/p-u.js');
const mainTemplate = html `
<proxy-prop from-host observe-prop=href to=[-href] ></proxy-prop>
<xtal-fetch-get fetch -href></xtal-fetch-get>
<p-u on=result-changed to-host prop=package val=target.result init-val=result></p-u>
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
    href;
    package;
}
const propActions = [
    xp.manageMainTemplate,
    xp.createShadow
];
const baseProp = {
    async: true,
    dry: true,
};
const strProp1 = {
    ...baseProp,
    type: String
};
const propDefMap = {
    ...xp.props,
    href: strProp1,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(WCInfo, slicedPropDefs, 'onPropChange');
define(WCInfo);
