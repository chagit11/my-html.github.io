import * as scripts from './scripts.js'
import {_, __} from './scripts.js'
import { SelectElemsHtml } from './SelectElemsHtml.js'
import { viewstyles } from './ViewStyles.js'


// --- OperTags
export class OperTags {
    constructor() {}
    // --- getElems
    getElems(parElem) {
        let arrElems = [] 
        let getElemsArr = (parEl) => {
            for(let el of parEl.children) {
                arrElems.push(el)
                getElemsArr(el) 
            }
        }
        getElemsArr(parElem)
        arrElems.unshift(parElem)
        return arrElems
    }
    // --- getClassNamesTabs
    getClassNamesTabs(parElem) {
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
        let elems = this.getElems(parElem)
        elems.forEach( (el, i, arr) => {
            let tab = ''
            if(el!=parElem) tab = '\t'.repeat(getTabs(el))
            let cls = el.className.length!=0 ? `.${el.className.split(' ').join('.')}` : ''
            let tag = `<span>${el.tagName=='DIV' ? '' : el.tagName.toLowerCase()}</span>`
            let tagcls = `${tab}${tag}${cls}`
            arr[i] = tagcls
        })
        // 
        return elems
    }
    //  --- showTags
    showTags(tags) {
        _('[data-htmler="view-tags"]').innerHTML = `
            <div>${tags.map((el) => `<pre>${el}</pre>`).join('\n')}</div>
            <button style="background:#c94c12;">Copy</button>`
        _('[data-htmler="view-tags"]').style.display = 'flex'
    }
    // --- hideTags
    hideTags(etarget) {
        if(etarget==_('[data-htmler="view-tags"]')) {
            _('[data-htmler="view-tags"]').style.display = 'none'
        }
    }
    // --- setDataSlctOff
    setDataSlctOff(etarget) {
        let ind
        let previewtags = [...__('[data-htmler="view-tags"] > div pre')]
        if(previewtags.includes(etarget)) {
            previewtags.forEach( (el, i) => {
                if(etarget==el) ind = i
            })
        }
        return ind
    }
    // --- viewStylesTags
    viewStylesTags(parElem) {
        let tabs = this.getClassNamesTabs(parElem).map(el => el.split('\t').length)
        let styles = this.getElems(parElem).map(el => el.style.cssText)
        __('[data-htmler="view-tags"] pre').forEach( (el, i, arr) => {
            let tab = '\n'+'\t'.repeat(tabs[i])
            let style = styles[i]!='' ? tab +''+ styles[i].split(';').map(el=> el.trim()).slice(0,-1).join(tab) +'\t' : ''
            el.insertAdjacentHTML('beforeend', `<b>${style}</b>`)
        })
    }
    // --- showViewStylesTags
    showViewStylesTags(etarget) {
        if([...__('[data-htmler="view-tags"] pre')].includes(etarget)) {
            if(etarget.querySelector('b').style.display=='inline') {
                etarget.querySelector('b').style.display = 'none'
            } 
            else etarget.querySelector('b').style.display = 'inline'
        }
    }
    // --- showAllViewStylesTags
    showAllViewStylesTags(disp) {
        __('[data-htmler="view-tags"] pre').forEach( (el, i, arr) => {
            el.querySelector('b').style.display = disp
        })
    }
    // --- 
    showViewStylesFromTag(targets, etarget, parElem) {
        if([...targets].includes(etarget)) {
            viewstyles.showViewStyles('flex')
            let ind
            targets.forEach( (el, i, arr) => {
                if(el==etarget) ind = i
            })
            viewstyles.showStylesTextarea(this.getElems(parElem)[ind])
        }
    }
}

//  --- CopyTags
export class CopyTags {
    constructor() {}
    //
    copyTags(copyElem) {
        let copytags = navigator.clipboard.writeText(copyElem.textContent)
        copytags.then(
            () => _('[data-htmler="view-tags"] > button').style.background = 'green',
            () => _('[data-htmler="view-tags"] > button').style.background = 'red'
        )
    }
}





// 
// ======================================
// 
const opertags = new OperTags()
const setKeys = new Set()
const copytags = new CopyTags()
// 
let elems, ind
// 
let genShowAllViewStylesTags = scripts.generator(['inline', 'none'])


// --- keydown / keyup ===========================
new scripts.EventListeners('keydown', (e) => {
    e.preventDefault()
    setKeys.add(e.code)
    if(setKeys.has('Space')) {
        opertags.showTags(
            opertags.getClassNamesTabs(_('[data-htmler="select-on"]'))
        )
        elems = opertags.getElems(_('[data-htmler="select-on"]'))
        // 
        opertags.viewStylesTags(_('[data-htmler="select-on"]'))
    }
});
new scripts.EventListeners('keyup', (e) => {setKeys.delete(e.code)});

// 
// ==================EvListenOperTags===================
// 
new scripts.EvListenOperTags('click', (e) => {
    opertags.showViewStylesTags(e.target)
    opertags.hideTags(e.target)
    // 
    if(setKeys.has('KeyA')) opertags.showAllViewStylesTags(genShowAllViewStylesTags('+'))
    if(setKeys.has('KeyQ')) opertags.showViewStylesFromTag(__('[data-htmler="view-tags"] pre'), e.target, _('[data-htmler="select-on"]'))
    if(e.target==_('[data-htmler="view-tags"] > button')) {
        copytags.copyTags(_('[data-htmler="view-tags"] div'))
    } 
});

new scripts.EvListenOperTags('dblclick', (e) => {
    opertags.showViewStylesFromTag(__('[data-htmler="view-tags"] pre b'), e.target, _('[data-htmler="select-on"]'))
});


new scripts.EvListenOperTags('mouseover', (e) => {
    ind = opertags.setDataSlctOff(e.target)
    if([...__('[data-htmler="view-tags"] pre')].includes(e.target)) {
        new SelectElemsHtml().setDataSelectOff(elems[ind])
    }
});




