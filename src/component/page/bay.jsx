import React from 'react';
import { Button, Input } from "@nextui-org/react";
import OffCanvas from "react-aria-offcanvas";
import Select from 'react-select';
import { useDidMount } from "rooks";
import { useState } from '@hookstate/core';
import globalState from "../../global.state";



const Pays =({onOpen, setOpen})=> {
    const [state, setState] = React.useState({
        firstName: globalState.user.firstName.get(),
        lastName: globalState.user.lastName.get(),
        phone: globalState.user.phone.get(),
        city: globalState.user.city.get(),
        adres: globalState.user.adres.get()
    });
    const [type, setType] = React.useState();
    const [typePay, setTypePay] = React.useState();


    const onSell =()=> {
        EVENT.emit("newBay", {
            basket: globalState.user.basket.get(), 
            total: total, 
            delivery: type,
            target: state
        });
    }
    const onState =(name, value)=> {
        let copy = state
        copy[name] = value
        setState(copy)
    }


    return(
        <OffCanvas
            labelledby="Доставка"
            height="100%"
            position="right"
            isOpen={onOpen}
            onClose={()=> setOpen(onOpen ? false : true)}
            labelledby="menu-button"
        >
            <div className="delivery">
                <Input placeholder="имя" onChange={(e)=> onState("firstName",e.value)} value={state.firstName}/>
                <Input placeholder="фамилия" onChange={(e)=> onState("lastName",e.value)} value={state.lastName}/>
                <Input placeholder="номер телефона" onChange={(e)=> onState("phone",e.value)} value={state.phone}/>
                <Input placeholder="город" onChange={(e)=> onState("city",e.value)} value={state.city}/>

                <Select 
                    placeholder={type} 
                    onChange={(e)=> setType(e.value)} 
                    options={globalState.schemes.delivery.get()} 
                    value={type}
                />
                <Select 
                    placeholder={typePay} 
                    onChange={(e)=> setTypePay(e.value)} 
                    options={globalState.schemes.pays.get()} 
                    value={typePay}
                />
                <Input 
                    placeholder={type==="nov" ? "отделение" : "адресс"} 
                    onChange={(e)=> onState(type, e.value)} 
                    value={type==="nov" ? "" : state.adres}
                />
                <Button onClick={onSell}> 
                    Оформить 
                </Button>
            </div>
        </OffCanvas>
    );
}


export function PanelBays() {
    const [view, setView] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false);
    const basket = useState(globalState.user.basket);


    const total =()=> {
        let tot = {news:0, old:0};
        basket.forEach((data, i)=> {
            let old = data.tovar.price
            let news = data.tovar.priceMin
            tot.old += old*data.count
            tot.news += news*data.count
        });
        return tot;
    }
    useDidMount(()=> {
        EVENT.on("bay.open", (val)=> {
            setOpen(val)
        });
        EVENT.on("add", (data)=> {
            basket.set((st)=> {
                st.push(data)
                return st
            });
        });
    });


    return(
        <>
            <OffCanvas
                labelledby="Корзина"
                height="100%"
                position="right"
                isOpen={isOpen}
                onClose={()=> setOpen(isOpen?false:true)}
                labelledby="menu-button"
            >
                <Button style={{color:"white"}} flat color="blueviolet" auto onClick={()=> setOpen(false)}>
                    К странице
                </Button>
                
                <div style={{marginTop:"5%"}}>
                    {(basket.length > 0) && basket.map((val, index)=> (
                        <div style={{display:"flex",flexDirection:"row"}} key={index}>
                            <img width="30%" src={val.tovar.images[0]} style={{maxHeight:"80px"}}/>
                            <div style={{marginTop:"5%",color:"black"}}>{ val.tovar.name }</div>
                            <h5>{ val.count }</h5>
                            <h5>{ val.tovar.priceMin * val.count }₴</h5>
                            <h4 style={{marginTop:"5%",color:"red"}}> x </h4>
                        </div>
                    ))}
                </div>
                {basket.length > 0 
                    ? <Button onClick={()=> <Pays total={total().news} setOpen={setView} onOpen={view} />}> 
                            Оформить Покупку 
                      </Button> 
                    : <var> Корзина пуста </var>
                }
                <div style={{marginTop:"5%",display:"flex",flexDirection:"row"}}> Всего: 
                    <div style={{textDecoration:"line-through",color:"red"}}>{ total().old }₴</div>
                        / 
                    <div style={{color:"green"}}>{ total().news }₴</div>
                </div>
            </OffCanvas>
        </>
    );
}