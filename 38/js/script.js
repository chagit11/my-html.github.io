const _ = document.querySelector.bind(document)
const __ = document.querySelectorAll.bind(document)

_('.slider__arrows-prev').addEventListener('click', (e) => {
    e.stopPropagation()
    _('.slider__slides').scrollBy({left: -1, behavior: 'smooth'})
    
}, true)
_('.slider__arrows-next').addEventListener('click', (e) => {
    e.stopPropagation()
    _('.slider__slides').scrollBy({left: 1, behavior: 'smooth'})
    
}, true)

let tch = new Touch

console.log(tch.screenX)


