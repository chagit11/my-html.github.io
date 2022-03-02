import { _, __, setkeys } from './scripts.js'
import { EventsHeaderMainFooter as onDOM, EventsHTMLer as onHTML } from './scripts.js'
import { OperElemsHTML } from './OperElemsHTML.js'


// --- OperElemsDOM ---
export class OperElemsDOM {
    constructor() {}
    // -- viewSelectElemDOM
    viewSelectElemDOM(elem) {
        _('operelemsdom').style.display = 'block'
        _('operelemsdom').innerHTML = `
            <nameelem>
                ${'<mainname>'+ new OperElemsHTML().getNameElem(
                    new OperElemsHTML().getNamesElemsHTML(elem)[0]
                ).split('//').join('</mainname><allname>//') +'</allname>'}
            </nameelem>`
    }
    // -- moveViewSelectElemDOM
    moveViewSelectElemDOM(ex, ey) {
        _('operelemsdom').style.cssText += `
            left: ${ex+10}px; top: ${ey+10}px;`
    }
    // -- selectoffDOM
    selectoffDOM(elem) {
        __(`[data-htmler="select-off"]`).forEach( (el) => {
            if(el.getAttribute('data-htmler')=='select-off') {
                el.removeAttribute('data-htmler')
            }
        })
        if(elem.getAttribute('data-htmler')!='select-on') {
            elem.setAttribute('data-htmler', 'select-off')
        }
    }
    // -- selectonDOM
    selectonDOM(elem) {
        __(`[data-htmler="select-on"]`).forEach( (el) => {
            el.removeAttribute('data-htmler')
        })
        if(elem.getAttribute('data-htmler')!='select-on') {
            elem.setAttribute('data-htmler', 'select-on')
        }
        else if(elem.getAttribute('data-htmler')=='select-on') {
            elem.setAttribute('data-htmler', 'select-off')
        } 
    }

}





// ==============================================
const operelemsdom = new OperElemsDOM();
// ==============================================

//////////////mouseover onDOM/////////////////////////
new onDOM('mousemove', e => {
    operelemsdom.moveViewSelectElemDOM(e.clientX, e.clientY)
});
//////////////mouseover onDOM/////////////////////////
new onDOM('mouseover', e => {
    // -- view select elem
    operelemsdom.viewSelectElemDOM(e.target)
    if(e.target==_('[data-htmler="select-on"]')) {
        _('operelemsdom nameelem').style.cssText +='color: orange;'
    }
    // -- select-off
    operelemsdom.selectoffDOM(e.target)
});
//////////////click onDOM////////////////////////////
new onDOM('click', e => {
    // -- select-on
    operelemsdom.selectonDOM(e.target)
    // -- select-on nameelem
    if(e.target==_('[data-htmler="select-on"]')) {
        _('operelemsdom nameelem').style.cssText +='color: orange;'
    }
});

