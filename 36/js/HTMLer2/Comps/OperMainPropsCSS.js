import { _, __ } from './scripts.js'



export class OperMainPropsCSS {
    constructor() {}
    // --- 
    setPropValCSS(elem, prop, val) {
        elem.style[prop] = val
    }
    // --- getComputedValCSS
    getComputedValCSS(elem, prop, comp) {
        let valcomp = getComputedStyle(elem)[prop]
        let num = Math.round( parseFloat(valcomp) )
        let drct = comp.split(' ')[0]
        let step = +comp.split(' ')[1]
        if(drct=='+') num = num + step
        if(drct=='-') num = num - step
        let val = `${num}px`
        return val
    }
    // --- 
    colorSelectCSS(itemsMode, clsItem, itemStyle) {
        itemsMode.forEach( (el, i, arr) => {
            if(el.textContent==itemStyle) {
                el.classList.add(clsItem)
            }
            else el.classList.remove(clsItem)
        })
    }
}

// 
