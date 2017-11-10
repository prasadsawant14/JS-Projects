//get elements

var modal = document.getElementById('simpleModal');

var modalBtn = document.getElementById('modalBtn');
var closeBtn = document.getElementsByClassName('closeBtn')[0];

modalBtn.addEventListener('click',openModal);

closeBtn.addEventListener('click',closeModal);

function openModal(){
    modal.style.display = 'block';
}

function closeModal(){
    modal.style.display = 'none';
}

//add event for the whole
window.addEventListener('click',clickOutside)

function clickOutside(e){
    if(e.target == modal){
    modal.style.display = 'none';
}
}