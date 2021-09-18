import { XtalFetchLite } from "xtal-fetch/xtal-fetch-lite.js";
import { XtalFetchLiteProps } from 'xtal-fetch/types';
import { XE } from 'xtal-element/src/XE.js';
import { WCInfoFetchActions, WCInfoFetchProps, EnhancedClassField } from './types';
import { Declaration, CustomElementDeclaration, CustomElement, Package, ClassDeclaration, ClassField, ClassMethod } from 'node_modules/custom-elements-manifest/schema.d.js';

/**
 * @element wc-info-fetch
 * @tag wc-info-fetch
 */
export class WCInfoFetchCore extends XtalFetchLite implements WCInfoFetchActions {
    getTagNameToDeclaration({result}: this){
        const tagNameToDeclaration: {[key: string]: CustomElementDeclaration} = {};
        const pack = result as Package;
        if(pack === undefined) return;
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
                (<any>ce).unevaluatedNonStaticPublicFields = this.getUnevaluatedNonStaticPublicFieldsFromDeclaration(ce);
                (<any>ce).methods = this.getMethodsFromDeclaration(ce);
            }
    
        }
        const declarations = Object.values(tagNameToDeclaration) as Declaration[];
        return {tagNameToDeclaration, declarations};       
    }

    getUnevaluatedNonStaticPublicFieldsFromDeclaration(ce: CustomElementDeclaration){
        if(ce === undefined || ce.members === undefined) return [];
        return ce.members.filter(x=> x.kind ==='field' && !x.static && !(x.privacy==='private')) as ClassField[];
    }

    getFields({tagNameToDeclaration, tag}: this){
        const ce = tagNameToDeclaration[tag!] as CustomElementDeclaration;
        const customElement = ce as any as CustomElement;
        if(ce === undefined || ce.members === undefined) return;
        const unevaluatedFields = this.getUnevaluatedNonStaticPublicFieldsFromDeclaration(ce);
    
        const fields = unevaluatedFields.map(field => {
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
                return {
                    ...field,
                    val: val,
                };
            }else{
                return {
                    ...field
                } as EnhancedClassField;
            }            
        });
        return {fields, customElement};
    }

    getMethodsFromDeclaration(ce: CustomElementDeclaration): ClassMethod[]{
        if(ce === undefined || ce.members === undefined) return [];
        return ce.members.filter(x => x.kind === 'method') as ClassMethod[];
    }
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

export interface WCInfoFetchCore extends WCInfoFetchProps{}

const ce = new XE<WCInfoFetchProps & XtalFetchLiteProps, WCInfoFetchActions>({
    config:{
        tagName: 'wc-info-fetch',
        propInfo:{
            declarations:{
                notify:{
                    dispatch: true,
                }
            },
        },
        actions:{
            getTagNameToDeclaration: {
                ifAllOf:['result'],
            },
            getFields:{
                ifAllOf: ['tag', 'tagNameToDeclaration']
            }
        }
    },
    superclass: WCInfoFetchCore
});

export const WCInfoFetch = ce.classDef!;
