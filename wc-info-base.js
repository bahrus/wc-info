import { define } from 'xtal-latx/define.js';
import { XtalElement } from 'xtal-element/xtal-element.js';
import { init } from 'trans-render/init.js';
const package_name = 'package-name';
function createTemplate(innerHTML) {
    const template = document.createElement('template');
    template.innerHTML = innerHTML;
    return template;
}
const attribTemplate = createTemplate(
/* html */ `
    <dt></dt><dd></dd>
`);
const WCInfoTemplate = createTemplate(
/* html */ `
<section class="WCInfo card">
    <header>
        <div class="WCLabel"></div>
        <div class="WCDesc"></div>
    </header>
    <details>
        <summary>attributes</summary>
        <dl></dl>
    </details> 
</section>`);
const mainTemplate = createTemplate(
/* html */ `
    <header>
        <mark></mark>
        <nav>
            <a target="_blank">⚙️</a>
        </nav>
    </header>
`);
export class WCInfoBase extends XtalElement {
    constructor() {
        super(...arguments);
        this._href = null;
        this._packageName = null;
        this._c = false;
        // genAttr(attrib: IAttribInfo){
        //     return /* html */`<dt>${attrib.label}</dt><dd>${attrib.description}</dd>`;
        // }
        // genAttrs(attribs: IAttribInfo[]){
        //     return /* html */`<dl>${attribs.map(attrib => this.genAttr(attrib)).join('')}`;
        // }
        // genWCInfo(wc: IWCInfo){
        //     return /* html */`
        //     <section class="WCInfo card">
        //         <header>
        //             <div class="WCLabel">${wc.label}</div>
        //             <div class="WCDesc">${wc.description}</div>
        //         </header>
        //         <details>
        //             <summary>attributes</summary>
        //             ${this.genAttrs(wc.attributes)}
        //         </details> 
        //     </section>`;
        // }
        // genWCInfos(wcs: IWCInfo[]){
        //     return wcs.map(wc => this.genWCInfo(wc)).join('');
        // }
        // genWCSuite(wcSuite: IWCSuiteInfo){
        //     return /* html*/`
        //         <header>
        //             <mark>${this._packageName}</mark>
        //             <nav>
        //                 <a href="${this._href}" target="_blank">⚙️</a>
        //             </nav>
        //         </header>
        //         ${this.genWCInfos(wcSuite.tags)}
        //     `;
        // }
        // onPropsChange(){
        //     if(this._disabled || !this._c || this._href === null) return;
        //     fetch(this._href).then(resp =>{
        //         resp.json().then(info =>{
        //             this.render(info as IWCSuiteInfo)
        //         })
        //     })
        // }
        // render(wcInfo: IWCSuiteInfo){
        //     this.innerHTML = this.genWCSuite(wcInfo);
        // }
    }
    static get is() { return 'wc-info-base'; }
    get noShadow() {
        return true;
    }
    get eventSwitchContext() {
        return {};
    }
    get renderContext() {
        return {
            init: init,
            transform: {
                header: x => ({
                    matchFirstChild: {
                        mark: ({ target }) => this.packageName
                    },
                })
            }
        };
    }
    get ready() {
        return this._href !== undefined && this._packageName !== undefined;
    }
    init(el) {
        return new Promise(resolve => {
            fetch(this._href).then(resp => {
                resp.json().then(info => {
                    resolve(info);
                });
            });
        });
    }
    update(el) {
        return this.init(el);
    }
    get mainTemplate() {
        return mainTemplate;
    }
    static get observedAttributes() {
        return super.observedAttributes.concat(['href', package_name]);
    }
    attributeChangedCallback(n, ov, nv) {
        super.attributeChangedCallback(n, ov, nv);
        switch (n) {
            case 'href':
                this._href = nv;
                break;
            case package_name:
                this._packageName = nv;
                break;
        }
        this.onPropsChange();
    }
    get href() {
        return this._href;
    }
    set href(nv) {
        this.attr('href', nv);
    }
    get packageName() {
        return this._packageName;
    }
    set packageName(nv) {
        this.attr(package_name, nv);
    }
    connectedCallback() {
        this._upgradeProperties(['href', 'packageName']);
        super.connectedCallback();
    }
}
define(WCInfoBase);
//# sourceMappingURL=wc-info-base.js.map