import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { PhotoGalery } from '../galery';
import PushPop from "./push-pop";



const Colors =(props)=> (
    <div style={{display:"flex",flexDirection:"row"}}>
        {props.data.map((color, i)=> 
            <div key={i} 
                style={{border:(props.select===i?'1px solid red':''),backgroundColor:color,margin:"5px"}} 
                onClick={()=> props.useSelect(i)}
            />
        )}
    </div>
);



export default function Page(props) {
    const [select, setSelect] = useState();
    const [total, setTotal] = useState({old:0, new:0});
    const [count, setCount] = useState(0);

    
    const toBay =()=> {
        setTotal({old:props.price * count, new:props.priceMin * count})
        EVENT.emit("add", {count:count, tovar:props})
        setCount(0)
    }
    const onChange =(ev)=> {
        console.log(ev)
    }
    const onClickItem =(ev)=> {
        console.log(ev)
    }
    

    return(
        <div className="View-tovar" style={{display:props.open?"display":"none", overflow:"auto"}}>
            <header>
                <Button flat color="primary" auto onClick={props.onEnd}>
                    Назад
                </Button>
            </header>

            <section style={{textAlign:"center"}}>
                <div style={{marginLeft:"30%"}}>
                    <PhotoGalery 
                        data={props.images} 
                        width={window.innerHeight*0.5} 
                        height={window.innerHeight*0.5} 
                        showIndicator={true}
                    />
                </div>
                <div className="bodyGalery">
                    <h2 style={{paddingLeft:"10px"}} className="name-tovar">{ props.name }</h2>
                    <p>Модель: { props.model }</p>
                    <div className="price" style={{backgroundColor:"rgb(20,20,20)",marginTop:"2%",display:"flex",flexDirection:"row"}}>
                        Цена:
                        <h2 style={{textDecoration:"line-through",color:"red"}}>{ props.price??100 }грн /</h2>
                        <h2 style={{color:"green"}}> {props.priceMin??80} грн</h2>
                    </div>
                    <div className="line">
                        <PushPop
                            setCount={setCount}
                            count={count}
                        />
                        <Button flat color="#ff4ecd" auto onClick={toBay}> В корзину </Button>
                    </div>
                </div>
            </section>

            <section className="two opisanie">
                <nav className="line">
                    <div id="opis">
                        <b>Описание</b>
                    </div>
                </nav>
                <hr align="left" width="7%" size="1" color="#2662c9"/>
                
                <div className="tovar-text">
                    <h5 style={{marginLeft:"0px"}} className="info">
                        { props.description }
                    </h5>

                    <h4>Характеристики:</h4>
                    <p className="info">Материал: { props.material }</p>
                    <p className="info">Покрытие: { props.dop }</p>
                    <p className="info">Ширина: { props.width }</p>
                    <p className="info">Высота: { props.vusota }</p>
                    <p className="info">Длинна: { props.height }</p>
                        {props.colors && <p className="info">Цвет: { 
                            <Colors select={select} useSelect={setSelect} data={props.colors}/> 
                        }</p>
                    }
                </div>
            </section>
        </div>
    );
}