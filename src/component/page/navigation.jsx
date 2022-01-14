import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";          
import "primeicons/primeicons.css"; 
import 'primeflex/primeflex.css';
import React from 'react';
import { RiShoppingBasketLine } from 'react-icons/ri';
import logo from "../../img/logo.svg";


export function NavShop({useCategory}) {
    return(
        <div>
            <div className="p-grid">
                <div className="p-col"></div>
                <div className="p-col"></div>
                <div className="p-col"></div>
            </div>
            <div className="p-grid">
                <div className="p-col"></div>
                <div className="p-col"></div>
                <div className="p-col"></div>
            </div>
        </div>
    );
}


export default function Navigation({useClickUrl}) { 
    return(
        <nav className="two-nav line" style={{zIndex:"2",position:"relative"}}>
            <img 
                className="logo" 
                width="70px" 
                src={logo}
            />
            <div className="navigation" onClick={()=> useClickUrl('index')} info="Главная">
                Главная
            </div>
            <div className="navigation" onClick={()=> useClickUrl('payment')} info="Оплата и доставка">
                Оплата и доставка
            </div>
            <div className="navigation" onClick={()=> useClickUrl('services')} info="Услуги">
                Услуги
            </div>
            <div className="navigation" onClick={()=> useClickUrl('contact')} info="Контакты">
                Контакты
            </div>
            
            <p className="navigation" onClick={()=> EVENT.emit("bay.open", true)}>
                <RiShoppingBasketLine/>
            </p>
        </nav>
    );
}