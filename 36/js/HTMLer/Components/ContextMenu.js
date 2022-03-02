import * as scripts from './scripts.js'
import {_, __} from './scripts.js'


export class ContextMenu {
    constructor() {}
    //
    showContextMenu() {
        if(_('[data-htmler="select-on"]')) {
            _('[data-htmler="contextmenu"]').style.cssText = `display:flex;`
        }
    }
    // 
    hideContextMenu(elem, elems) {
        let arrElems = []
        elems.forEach( els => {
            els.forEach( el => {
                arrElems.push(el)
            })
        })
        if(arrElems.includes(elem)) {
            _('[data-htmler="contextmenu"]').style.cssText = `display:none;`
        }
        
    }
}

// 
// ==================================
// 
const contextmenu = new ContextMenu()

// --- contextmenu ===========================
new scripts.EventListeners('contextmenu',
(e) => {
    e.preventDefault()
    // 
    contextmenu.showContextMenu()
});


// 
// >>>>>>>>>>>>>>>>>>> [Contextmenu] >>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 
// --- EvListenContextMenu ===========================
new scripts.EvListenContextMenu('click',
(e) => {
    // --- hideContextMenu
    contextmenu.hideContextMenu(e.target, [
        __('[data-htmler="contextmenu"]'),
        __('[data-htmler="props-css"] li'),
    ])    
}); 