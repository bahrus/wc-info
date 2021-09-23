import { XtalFetchLite } from "xtal-fetch/xtal-fetch-lite.js";
import { XE } from 'xtal-element/src/XE.js';
/**
 * @element wc-info-fetch
 * @tag wc-info-fetch
 */
export class WCInfoFetchCore extends XtalFetchLite {
    getTagNameToDeclaration({ result }) {
        const tagNameToDeclaration = {};
        const pack = result;
        if (pack === undefined)
            return;
        const mods = pack.modules;
        if (mods === undefined)
            tagNameToDeclaration;
        for (const mod of mods) {
            const declarations = mod.declarations;
            if (declarations === undefined)
                continue;
            const tagDeclarations = declarations.filter(x => x.tagName !== undefined);
            for (const declaration of tagDeclarations) {
                const ce = declaration;
                const tagName = declaration.tagName;
                if (tagName === undefined)
                    continue;
                if (tagNameToDeclaration[tagName] !== undefined) {
                    if (countTypes(declaration) > countTypes(tagNameToDeclaration[tagName])) {
                        tagNameToDeclaration[tagName] = ce;
                    }
                }
                else {
                    tagNameToDeclaration[tagName] = ce;
                }
                ce.unevaluatedNonStaticPublicFields = this.getUnevaluatedNonStaticPublicFieldsFromDeclaration(ce);
                ce.methods = this.getMethodsFromDeclaration(ce);
            }
        }
        const declarations = Object.values(tagNameToDeclaration);
        return { tagNameToDeclaration, declarations };
    }
    getUnevaluatedNonStaticPublicFieldsFromDeclaration(ce) {
        if (ce === undefined || ce.members === undefined)
            return [];
        return ce.members.filter(x => x.kind === 'field' && !x.static && !(x.privacy === 'private'));
    }
    getFields({ tagNameToDeclaration, tag }) {
        const ce = tagNameToDeclaration[tag];
        const customElement = ce;
        if (ce === undefined || ce.members === undefined)
            return;
        const unevaluatedFields = this.getUnevaluatedNonStaticPublicFieldsFromDeclaration(ce);
        const fields = unevaluatedFields.map(field => {
            if (field.default !== undefined) {
                let val = field.default;
                if (field.type !== undefined && field.type.text !== undefined) {
                    switch (field.type.text) {
                        case 'boolean':
                        case 'number':
                            val = JSON.parse(val);
                            break;
                        case 'string':
                        case 'object':
                            try {
                                val = eval('(' + val + ')'); //yikes
                            }
                            catch (e) { }
                            break;
                    }
                }
                return {
                    ...field,
                    val: val,
                };
            }
            else {
                return {
                    ...field
                };
            }
        });
        return { fields, customElement };
    }
    getMethodsFromDeclaration(ce) {
        if (ce === undefined || ce.members === undefined)
            return [];
        return ce.members.filter(x => x.kind === 'method');
    }
}
export function countTypes(declaration) {
    let count = 0;
    if (declaration.kind !== 'class')
        return count;
    const classDeclaration = declaration;
    if (classDeclaration.members === undefined)
        return count;
    for (const member of classDeclaration.members) {
        const classField = member;
        if (classField.type !== undefined)
            count++;
    }
    return count;
}
const ce = new XE({
    config: {
        tagName: 'wc-info-fetch',
        propInfo: {
            declarations: {
                notify: {
                    dispatch: true,
                }
            },
            customElement: {
                notify: {
                    dispatch: true,
                }
            }
        },
        actions: {
            getTagNameToDeclaration: {
                ifAllOf: ['result'],
            },
            getFields: {
                ifAllOf: ['tag', 'tagNameToDeclaration']
            }
        }
    },
    superclass: WCInfoFetchCore
});
export const WCInfoFetch = ce.classDef;
