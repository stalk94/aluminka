document.querySelectorAll(".nav-cart").forEach((elem)=> {
    elem.addEventListener("click", (ev)=> {
        if(ev.target.classList.contains("cat")){
            let src = ev.target.getAttribute("url")
            console.log(src)
            document.location.href = document.location.origin+"/"+src
        }
    })
});