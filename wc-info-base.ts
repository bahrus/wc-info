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

//const attribute

const eventItemTemplate = createTemplate(/* html */ `
<dt>Name of ⚡: <label></label></dt>
<dd>
  <label></label>
  <h6>Associated Property Name:<label></label></h6>
  <details>
    <summary>Event Detail Properties</summary>
    <dl></dl>
  </details>
</dd>
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
    <section data-type="properties">
      <details>
        <summary>properties</summary>
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
const x = {
  
}
export class WCInfoBase extends XtalViewElement<WCSuiteInfo> {
  _initContext = newRenderContext({
    header: {
      h3: this.packageName,
      nav: {
        a: ({ target }) => {
          (target as HTMLAnchorElement).href = this._href!;
        }
        // a: ({target}) => Object.assign<HTMLAnchorElement, HTMLAnchorElement>  (target as HTMLAnchorElement, {
        //   href: this._href
        // } as HTMLAnchorElement);
      }
    } as TransformRules,
    main: ({ target, ctx }) => {
      const tags = this.viewModel.tags;
      repeat(WCInfoTemplate, ctx, tags.length, target);
      return {
        section: ({ idx}) =>
          ({
            header: {
              ".WCName": tags[idx].name,
              ".WCDesc": {
                "hypo-link": tags[idx].description
              }
            },
            "section[data-type='attributes']":{
              details: {
                dl: ({ target, ctx}) => {
                  const attribs = tags[idx].attributes;
                  if (attribs === undefined) return;
                  repeat(definitionItemTemplate, ctx, attribs.length, target);
                  return {
                    dt: ({ idx }) => attribs[Math.floor(idx / 2)].name,
                    dd: ({ idx }) => attribs[Math.floor(idx / 2)].description
                  } as TransformRules;
                }
              }
            },
            "section[data-type='events']":{
              details:{
                dl:({target, ctx}) =>{
                  const customEvents = tags[idx].customEvents;
                  if(customEvents === undefined) return;
                  repeat(eventItemTemplate, ctx, customEvents.length, target);
                  return {
                    dt: ({ idx }) => ({
                      label: customEvents[Math.floor(idx / 2)].name
                    }),
                    dd: ({ idx }) => ({
                      label: customEvents[Math.floor(idx / 2)].description,
                      h6: {
                        label: customEvents[Math.floor(idx / 2)].associatedPropName
                      },
                      details:{
                        dl:({target, ctx}) =>{
                          const detail = customEvents[Math.floor(idx / 2)].detail;
                          if(detail === undefined) return;
                          repeat(definitionItemTemplate, ctx, detail.length, target);
                          return {
                            dt: ({ idx }) => detail[Math.floor(idx / 2)].name,
                            dd: ({ idx }) => detail[Math.floor(idx / 2)].description
                          }
                        }
                      }

                    })
                  } as TransformRules;
                }
              }
            },
            "section[data-type='properties']":{
              details: {
                dl: ({ target, ctx}) => {
                  const props = tags[idx].properties;
                  if (props === undefined) return;
                  repeat(definitionItemTemplate, ctx, props.length, target);
                  return {
                    dt: ({ idx }) => props[Math.floor(idx / 2)].name,
                    dd: ({ idx }) => props[Math.floor(idx / 2)].description
                  } as TransformRules;
                }
              }              
            }

          } as TransformRules)
      };
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
