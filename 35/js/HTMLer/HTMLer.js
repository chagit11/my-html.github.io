const _ = document.querySelector.bind(document)
const __ = document.querySelectorAll.bind(document)










class HTMLer {
    constructor() {
        this.mainOptions()
        // 
        this.onMouseMove()
        this.onMouseHover()
        this.onClick()
        this.onContextMenu()
        this.onScroll()
        this.onPressKey()
        // 
    }
    // Options...
    mainOptions() {
        // htmler maincss/addcss...
        this.maincssOn = `
            body *:hover {outline: 5px dashed red;}
            body *:hover:after, body *:hover:before {outline: 5px dashed blue;}
        `
        // 
        this.props = new Map()
        this.elms = new Map()
        // 
        _('head').insertAdjacentHTML('beforeend', `
            <link rel="stylesheet" href="./js/HTMLer/HTMLer.css"/>
            <style data-htmler-maincss="off"></style>
            <style data-htmler-addcss></style>
        `)
        // htmler-elname...
        _('body').insertAdjacentHTML('beforeend', `
            <div class="htmler-elname" data-htmler style="display:none;">
            </div>
        `)
        // htmler-contextmenu...
        _('body').insertAdjacentHTML('beforeend', `
            <ul class="htmler-contextmenu" style="display:none;" data-htmler>
                <li>width</li> <li>height</li>
                <li>padding</li> <li>margin</li>
                <li>font-size</li> <li>line-height</li>
            </ul>
        `)
    }
    // mouse Over / Out...
    onMouseHover() {
        _('body').addEventListener('mouseover', (e) => {
            this.selectElem(e.target, 'off')
        })
    }
    // mouse Move...
    onMouseMove() {
        _('body').addEventListener('mousemove', (e) => {
            this.nameElem(e.target, e.clientX, e.clientY)
        })   
    }
    // Click...
    onClick() {
        _('body').addEventListener('click', (e) => {
            // blocked click
            e.preventDefault() 
            // - select click 
            this.selectElem(e.target) 
            console.log(this.slctElOn, this.slctElOff)
            // - click elem
            this.elclck = _('body *[data-htmler-selected="on"]') 
            // - hide menu
            if(e.target!=_('.htmler-contextmenu')) this.showMenu(e.target, e.clientX, e.clientY, "off") 
            // - cssProp
            this.cssProps()
        })
    }
    // Scroll...
    onScroll() {
        window.addEventListener('scroll', (e) => {
            // console.log(pageYOffset)
        })
    }
    // Contextmenu...
    onContextMenu() {
        _('body').addEventListener('contextmenu', (e) => {
            e.preventDefault()
            this.showMenu(e.target, e.clientX, e.clientY)
        })
    }
    // press Key...
    onPressKey() {
        this.setKeys = new Set()
        // ...keydown
        _('body').addEventListener('keydown', (e) => {
            e.preventDefault() // blocked press
            this.setKeys.add(e.code) // press keys
            // --- switch select - numpads
            if(this.setKeys.has('Numpad5')) this.selectElem(this.elclck)
            if(this.setKeys.has('Numpad8')) this.selectElem(_('body *[data-htmler-selected]').parentElement)
            if(this.setKeys.has('Numpad2')) this.selectElem(_('body *[data-htmler-selected]').children[0])
            if(this.setKeys.has('Numpad4')) this.selectElem(_('body *[data-htmler-selected]').previousElementSibling)
            if(this.setKeys.has('Numpad6')) this.selectElem(_('body *[data-htmler-selected]').nextElementSibling)
            // --- setStyles
            if(this.setKeys.has('Space')) this.mainCss()
            // >>> 
            // ...sizeElem
            if(this.setKeys.has('KeyE')) this.sizeElem().setCssNum('+', 1)
            if(this.setKeys.has('KeyW')) this.sizeElem().setCssNum('+', 10)
            if(this.setKeys.has('KeyR')) this.sizeElem().setCssNum('+', 100)
            if(this.setKeys.has('KeyC')) this.sizeElem().setCssNum('-', 1)
            if(this.setKeys.has('KeyX')) this.sizeElem().setCssNum('-', 10)
            if(this.setKeys.has('KeyV')) this.sizeElem().setCssNum('-', 100)
        })
        // ...keyup
        _('body').addEventListener('keyup', (e) => {
            this.setKeys.delete(e.code)
        })
    }
    // 
    // =====================
    // 
    // mainCss ---
    mainCss() {
        if(_('style[data-htmler-maincss]').getAttribute('data-htmler-maincss')=='off'){
            _('style[data-htmler-maincss]').setAttribute('data-htmler-maincss', 'on')
            _('style[data-htmler-maincss]').innerHTML = this.maincssOn
        }
        else if(_('style[data-htmler-maincss]').getAttribute('data-htmler-maincss')=='on'){
            _('style[data-htmler-maincss]').setAttribute('data-htmler-maincss', 'off')
            _('style[data-htmler-maincss]').innerHTML = ''
        }
    }
    // nameElem ---
    nameElem(t, x, y) {
        if(!t.hasAttribute('data-htmler')) {
            // --- position
            _('.htmler-elname').style.cssText = `
                left: ${x+10}px; top: ${y+10}px;
            `
            // --- select on outline
            if(t.getAttribute('data-htmler-selected')=='on') _('.htmler-elname').style.outline = '3px solid yellow'
            // --- tag class   
            _('.htmler-elname').innerHTML = `
                <span>${t.tagName}</span>
                <span>${this.slctElOff[1]}</span>
            `     
        }
    }
    // selectElem ---
    selectElem(t, slct='on') {
        if(t!=_('body') && !t.hasAttribute('data-htmler')) {
            // 
            let tag = t.tagName=='DIV' ? '' : t.tagName.toLowerCase()
            let partag = '.'+t.parentElement.classList[0]+' '+t.tagName.toLowerCase()
            let cls = t.classList[0]==undefined ? '' : t.classList[0]
            let tagcls = cls=='' ? partag : tag+'.'+cls
            // 
            if(slct=='on') {
                __('body *').forEach(el => {
                    // if(el.hasAttribute('data-htmler-selected')) {
                        el.removeAttribute('data-htmler-selected')
                    // }
                })
                t.setAttribute('data-htmler-selected', 'on')
                _('.htmler-elname').style.outline = '3px solid yellow'
                // 
                return this.slctElOn = [t, tagcls]
            }
            else if(slct=='off') {
                __('body *').forEach(el => {
                    if(el.getAttribute('data-htmler-selected')=='off') {
                        el.removeAttribute('data-htmler-selected')
                    }
                })
                if(t.getAttribute('data-htmler-selected')!='on') {
                    t.setAttribute('data-htmler-selected', 'off')
                }
                return this.slctElOff = [t, tagcls]
            }
        }
    }
    // showMenu ---
    showMenu(t, x, y, show='on') {
        // --- install data-htmler
        __('.htmler-contextmenu *').forEach((el) => {
            el.setAttribute('data-htmler','')
        })
        // --- hide menu
        if(show=='off') {
            _('.htmler-contextmenu').style.display = 'none'
            return 'hidden menu'
        }
        // --- show menu
        if(_('body *[data-htmler-selected="on"')) {
            _('.htmler-contextmenu').style.cssText =`display: grid;`
            // left: ${x-310}px; top: ${y}px;
        }
    }
    // 
    // >>>>>>>>>>>>>>>>>>
    // 
    // cssProps 
    cssProps() {
        __('.htmler-contextmenu li').forEach((el) => {
            el.onclick = () => {
                this.cssProp = el.textContent
                this.cssVal = getComputedStyle(this.slctElOn[0])[this.cssProp]
            }
        })
        return [this.cssProp, this.cssVal]
    }
    // sizeElem 
    sizeElem() {
        let props = this.props
        let elms = this.elms
        let cssSettings = {
            width: ['0px', 'auto', 'max-content', '100%'],
            height: ['0px', 'auto', 'max-content', '100%'],
            padding: ['0px'],
            margin: ['0px', 'auto'],
        }
        return {
            setCssNum: (drct='+', step=1) => {
                let v = this.cssVal.split('px')
                if(drct=='+') v[0] = +v[0] + step
                if(drct=='-') v[0] = +v[0] - step
                this.cssVal = v[0] +'px'
                // 
                props.set(this.cssProp, this.cssVal)
                let propsObj = Object.fromEntries(props)
                elms.set(this.slctElOn[1], propsObj)
                // 
                let cssStyle = ``
                for (let el of elms) {
                    let cls = `${el[0]}`
                    let pv = ''
                    for(let p in el[1]) {
                        pv += `\t${p}: ${el[1][p]} !important;\n`
                    }
                    cssStyle += `${cls} {\n${pv}}\n`
                }
                _('style[data-htmler-addcss]').innerHTML = cssStyle
                console.log(cssStyle)
                // 
                // this.elclck.style[this.cssProp] = this.cssVal
                // cssSettings[this.cssProp][0] = this.cssVal
                // console.log(cssSettings[this.cssProp])
            },
            setCssText: () => {

            }
        }

    }
}

new HTMLer()



