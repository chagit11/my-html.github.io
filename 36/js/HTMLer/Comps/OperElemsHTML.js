import { _, __, setkeys, SetDataMode } from './scripts.js'
import { EventsHeaderMainFooter as onDOM, EventsHTMLer as onHTML } from './scripts.js'


export class OperElemsHTML {
    constructor() {}
    // -- viewElemsHTML
    viewElemsHTML(elem) {
        _('operelemshtml').style.display = 'flex'
        // 
        let getelems = this.getElemsHTML(elem),
            getnames = this.getNamesElemsHTML(elem),
            gettabs = this.getTabsElemsHTML(elem);
        let nameel = this.getNameElem,
            styleel = this.getStyleElem;
        _('operelemshtml').innerHTML = `
            <elemsstyles>
                ${[...getelems].map((elm,i,arr)=> `
                    <nameelem>${gettabs[i]}${nameel(getnames[i])}</nameelem>
                    <styleelem>${styleel(getelems[i]).map(el=>gettabs[i]+'\t'+el+'\n').join('')}</styleelem>`
                ).join('')}
            </elemsstyles>`
        // 
        __('operelemshtml nameelem').forEach( (el, i, arr) => {
            if(el.textContent.split('//').length>1) {
                el.innerHTML = '<mainname>'+el.textContent.split('//')[0]+'</mainname><morename>// '+el.textContent.split('//')[1] || ''+'</morename>'
            } 
        })
        __('operelemshtml styleelem').forEach( (el, i, arr) => {
            if(el.textContent.trim()!='') {
                el.innerHTML = el.textContent.trimRight().split('\n').map(prop=> '<prop>'+prop.split(':')[0]+'</prop>:<val>'+prop.split(':')[1]+'</val>').join('\n')
            }
        })
    }
    // --- get ElemsHTML
    getElemsHTML(parElem) {
        let arrElems = [parElem] 
        let addElems = (parEl) => {
            for(let el of parEl.children) {
                arrElems.push(el)
                addElems(el) 
            }
        }
        addElems(parElem)
        return arrElems
    }
    // --- getTabs ElemsHTML
    getTabsElemsHTML(parElem) {
        let t = 1
        let getTabs = (chEl) => {
            if(chEl.parentElement!=parElem) {
                getTabs(chEl.parentElement)
                t++
            }
            if(chEl.parentElement==parElem) t = 1
            return t
        }
        // 
        let arrTabs = []
        let elems = this.getElemsHTML(parElem)
        elems.forEach( el => {
            let tab = ''
            if(el!=parElem) tab = '\t'.repeat(getTabs(el))
            arrTabs.push(tab)
        })
        return arrTabs
    }
    // --- getNames ElemsHTML
    getNamesElemsHTML(parElem) {
        let arrNames = []
        let elems = this.getElemsHTML(parElem)
        elems.forEach( el => {
            let cls = el.className.length!=0 ? `.${el.className.split(' ').join('.')}` : ''
            let tag = `${el.tagName.toLowerCase()}`
            let tagcls = `${tag}${cls}`
            arrNames.push(tagcls)
        })
        return arrNames
    }
    // --- getName Elem
    getNameElem(getname) {
        let nms = getname.split('.'),
            after = nms[0]!='div' ? [nms[0], ...nms.splice(2).map(el=>'.'+el)] : [...nms.splice(2).map(el=>'.'+el)]
        return nms.length==1 ? nms[0] : '.'+nms[1] +' // '+ after.join(', ')
    }
    // --- getStyle Elem
    getStyleElem(elem) {
        return elem.style.cssText.split(';').map(el=>el.trim())
    }
}



// =========================================
const operelemshtml = new OperElemsHTML()
// =========================================


//////////////keydown onDOM/////////////////////////
new onDOM('keydown', e => {
    if(_('#HTMLer').hasAttribute('data-mode')) {
        if(setkeys.has('KeyA')) {
            operelemshtml.viewElemsHTML(_('[data-htmler="select-on"]'))
            new SetDataMode(_('operelemshtml'))
        }
    }
    
});
//////////////click onDOM/////////////////////////
new onHTML('click', e => {
    // -- hide operelemshtml
    if(e.target==_('operelemshtml')) {
        _('operelemshtml').style.display = 'none'
        new SetDataMode(_('#HTMLer'))
    }
});




