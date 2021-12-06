function _(slc) {
    let selector = document.querySelector(slc)
    return selector
}
function __(slc) {
    let selectors = document.querySelectorAll(slc)
    return selectors
}



// ----------------------------

class HTMLer {
    constructor() {
        this.set = new Set()
        this.mainOptions()
        this.pressKey()
        this.clickElem()
        this.onmouseoverElem()
    }
    // 
    mainOptions() {
        this.slctMode = 0
        // 
        _('head').insertAdjacentHTML('beforeend', `
            <style>
                .info__{
                    padding: 5px 10px; width:max-content; background:#cbf7d6;
                    position:fixed; bottom:20px; left:20px;
                    text-align:center; font-size:25px;
                }
                .onmouseover__ {outline: 2px dashed red !important;}
                .active__ {outline: 2px dashed blue !important;}

                #popup__ {display: flex;justify-content: center;align-items: center;position: fixed;top: 0;bottom: 0;left: 0;right: 0;z-index: 11;}
                #popup-bg__ {position: absolute;top: 0;bottom: 0;left: 0;right: 0;background: rgba(0, 0, 0, 0.5);}
                #popup__ *:last-of-type {z-index: 111;}
                #popup-container__ div{min-width:600px;margin-bottom:30px;font-size:35px;color:white;}
                #popup-container__ textarea{min-width:600px;height:400px;border:0;padding:10px 20px;background:black;font-size:30px;color:white;white-space:nowrap;}
                #popup-addText__{white-space:normal !important;}
            </style>
        `)
        _('body').insertAdjacentHTML('beforeend', `
            <div id="popup__" style="display:none;">
                <div id="popup-bg__"></div>
                <div id="popup-container__"></div>
            </div>
        `)
    }
    // 
    pressKey() {
        document.addEventListener('keydown', (e) => {
            this.set.add(e.code)
            // --- blocked keys
            if(_('#popup__ textarea')!=document.activeElement) e.preventDefault()
            // --- HTML off/on ---
            if(!_('#popup__ textarea')) {
                // --- activision HTMLer
                if(this.set.has('Space')) {
                    _('body').classList.toggle('htmler__')
                    // 
                    if(!_('.htmler__')) {
                        _('.onmouseover__').classList.remove('onmouseover__')
                        _('.active__').classList.remove('active__')
                    }
                } 
            }

            // --- HTMLer working...
            if(_('.htmler__')) {
                if(this.set.has('Escape')) {
                    if(!_('#popup__ textarea')) {
                        // --- show/hide popup
                        this.togglePopup('<div>+ тег:</div><textarea id="popup-addElem__"></textarea>')
                    } 
                    else if(_('#popup__ textarea')) {
                        if(_('#popup-addElem__')) this.addElem(_('.active__')) // - add element
                        if(_('#popup-rdctElem__')) this.rdctElem(_('.active__')) // - redact element
                        if(_('#popup-addText__')) this.addText(_('.active__')) // - add text
                        this.togglePopup('', 'hide')
                    } 
                }
                // --- select mode
                if(_('#popup__ textarea')) {
                    if(this.set.has('Tab')) {
                        e.preventDefault()
                        this.modeRedact()
                    }
                }
                // --- textarea not focus
                if(!_('#popup__ textarea')) {
                    // --- remove element 
                    if(this.set.has('Delete')) _('.active__').remove()
                    // --- switch active
                    if(this.set.has('Numpad5')) this.activeElem(_('body'))
                    if(this.set.has('Numpad8')) this.activeElem(_('.active__').parentElement)
                    if(this.set.has('Numpad2')) this.activeElem(_('.active__').children[0])
                    if(this.set.has('Numpad4')) this.activeElem(_('.active__').previousElementSibling)
                    if(this.set.has('Numpad6')) this.activeElem(_('.active__').nextElementSibling)
                    // --- styles 
                    if(this.set.has('KeyM')) {
                        this.margins(_('.active__'))
                    } 
                }
            }
            
            console.log(this.set)
        })
        document.addEventListener('keyup', (e) => {
            this.set.delete(e.code)
        })
    }
    // 
    onmouseoverElem() {
        __('header, main, footer').forEach( el => {
            el.addEventListener('mouseover', (e) => {
                if(_('.htmler__')) {
                    if(!e.target.classList.contains('active__')) e.target.classList.add('onmouseover__')
                } 
            })
            el.addEventListener('mouseout', (e) => {
                if(_('.htmler__')) e.target.classList.remove('onmouseover__')
            })
        })
    }
    // 
    clickElem() {
        _('body').addEventListener('click', (e) => {
            if(_('.htmler__')) {
                if(!_('#popup__ textarea')) this.activeElem(e.target)
            } 
        }) 
    }
    // 
    infoAct(send) {
        _('body').insertAdjacentHTML('beforeend', `
            <div class="info__">${send}</div>
        `)
        setTimeout(() => _('.info__').remove(), 1500)
    }
    // 
    activeElem(elem) {
            __('.active__').forEach((item) => item.classList.remove('active__'))
            elem.classList.remove('onmouseover__')
            elem.classList.add('active__') 
            // 
            let tag = elem.tagName.toLowerCase()!='div' ? elem.tagName.toLowerCase() : ''
            let clas = elem.classList[0]=='active__' ? '' : '.'+elem.classList[0]
            this.infoAct(tag+clas)
    }
    // 
    togglePopup(innerContainer, display='show') {
        if(display=='show') {
            _('#popup__').style.display = 'flex'
               _('#popup-container__').innerHTML = `
                   ${innerContainer}
               `
           _('#popup__ textarea').focus()
           _('#popup-bg__').onclick = () => _('#popup__ textarea').focus()
           _('#popup-bg__').ondblclick = () => {
               _('#popup__').style.display = 'none'
               _('#popup-container__').innerHTML = ''
           }
        }
        if(display=='hide') {
            _('#popup__').style.display = 'none'
               _('#popup-container__').innerHTML = ''
        }
    }
    // 
    modeRedact() {
        let modes = [
            ['+ тег:', 'popup-addElem__'], 
            ['Редактировать тег:', 'popup-rdctElem__'], 
            ['+ текст:', 'popup-addText__']
        ]
        this.slctMode++
        if(this.slctMode==modes.length) this.slctMode = 0
        _('#popup-container__ div').textContent = modes[this.slctMode][0]
        _('#popup-container__ textarea').id = modes[this.slctMode][1]
        // 
        if(modes[this.slctMode][1]=='popup-addElem__') _('#popup-addElem__').value = ''
        if(modes[this.slctMode][1]=='popup-rdctElem__') _('#popup-rdctElem__').value = this.valuesElem(_('.active__'))
        if(modes[this.slctMode][1]=='popup-addText__') _('#popup-addText__').value = _('.active__').textContent
    }
    // 
    valuesElem(trgtElem) {
        let html = {
            'tag': trgtElem.tagName.toLowerCase(),
            'cls': `.${trgtElem.classList[0]}`,
            attrs() {
                let arr = []
                for(let attr of trgtElem.attributes) {
                    if(attr.name!='class' && attr.name!='style') arr.push(attr.name+'='+attr.value)
                }
                return arr.join('>>')
            },
            'css': trgtElem.style.cssText.split(';').join(';\n'),
        }
        return html.tag+html.cls+'\n'+html.attrs()+'\n'+html.css
    }
    // 
    addElem(trgtElem) {
        let inp = _('#popup-addElem__').value.split("\n")
        //
        let html = {
            'tag': inp[0].split('.')[0] || 'div',
            'clas': inp[0].split('.')[1] || '',
            'attrs': inp[1].split('>>').map( (el, i, arrmap) => arrmap[i] = el.split('=') ),
            'css': inp.slice(2).map( (item) => item.trim() ).filter( (item) => item[item.length-1]===';' ).join('')
        }
        // 
        let elem = document.createElement(html.tag) // -- create element
        // 
        elem.className = html.clas // -- class
        if(html.attrs!='') html.attrs.map( (el) => elem.setAttribute(el[0], el[1]) ) // -- attributes 
        elem.style.cssText = html.css // -- style
        // if(elem.style.height==='') elem.style.height = '50px' // -- height = 50px
        // 
        trgtElem.append(elem) // -- add element
        this.activeElem(elem) 
        console.log(html.attrs)
    }
    // 
    rdctElem(trgtElem) {
        let inp = _('#popup-rdctElem__').value.split("\n")
        //
        let html = {
            'tag': inp[0].split('.')[0] || 'div',
            'clas': inp[0].split('.')[1] || '',
            'attrs': inp[1].split('>>').map( (el, i, arrmap) => arrmap[i] = el.split('=') ),
            'css': inp.slice(2).map( (item) => item.trim() ).filter( (item) => item[item.length-1]===';' ).join('')
        }
        // 
        let elem = document.createElement(html.tag) // -- create element
        // 
        elem.className = html.clas // -- class
        if(html.attrs!='') html.attrs.map( (el) => elem.setAttribute(el[0], el[1]) ) // -- attributes 
        elem.style.cssText = html.css // -- style
        // if(elem.style.height==='') elem.style.height = '50px' // -- height = 50px
        // 
        elem.innerHTML = trgtElem.innerHTML
        trgtElem.outerHTML = elem.outerHTML 
    }
    // 
    addText(trgtElem) {
        let inp = _('#popup-addText__').value
        trgtElem.textContent = inp
    }
    margins(trgtElem) {
        this.mrgB = Number(trgtElem.style.marginBottom.split('px')[0]) || 0
        console.log(this.mrgB)
        if(this.set.has('ArrowDown')) {
            this.mrgB++
            trgtElem.style.marginBottom = `${this.mrgB}px`
        }
    }
}
const htmler = new HTMLer()





_('.main').addEventListener( "contextmenu", function(e) {
    console.log(e)
    let div = document.createElement('div')
    div.textContent = 'hello worldddddddddd'
    _('.header-main').insertAdjacentHTML('beforebegin', div)
    // _('.main').append(div)
    
})


let arr = []
function fff(trgt) {
    for(let i of trgt.children) {
        arr.push( i.className!='' ? '.'+i.className : i.localName )
        fff(i)
    }
    // return arr
}

// fff( _('.header-top') )
// console.log(arr)
Array.from(__('.investstart *')).forEach( (el, i, arr) => {
    console.log(el.children)
    // console.log(el.className!='' ? '.'+el.className : el.localName)
})



// ----------------------------
/* class HTMLer {
    constructor() {
        this.set = new Set()
        this.mainOptions()
        this.pressKey()
        this.clickElem()
        this.onmouseoverElem()
    }
    // 
    mainOptions() {
        this.slctMode = 0
        // 
        // _('head').insertAdjacentHTML('beforeend', `
        //     <style>
        //         .info__{
        //             padding: 5px 10px; width:max-content; background:#cbf7d6;
        //             position:fixed; bottom:20px; left:20px;
        //             text-align:center; font-size:25px;
        //         }
        //         .active__{background: #ff000013;}
        //         .active__:hover {background: #ff000013 !important;}
        //         *:not(#popup-bg__, #popup__ textarea):hover{background: #0000ff07;}
        //         #popup__ {display: flex;justify-content: center;align-items: center;position: fixed;top: 0;bottom: 0;left: 0;right: 0;z-index: 11;}
        //         #popup-bg__ {position: absolute;top: 0;bottom: 0;left: 0;right: 0;background: rgba(0, 0, 0, 0.5);}
        //         #popup__ *:last-of-type {z-index: 111;}
        //         #popup-container__ div{min-width:600px;margin-bottom:30px;font-size:35px;color:white;}
        //         #popup-container__ textarea{min-width:600px;height:400px;border:0;padding:10px 20px;background:black;font-size:30px;color:white;white-space:nowrap;}
        //         #popup-addText__{white-space:normal !important;}

        //         .onmouseover__ {border: 1px solid red;}

        //     </style>
        // `)
        _('head').insertAdjacentHTML('beforeend', `
            <style>
                .info__{
                    padding: 5px 10px; width:max-content; background:#cbf7d6;
                    position:fixed; bottom:20px; left:20px;
                    text-align:center; font-size:25px;
                }
                .onmouseover__ {border: 1px dashed red;}
                .active__ {border: 1px dashed blue;}
            </style>
        `)
        _('body').insertAdjacentHTML('beforeend', `
            <div id="popup__" style="display:none;">
                <div id="popup-bg__"></div>
                <div id="popup-container__"></div>
            </div>
        `)
    }
    // 
    pressKey() {
        document.addEventListener('keydown', (e) => {
            this.set.add(e.code)
            if(_('#popup__ textarea')!=document.activeElement) e.preventDefault()
            if(this.set.has('Space')) {
                _('body').classList.toggle('htmler__')

            } 
            
            // // --- blocked keys
            // if(_('#popup__ textarea')!=document.activeElement) e.preventDefault()
            // // ------------- press keys ----------------------
            // // --- 
            // if(this.set.has('Escape')) {
            //     if(!_('#popup__ textarea')) {
            //         // --- show/hide popup
            //         this.togglePopup('<div>Добавить тег:</div><textarea id="popup-addElem__"></textarea>')
            //     } 
            //     else if(_('#popup__ textarea')) {
            //         if(_('#popup-addElem__')) this.addElem(_('.active__')) // - add element
            //         if(_('#popup-rdctElem__')) this.rdctElem(_('.active__')) // - redact element
            //         if(_('#popup-addText__')) this.addText(_('.active__')) // - add text
            //         this.togglePopup('', 'hide')
            //     } 
            // }
            // // --- select mode
            // if(this.set.has('Tab')) {
            //     e.preventDefault()
            //     this.modeRedact()
            // }
            // if(!_('#popup__ textarea')) {
            //     // --- remove element 
            //     if(this.set.has('Delete')) _('.active__').remove()
            //     // --- switch active
            //     if(this.set.has('Numpad5')) this.activeElem(_('body'))
            //     if(this.set.has('Numpad8')) this.activeElem(_('.active__').parentElement)
            //     if(this.set.has('Numpad2')) this.activeElem(_('.active__').children[0])
            //     if(this.set.has('Numpad4')) this.activeElem(_('.active__').previousElementSibling)
            //     if(this.set.has('Numpad6')) this.activeElem(_('.active__').nextElementSibling)
            // }
            


            console.log(e.code)
        })
        document.addEventListener('keyup', (e) => {
            this.set.delete(e.code)
        })
    }
    // 
    onmouseoverElem() {
        // __('header *, main *, footer *').forEach( el => {})
        document.addEventListener('mouseover', (e) => {
            if(_('.htmler__')) e.target.classList.add('onmouseover__')
        })
        document.addEventListener('mouseout', (e) => {
            if(_('.htmler__')) e.target.classList.remove('onmouseover__')
        })
        console.log(el.children[0])
        
    }

    // 
    clickElem() {
        _('body').addEventListener('click', (e) => {
            if(_('.htmler__')) this.activeElem(e.target)
        }) 
    }
    // 
    infoAct(send) {
        _('body').insertAdjacentHTML('beforeend', `
            <div class="info__">${send}</div>
        `)
        setTimeout(() => _('.info__').remove(), 1500)
    }
    // 
    activeElem(elem) {
        if(elem!=_('#popup__') 
            && elem!=_('#popup-bg__') 
            && elem!=_('#popup__ textarea')
            && elem!=_('#popup-container__ div')) {
            __('.active__').forEach((item) => item.classList.remove('active__'))
            elem.classList.add('active__') 
            this.infoAct(elem.tagName.toLowerCase()+'.'+elem.classList[0])
        }
    }
    // 
    togglePopup(innerContainer, display='show') {
        if(display=='show') {
            _('#popup__').style.display = 'flex'
               _('#popup-container__').innerHTML = `
                   ${innerContainer}
               `
           _('#popup__ textarea').focus()
           _('#popup-bg__').onclick = () => _('#popup__ textarea').focus()
           _('#popup-bg__').ondblclick = () => {
               _('#popup__').style.display = 'none'
               _('#popup-container__').innerHTML = ''
           }
        }
        if(display=='hide') {
            _('#popup__').style.display = 'none'
               _('#popup-container__').innerHTML = ''
        }
    }
    // 
    modeRedact() {
        let modes = [
            ['Добавить тег:', 'popup-addElem__'], 
            ['Редактировать тег:', 'popup-rdctElem__'], 
            ['Добавить текст:', 'popup-addText__']
        ]
        this.slctMode++
        if(this.slctMode==modes.length) this.slctMode = 0
        _('#popup-container__ div').textContent = modes[this.slctMode][0]
        _('#popup-container__ textarea').id = modes[this.slctMode][1]
        // 
        if(modes[this.slctMode][1]=='popup-addElem__') _('#popup-addElem__').value = ''
        if(modes[this.slctMode][1]=='popup-rdctElem__') _('#popup-rdctElem__').value = this.valuesElem(_('.active__'))
        if(modes[this.slctMode][1]=='popup-addText__') _('#popup-addText__').value = _('.active__').textContent
    }
    // 
    valuesElem(trgtElem) {
        let html = {
            'tag': trgtElem.tagName.toLowerCase(),
            'cls': `.${trgtElem.classList[0]}`,
            attrs() {
                let arr = []
                for(let attr of trgtElem.attributes) {
                    if(attr.name!='class' && attr.name!='style') arr.push(attr.name+'='+attr.value)
                }
                return arr.join('>>')
            },
            'css': trgtElem.style.cssText.split(';').join(';\n'),
        }
        return html.tag+html.cls+'\n'+html.attrs()+'\n'+html.css
    }
    // 
    addElem(trgtElem) {
        let inp = _('#popup-addElem__').value.split("\n")
        //
        let html = {
            'tag': inp[0].split('.')[0] || 'div',
            'clas': inp[0].split('.')[1] || '',
            'attrs': inp[1].split('>>').map( (el, i, arrmap) => arrmap[i] = el.split('=') ),
            'css': inp.slice(2).map( (item) => item.trim() ).filter( (item) => item[item.length-1]===';' ).join('')
        }
        // 
        let elem = document.createElement(html.tag) // -- create element
        // 
        elem.className = html.clas // -- class
        if(html.attrs!='') html.attrs.map( (el) => elem.setAttribute(el[0], el[1]) ) // -- attributes 
        elem.style.cssText = html.css // -- style
        // if(elem.style.height==='') elem.style.height = '50px' // -- height = 50px
        // 
        trgtElem.append(elem) // -- add element
        this.activeElem(elem) 
        console.log(html.attrs)
    }
    // 
    rdctElem(trgtElem) {
        let inp = _('#popup-rdctElem__').value.split("\n")
        //
        let html = {
            'tag': inp[0].split('.')[0] || 'div',
            'clas': inp[0].split('.')[1] || '',
            'attrs': inp[1].split('>>').map( (el, i, arrmap) => arrmap[i] = el.split('=') ),
            'css': inp.slice(2).map( (item) => item.trim() ).filter( (item) => item[item.length-1]===';' ).join('')
        }
        // 
        let elem = document.createElement(html.tag) // -- create element
        // 
        elem.className = html.clas // -- class
        if(html.attrs!='') html.attrs.map( (el) => elem.setAttribute(el[0], el[1]) ) // -- attributes 
        elem.style.cssText = html.css // -- style
        // if(elem.style.height==='') elem.style.height = '50px' // -- height = 50px
        // 
        elem.innerHTML = trgtElem.innerHTML
        trgtElem.outerHTML = elem.outerHTML 
    }
    // 
    addText(trgtElem) {
        let inp = _('#popup-addText__').value
        trgtElem.textContent = inp
    }
}
const htmler = new HTMLer()

 */
