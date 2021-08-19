const listTovar = document.querySelector(".list-tovar");
const story = document.querySelector("aside.story");
window.user = JSON.parse(window.localStorage.getItem("user"))
var storys = window.localStorage.getItem("story")===null ? null : JSON.parse(window.localStorage.getItem("story"))


function goTo(elem) {
    let category = elem.id.split("_")[0]
    let id = elem.id.split("_")[1]
    
    if(window.user.permision==="admin"){
        console.log(elem.innerHTML)
    }
    else document.location.href = document.location.origin+"/"+category+"/"+id+".html"
}
function goToStory(path) {
    let category = path.id.split("_")[0]
    let id = path.id.split("_")[1]

    document.location.href = document.location.origin+"/"+category+"/"+id+".html"
}
function dblclTo(elem) {
    let category = elem.id.split("_")[0]
    let id = elem.id.split("_")[1]
    if(window.user.permision==="admin") document.location.href = document.location.origin+"/"+category+"/"+id+".html"
}



function addTovar(nameTovar, category) {
    listTovar.innerHTML += `
        <div class="tovar-cart line" onClick="goTo(this)" ondblclick="dblclTo(this)" id="${category}_${listTovar.children.length}">
            <img class="tovar-img" src="../img/load/test.png" mod></img>
            <div class="tovar-right">
                <b class="p-1 info" mod>${nameTovar}</b>
                <div class="p-1 opisanie-div info" mod>
                    Заполните описание...
                </div>
                <div class="line">
                    <div class="column price" style="margin-top:2%;">
                        <div class="price-old info" mod>200₴</div>
                        <div class="price-new info" mod>100₴</div>
                    </div>
                    <div class="column" style="flex:1;margin-top:2%;padding-left:15%;">
                        <div class="fiolet-button" id="sell" to="${category}_${listTovar.children.length}" style="height:65%;margin-bottom:2%;">Купить</div>
                        <div class="green-button" id="special" to="${category}_${listTovar.children.length}">В закладки</div>
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



const swypeList = new Swiper(".swypeList", {
    pagination: {
        el: ".swiper-paginations",
        clickable: true,
        renderBullet: function(index, className){
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    },
});
if(storys!==null){
    const root = document.querySelector('.story')
    root.innerHTML = ''
    root.innerHTML += '<div class="head-blok story-blok">Избранное</div>'

    storys.forEach((elem)=> {
        root.innerHTML += elem
    });
}