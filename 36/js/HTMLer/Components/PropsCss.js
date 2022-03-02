import {_, __} from './scripts.js'
import * as Props_Vals from '../MainPropsCSS.js'


// =====================================
export class PropsCss {
    constructor() {}
    // 
    addPropsCss() {
        let props = Object.keys(Props_Vals.pvCSS)
        props.forEach( (el, i, arr) => {
            arr[i] = `<li>${el}</li>`
        })
        _('[data-htmler="props-css"]').innerHTML = `${props.join('\n')}`
    }
}


// 
// ==============================
// 
const propscss = new PropsCss()
propscss.addPropsCss()

