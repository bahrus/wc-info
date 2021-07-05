import {X} from 'xtal-element/lib/X.js';
import {WCInfoBaseProps} from './types.d.js';
import {html} from 'xtal-element/lib/html.js';
import('pass-prop/pass-prop.js');
import('pass-down/p-d-x.js');
import('carbon-copy/c-c.js');
import('xtal-fetch/xtal-fetch-get.js');
import('carbon-copy/c-c.js');
import('ib-id/i-bid.js');
import('lib-id/li-bid.js');
import('if-diff/if-diff.js');
import('nomodule/no-module.js');

const mainTemplate = html`
<template id=class-member-inner-row>
    <td>{{name}}</td>
    <td>{{description}}</td>
    <td>{{type.text}}</td>
</template>

<template id=custom-element-declaration>
    <hr>
    <div>{{_tagName}}</div>
    <div data-desc="{{description}}">{{description}}</div>

    <p-p from-parent-or-host observe-prop=members to=[-iff] m=1></p-p>
    <p-p from-parent-or-host observe-prop=members to=[-list] m=1></p-p>
    <if-diff -iff is-non-empty-array>
        <template>
            <!-- <i-bid -list>
                <wc-info-member></wc-info-member>
            </i-bid> -->
            <!-- TODO:  why can't we use li inside -->
            <li-bid template-id=./class-member-inner-row render-at-start-of=tbody -list tag=tr>
            </li-bid>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </template>
    </if-diff>
</template>
<c-c copy from-prev-sibling string-props='["name", "description", "kind", "_tagName"]' obj-props='["members"]' noshadow></c-c>

<!-- <template id=wc-info-member>
    <hr>
    <div>{{kind}} name: {{name}}</div>
    <div>Description: {{description}}</div>
    <p-p from-upsearch=wc-info-member observe-prop=parameters to=[-iff] m=1></p-p>
    <p-p from-upsearch=wc-info-member observe-prop=parameters to=[-list] m=1></p-p>
    <if-diff -iff is-non-empty-array>
        <template>
            <details>
                <summary>Parameters</summary>
                
                <i-bid -list>
                    <wc-info-parameter></wc-info-parameter>
                </i-bid>
            </details>
        </template>
    </if-diff>
</template>
<c-c copy from-prev-sibling string-props='["name", "description", "kind"]' obj-props='["parameters"]' noshadow></c-c> -->

<!-- <template id=wc-info-parameter>
    <hr>
    <div>Parameter Name: {{name}}</div>
</template>
<c-c copy from-prev-sibling string-props='["name"]' noshadow></c-c> -->
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
<p-p from-parent-or-host observe-prop=href to=[-href] m=1></p-p>
<xtal-fetch-get fetch -href></xtal-fetch-get>
<p-d-x on=result-changed to=[-list] val=target.result val-filter=$.modules.[*].declarations[?(@.tagName)] val-filter-script-id=filter-out-less-typed-version></p-d-x>
<div>Custom Elements</div>
<i-bid -list>
    <custom-element-declaration></custom-element-declaration>
</i-bid>
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