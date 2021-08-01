import { ClassField, CustomElementDeclaration, Declaration , CustomElement} from 'node_modules/custom-elements-manifest/schema.d.js';
import {WCInfoPackageBase} from './wc-info-package-base.js';
export interface WCInfoPackageProps{
  href?: string | undefined;
  self: WCInfoPackageBase;
}

export interface WCInfoBaseProps{
  href?: string | undefined;
  self: WCInfoBaseProps;
}

export interface WCInfoFetchProps extends HTMLElement {
  tag: string | undefined;
  tagNameToDeclaration: {[key: string]: Declaration};
  declarations: Declaration[];
  customElement: CustomElement;
  fields: EnhancedClassField[] | undefined;
}

export interface EnhancedClassField extends ClassField{
  val: any;
}