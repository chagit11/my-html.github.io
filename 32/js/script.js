function _(slc) {
    let selector = document.querySelector(slc)
    return selector
}
function __(slc) {
    let selectors = document.querySelectorAll(slc)
    return selectors
}

// ============================
_('.header-top__menu-burger').onclick = () => {
    _('.header-top__menu-burger').classList.toggle('header-top__menu-burger--close')
    _('.header-top__menu-list').classList.toggle('header-top__menu-list--mob')
}


// =========================

class PopupMain {
    constructor() {
        this.optionsmain()
        this.clickItem()
    }
    optionsmain() {
        _('body').insertAdjacentHTML('afterbegin', `
            <div id="popup" style="
                display: none;
                justify-content:center;
                align-items:center;
                position:fixed;
                inset:0;
                z-index:11;
            ">
                <div id="popup-bg" style="
                    background:rgba(0, 0, 0, 0.4);
                    position:absolute;
                    inset:0;
                " onclick="popup.style.display='none';popupWrapper.innerHTML='';"></div>
                <div id="popup-wrapper" style="z-index:22;"></div>
            </div>
        `)
    }
    clickItem() {
        __('.lecturers-items__item').forEach( (el, i, arr) => {
            el.onclick = () => {
                _('#popup').style.display = 'flex'
                _('#popup-wrapper').innerHTML =`
                    <div class="lecturers-popup" style="display:block;">
                        <div class="lecturers-popup__item">
                            <div class="lecturers-popup__item-pic">${__('.lecturers-items__item-pic')[i].innerHTML}</div>
                            <div class="lecturers-popup__item-name">${__('.lecturers-items__item-name')[i].innerHTML}</div>
                            <div class="lecturers-popup__item-desc">${__('.lecturers-items__item-desc')[i].innerHTML}</div>
                        </div>
                    </div>
                `
                //  <div class="lecturers-popup" style="display:block;">
                //         <div class="lecturers-popup__item">
                //             <div class="lecturers-popup__item-pic">${__('.lecturers-items__item-pic')[i].innerHTML}</div>
                //             <div class="lecturers-popup__item-info">
                //                 <div class="info-name">${__('.lecturers-items__item-name')[i].innerHTML}</div>
                //                 <div class="info-desc">${__('.lecturers-items__item-desc')[i].innerHTML}</div>
                //             </div>
                //         </div>
                //     </div>
            }
        })
        _('#popup-bg').onclick = () => {
            _('#popup').style.display = 'none'
            _('#popup-wrapper .lecturers-popup').style.display = 'none'
        }
    }
}
new PopupMain()

//  ================

class Questions {
    constructor() {
        this.item = __('.questions-items__item')
        this.title = __('.questions-items__item-title')
        this.run()
    }
    run() {
        this.title.forEach( (el, i, arr) => {
            el.onclick = () => {
                this.item[i].classList.toggle('questions-items__item--open')
            }
        })
    }
}
new Questions()


