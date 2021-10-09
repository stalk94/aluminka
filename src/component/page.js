import React, { useState } from 'react';
import Carousel from "react-gallery-carousel";
import { Button, Input } from '@nextui-org/react';



export default function Page(props) {
    const [display, setDisplay] = useState("block")
    const [count, setCount] = useState(0)
    const onCount =(mod="add")=> {
        setCount((count)=> mod==="add"?(count+=1):(count-=1))
    }
    const onEnd =()=> {
        setDisplay("none")
        props.onEnd()
    }
    const toPay =()=> {
        EVENT.emit("add", count, props)
        setCount(0)
    }
    

    return(
        <main className="Modal" style={{display:display}}>
            <header>
                <Button flat color="primary" auto onClick={onEnd} className="button">Назад</Button>
            </header>

            <section>
                <Carousel className="galery" 
                    autoPlayInterval={8000}
                    images={props.images} 
                />

                <div className="bodyGalery">
                    <h2 className="name-tovar">{ props.name }</h2>
                    <p className="articul">Код товара: { props.id }</p>
                    <p>Модель: { props.model }</p>
                    <h2 classNmae="price" 
                        style={{backgroundColor:"rgb(20, 20, 20)",marginTop:"10%"}}
                    >
                        { props.priceMin } грн/шт.
                    </h2>
                    <div className="ap-sub line">
                        <button onClick={()=> onCount("sub")}> - </button>
                        <div>{ count }</div>
                        <button onClick={()=> onCount("add")}> + </button>

                        <button onClick={toPay}> В корзину </button>
                    </div>
                </div>
            </section>

            <section className="two opisanie">
                <nav className="line">
                    <div id="opis"><b>Описание</b></div>
                </nav>
                <hr align="left" width="7%" size="1" color="#2662c9"/>
                
                <div className="tovar-text">
                    <h5 className="info" >
                        { props.description }
                    </h5>
                    <h4 style={{textDecoration:"underline",textDecorationSstyle:"dotted"}}>Характеристики:</h4>

                    <p className="info" >Материал: {props.property.material}</p>
                    <p className="info" >Покрытие: {props.property.dop}</p>
                    <p className="info" >Ширина: {props.property.width}</p>
                    <p className="info" >Высота: {props.property.vusota}</p>
                    <p className="info" >Длинна: {props.property.height}</p>
                    <p className="info" >Цвет: 
                        { props.property.colors }
                    </p>
                </div>
            </section>
        </main>
    );
}