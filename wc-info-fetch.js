import { XtalFetchGet, linkResult, str1, obj1 } from 'xtal-fetch/xtal-fetch-get.js';
import { xc } from 'xtal-element/lib/XtalCore.js';
export class WCInfoFetch extends XtalFetchGet {
    static is = 'wc-info-fetch';
    propActions = propActions;
}
const linkTagToDeclarationMapping = ({ result, self }) => {
    const tagNameToDeclaration = {};
    const pack = result;
    if (pack === undefined)
        return tagNameToDeclaration;
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
        }
    }
    self.tagNameToDeclaration = tagNameToDeclaration;
    self.declarations = Object.values(tagNameToDeclaration);
};
const linkFields = ({ tag, tagNameToDeclaration, self }) => {
    const ce = tagNameToDeclaration[tag];
    if (ce === undefined || ce.members === undefined)
        return;
    //const declaration = ce as Declaration;
    const fields = ce.members.filter(x => x.kind === 'field' && !x.static && !(x.privacy === 'private'));
    //const propVals = {};
    for (const field of fields) {
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
                        val = eval('(' + val + ')'); //yikes
                        break;
                }
            }
            field.val = val;
        }
    }
    self.fields = fields.map(field => {
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
                        val = eval('(' + val + ')'); //yikes
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
};
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
const propActions = [linkResult, linkTagToDeclarationMapping, linkFields];
const obj2 = {
    ...obj1,
    stopReactionsIfFalsy: true,
};
const propDefMap = {
    tag: str1,
    tagNameToDeclaration: obj2,
    fields: obj2,
    declarations: obj2,
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(WCInfoFetch, slicedPropDefs, 'onPropChange');
xc.define(WCInfoFetch);
