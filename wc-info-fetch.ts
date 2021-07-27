import {XtalFetchGet, linkResult,  str1, obj1} from 'xtal-fetch/xtal-fetch-get.js';
export {linkResult, str1, obj1} from 'xtal-fetch/xtal-fetch-get.js';
import { xc, PropAction, PropDef, PropDefMap } from 'xtal-element/lib/XtalCore.js';
import {WCInfoFetchProps, EnhancedClassField} from './types.d.js';
import { Declaration, CustomElementDeclaration, CustomElement, Package, ClassDeclaration, ClassField } from 'node_modules/custom-elements-manifest/schema.d.js';

export class WCInfoFetch extends XtalFetchGet{
    static is = 'wc-info-fetch';
    propActions = propActions;
}
export interface WCInfoFetch extends WCInfoFetchProps{}
type W = WCInfoFetch;

export const linkTagToDeclarationMapping = ({result, self}: W) => {
    const tagNameToDeclaration: {[key: string]: CustomElementDeclaration} = {};
    const pack = result as Package;
    if(pack === undefined) return tagNameToDeclaration;
    const mods = pack.modules;
    if(mods === undefined) tagNameToDeclaration;
    
    for(const mod of mods){
        const declarations = mod.declarations;
        if(declarations === undefined) continue;
        const tagDeclarations = declarations.filter(x => (x as CustomElement).tagName !== undefined);
        
        for(const declaration of tagDeclarations){
            const ce = declaration as CustomElementDeclaration;
            const tagName = (declaration as CustomElement).tagName!;
            if(tagName === undefined) continue;
            if(tagNameToDeclaration[tagName] !== undefined){
                if(countTypes(declaration) >  countTypes(tagNameToDeclaration[tagName] as Declaration)){
                    tagNameToDeclaration[tagName] = ce;
                }
            }else{
                tagNameToDeclaration[tagName] = ce;
            }
        }

    }
    self.tagNameToDeclaration = tagNameToDeclaration;
    self.declarations = Object.values(tagNameToDeclaration);
}

export const linkFields = ({tag, tagNameToDeclaration, self}: W) => {
    const ce = tagNameToDeclaration[tag!] as CustomElementDeclaration;
    if(ce === undefined || ce.members === undefined) return;
    //const declaration = ce as Declaration;
    const fields = ce.members.filter(x=> x.kind ==='field' && !x.static && !(x.privacy==='private')) as ClassField[];
    //const propVals = {};
    for(const field of fields){
        if(field.default !== undefined){
            let val = field.default;
            if(field.type !== undefined && field.type.text !== undefined){
                switch(field.type.text){
                    case 'boolean':
                    case 'number':
                        val = JSON.parse(val);
                        break;
                    case 'string':
                    case 'object':
                        try{
                            val = eval('(' + val + ')'); //yikes
                        }catch(e){}
                        break;
                }
            }
            (<any>field).val = val;
        } 

    }
    self.fields = fields.map(field => {
        if(field.default !== undefined){
            let val = field.default;
            if(field.type !== undefined && field.type.text !== undefined){
                switch(field.type.text){
                    case 'boolean':
                    case 'number':
                        val = JSON.parse(val);
                        break;
                    case 'string':
                    case 'object':
                        val = eval('(' + val + ')'); //yikes
                        break;
                }
            }
            return {
                ...field,
                val: val,
            };
        }else{
            return {
                ...field
            } as EnhancedClassField;
        }            
    })
}



export function countTypes(declaration: Declaration){
    let count = 0;
    if(declaration.kind !== 'class') return count;
    const classDeclaration = declaration as ClassDeclaration;
    if(classDeclaration.members === undefined) return count;
    for(const member of classDeclaration.members){
        const classField = member as ClassField;
        if(classField.type !== undefined) count++;
    }
    return count;
}

export const propActions = [linkResult, linkTagToDeclarationMapping, linkFields] as PropAction[];
export const obj2: PropDef = {
    ...obj1, 
    stopReactionsIfFalsy: true,
}
const propDefMap: PropDefMap<W> = {
    tag: str1,
    tagNameToDeclaration: obj2,
    fields: obj2,
    declarations: obj2,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(WCInfoFetch, slicedPropDefs, 'onPropChange');
xc.define(WCInfoFetch);