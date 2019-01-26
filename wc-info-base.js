import { define } from "xtal-latx/define.js";
import { XtalElement } from "xtal-element/xtal-element.js";
import { createTemplate } from "xtal-element/utils.js";
import { init } from "trans-render/init.js";
import { repeatInit } from "trans-render/repeatInit.js";
const package_name = "package-name";
const attribTemplate = createTemplate(/* html */ `
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
export const mainTemplate$ = /* html */ `
<header>
    <mark></mark>
    <nav>
        <a target="_blank">⚙️</a>
    </nav>
</header>
<main></main>
`;
const mainTemplate = createTemplate(mainTemplate$);
export const subTemplates = {
    attribTransform: 'attribTransform',
    WCInfo: 'WCInfo'
};
export class WCInfoBase extends XtalElement {
    constructor() {
        super(...arguments);
        this._renderContext = {
            init: init,
            refs: {
                [subTemplates.attribTransform]: (attrbs) => ({
                    dt: ({ idx }) => attrbs[Math.floor(idx / 2)].label,
                    dd: ({ idx }) => attrbs[Math.floor(idx / 2)].description
                }),
                [subTemplates.WCInfo]: (tags, idx) => ({
                    header: {
                        ".WCLabel": x => tags[idx].label,
                        ".WCDesc": ({ target }) => {
                            target.innerHTML = tags[idx].description;
                        }
                    },
                    details: {
                        dl: ({ target, ctx }) => {
                            const attrbs = tags[idx].attributes;
                            if (!attrbs)
                                return;
                            repeatInit(attrbs.length, attribTemplate, target);
                            return ctx.refs[subTemplates.attribTransform](attrbs);
                        }
                    }
                })
            },
            Transform: {
                header: {
                    mark: x => this.packageName,
                    nav: {
                        a: ({ target }) => {
                            target.href = this._href;
                        }
                    }
                },
                main: ({ target }) => {
                    const tags = this.viewModel.tags;
                    repeatInit(tags.length, WCInfoTemplate, target);
                    return ({
                        section: ({ idx, ctx }) => ctx.refs[subTemplates.WCInfo](tags, idx),
                    });
                }
            }
        };
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
    // get renderOptions() : RenderOptions{
    //     return {}
    // }
    get eventSwitchContext() {
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
        super.onPropsChange();
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