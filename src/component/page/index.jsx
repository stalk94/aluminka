import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";          
import "primeicons/primeicons.css"; 
import React from 'react';
import { Button } from 'primereact/button';
import Promo from "../promo";
import { NavShop } from "../page/navigation";
import Footer, { Feedback } from "../footer";
import fon from "../../img/top_fon.png";
import { useState } from '@hookstate/core';
import globalState from "../../global.state";



const Header =()=> (
    <header>
        <div className="Titles"></div>
        <div className="Nav"></div>
        <div className="top-img">
            <img 
                className="img-top" 
                src={fon}
            />
        </div>
    </header>
);



export default function Index() {
    const glob = useState(globalState);

    
    const useClick =(num)=> {
        console.log(num)
    }
    const useDir =(dir)=> {
        glob.set((st)=> {
            st.dir = dir 
            return st
        });
    }

    return(
        <>
            <div className="app"></div>
            <div className="Modal"></div>
            <div style={{zIndex:"10"}} className="Bays"></div>
            <Header />
            <main>
                <section className="one">
                    <NavShop useCategory={useDir} />
                    <Button 
                        onClick={()=> useClick(0)}
                        label="Прайс на алюминевый плинтус" 
                        className="p-button-outlined p-button-danger" 
                    />
                    <Button 
                        onClick={()=> useClick(1)}
                        label="Прайс на дверной профиль" 
                        className="p-button-outlined p-button-danger" 
                    />
                </section>
                <div className="Promo">
                    <Promo />
                </div>
                <section className="three">
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