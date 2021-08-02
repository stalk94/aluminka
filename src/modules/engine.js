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



// document controller
if(urls[urls.length-1]!=='index.html'){
    
}
if(urls[urls.length-1]==='shop-list.html'){
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
if(urls[urls.length-1]==='tovar.html'){
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