// слайдер рекомендаций
const $forvard = $(".swiper-wrapper")


var swiperForvard = new Swiper(".bottom-swipe", {
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
if(document.location.href!==document.location.host+'/index.html'){
    const $info = $(".info")
}
if(document.location.href===document.location.host+'/shop-list.html'){
    const $story = $(".story")
    const $list = $(".list")

    // галерея товаров
    var swypeList = new Swiper(".swypeList", {
        pagination: {
              el: ".swiper-pagination",
              clickable: true,
              renderBullet: function(index, className){
                return '<span class="' + className + '">' + (index + 1) + "</span>";
              },
        },
    });
}
if(document.location.href===document.location.host+'/tovar.html'){
    const $galery = $(".galery")
    const $body = $(".body")
    const $reviews = $(".reviews")
}