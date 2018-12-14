import {XtallatX} from 'xtal-latx/xtal-latx.js';
import {define} from 'xtal-latx/define.js';

export interface IInfo{
    label: string,
    description: string,
}

export interface IAttribInfo extends IInfo{
}

export interface IWCInfo extends IInfo{
    attributes: IAttribInfo[];
}
export interface IWCSuiteInfo{
    tags: IWCInfo[];
}
const package_name = 'package-name';

export class WCInfoBase extends XtallatX(HTMLElement){
    static get is(){return 'wc-info-base';}

    static get observedAttributes(){
        return super.observedAttributes.concat(['href', package_name]);
    }

    attributeChangedCallback(n: string, ov: string, nv: string){
        super.attributeChangedCallback(n, ov, nv);
        switch(n){
            case 'href':
                this._href = nv;
                break;
            case package_name:
                this._packageName = nv;
                break;
        }
        this.onPropsChange();
    }

    _href: string | null =  null;
    get href(){
        return this._href;
    }
    set href(nv){
        this.attr('href', nv!);
    }

    _packageName: string | null = null;
    get packageName(){
        return this._packageName;
    }
    set packageName(nv){
        this.attr(package_name, nv!)
    }
    _c = false;
    connectedCallback(){
        this._upgradeProperties(['href']);
        this._c = true;
        this.onPropsChange();
    }
    genAttr(attrib: IAttribInfo){
        return /* html */`<dt>${attrib.label}</dt><dd>${attrib.description}</dd>`;
    }
    genAttrs(attribs: IAttribInfo[]){
        return /* html */`<dl>${attribs.map(attrib => this.genAttr(attrib)).join('')}`;
    }
    genWCInfo(wc: IWCInfo){
        return /* html */`
        <section class="WCInfo card">
            <header>
                <div class="WCLabel">${wc.label}</div>
                <div class="WCDesc">${wc.description}</div>
            </header>
            <details>
                <summary>attributes</summary>
                ${this.genAttrs(wc.attributes)}
            </details> 
        </section>`;
    }
    genWCInfos(wcs: IWCInfo[]){
        return wcs.map(wc => this.genWCInfo(wc)).join('');
    }
    genWCSuite(wcSuite: IWCSuiteInfo){
        return /* html*/`
            <header>
                <mark>${this._packageName}</mark>
                <nav>
                    <a href="${this._href}" target="_blank">⚙️</a>
                </nav>
            </header>
            ${this.genWCInfos(wcSuite.tags)}
            
        `;
    }
    onPropsChange(){
        if(this._disabled || !this._c || this._href === null) return;
        fetch(this._href).then(resp =>{
            resp.json().then(info =>{
                this.render(info as IWCSuiteInfo)
            })
        })
    }

    render(wcInfo: IWCSuiteInfo){
        this.innerHTML = this.genWCSuite(wcInfo);
    }
} 

define(WCInfoBase);