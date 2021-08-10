window.user = JSON.parse(window.localStorage.getItem("user"))
//if(!window.user || window.user.permision!=="admin") document.querySelector(".foto-add").style.display = "none"


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