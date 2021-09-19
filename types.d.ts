import { ClassField, CustomElementDeclaration, Declaration , CustomElement, CssCustomProperty, CssPart, ClassMember} from 'node_modules/custom-elements-manifest/schema.d.js';
import {XtalFetchLiteProps} from 'xtal-fetch/types';
// export interface WCInfoPackageProps{
//   href?: string | undefined;
//   self: WCInfoPackageBase;
// }

export interface WCInfoBaseProps{
  href?: string | undefined;
  self: WCInfoBaseProps;
}

export interface WCInfoFetchProps{
  tag: string | undefined;
  tagNameToDeclaration: {[key: string]: CustomElementDeclaration};
  declarations: Declaration[];
  customElement: CustomElement;
  fields: EnhancedClassField[];
  cssProps: CssCustomProperty[];
  cssParts: CssPart[];
  methods: ClassMember[];
}

export interface WCInfoFetchActions{
  getTagNameToDeclaration(self: this): {
    tagNameToDeclaration: {[key: string]: CustomElementDeclaration},
    declarations: Declaration[];
  } | undefined;
  getFields(self: this): {
    fields: EnhancedClassField[],
    customElement: CustomElement,
  } | undefined;

}

export interface EnhancedClassField extends ClassField{
  val: any;
}