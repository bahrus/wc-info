
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
function init(template, ctx, target, options) {
    const clonedTemplate = template.localName === "template"
        ? template.content.cloneNode(true)
        : template;
    ctx.template = clonedTemplate;
    if (ctx.Transform) {
        const firstChild = clonedTemplate.firstElementChild;
        if (firstChild !== null) {
            ctx.leaf = firstChild;
            process(ctx, 0, 0, options);
        }
    }
    let verb = "appendChild";
    if (options) {
        if (options.prepend)
            verb = "prepend";
        const callback = options.initializedCallback;
        if (callback !== undefined)
            callback(ctx, target, options);
    }
    target[verb](ctx.template);
    return ctx;
}
function isTR(obj) {
    const keys = Object.keys(obj);
    if (keys.length === 0)
        return true;
    const firstCharOfFirstProp = keys[0][0];
    return "SNTM".indexOf(firstCharOfFirstProp) === -1;
}
function process(context, idx, level, options) {
    const target = context.leaf;
    if (target.matches === undefined)
        return;
    const transform = context.Transform;
    let nextTransform = {};
    let nextSelector = "";
    let firstSelector = true;
    let matchNextSib = true;
    let inherit = false;
    let nextMatch = [];
    for (const selector in transform) {
        if (target.matches(selector)) {
            const transformTemplateVal = transform[selector];
            switch (typeof transformTemplateVal) {
                case "object":
                    nextSelector = "*";
                    Object.assign(nextTransform, transformTemplateVal);
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
                                if (isTR(resp)) {
                                    const respAsTransformRules = resp;
                                    nextSelector = "*";
                                    Object.assign(nextTransform, respAsTransformRules);
                                }
                                else {
                                    const respAsNextStep = resp;
                                    inherit = inherit || !!resp.MergeTransforms;
                                    if (respAsNextStep.Select !== undefined) {
                                        nextSelector =
                                            (firstSelector ? "" : ",") + respAsNextStep.Select;
                                        firstSelector = false;
                                    }
                                    const newTransform = respAsNextStep.Transform;
                                    if (newTransform === undefined) {
                                        Object.assign(nextTransform, context.Transform);
                                    }
                                    else {
                                        Object.assign(nextTransform, newTransform);
                                    }
                                    if (respAsNextStep.SkipSibs)
                                        matchNextSib = false;
                                    if (!matchNextSib && resp.NextMatch) {
                                        nextMatch.push(resp.NextMatch);
                                    }
                                }
                                break;
                        }
                    }
                    break;
            }
        }
    }
    if (matchNextSib) {
        let transform = context.Transform;
        const nextSib = target.nextElementSibling;
        if (nextSib !== null) {
            context.leaf = nextSib;
            process(context, idx + 1, level, options);
        }
        context.Transform = transform;
        if (nextMatch.length > 0) {
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
    }
    if (nextSelector.length > 0) {
        let transform = context.Transform;
        const nextChild = target.querySelector(nextSelector);
        if (inherit) {
            Object.assign(nextTransform, context.Transform);
        }
        if (nextChild !== null) {
            context.leaf = nextChild;
            context.Transform = nextTransform;
            process(context, 0, level + 1, options);
            context.Transform = transform;
        }
    }
}

function update(ctx, target, options) {
    const updateCtx = ctx;
    updateCtx.update = update;
    const firstChild = target.firstElementChild;
    if (firstChild !== null) {
        ctx.leaf = firstChild;
        process(ctx, 0, 0, options);
        if (options) {
            const updatedCallback = options.updatedCallback;
            if (updatedCallback !== undefined)
                updatedCallback(ctx, target, options);
        }
    }
    return updateCtx;
}

const countKey = '__trCount';
const idxKey = '__trIdx';
//export const initKey = '__trInit';
function repeatInit(count, template, target) {
    target[countKey] = count;
    for (let i = 0; i < count; i++) {
        const clonedTemplate = template.content.cloneNode(true);
        Array.from(clonedTemplate.children).forEach(c => {
            //c.setAttribute(initKey, '');
            c[idxKey] = i;
            //(c as HTMLElement).dataset.idxKey = i + '';
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
            Array.from(clonedTemplate.children).forEach(c => {
                c[idxKey] = childCount + i;
                //(c as HTMLElement).dataset.idxKey = childCount + i + '';
            });
            target.appendChild(clonedTemplate);
        }
    }
    else {
        for (let i = target.children.length - 1; i > -1; i--) {
            const child = target.children[i];
            if (child[idxKey] >= count) {
                child.remove();
            }
        }
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
            return false;
        return true;
    }
}

class XtalViewElement extends XtalElement {
    get viewModel() {
        return this._viewModel;
    }
    set viewModel(nv) {
        this._viewModel = nv;
        this.de('view-model', {
            value: nv
        });
    }
    onPropsChange() {
        if (!super.onPropsChange())
            return false;
        //TODO: add abort support
        const rc = this.renderContext;
        const esc = this.eventSwitchContext;
        if (this._initialized) {
            this.update().then(model => {
                this.viewModel = model;
                if (rc && rc.update) {
                    rc.update(rc, this.root);
                }
            });
        }
        else {
            this.init().then(model => {
                this.viewModel = model;
                if (this.mainTemplate !== undefined) {
                    if (esc && esc.eventManager !== undefined) {
                        esc.eventManager(this.root, esc);
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
        return true;
    }
}

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
    <mark></mark>
    <nav>
        <a target="_blank">🚾</a>
    </nav>
</header>
<main></main>
`);
class WCInfoBase extends XtalViewElement {
    constructor() {
        super(...arguments);
        this._renderContext = {
            init: init,
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
                    return {
                        section: ({ idx, ctx }) => ({
                            header: {
                                ".WCLabel": x => tags[idx].label,
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
                                        dt: ({ idx }) => attribs[Math.floor(idx / 2)].label,
                                        dd: ({ idx }) => attribs[Math.floor(idx / 2)].description
                                    };
                                }
                            }
                        })
                    };
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
    })();  
        