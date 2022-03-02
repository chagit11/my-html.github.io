

export class OperElemsHTML {
    constructor() {
        this.countTabsElems = 1
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
    getStyleElem(getels) {
        return getels.style.cssText.split(';').map(el=>el.trim()+'\n')
    }
}

