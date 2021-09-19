import {WCInfoBase} from './wc-info-base.js';
import {def} from 'trans-render/lib/def.js';

export class WCInfo extends WCInfoBase{
    static is = 'wc-info';
    noshadow = false;
}
def(WCInfo);