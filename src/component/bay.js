import React, { useState, useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useSend } from "./engine";
import OffCanvas from "react-aria-offcanvas";
import { useLocalstorageState } from "rooks";
import Select from 'react-select';

const user = store.get("user")
const options = [{value: 'nov', label: 'Новой почтой'}]
const options2 = [{value: 'naloj', label: 'Наложенный платеж'},{value: 'cart', label: 'LiqPay'}]



export default function PanelBays(props) {
    const [state, setState] = useState({
        name: user.name??"",
        familua: user.familua??"",
        phone: user.phone??"",
        city: user.city??"",
        adres: user.adres??""
    })
    const [type, setType] = useState()
    const [typePay, setTypePay] = useState()
    const [view, setView] = useState("bay")
    const [isOpen, setOpen] = useState(props.open?props.open:false)
    const [total, setTotal] = useState(0)
    const [bays, setBays] = useLocalstorageState("bays", [])

    const onSell =()=> {
        if(typePay==="cart") useSend("payCart", {...state, total:total, delivery:type, bays:bays}, (data)=> "")
        else useSend("payNaloj", {...state, total:total, bays:bays, delivery:type}, (data)=> "")
    }
    const onState =(name, value)=> {
        let copy = state
        copy[name] =  value
        setState(copy)
    }


    return(
        <>
            {view === "bay"
                ? <OffCanvas
                    labelledby="Корзина"
                    height="100%"
                    position="right"
                    isOpen={isOpen}
                    onClose={()=> setOpen(isOpen?false:true)}
                    labelledby="menu-button"
                >
                    <Button onClick={()=> setOpen(isOpen?false:true)}> К странице </Button>
                    <div>
                        {bays.map((tovar, index)=> (
                            <div key={index}>
                                <img width="100%" src={tovar.src} style={{maxHeight:"50px"}}/>
                                <var>{ tovar.name }</var>
                                <h5>{ tovar.count }</h5>
                                <h5>{ tovar.priceMin*tovar.count }₴{ setTotal(total+tovar.priceMin) }</h5>
                                <h4> - </h4>
                            </div>
                        ))}
                    </div>
                    <Button onClick={()=> setView("delivery")}> Оформить Покупку </Button>
                    <div>Всего: {total}₴</div>
                </OffCanvas>
                : <OffCanvas
                    labelledby="Доставка"
                    height="100%"
                    position="right"
                    isOpen={isOpen}
                    onClose={()=> setOpen(isOpen?false:true)}
                    labelledby="menu-button"
                >
                    <div className="delivery">
                        <Input placeholder="имя" onChange={(e)=> onState("name",e.value)} value={state.name}/>
                        <Input placeholder="фамилия" onChange={(e)=> onState("familua",e.value)} value={state.familua}/>
                        <Input placeholder="номер телефона" onChange={(e)=> onState("phone",e.value)} value={state.phone}/>
                        <Input placeholder="город" onChange={(e)=> onState("city",e.value)} value={state.city}/>
                        <Select placeholder={type} onChange={(e)=> setType(e.value)} options={options} value={type}/>
                        <Select placeholder={typePay} onChange={(e)=> setTypePay(e.value)} options={options2} value={typePay}/>
                        <Input 
                            placeholder={type==="nov"?"отделение":"адресс"} 
                            onChange={(e)=> onState(type,e.value)} 
                            value={type==="nov"?"":state.adres}
                        />
                        {typePay === "naloj"
                            ? <Button onClick={onSell}> Оформить </Button>
                            : <Button onClick={onSell}> Оплата {total}₴ </Button>
                        }
                    </div>
                </OffCanvas>
            }
        </>
    );
}