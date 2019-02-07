import { define } from "xtal-latx/define.js";
import { XtalViewElement } from "xtal-element/xtal-view-element.js";
import { createTemplate, newRenderContext } from "xtal-element/utils.js";
import { TransformRules, RenderOptions } from "trans-render/init.d.js";
import { repeatInit } from "trans-render/repeatInit.js";

export interface Info {
  name: string;
  description: string;
}

export interface AttribList extends Info {}

export interface WCInfo extends Info {
  attributes: AttribList[];
}
export interface WCSuiteInfo {
  tags: WCInfo[];
}
const package_name = "package-name";

const attribListTemplate = createTemplate(/* html */ `
    <dt></dt><dd></dd>
`);

const WCInfoTemplate = createTemplate(/* html */ `
<section class="WCInfo card">
    <header>
        <div class="WCName"></div>
        <div class="WCDesc"></div>
    </header>
    <details>
        <summary>attributes</summary>
        <dl></dl>
    </details> 
</section>`);

const mainTemplate = createTemplate(/* html */ `
<header>
  <nav>
    <h3></h3>
    <a target="_blank">📜</a>
  </nav>
</header>
<main></main>
`);

export class WCInfoBase extends XtalViewElement<WCSuiteInfo> {
  _renderContext = newRenderContext({
    header: {
      h3: x => this.packageName,
      nav: {
        a: ({ target }) => {
          (target as HTMLAnchorElement).href = this._href!;
        }
      }
    } as TransformRules,
    main: ({ target }) => {
      const tags = this.viewModel.tags;
      repeatInit(tags.length, WCInfoTemplate, target);
      return {
        section: ({ idx, ctx }) =>
          ({
            header: {
              ".WCName": x => tags[idx].name,
              ".WCDesc": ({ target }) => {
                target.innerHTML = tags[idx].description;
              }
            },
            details: {
              dl: ({ target, ctx }) => {
                const attribs = tags[idx].attributes;
                if (!attribs) return;
                repeatInit(attribs.length, attribListTemplate, target);
                return {
                  dt: ({ idx }) => attribs[Math.floor(idx / 2)].name,
                  dd: ({ idx }) => attribs[Math.floor(idx / 2)].description
                } as TransformRules;
              }
            }
          } as TransformRules)
      };
    }
  });

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
    this._upgradeProperties(["href", "packageName"]);
    super.connectedCallback();
  }
}

define(WCInfoBase);
