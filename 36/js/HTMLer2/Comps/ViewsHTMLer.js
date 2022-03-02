import { _, __, setkeys, SetDataView, generator } from './scripts.js'
import { EventsHeaderMainFooter as onDOM, EventsHTMLer as onHTML } from './scripts.js'
import { MainPropsCSS } from '../MainPropsCSS.js'
import { OperElemsHTML } from './OperElemsHTML.js'
import { OperMainPropsCSS } from './OperMainPropsCSS.js'


// --- ViewsHTMLer ---
class ViewsHTMLer {
    constructor() {}
    // -- selectoffHTML
    selectoffHTML(elem) {
        __(`[data-htmler="select-off"]`).forEach( (el) => {
            if(el.getAttribute('data-htmler')=='select-off') {
                el.removeAttribute('data-htmler')
            }
        })
        if(elem.getAttribute('data-htmler')!='select-on') {
            elem.setAttribute('data-htmler', 'select-off')
        }
    }
    // -- selectonHTML
    selectonHTML(elem, more) {
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
    // -- viewElemStyleCSS
    viewElemStyleCSS(slcton) {
        _('[data-htmler="view-elemstylecss"]').style.display = 'block'
        _('[data-htmler="view-elemstylecss"]').innerHTML = `
            <elemstyle>
                <nameelem>
                    ${new OperElemsHTML().getNameElem(
                        new OperElemsHTML().getNamesElemsHTML(slcton)[0]
                    )}
                </nameelem>
                <styleelem>${new OperElemsHTML().getStyleElem(
                        new OperElemsHTML().getElemsHTML(slcton)[0]
                    ).map(el=>'<propval>\t<prop>'+el.split(':')[0]+'</prop> : <val>'+(el.split(':')[1] || '')+'</val></propval>').join('')}</styleelem>
            </elemstyle>`
    }
    // -- viewMainPropsCSS
    viewMainPropsCSS(slcton) {
        let mainprops
        if(slcton) {
            _('[data-htmler="view-mainpropscss"]').style.display = 'flex'
            mainprops = Object.keys(MainPropsCSS)
            _('[data-htmler="view-mainpropscss"]').innerHTML = `
                <mainprops>
                    ${mainprops.map(el=>`<mainprop>${el}</mainprop>`).join('\n')}
                </mainprops>`
        }
        // -- color select mainprop
        let colorSelectMainPropsCSS = (mainprop) => {
            new OperMainPropsCSS().colorSelectCSS(
                __('[data-htmler="view-mainpropscss"] mainprop'),
                'mainpropscss-mainprop_',
                mainprop
            )
        }
        return [generator([...mainprops]), colorSelectMainPropsCSS]
    }
    // -- viewPropsCSS
    viewPropsCSS(mainprop) {
        _('[data-htmler="view-propscss"]').style.display = 'block'
        let props = Object.keys(MainPropsCSS[mainprop])
        _('[data-htmler="view-propscss"]').innerHTML = `
            <props>
                ${props.map(el=>'<prop>'+el+'</prop>').join('')}
            </props>`
        // -- color select prop
        let colorSelectPropsCSS = (prop) => {
            new OperMainPropsCSS().colorSelectCSS(
                __('[data-htmler="view-propscss"] prop'),
                'propscss-prop_',
                prop
            )
        }
        return [generator([...props]), colorSelectPropsCSS]
    }
    // -- viewValsCSS
    viewValsCSS(mainprop, prop) {
        _('[data-htmler="view-valscss"]').style.display = 'block'
        let vals = [...MainPropsCSS[mainprop][prop], getComputedStyle(_('[data-htmler="select-on"]'))[prop]]
        _('[data-htmler="view-valscss"]').innerHTML = `
            <vals>
                <val contenteditable="true"></val>
                ${vals.map(el=>'<val>'+el+'</val>').join('')}
            </vals>`
        // -- color select val
        let colorSelectValsCSS = (val) => {
            new OperMainPropsCSS().colorSelectCSS(
                __('[data-htmler="view-valscss"] val'),
                'valscss-val_',
                val
            )
        }
        return [generator([...vals]), colorSelectValsCSS]
    }
    // -- viewInputStyle
    viewInputStyle() {
        new SetDataView(_('[data-htmler="view-inputstyle"]'))
        console.log('viewInputStyle')
    }
    // -- viewElemsHTML
    viewElemsHTML(slcton) {
        new SetDataView(_('[data-htmler="view-elemshtml"]'))
        _('[data-htmler="view-elemshtml"]').style.display = 'flex'
        // 
        let getelems = new OperElemsHTML().getElemsHTML(slcton),
            getnames = new OperElemsHTML().getNamesElemsHTML(slcton),
            gettabs = new OperElemsHTML().getTabsElemsHTML(slcton)
        let nameel = new OperElemsHTML().getNameElem,
            styleel = new OperElemsHTML().getStyleElem
        _('[data-htmler="view-elemshtml"]').innerHTML = `
            <wrapper>
                ${[...getelems].map((elem,i,arr)=> `
                    <tagname>${gettabs[i]}${nameel(getnames[i])}</tagname>
                    <attrstyle>${styleel(getelems[i]).map(el=>gettabs[i]+'\t'+el).join('')}</attrstyle>`
                ).join('')}
            </wrapper>`
        // 
        __('[data-htmler="view-elemshtml"] tagname').forEach( (el, i, arr) => {
            if(el.textContent.split('//').length>1) {
                el.innerHTML = el.textContent.split('//')[0]+'<span>// '+el.textContent.split('//')[1] || ''+'</span>'
            } 
        })
        __('[data-htmler="view-elemshtml"] attrstyle').forEach( (el, i, arr) => {
            if(el.textContent.trim()!='') {
                el.innerHTML = el.textContent.trimRight().split('\n').map(prop=> '<span>'+prop.split(':')[0]+'</span> : <strong>'+prop.split(':')[1]+'</strong>').join('\n')
            }
        })
    }
    // 
    // -- hide
    hideShowView(viewelem, hs, dataview) {
        if(dataview) new SetDataView(dataview)
        viewelem.style.display = hs
    }
}




// 
// ==============================================
const viewshtmler = new ViewsHTMLer();
// ==============================================
let mainprop, prop, val;
let gen_viewMainPropsCSS, colorSelectMainPropsCSS,
    gen_viewPropsCSS, colorSelectPropsCSS,
    gen_viewValsCSS, colorSelectValsCSS;
//////////////mouseover onDOM/////////////////////////
new onDOM('mouseover', e => {
    // -- select-off
    viewshtmler.selectoffHTML(e.target)
});
//////////////click onDOM////////////////////////////
new onDOM('click', e => {
    // -- select-on
    viewshtmler.selectonHTML(e.target, false)
    // -- click => hide mainpropscss / propscss / valscss = data-view HTMLer
    viewshtmler.hideShowView(_('[data-htmler="view-elemstylecss"]'), 'none')
    viewshtmler.hideShowView(_('[data-htmler="view-mainpropscss"]'), 'none')
    viewshtmler.hideShowView(_('[data-htmler="view-propscss"]'), 'none')
    viewshtmler.hideShowView(_('[data-htmler="view-valscss"]'), 'none')
    new SetDataView(_('#HTMLer'))
});
////////////keydown onDOM//////////////////////////////
new onDOM('keydown', e => {

    // === HTMLer ===
    if(_('#HTMLer').hasAttribute('data-view')) {
        if(setkeys.has('KeyD')) {
            // -- view main props
            [gen_viewMainPropsCSS, colorSelectMainPropsCSS] = viewshtmler.viewMainPropsCSS(_('[data-htmler="select-on"]')) 
            // -- data-view mainpropscss
            new SetDataView(_('[data-htmler="view-mainpropscss"]'))
            // -- view elem style
            viewshtmler.viewElemStyleCSS(_('[data-htmler="select-on"]'))
        } 
    }
});
////////////////////////////////////////////////////
////////////////////////////////////////////////////
///////////////////keydown onHTML///////////////////
new onHTML('keydown', e => {

    // === view-mainpropscss ===
    if(_('#HTMLer [data-htmler="view-mainpropscss"]').hasAttribute('data-view')) {
        if(setkeys.has('KeyE')) {
            // -- select mainprop
            mainprop = gen_viewMainPropsCSS('-');
                // -- color mainprop
                colorSelectMainPropsCSS(mainprop);
                // -- view props
                [gen_viewPropsCSS, colorSelectPropsCSS] = viewshtmler.viewPropsCSS(mainprop)
        } if(setkeys.has('KeyC')) {
            // -- select mainprop
            mainprop = gen_viewMainPropsCSS('+');
                // -- color mainprop
                colorSelectMainPropsCSS(mainprop);
                // -- view props
                [gen_viewPropsCSS, colorSelectPropsCSS] = viewshtmler.viewPropsCSS(mainprop)
        } 
        // 
        if(setkeys.has('KeyF')) {
            // -- data-view propscss
            if(mainprop) new SetDataView(_('[data-htmler="view-propscss"]'))
        }
    }
    // 
    // === view-propscss ===
    else if(_('#HTMLer [data-htmler="view-propscss"]').hasAttribute('data-view')) {
        if(setkeys.has('KeyE')) {
            // -- select prop
            prop = gen_viewPropsCSS('-')
                // -- color prop
                colorSelectPropsCSS(prop);
                // -- view vals
                [gen_viewValsCSS, colorSelectValsCSS] = viewshtmler.viewValsCSS(mainprop, prop)
        } if(setkeys.has('KeyC')) {
            // -- select prop
            prop = gen_viewPropsCSS('+')
                // -- color prop
                colorSelectPropsCSS(prop);
                // -- view vals
                [gen_viewValsCSS, colorSelectValsCSS] = viewshtmler.viewValsCSS(mainprop, prop)
        } 
        // 
        if(setkeys.has('KeyF')) {
            // -- data-view valscss
            if(prop) new SetDataView(_('[data-htmler="view-valscss"]'))
        }
        if(setkeys.has('KeyS')) {
            // -- data-view mainpropscss
            new SetDataView(_('[data-htmler="view-mainpropscss"]'))
            // -- hide valscss
            viewshtmler.hideShowView(_('[data-htmler="view-valscss"]'), 'none')
        }
    }
    // 
    // === view-valscss ===
    else if(_('#HTMLer [data-htmler="view-valscss"]').hasAttribute('data-view')) {
        if(setkeys.has('KeyE')) {
            // -- select val
            val = gen_viewValsCSS('-')
                // -- color val
                colorSelectValsCSS(val)
                // -- set style val
                _('[data-htmler="select-on"]').style[prop] = val
                // -- view elem style
                viewshtmler.viewElemStyleCSS(_('[data-htmler="select-on"]'))
        } if(setkeys.has('KeyC')) {
            // -- select val
            val = gen_viewValsCSS('+')
                // -- color val
                colorSelectValsCSS(val)
                // -- set style val
                _('[data-htmler="select-on"]').style[prop] = val
                // -- view elem style
                viewshtmler.viewElemStyleCSS(_('[data-htmler="select-on"]'))
        } 
        // 
        if(setkeys.has('KeyS')) {
            // -- data-view propscss
            new SetDataView(_('[data-htmler="view-propscss"]'))
        }
    }
    // 
    // // === view-inputstyle ===
    // else if(_('#HTMLer [data-htmler="view-inputstyle"]').hasAttribute('data-view')) {
        
    // }
    // 
    // // === view-elemshtml ===
    // else if(_('#HTMLer [data-htmler="view-elemshtml"]').hasAttribute('data-view')) {
        
    // }

});
////////////////click onHTML//////////////////////////////////
new onHTML('click', e => {
    // -- click mainprops => 
    if([...__('[data-htmler="view-mainpropscss"] mainprop')].includes(e.target)) {
        mainprop = e.target.textContent;
            // -- color mainprop
            colorSelectMainPropsCSS(mainprop);
            // -- view props
            [gen_viewPropsCSS, colorSelectPropsCSS] = viewshtmler.viewPropsCSS(mainprop)
        // -- hide valscss
        viewshtmler.hideShowView(_('[data-htmler="view-valscss"]'), 'none')
        // -- data-view mainpropscss
        new SetDataView(_('[data-htmler="view-mainpropscss"]'))
    }
    // -- click props => 
    if([...__('[data-htmler="view-propscss"] prop')].includes(e.target)) {
        prop = e.target.textContent;
            // -- color prop
            colorSelectPropsCSS(prop);
            // -- view vals
            [gen_viewValsCSS, colorSelectValsCSS] = viewshtmler.viewValsCSS(mainprop, prop)
        // -- data-view propscss
        new SetDataView(_('[data-htmler="view-propscss"]'))
    }
    // -- click vals => 
    if([...__('[data-htmler="view-valscss"] val')].includes(e.target)) {
        val = e.target.textContent
            // -- color val
            colorSelectValsCSS(val)
        // -- data-view valscss
        new SetDataView(_('[data-htmler="view-valscss"]'))
        // -- set style val
        _('[data-htmler="select-on"]').style[prop] = val
        // -- view elem style
        viewshtmler.viewElemStyleCSS(_('[data-htmler="select-on"]'))
    }
    // 
    // -- click mainpropscss => hide
    if(e.target==_('[data-htmler="view-mainpropscss"]')) viewshtmler.hideShowView(_('[data-htmler="view-mainpropscss"]'), 'none', _('#HTMLer'))
    // -- click mainpropscss => hide
    if(e.target==_('[data-htmler="view-elemshtml"]')) viewshtmler.hideShowView(_('[data-htmler="view-elemshtml"]'), 'none', _('[data-htmler="view-mainpropscss"]'))

    
});


