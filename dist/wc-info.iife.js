
    //@ts-check
    (function () {
    function define(custEl) {
    let tagName = custEl.is;
    if (customElements.get(tagName)) {
        console.warn('Already registered ' + tagName);
        return;
    }
    customElements.define(tagName, custEl);
}
const disabled = 'disabled';
/**
 * Base class for many xtal- components
 * @param superClass
 */
function XtallatX(superClass) {
    return class extends superClass {
        constructor() {
            super(...arguments);
            this._evCount = {};
        }
        static get observedAttributes() {
            return [disabled];
        }
        /**
         * Any component that emits events should not do so if it is disabled.
         * Note that this is not enforced, but the disabled property is made available.
         * Users of this mix-in should ensure not to call "de" if this property is set to true.
         */
        get disabled() {
            return this._disabled;
        }
        set disabled(val) {
            this.attr(disabled, val, '');
        }
        /**
         * Set attribute value.
         * @param name
         * @param val
         * @param trueVal String to set attribute if true.
         */
        attr(name, val, trueVal) {
            const v = val ? 'set' : 'remove'; //verb
            this[v + 'Attribute'](name, trueVal || val);
        }
        /**
         * Turn number into string with even and odd values easy to query via css.
         * @param n
         */
        to$(n) {
            const mod = n % 2;
            return (n - mod) / 2 + '-' + mod;
        }
        /**
         * Increment event count
         * @param name
         */
        incAttr(name) {
            const ec = this._evCount;
            if (name in ec) {
                ec[name]++;
            }
            else {
                ec[name] = 0;
            }
            this.attr('data-' + name, this.to$(ec[name]));
        }
        attributeChangedCallback(name, oldVal, newVal) {
            switch (name) {
                case disabled:
                    this._disabled = newVal !== null;
                    break;
            }
        }
        /**
         * Dispatch Custom Event
         * @param name Name of event to dispatch ("-changed" will be appended if asIs is false)
         * @param detail Information to be passed with the event
         * @param asIs If true, don't append event name with '-changed'
         */
        de(name, detail, asIs = false) {
            const eventName = name + (asIs ? '' : '-changed');
            const newEvent = new CustomEvent(eventName, {
                detail: detail,
                bubbles: true,
                composed: false,
            });
            this.dispatchEvent(newEvent);
            this.incAttr(eventName);
            return newEvent;
        }
        /**
         * Needed for asynchronous loading
         * @param props Array of property names to "upgrade", without losing value set while element was Unknown
         */
        _upgradeProperties(props) {
            props.forEach(prop => {
                if (this.hasOwnProperty(prop)) {
                    let value = this[prop];
                    delete this[prop];
                    this[prop] = value;
                }
            });
        }
    };
}
const _rules = "_rules";
function init(template, ctx, target, options) {
    //ctx.init = init;
    const clonedTemplate = template.content.cloneNode(true);
    ctx.template = clonedTemplate;
    if (ctx.transform) {
        const firstChild = clonedTemplate.firstElementChild;
        if (firstChild !== null) {
            ctx.leaf = firstChild;
            process(ctx, 0, 0, options);
        }
    }
    const verb = options && options.prepend ? "prepend" : "appendChild";
    target[verb](ctx.template);
    return ctx;
}
function inheritTemplate(context, transform, inherit) {
    if (inherit) {
        return Object.assign(Object.assign({}, context.transform), transform);
    }
    return transform;
}
function process(context, idx, level, options) {
    const target = context.leaf;
    if (target.matches === undefined)
        return;
    const transform = context.transform;
    let drill = null;
    let matchFirstChild = false;
    let matchNextSib = false;
    let inherit = false;
    let nextMatch = [];
    //context.inheritMatches = false;
    for (const selector in transform) {
        if (selector === _rules)
            continue;
        if (target.matches(selector)) {
            const transformTemplateVal = transform[selector];
            switch (typeof transformTemplateVal) {
                case "object":
                    if (typeof matchFirstChild === "object") {
                        Object.assign(matchFirstChild, transformTemplateVal);
                    }
                    else {
                        matchFirstChild = transformTemplateVal;
                    }
                    break;
                case "function":
                    const transformTemplate = transformTemplateVal;
                    const resp = transformTemplate({
                        target: target,
                        ctx: context,
                        idx: idx,
                        level: level
                    });
                    if (resp !== undefined) {
                        switch (typeof resp) {
                            case "string":
                                target.textContent = resp;
                                break;
                            case "object":
                                if (resp[_rules]) {
                                    const respAsTransformRules = resp;
                                    if (typeof matchFirstChild === "object") {
                                        Object.assign(matchFirstChild, respAsTransformRules);
                                    }
                                    else {
                                        matchFirstChild = respAsTransformRules;
                                    }
                                }
                                else {
                                    const respAsNextSteps = resp;
                                    inherit = inherit || !!resp.inheritMatches;
                                    if (respAsNextSteps.select !== undefined) {
                                        drill =
                                            drill === null
                                                ? respAsNextSteps.select
                                                : Object.assign(drill, resp.select);
                                    }
                                    if (resp.matchFirstChild !== undefined) {
                                        switch (typeof resp.matchFirstChild) {
                                            case "boolean":
                                                if (typeof matchFirstChild === "boolean" &&
                                                    resp.matchFirstChild) {
                                                    matchFirstChild = true;
                                                }
                                                break;
                                            case "object":
                                                if (typeof matchFirstChild === "object") {
                                                    Object.assign(matchFirstChild, resp.matchFirstChild);
                                                }
                                                else {
                                                    matchFirstChild = resp.matchFirstChild;
                                                }
                                                break;
                                        }
                                    }
                                    if (resp.matchNextSib)
                                        matchNextSib = true;
                                    if (!matchNextSib && resp.nextMatch) {
                                        nextMatch.push(resp.nextMatch);
                                    }
                                }
                                break;
                        }
                    }
                    break;
            }
        }
    }
    if (matchNextSib || (options && options.matchNext)) {
        let transform = context.transform;
        if (typeof matchNextSib === "object") {
            context.transform = inheritTemplate(context, matchNextSib, inherit);
        }
        const nextSib = target.nextElementSibling;
        if (nextSib !== null) {
            context.leaf = nextSib;
            process(context, idx + 1, level, options);
        }
        context.transform = transform;
    }
    else if (nextMatch.length > 0) {
        const match = nextMatch.join(",");
        let nextSib = target.nextElementSibling;
        while (nextSib !== null) {
            if (nextSib.matches(match)) {
                context.leaf = nextSib;
                process(context, idx + 1, level, options);
                break;
            }
            nextSib = nextSib.nextElementSibling;
        }
    }
    if (matchFirstChild || drill !== null) {
        let transform = context.transform;
        let nextChild;
        if (drill !== null) {
            const keys = Object.keys(drill);
            nextChild = target.querySelector(keys[0]);
            context.transform = inheritTemplate(context, drill, inherit);
        }
        else {
            nextChild = target.firstElementChild;
            if (typeof matchFirstChild === "object") {
                context.transform = inheritTemplate(context, matchFirstChild, inherit);
            }
        }
        if (nextChild !== null) {
            context.leaf = nextChild;
            process(context, 0, level + 1, options);
        }
        context.transform = transform;
    }
}
function update(ctx, target) {
    const updateCtx = ctx;
    updateCtx.update = update;
    const firstChild = target.firstElementChild;
    if (firstChild !== null) {
        ctx.leaf = firstChild;
        process(ctx, 0, 0);
    }
    return updateCtx;
}
const countKey = '__transRenderCount';
const initKey = '__trInit';
function repeatInit(count, template, target) {
    target[countKey] = count;
    for (let i = 0; i < count; i++) {
        const clonedTemplate = template.content.cloneNode(true);
        Array.from(clonedTemplate.children).forEach(c => {
            c.setAttribute(initKey, '');
        });
        //TODO:  assign index to children
        target.appendChild(clonedTemplate);
    }
}
//type HTMLFn = (el: HTMLElement) => void
function repeatUpdate(count, template, target) {
    const childCount = target[countKey];
    const diff = count - childCount;
    if (diff === 0)
        return;
    if (diff > 0) {
        for (let i = 0; i < diff; i++) {
            const clonedTemplate = template.content.cloneNode(true);
            //TODO:  mark children as needing initialization
            target.appendChild(clonedTemplate);
        }
    }
    else {
    }
    target[countKey] = count;
}
function interpolate(target, prop, obj, isAttr = false) {
    const privateStorageKey = '__' + prop + '__split';
    let split = target[privateStorageKey];
    if (split === undefined) {
        const txt = isAttr ? target.getAttribute(prop) : target[prop];
        split = txt.split('|');
        target[privateStorageKey] = split;
    }
    const newVal = (split.map(s => s[0] === '.' ? obj[s.substr(1)] : s)).join('');
    if (isAttr) {
        target.setAttribute(prop, newVal);
    }
    else {
        target[prop] = newVal;
    }
}
class XtalElement extends XtallatX(HTMLElement) {
    get noShadow() {
        return false;
    }
    get renderOptions() {
        return {};
    }
    attributeChangedCallback(n, ov, nv) {
        super.attributeChangedCallback(n, ov, nv);
        this.onPropsChange();
    }
    get value() {
        return this._value;
    }
    set value(nv) {
        this._value = nv;
        this.de('value', {
            value: nv
        });
    }
    connectedCallback() {
        this._upgradeProperties([disabled]);
        this._connected = true;
        this.onPropsChange();
    }
    get root() {
        if (this.noShadow)
            return this;
        if (this.shadowRoot == null) {
            this.attachShadow({ mode: 'open' });
        }
        return this.shadowRoot;
    }
    onPropsChange() {
        if (this._disabled || !this._connected || !this.ready)
            return;
        const rc = this.renderContext;
        const esc = this.eventSwitchContext;
        if (this._initialized) {
            this.update().then(model => {
                this.value = model;
                if (rc && rc.update) {
                    rc.update(rc, this.root);
                }
            });
        }
        else {
            this.init().then(model => {
                this.value = model;
                if (this.mainTemplate !== undefined) {
                    if (esc && esc.addEventListeners !== undefined) {
                        esc.addEventListeners(this.root, esc);
                    }
                    if (rc && rc.init !== undefined) {
                        rc.init(this.mainTemplate, rc, this.root, this.renderOptions);
                    }
                    else {
                        this.root.appendChild(this.mainTemplate.content.cloneNode(true));
                    }
                    this._initialized = true;
                }
            });
        }
    }
}
const package_name = "package-name";
function createTemplate(innerHTML) {
    const template = document.createElement("template");
    template.innerHTML = innerHTML;
    return template;
}
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
const mainTemplate$ = /* html */ `
<header>
    <mark></mark>
    <nav>
        <a target="_blank">⚙️</a>
    </nav>
</header>
<main></main>
`;
const mainTemplate = createTemplate(mainTemplate$);
class WCInfoBase extends XtalElement {
    constructor() {
        super(...arguments);
        this._href = null;
        this._packageName = null;
        this._c = false;
    }
    get renderContext() {
        return {
            init: init,
            transform: {
                header: {
                    mark: x => this.packageName,
                    nav: {
                        a: ({ target }) => {
                            target.href = this._href;
                        }
                    },
                },
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
    static get is() {
        return "wc-info-base";
    }
    get noShadow() {
        return true;
    }
    get renderOptions() {
        return {
            matchNext: true,
        };
    }
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
    update() { return this.init(); }
    onPropsChange() {
        this._initialized = false;
        this.root.innerHTML = '';
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
const template = document.createElement("template");
const mainTemplateExt$ = mainTemplate$ +
    /* html */ `
<style>
:host{
    display: block;
}
main {
    border-color: grey;
    border-width: 1px;
    border-style: solid;
    padding: 8px;
}
details {
    width: 100%;
}
header {
    display: flex;
    justify-content: flex-start;
    width:100%;
}
@media only screen and (max-width: 800px) {
    header{
    flex-direction: column;
    }
}
@media only screen and (min-width: 801px) {
    header{
    flex-direction: row;
    }
}        
summary {
    margin-top: 20px;
}
mark {
    flex: 0 1 auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
nav {
    margin-left: auto;
}
a {
    text-decoration: none;
}
.card {
    padding: 16px;
    mix-blend-mode: difference;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    /* transition: 0.3s; */
}
.WCLabel {
    font-weight: 800;
    padding-right: 20px;
    flex-basis:25%;
}
.WCDescription{
    flex-basis:75%;
}
dd {
    margin-inline-start: 20%;
}
dt {
    font-weight: 700;
}
.WCInfo.card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>
`;
const mainTemplateExt = createTemplate(mainTemplateExt$);
class WCInfo extends WCInfoBase {
    static get is() {
        return "wc-info";
    }
    get noShadow() {
        return false;
    }
    get mainTemplate() {
        return mainTemplateExt;
    }
}
define(WCInfo);
    })();  
        