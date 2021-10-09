document.addEventListener("drag", function(event) {
    console.log("drug")
}, false);
document.addEventListener("dragstart", function(event) {
    dragged = document(elem.id)
    event.target.style.opacity = 0.5;
}, false);
document.addEventListener("dragend", function(event) {
    elem.style.opacity = "";
}, false);
document.addEventListener("dragover", function(event) {
    event.preventDefault();
}, false);
document.addEventListener("dragenter", function(event) {
    if(event.target.classList.contains('swiper-slide')) {
        event.target.style.background = "purple";
    }
}, false);
document.addEventListener("dragleave", function(event) {
    if(event.target.classList.contains('swiper-slide')){
        event.target.style.background = "";
    }

}, false);
document.addEventListener("drop", function(event) {
    event.preventDefault();
    if(event.target.classList.contains('swiper-slide')){
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged)
        event.target.appendChild(dragged)
    }
}, false);