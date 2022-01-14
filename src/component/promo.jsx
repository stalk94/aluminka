import React from 'react';
import { Button } from 'primereact/button';
import globalState from "../global.state";



export default function Promo(props){return(
    <section className="two">
        <h3> Вас приветсвует! </h3> 
        <h3 style={{marginTop:"-15px"}}> Производитель ТОВ АЛЮМИНКА </h3>
        <div className="prom-blok">
            <h5 className="info" style={{width:"65%"}}>
                { globalState.promoText.get() }
            </h5>
             <img src="img/title.png" className="prom-img"/>
        </div>
        <Button className="p-button-secondary" label='Смотреть еще' />
    </section>
)};