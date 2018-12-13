import { XtallatX } from 'xtal-latx/xtal-latx.js';
import { define } from 'xtal-latx/define.js';
export class WCInfoBase extends XtallatX(HTMLElement) {
    constructor() {
        super(...arguments);
        this._href = null;
        this._c = false;
    }
    static get is() { return 'wc-info-base'; }
    static get observedAttributes() {
        return super.observedAttributes.concat(['href']);
    }
    attributeChangedCallback(n, ov, nv) {
        super.attributeChangedCallback(n, ov, nv);
        switch (n) {
            case 'href':
                this._href = nv;
        }
        this.onPropsChange();
    }
    get href() {
        return this._href;
    }
    set href(nv) {
        this.attr('href', nv);
    }
    connectedCallback() {
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
        <div class="WCInfo card">
            <header>
                <div class="WCLabel">${wc.label}</div>
                <div class="WCDesc">${wc.description}</div>
            </header>
            <details>
                <summary>Attributes</summary>
                ${this.genAttrs(wc.attributes)}
            </details> 
        </div>`;
    }
    genWCInfos(wcs) {
        return wcs.map(wc => this.genWCInfo(wc)).join('');
    }
    genWCSuite(wcSuite) {
        return /* html*/ `
            <div class="WCSuite">
                ${this.genWCInfos(wcSuite.tags)}
            </div>
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