import {html} from 'xtal-element/lib/html.js';
import {def} from 'd-fine/def.js';
import {mainTemplate} from './wc-info-base.js';
import {WCInfoBaseProps} from './types.d.js';

const styleTemplate = html `
<style>
.inherited-from{
    display: none;
}
tr:nth-child(2n) {
    background-color: var(--even-row-bg-color, #f8f8f8);
}
* {
    -webkit-font-smoothing: antialiased;
    font-family: var(--main-font, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace);
}
table caption.title{
    text-align: left;
    font-size: 24px;
    font-weight: 400;
}
table{
    width: 100%;
    margin-bottom:12px;
    margin-top:12px;
}
table.details caption.title{
    font-size: 14px;
}
h1{
    text-align: center;
}
[data-len="0"]{
    text-align: center;
}
.description-label{
    text-align:center;
}
table.narrow td{
    vertical-align: top;
}
table.narrow .description-label{
    text-decoration: underline;
}
if-diff[lazy-delay]{
    min-height:1000px;
    display:block;
}

</style>
`;

def<WCInfoBaseProps>(mainTemplate, {
    as: 'wc-info',
    strProps: ['href'],
    styleTemplate: styleTemplate,
});
