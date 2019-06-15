import { define } from "trans-render/define.js";
import { XtalViewElement } from "xtal-element/xtal-view-element.js";
import { createTemplate, newRenderContext } from "xtal-element/utils.js";
import { repeat } from "trans-render/repeat.js";
const package_name = "package-name";
const attribListTemplate = createTemplate(/* html */ `
    <dt></dt><dd></dd>
`);
const WCInfoTemplate = createTemplate(/* html */ `
<section class="WCInfo card">
    <header>
        <div class="WCName"></div>
        <div class="WCDesc"><hypo-link></hypo-link></div>
    </header>
    <section data-type="attributes">
      <details>
          <summary>attributes</summary>
          <dl></dl>
      </details>
    </section>
    <section data-type="events">
      <details>
          <summary>events</summary>
          <dl></dl>
      </details>
    </section>
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
const x = {};
export class WCInfoBase extends XtalViewElement {
    constructor() {
        super(...arguments);
        this._initContext = newRenderContext({
            header: {
                h3: this.packageName,
                nav: {
                    a: ({ target }) => {
                        target.href = this._href;
                    }
                    // a: ({target}) => Object.assign<HTMLAnchorElement, HTMLAnchorElement>  (target as HTMLAnchorElement, {
                    //   href: this._href
                    // } as HTMLAnchorElement);
                }
            },
            main: ({ target, ctx }) => {
                const tags = this.viewModel.tags;
                repeat(WCInfoTemplate, ctx, tags.length, target);
                return {
                    section: ({ idx }) => ({
                        header: {
                            ".WCName": tags[idx].name,
                            ".WCDesc": {
                                'hypo-link': tags[idx].description
                            }
                        },
                        "section[data-type='attributes']": {
                            details: {
                                dl: ({ target, ctx }) => {
                                    const attribs = tags[idx].attributes;
                                    if (!attribs)
                                        return;
                                    repeat(attribListTemplate, ctx, attribs.length, target);
                                    return {
                                        dt: ({ idx }) => attribs[Math.floor(idx / 2)].name,
                                        dd: ({ idx }) => attribs[Math.floor(idx / 2)].description
                                    };
                                }
                            }
                        },
                        "section[data-type='events']": {
                            details: {
                                dl: ({ target, ctx }) => {
                                }
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
    get initContext() {
        return this._initContext;
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
        import('hypo-link/hypo-link.js');
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
        this.propUp(["href", "packageName"]);
        super.connectedCallback();
    }
}
define(WCInfoBase);
