import $ from "jquery";
const urls = document.location.href.split("/")


(function($){
    $.fn.overlaps = function(obj) {
        let elems = {targets: [], hits:[]};
        this.each(function() {
            let bounds = $(this).offset();
            bounds.right = bounds.left + $(this).outerWidth();
            bounds.bottom = bounds.top + $(this).outerHeight();

            let compare = $(obj).offset();
            compare.right = compare.left + $(obj).outerWidth();
            compare.bottom = compare.top + $(obj).outerHeight();

            if(!(compare.right < bounds.left ||
                compare.left > bounds.right ||
                compare.bottom < bounds.top ||
                compare.top > bounds.bottom)
               ){
                elems.targets.push(this);
                elems.hits.push(obj);
            }
        });

        return elems;
    };
}($));
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
}




// document controller
if(urls[urls.length-1]!=='/'){
    $("body").on("click", (ev)=> {
        let info = ev.target.getAttribute("info")
        
        if(info) alert(info)
        if(ev.target.hasAttribute('mod')) redact(ev.target)
    });
}
if(urls[urls.length-1]==='shop'){
    // галерея товаров
    const swypeList = new Swiper(".swypeList", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function(index, className){
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
    });
    
}
if(urls[urls.length-1]==='product'){
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