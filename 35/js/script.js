const _ = document.querySelector.bind(document)
const __ = document.querySelectorAll.bind(document)



/* const rangeInput = {
    rangeEl: _('.getportfolio-main__profit-form .range input'),
    rangeBar: _('.getportfolio-main__profit-form .range-wrapper__bar'),
    run() {
        this.rangeBar.style.width = (this.rangeEl.value * 100 / this.rangeEl.max) +'%'
        this.rangeEl.oninput = () => {
            this.rangeBar.style.width = (this.rangeEl.value * 100 / this.rangeEl.max) +'%'
            
        }
    }
}
rangeInput.run() */



const rangeInput = {
    rangeEl: _('.getportfolio-main__profit-form .range input'),
    rangeWrapper: _('.getportfolio-main__profit-form .range-wrapper'),
    rangeBar: _('.getportfolio-main__profit-form .range-wrapper__bar'),
    run() {
        const setRange = () => {
            let lenRange = this.rangeEl.max - this.rangeEl.min
            let valRange = this.rangeEl.value - this.rangeEl.min
            let res = 100 / (lenRange / valRange)
            this.rangeBar.style.width = `${res}%`
        }
        setRange()
        this.rangeEl.oninput = () => setRange()
    }
}
rangeInput.run()



// swiper -------------------------
/* new Swiper('.clients', {
    // autoplay: {
    //     delay: 5000,
    // },
    breakpoints: {
        576: {
            slidesPerView: 1,
            spaceBetween: 30,

        },
    },
    // navigation: {
    //     nextEl: '.buyproduct-swiper__arrs-next',
    //     prevEl: '.buyproduct-swiper__arrs-prev',
    // },
}); */



const quests = {

    run() {
        __('.questions-quests__items-item').forEach(el => {
            el.children[0].onclick = () => {
                el.classList.toggle('questions-quests__items-item--open')
            }
        })
    }
}
quests.run()



