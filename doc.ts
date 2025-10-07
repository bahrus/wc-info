import {SchemaFile, SchemaDefinition, SchemaProperty} from './schemaTypes.js';
import {
    Package, Module, CustomElementDeclaration, CustomElement, JavaScriptModule, 
    Declaration, ClassMember, PropertyLike, Attribute, CssPart, Slot, Event
} 
    from './node_modules/custom-elements-manifest/schema.d.js';
import {camelToLisp} from './camelToLisp.js';

//@ts-ignore
import * as TJS from "typescript-json-schema";

export class CustomElementManifestGenerator{
    #wcInfo!: SchemaFile;
    constructor(public path: string, public type: string, public encodeAndWrite: (s: string) => void){
        // optionally pass argument to schema generator
        const settings: TJS.PartialArgs = {
            required: true,
        };

        // optionally pass ts compiler options
        const compilerOptions: TJS.CompilerOptions = {
            strictNullChecks: true,
            lib: ['ESNext', 'DOM'],
        };

        // optionally pass a base path
        const basePath = "./";

        const program = TJS.getProgramFromFiles(
            [path],
            compilerOptions,
            basePath
        );
        this.#wcInfo = TJS.generateSchema(program, this.type, settings) as SchemaFile;
        this.generatePackage();
    }

    generatePackage(){
        const modules: Module[] = [];
        const pkg: Package = {
            schemaVersion: '2.1.0',
            readme: '',
            modules,
        }
        this.generateModules(modules);
        this.encodeAndWrite(JSON.stringify(pkg, null, 2));
    }

    getStringVal(enm: string[] | undefined): string{
        if(enm === undefined) return '';
        if(enm.length === 0) return '';
        const firstE = enm[0] as string;
        return firstE;
    }
    
    generateModules(modules: Module[]){
        const {definitions} = this.#wcInfo;
        if(definitions === undefined) return;
        for(const def in definitions){
            const definition = definitions[def];
            const {properties} = definition;
            if(properties === undefined) continue;
            const {tagName, src} = properties;
            if(tagName === undefined) continue;
            //const enm = tagName.enum;
            const name = tagName.const;
            let path = '';
            if(src !== undefined){
                const srcEnm = src.enum;
                path = this.getStringVal(srcEnm);
            }
            if(name === '') continue;
            const declarations: CustomElement[] = [];
            const module: JavaScriptModule = {
                kind: 'javascript-module',
                path,
                declarations: declarations as Declaration[],
                
            };
            this.generateDeclarations(def, name, properties, declarations);
            modules.push(module as any as Module);
        }
    }

    generateDeclarations(name: string, tagName: string, properties: {[key: string]: SchemaProperty}, declarations: CustomElement[]){
        const {props, methods, nonAttribProps, cssParts, slots, events} = properties;
        const members: ClassMember[] = [];
        const attributes: Attribute[] = [];
        const attribExclusions: string[] = [];
        const parts: CssPart[] = [];
        const slotArr: Slot[] = [];
        const eventArr: Event[] = [];
        if(nonAttribProps !== undefined){
            const {items} = nonAttribProps;
            if(items !== undefined){
                for(const item of items){
                    const enm = item.enum;
                    if(enm !== undefined){
                        attribExclusions.concat(enm);
                    }
                }
            }
        }
        if(props !== undefined){
            //props
            const {$ref} = props;
        
            if($ref !== undefined){
                const split = $ref.split('/');
                let ctx = this.#wcInfo as any;
                let first = true;
                for(const s of split){
                    if(first){
                        first = false;
                        continue;
                    }
                    ctx = ctx[s];
                }
                const propsDef = ctx as SchemaDefinition;
                if(propsDef === undefined) return;
                const props = propsDef.properties;
                if(props !== undefined) {
                    for(const prop in props){
                        const {type, description} = props[prop];
                        const member: PropertyLike & ClassMember = {
                            kind: 'field',
                            name: prop,
                            description,
                        };
                        if(type !== undefined){
                            member.type = {text: type};
                        }
                        members.push(member);
                        if(!attribExclusions.includes(prop)){
                            const attrib: Attribute = {
                                name: camelToLisp(prop),
                                description,
                            };
                            attributes.push(attrib);
                        }
                    }
                }
            }
        }
        if(methods !== undefined){
            //methods
            const {$ref} = methods;
            if($ref !== undefined){
                const split = $ref.split('/');
                let ctx = this.#wcInfo as any;
                let first = true;
                for(const s of split){
                    if(first){
                        first = false;
                        continue;
                    }
                    ctx = ctx[s];
                }
                const methodsDef = ctx as SchemaDefinition;
                if(methodsDef === undefined) return;
                const methods = methodsDef.properties;
                if(methods !== undefined) {
                    for(const method in methods){
                        const {type, description} = methods[method];
                        const member: PropertyLike & ClassMember = {
                            kind: 'method',
                            name: method,
                            description,
                        };
                        members.push(member);
                    }
                }
            }
        }

        if(cssParts !== undefined){
            //console.log('cssParts', cssParts);
            const properties = (<any>cssParts).properties;
            for(const propKey in properties){
                const prop = properties[propKey];
                //const enm = prop.enum;
                //const description = this.getStringVal(enm);
                const description = prop.const;
                const cssPart: CssPart = {
                    name: camelToLisp(propKey),
                    description
                }
                parts.push(cssPart);
            }
        }

        if(slots !== undefined){
            const properties = (<any>slots).properties;
            for(const propKey in properties){
                const prop = properties[propKey];
                //const enm = prop.enum;
                const description = prop.const;
                const slot: Slot = {
                    name: camelToLisp(propKey),
                    description
                };
                slotArr.push(slot);
            }
        }
        if(events !== undefined){
            const properties = (<any>events).properties;
            for(const propKey in properties){
                const prop = properties[propKey];
                const enm = prop.enum;
                const description = this.getStringVal(enm);
                const event = {
                    name: camelToLisp(propKey),
                    description,
                } as Event;
                eventArr.push(event);
            }
        }
        
        const newDeclaration: CustomElement = {
            tagName,
            name,
            customElement: true,
            members,
            attributes,
            cssParts: parts,
            slots: slotArr,
            events: eventArr,
        };
        declarations.push(newDeclaration);
    }
}