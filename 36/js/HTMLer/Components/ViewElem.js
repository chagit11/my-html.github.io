import * as scripts from './scripts.js'
import {_, __} from './scripts.js'



export class ViewElem {
    constructor() {}
    //
    addNameElem(tag, cls) {
        _('[data-htmler="view-elem"]').innerHTML = `
            <span>${tag}</span>
            <span>${cls}</span>
        `
    }
    // 
    posViewElem(x, y) {
        _('[data-htmler="view-elem"]').style.cssText = `
            left: ${x+10}px; top: ${y+10}px;
        `
    }
    // 
    selectedOnElem(elem) {
        if(elem.getAttribute('data-htmler')=='select-on') {
            _('[data-htmler="view-elem"]').style.outline = '3px solid yellow'
        }
    }
}


// 
// =====================================
// 
const viewelem = new ViewElem()

// --- click ===========================
new scripts.EventListeners('click', 
(e) => {
    viewelem.selectedOnElem(e.target)
});

// --- mousemove ===========================
new scripts.EventListeners('mousemove',
(e) => {
    viewelem.addNameElem(e.target.tagName, e.target.classList[0])
    viewelem.posViewElem(e.clientX, e.clientY)
    viewelem.selectedOnElem(e.target)
});
