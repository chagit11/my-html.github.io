export const _ = document.querySelector.bind(document)
export const __ = document.querySelectorAll.bind(document)

// --- new Set() ---
export const setkeys = new Set()

// ==================================
export function generator(arr) {
    let pos = -1
    return function(drct) {
        if(drct=='+') pos++
        if(drct=='-') pos--
        if(pos==arr.length) pos = 0
        if(pos<0) pos = arr.length - 1
        return arr[pos]
    }
}
// const f = generator(['a', 'b', 'c'])
// f('+)



// =================================
// --- Events=Header-Main-Footer --- 
export class EventsHeaderMainFooter {
    constructor(type, func) {
        if(type!='keydown' && type!='keyup') {
            __('header, main, footer').forEach( (el) => {
                el.addEventListener(type, (e) => {
                    if(!e.target.hasAttribute('contenteditable')) e.preventDefault()
                    func(e)
                })
            })
        }
        else {
            _('body').addEventListener(type, (e) => {
                if(_('#HTMLer input')!=document.activeElement 
                    && _('#HTMLer textarea')!=document.activeElement) {
                    if(!e.target.hasAttribute('contenteditable')) e.preventDefault()
                    setkeys.add(e.code)
                    func(e)
                } 
            })
            _('body').addEventListener('keyup', (e) => {
                if(_('#HTMLer input')!=document.activeElement 
                    && _('#HTMLer textarea')!=document.activeElement) {
                    setkeys.delete(e.code)
                } 
            })
        }
    }
}

// --- Events=HTMLer --- 
export class EventsHTMLer {
    constructor(type, func) {
        if(type!='keydown' && type!='keyup') {
            _('#HTMLer').addEventListener(type, (e) => {
                if(!e.target.hasAttribute('contenteditable')) e.preventDefault()
                func(e)
            })
        }
        else {
            _('body').addEventListener(type, (e) => {
                if(_('#HTMLer input')!=document.activeElement 
                    && _('#HTMLer textarea')!=document.activeElement) {
                    if(!e.target.hasAttribute('contenteditable')) e.preventDefault()
                    setkeys.add(e.code)
                    func(e)
                } 
            })
            _('body').addEventListener('keyup', (e) => {
                if(_('#HTMLer input')!=document.activeElement 
                    && _('#HTMLer textarea')!=document.activeElement) {
                    setkeys.delete(e.code)
                } 
            })
        }
    }
}


// --- Events ---
export const evs = (fun) => {
    return function(type, key='') {
        new EventsHeaderMainFooter(type, e => {
            if(key!='') {
                if(setkeys.has(key)) fun()
            }
            else {
                fun()
            } 
        })
        
    }
}



// --- Data View ---
export class SetDataView {
    constructor(htmler) {
        __('#HTMLer, #HTMLer *').forEach( (el) => {
            el.removeAttribute('data-view')
        })
        htmler.setAttribute('data-view','')
    }
}