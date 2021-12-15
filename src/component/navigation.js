import React from 'react';
import { RiShoppingBasketLine } from 'react-icons/ri';



export default function Navigation(props) { 
    const useClickUrl =(cat)=> {
        switch(cat){
            case 'index': getRoot()!=='index' ? setUrl('') : ''
                break;
            case 'catalog': getRoot()!=='catalog' ? setUrl('catalog') : ''
                break;
            case 'payment': getRoot()!=='payment' ? setUrl('payment') : ''
                break;
            case 'services': getRoot()!=='services' ? setUrl('services') : ''
                break;
            case 'contact': getRoot()!=='contact' ? setUrl('contact') : ''
                break;
        }
    }

    return(
        <nav className="two-nav line" style={{zIndex:"2", position:"relative"}}>
            <img className="logo" width="70px" src={"../img/logo.svg"}/>
            <div className="navigation" onClick={()=> useClickUrl('index')} info="Главная">
                Главная
            </div>
            <div className="navigation" onClick={()=> useClickUrl('payment')} info="Оплата и доставка">
                Оплата и доставка
            </div>
            <div className="navigation" onClick={()=> useClickUrl('services')} info="Услуги">
                Услуги
            </div>
            <div className="navigation" onClick={()=> useClickUrl('contact')} info="Контакты">Контакты</div>
                
            <p className="navigation" onClick={()=> EVENT.emit("bay.open", true)}>
                <RiShoppingBasketLine/>
            </p>
        </nav>
    );
}