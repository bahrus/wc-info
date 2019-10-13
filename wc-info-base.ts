import { define } from "trans-render/define.js";
import { XtalViewElement } from "xtal-element/xtal-view-element.js";
import { createTemplate, newRenderContext } from "xtal-element/utils.js";
import { TransformRules, RenderOptions, RenderContext, TransformFn } from "trans-render/init.d.js";
import { repeat } from "trans-render/repeat.js";
//import  {HypoLink} from "hypo-link/hypo-link.js";
import {WCSuiteInfo} from "types.d.js";
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
      <summary part=allowedValuesLabel></summary>
      <dl></dl>
    </details>
  </dd>
`);

const eventItemTemplate = createTemplate(/* html */ `
<dt>⚡ <dfn data-bind=name></dfn></dt>
<dd>
  <hypo-link data-bind=description></hypo-link>
  <details>
    <summary part="detailLabel"></summary>
    <dl></dl>
  </details>
  

</dd>
`);

const slotItemTemplate = createTemplate(/* html */`
<dt>🎰 <dfn data-bind=name></dfn></dt>
<dd>
  <hypo-link data-bind=description></hypo-link>
  <details>
    <summary part="slotLabel"></summary>
    <dl></dl>
  </details>
</dd>
`);

const WCInfoTemplate = createTemplate(/* html */ `
<section class="WCInfo card">

    <header>
        <div class="WCName"><span>⚛️</span><dfn data-bind="name"></dfn></div>
        <hypo-link class=WCDesc></hypo-link>
    </header>
    <section data-type=attributes>
      <details>
          <summary part=attributesLabel></summary>
          <dl></dl>
      </details>
    </section>
    <section data-type=properties>
      <details>
        <summary part=propertiesLabel></summary>
        <dl></dl>
      </details>
    </section>
    <section data-type=events>
      <details>
          <summary part=eventsLabel></summary>
          <dl></dl>
      </details>
    </section>
    <section data-type=slots>
      <details>
        <summary part=slotsLabel></summary>
        <dl></dl>
      </details>
    </section>
</section>`);

//https://medium.com/datadriveninvestor/internationalize-your-css-media-queries-64c749eb00c
const mainTemplate = createTemplate(/* html */ `
<style role=i11n>      
  [part=attributesLabel]::after{
    content: "⚙️attributes"
  }
  [part=propertiesLabel]::after{
    content: "🏘️properties"
  }
  [part=eventsLabel]::after{
    content: "🌩️events"
  }
  [part=detailLabel]::after{
    content: "🔬detail"
  }
  [part=allowedValuesLabel]::after{
    content: "Allowed Values"
  }
  [part=slotsLabel]::after{
    content: "🎰 slots"
  }
  .logo{
    height:32px;
  }
</style>
<header>
  <h3></h3>
  <nav>
    <a target="_blank"><img class="logo" alt="JSON" src="https://json-schema.org/assets/logo.svg"></a>
  </nav>
</header>
<main></main>
`);

/**
 * Non-themed.  Display Web Component Information based on <a href='https://code.visualstudio.com/updates/v1_30#_html-custom-tags-attributes-support' target='_blank'>web-components.json file</a>.
 * @element wc-info-base
 * @slot test - this is just a slot for testing purposes.
 * 
 */
export class WCInfoBase extends XtalViewElement<WCSuiteInfo> {
  
  get initRenderContext() {
      const tags = this.viewModel.tags;
      return newRenderContext({
        header: {
          h3: this.packageName,
          nav: {
            a:  (({target}) => {
              target.href = this._href!;
            }) as  TransformFn<HTMLAnchorElement> as TransformFn
          }
        } as TransformRules,
        main: ({ target, ctx }) => repeat(WCInfoTemplate, ctx, tags.length, target, {
            section: ({ idx}) =>
              ({
                header: {
                  ".WCName":{
                    dfn: tags[idx].name,
                  },
                  'hypo-link': tags[idx].description
                },
                "section[data-type='attributes']": x => {
                  const attribs = tags[idx].attributes;
                  if (attribs === undefined || attribs.length === 0) return false;
                  return {
                    details: {
                      dl: ({ target, ctx}) => repeat(attributeItemTemplate, ctx, attribs.length, target, {
                          dt: ({ idx }) => ({
                            dfn: attribs[Math.floor(idx / 2)].name
                          }),
                          dd: ({ idx }) => ({
                            'hypo-link': attribs[Math.floor(idx / 2)].description,
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
                  const events = tags[idx].events;
                  if(events === undefined || events.length === 0) return false;
                  return {
                    details:{
                      dl:({target, ctx}) => repeat(eventItemTemplate, ctx, events.length, target, {
                          dt: ({ idx }) => ({
                            dfn: events[Math.floor(idx / 2)].name
                          }),
                          dd: ({ idx}) => ({
                            'hypo-link': events[Math.floor(idx / 2)].description,
                            details: ({target}) =>{
                              const detail = events[Math.floor(idx / 2)].detail;
                              if(detail === undefined) return false;
                              return({
                                dl:({target, ctx}) =>{

                                  return repeat(definitionItemTemplate, ctx, detail.length, target, {
                                    dt: ({ idx }) => detail[Math.floor(idx / 2)].name,
                                    dd: ({ idx }) => detail[Math.floor(idx / 2)].description
                                  });
                                }                                
                              } as TransformRules)

                            }
                              
                          })
                        } as TransformRules)
                    }
                  }
                },
                "section[data-type='properties']": x =>{
                  const props = tags[idx].properties;
                  if (props === undefined || props.length === 0) return false;
                  return {
                    details: {
                      dl: ({ target, ctx}) => repeat(propertyItemTemplate, ctx, props.length, target, {
                          dt: ({ idx }) => ({
                            dfn: props[Math.floor(idx / 2)].name
                          }),
                          dd: ({ idx }) => props[Math.floor(idx / 2)].description
                      } as TransformRules)
                    }              
                  }
                },
                "section[data-type='slots']": x =>{
                  const slots = tags[idx].slots;
                  if(slots === undefined || slots.length === 0) return false;
                  return {
                    details:{
                      dl: ({ target, ctx}) => repeat(slotItemTemplate, ctx, slots.length, target, {
                        dt: ({ idx }) => ({
                          dfn: slots[Math.floor(idx / 2)].name
                        }),
                        dd: ({ idx }) => slots[Math.floor(idx / 2)].description
                      })
                    }
                  }
                }
    
              } as TransformRules)
          }) as TransformRules,
      });
  }

  afterInitRenderCallback(){
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
    return super.observedAttributes.concat([href, package_name]);
  }

  attributeChangedCallback(n: string, ov: string, nv: string) {
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

  _href: string | null = null;
  get href() {
    return this._href;
  }
  /**
   * Url where Web Component Information is contained.
   * @attr
   */
  set href(nv) {
    this.attr(href, nv!);
  }

  _packageName: string | null = null;
  get packageName() {
    return this._packageName;
  }
  /**
   * Name of Package.
   * @attr package-name
   */
  set packageName(nv) {
    this.attr(package_name, nv!);
  }
  //_c = false;
  connectedCallback() {
    this.propUp([href, "packageName"]);
    super.connectedCallback();
  }
}

define(WCInfoBase);
