const db = require("quick.db");
const { Slider } = require("../slider");
const { images } = require("./index");


/** 
 * bd: `SYS.detail_plintus`
*/
const str =()=> (`
    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=IANAcharset">
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
        
        <link rel="stylesheet" href="../css/swiper-bundle.min.css"/>
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/tovar-cart.css">
        <link rel="stylesheet" href="../css/shop-list.css">
        <link rel="stylesheet" href="../css/tingle.min.css">

        <script src="https://polyfill.io/v3/polyfill.js"></script>
        <script src="swiper-bundle.min.js"></script>
        <script src="tingle.min.js"></script>
        <script src="modules/app.js"></script>

        <title>Aluminka</title>
        <meta class="meta-tag" name="description" content="${db.get("SYS.meta")}"/>
    </head>

    <body root="detail-plintus">
        <div style="z-index: 9;" class="Bays"></div>
        <div class="Modal"></div>
        <div class="Admin-add"></div>

        <header>
            <div class="Titles"></div>
            <div class="Nav"></div>
            
            <div class="top-img">
                <img class="img-top" src="../img/foot_fon.png">
            </div>
        </header>

        <main>
            <section class="one">
                <h5 class="info" mod>
                    ${db.get("SYS.detail_plintus")}
                </h5>
            </section>

            <section class="two line">
                <aside class="story">
                    <div class="head-blok story-blok">Избранное</div>
                </aside>
                
                
                <div class="swiper-containers">
                    <div class="head-blok line">
                        <div>Товары</div>
                        <div class="tool-add" mod="">➕</div>
                    </div>

                    <div class="list-tovar"></div>
                </div>
            </section>

            <section class="three">
                <h2>Выгодные предложения:</h2>
                ${Slider("detail-plintus")}
            </section>

            <section>
                <div style="padding-left: 40%;">
                    <h2 style="padding-left:1%;">Остались вопросы?</h2>
                    <form class="column" method="POST" action="/question">
                        <input type="text" name="name" placeholder="Ваше имя:">
                        <input type="email" name="email" placeholder="Ваш email:">
                        <input type="text" name="text" placeholder="Ваш вопрос:">
                        <input type="submit" placeholder="Отправить">
                    </form>
                </div>
            </section>
        </main>
        
        <footer></footer>

        <script src="modules/engine.js"></script>
        <script src="app.287afcf5.js" defer></script>
        <script src="app.4613b083.js" defer></script>
        <script src="app.2063a7d1.js" defer></script>
        <script src="app.62549705.js" defer></script>
        <script src="app.30fb701b.js" defer></script>
        <script src="app.58b78e72.js" defer></script>
    </body>
`);




module.exports = str