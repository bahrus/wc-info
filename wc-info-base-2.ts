import {html} from 'xtal-element/lib/html.js';
import {xc, ReactiveSurface, IReactor, PropAction, PropDef, PropDefMap} from 'xtal-element/lib/XtalCore.js';
import {xp} from 'xtal-element/lib/XtalPattern.js';
import {define} from 'xtal-element/lib/define.js';
import { DOMKeyPE } from 'xtal-element/lib/DOMKeyPE.js';
import {Package} from 'node_modules/custom-elements-manifest/schema.d.js';
import {XtalFetchBasePropertiesIfc} from 'node_modules/xtal-fetch/types.d.js';
import {IProxyPropProps} from 'node_modules/proxy-prop/types.d.js';
import('proxy-prop/proxy-prop.js');
import('xtal-fetch/xtal-fetch-get.js');
import('pass-up/p-u.js');
const mainTemplate = html`
<proxy-prop from-host observe-prop=href to=[-href] ></proxy-prop>
<xtal-fetch-get fetch -href></xtal-fetch-get>
<p-u on=result-changed to-host prop=package val=target.result init-val=result></p-u>
`;
export class WCInfo extends HTMLElement implements ReactiveSurface{
    static is = 'wc-info';
    self = this;
    propActions = propActions;
    clonedTemplate: DocumentFragment | undefined; domCache: any;
    reactor: IReactor = new xp.RxSuppl(this, [{
        rhsType: Array,
        ctor: DOMKeyPE
    }]);
    mainTemplate = mainTemplate;
    connectedCallback(){
        xc.mergeProps(this, slicedPropDefs);
    }
    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
    href: string | undefined;
    package: Package | undefined;
}
const propActions = [
    xp.manageMainTemplate,
    xp.createShadow
] as PropAction[];
const baseProp: PropDef = {
    async: true,
    dry: true,
};
const strProp1: PropDef = {
    ...baseProp,
    type: String
};
const propDefMap: PropDefMap<WCInfo> = {
    ...xp.props,
    href: strProp1,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(WCInfo, slicedPropDefs, 'onPropChange');
define(WCInfo);