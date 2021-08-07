import $ from "jquery";
const urls = document.location.href.split("/")


async function send(url, data, metod) {
    let response

    if(metod==="GET"){
        response = await fetch(gurl + url, {
            method: "GET",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              //'Content-Type': 'application/x-www-form-urlencoded'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer'
        });
    }
    else response = await fetch(gurl + url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        //'Content-Type': 'application/x-www-form-urlencoded'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    return await response.text();
}
async function authorize(login, pass) {

} 
function createTool(name, elem, clb) {
    let rect = elem.getBoundingClientRect()
    let tool = document.createElement("div")
    tool.setAttribute("class", "tool")
    tool.style.top = rect.y - 20
    tool.style.left = rect.x
    tool.textContent = name
    tool.addEventListener("click", ()=> {
        if(clb) clb()
        tool.remove()
    });

    document.body.appendChild(tool)
}
function modalTool(type) {
    let modal = document.createElement("div")
    modal.className = 'modal-tool'
    let ok = document.createElement("div")
    ok.className = 'tool-ok green-button'
    ok.textContent = "Применить"
    ok.onclick =()=> {
        modal.remove()
    }
    let exit = document.createElement("div")
    exit.className = 'tool-exit red-button'
    exit.textContent = "Отмена"
    exit.onclick =()=> {
        modal.remove()
    }
    let div = document.createElement("div")
    div.className = 'line'
    div.appendChild(ok)
    div.appendChild(exit)
    
    modal.appendChild(div)
    document.body.appendChild(modal)


}
async function fileLoader(files, clb) {
    let file = files[0]
    
    let img = document.createElement("img")
    img.classList.add("obj")
    img.file = file
    let reader = new FileReader()

    reader.onload = ((aImg)=> { 
        return (e)=> { 
            aImg.src = e.target.result
            clb(img.src)
        }
    })(img)

    reader.readAsDataURL(file)
}
function redact(elem) {
    let clas = elem.classList
    let tag = elem.tagName

    if(clas.contains("swiper-slide")){
        elem.innerHTML = ""
        let input = document.createElement("input")
        input.type = "file"
        let img = document.createElement("img")
        input.click()

        input.onchange =()=> {
            fileLoader(input.files, (src)=> {
                img.src = src
                element.appendChild(img)
            });
        }
    }
    else if(clas.contains("img-top")){
        let inp = document.createElement("input")
        inp.type = "file"
        inp.click()

        inp.onchange =()=> {
            fileLoader(inp.files, (src)=> {
                elem.src = src
            });
        }
    }
    else if(clas.contains("info")){
        if(!elem.hasAttribute('contenteditable')) createTool("Применить", elem, ()=> {
            elem.removeAttribute('contenteditable')
        });

        elem.setAttribute('contenteditable', "true")
    }
    else if(clas.contains("tool-add")){
        modalTool('tovar')
    }
}



// document controller
if(urls[urls.length-1]!=='/'){
    $("body").on("click", (ev)=> {
        let info = ev.target.getAttribute("info")
        
        if(info) alert(info)
        if(ev.target.hasAttribute('mod')) redact(ev.target)
    });
}
if(urls[urls.length-1]==='shop' || urls[urls.length-1]==='shop-list.html'){
    // галерея товаров
    const swypeList = new Swiper(".swypeList", {
        pagination: {
            el: ".swiper-paginations",
            clickable: true,
            renderBullet: function(index, className){
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
    });
    
}
if(urls[urls.length-1]==='product' || urls[urls.length-1]==='tovar.html'){
    const swiperTovarMini = new Swiper(".swiperTovarMini", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
    });
    const swiperTovar = new Swiper(".swiperTovar", {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiperTovarMini,
        }
    });
}


// swiper forward
const swiperForvard = new Swiper(".bottom-swipe", {
	slidesPerView: 3,
	centeredSlides: true,
	spaceBetween: 30,
	pagination: {
		el: ".swiper-pagination",
		type: "fraction",
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});