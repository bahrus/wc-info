const jiife = require('jiife');
const xl = 'node_modules/xtal-latx/';
jiife.processFiles([xl + 'define.js', xl + 'xtal-latx.js', 'wc-info-base.js'], 'dist/wc-info-base.iife.js');
jiife.processFiles([xl + 'define.js', xl + 'xtal-latx.js', 'wc-info.js'], 'dist/wc-info.iife.js');