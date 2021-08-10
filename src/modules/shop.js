/**
 * После сохранения пройтись парсером
 */
const listTovar = document.querySelector(".list-tovar");
const story = document.querySelector("aside.story");
window.user = JSON.parse(window.localStorage.getItem("user"))


function goTo(elem) {
    let category = elem.id.split("_")[0]
    let id = elem.id.split("_")[1]
    document.location.href = document.location.origin+"/"+category+"/"+id+".html"
}


/** Добавить карточку товара и создать страницу товара */
function addTovar(nameTovar, category) {
    listTovar.innerHTML += `
        <div class="tovar-cart line" onClick="goTo(this)" id="${category}_${listTovar.children.length}" mod>
            <img class="tovar-img" src="../img/load/test.png"></img>
                <div class="tovar-right">
                <b class="p-1" mod>${nameTovar}</b>
                <div class="p-1 opisanie-div" mod>
                    Заполните описание...
                </div>
                <div class="line">
                    <div class="column price" style="margin-top:2%;">
                        <div class="price-old" mod>200₴</div>
                        <div class="price-new" mod>100₴</div>
                    </div>
                    <div class="column" style="flex:1;margin-top:2%;padding-left:15%;">
                        <div class="fiolet-button" style="height:65%;margin-bottom:2%;">Купить</div>
                        <div class="green-button">В закладки</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    send("addTovar", {
        login: window.user.login, 
        password: window.user.password, 
        category: category, 
        id: listTovar.children.length-1,
    }, "POST").then((res)=> console.log(res))
}


function addStory(nameTovar, priceOld, priceNew, src) {
    story.innerHTML += `
        <div class="tovar-cart line">
            <img class="tovar-img" src="${src}"></img>
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
    `;
}


async function render() {
    let data = await send(Main.category, {}, "GET")
    listTovar.innerHTML = data
}


const swypeList = new Swiper(".swypeList", {
    pagination: {
        el: ".swiper-paginations",
        clickable: true,
        renderBullet: function(index, className){
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    },
});