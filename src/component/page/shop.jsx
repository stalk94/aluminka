import React from 'react';
import ListTovar from "./tovar-galery";
import Page from "./page-tovar";
import { PhotoGalery } from '../galery';
import Footer, { Feedback } from "./footer";
import { useState } from '@hookstate/core';
import globalState from "../../global.state";
import Header from "./header";




export default function Shop() {
    const glob = useState(globalState);
    const [open, setOpen] = React.useState(false);
    const [curent, setCurent] = React.useState();

    const useClick =(data)=> {
        setCurent(data)
        setOpen(true)
    }
    const useDir =(dir)=> {
        glob.set((st)=> {
            st.dir = dir 
            return st
        });
    }


    return(
        <div>
            <div className="app"></div>
            <div style={{zIndex:"10"}} className="Bays"></div>
            <div className="Modal"></div>

            <Header 
                useClickUrl={useDir}
                src={"../img/foot_fon.png"} 
            />

            <main>
                <section className="two line">
                    <div className="swiper-containers">
                        <div className="head-blok line">
                            <div>Товары</div>
                        </div>

                        <div className="list-tovar">
                            <Page 
                                open={open} 
                                onEnd={()=> setOpen(false)} 
                                {...curent} 
                            />
                            <div classNameName="head-blok line">
                                <ListTovar useClick={useClick} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="three">
                    <h2>Выгодные предложения:</h2>
                    <div className="Slider">
                        <PhotoGalery data={$slides[getRoot()]} />
                    </div>
                </section>
                <Feedback />
            </main>

            <Footer/>
        </div>
    );
}