function _(slc) {
    let selector = document.querySelector(slc)
    return selector
}
function __(slc) {
    let selectors = document.querySelectorAll(slc)
    return selectors
}

//=========================================================


__('.number-printing .label > span').forEach((item, i, arr) => {
    let val = _('.number-printing .label > span:nth-of-type(2) input').value
    arr[0].onclick = () => {
        if(val > 1) val--
        _('.number-printing .label > span:nth-of-type(2) input').value = val
        _('.number-printing .label > span:nth-of-type(2) span').textContent = val
        _('.block-left .order .number span:nth-of-type(2)').textContent = val
        console.log(val)
    } 
    arr[2].onclick = () => {
        val++
        _('.number-printing .label > span:nth-of-type(2) input').value = val
        _('.number-printing .label > span:nth-of-type(2) span').textContent = val
        _('.block-left .order .number span:nth-of-type(2)').textContent = val
        console.log(val)
    } 
})
//
__('.block-left .order .number span').forEach((item, i, arr) => {
    let val = arr[1].textContent
    arr[0].onclick = () => {
        if(val > 1) val--
        _('.block-left .order .number span:nth-of-type(2)').textContent = val
        _('.number-printing .label > span:nth-of-type(2) input').value = val
        _('.number-printing .label > span:nth-of-type(2) span').textContent = val
        console.log(val)
    } 
    arr[2].onclick = () => {
        val++
        _('.block-left .order .number span:nth-of-type(2)').textContent = val
        _('.number-printing .label > span:nth-of-type(2) input').value = val
        _('.number-printing .label > span:nth-of-type(2) span').textContent = val
        console.log(val)
    } 
})

