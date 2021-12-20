const fs = require("fs");
const db = require("quick.db");
const { Slider } = require("../slider");


/** 
 * bd: `SYS.furnityra`
*/
module.exports =(state)=> (`
    <!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=IANAcharset">
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">

        <link rel="stylesheet" href="../css/dx.light.css">
        <link rel="stylesheet" href="../css/admin.css">
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/tovar-cart.css">
        <link rel="stylesheet" href="../css/shop-list.css">

        <script src="../global.js"></script>

        <title>Aluminka</title>
        <meta class="meta-tag" name="description" content="${db.get("SYS.meta")}"/>
    </head>


    <body root="fyrnityra">
        <script>
            window.$tovar = ${JSON.stringify(db.get('tovars.fyrnityra'))}
            window.$state = ${JSON.stringify(state)}
        </script>
        <div class="app"></div>
        <div style="z-index: 10;" class="Bays"></div>
        <div class="Modal"></div>

        <header>
            <div class="Titles"></div>
            <div class="Nav"></div>
            <div class="top-img">
                <img class="img-top" src="../img/foot_fon.png" mod>
            </div>
        </header>

        <main>
            <section class="two line">
                <aside class="story">
                    <div class="head-blok story-blok">Фильтры</div>
                </aside>
                
                <div class="swiper-containers">
                    <div class="head-blok line">
                        <div>Товары</div>
                        <div class="tool-add">➕</div>
                    </div>

                    <div class="list-tovar"></div>
                </div>
            </section>

            <section class="three">
                <h2>Выгодные предложения:</h2>
                <div class="Slider"></div>
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

        <script src="../index.379dd93c.js"></script>
    </body>
    </html>
`);