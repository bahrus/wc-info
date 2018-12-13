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

export class WCInfoBase extends XtallatX(HTMLElement){
    static get is(){return 'wc-info-base';}

    static get observedAttributes(){
        return super.observedAttributes.concat(['href']);
    }

    attributeChangedCallback(n: string, ov: string, nv: string){
        super.attributeChangedCallback(n, ov, nv);
        switch(n){
            case 'href':
                this._href = nv;
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
    _c = false;
    connectedCallback(){
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
        <div class="WCInfo card">
            <div class="WCLabel">${wc.label}</div>
            <div class="WCDesc">${wc.description}</div>
            <details>
                <summary>Attributes</summary>
                ${this.genAttrs(wc.attributes)}
            </details> 
        </div>`;
    }
    genWCInfos(wcs: IWCInfo[]){
        return wcs.map(wc => this.genWCInfo(wc)).join('');
    }
    genWCSuite(wcSuite: IWCSuiteInfo){
        return /* html*/`
            <div class="WCSuite">
                ${this.genWCInfos(wcSuite.tags)}
            </div>
        `;
    }
    onPropsChange(){
        if(this._disabled || !this._c || this._href === null) return;
        fetch(this._href).then(resp =>{
            resp.json().then(info =>{
                const wcInfo = info as IWCSuiteInfo;
                this.innerHTML = this.genWCSuite(wcInfo);
            })
        })
    }
} 

define(WCInfoBase);