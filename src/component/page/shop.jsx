import React from 'react';
import ListTovar from "./tovar-galery";
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
            st.dir = st.component.navigation[dir];
            return st
        });
    }
    const onDir =()=> {
        if(glob.dir.get() && glob.dir.get().id) return glob.slides.get()[glob.dir.get().id]
    }


    return(
        <div>
            <div style={{zIndex:"10"}} className="Bays"></div>
            <div className="Modal"></div>
            <Header 
                useClickUrl={useDir}
                src={"../img/foot_fon.png"} 
            />
            <main style={{backgroundColor:"#151616"}}>
                <section className="two" style={{padding:'0px',marginTop:"-8%"}}>
                    <ListTovar useClick={useClick} />
                </section>
                <section style={{width:"100%",backgroundColor:"#151616"}}>
                    <h2>Выгодные предложения:</h2>
                    <div style={{height:"50%"}}>
                        <PhotoGalery data={onDir()} />
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
}