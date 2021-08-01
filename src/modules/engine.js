const urls = document.location.href.split("/")

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
    const $info = $(".info")
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
            swiper: swiper,
        }
    });
}