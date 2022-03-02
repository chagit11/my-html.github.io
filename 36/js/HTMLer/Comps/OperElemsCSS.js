import { _, __, SetDataMode, setkeys, generator } from './scripts.js'
import { EventsHeaderMainFooter as onDOM, EventsHTMLer as onHTML } from './scripts.js'
import { MainPropsCSS } from '../MainPropsCSS.js'
import { OperElemsDOM } from './OperElemsDOM.js'
import { OperElemsHTML } from './OperElemsHTML.js'


// --- OperElemsCSS ---
class OperElemsCSS {
    constructor() {}
    // -- viewElemStyleCSS
    viewElemStyleCSS(elem) {
        _('operelemscss').style.display = 'grid'
        _('operelemscss').innerHTML = `
            <wrapper>
                <elemstyle>
                    <nameelem>
                        ${'<mainname>'+ new OperElemsHTML().getNameElem(
                            new OperElemsHTML().getNamesElemsHTML(elem)[0]
                        ).split('//').join('</mainname><allname>//') +'</allname>'}
                    </nameelem>
                    <styleelem>
                        ${new OperElemsHTML().getStyleElem(
                            new OperElemsHTML().getElemsHTML(elem)[0]
                        ).map(el=>'<propval>\t<prop>'+el.split(':')[0]+'</prop>:<val>'+(el.split(':')[1] || '')+'</val></propval>').slice(0, -1).reverse().join('')}
                    </styleelem>
                    <copystylesass>Copy</copystylesass>
                </elemstyle>
                <mainprops>
                    ${Object.keys(MainPropsCSS).map(el=>`<mainprop>${el}</mainprop>`).join('\n')}
                </mainprops>
                <props>
                    
                </props>
            </wrapper>`
        new SetDataMode(_('operelemscss styleelem'))
    }
    // -- viewPropsCSS
    selectPropsCSS(mainprop) {
        let props = Object.keys(MainPropsCSS[mainprop])
        _('operelemscss props').innerHTML = `
            ${props.map(el=>'<prop>'+el+'</prop>').join('')}
        `
    }
    // -- setPropCSS
    setPropCSS(elem, prop) {
        let valDefault = window.getComputedStyle(elem)[prop]
        elem.style[prop] = valDefault
    }
    // -- removePropCSS
    removePropCSS(elem, prop) {
        elem.style[prop] = null
    }
    // -- setValCSS
    setValCSS(elem, prop, val) {
        elem.style[prop] = val
    }
    // -- setTextStyleCSS
    setTextStyleCSS(elem, csstext) {
        elem.style.cssText = csstext
    }
    // -- inputStyleCSS
    inputStyleCSS(elem, mode) {
        if(mode=='input') {
            _('operelemscss elemstyle styleelem').innerHTML = `
                <inputstyle>
                    <textarea>${
                        elem.style.cssText.split(';').map(el=>el.trim()!='' ? el.trim()+';' : '').reverse().join('\n')+'\n'
                    }</textarea>
                    <buttons>
                        <backpropsvals><<</backpropsvals>
                        <copy>
                            <copycss>Copy CSS</copycss>
                            <copysass>Copy SASS</copysass>
                        </copy>
                        <save>Save</save>
                    </buttons>
                </inputstyle>`
        } 
        if(mode=='propsvals') {
            _('operelemscss elemstyle styleelem').innerHTML = `
                ${new OperElemsHTML().getStyleElem(
                    new OperElemsHTML().getElemsHTML(elem)[0]
                ).map(el=>'<propval>\t<prop>'+el.split(':')[0]+'</prop> :<val>'+(el.split(':')[1] || '')+'</val></propval>').slice(0, -1).reverse().join('')}`
        } 
    }
    // -- getComputedValCSS
    setComputedValCSS(elem, prop, comp) {
        let valcomp = getComputedStyle(elem)[prop]
        let num = Math.round( parseFloat(valcomp) )
        let step = parseFloat(comp)
        let drct = comp.split(parseFloat(comp))[1]
        if(drct=='+') num = num + step
        if(drct=='-') num = num - step
        let val = `${num}px`
        elem.style[prop] = val
        return val
    }
    // 
    // -- copyPropsValsCSS
    copyPropsValsCSS(csstext) {
        navigator.clipboard.writeText(csstext).then(
            ()=> console.log('save'),
            ()=> console.log('error')
        )
    }
}




// 
// ==============================================
const operelemscss = new OperElemsCSS();
// ==============================================
let mainprop, prop, vals, val;
let gen_val;
let firstSelecton = _('.header *');
////////////keydown onDOM//////////////////////////////
new onDOM('keydown', e => {
    // === HTMLer ===
    if(_('#HTMLer').hasAttribute('data-mode')) {
        if(setkeys.has('KeyD')) {
            // -- view elem style
            operelemscss.viewElemStyleCSS(_('[data-htmler="select-on"]'))
            // -- dat-mode
            new SetDataMode(_('operelemscss styleelem'))
        } 
    }
});
////////////////////////////////////////////////////
///////////////////keydown onHTML///////////////////
new onHTML('keydown', e => {
    // === oper styleelem ===
    operStyleelem_keydown(e)
    // === oper nameelem ===
    operNameel_keydown(e)
});
////////////////mouseover onHTML////////////////
new onHTML('mouseover', e => {
    // === operStyleelem_mouseover ===
    operStyleelem_mouseover(e)
});
////////////////click onHTML////////////////////
new onHTML('click', e => {
    // === operStyleelem_click ===
    operStyleelem_click(e)
    // === operNameel_click ===
    operNameel_click(e)
});
////////////////////dblclick////////////////
new onHTML('dblclick', e => {
    // === operStyleelem_dblclick ===
    operStyleelem_dblclick(e)
});

///////////////////////////////////////////////
////////////////////Styleelem//////////////////
///////////////////////////////////////////////
// === keydown styleelem
function operStyleelem_keydown(e) {
    if(!_('[contenteditable]')){
        // === operelemscss-styleelem ===
        if(_('operelemscss styleelem').hasAttribute('data-mode')) {
            if(setkeys.has('KeyS')) {
                val = gen_val('-')
                console.log(val)
                operelemscss.setValCSS(_('[data-htmler="select-on"]'), prop, val)
                operelemscss.viewElemStyleCSS(_('[data-htmler="select-on"]'))
            } if(setkeys.has('KeyF')) {
                val = gen_val('+')
                operelemscss.setValCSS(_('[data-htmler="select-on"]'), prop, val)
                operelemscss.viewElemStyleCSS(_('[data-htmler="select-on"]'))
            }
            // -- count val +, - 
            if(setkeys.has('KeyW')) {
                operelemscss.setComputedValCSS(_('[data-htmler="select-on"]'), prop, '1-')
                operelemscss.inputStyleCSS(_('[data-htmler="select-on"]'), 'propsvals')
            } if(setkeys.has('KeyR')) {
                operelemscss.setComputedValCSS(_('[data-htmler="select-on"]'), prop, '1+')
                operelemscss.inputStyleCSS(_('[data-htmler="select-on"]'), 'propsvals')
            }
            if(setkeys.has('KeyX')) {
                operelemscss.setComputedValCSS(_('[data-htmler="select-on"]'), prop, '10-')
                operelemscss.inputStyleCSS(_('[data-htmler="select-on"]'), 'propsvals')
            } if(setkeys.has('KeyV')) {
                operelemscss.setComputedValCSS(_('[data-htmler="select-on"]'), prop, '10+')
                operelemscss.inputStyleCSS(_('[data-htmler="select-on"]'), 'propsvals')
            }
            // --- input style
            if(setkeys.has('KeyA')) {
                operelemscss.inputStyleCSS(_('[data-htmler="select-on"]'), 'input')
            }
            
        }
    }
}
// === mouseover styleelem
function operStyleelem_mouseover(e) {
     // -- mouseover mainprops => 
     if([...__('operelemscss mainprops mainprop')].includes(e.target)) {
        mainprop = e.target.textContent
        operelemscss.selectPropsCSS(mainprop)
    }
}
// === click styleelem
function operStyleelem_click(e) {
    // -- click operelemscss => 
    if(e.target==_('operelemscss')) {
        // hide operelemscss
        _('operelemscss').style.display = 'none'
        // -- mode
        new SetDataMode(_('#HTMLer'))
    }
    // -- click props => 
    if([...__('operelemscss props prop')].includes(e.target)) {
        prop = e.target.textContent
        operelemscss.setPropCSS(_('[data-htmler="select-on"]'), prop)
        operelemscss.inputStyleCSS(_('[data-htmler="select-on"]'), 'propsvals')
        vals = MainPropsCSS[mainprop][prop]
        console.log(vals)
        gen_val = generator(vals)
    }
    // -- click styleelem > prop => 
    if([...__('operelemscss styleelem prop')].includes(e.target)) {
        prop = e.target.textContent
        let valElem = e.target.parentElement.querySelector('val')
        valElem.removeAttribute('contenteditable')
        val = valElem.textContent
        operelemscss.setValCSS(_('[data-htmler="select-on"]'), prop, val)
        vals = MainPropsCSS[Object.keys(MainPropsCSS).find(el=> prop in MainPropsCSS[el])][prop]
        gen_val = generator(vals)
    }
    // -- click styleelem > val => 
    if([...__('operelemscss styleelem val')].includes(e.target)) {
        e.target.setAttribute('contenteditable','true')
    }
    // -- click => modeActive
    if([...__('operelemscss styleelem'), 
        ...__('operelemscss styleelem *'), 
        ...__('operelemscss mainprops mainprop'), 
        ...__('operelemscss props prop')].includes(e.target)) {
            new SetDataMode(_('operelemscss styleelem'))
            _('operelemscss elemstyle styleelem').style.opacity = '1'
            _('operelemscss elemstyle nameelem mainname').style.color = '#00ff37'
    }
    // -- click inputstyle '<<' =>
    if([...__('operelemscss styleelem inputstyle backpropsvals ')].includes(e.target)) {
        operelemscss.inputStyleCSS(_('[data-htmler="select-on"]'), 'propsvals')
    }
    // -- click inputstyle 'save' =>
    if([...__('operelemscss styleelem inputstyle save')].includes(e.target)) {
        operelemscss.setTextStyleCSS(
            _('[data-htmler="select-on"]'), 
            _('operelemscss styleelem inputstyle textarea').value
        )
        operelemscss.inputStyleCSS(_('[data-htmler="select-on"]'), 'propsvals')
    }
    // -- click propsvals 'copystylesass' =>
    if([...__('operelemscss copystylesass')].includes(e.target)) {
        let nametext = _('operelemscss nameelem').textContent.trim()
        let csstext = _('[data-htmler="select-on"]').style.cssText.split(';').map(el=>'\t'+el.trim()).reverse().join('\n')
        operelemscss.copyPropsValsCSS(nametext +''+ csstext)
    }
    // -- click inputstyle 'copycss' =>
    if([...__('operelemscss styleelem inputstyle copycss')].includes(e.target)) {
        let csstext = _('operelemscss styleelem inputstyle textarea').value
        operelemscss.copyPropsValsCSS(csstext)
    }
    // -- click inputstyle 'copysass' =>
    if([...__('operelemscss styleelem inputstyle copysass')].includes(e.target)) {
        let csstext = _('operelemscss styleelem inputstyle textarea').value.split(';').join('')
        operelemscss.copyPropsValsCSS(csstext)
    }
}
// === dblclick styleelem
function operStyleelem_dblclick(e) {
    // dblclick propval =>
    if([...__('operelemscss styleelem propval')].includes(e.target)) {
        prop = e.target.querySelector('prop').textContent
        operelemscss.removePropCSS(_('[data-htmler="select-on"]'), prop)
        operelemscss.viewElemStyleCSS(_('[data-htmler="select-on"]'))
    }
}
///////////////////////////////////////////////
////////////////////Nameel/////////////////////
///////////////////////////////////////////////
// === click nameelem
function operNameel_click(e) {
    if([...__('operelemscss elemstyle nameelem mainname')].includes(e.target)) {
        _('operelemscss elemstyle styleelem').style.opacity = '0.3'
        e.target.style.color = 'orange'
        if(_('operelemscss nameelem').hasAttribute('data-mode')) firstSelecton = _('[data-htmler="select-on"]')
        // -- data-mode
        new SetDataMode(_('operelemscss nameelem'))
    }

}
// === keydow nameelem
function operNameel_keydown(e) {
    if(_('operelemscss nameelem').hasAttribute('data-mode')) {
        if(setkeys.has('KeyE')) {
            new OperElemsDOM().selectonDOM(_('[data-htmler="select-on"]').parentElement)
        }
        if(setkeys.has('KeyC')) {
            new OperElemsDOM().selectonDOM(_('[data-htmler="select-on"]').children[0] || _('[data-htmler="select-on"]'))
        }
        if(setkeys.has('KeyS')) {
            new OperElemsDOM().selectonDOM(_('[data-htmler="select-on"]').previousElementSibling || _('[data-htmler="select-on"]'))
        }
        if(setkeys.has('KeyF')) {
            new OperElemsDOM().selectonDOM(_('[data-htmler="select-on"]').nextElementSibling || _('[data-htmler="select-on"]'))
        }
        if(setkeys.has('KeyD')) {
            new OperElemsDOM().selectonDOM(firstSelecton)
        }
        operelemscss.viewElemStyleCSS(_('[data-htmler="select-on"]'))
        _('operelemscss elemstyle nameelem mainname').style.color = 'orange'
        _('operelemscss elemstyle styleelem').style.opacity = '0.3'
    }
}