import {XtallatX} from 'xtal-latx/xtal-latx.js';
import {define} from 'xtal-latx/define.js';
import {XtalElement} from 'xtal-element/xtal-element.js';
import {RenderContext, TransformArg, TransformRules} from 'trans-render/init.d.js';
import {init} from 'trans-render/init.js';
import {repeatInit} from 'trans-render/repeatInit.js';
import { WCInfo } from './wc-info';

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

function createTemplate(innerHTML: string) : HTMLTemplateElement{
    const template = document.createElement('template') as HTMLTemplateElement;
    template.innerHTML = innerHTML;
    return template;
}

const attribTemplate = createTemplate(
/* html */`
    <dt>a</dt><dd>b</dd>
`);

const WCInfoTemplate = createTemplate(
/* html */`
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

const mainTemplate = createTemplate(
/* html */`
    <header>
        <mark></mark>
        <nav>
            <a target="_blank">⚙️</a>
        </nav>
    </header>
    <main></main>
`   
)

export class WCInfoBase extends XtalElement<IWCSuiteInfo>{
    static get is(){return 'wc-info-base';}

    get noShadow(){
        return true;
    }

    get eventSwitchContext(){
        return {};
    }

    get renderContext(){
        const matchNext = () =>({
            matchNextSib: true,
        });
        return {
            init: init,
            transform:{
                '*': matchNext,
                header: x => ({
                    matchFirstChild: {
                        mark: x => this.packageName,
                        nav: x => ({
                            matchFirstChild:{
                                a:({target}) =>{
                                    (target as HTMLAnchorElement).href = this._href!;
                                }
                            }
                            
                        })
                    },
                    inheritMatches: true,
                }),
                main: ({target}) => {
                    const tags = this._value.tags;
                    repeatInit(tags.length, WCInfoTemplate, target);
                    return {
                        inheritMatches: true,
                        matchFirstChild:{
                            section: ({idx}) =>({
                                matchFirstChild:{
                                    header: x => ({
                                        matchFirstChild: {
                                            '.WCLabel': x => tags[idx].label,
                                            '.WCDesc': ({target}) => {
                                                target.innerHTML = tags[idx].description
                                            },
                                        },
                                        inheritMatches: true,
                                    }),
                                    details: x => ({
                                        inheritMatches: true,
                                        matchFirstChild:{
                                            dl: ({target}) =>{
                                                const attrbs = this._value.tags[idx].attributes;
                                                if(!attrbs) return;
                                                repeatInit(attrbs.length, attribTemplate, target);
                                                return{
                                                    matchFirstChild: {
                                                        dt: ({idx}) => attrbs[Math.floor(idx / 2)].label,
                                                        dd: ({idx}) => attrbs[Math.floor(idx / 2)].description,
                                                        '*': matchNext,
                                                    },
                                                    //inheritMatches: true,
                                                }
                                            }
                                        }
                                    })
                                },
                                inheritMatches: true,
                            })

                        }
                    };
                }
            }
        } as RenderContext;
    }

    get ready(){
        return this._href !== undefined && this._packageName !== undefined;
    }

    init(){
        return new Promise<IWCSuiteInfo>(resolve => {
            fetch(this._href!).then(resp =>{
                resp.json().then(info =>{
                    resolve(info as IWCSuiteInfo);
                })
            })
        })
    }
    update(){
        return this.init();
    }

    get mainTemplate(){
        return mainTemplate;
    }

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
        this._upgradeProperties(['href', 'packageName']);
        super.connectedCallback();
    }
    // genAttr(attrib: IAttribInfo){
    //     return /* html */`<dt>${attrib.label}</dt><dd>${attrib.description}</dd>`;
    // }
    // genAttrs(attribs: IAttribInfo[]){
    //     return /* html */`<dl>${attribs.map(attrib => this.genAttr(attrib)).join('')}`;
    // }
    // genWCInfo(wc: IWCInfo){
    //     return /* html */`
    //     <section class="WCInfo card">
    //         <header>
    //             <div class="WCLabel">${wc.label}</div>
    //             <div class="WCDesc">${wc.description}</div>
    //         </header>
    //         <details>
    //             <summary>attributes</summary>
    //             ${this.genAttrs(wc.attributes)}
    //         </details> 
    //     </section>`;
    // }
    // genWCInfos(wcs: IWCInfo[]){
    //     return wcs.map(wc => this.genWCInfo(wc)).join('');
    // }
    // genWCSuite(wcSuite: IWCSuiteInfo){
    //     return /* html*/`
    //         <header>
    //             <mark>${this._packageName}</mark>
    //             <nav>
    //                 <a href="${this._href}" target="_blank">⚙️</a>
    //             </nav>
    //         </header>
    //         ${this.genWCInfos(wcSuite.tags)}
            
    //     `;
    // }
    // onPropsChange(){
    //     if(this._disabled || !this._c || this._href === null) return;
    //     fetch(this._href).then(resp =>{
    //         resp.json().then(info =>{
    //             this.render(info as IWCSuiteInfo)
    //         })
    //     })
    // }

    // render(wcInfo: IWCSuiteInfo){
    //     this.innerHTML = this.genWCSuite(wcInfo);
    // }
} 

define(WCInfoBase);