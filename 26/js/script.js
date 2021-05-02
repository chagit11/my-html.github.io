function _(slc) {
    let selector = document.querySelector(slc)
    return selector
}
function __(slc) {
    let selectors = document.querySelectorAll(slc)
    return selectors
}
// =============================================

_('.calculator__select').addEventListener('click', function(e) {
    
    if(e.target==_('.calculator__select .select')) {
        e.target.classList.toggle('select_open')
    }

    if(e.target.className=='li') {
        _('.calculator__select .select').classList.toggle('select_open')
        let liClone = e.target.cloneNode(true)
        _('.calculator__select .select').innerHTML = ''
        _('.calculator__select .select').append(liClone)
        console.log(liClone)
    }
})

let bgRange = (slc) => {
    _(slc).addEventListener('input', ()=> {
        let valRange = _(slc).value
        // let minRange = _(slc).min
        let maxRange = _(slc).max
        let greenBG = (valRange * 100) / (maxRange)
        _(slc).style.cssText = `
            background: linear-gradient(to right, #87B645 ${greenBG}%, #FBAC00 0%, #FBAC00 100%)
        `
        console.log(greenBG)
    })

}

bgRange('.calculator__field:nth-of-type(1) input[type="range"]')
bgRange('.calculator__field:nth-of-type(2) input[type="range"]')





const faqToggle = () => {
    _('.faq__answers dt').parentElement.classList.toggle('faq__answers_open')
    __('.faq__answers dt').forEach(item => {
        item.onclick = () => {
            __('.faq__answers dt').forEach(item1 => {
                item1.parentElement.classList.remove('faq__answers_open')
            })
            item.parentElement.classList.toggle('faq__answers_open')
        }
    })
}
faqToggle()
