let number = 0 ; 
const button = document.querySelector('#button') ;

let txt = document.querySelector('#display') ; 
button.addEventListener('click' , ()=>{
    number++ ;  
    txt.innerText = number ; 
})
