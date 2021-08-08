

class Catalog {

    constructor() {
    }
    
    // ========
    clickSorting() {
        let sorting_items = document.querySelectorAll('.catalog__products-sorting--item')
        sorting_items.forEach(item => {
            item.onclick = () => {
                    sorting_items.forEach(item2 => {
                        item2.classList.remove('catalog__products-sorting--item_active')
                    })
                item.classList.add('catalog__products-sorting--item_active')
            }
        })
    }

    // ========
    rangeValue() {
        let scaleWrap = document.querySelector('.catalog__filters-range-scale-wrap')
        let scale = document.querySelector('.catalog__filters-range-scale')
        let bar = document.querySelector('.catalog__filters-range-bar')
        let minToggle = document.querySelector('.catalog__filters-range-min')
        let maxToggle = document.querySelector('.catalog__filters-range-max')
        let val = 0

        // bar.style.left = '0px'
        // bar.style.right = '0px'

        scaleWrap.addEventListener('mousedown', function(e) {
            // e = e || window.e; // кроссбраузерность
            if(e.target == scaleWrap) val = e.offsetX
            if(e.target == scale) val = e.offsetX
            if(e.target == bar) val = bar.getBoundingClientRect().left - scale.getBoundingClientRect().left + e.offsetX
            if(e.target == minToggle) val = minToggle.getBoundingClientRect().left - scale.getBoundingClientRect().left + e.offsetX
            if(e.target == maxToggle) val = maxToggle.getBoundingClientRect().left - scale.getBoundingClientRect().left + e.offsetX
            if(val > scale.getBoundingClientRect().width) val = scale.getBoundingClientRect().width
            if(val < 0) val = 0

            let howMinToggle = val - minToggle.getBoundingClientRect().right 
            let howMaxToggle = maxToggle.getBoundingClientRect().left - val
            if(howMinToggle < howMaxToggle && (e.target !=scale || scaleWrap)) {
                bar.style.cssText = `
                    left: ${val}px;
                    right: ${scale.getBoundingClientRect().right - bar.getBoundingClientRect().right}px;
                    transition: .3s;
                `
            }
            if(howMinToggle > howMaxToggle && (e.target !=scale || scaleWrap)) {
                bar.style.cssText = `
                    right: ${scale.getBoundingClientRect().right - val}px;
                    left: ${bar.getBoundingClientRect().left - scale.getBoundingClientRect().left}px;
                    transition: .3s;
                    `
            }
            // console.log(e.target) 
        }, true)
        // ...
        scaleWrap.addEventListener('mouseup', function(e) {
            let barWidth = bar.getBoundingClientRect().right - bar.getBoundingClientRect().left
            console.log(barWidth)
        }, true)
        // 
        return val
    }

}

// +++++++++++++++
cat = new Catalog()

cat.clickSorting()

let val = cat.rangeValue()

console.log(val)





// document.querySelector('.catalog__filters-range-scale').onclick = function(event) {
//     // event = event || window.event; // кроссбраузерность
//     console.log(event); // вывод в консоль
//     // document.querySelector('.x').innerHTML = event.offsetX;
//     // document.querySelector('.y').innerHTML = event.offsetY;
// }