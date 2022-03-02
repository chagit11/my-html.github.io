import * as scripts from './scripts.js'
import {_, __} from './scripts.js'


// ===================================
// --- SelectElemsHtml ---
export class SelectElemsHtml {
    constructor() {}
    //
    setDataSelectOff(elem) {
        __(`[data-htmler="select-off"]`).forEach( (el) => {
                if(el.getAttribute('data-htmler')=='select-off') {
                    el.removeAttribute('data-htmler')
                }
        })
        if(elem.getAttribute('data-htmler')!='select-on') {
            elem.setAttribute('data-htmler', 'select-off')
        }
    }
    //
    setDataSelectOn(elem, more) {
        if(!more) {
            __(`[data-htmler="select-on"]`).forEach( (el) => {
                el.removeAttribute('data-htmler')
            })
        }
        if(elem.getAttribute('data-htmler')!='select-on') {
            elem.setAttribute('data-htmler', 'select-on')
        }
        else if(elem.getAttribute('data-htmler')=='select-on') {
            elem.setAttribute('data-htmler', 'select-off')
        } 
    }
}

// 
// ======================================
// 
const selectelemshtml = new SelectElemsHtml()
const setKeys = new Set()
// 
let select_on

// --- click ===========================
new scripts.EventListeners('click', (e) => {
    e.preventDefault()
    select_on = e.target
    selectelemshtml.setDataSelectOn(e.target, setKeys.has('KeyA'))
});

// --- mouseover ===========================
new scripts.EventListeners('mouseover', (e) => {
    selectelemshtml.setDataSelectOff(e.target)
});

// --- keydown / keyup ===========================
new scripts.EventListeners('keydown', (e) => {
    e.preventDefault()
    setKeys.add(e.code)
    if(setKeys.has('Numpad5')) selectelemshtml.setDataSelectOn(select_on, setKeys.has('KeyA'))
    if(setKeys.has('Numpad8')) selectelemshtml.setDataSelectOn(_('[data-htmler="select-on"]').parentElement, setKeys.has('KeyA'))
    if(setKeys.has('Numpad2')) selectelemshtml.setDataSelectOn(_('[data-htmler="select-on"]').children[0], setKeys.has('KeyA'))
    if(setKeys.has('Numpad4')) selectelemshtml.setDataSelectOn(_('[data-htmler="select-on"]').previousElementSibling, setKeys.has('KeyA'))
    if(setKeys.has('Numpad6')) selectelemshtml.setDataSelectOn(_('[data-htmler="select-on"]').nextElementSibling, setKeys.has('KeyA'))
});
new scripts.EventListeners('keyup', (e) => {setKeys.delete(e.code)});
