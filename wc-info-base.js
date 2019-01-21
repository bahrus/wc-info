import { define } from "xtal-latx/define.js";
import { XtalElement } from "xtal-element/xtal-element.js";
import { init, _rules } from "trans-render/init.js";
import { repeatInit } from "trans-render/repeatInit.js";
const package_name = "package-name";
function createTemplate(innerHTML) {
    const template = document.createElement("template");
    template.innerHTML = innerHTML;
    return template;
}
const attribTemplate = createTemplate(/* html */ `
    <dt>a</dt><dd>b</dd>
`);
const WCInfoTemplate = createTemplate(/* html */ `
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
const mainTemplate = createTemplate(/* html */ `
    <header>
        <mark></mark>
        <nav>
            <a target="_blank">⚙️</a>
        </nav>
    </header>
    <main></main>
`);
export class WCInfoBase extends XtalElement {
    constructor() {
        super(...arguments);
        this._href = null;
        this._packageName = null;
        this._c = false;
    }
    static get is() {
        return "wc-info-base";
    }
    get noShadow() {
        return true;
    }
    get renderOptions() {
        return {
            prepend: false,
            matchNext: true,
        };
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
                        mark: x => this.packageName,
                        nav: x => ({
                            matchFirstChild: {
                                a: ({ target }) => {
                                    target.href = this._href;
                                }
                            }
                        }),
                    }
                }),
                main: ({ target }) => {
                    const tags = this._value.tags;
                    repeatInit(tags.length, WCInfoTemplate, target);
                    return {
                        [_rules]: true,
                        section: ({ idx }) => ({
                            matchFirstChild: {
                                header: {
                                    ".WCLabel": x => tags[idx].label,
                                    ".WCDesc": ({ target }) => {
                                        target.innerHTML = tags[idx].description;
                                    },
                                },
                                details: {
                                    dl: ({ target }) => {
                                        const attrbs = this._value.tags[idx].attributes;
                                        if (!attrbs)
                                            return;
                                        repeatInit(attrbs.length, attribTemplate, target);
                                        return {
                                            [_rules]: true,
                                            dt: ({ idx }) => attrbs[Math.floor(idx / 2)].label,
                                            dd: ({ idx }) => attrbs[Math.floor(idx / 2)].description,
                                        };
                                    },
                                },
                            }
                        }),
                    };
                }
            }
        };
    }
    get ready() {
        return this._href !== undefined && this._packageName !== undefined;
    }
    init() {
        return new Promise(resolve => {
            fetch(this._href).then(resp => {
                resp.json().then(info => {
                    resolve(info);
                });
            });
        });
    }
    update() {
        return this.init();
    }
    get mainTemplate() {
        return mainTemplate;
    }
    static get observedAttributes() {
        return super.observedAttributes.concat(["href", package_name]);
    }
    attributeChangedCallback(n, ov, nv) {
        super.attributeChangedCallback(n, ov, nv);
        switch (n) {
            case "href":
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
        this.attr("href", nv);
    }
    get packageName() {
        return this._packageName;
    }
    set packageName(nv) {
        this.attr(package_name, nv);
    }
    connectedCallback() {
        this._upgradeProperties(["href", "packageName"]);
        super.connectedCallback();
    }
}
define(WCInfoBase);
//# sourceMappingURL=wc-info-base.js.map