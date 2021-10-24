import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { RiShoppingBasketLine } from 'react-icons/ri';


const root = document.body.getAttribute("root")


const Nav =(props)=> {
    const style = {zIndex:"2", position:"relative"}

    return(
        <>
            <nav className="two-nav line" style={style}>
                <img className="logo" width="70px" src={root==="index"?"img/logo.svg":"../img/logo.svg"}/>
                <p className="navigation" to="glav" info="Главная">Главная</p>
                <p className="navigation" to="catalog" info="Каталог">Каталог</p>
                <p className="navigation" to="pay" info="Оплата и доставка">Оплата и доставка</p>
                <p className="navigation" to="uslugi" info="Услуги">Услуги</p>
                <p className="navigation" to="contact" info="Контакты">Контакты</p>
                
                <p className="navigation" onClick={()=> EVENT.emit("bay.open", true)}>
                    <RiShoppingBasketLine/>
                </p>
            </nav>
        </>
    );
}



ReactDOM.render(<Nav/>, document.querySelector(".Nav"))