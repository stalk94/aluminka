function addTovar(nameTovar, opisanieTovar, priceOld, priceNew, id) {
    $(".list-tovar").html(`
        <div class="tovar-cart line" id="${id}">
            <img class="tovar-img" src="img/load/${id}.png"></img>
                <div class="tovar-right">
                <b class="p-1">${nameTovar}</b>
                <div class="p-1 opisanie-div">
                    ${opisanieTovar}
                </div>
                <div class="line">
                    <div class="column price" style="margin-top:2%;">
                        <div class="price-old">${priceOld}</div>
                        <div class="price-new">${priceNew}</div>
                    </div>
                    <div class="column" style="flex:1;margin-top:2%;padding-left:15%;">
                        <div class="fiolet-button" style="height:65%;margin-bottom:2%;">Купить</div>
                        <div class="green-button">В закладки</div>
                    </div>
                </div>
            </div>
        </div>
    `)
}


function addStory(nameTovar, priceOld, priceNew, id) {
    $("aside.story").html(`
        <div class="tovar-cart line" id="${id}">
            <img class="tovar-img" src="img/load/${id}.png"></img>
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
    `)
}


function renderTovar(category) {

}


function renderStory(category) {

}