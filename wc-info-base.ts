import { define } from "xtal-latx/define.js";
import { XtalElement } from "xtal-element/xtal-element.js";
import { createTemplate } from "xtal-element/utils.js";
import {
  RenderContext,
  RenderOptions,
  TransformRules
} from "trans-render/init.d.js";
import { init } from "trans-render/init.js";
import { repeatInit } from "trans-render/repeatInit.js";

export interface Info {
  label: string;
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

const attribListTemplateTransform = (attribs: AttribList[]) =>
({
  dt: ({ idx }) => attribs[Math.floor(idx / 2)].label,
  dd: ({ idx }) => attribs[Math.floor(idx / 2)].description
} as TransformRules);

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

const WCInfoTemplateTransform = (tags: WCInfo[], idx: number) =>
  ({
    header: {
      ".WCLabel": x => tags[idx].label,
      ".WCDesc": ({ target }) => {
        target.innerHTML = tags[idx].description;
      }
    },
    details: {
      dl: ({ target, ctx }) => {
        const attrbs = tags[idx].attributes;
        if (!attrbs) return;
        repeatInit(attrbs.length, attribListTemplate, target);
        return attribListTemplateTransform(attrbs);
      }
    }
  } as TransformRules);

export const mainTemplate$ =   /* html */ `
<header>
    <mark></mark>
    <nav>
        <a target="_blank">⚙️</a>
    </nav>
</header>
<main></main>
`
const mainTemplate = createTemplate(mainTemplate$);


export class WCInfoBase extends XtalElement<WCSuiteInfo> {
  _renderContext: RenderContext = {
    init: init,
    Transform: {
      header: {
        mark: x => this.packageName,
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
          section: ({ idx, ctx }) => WCInfoTemplateTransform(tags, idx)
        };
      }
    }
  };

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
    super.onPropsChange();
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
