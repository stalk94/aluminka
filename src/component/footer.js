import React, { useState } from 'react';
import ReactDOM from "react-dom";



const Footer =(props)=> {
    
    return(
        <>
            <section className="line">
                <ul className="column">
                    <li>Контакты</li>
                    <li>Возврат товара</li>
                    <li>Условия и договор</li>
                </ul>
                <ul className="column" style={{marginLeft:"20%"}}>
                    <li>Каталог</li>
                    <li>Производители</li>
                    <li>Акции</li>
                </ul>
            </section>
            <section className="coop">
                ТОВ Алюминка - производство алюминиевых профилей © 2021
            </section>
        </>
    );
}


ReactDOM.render(<Footer/>, document.querySelector("footer"))