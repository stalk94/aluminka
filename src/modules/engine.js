const gurl = 'http://localhost:3000/'
const urls = document.location.href.split("/")
Object.prototype.forEach = function(clb) {
    Object.keys(this).forEach((key)=> {
        clb(this[key], key)
    });
}
window.user = JSON.parse(window.localStorage.getItem("user"))
window.modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Закрыть",
    cssClass: ['modal', 'modal-window'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        return true;
        return false;
    }
});



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
function admin() {
    let ctx;
    
    document.querySelectorAll(".info").forEach((elem)=> {
        elem.removeAttribute('contenteditable')
    });
    if(!document.querySelector(".admin")){
        ctx = document.createElement("div")
        ctx.className = 'admin'
        document.body.appendChild(ctx)
        createTool("close", 'exit', ()=> {
            ctx.remove()
        });
    }
}
function createTool(name, type, clb) {
    if(!document.querySelector(`.tool-${type}`)){
        let tool = document.createElement("div")
        tool.setAttribute("class", `tool-${type}`)
        let ic = document.createElement("img")
        ic.src = `../img/icon/${name}.svg`
        ic.width = 70
        tool.appendChild(ic)
        tool.addEventListener("click", ()=> {
            if(clb) clb()
            tool.remove()
        });

        document.querySelector(".admin").appendChild(tool)
    }
}
async function save() {
    let url = document.location.href.replace(document.location.origin, '')
    
    let res = await send("readSite", {
        login: window.user.login, 
        password: window.user.password,
        url:url, 
        data:$("html").html()
    }, "POST")
    console.log(res)
}
function fileLoader(files, clb) {
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
    const okCall =()=> {
        admin()
        createTool("check", 'txt', ()=> {
            document.querySelector(".admin").remove()
            save()
        });
    }
    let root = $('body').attr("root")
    let clas = elem.classList
    let tag = elem.tagName

    if(clas.contains("swiper-slide") && root!=="tovar"){
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
            okCall()
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
            okCall()
        }
    }
    else if(clas.contains("info")){
        if(!elem.hasAttribute('contenteditable')) okCall()

        elem.setAttribute('contenteditable', "true")
    }
    else if(clas.contains("tool-add")){
        let url = urls[urls.length-1].replace('.html', '')
        addTovar("Новый товар", url)
        okCall()
    }
    else if(clas.contains("foto-add")) {
        let inps = document.createElement("input")
        inps.type = "file"
        inps.click()

        inps.onchange =()=> {
            fileLoader(inps.files, (src)=> {
                $(".miniContainer").append(`<div class="swiper-slide"><img class="tovar-img" src="${src}" mod></img></div>`)
            });
            okCall()
        }
    }
    else if(clas.contains("galery-foto")||tag==="IMG"){
        let inp = document.createElement("input")
        inp.type = "file"
        inp.click()

        inp.onchange =()=> {
            fileLoader(inp.files, (src)=> {
                elem.src = src
            });
            okCall()
        }
    }
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


window.onload =()=> {
    $("body").on("click", (ev)=> {
        if(ev.target.hasAttribute('mod')) redact(ev.target)
    });
    $(".two-nav").on("click", (ev)=> {
        switch(ev.target.getAttribute("to")){
            case "glav": document.location.href = gurl
                break;
            case "catalog": document.location.href = gurl+"shop/"+urls[urls.length-2]+".html"
                break;
            case "pay": document.location.href = gurl
                break;
            case "uslugi": document.location.href = gurl
                break;
            case "contact": document.location.href = gurl
                break;
        }
    });
}