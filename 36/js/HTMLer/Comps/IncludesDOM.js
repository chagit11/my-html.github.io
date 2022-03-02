import { _, __ } from './scripts.js'


// --- IncludesDOM ---
export class IncludesDOM {
    constructor(elem, htmlCode, where='beforeend') {
        elem.insertAdjacentHTML(where, htmlCode)
    }
}
// 
// =======================================
// 

// --- head --- 
new IncludesDOM(
    _('head'), 
    `<link rel="stylesheet" href="./js/HTMLer/HTMLer.css"/>`
)
// --- body --- 
new IncludesDOM(
    _('body'), 
    `<div id="HTMLer" data-mode>
        <operelemsdom style="display:none;"></operelemsdom>
        <operelemscss style="display:none;"></operelemscss>
        <operelemshtml style="display:none;"></operelemshtml>
        
    </div>`
)
