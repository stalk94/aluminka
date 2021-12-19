import React, { useState, useEffect } from 'react';
import { Button, Input } from "@nextui-org/react";
import OffCanvas from "react-aria-offcanvas";
import Select from 'react-select';
import { useDidMount } from "rooks";

/////////////////////////////////////////////////////////////////////////////////////
const options = [{value: 'nov', label: 'Новой почтой'}, {value: 'samo', label: 'Самовывоз'}];
const options2 = [{value: 'naloj', label: 'Наложенный платеж'}];
const getUser =()=> store.get("user");
const stat = {
    name: getUser() && getUser().name ? getUser().name : "",
    familua: getUser() && getUser().familua ? getUser().familua : "",
    phone:getUser() && getUser().phone ? getUser().phone : "",
    city: getUser() && getUser().city ? getUser().city : "",
    adres: getUser() && getUser().adres ? getUser().adres : ""
}
//////////////////////////////////////////////////////////////////////////////////////


const Pays =(props)=> {
    const [state, setState] = useState(stat)
    const [type, setType] = useState()
    const [typePay, setTypePay] = useState()

    //! доделать офрмление покупки
    const onSell =()=> {
        // if(typePay==="cart") EVENT.emit("payCart", {...state, total:total, delivery:type, basket:basket})
        EVENT.emit("newBay", {...state, total:total, basket:basket, delivery:type})
    }
    const onState =(name, value)=> {
        let copy = state
        copy[name] =  value
        setState(copy)
    }

    return(
        <OffCanvas
            labelledby="Доставка"
            height="100%"
            position="right"
            isOpen={props.onOpen}
            onClose={()=> props.setOpen(props.onOpen ? false : true)}
            labelledby="menu-button"
        >
            <div className="delivery">
                <Input placeholder="имя" onChange={(e)=> onState("firstName",e.value)} value={state.firstName}/>
                <Input placeholder="фамилия" onChange={(e)=> onState("lastName",e.value)} value={state.lastName}/>
                <Input placeholder="номер телефона" onChange={(e)=> onState("phone",e.value)} value={state.phone}/>
                <Input placeholder="город" onChange={(e)=> onState("city",e.value)} value={state.city}/>
                <Select placeholder={type} onChange={(e)=> setType(e.value)} options={options} value={type}/>
                <Select placeholder={typePay} onChange={(e)=> setTypePay(e.value)} options={options2} value={typePay}/>
                <Input 
                    placeholder={type==="nov" ? "отделение" : "адресс"} 
                    onChange={(e)=> onState(type, e.value)} 
                    value={type==="nov" ? "" : state.adres}
                />
                <Button onClick={onSell}> Оформить </Button>
            </div>
        </OffCanvas>
    );
}


export function PanelBays(props) {
    const [view, setView] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [basket, setBasket] = useState([])

    const total =()=> {
        let tot = 0;
        basket.forEach((tovar, i)=> tot += tovar.tovar.priceMin*tovar.count);
        return tot;
    }
    useDidMount(()=> {
        EVENT.on("bay.open", (val)=> {
            setBasket(getUser().basket)
            setOpen(val)
        });
        EVENT.on("add", (data)=> {
            let user = getUser()
            let basket = user.basket

            basket.push(data)
            user.basket = basket
            store.set("user", user)
            setBasket(user.basket)
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
                    ? <Button onClick={()=> <Pays total={total()} setOpen={setView} onOpen={view} />}> 
                            Оформить Покупку 
                      </Button> 
                    : <var> Корзина пуста </var>
                }
                <div style={{marginTop:"5%"}}> Всего: {total()}₴ </div>
            </OffCanvas>
        </>
    );
}