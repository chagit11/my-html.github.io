import * as scripts from './scripts.js'
import {_, __} from './scripts.js'


export class ViewStyles {
    constructor() {}
    // --- showViewStyles 
    showViewStyles(disp) {
        if(_('[data-htmler="select-on"]')) {
            _('[data-htmler="view-styles"]').style.display = disp
            _('[data-htmler="view-styles"]').innerHTML = `
                <input type="text" value>
                <textarea></textarea>
                <button style="background:#c94c12;">Copy</button>`
        } 
    }
    // --- showStylesTextarea
    showStylesTextarea(elem) {
        if(elem) {
            let getClassName = elem.className
            let getStyles = elem.style.cssText
            _('[data-htmler="view-styles"] input')
                .value = getClassName
            _('[data-htmler="view-styles"] textarea')
                .innerHTML = getStyles.split('; ').join(';\n')
        }
        return this.selectElem = elem
    }
    // --- setStylesFromTextarea
    setStylesFromTextarea(elem) {
        let getClassName = _('[data-htmler="view-styles"] input').value
        let getStylesFromTextarea = _('[data-htmler="view-styles"] textarea').value
        elem.className = getClassName
        elem.style.cssText = getStylesFromTextarea
    }
}

export class CopyStyles {
    constructor() {}
    // --- 
    copyStyles(copyElem) {
        let copystyles = navigator.clipboard
            .writeText(copyElem.textContent.split(';').join(''))
        copystyles.then(
            () => _('[data-htmler="view-styles"] > button').style.background = 'green',
            () => _('[data-htmler="view-styles"] > button').style.background = 'red'
        )
    }
}





// 
// ============================ 
// 

export const viewstyles = new ViewStyles()
const setKeys = new Set()
const copystyles = new CopyStyles()
// 



// --- keydown / keyup ===========================
new scripts.EventListeners('keydown', (e) => {
    e.preventDefault()
    setKeys.add(e.code)
    if(setKeys.has('KeyD')) {
        viewstyles.showViewStyles('flex')
        viewstyles.showStylesTextarea(_('[data-htmler="select-on"]'))
    }
});
new scripts.EventListeners('keyup', (e) => {setKeys.delete(e.code)});

// 
// ==============EvListenHTMLer===============
// 
new scripts.EvListenHTMLer('click', (e) => {
    if(e.target==_('[data-htmler="view-styles"]')) {
        viewstyles.setStylesFromTextarea(viewstyles.selectElem)
        viewstyles.showViewStyles('none')
    }
    if(e.target==_('[data-htmler="view-styles"] > button')) {
        copystyles.copyStyles(_('[data-htmler="view-styles"] textarea'))
    }
});