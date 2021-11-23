import { define } from 'be-decorated/be-decorated.js';
import { BeReformableController, controllerConfig } from 'be-reformable/be-reformable.js';
import { mergeDeep } from 'trans-render/lib/mergeDeep.js';
export class BeReformableAsWCInfoController extends BeReformableController {
    getTagNameToDeclaration({ fetchResult }) {
        const tagNameToDeclaration = {};
        const pack = fetchResult;
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
    getUnevaluatedNonStaticPublicFieldsFromDeclaration(ce) {
        if (ce === undefined || ce.members === undefined)
            return [];
        return ce.members.filter(x => x.kind === 'field' && !x.static && !(x.privacy === 'private'));
    }
    getMethodsFromDeclaration(ce) {
        if (ce === undefined || ce.members === undefined)
            return [];
        return ce.members.filter(x => x.kind === 'method');
    }
}
export const asWcInfo = { ...controllerConfig };
const ifWantsToBe = 'reformable-as-wc-info';
const tagName = 'be-reformable-as-wc-info';
mergeDeep(asWcInfo, {
    config: {
        tagName
    }
});
const c = asWcInfo.config;
//c.tagName = tagName;
const pd = c.propDefaults;
pd.ifWantsToBe = ifWantsToBe;
const upgrade = pd.upgrade;
pd.virtualProps = [
    ...pd.virtualProps, 'tag', 'tagNameToDeclaration', 'declarations', 'customElement',
    'fields', 'cssProps', 'cssParts', 'methods'
];
const a = c.actions;
a['getTagNameToDeclaration'] = {
    ifAllOf: ['fetchResult']
};
a['getFields'] = {
    ifAllOf: ['tag', 'tagNameToDeclaration']
};
asWcInfo.complexPropDefaults.controller = BeReformableAsWCInfoController;
define(asWcInfo);
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
const beHive = document.querySelector('be-hive');
if (beHive !== null) {
    customElements.whenDefined(beHive.localName).then(() => {
        beHive.register({
            ifWantsToBe,
            upgrade,
            localName: tagName,
        });
    });
}
else {
    document.head.appendChild(document.createElement(tagName));
}
