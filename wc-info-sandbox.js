export class WCInfoSandbox extends HTMLElement {
    connectedCallback() {
        import('https://unpkg.com/@github/details-menu-element@0.9.0/dist/index.umd.js').then();
        {
            this.appendChild('details-menu));
        }
    }
}
customElements.define('wc-info-sandbox', WCInfoSandbox);
