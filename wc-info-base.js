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
<p-p from-parent-or-host observe-prop=href to=[-href] m=2></p-p>
<p-p from-parent-or-host observe-prop=package to=h2 care-of=label[-text-content] m=1></p-p>
<xtal-fetch-get fetch -href></xtal-fetch-get>
<p-d-x on=result-changed to=[-list] val-from-target=result val-filter=$.modules.[*].declarations[?(@.tagName)] val-filter-script-id=filter-out-less-typed-version></p-d-x>
<h1 part=title>Custom Elements API</h1>
<h2 part=package>Package: <label -text-content></label></h2>
<i-bid -list tag=custom-element-declaration></i-bid>
<a -href>See Raw JSON</a>


<template id=custom-element-declaration>
    <hr>
    <h2 part=tag-name class=tag-name id={{_tagName}}><a href="#{{_tagName}}">{{_tagName}}</a></h2>
    <dfn part=ce-description class=description>{{description}}</dfn>

    <!-- Attributes -->
    <p-p-x from-parent-or-host observe-prop=_attributes to=if-diff.attribs[-iff] m=2></p-p-x>
    <p-p-x from-parent-or-host observe-prop=_attributes to=li-bid.attribs[-list] m=1></p-p-x>
    <if-diff class=attribs -iff is-non-empty-array and-media-matches="(min-width: 600px)" lazy-display lazy-delay=200>
        <template>
            <li-bid class=attribs bind-to-tag-virtually template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr tag-attr='{"part":"cea-item", "class": "item"}'>
                <template>
                        <td part=ceai-name-value class=name>{{name}}</td>
                        <td part=ceai-description-value class=description>{{description ?? '-'}}</td>
                        <td part=ceai-type-value class=type data-len="{{type.text.length ?? '0'}}">{{type.text ?? '-'}}</td>
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
    <if-diff class=attribs -iff is-non-empty-array and-media-matches="(max-width: 599px)" lazy-display lazy-delay=200>
        <template>
            <li-bid class=attribs bind-to-tag-virtually template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr tag-attr='{"part":"cea-item", "class": "item"}'>
                <template>
                        <td part=cenai-name-type-default-values class=name-type-default>
                            <hr part=cenaintdv-attr-line>
                            <div part=cenaintdv-attr-value class=attr-value>Attribute: <strong>{{name}}</strong></div>
                            <hr part=cenaintdv-type-line>
                            <div part=cenaintdv-type-value class=type-value>Type: {{type.text ?? '-'}}</div>
                            <hr part=cenaintdv-default-line>
                            <div part=cenaintdv-default-value class=default-value>Default: {{default ?? '-' }}</div>
                        </td>
                        <td part=cenai-description-value class=description>
                            <hr>
                            <div part=cenaidv-label class=description-label>Description</div>
                            {{description ?? '-'}}
                        </td>
                        
                </template>
            </li-bid>
            <table part=ce-attributes class="narrow attributes">
                <caption part=cea-title class=title>Attributes</caption>
                <tbody -repeat>
                </tbody>
            </table>
        </template>
    </if-diff> 

    <!-- Events -->
    <p-p-x from-parent-or-host observe-prop=events to=if-diff.events[-iff] m=2></p-p-x>
    <p-p-x from-parent-or-host observe-prop=events to=li-bid.events[-list] m=1></p-p-x>
    <if-diff class=events -iff is-non-empty-array and-media-matches="(min-width: 600px)" lazy-display lazy-delay=200>
        <template>
            <li-bid class=events bind-to-tag-virtually template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr tag-attr='{"part":"cee-item", "class": "item"}'>
                <template>
                        <td part=ceei-name-value class=name>{{name}}</td>
                        <td part=ceei-description-value class=description>{{description ?? '-'}}</td>
                        <td part=ceei-type-value class=type data-len="{{type.text.length ?? '0'}}">{{type.text ?? '-'}}</td>
                        <td part=ceei-inherited-from-value class=inherited-from>{{inheritedFrom.name}} ({{inheritedFrom.module ?? 'NA'}})</td>
                        <td></td>
                </template>
            </li-bid>
            <table part=ce-events class=events>
                <caption part=cee-title class=title>Events</caption>
                <thead>
                    <tr part=cee-header class=header>
                        <th part=ceeh-name-label class=name>Event</th>
                        <th part=ceeh-description-label class=description>Description</th>
                        <th part=ceeh-type-label class=type>Type</th>
                        <th part=ceeh-inherited-from-label class=inherited-from>Inherited From</th>
                    </tr>
                </thead>
                <tbody -repeat>
                </tbody>
            </table>
        </template>
    </if-diff>
    <if-diff class=events -iff is-non-empty-array and-media-matches="(max-width: 599px)" lazy-display lazy-delay=200>
        <template>
            <li-bid class=events bind-to-tag-virtually template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr tag-attr='{"part":"cee-item", "class": "item"}'>
                <template>
                        <td part=ceei-name-type-default-values class=name-type-default>
                            <hr part=ceeintdv-event-line>
                            <div part=ceeintdv-event-value class=attr-value>Event: <strong>{{name}}</strong></div>
                            <hr part=ceeintdv-type-line>
                            <div part=ceeintdv-type-value class=type-value>Type: {{type.text ?? '-'}}</div>
                            <!-- <hr part=ceeintdv-default-line>
                            <div part=ceeintdv-default-value class=default-value>Default: {{default ?? '-' }}</div> -->
                        </td>
                        <td part=ceei-description-value class=description>
                            <hr>
                            <div part=ceeidv-label class=description-label>Description</div>
                            {{description ?? '-'}}
                        </td>
                        
                </template>
            </li-bid>
            <table part=ce-events class="narrow events">
                <caption part=cee-title class=title>Events</caption>
                <tbody -repeat>
                </tbody>
            </table>
        </template>
    </if-diff> 

    <!-- properties -->
    <p-p-x from-parent-or-host observe-prop=members val-filter="$[?(@.kind=='field' && @.privacy!='private' && @.static!=true)]" to=if-diff.props[-iff] m=2></p-p-x>
    <p-p-x from-parent-or-host observe-prop=members val-filter="$[?(@.kind=='field' && @.privacy!='private' && @.static!=true)]" to=li-bid.props[-list] m=1></p-p-x>
    <if-diff class=props -iff is-non-empty-array and-media-matches="(min-width: 600px)" lazy-display lazy-delay=200>
        <template>
            <li-bid class=props bind-to-tag-virtually template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr tag-attr='{"part":"cep-item", "class": "item"}'>
                <!-- property values -->
                <template>
                    <td part=cepi-name-value class=name>{{name}}</td>
                    <td part=cepi-description-value class=description data-len="{{description.length ?? '0'}}">{{description ?? '-'}}</td>
                    <td part=cepi-type-text-value class=type-text data-len="{{type.text.length ?? '0'}}">{{type.text ?? '-'}}</td>
                    <td part=cepi-default-value class=default data-len="{{default.length ?? '0'}}">{{default ?? '-' }}</td>
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
    <if-diff class=props -iff is-non-empty-array and-media-matches="(max-width: 599px)" lazy-display lazy-delay=200>
        <template>
            <li-bid class=props bind-to-tag-virtually template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr tag-attr='{"part":"cep-item", "class": "item"}'>
                <!-- property values -->
                <template>
                    <td part=cenpi-name-type-default-values class=name-type-default>
                        <hr part=cenpintdv-prop-line>
                        <div part=cenpintdv-property-value class=property-value>Property: <strong>{{name}}</strong></div>
                        <hr part=cenpintdv-type-line>
                        <div part=cenpintdv-type-value class=type-value>Type: {{type.text ?? '-'}}</div>
                        <hr part=cenpintdv-default-line>
                        <div part=cenpintdv-default-value class=default-value>Default: {{default ?? '-' }}</div>
                        <hr>
                    </td>
                    <td part=cenpi-description-value class=description data-len="{{description.length ?? '0'}}">
                        <hr>
                            <div part=cenpidv-label class=description-label>Description</div>
                        {{description ?? '-'}}
                    </td>
                </template>
            </li-bid>
            <table part=ce-narrow-properties class="narrow properties" part=properties>
                <caption part=cenp-title class=title>Properties</caption>
                <tbody -repeat></tbody>
            </table>
        </template>
    </if-diff>

    <!-- slots -->
    <p-p-x from-parent-or-host observe-prop=slots to=if-diff.slots[-iff] m=1></p-p-x>
    <p-p-x from-parent-or-host observe-prop=slots to=li-bid.slots[-list] m=1></p-p-x>
    <if-diff class=slots -iff is-non-empty-array lazy-display lazy-delay=200>
        <template>
            <li-bid class=slots bind-to-tag-virtually template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr tag-attr='{"part":"ces-item", "class": "item"}'>
                <template>
                        <td part=cesi-name-value class=name>{{name}}</td>
                        <td part=cesi-description-value class=description>{{description ?? '-'}}</td>
                </template>
            </li-bid>
            <table part=ce-slots class=slots>
                <caption part=ces-title class=title>Slots</caption>
                <thead>
                    <tr part=ces-header class=header>
                        <th part=cesh-slot-label class=name>Slot</th>
                        <th part=cesh-description-label class=description>Description</th>
                    </tr>
                </thead>
                <tbody -repeat>
                </tbody>
            </table>
        </template>
    </if-diff>

    <!-- CSS Props -->
    <p-p-x from-parent-or-host observe-prop=cssProperties to=if-diff.css-props[-iff] m=1></p-p-x>
    <p-p-x from-parent-or-host observe-prop=cssProperties to=li-bid.css-props[-list] m=1></p-p-x>
    <if-diff class=css-props -iff is-non-empty-array lazy-display lazy-delay=200>
        <template>
            <li-bid class=css-props bind-to-tag-virtually template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr tag-attr='{"part":"ces-item", "class": "item"}'>
                <template>
                        <td part=cesi-name-value class=name>{{name}}</td>
                        <td part=cesi-description-value class=description>{{description ?? '-'}}</td>
                </template>
            </li-bid>
            <table part=ce-css-props class=css-props>
                <caption part=cecp-title class=title>CSS Properties</caption>
                <thead>
                    <tr part=cecp-header class=header>
                        <th part=cecph-css-prop-label class=name>CSS Property</th>
                        <th part=cecph-description-label class=description>Description</th>
                    </tr>
                </thead>
                <tbody -repeat>
                </tbody>
            </table>
        </template>
    </if-diff>

    
    <!-- methods -->
    <p-p-x from-parent-or-host observe-prop=members val-filter="$[?(@.kind=='method')]" to=if-diff.methods[-iff] m=2></p-p-x>
    <p-p-x from-parent-or-host observe-prop=members val-filter="$[?(@.kind=='method')]" to=li-bid.methods[-list] m=1></p-p-x>
    <if-diff class=methods -iff is-non-empty-array and-media-matches="(min-width: 600px)" lazy-display lazy-delay=200>
        <template>
            <li-bid class=methods bind-to-tag-virtually template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr tag-attr='{"part":"cem-item", "class": "item"}'>
                <template>
                        <td part=cemi-name-value class=name>{{name}}</td>
                        <td part=cemi-description-value class=description  data-len="{{description.length ?? '0'}}">{{description ?? '-'}}</td>
                        <td part=cemi-type-text-value class=text data-len="{{type.text.length ?? '0'}}">{{type.text ?? '-'}}</td>
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
                            <li-bid bind-to-tag-virtually template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr>
                                <template>
                                    <td>{{name}}</td>
                                    <td data-len="{{type.text.length ?? '0'}}">{{type.text ?? '-'}}
                                </template>
                            </li-bid>
                            <table part=cemipv-details class=details>
                                <!-- <caption part=cemipvd-title class=title>Parameters</caption> -->
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
                        <th part=cemh-type-label class=description data-len="{{type.text.length ?? '0'}}">Type</th>
                        <th part=cemh-inherited-from-label class=inherited-from>Inherited From</th>
                        <th part=cemh-parameters-label class=parameters>Parameters</th>
                    </tr>
                </thead>
                <tbody -repeat>
                </tbody>
            </table>
        </template>
    </if-diff>
    <if-diff class=methods -iff is-non-empty-array and-media-matches="(max-width: 599px)" lazy-display lazy-delay=200>
        <template>
            <li-bid class=methods bind-to-tag-virtually template-id=innerTemplate render-at-start-of=[-repeat] -list tag=tr tag-attr='{"part":"cenm-item", "class": "item"}'>
                <template>
                        <td part=cenmi-name-value class=name-value>
                            <hr>
                            <div>Method: <strong>{{name}}</strong></div>
                        </td>
                        <td part=cenmi-description-value class=description  data-len="{{description.length ?? '0'}}">
                            <hr>
                            <div class=description-label>Description</div>
                            {{description ?? '-'}}
                        </td>
                </template>
            </li-bid>
            <table part=ce-narrow-methods class="narrow methods">
                <caption part=cenm-title class=title>Methods</caption>
                <tbody -repeat>
                </tbody>
            </table>
        </template>
    </if-diff>    
</template>
<c-c copy from-prev-sibling string-props='["name", "description", "kind", "_tagName"]' obj-props='["members", "_attributes", "events", "slots", "cssProperties"]' noshadow></c-c>



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
        },
        package: {
            dry: true,
            type: String,
        }
    },
    mainTemplate,
    noShadow: true,
});
