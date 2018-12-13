import {WCInfoBase, IWCSuiteInfo} from './wc-info-base.js';
import {define} from 'xtal-latx/define.js';

const template = document.createElement('template');
template.innerHTML = /* html */`
<div id="main"></div>
<style>
:host{
    display: block
}
.card {
        padding: 16px;
        mix-blend-mode: difference;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.3s cubic-bezier(.25, .8, .25, 1);

        /* Add shadows to create the "card" effect */
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        /* transition: 0.3s; */
    }
.WCLabel{
    font-weight: 800;
}
dt{
    font-weight: 700;
}
.WCInfo.card{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
`;
export class WCInfo extends WCInfoBase{
    static get is(){return 'wc-info';}
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.appendChild(template.content.cloneNode(true));
    }
    render(wcInfo: IWCSuiteInfo){
        this.shadowRoot!.querySelector('#main')!.innerHTML = this.genWCSuite(wcInfo);
    }
}
define(WCInfo);