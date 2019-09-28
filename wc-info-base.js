import { define } from "trans-render/define.js";
import { XtalViewElement } from "xtal-element/xtal-view-element.js";
import { createTemplate, newRenderContext } from "xtal-element/utils.js";
import { repeat } from "trans-render/repeat.js";
const package_name = "package-name";
const href = 'href';
const definitionItemTemplate = createTemplate(/* html */ `
    <dt></dt><dd></dd>
`);
const propertyItemTemplate = createTemplate(/* html */ `
  <dt>🏠 <dfn data-bind=name></dfn></dt>
  <dd>
    <hypo-link data-bind=description></hypo-link>
  </dd>
`);
const attributeItemTemplate = createTemplate(/* html */ `
  <dt>💠 <dfn data-bind=name></dfn></dt>
  <dd>
    <hypo-link data-bind=description></hypo-link>
    <details>
      <summary><slot name=allowedValuesLabel>Allowed Values</slot></summary>
      <dl></dl>
    </details>
  </dd>
`);
const eventItemTemplate = createTemplate(/* html */ `
<dt>⚡ <dfn data-bind=name></dfn></dt>
<dd>
  <hypo-link data-bind=description></hypo-link>
  <details>
    <summary><slot name=detailLabel>🔬detail</slot></summary>
    <dl></dl>
  </details>
  

</dd>
`);
const WCInfoTemplate = createTemplate(/* html */ `
<section class="WCInfo card">
    <style>
      [part="attributesLabel"]::after{
        content: "⚙️attributes"
      }
    </style>
    <header>
        <div class="WCName"><span>⚛️</span><dfn data-bind="name"></dfn></div>
        <hypo-link class=WCDesc></hypo-link>
    </header>
    <section data-type="attributes">
      <details>
          <summary part="attributesLabel"></summary>
          <dl></dl>
      </details>
    </section>
    <section data-type="properties">
      <details>
        <summary><slot name="propertiesLabel">🏘️properties</slot></summary>
        <dl></dl>
      </details>
    </section>
    <section data-type="events">
      <details>
          <summary>🌩️events</summary>
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
/**
 * Non-themed.  Display Web Component Information based on <a href='https://code.visualstudio.com/updates/v1_30#_html-custom-tags-attributes-support' target='_blank'>web-components.json file</a>.
 * @element wc-info-base
 *
 */
export class WCInfoBase extends XtalViewElement {
    constructor() {
        super(...arguments);
        this._href = null;
        this._packageName = null;
    }
    get initRenderContext() {
        const tags = this.viewModel.tags;
        return newRenderContext({
            header: {
                h3: this.packageName,
                nav: {
                    a: ({ target }) => {
                        target.href = this._href;
                    }
                }
            },
            main: ({ target, ctx }) => repeat(WCInfoTemplate, ctx, tags.length, target, {
                section: ({ idx }) => ({
                    header: {
                        ".WCName": {
                            dfn: tags[idx].name,
                        },
                        'hypo-link': tags[idx].description
                    },
                    "section[data-type='attributes']": x => {
                        const attribs = tags[idx].attributes;
                        if (attribs === undefined || attribs.length === 0)
                            return false;
                        return {
                            details: {
                                dl: ({ target, ctx }) => repeat(attributeItemTemplate, ctx, attribs.length, target, {
                                    dt: ({ idx }) => ({
                                        dfn: attribs[Math.floor(idx / 2)].name
                                    }),
                                    dd: ({ idx }) => ({
                                        'hypo-link': attribs[Math.floor(idx / 2)].description,
                                        details: x => {
                                            const vals = attribs[Math.floor(idx / 2)].values;
                                            if (vals === undefined)
                                                return false;
                                            return {
                                                dl: ({ target, ctx }) => repeat(definitionItemTemplate, ctx, vals.length, target, {
                                                    dt: ({ idx }) => vals[Math.floor(idx / 2)].name,
                                                    dd: ({ idx }) => vals[Math.floor(idx / 2)].description
                                                })
                                            };
                                        }
                                    })
                                })
                            }
                        };
                    },
                    "section[data-type='events']": x => {
                        const customEvents = tags[idx].events;
                        if (customEvents === undefined || customEvents.length === 0)
                            return false;
                        return {
                            details: {
                                dl: ({ target, ctx }) => repeat(eventItemTemplate, ctx, customEvents.length, target, {
                                    dt: ({ idx }) => ({
                                        dfn: customEvents[Math.floor(idx / 2)].name
                                    }),
                                    dd: ({ idx }) => ({
                                        'hypo-link': customEvents[Math.floor(idx / 2)].description,
                                        details: ({ target }) => {
                                            const detail = customEvents[Math.floor(idx / 2)].detail;
                                            if (detail === undefined)
                                                return false;
                                            return {
                                                dl: ({ target, ctx }) => {
                                                    return repeat(definitionItemTemplate, ctx, detail.length, target, {
                                                        dt: ({ idx }) => detail[Math.floor(idx / 2)].name,
                                                        dd: ({ idx }) => detail[Math.floor(idx / 2)].description
                                                    });
                                                }
                                            };
                                        }
                                    })
                                })
                            }
                        };
                    },
                    "section[data-type='properties']": x => {
                        const props = tags[idx].properties;
                        if (props === undefined || props.length === 0)
                            return false;
                        return {
                            details: {
                                dl: ({ target, ctx }) => repeat(propertyItemTemplate, ctx, props.length, target, {
                                    dt: ({ idx }) => ({
                                        dfn: props[Math.floor(idx / 2)].name
                                    }),
                                    dd: ({ idx }) => props[Math.floor(idx / 2)].description
                                })
                            }
                        };
                    }
                })
            }),
        });
    }
    afterInitRenderCallback() {
        import('hypo-link/hypo-link.js');
    }
    static get is() {
        return "wc-info-base";
    }
    get noShadow() {
        return true;
    }
    get readyToInit() {
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
        return super.observedAttributes.concat([href, package_name]);
    }
    attributeChangedCallback(n, ov, nv) {
        switch (n) {
            case href:
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
    /**
     * Url where Web Component Information is contained.
     * @attr
     */
    set href(nv) {
        this.attr(href, nv);
    }
    get packageName() {
        return this._packageName;
    }
    /**
     * Name of Package.
     * @attr package-name
     */
    set packageName(nv) {
        this.attr(package_name, nv);
    }
    //_c = false;
    connectedCallback() {
        this.propUp([href, "packageName"]);
        super.connectedCallback();
    }
}
define(WCInfoBase);
