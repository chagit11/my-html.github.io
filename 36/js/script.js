const _ = document.querySelector.bind(document)
const __ = document.querySelectorAll.bind(document)



// --- sitecanTab
function sitecanTab() {
    __('.sitecan-tabs__tab').forEach( el => {
        el.querySelector('.sitecan-tabs__tab-head').onclick = () => {
            el.classList.toggle('sitecan-tabs__tab--open')
        }
    });
}
sitecanTab()

// --- geoSelect
function geoSelect() {
    let geotab = false
    _('.header-top__geo').addEventListener('click', (e) => {
        e.stopPropagation()
        if(geotab==false) {
            _('.header-top__geo-popup').style.display = 'block'
            geotab = true        
        }
        else if(geotab==true) {
            _('.header-top__geo-popup').style.display = 'none'
            geotab = false        
        }
    }, true);
    _('body').addEventListener('click', (e) => {
        if(![...__('.header-top__geo')].includes(e.target)) {
            _('.header-top__geo-popup').style.display = 'none'
            geotab = false        
        }
    }, true);
}
geoSelect() 

// --- searchHeader
function searchHeader() {
    _('.header-top__search').onclick = () => {
        _('.header-top__inputsearch').style.display = 'flex'
    }
    _('.header-top__inputsearch-close').onclick = () => {
        _('.header-top__inputsearch').style.display = 'none'
    }
}
searchHeader()

// --- navigationHeader
function navigationHeader() {
    
    __('.header-navigation__items-item').forEach( (el) => {
        el.addEventListener('click', (e) => {
            e.stopPropagation()
            __('.header-navigation__items-item').forEach( (els) => {
                els.classList.remove('header-navigation__items-item--open')
            })
            el.classList.add('header-navigation__items-item--open')
        }, true)
    })
    _('body').addEventListener('click', (e) => {
        if(![...__('.header-navigation__items-item'), 
            ...__('.header-navigation__items-item .subitem')].includes(e.target)) {
            _('.header-navigation__items-item').classList.remove('header-navigation__items-item--open')
        }
        __('.header-navigation__items-item').forEach( (els) => {
            els.classList.remove('header-navigation__items-item--open')
        })
    }, true)
}
navigationHeader()


// --- burgerMenu
function burgerMenu() {
    _('body').addEventListener('click', (e) => {
        if(e.target==_('.header-top__menu-burger img')) {
            _('.header-top__menu-popup').style.display = 'block'
        }
        else if(e.target==_('.header-top__menu-popup .popup-head__close img')) {
            _('.header-top__menu-popup').style.display = 'none'
        }
    })
}
burgerMenu()