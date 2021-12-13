import React from 'react';
import { RiShoppingBasketLine } from 'react-icons/ri';



export default function Navigation(props) { 
    const [cat, setCat] = React.useState(getCat())

    const useClickUrl =()=> {
        setCat(getCat());

        switch(cat){
            case 'index': getRoot()!=='index' ? useClickUrl('') : ''
                break;
            case 'catalog': getRoot()!=='catalog' ? useClickUrl('catalog') : ''
                break;
            case 'payment': getRoot()!=='payment' ? useClickUrl('payment') : ''
                break;
            case 'services': getRoot()!=='services' ? useClickUrl('services') : ''
                break;
            case 'contact': getRoot()!=='contact' ? useClickUrl('contact') : ''
                break;
        }
    }

    return(
        <nav className="two-nav line" style={{zIndex:"2",position:"relative"}}>
            <img className="logo" width="70px" src={getRoot()==="index"?"img/logo.svg":"../img/logo.svg"}/>
            <div className="navigation" onClick={useUrl} info="Главная">Главная</div>
            <div className="navigation" onClick={useUrl} info="Каталог">Каталог</div>
            <div className="navigation" onClick={useUrl} info="Оплата и доставка">Оплата и доставка</div>
            <div className="navigation" onClick={useUrl} info="Услуги">Услуги</div>
            <div className="navigation" onClick={useUrl} info="Контакты">Контакты</div>
                
            <p className="navigation" onClick={()=> EVENT.emit("bay.open", true)}>
                <RiShoppingBasketLine/>
            </p>
        </nav>
    );
}