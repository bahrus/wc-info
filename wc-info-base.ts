import { define } from "trans-render/define.js";
import { XtalViewElement } from "xtal-element/xtal-view-element.js";
import { createTemplate, newRenderContext } from "xtal-element/utils.js";
import { TransformRules, RenderOptions } from "trans-render/init.d.js";
import { repeat } from "trans-render/repeat.js";
import  "hypo-link/hypo-link.js";
import {WCSuiteInfo} from "types.d.js";
const package_name = "package-name";

const definitionItemTemplate = createTemplate(/* html */ `
    <dt></dt><dd></dd>
`);

const propertyItemTemplate = createTemplate(/* html */ `
  <dt>🏠 <label data-bind=name></label></dt>
  <dd>
    <hypo-link data-bind=description></hypo-link>
  </dd>
`);

const attributeItemTemplate = createTemplate(/* html */ `
  <dt>💠 <label data-bind=name></label></dt>
  <dd>
    <hypo-link data-bind=description></hypo-link>
    <details>
      <summary>Allowed Values</summary>
      <dl></dl>
    </details>
  </dd>
`);

const eventItemTemplate = createTemplate(/* html */ `
<dt>⚡ <label data-bind=name></label></dt>
<dd>
  <hypo-link data-bind=description></hypo-link>
  <details>
    <summary>Details</summary>
    <details>
      <summary>Event Detail Properties</summary>
      <dl></dl>
    </details>
    <aside>Associated Property Name: <label data-bind=associatedPropName></label></aside>
  </details>
  

</dd>
`);

const WCInfoTemplate = createTemplate(/* html */ `
<section class="WCInfo card">
    <header>
        <div class="WCName"><span>⚛️</span><label data-bind="name"></label></div>
        <div class="WCDesc"><hypo-link></hypo-link></div>
    </header>
    <section data-type="attributes">
      <details>
          <summary>⚙️attributes</summary>
          <dl></dl>
      </details>
    </section>
    <section data-type="properties">
      <details>
        <summary>🏘️properties</summary>
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

export class WCInfoBase extends XtalViewElement<WCSuiteInfo> {
  _initContext = newRenderContext({
    header: {
      h3: x => this.packageName,
      nav: {
        a: ({ target }) => {
          (target as HTMLAnchorElement).href = this._href!;
        }
      }
    } as TransformRules,
    main: ({ target, ctx }) => {
      const tags = this.viewModel.tags;
      return repeat(WCInfoTemplate, ctx, tags.length, target, {
        section: ({ idx}) =>
          ({
            header: {
              ".WCName":{
                "label[data-bind='name']": tags[idx].name,
              },
              ".WCDesc": {
                "hypo-link": tags[idx].description
              }
            },
            "section[data-type='attributes']": x => {
              const attribs = tags[idx].attributes;
              if (attribs === undefined) return false;
              return {
                details: {
                  dl: ({ target, ctx}) => repeat(attributeItemTemplate, ctx, attribs.length, target, {
                      dt: ({ idx }) => ({
                        'label[data-bind="name"]': attribs[Math.floor(idx / 2)].name
                      }),
                      dd: ({ idx }) => ({
                        'hypo-link[data-bind="description"]': attribs[Math.floor(idx / 2)].description,
                        details: x => {
                          const vals = attribs[Math.floor(idx / 2)].values;
                          if(vals === undefined) return false;
                          return{
                            dl: ({target, ctx}) => repeat(definitionItemTemplate, ctx, vals.length, target, {
                                dt: ({idx}) => vals[Math.floor(idx / 2)].name,
                                dd: ({idx}) => vals[Math.floor(idx / 2)].description
                            })
                          }
                        }
                      }) 
                    } as TransformRules)
                }
              }
            },
            "section[data-type='events']": x =>{
              const customEvents = tags[idx].customEvents;
              if(customEvents === undefined) return false;
              return {
                details:{
                  dl:({target, ctx}) => repeat(eventItemTemplate, ctx, customEvents.length, target, {
                      dt: ({ idx }) => ({
                        'label[data-bind="name"]': customEvents[Math.floor(idx / 2)].name
                      }),
                      dd: ({ idx}) => ({
                        'hypo-link[data-bind="description"]': customEvents[Math.floor(idx / 2)].description,
                        details:{
                          aside: customEvents[Math.floor(idx / 2)].associatedPropName ? {
                            'label[data-bind="associatedPropName"]': customEvents[Math.floor(idx / 2)].associatedPropName
                          } : false,
                          details:{
                            dl:({target, ctx}) =>{
                              const detail = customEvents[Math.floor(idx / 2)].detail;
                              if(detail === undefined) return false;
                              return repeat(definitionItemTemplate, ctx, detail.length, target, {
                                dt: ({ idx }) => detail[Math.floor(idx / 2)].name,
                                dd: ({ idx }) => detail[Math.floor(idx / 2)].description
                              });
                            }
                          }
                        }
                      })
                    } as TransformRules)
                }
              }
            },
            "section[data-type='properties']": x =>{
              const props = tags[idx].properties;
              if (props === undefined) return false;
              return {
                details: {
                  dl: ({ target, ctx}) => repeat(propertyItemTemplate, ctx, props.length, target, {
                      dt: ({ idx }) => ({
                        'label[data-bind="name"]': props[Math.floor(idx / 2)].name
                      }),
                      dd: ({ idx }) => props[Math.floor(idx / 2)].description
                  } as TransformRules)
                }              
              }
            }

          } as TransformRules)
      }) as TransformRules;
    }
  });

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
    return new Promise<WCSuiteInfo>(resolve => {
      fetch(this._href!).then(resp => {
        resp.json().then(info => {
          resolve(info as WCSuiteInfo);
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

  attributeChangedCallback(n: string, ov: string, nv: string) {
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

  _href: string | null = null;
  get href() {
    return this._href;
  }
  set href(nv) {
    this.attr("href", nv!);
  }

  _packageName: string | null = null;
  get packageName() {
    return this._packageName;
  }
  set packageName(nv) {
    this.attr(package_name, nv!);
  }
  _c = false;
  connectedCallback() {
    this.propUp(["href", "packageName"]);
    super.connectedCallback();
  }
}

define(WCInfoBase);
