const slider = {
    index: [
        'https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8.png', 
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH7RvFw0QmKad3p9_VcgSPz6S-XcSNZyJKeg&usqp=CAU'
    ],
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