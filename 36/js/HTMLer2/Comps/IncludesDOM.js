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
    `<div id="HTMLer" data-htmler data-view>
        <div data-htmler="view-elemstylecss" style="display:none;"></div>
        <div data-htmler="view-mainpropscss" style="display:none;"></div>
        <div data-htmler="view-propscss" style="display:none;"></div>
        <div data-htmler="view-valscss" style="display:none;"></div>
        <div data-htmler="view-inputstyle" style="display:none;"></div>
        <div data-htmler="view-elemshtml" style="display:none;"></div>
        
    </div>`
)
