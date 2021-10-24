let windowAdmin = document.querySelector('.svg-window')
window.gurl = "http://localhost:3000/"
class EventEmmitter {
    constructor() {
      this.events = {};
    }
    on(eventName, fn) {
      if(!this.events[eventName]) this.events[eventName] = [];
      this.events[eventName].push(fn);
      
      return ()=> {
        this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
      }
    }
    emit(eventName, data) {
      const event = this.events[eventName];
      if(event){
        event.forEach((fn)=> {
          fn.call(null, data);
        });
      }
    }
}

if(!store.get("user")) store.set("user", {})
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
window.user = store.get("user")??{}
window.EVENT = new EventEmmitter()



const userForm =()=> {
    return(`
        <div class="user-form column">
            <div class="error"></div>
            <input class="input-userForm" type="email" placeholder="email" value="${user?user.email:''}">
            <input class="input-userForm" type="tel" placeholder="Телефон" value="${user?user.phone:''}">
            <input class="input-userForm" type="text" placeholder="Город" value="${user?user.city:''}">
            <input class="input-userForm" type="text" placeholder="Адрес" value="${user?user.adres:''}">
        </div>
    `);
}
function goTo(elem) {
    let category = elem.id.split("_")[0]
    let id = elem.id.split("_")[1]

    if(window.user && window.user.permision==="admin"){
        
    }
    else document.location.href = document.location.origin+"/"+category+"/"+id+".html"
}
async function authorize() {
    if(Object.keys(user).length<1){
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

window.URL.createObjectURL = webkitURL.createObjectURL


let swiperForvard = new Swiper(".bottom-swipe", {
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
if(document.querySelector(".swiperTovar")) {
    let swiperTovarMini = new Swiper(".swiperTovarMini", {
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
    });
    let swiperTovar = new Swiper(".swiperTovar", {
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


window.onload =()=> {
    if(Object.keys(window.user).length===0 || window.user.permision!=="admin"){
        $(".tool-add").css("visibility", "hidden")
        $(".tool-add").on("click", ()=> $(".Admin-add").css("display", "block"))
    }
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
    $(".tool-add").on("click", ()=> {$(".Admin-add").css("display", "block"); $(".Admin-add").css("z-index", "9999")})
    $("#exit-admin").on("click", ()=> $("Admin-add").css("display", "none"))
}