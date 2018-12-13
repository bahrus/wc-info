import { XtallatX } from 'xtal-latx/xtal-latx.js';
import { define } from 'xtal-latx/define.js';
const package_name = 'package-name';
export class WCInfoBase extends XtallatX(HTMLElement) {
    constructor() {
        super(...arguments);
        this._href = null;
        this._packageName = null;
        this._c = false;
    }
    static get is() { return 'wc-info-base'; }
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
        this._upgradeProperties(['href']);
        this._c = true;
        this.onPropsChange();
    }
    genAttr(attrib) {
        return /* html */ `<dt>${attrib.label}</dt><dd>${attrib.description}</dd>`;
    }
    genAttrs(attribs) {
        return /* html */ `<dl>${attribs.map(attrib => this.genAttr(attrib)).join('')}`;
    }
    genWCInfo(wc) {
        return /* html */ `
        <section class="WCInfo card">
            <header>
                <div class="WCLabel">${wc.label}</div>
                <div class="WCDesc">${wc.description}</div>
            </header>
            <details>
                <summary>Attributes</summary>
                ${this.genAttrs(wc.attributes)}
            </details> 
        </section>`;
    }
    genWCInfos(wcs) {
        return wcs.map(wc => this.genWCInfo(wc)).join('');
    }
    genWCSuite(wcSuite) {
        return /* html*/ `
            <header>
                <mark>${this._packageName}</mark>
                <nav>
                    <a href="${this._href}" target="_blank">⚙️</a>
                </nav>
            </header>
            ${this.genWCInfos(wcSuite.tags)}
            
        `;
    }
    onPropsChange() {
        if (this._disabled || !this._c || this._href === null)
            return;
        fetch(this._href).then(resp => {
            resp.json().then(info => {
                this.render(info);
            });
        });
    }
    render(wcInfo) {
        this.innerHTML = this.genWCSuite(wcInfo);
    }
}
define(WCInfoBase);
//# sourceMappingURL=wc-info-base.js.map