let btnServices = document.querySelectorAll('section.services .cards .btn')

btnServices.forEach(function(item, i, arr) {
    item.onclick = () => {
        window['popup'].style.display = 'block'
        window['popup-services'].style.display = 'block'
        window['popup-bg'].onclick = () => {
            window['popup'].style.display = 'none'
            window['popup-services'].style.display = 'none'
        } 
    }
});


let btnMenu = document.querySelector('.menu-btn')
let menu = document.querySelector('ul.menu')

btnMenu.onclick =  () => {
    if(menu.style.display == 'block') {
        menu.style.display = 'none'
    }
    else {
        menu.style.display = 'block'
    }
}





/* const ques = document.querySelectorAll('.ques');
    
ques[1].onclick = () => {
    alert('ok');
}
ques.forEach(function(item, i, arr) {
    arr[i].onclick = () => {
        alert(item + " " + (i+1));
    }
}); */

/* let elem = document.getElementById("popup");
window['popup'].style.display = "none";

alert(ques[0].innerHTML); */

