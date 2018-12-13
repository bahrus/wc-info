
    //@ts-check
    (function () {
    function define(custEl) {
    let tagName = custEl.is;
    if (customElements.get(tagName)) {
        console.warn('Already registered ' + tagName);
        return;
    }
    customElements.define(tagName, custEl);
}
const disabled = 'disabled';
/**
 * Base class for many xtal- components
 * @param superClass
 */
function XtallatX(superClass) {
    return class extends superClass {
        constructor() {
            super(...arguments);
            this._evCount = {};
        }
        static get observedAttributes() {
            return [disabled];
        }
        /**
         * Any component that emits events should not do so if it is disabled.
         * Note that this is not enforced, but the disabled property is made available.
         * Users of this mix-in should ensure not to call "de" if this property is set to true.
         */
        get disabled() {
            return this._disabled;
        }
        set disabled(val) {
            this.attr(disabled, val, '');
        }
        /**
         * Set attribute value.
         * @param name
         * @param val
         * @param trueVal String to set attribute if true.
         */
        attr(name, val, trueVal) {
            const v = val ? 'set' : 'remove'; //verb
            this[v + 'Attribute'](name, trueVal || val);
        }
        /**
         * Turn number into string with even and odd values easy to query via css.
         * @param n
         */
        to$(n) {
            const mod = n % 2;
            return (n - mod) / 2 + '-' + mod;
        }
        /**
         * Increment event count
         * @param name
         */
        incAttr(name) {
            const ec = this._evCount;
            if (name in ec) {
                ec[name]++;
            }
            else {
                ec[name] = 0;
            }
            this.attr('data-' + name, this.to$(ec[name]));
        }
        attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
                case disabled:
                    this._disabled = newVal !== null;
                    break;
            }
        }
        /**
         * Dispatch Custom Event
         * @param name Name of event to dispatch ("-changed" will be appended if asIs is false)
         * @param detail Information to be passed with the event
         * @param asIs If true, don't append event name with '-changed'
         */
        de(name, detail, asIs = false) {
            const eventName = name + (asIs ? '' : '-changed');
            const newEvent = new CustomEvent(eventName, {
                detail: detail,
                bubbles: true,
                composed: false,
            });
            this.dispatchEvent(newEvent);
            this.incAttr(eventName);
            return newEvent;
        }
        /**
         * Needed for asynchronous loading
         * @param props Array of property names to "upgrade", without losing value set while element was Unknown
         */
        _upgradeProperties(props) {
            props.forEach(prop => {
                if (this.hasOwnProperty(prop)) {
                    let value = this[prop];
                    delete this[prop];
                    this[prop] = value;
                }
            });
        }
    };
}
const package_name = 'package-name';
class WCInfoBase extends XtallatX(HTMLElement) {
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
    })();  
        