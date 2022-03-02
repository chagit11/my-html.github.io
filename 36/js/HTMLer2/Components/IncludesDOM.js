import {_, __} from './scripts.js'



// ===================================
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
    `<div id="HTMLer" data-htmler>
        <div data-htmler="view-elem" style="display:none;"></div>
        <div data-htmler="contextmenu" style="display:none;">
            <ul data-htmler="props-css"></ul>
        </div>
        <ul data-htmler="view-css" style="display:none;"></ul>
        <div data-htmler="view-tags" style="display:none;"></div>
        <div data-htmler="view-styles" style="display:none;"></div>
    </div>`
)
