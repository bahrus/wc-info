import { X } from 'xtal-element/lib/X.js';
import { html } from 'xtal-element/lib/html.js';
import('pass-prop/p-p.js');
import('pass-prop/p-p-x.js');
import('pass-down/p-d-x.js');
import('carbon-copy/c-c.js');
import('xtal-fetch/xtal-fetch-get.js');
import('carbon-copy/c-c.js');
import('ib-id/i-bid.js');
import('lib-id/li-bid.js');
import('if-diff/if-diff.js');
import('nomodule/no-module.js');
const mainTemplate = html `
<p-p from-parent-or-host observe-prop=href to=[-href] m=1></p-p>
<xtal-fetch-get fetch -href></xtal-fetch-get>
<p-d-x on=result-changed to=[-list] val=target.result val-filter=$.modules.[*].declarations[?(@.tagName)] val-filter-script-id=filter-out-less-typed-version></p-d-x>
<h1 part=title>Custom Elements</h1>
<i-bid -list>
    <custom-element-declaration data-is-original></custom-element-declaration>
</i-bid>



<template id=custom-element-declaration>
    <hr>
    <h2 part=tag-name class=tag-name>{{_tagName}}</h2>
    <dfn part=ce-description class=description>{{description}}</dfn>
    
    <p-p-x from-parent-or-host observe-prop=members val-filter="$[?(@.kind=='field' && @.privacy!='private' && @.static!=true)]" to=[-iff] m=1></p-p-x>
    <p-p-x from-parent-or-host observe-prop=members val-filter="$[?(@.kind=='field' && @.privacy!='private' && @.static!=true)]" to=[-list] m=1></p-p-x>
    <if-diff -iff is-non-empty-array>
        <template>
            <li-bid use-weak-map template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr tag-attr='{"part":"cep-item", "class": "item"}'>
                <template>
                    <td part=cepi-name-value class=name>{{name}}</td>
                    <td part=cepi-description-value class=description>{{description}}</td>
                    <td part=cepi-type-text-value class=type-text>{{type.text}}</td>
                    <td part=cepi-default-value class=default>{{default ?? '-' }}</td>
                    <td part=cepi-inherited-from-value class=inherited-from>{{inheritedFrom.name}} ({{inheritedFrom.module ?? 'NA'}})</td>
                </template>
            </li-bid>
            <table part=ce-properties class=properties part=properties>
                <caption part=cep-title class=title>Properties</caption>
                <thead>
                    <tr part=cep-header class=header>
                        <th part=ceph-name-label class=name>Property</th>
                        <th part=ceph-description-label class=description>Description</th>
                        <th part=ceph-type-label class=type>Type</th>
                        <th part=ceph-default-label class=default>Default</th>
                        <th part=ceph-inherited-from-label class=inherited-from>Inherited From</th>
                    </tr>
                </thead>
                <tbody -repeat></tbody>
            </table>
        </template>
    </if-diff>
    
    <p-p-x from-parent-or-host observe-prop=members val-filter="$[?(@.kind=='method')]" to=[-iff] m=1></p-p-x>
    <p-p-x from-parent-or-host observe-prop=members val-filter="$[?(@.kind=='method')]" to=[-list] m=1></p-p-x>
    <if-diff -iff is-non-empty-array>
        <template>
            <li-bid use-weak-map template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr tag-attr='{"part":"cem-item", "class": "item"}'>
                <template>
                        <td part=cemi-name-value class=name>{{name}}</td>
                        <td part=cemi-description-value class=description>{{description}}</td>
                        <td part=cemi-type-text-value class=text>{{type.text}}</td>
                        <td part=cemi-inherited-from-value class=inherited-from>{{inheritedFrom.name}} ({{inheritedFrom.module ?? 'NA'}})</td>
                        <td part=cemi-parameters-value class=parameters>
                            <p-d-x 
                                observe=li-bid 
                                closest-weak-map-key=tr 
                                on=weak-map-changed 
                                to=[-list] 
                                val-from-target=weakMap 
                                val-filter="$.parameters[*]" m=1>
                            </p-d-x>
                            <li-bid use-weak-map template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr>
                                <template>
                                    <td>{{name}}</td>
                                    <td>{{type.text ?? '-'}}
                                </template>
                            </li-bid>
                            <table part=cemipv-details class=details>
                                <caption part=cemipvd-title class=title>Parameters</caption>
                                <thead>
                                    <tr part=cemipvd-header class=header>
                                        <th part=cemipvdh-name-label class=name>Parameter</th>
                                        <th part=cemipvdh-type-label class=type>Type</th>
                                    </tr>
                                </thead>
                                <tbody -repeat>
                                </tbody>
                            </table>
                        </td>
                </template>
            </li-bid>
            <table part=ce-methods class=methods>
                <caption part=cem-title class=title>Methods</caption>
                <thead>
                    <tr part=cem-header class=header>
                        <th part=cemh-name-label class=name>Method</th>
                        <th part=cemh-description-label class=description>Description</th>
                        <th part=cemh-type-label class=description>Type</th>
                        <th part=cemh-inherited-from-label class=inherited-from>Inherited From</th>
                        <th part=cemh-parameters-label class=parameters>Parameters</th>
                    </tr>
                </thead>
                <tbody -repeat>
                </tbody>
            </table>
        </template>
    </if-diff>

    <p-p-x from-parent-or-host observe-prop=attributes to=[-iff] m=1></p-p-x>
    <p-p-x from-parent-or-host observe-prop=attributes to=[-list] m=1></p-p-x>
    <if-diff iff is-non-empty-array>
        <template>
            <li-bid use-weak-map template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr tag-attr='{"part":"cea-item", "class": "item"}'>
                <template>
                        <td part=ceai-name-value class=name>{{name}}</td>
                        <td part=ceai-description-value class=description>{{description}}</td>
                        <td part=ceai-type-value class=type>{{type.text}}</td>
                        <td part=ceai-inherited-from-value class=inherited-from>{{inheritedFrom.name}} ({{inheritedFrom.module ?? 'NA'}})</td>
                        <td></td>
                </template>
            </li-bid>
            <table part=ce-attributes class=attributes>
                <caption part=cea-title class=title>Attributes</caption>
                <thead>
                    <tr part=cea-header class=header>
                        <th part=ceah-name-label class=name>Attribute</th>
                        <th part=ceah-description-label class=description>Description</th>
                        <th part=ceah-type-label class=type>Type</th>
                        <th part=ceah-inherited-from-label class=inherited-from>Inherited From</th>
                    </tr>
                </thead>
                <tbody -repeat>
                </tbody>
            </table>
        </template>
    </if-diff> 
</template>
<c-c copy from-prev-sibling string-props='["name", "description", "kind", "_tagName"]' obj-props='["members", "attributes"]' noshadow></c-c>



<template id=wc-info-parameter>
    <hr>
    <div>Parameter Name: {{name}}</div>
</template>
<c-c copy from-prev-sibling string-props='["name"]' noshadow></c-c>
<no-module></no-module>
<script id=filter-out-less-typed-version nomodule=ish>
    export const filter = (declarations) => {
        const tagNameToDeclaration = {};
        function countTypes(declaration){
            let count = 0;
            for(const member of declaration.members){
                if(member.type !== undefined) count++;
            }
            return count;
        }
        for(const declaration of declarations){
            const tagName = declaration.tagName;
            if(tagNameToDeclaration[tagName] !== undefined){
                if(countTypes(declaration) >  countTypes(tagNameToDeclaration[tagName])){
                    tagNameToDeclaration[tagName] = declaration;
                }
            }else{
                tagNameToDeclaration[tagName] = declaration;
            }
        }
        return Object.values(tagNameToDeclaration);
    }
</script>

`;
export class WCInfoBase extends X {
}
X.tend({
    name: 'wc-info-base',
    class: WCInfoBase,
    propDefs: {
        href: {
            dry: true,
            type: String,
        }
    },
    mainTemplate,
    noShadow: true,
});
