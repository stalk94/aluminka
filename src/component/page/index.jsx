import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";          
import "primeicons/primeicons.css"; 
import React from 'react';
import { Button } from 'primereact/button';
import Promo from "../promo";
import { NavShop } from "../page/navigation";
import Footer, { Feedback } from "./footer";
import { useState } from '@hookstate/core';
import globalState from "../../global.state";
import Header from "./header";




export default function Index() {
    const glob = useState(globalState);

    const useClick =(num)=> {
        // 2 кнопки прайсов
    }
    const useDir =(dir)=> {
        glob.set((st)=> {
            st.dir = st.component.navigation[dir]
            return st
        });
    }


    return(
        <>
            <div className="app"></div>
            <div className="Modal"></div>
            <div style={{zIndex:"10"}} className="Bays"></div>
            <Header useClickUrl={useDir} />
            <main>
                <section className="one">
                    <NavShop useCategory={useDir} />
                    <div style={{marginLeft:"25%"}}>
                        <Button style={{fontSize:"14px"}}
                            onClick={()=> useClick(0)}
                            label="Прайс на алюминевый плинтус" 
                            className="p-button-outlined p-button-warning" 
                        />
                        <Button style={{fontSize:"14px",marginLeft:"2%"}}
                            onClick={()=> useClick(1)}
                            label="Прайс на дверной профиль" 
                            className="p-button-outlined p-button-warning" 
                        />
                    </div>
                </section>
                <div className="Promo">
                    <Promo />
                </div>
                <section style={{width:"100%"}}>
                    <h2>Наши партнеры:</h2>
                    <div className="Slider">
                        
                    </div>
                </section>
                <section>
                    <Feedback />
                </section>
            </main>
            <Footer />
        </>
    );
}