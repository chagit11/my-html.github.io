export const _ = document.querySelector.bind(document)
export const __ = document.querySelectorAll.bind(document)
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

// --- EventListeners --- 
export class EventListeners {
    constructor(type, func) {
        if(type!='keydown' && type!='keyup') {
            __('header, main, footer').forEach( (el) => {
                el.addEventListener(type, (e) => {
                    func(e)
                })
            })
        }
        else {
            _('body').addEventListener(type, (e) => {
                if(_('#HTMLer input')!=document.activeElement 
                    && _('#HTMLer textarea')!=document.activeElement) {
                    func(e)
                } 
            })
        }
    }
}

// --- EvListenContextMenu --- 
export class EvListenContextMenu {
    constructor(type, func) {
        _('[data-htmler="contextmenu"]').addEventListener(type, (e) => {
            func(e)
        })
    }
}

// --- EvListenOperTags --- 
export class EvListenOperTags {
    constructor(type, func) {
        _('[data-htmler="view-tags"]').addEventListener(type, (e) => {
            func(e)
        })
    }
}



// --- EvListen HTMLer --- 
export class EvListenHTMLer {
    constructor(type, func) {
        _('#HTMLer').addEventListener(type, (e) => {
            func(e)
        })
    }
}
