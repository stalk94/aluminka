const db = require("quick.db");


const slider = {
    index: [],
    "detail-plintus": [],
    "door-profile": [],
    furnityra: [],
    plintus: [],
    "shadow-profile": []
}



exports.Slider =(cat)=> {
    const getSlide =()=> slider[cat].map((slide, i)=> (`
        <div class="swiper-slide" id=":${i}" mod>
            <img src="${slide}"></img>
        </div>
    `));
    
    return(`
        <div class="swiper-container bottom-swipe">
            <div class="swiper-wrapper">
                ${getSlide()}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
        </div>
    `);
}