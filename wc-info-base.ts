import {X} from 'xtal-element/lib/X.js';
import {WCInfoBaseProps} from './types.js';
import {html} from 'xtal-element/lib/html.js';
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

const mainTemplate = html`
<p-p from-parent-or-host observe-prop=href to=[-href] m=1></p-p>
<xtal-fetch-get fetch -href></xtal-fetch-get>
<p-d-x on=result-changed to=[-list] val=target.result val-filter=$.modules.[*].declarations[?(@.tagName)] val-filter-script-id=filter-out-less-typed-version></p-d-x>
<h1>Custom Elements</h1>
<i-bid -list>
    <custom-element-declaration data-is-original></custom-element-declaration>
</i-bid>



<template id=custom-element-declaration>
    <hr>
    <h2>{{_tagName}}</h2>
    <dfn>{{description}}</dfn>
    
    <p-p-x from-parent-or-host observe-prop=members val-filter="$[?(@.kind=='field' && @.privacy!='private' && @.static!=true)]" to=[-iff] m=1></p-p-x>
    <p-p-x from-parent-or-host observe-prop=members val-filter="$[?(@.kind=='field' && @.privacy!='private' && @.static!=true)]" to=[-list] m=1></p-p-x>
    <if-diff -iff is-non-empty-array>
        <template>
            <!-- TODO:  why can't we use tr inside -->
            <!-- Answer:  because tr is not a valid stand alone tag outside a table -->
            <li-bid use-weak-map template-id=innerTemplate render-at-start-of=tbody -list tag=tr>
                <template>
                    <td>{{name}}</td>
                    <td>{{description}}</td>
                    <td>{{type.text}}</td>
                    <td>{{default ?? '-' }}</td>
                    <td>{{inheritedFrom.name}} ({{inheritedFrom.module ?? 'NA'}})</td>
                </template>
            </li-bid>
            <table>
                <caption>Properties</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Inherited From</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </template>
    </if-diff>
    
    <p-p-x from-parent-or-host observe-prop=members val-filter="$[?(@.kind=='method')]" to=[-iff] m=1></p-p-x>
    <p-p-x from-parent-or-host observe-prop=members val-filter="$[?(@.kind=='method')]" to=[-list] m=1></p-p-x>
    <if-diff -iff is-non-empty-array>
        <template>
            <li-bid use-weak-map template-id=innerTemplate render-at-start-of=tbody -list tag=tr>
                <template>
                        <td>{{name}}</td>
                        <td>{{description}}</td>
                        <td>{{type.text}}</td>
                        <td>{{inheritedFrom.name}} ({{inheritedFrom.module ?? 'NA'}})</td>
                        <td>
                            <p-d-x 
                                observe=li-bid 
                                closest-weak-map-key=tr 
                                on=weak-map-changed 
                                to=[-list] 
                                val-from-target=weakMap 
                                val-filter="$.parameters[*]" m=1>
                            </p-d-x>
                            <li-bid use-weak-map template-id=innerTemplate render-at-start-of=tbody -list tag=tr>
                                <template>
                                    <td>{{name}}</td>
                                    <td>{{type.text ?? '-'}}
                                </template>
                            </li-bid>
                            <table>
                                <caption>Parameters</caption>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </td>
                </template>
            </li-bid>
            <table>
                <caption>Methods</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Inherited From</th>
                        <th>Parameters</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </template>
    </if-diff>

    <p-p-x from-parent-or-host observe-prop=attributes to=[-iff] m=1></p-p-x>
    <p-p-x from-parent-or-host observe-prop=attributes to=[-list] m=1></p-p-x>
    <if-diff iff is-non-empty-array>
        <template>
            <li-bid use-weak-map template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr>
                <template>
                        <td>{{name}}</td>
                        <td>{{description}}</td>
                        <td>{{type.text}}</td>
                        <td>{{inheritedFrom.name}} ({{inheritedFrom.module ?? 'NA'}})</td>
                        <td></td>
                </template>
            </li-bid>
            <table>
                <caption>Attributes</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Inherited From</th>
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

export class WCInfoBase extends X implements WCInfoBaseProps{}

X.tend({
    name: 'wc-info-base',
    class: WCInfoBase as {new(): X},
    propDefs: {
        href:{
            dry: true,
            type: String,
        }
    },
    mainTemplate,
    noShadow: true,
});