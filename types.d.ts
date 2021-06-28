import {WCInfoPackageBase} from './wc-info-package-base.js';
export interface WCInfoPackageProps{
  href?: string | undefined;
  self: WCInfoPackageBase;
}

export interface WCInfoBaseProps{
  href?: string | undefined;
  self: WCInfoBaseProps;
}