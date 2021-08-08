function setTovarInfo(name, articul, model, colors, priceOld, priceNew) {
    let prices = `<h2 style="background-color: rgb(20, 20, 20);margin-top:10%;">${priceOld} грн/шт.</h2>`;
    if(priceNew) prices += `<h2 style="background-color: rgb(20, 20, 20);margin-top:10%;">${priceNew} грн/шт.</h2>`

    $(".bodyGalery").html(`
        <h2>${name}</h2>
        <p>Код товара: ${articul}</p>
        <p>Модель: ${model}</p>
        <p>Цвет: ${colors}</p>
        ${prices}
    `)
}


function setOpisanie(o={}) {
    $('.tovar-text').html(`
        <h5>${o.text}</h5>
        <h4 style="text-decoration:underline;text-decoration-style:dotted;">Характеристики:</h4>
        <p>Материал: ${o.material}</p>
        <p>Покрытие: ${o.all}</p>
        <p>Ширина:  ${o.width}(мм)</p>
        <p>Высота: ${o.height}(мм)</p>
        <p>Длинна:  ${o.long}(мм)</p>
        <p>Цвет: ${o.colors}</p>
    `)
}


function setImage(src) {
    $('.swiperTovarWraper').html(`
        <div class="swiper-slide">
            <img class="tovar-img" src="img/load/${src}"></img>
        </div>
    `)
}


const Galery = {
    images: [...document.querySelector(".miniContainer").children],
    addImages(src) {
        document.querySelector(".miniContainer").innerHTML += `
            <div class="swiper-slide">
                <img class="tovar-img" src="img/load/${src}"></img>
            </div>
        `
    }
}