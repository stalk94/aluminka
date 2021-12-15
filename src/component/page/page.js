import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { Carousel } from "react-responsive-carousel";
const style = {padding:"5px", border:"1px solid grey"}



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
    const toBay =()=> {
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
        <div className="Modal" style={{display:display, overflow:"auto"}}>
            <header>
                <Button flat color="primary" auto onClick={onEnd}>Назад</Button>
            </header>

            <section>
                <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem}>
                    {props.images.map((img, id)=> <img key={id} src={img}/>)}
                </Carousel>
                <div className="bodyGalery">
                    <h2 style={{paddingLeft:"10px"}} className="name-tovar">{ props.name }</h2>
                    <p className="articul">Код товара: { props.id }</p>
                    <p>Модель: { props.model }</p>
                    <div className="price" style={{backgroundColor:"rgb(20, 20, 20)",marginTop:"2%",display:"flex",flexDirection:"row"}}>
                        Цена:
                        <h2 style={{textDecoration:"line-through",color:"red"}}>{props.price}грн /</h2>
                        <h2 style={{color:"green"}}> {props.priceMin} грн</h2>
                    </div>
                    <div className="line">
                        <div style={{marginRight:"2%", marginLeft:"40%"}} className="ap-sub line">
                            <button style={style} onClick={()=> onCount("sub")}> - </button>
                            <div style={style}>{ count }</div>
                            <button style={style} onClick={()=> onCount("add")}> + </button>
                        </div>
                        <Button flat color="#ff4ecd" auto onClick={toBay}> В корзину </Button>
                    </div>
                </div>
            </section>

            <section className="two opisanie">
                <nav className="line">
                    <div id="opis"><b>Описание</b></div>
                </nav>
                <hr align="left" width="7%" size="1" color="#2662c9"/>
                
                <div className="tovar-text">
                    <h5 style={{marginLeft:"0px"}} className="info">
                        { props.description }
                    </h5>
                    <h4>Характеристики:</h4>

                    <p className="info">Материал: {props.material}</p>
                    <p className="info">Покрытие: {props.dop}</p>
                    <p className="info">Ширина: {props.width}</p>
                    <p className="info">Высота: {props.vusota}</p>
                    <p className="info">Длинна: {props.height}</p>
                    <p className="info">Цвет: {props.colors}</p>
                </div>
            </section>
        </div>
    );
}