import { define } from "xtal-latx/define.js";
import { XtalViewElement } from "xtal-element/xtal-view-element.js";
import { createTemplate, newRenderContext } from "xtal-element/utils.js";
import { repeatInit } from "trans-render/repeatInit.js";
const package_name = "package-name";
const attribListTemplate = createTemplate(/* html */ `
    <dt></dt><dd></dd>
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
    <h3></h3>
    <nav>
        <a target="_blank">📜</a>
    </nav>
</header>
<main></main>
`);
export class WCInfoBase extends XtalViewElement {
    constructor() {
        super(...arguments);
        this._renderContext = newRenderContext({
            header: {
                h3: x => this.packageName,
                nav: {
                    a: ({ target }) => {
                        const link = target;
                        link.href = this._href;
                    }
                }
            },
            main: ({ target }) => {
                const tags = this.viewModel.tags;
                repeatInit(tags.length, WCInfoTemplate, target);
                return {
                    section: ({ idx, ctx }) => ({
                        header: {
                            ".WCLabel": x => tags[idx].name,
                            ".WCDesc": ({ target }) => {
                                target.innerHTML = tags[idx].description;
                            }
                        },
                        details: {
                            dl: ({ target, ctx }) => {
                                const attribs = tags[idx].attributes;
                                if (!attribs)
                                    return;
                                repeatInit(attribs.length, attribListTemplate, target);
                                return {
                                    dt: ({ idx }) => attribs[Math.floor(idx / 2)].name,
                                    dd: ({ idx }) => attribs[Math.floor(idx / 2)].description
                                };
                            }
                        }
                    })
                };
            }
        });
        this._href = null;
        this._packageName = null;
        this._c = false;
    }
    get renderContext() {
        return this._renderContext;
    }
    static get is() {
        return "wc-info-base";
    }
    get noShadow() {
        return true;
    }
    get eventContext() {
        return {};
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
    onPropsChange() {
        this._initialized = false;
        this.root.innerHTML = "";
        return super.onPropsChange();
    }
    get mainTemplate() {
        return mainTemplate;
    }
    static get observedAttributes() {
        return super.observedAttributes.concat(["href", package_name]);
    }
    attributeChangedCallback(n, ov, nv) {
        switch (n) {
            case "href":
                this._href = nv;
                break;
            case package_name:
                this._packageName = nv;
                break;
        }
        super.attributeChangedCallback(n, ov, nv);
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