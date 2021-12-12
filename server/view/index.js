const db = require("quick.db");
const { Slider } = require("../component/slider");
const { Nav, FeedBack } = require("../component/nav");


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


exports.index =(state)=> (`
    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=IANAcharset">
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">

        <link rel="stylesheet" href="css/swiper-bundle.min.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/canvas.css">
        <link rel="stylesheet" href="css/tingle.min.css">
        <link rel="stylesheet" href="app.ea5511b2.css">

        <script src="store.legacy.min.js"></script>
        <script src="jquery-3.6.0.min.js"></script>
        <script src="tingle.min.js"></script>
        <script src="swiper-bundle.min.js"></script>
        <script src="modules/app.js"></script>

        <title>Aluminka</title>
        <meta name="description" content="${db.get("SYS.meta")}">
    </head>

    <body root="index">
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
                ${Slider("index")}
            </section>
            <section>
                ${FeedBack()}
            </section>
        </main>

        <footer></footer>

        <script src="modules/engine.js"></script>
        <script src="app.287afcf5.js" defer></script>
        <script src="app.b9d84a4f.js" defer></script>
        <script src="app.4613b083.js" defer></script>
        <script src="app.d6b4c067.js" defer></script>
        <script src="app.2063a7d1.js" defer></script>
        <script src="app.62549705.js" defer></script>
        <script src="app.30fb701b.js" defer></script>
        <script src="app.58b78e72.js" defer></script>
    </body>
`);