import {_, __} from './scripts.js'
import * as scripts from './scripts.js'
import {generator} from './scripts.js'
import * as Props_Vals from '../PropsVals.js'




// --- GetCss
export class GetCss {
    constructor() {}
    // --- select main prop
    getMainProp(etarget) {
        let mainProp = etarget.textContent
        let propsvals = Props_Vals.pvCSS[mainProp]
        let genProp = generator(Object.keys(propsvals))
        return [mainProp, propsvals, genProp]
    }
    // --- select prop 
    getProp(genProp, propsvals) {
        let prop = genProp
        let vals = propsvals[genProp]
        let genVal = generator(vals)
        return [prop, vals, genVal]
    }
    // --- from propsvals -> get props
    getProps(propsvals) {
        let props = Object.keys(propsvals)
        return props
    }
    // --- get computed val
    getComputedVal(prop, comp) {
        let getVal = getComputedStyle(_('[data-htmler="select-on"]'))[prop]
        let num = Math.round( parseFloat(getVal) )
        let drct = comp.split(' ')[0]
        let step = +comp.split(' ')[1]
        if(drct=='+') num = num + step
        if(drct=='-') num = num - step
        let val = `${num}px`
        return val
    }

}

// --- SetCss
export class SetCss {
    constructor() {}
    // --- set 'prop: val;' -> 'select-on'
    setPropCss(prop, val) {
        __('[data-htmler="select-on"]').forEach( (el, i, arr) => {
            el.style.cssText += `${prop}: ${val};`
        })
        return `${prop}: ${val};`
    }
    // --- remove 'prop: val;' -> 'select-on'
    removePropCss(prop) {
        let valStyle = []
        let nullStyle = []
        __('[data-htmler="select-on"]').forEach( el => {
            valStyle.push(el.style[prop])
            nullStyle.push(null)
        })
        let gen = generator([nullStyle, valStyle])
        return function () {
            let val = gen('+')
            __('[data-htmler="select-on"]').forEach( (el, i) => {
                el.style[prop] = val[i]
            })
        }
    }
    // --- remove props 'style=' -> 'select-on'
    removePropsCss() {
        let valStyle = []
        let nullStyle = []
        __('[data-htmler="select-on"]').forEach( el => {
            valStyle.push(el.style.cssText)
            nullStyle.push(null)
        })
        let gen = generator([nullStyle, valStyle])
        console.log(gen('+'))
        return function () {
            let val = gen('+')
            __('[data-htmler="select-on"]').forEach( (el, i) => {
                el.style.cssText = val[i]
            })
        }
    }
}


// --- ViewCss
export class ViewCss {
    constructor() {}
    // --- show/hide 'view-css'
    showhideViewCss(disp) {
        _('[data-htmler="view-css"]').style.display = disp
    }
    // --- switch show/hide 'view-css'
    switchShowhideViewCss(disp1, disp2) {
        return generator([disp1, disp2])
    }
    // --- add props -> 'view-css'
    insertProps(props) {
        let propsli = props.map( (el) => `<li>${el}</li>`)
        _('[data-htmler="view-css"]').innerHTML = propsli.join('\n')
        this.showhideViewCss('block')
    }
    // --- add 'prop: val;' -> 'view-css'
    insertPropVal(prop, val) {
        _('[data-htmler="view-css"]')
            .innerHTML = `<span><b>${prop}</b>: ${val};</span>`
        this.showhideViewCss('block')
    }
    // --- set color selected prop
    setColorProp(prop) {
        __('[data-htmler="view-css"] li').forEach( el => {
            el.style.cssText = ''
            if(el.textContent==prop) {
                el.style.color = '#ff00f2'
            }
        })
    }
}

// 
// ==================================
// 
const getcss = new GetCss()
const setcss = new SetCss()
const viewcss = new ViewCss()
const setKeys = new Set()
// 
let mainProp, propsvals, genProp, 
    prop, vals, genVal, 
    val
let genPropStyle, genPropsStyle
// let switchShowhide
// 


// --- keydown / keyup ===========================
new scripts.EventListeners('click',
(e) => {
    viewcss.showhideViewCss('none')
});
// --- keydown / keyup ===========================
new scripts.EventListeners('keydown',
(e) => {
    e.preventDefault()
    setKeys.add(e.code)
    // -- switch 'props-css'
    // if(setKeys.has('KeyD')) {
    //     switchShowhide('+')()
    // }
    // -- select props
    if(setKeys.has('KeyE')) {
        [prop, vals, genVal] = getcss.getProp(genProp('-'), propsvals)
        viewcss.insertProps(getcss.getProps(propsvals))
        viewcss.setColorProp(prop) 
        // genPropStyle = setcss.removePropCss(prop) //
        // genPropsStyle = setcss.removePropsCss() //
    }if(setKeys.has('KeyC')) {
        [prop, vals, genVal] = getcss.getProp(genProp('+'), propsvals)
        viewcss.insertProps(getcss.getProps(propsvals))
        viewcss.setColorProp(prop) 
        // genPropStyle = setcss.removePropCss(prop) //
        // genPropsStyle = setcss.removePropsCss() //
    }
    // -- select vals
    if(setKeys.has('KeyS')) {
        val = genVal('-') 
        viewcss.insertPropVal(prop, val)
        setcss.setPropCss(prop, val) 
        // genPropStyle = setcss.removePropCss(prop) //
        // genPropsStyle = setcss.removePropsCss() //
    }if(setKeys.has('KeyF')) {
        val = genVal('+') 
        viewcss.insertPropVal(prop, val)
        setcss.setPropCss(prop, val) 
        // genPropStyle = setcss.removePropCss(prop) //
        // genPropsStyle = setcss.removePropsCss() //
    }
    // -- compute vals
    if(setKeys.has('KeyR')) {
        val = getcss.getComputedVal(prop, '+ 1')
        setcss.setPropCss(prop, val)
        viewcss.insertPropVal(prop, val) 
        // genPropStyle = setcss.removePropCss(prop) //
        // genPropsStyle = setcss.removePropsCss() //
    }if(setKeys.has('KeyW')) {
        val = getcss.getComputedVal(prop, '- 1')
        setcss.setPropCss(prop, val)
        viewcss.insertPropVal(prop, val) 
        // genPropStyle = setcss.removePropCss(prop) //
        // genPropsStyle = setcss.removePropsCss() //
    }if(setKeys.has('KeyV')) {
        val = getcss.getComputedVal(prop, '+ 10')
        setcss.setPropCss(prop, val)
        viewcss.insertPropVal(prop, val) 
        // genPropStyle = setcss.removePropCss(prop) //
        // genPropsStyle = setcss.removePropsCss() //
    }if(setKeys.has('KeyX')) {
        val = getcss.getComputedVal(prop, '- 10')
        setcss.setPropCss(prop, val)
        viewcss.insertPropVal(prop, val) 
        // genPropStyle = setcss.removePropCss(prop) //
        // genPropsStyle = setcss.removePropsCss() //
    }
    // 
    if(setKeys.has('KeyG')) {
        // genPropStyle()
    }if(setKeys.has('KeyH')) {
        // genPropStyle() 
    }
});
new scripts.EventListeners('keyup',
(e) => {setKeys.delete(e.code)});

// 
// >>>>>>>>>>>>>>>>>>> [Contextmenu] >>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 
// --- EvListenContextMenu ===========================
new scripts.EvListenContextMenu('click',
(e) => {
    // --- props-css
    __('[data-htmler="props-css"] li').forEach( el => {
        if(e.target==el) {
            // get props/prop ---
            [mainProp, propsvals, genProp] = getcss.getMainProp(e.target)
            // show/hide props/vals ---
            viewcss.insertProps(getcss.getProps(propsvals))
            viewcss.showhideViewCss('block')
            // 
            // switchShowhide = viewcss.switchShowhideViewCss(
            //     ()=> viewcss.showhideViewCss('none'),
            //     ()=> viewcss.showhideViewCss('block')
            // )
        } 
    })
    
}); 












 