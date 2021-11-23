import {BeDecoratedProps, define} from 'be-decorated/be-decorated.js';
import {BeReformableController, controllerConfig} from 'be-reformable/be-reformable.js';
import {BeReformableActions, BeReformableProps} from 'be-reformable/types';
import {BeReformableAsWCInfoActions, BeReformableAsWCInfoVirtualProps, EnhancedClassField} from './types';
import {DefineArgs} from 'trans-render/lib/types';
import { Declaration, CustomElementDeclaration, CustomElement, Package, ClassDeclaration, ClassField, ClassMethod } from 'node_modules/custom-elements-manifest/schema.d.js';
import {mergeDeep} from 'trans-render/lib/mergeDeep.js';

export class BeReformableAsWCInfoController extends BeReformableController implements BeReformableAsWCInfoActions{
    getTagNameToDeclaration({fetchResult}: this){
        const tagNameToDeclaration: {[key: string]: CustomElementDeclaration} = {};
        const pack = fetchResult as Package;
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

    getUnevaluatedNonStaticPublicFieldsFromDeclaration(ce: CustomElementDeclaration){
        if(ce === undefined || ce.members === undefined) return [];
        return ce.members.filter(x=> x.kind ==='field' && !x.static && !(x.privacy==='private')) as ClassField[];
    }

    getMethodsFromDeclaration(ce: CustomElementDeclaration): ClassMethod[]{
        if(ce === undefined || ce.members === undefined) return [];
        return ce.members.filter(x => x.kind === 'method') as ClassMethod[];
    }
}

export interface BeReformableAsWCInfoController extends BeReformableAsWCInfoVirtualProps{}

export const asWcInfo = {...controllerConfig} as DefineArgs<
    BeReformableProps & BeReformableAsWCInfoVirtualProps & BeDecoratedProps<BeReformableProps & BeReformableAsWCInfoVirtualProps, BeReformableActions & BeReformableAsWCInfoActions>, 
    BeReformableActions & BeReformableAsWCInfoActions
>

const ifWantsToBe = 'reformable-as-wc-info';
const tagName = 'be-reformable-as-wc-info';
mergeDeep(asWcInfo, {
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            virtualProps: [...asWcInfo.config.propDefaults?.virtualProps || [], 'tag', 'tagNameToDeclaration', 'declarations', 'customElement',
            'fields', 'cssProps', 'cssParts', 'methods']
        },
        actions:{
            getTagNameToDeclaration:{
                ifAllOf: ['fetchResult']
            },
            getFields:{
                ifAllOf: ['tagNameToDeclaration', 'tag']
            }
        }
    },
    complexPropDefaults:{
        controller: BeReformableAsWCInfoController
    }
});

const upgrade = asWcInfo.config.propDefaults!.upgrade!;



define(asWcInfo);

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

const beHive = document.querySelector('be-hive') as any;
if(beHive !== null){
    customElements.whenDefined(beHive.localName).then(() => {
        beHive.register({
            ifWantsToBe,
            upgrade,
            localName: tagName,
        })
    })
}else{
    document.head.appendChild(document.createElement(tagName));
}