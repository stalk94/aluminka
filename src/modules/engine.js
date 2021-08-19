const gurl = 'http://194.61.0.15/'
const urls = document.location.href.split("/")
Object.prototype.forEach = function(clb) {
    Object.keys(this).forEach((key)=> {
        clb(this[key], key)
    });
}
window.sessionStorage.get = function(key) {
    let val = this.getItem(key)
    if(val) return JSON.parse(val)
}
window.sessionStorage.set = function(key, val) {
    this.setItem(key, JSON.stringify(val))
}
window.user = JSON.parse(window.localStorage.getItem("user"))
window.story = window.localStorage.getItem("story")===null ? [] : JSON.parse(window.localStorage.getItem("story"))
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


const userForm =()=> {
    return(`
        <div class="user-form column">
            <div class="error"></div>
            <input class="input-userForm" type="email" placeholder="email" value="${window.user.email??''}">
            <input class="input-userForm" type="tel" placeholder="Телефон" value="${window.user.phone??''}">
            <input class="input-userForm" type="text" placeholder="Город" value="${window.user.city??''}">
            <input class="input-userForm" type="text" placeholder="Адрес" value="${window.user.adres??''}">
        </div>
    `);
}


async function send(url, data, metod) {
    let response

    if(metod==="GET"){
        response = await fetch(gurl + url, {
            method: "GET",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
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
        'Content-Type': 'application/json;charset=utf-8'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    return await response.text();
}
async function authorize() {
    if(window.user===null){
        window.modal.setContent(`
            <div class="error"></div>
            <div class="reg-title">Авторизация</div>
            <div class="reg-form column" id="reg">
                <input id="login-input" type="text" placeholder="login min 4 simbol">
                <input id="pass-input" type="password" placeholder="password min 6 simbol">
                <input id="phone-input" type="tel" placeholder="номер телефона">
            </div>
        `)
        window.modal.setFooterContent(`
            <div class="tingle-btn tingle-btn--primary">Регистрация</div>
        `)
        let $error = document.querySelector(".error")
        let $regBtn = document.querySelector(".tingle-btn--primary")
        let $regTitle = document.querySelector(".reg-title")
        $regBtn.addEventListener("click", async()=> {
            let type = $regBtn.textContent==="Регистрация" ? "reg" : "auth";
            let res = await send(type, {
                login: $("#login-input").val(), 
                password: $("#pass-input").val(),
                phone: $("#phone-input").val()
            }, "POST")

            if(res.search("error")===-1){
                window.localStorage.setItem("user", res)
                window.modal.close()
            }
            else {
                $error.style.display = "block"
                $error.textContent = res
                setTimeout(()=> {$error.style.display = 'none'}, 3000)
            }
        });
        $regTitle.addEventListener("click", ()=> {
            if($regBtn.textContent==="Регистрация"){
                $regBtn.textContent = "Авторизация"
                $regTitle.textContent = "Регистрация"
            }
            else {
                $regBtn.textContent = "Регистрация"
                $regTitle.textContent = "Авторизация"
            }
        });
        window.modal.open()
    }
    else {
        window.modal.setContent(userForm())
        window.modal.setFooterContent(`
            <div class="tingle-btn tingle-btn--primary">Изменить</div>
        `)
        let $error = document.querySelector(".error")
        document.querySelector(".tingle-btn--primary").addEventListener("click", async()=> {
            let child = [...document.querySelector(".user-form").children];
            let data = {
                login: window.user.login,
                password: window.user.password,
                email: child[1].value,
                phone: child[2].value,
                city: child[3].value,
                adres: child[4].value
            }
            let res = await send("readProfile", data, "POST")
            console.log(res)

            if(res.search("error")===-1){
                window.localStorage.setItem("user", res)
                window.modal.close()
            }
            else {
                $error.style.display = "block"
                $error.textContent = res
                setTimeout(()=> {$error.style.display = 'none'}, 3000)
            }
        });
        window.modal.open()
    }
}
function metaTagForm() {
    let content = $(".meta-tag").attr("content")

    window.modal.setContent(`
        <div style="color:black">meta tags:</div>
        <input id="meta-content" name="meta" value="${content}">
    `);
    window.modal.setFooterContent("");
    window.modal.addFooterBtn('Применить', 'tingle-btn tingle-btn--primary', ()=> {
        $(".meta-tag").attr("content", $("#meta-content").val())
        modal.close()
    });
    window.modal.addFooterBtn('Отмена', 'tingle-btn tingle-btn--danger', ()=> {
        modal.close()
    });
    window.modal.open()
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
        createTool("tag", 'meta', ()=> {
            metaTagForm()
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
            document.querySelectorAll(".info").forEach((elem)=> {
                elem.removeAttribute('contenteditable')
            });
            if(clb) clb()
            tool.remove()
        });

        document.querySelector(".admin").appendChild(tool)
    }
}
function addStory(nameTovar, priceOld, priceNew, src, selector) {
    let story = `
        <div class="tovar-cart cart-story line" onClick="goToStory(${selector})">
            <img class="tovar-img" src="${src}"></img>
            <div class="tovar-right">
                <b class="p-1">${nameTovar}</b>
                <div class="line">
                    <div class="column price" style="margin-top:2%;">
                        <div class="price-old">${priceOld}</div>
                        <div class="price-new">${priceNew}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    if(window.story.length < 10) window.story.unshift(story)
    else {
        window.story.unshift(story)
        window.story.pop()
    }

    window.localStorage.setItem("story", JSON.stringify(window.story)) 
}
function saveBottomSwiper() {
    const $swiper = document.querySelector(".bottom-swipe");
    let slides = [...$swiper.querySelectorAll(".swiper-slide")];

    window.sessionStorage.set('slides', slides)
}
async function save() {
    let url = document.location.href.replace(document.location.origin, '')
    if(url==="/") url = 'index.html'
    document.querySelector('.bay').remove()
    document.querySelector('.tingle-modal').remove()
    
    let res = await send("readSite", {
        login: window.user.login, 
        password: window.user.password,
        url: url, 
        data: $("html").html()
    }, "POST")
    console.log(res)
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
    else if(clas.contains("img-top") || clas.contains("tovar-img")){
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
    else if(clas.contains("galery-foto") || tag==="IMG"){
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
    if(!window.user || window.user.permision!=="admin"){
        $(".tool-add").css("visibility", "hidden")
    }
    $("body").on("click", (ev)=> {
        if(ev.target.hasAttribute('mod') && window.user.permision==="admin"){
            redact(ev.target)
        }
    });
    $(".two-nav").on("click", (ev)=> {
        let $root = $('body').attr("root")
        
        switch(ev.target.getAttribute("to")){
            case "glav": document.location.href = gurl
                break;
            case "catalog": if($root!=='index' && $root!=='shop'){
                document.location.href = gurl+"shop/"+urls[urls.length-2]+".html"
            }
                break;
            case "pay": document.location.href = gurl
                break;
            case "uslugi": document.location.href = gurl
                break;
            case "contact": document.location.href = gurl
                break;
        }
    });
    $(".main").on("click", (ev)=> {
        authorize()
    });
    $("#sells").on("click", (ev)=> {
        let $ = document.querySelector;
        let data = {
            name: $(".name-tovar").textContent,
            articul: $(".articul").textContent,
            src: $(".galery-foto").src,
            price: $(".price").textContent,
            count: +$("output").textContent===0 ? 1 : +$("output").textContent,
            info:  $("#info"),
            category: $('body').getAttribute("category"),
            id: $('body').id
        }

        window.bay.add(data)
    });
    $("#special").on("click", (ev)=> {
        let to = ev.target.getAttribute("to")
        let elem = document.querySelector(`#${to}`)
        let po = elem.querySelector(".price-old").textContent
        let pn = elem.querySelector(".price-new").textContent
        let src = elem.querySelector(".tovar-img").src

        addStory(elem.querySelector("b.p-1").textContent, po, pn, src, to)
    });
}