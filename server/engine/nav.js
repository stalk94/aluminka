const navCart =(props)=> (`
    <div class="nav-cart">
        <h3 style="color:black;padding-left:3px;"> ${props.category} </h3>
        <div class="line">
            <div url="${props.url}" onclick="toCat(this)" class="fiolet-button cat"> 
                Смотреть все 
            </div>
            <img class="nav-img" height="125px" width="110px" src="${props.src}">
        </div>
    </div>
`);



exports.Nav =(props)=> { 
    const urls = ["plintus", "detail-plintus", "door-profile", "furnityra", "shadow-profile"];
    const category = ["ПЛИНТУСА", "ФУРНИТУРА К ПЛИНТУСАМ", "ДВЕРНЫЕ ПРОФИЛЯ", "ФУРНИТУРА", "ПРОФИЛЯ ТЕНЕВОГО ШВА"];
    const str =()=> {
        let data = ""
        urls.map((url, i)=> {
            data += navCart({
                category: `${category[i]}`, 
                src: `img/category/${i+1}.png`,
                url: `${url}`})
        });
        return data
    };

    return(`
        <div class="grid">
            ${str()}
            <div class="nav-cart">
                <h3 style="color:black;padding-left:3px;">НУЖНА ПОМОЩЬ?</h3>
                <div class="line">
                    <div class="fiolet-button">Смотреть все</div>
                    <img class="nav-img" height="125px" width="110px" src="img/category/6.png">
                </div>
            </div>
        </div>
    `);
}


exports.FeedBack =()=> {
    return(`
        <div style="padding-left: 30%;">
            <h2 style="padding-left:1%;">Остались вопросы?</h2>
                <form class="feedback" class="column" method="POST" action="/question">
                    <input type="text" name="name" placeholder="Ваше имя:">
                    <input type="email" name="email" placeholder="Ваш email:">
                    <input type="text" name="text" placeholder="Ваш вопрос:">
                    <input type="submit" placeholder="Отправить">
            </form>
        </div>
    `);
}