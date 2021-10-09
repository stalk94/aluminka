import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useSend } from "./engine";
import OffCanvas from "react-aria-offcanvas";
import { useLocalstorageState } from "rooks";
import Select from 'react-select';

const user = store.get("user")
const options = [{value: 'nov', label: 'Новой почтой'}]


export const PanelBays =(props)=> {
    const [state, setState] = useState({
        name:user.name??"",
        familua:user.familua??"",
        phone:user.phone??"",
        city:user.city??"",
        adres:user.adres??""
    })
    const [type, setType] = useState()
    const [typePay, setTypePay] = useState()
    const [view, setView] = useState("bay")
    const [isOpen, setOpen] = useState(false)
    const [total, setTotal] = useState(0)
    const [bays, setBays] = useLocalstorageState("bays", [])
    const onView =(mod)=> {
        setView(mod)
    }
    const onSell =(mod)=> {
        useSend()
    }


    return(
        <>
            {view==="bay"
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
                                <h5>{ tovar.priceMin*tovar.count }₴{setTotal(total+tovar.priceMin)}</h5>
                                <h4>-</h4>
                            </div>
                        ))}
                    </div>
                    <Button onClick={()=> onView("delivery")}> Оформить Покупку </Button>
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
                        <Input placeholder="имя" value={state.name}/>
                        <Input placeholder="фамилия" value={state.familua}/>
                        <Input placeholder="номер телефона" value={state.phone}/>
                        <Input placeholder="город" value={state.city}/>
                        <Select placeholder={type} onChange={(e)=> setType(e.value)} options={options} value={type}/>
                        <Select placeholder={typePay} onChange={(e)=> setTypePay(e.value)} options={options2} value={typePay}/>
                        <Input placeholder={type==="nov"?"отделение":"адресс"} value={type==="nov"?"":state.adres}/>
                        {typePay==="naloj"
                            ? <Button onClick={onSell}> Оформить </Button>
                            : <Button onClick={onSell}> Оплата {total}₴ </Button>
                        }
                    </div>
                </OffCanvas>
            }
        </>
    );
}