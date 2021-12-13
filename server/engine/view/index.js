const fs = require("fs");
const db = require("quick.db");
const { Slider } = require("../slider");
const { Nav, FeedBack } = require("../nav");


exports.images = {
    top: "img/top_fon.png",
    foot:"img/foot_fon.png"
} 
const toPrices =(type)=> {
    if(type==="plintus") return "console.log('plintus')"
    else return "console.log('profile')"
}
const Butons = (`
    <div class="line" style="margin-left:30%;">
        <div class="button" onclick="${toPrices('plintus')}">Прайс на алюминевый плинтус</div>
        <div class="red-button" onclick="${toPrices('profile')}" style="margin-left:3%;">Прайс на дверной профиль</div>
    </div>
`);


module.exports = (`
    <head>
        <meta charset="utf-8">
        <meta name="description" content="${db.get("SYS.meta")}">
        <meta http-equiv="Content-Type" content="text/html; charset=IANAcharset">
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">

        <link rel="stylesheet" href="css/dx.light.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/canvas.css">

        <script src="global.js"></script>
        <title>Aluminka</title>
    </head>

    <body root="index">
        <div class="Modal"></div>
        <div style="z-index: 9;" class="Bays"></div>

        <header>
            <div class="Titles"></div>
            <div class="Nav"></div>
            <div class="top-img">
                <img class="img-top" src="${exports.images.top}" mod>
            </div>
        </header>

        <main>
            <section class="one">
                ${Nav()}
                ${Butons}
            </section>

            <div class="Promo"></div>

            <section class="three">
                <h2>Наши партнеры:</h2>
                <div class="Slider"></div>
            </section>
            <section>
                ${FeedBack()}
            </section>
        </main>

        <footer>
            <section class="line">
                <ul class="column">
                    <li>Контакты</li>
                    <li>Возврат товара</li>
                    <li>Условия и договор</li>
                </ul>
                <ul class="column" style="margin-left:"20%">
                    <li>Каталог</li>
                    <li>Производители</li>
                    <li>Акции</li>
                </ul>
            </section>
            <section class="coop">
                ТОВ Алюминка - производство алюминиевых профилей © 2021
            </section>
        </footer>

        <script src="index.379dd93c.js"></script>
    </body>
`);