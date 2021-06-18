import {html} from 'xtal-element/lib/html.js';
import {xc, ReactiveSurface, IReactor, PropAction, PropDef, PropDefMap} from 'xtal-element/lib/XtalCore.js';
import {xp} from 'xtal-element/lib/XtalPattern.js';
import {define} from 'xtal-element/lib/define.js';
import { DOMKeyPE } from 'xtal-element/lib/DOMKeyPE.js';
const mainTemplate = html`
iah
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
}
const propActions = [
    xp.manageMainTemplate,
    xp.createShadow
] as PropAction[];
const propDefMap: PropDefMap<WCInfo> = {
    ...xp.props,
}
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(WCInfo, slicedPropDefs, 'onPropChange');
define(WCInfo);