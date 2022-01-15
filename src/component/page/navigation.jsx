import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";          
import "primeicons/primeicons.css"; 
import 'primeflex/primeflex.css';
import React from 'react';
import { RiShoppingBasketLine } from 'react-icons/ri';
import { Card } from 'primereact/card';
import { useState } from '@hookstate/core';
import globalState from "../../global.state";
import logo from "../../img/logo.svg";


export function NavShop({useCategory}) {
    const state = useState(globalState.component.navigation);

    return(
        <div style={{width:"80%",marginLeft:"10%",marginBottom:"4%",marginTop:"-5%"}}>
            <div className="p-grid">
                <div onClick={()=> useCategory(0)} className="p-col">
                    <Card>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <img style={{height:"100px"}} src="../../img/category/1.png" />
                            <div>{ state.get()[0].name }</div>
                        </div>
                    </Card>
                </div>
                <div onClick={()=> useCategory(1)} className="p-col">
                    <Card>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <img style={{height:"100px"}} src="../../img/category/2.png" />
                            <div>{ state.get()[1].name }</div>
                        </div>
                    </Card>
                </div>
                <div onClick={()=> useCategory(2)} className="p-col">
                    <Card>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <img style={{height:"100px"}} src="../../img/category/3.png" />
                            <div>{ state.get()[2].name }</div>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="p-grid">
                <div onClick={()=> useCategory(3)} className="p-col">
                    <Card>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <img style={{height:"100px"}} src="../../img/category/4.png" />
                            <div>{ state.get()[3].name }</div>
                        </div>
                    </Card>
                </div>
                <div onClick={()=> useCategory(4)} className="p-col">
                    <Card>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <img style={{height:"100px"}} src="../../img/category/5.png" />
                            <div>{ state.get()[4].name }</div>
                        </div>
                    </Card>
                </div>
                <div onClick={()=> useCategory(5)} className="p-col">
                    <Card>
                        <div style={{display:"flex",flexDirection:"row"}}>
                            <img style={{height:"100px"}} src="../../img/category/6.png" />
                            <div>{ state.get()[5].name }</div>
                        </div>
                    </Card>
                </div>
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
            <div className="navigation" onClick={()=> useClickUrl(6)} info="Главная">
                Главная
            </div>
            <div className="navigation" onClick={()=> useClickUrl(7)} info="Оплата и доставка">
                Оплата и доставка
            </div>
            <div className="navigation" onClick={()=> useClickUrl(8)} info="Услуги">
                Услуги
            </div>
            <div className="navigation" onClick={()=> useClickUrl(9)} info="Контакты">
                Контакты
            </div>
            
            <p className="navigation" onClick={()=> EVENT.emit("bay.open", true)}>
                <RiShoppingBasketLine/>
            </p>
        </nav>
    );
}