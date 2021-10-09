if(window.user && window.user.permision==="admin" && !window.partials) window.partials = new Partials()
var storys = window.localStorage.getItem("story")===null ? null : JSON.parse(window.localStorage.getItem("story"))



function goTo(elem) {
    let category = elem.id.split("_")[0]
    let id = elem.id.split("_")[1]

    if(window.user && window.user.permision==="admin"){
        if(elem.parentElement.className==="list-render"){
            let selected = elem.parentElement.querySelector(".selected")
            if(selected) selected.classList.remove("selected")
            
            const clone =()=> { 
                elem.classList.toggle("selected")
                let clon = elem.cloneNode(true)
                let img = clon.querySelector("img.tovar-img")
                let txt = clon.querySelector(".p-1.info")
                let div = document.createElement("div")
                img.className = "story-img"
                img.removeAttribute("mod")
                txt.removeAttribute("mod")
                div.appendChild(img)
                div.appendChild(txt)
                storySelect.style.display = "grid"
                storySelect.style["margin-left"] = "3px"
                storySelect.style["margin-right"] = "3px"
                storySelect.style["background-color"] = "rgba(128, 128, 128, 0.2)"
                txt.style.color = "white"
                storySelect.innerHTML = div.innerHTML
                storySelect.id = clon.id
                storySelect.onclick = clon.onclick
                storySelect.ondblclick = clon.ondblclick
            }
            if(storySelect) clone()
        }
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
    let listTovar = document.querySelector(".list-tovar")
    let list = `
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
        list: list
    }, "POST").then((res)=> {
        document.querySelector(".list-tovar").innerHTML = ''
        if(res) document.querySelector(".list-tovar").innerHTML = res
    });
}




if(storys!==null){
    let root = document.querySelector('.story')
    root.innerHTML = ''
    root.innerHTML += '<div class="head-blok story-blok">Избранное</div>'

    storys.forEach((elem)=> {
        root.innerHTML += elem
    });
}