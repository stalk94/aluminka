import React from 'react';
import { send } from "./engine";
import { useLocalstorageState } from "rooks";
import { Button, Card } from '@nextui-org/react';

const txt = ` 
С 2015 года наша компания занимается продажей напольных плинтусов из алюминия, дверных профилей и профилей теневого шва. 
В нашем каталоге вы сможете найти именно тот профиль, который больше всего подходит для решения ваших задач. 
Алюминиевый профиль имеет различные формы, размеры и предназначение. Давайте поговорим об этом подробнее. 
Самый первый раздел каталога это плоский плинтус. Плоский плинтус имеет классическую форму Л-образную, имеет плавный переход от стены к полу, 
при этом плинтус не выглядит громоздким, так как имеет небольшую толщину. 
Так как плинтус плоский размещение каких-либо проводов за плинтусом не представляется возможным. 
Плинтус имеет различную высоту от 40 до 100 мм и различную ширину по полу от 11 до 18 мм. 
Монтаж такого плинтуса осуществляется на жидкие гвозди, жидкие гвозди наносятся на заднюю поверхность плинтуса и прижимается к стене.
Данный плинтус идет в классическом анодированном светло-сером цвете. Также данные плинтуса могут быть покрашены по желанию заказчика в любой цвет по каталогу RAL.
`



export default function Nav(props) {
    const [dir, setDir] = useLocalstorageState("Nav", "index")

    return(
        <section className="one">
            <div className="grid">
                <div className="nav-cart">
                    <h3 style="color:black;padding-left:3px;">ПЛИНТУСА</h3>
                    <div className="line">
                        <div onClick={()=> setDir("plintus")} className="fiolet-button cat" url="shop/plintus.html">Смотреть все</div>
                        <img className="nav-img" height="125px" width="110px" src="img/category/1.png"/>
                    </div>
                </div>
                <div className="nav-cart">
                    <h3 style="color:black;padding-left:3px;">ФУРНИТУРА К ПЛИНТУСАМ</h3>
                    <div className="line">
                        <div onClick={()=> setDir("detail-plintus")} className="fiolet-button cat" url="shop/detail-plintus.html">Смотреть все</div>
                        <img className="nav-img" height="125px" width="110px" src="img/category/2.png"/>
                    </div>
                </div>
                <div className="nav-cart">
                    <h3 style="color:black;padding-left:3px;">ДВЕРНЫЕ ПРОФИЛЯ</h3>
                    <div className="line">
                        <div onClick={()=> setDir("door-profile")} className="fiolet-button cat" url="shop/door-profile.html">Смотреть все</div>
                        <img className="nav-img" height="125px" width="110px" src="img/category/3.png"/>
                    </div>
                </div>
                <div className="nav-cart">
                    <h3 style="color:black;padding-left:3px;">ФУРНИТУРА</h3>
                    <div className="line">
                        <div onClick={()=> setDir("fyrnityra")} className="fiolet-button cat" url="shop/fyrnityra.html">Смотреть все</div>
                        <img className="nav-img" height="125px" width="110px" src="img/category/4.png"/>
                    </div>
                </div>
                <div className="nav-cart">
                    <h3 style="color:black;padding-left:3px;">ПРОФИЛЯ ТЕНЕВОГО ШВА</h3>
                    <div className="line">
                        <div onClick={()=> setDir("shadow-profile")} className="fiolet-button cat" url="shop/shadow-profile.html">Смотреть все</div>
                        <img className="nav-img" height="125px" src="img/category/5.png"/>
                    </div>
                </div>
                <div className="nav-cart">
                    <h3 style="color:black;padding-left:3px;">НУЖНА ПОМОЩЬ?</h3>
                    <div className="line">
                        <div onClick={()=> setDir("help")} className="fiolet-button">Смотреть все</div>
                        <img className="nav-img" height="125px" width="110px" src="img/category/6.png"/>
                    </div>
                </div>
            </div>

            <div className="line" style="margin-left:30%;">
                <div className="button" onClick={()=> setDir("price")}>Прайс на алюминевый плинтус</div>
                <div className="red-button" style="margin-left:3%;">Прайс на дверной профиль</div>
            </div>
        </section>
    );
}


export function Promo(props) {
    const [text, setText] = useLocalstorageState("Promo", txt)

    return(
        <section className="two">
            <h3>Вас приветсвует!</h3> 
            <h3 style="margin-top:-15px;">Производитель ТОВ АЛЮМИНКА</h3>
            <div className="prom-blok">
                <h5 className="info" style="width:65%;">
                   { text }
                </h5>
                <img src="img/title.png" className="prom-img"/>
            </div>
            <div className="button">Смотреть еще</div>
        </section>
    );
}


export function Parthers(props) {
    return(
        <section class="three">
            <h2>Наши партнеры:</h2>
            
        </section>
    )
}